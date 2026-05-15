import { Tajawal } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import './globals.css';

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
});

export const metadata = {
  title: 'تك بوكس | متجر الإكسسوارات التقنية',
  description: 'متجر إلكتروني عربي للإكسسوارات التقنية مع نظام مكافآت ذكي',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="min-h-screen bg-[#FAFAFB] text-ink-900 font-sans">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
