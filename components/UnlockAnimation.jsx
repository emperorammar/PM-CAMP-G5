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

export default function UnlockAnimation() {
  const { justUnlocked, acknowledgeUnlock } = useCart();

  useEffect(() => {
    if (!justUnlocked) return;
    fireConfetti();
    const t = setTimeout(() => acknowledgeUnlock(), 2400);
    return () => clearTimeout(t);
  }, [justUnlocked, acknowledgeUnlock]);

  return (
    <AnimatePresence>
      {justUnlocked && (
        <motion.div
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
            🎉
          </motion.div>
          <p className="font-extrabold text-lg mb-1">مبروك! تم فتح مكافآتك</p>
          <p className="text-sm text-white/90">
            شحن مجاني + الصندوق الغامض أُضيف إلى سلتك
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
