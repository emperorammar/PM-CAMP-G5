'use client';

import { useCart } from '@/context/CartContext';
import { formatSAR } from '@/lib/rewards';

export default function SuggestedProducts({ products }) {
  const { addToCart, reward, itemCount } = useCart();

  if (itemCount === 0) return null;

  const headline = reward.allUnlocked
    ? 'منتجات قد تعجبك ✨'
    : 'أكمل مكافآتك بهذه المنتجات الذكية 💡';

  const subline = reward.allUnlocked
    ? 'أضف المزيد إلى طلبك واستمتع'
    : 'منتجات بأسعار منخفضة تساعدك على بلوغ شروط المكافأة بسرعة';

  return (
    <section className="bg-gradient-to-b from-brand-50 to-transparent py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-ink-900">{headline}</h2>
            <p className="text-ink-500 mt-1 text-sm">{subline}</p>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex-shrink-0 w-56 bg-white rounded-2xl shadow-card hover:shadow-cardHover transition-all overflow-hidden"
            >
              <div className="aspect-square bg-ink-100 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold text-ink-900 mb-2 line-clamp-2 leading-tight">
                  {p.name}
                </h3>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-base font-extrabold text-brand-700">
                    {formatSAR(p.price)}
                  </span>
                  <button
                    onClick={() => addToCart(p)}
                    className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold py-2 px-3 rounded-xl transition-colors flex items-center gap-1"
                    aria-label={`أضف ${p.name} للسلة`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    أضف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
