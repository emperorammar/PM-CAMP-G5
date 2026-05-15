'use client';

import { useCart } from '@/context/CartContext';

export default function Header() {
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-ink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-card">
            <span className="text-white text-lg font-extrabold">ت</span>
          </div>
          <div className="leading-tight">
            <p className="font-extrabold text-ink-900 text-lg">تِك بوكس</p>
            <p className="text-[11px] text-ink-500">إكسسوارات تقنية مميزة</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-7 text-sm text-ink-700">
          <a className="hover:text-brand-600 transition" href="#">الرئيسية</a>
          <a className="hover:text-brand-600 transition" href="#">المنتجات</a>
          <a className="hover:text-brand-600 transition" href="#">العروض</a>
          <a className="hover:text-brand-600 transition" href="#">تواصل معنا</a>
        </nav>

        <button
          onClick={openCart}
          className="relative flex items-center gap-2 bg-ink-900 hover:bg-brand-700 transition-colors text-white px-4 py-2.5 rounded-2xl text-sm font-bold shadow-card"
          aria-label="فتح السلة"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
          </svg>
          <span className="hidden sm:inline">السلة</span>
          {itemCount > 0 && (
            <span className="absolute -top-2 -left-2 bg-brand-500 text-white text-xs font-bold rounded-full min-w-[22px] h-[22px] px-1.5 flex items-center justify-center animate-pop ring-2 ring-white">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
