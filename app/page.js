import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import SuggestedProducts from '@/components/SuggestedProducts';
import { products, suggestedProducts } from '@/lib/products';

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900">
              الأكثر مبيعاً
            </h2>
            <p className="text-ink-500 mt-1 text-sm sm:text-base">
              منتجات اختارها آلاف العملاء — جودة عالية وأسعار منافسة
            </p>
          </div>
        </div>
        <ProductGrid products={products} />
      </section>

      <SuggestedProducts products={suggestedProducts} />

      <footer className="border-t border-ink-100 mt-16 py-8 text-center text-sm text-ink-500">
        صُنع بحب لمتاجر الخليج · MVP تجريبي
      </footer>
    </>
  );
}
