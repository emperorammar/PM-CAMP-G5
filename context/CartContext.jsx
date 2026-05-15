'use client';

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { MYSTERY_BOX_ID, mysteryBox } from '@/lib/products';
import { getRewardState } from '@/lib/rewards';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((i) => i.id === action.product.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...state, { ...action.product, qty: 1 }];
    }
    case 'REMOVE':
      return state.filter((i) => i.id !== action.id);
    case 'INC':
      return state.map((i) => (i.id === action.id ? { ...i, qty: i.qty + 1 } : i));
    case 'DEC':
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
    case 'ADD_MYSTERY':
      if (state.find((i) => i.id === MYSTERY_BOX_ID)) return state;
      return [...state, { ...mysteryBox, qty: 1 }];
    case 'REMOVE_MYSTERY':
      return state.filter((i) => i.id !== MYSTERY_BOX_ID);
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [isOpen, setIsOpen] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);

  const realItems = useMemo(() => items.filter((i) => i.id !== MYSTERY_BOX_ID), [items]);

  const itemCount = useMemo(
    () => realItems.reduce((sum, i) => sum + i.qty, 0),
    [realItems],
  );

  const total = useMemo(
    () => realItems.reduce((sum, i) => sum + i.price * i.qty, 0),
    [realItems],
  );

  const reward = useMemo(() => getRewardState({ itemCount, total }), [itemCount, total]);

  useEffect(() => {
    const hasMystery = items.some((i) => i.id === MYSTERY_BOX_ID);
    if (reward.unlocked && !hasMystery) {
      dispatch({ type: 'ADD_MYSTERY' });
      setJustUnlocked(true);
    } else if (!reward.unlocked && hasMystery) {
      dispatch({ type: 'REMOVE_MYSTERY' });
      setJustUnlocked(false);
    }
  }, [reward.unlocked, items]);

  const value = {
    items,
    realItems,
    itemCount,
    total,
    reward,
    isOpen,
    justUnlocked,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addToCart: (product) => {
      dispatch({ type: 'ADD', product });
      setIsOpen(true);
    },
    removeFromCart: (id) => dispatch({ type: 'REMOVE', id }),
    increment: (id) => dispatch({ type: 'INC', id }),
    decrement: (id) => dispatch({ type: 'DEC', id }),
    acknowledgeUnlock: () => setJustUnlocked(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
