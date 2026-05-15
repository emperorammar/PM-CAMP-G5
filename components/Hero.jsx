export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white p-8 sm:p-12 shadow-card">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-400/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-brand-300/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            مكافآت حصرية لفترة محدودة
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
            اشترِ منتجين بـ <span className="text-yellow-300">160 ر.س</span>
            <br />
            وافتح صندوقك الغامض 🎁
          </h1>
          <p className="text-white/85 text-base sm:text-lg mb-6 leading-relaxed">
            شحن مجاني + مفاجأة قيّمة بانتظارك مع كل طلب يحقق الشروط.
            هدية مضمونة، تجربة لا تُنسى.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-brand-700 hover:bg-yellow-300 transition-colors px-6 py-3 rounded-2xl font-bold shadow-card"
            >
              تسوّق الآن
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-2xl font-bold border border-white/30"
            >
              كيف يعمل النظام؟
            </a>
          </div>

          <div className="flex flex-wrap gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚚</span>
              <div>
                <p className="font-bold">شحن مجاني</p>
                <p className="text-white/70 text-xs">للطلبات فوق 160 ر.س</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎁</span>
              <div>
                <p className="font-bold">صندوق غامض</p>
                <p className="text-white/70 text-xs">مع كل طلب مؤهّل</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="font-bold">توصيل سريع</p>
                <p className="text-white/70 text-xs">خلال 48 ساعة</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
