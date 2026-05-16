'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useCart } from '@/context/CartContext';

function fireConfetti() {
  const colors = ['#7C3AED', '#A78BFA', '#FBBF24', '#10B981', '#FFFFFF'];
  const end = Date.now() + 1200;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 },
    colors,
  });
}

const messages = {
  mystery: {
    icon: '🎁',
    title: 'مبروك! تم فتح الصندوق الغامض',
    sub: 'تمت إضافته إلى سلتك تلقائياً',
  },
  shipping: {
    icon: '🚚',
    title: 'رائع! تم تفعيل الشحن المجاني',
    sub: 'وفّرت تكلفة الشحن على طلبك',
  },
  all: {
    icon: '🎉',
    title: 'مبروك! تم فتح جميع المكافآت',
    sub: 'شحن مجاني + الصندوق الغامض في سلتك',
  },
};

export default function UnlockAnimation() {
  const { unlockEvent, acknowledgeUnlock } = useCart();

  useEffect(() => {
    if (!unlockEvent) return;
    fireConfetti();
    const t = setTimeout(() => acknowledgeUnlock(), 2600);
    return () => clearTimeout(t);
  }, [unlockEvent, acknowledgeUnlock]);

  const data = unlockEvent ? messages[unlockEvent.type] : null;

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          key={unlockEvent.ts}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 160, damping: 18 }}
          className="pointer-events-none absolute inset-x-4 top-24 z-20 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-5 rounded-2xl shadow-cardHover text-center"
        >
          <motion.div
            initial={{ rotate: -10, scale: 0.6 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
            className="text-5xl mb-2"
          >
            {data.icon}
          </motion.div>
          <p className="font-extrabold text-lg mb-1">{data.title}</p>
          <p className="text-sm text-white/90">{data.sub}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
