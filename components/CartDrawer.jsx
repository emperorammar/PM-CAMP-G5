'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { formatSAR } from '@/lib/rewards';
import { MYSTERY_BOX_ID } from '@/lib/products';
import RewardTracker from './RewardTracker';
import MysteryBoxCard from './MysteryBoxCard';
import UnlockAnimation from './UnlockAnimation';

function CartItem({ item }) {
  const { increment, decrement, removeFromCart } = useCart();
  const isMystery = item.id === MYSTERY_BOX_ID;

  if (isMystery) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-3 py-3 border-b border-ink-100 last:border-b-0"
    >
      <div className="w-16 h-16 rounded-xl bg-ink-100 overflow-hidden shrink-0">
        {item.image && (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm text-ink-900 line-clamp-2 leading-tight mb-1">
          {item.name}
        </p>
        <p className="text-brand-700 font-extrabold text-sm mb-2">
          {formatSAR(item.price * item.qty)}
        </p>
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center bg-ink-100 rounded-xl">
            <button
              onClick={() => decrement(item.id)}
              className="w-7 h-7 flex items-center justify-center text-ink-700 hover:text-brand-700 transition"
              aria-label="إنقاص الكمية"
            >
              −
            </button>
            <span className="w-7 text-center text-sm font-bold">{item.qty}</span>
            <button
              onClick={() => increment(item.id)}
              className="w-7 h-7 flex items-center justify-center text-ink-700 hover:text-brand-700 transition"
              aria-label="زيادة الكمية"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-ink-500 hover:text-red-600 transition text-xs font-bold"
          >
            إزالة
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function CartDrawer() {
  const { isOpen, closeCart, items, realItems, total, reward } = useCart();
  const shipping = reward.unlocked ? 0 : 25;
  const grandTotal = total + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm z-40"
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-drawer flex flex-col"
            role="dialog"
            aria-label="سلة التسوق"
          >
            <UnlockAnimation />

            <header className="flex items-center justify-between p-4 border-b border-ink-100 shrink-0">
              <div>
                <h2 className="text-lg font-extrabold text-ink-900">سلة التسوق</h2>
                <p className="text-xs text-ink-500">{realItems.length} منتج في السلة</p>
              </div>
              <button
                onClick={closeCart}
                className="w-10 h-10 rounded-full bg-ink-100 hover:bg-ink-300/50 flex items-center justify-center transition"
                aria-label="إغلاق السلة"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </header>

            <div className="px-4 pt-4 shrink-0">
              <RewardTracker />
            </div>

            <div className="px-4 pt-4 shrink-0">
              <MysteryBoxCard unlocked={reward.unlocked} />
            </div>

            <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
              {realItems.length === 0 ? (
                <div className="text-center py-12 text-ink-500">
                  <div className="text-5xl mb-3">🛒</div>
                  <p className="font-bold text-ink-700 mb-1">سلتك فارغة</p>
                  <p className="text-sm">أضف منتجات لتبدأ التسوق</p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {realItems.length > 0 && (
              <footer className="border-t border-ink-100 p-4 shrink-0 bg-white">
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between text-ink-700">
                    <span>المجموع الفرعي</span>
                    <span className="font-bold">{formatSAR(total)}</span>
                  </div>
                  <div className="flex justify-between text-ink-700">
                    <span>الشحن</span>
                    <span className={`font-bold ${reward.unlocked ? 'text-emerald-600' : ''}`}>
                      {reward.unlocked ? 'مجاناً 🚚' : formatSAR(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-ink-900 pt-2 border-t border-ink-100">
                    <span>الإجمالي</span>
                    <span>{formatSAR(grandTotal)}</span>
                  </div>
                </div>
                <button className="w-full bg-brand-600 hover:bg-brand-700 transition-colors text-white font-extrabold py-3.5 rounded-2xl shadow-card">
                  إتمام الشراء
                </button>
                <button
                  onClick={closeCart}
                  className="w-full text-center text-sm text-ink-500 hover:text-brand-700 transition mt-3"
                >
                  متابعة التسوق
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
