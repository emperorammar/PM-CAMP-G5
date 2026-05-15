'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatSAR } from '@/lib/rewards';

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`تقييم ${rating} من 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? '#FBBF24' : '#E5E7EB'}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product, compact = false }) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAdd = () => {
    setAdding(true);
    addToCart(product);
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <article className="group bg-white rounded-2xl shadow-card hover:shadow-cardHover transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative aspect-square bg-ink-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 right-3 bg-brand-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-card">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-ink-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-card">
            خصم {discount}%
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className={`font-bold text-ink-900 leading-snug mb-1.5 ${compact ? 'text-sm' : 'text-base'}`}>
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <Stars rating={product.rating} />
          <span className="text-xs text-ink-500">({product.reviews})</span>
        </div>

        <div className="flex items-baseline gap-2 mb-4 mt-auto">
          <span className="text-lg font-extrabold text-brand-700">
            {formatSAR(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-ink-500 line-through">
              {formatSAR(product.oldPrice)}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          className={`w-full ${
            adding
              ? 'bg-emerald-500 text-white'
              : 'bg-ink-900 hover:bg-brand-700 text-white'
          } font-bold text-sm py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2`}
        >
          {adding ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              تمت الإضافة
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              أضف للسلة
            </>
          )}
        </button>
      </div>
    </article>
  );
}
