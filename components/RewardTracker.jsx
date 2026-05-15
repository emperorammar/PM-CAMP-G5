'use client';

import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function RewardTracker() {
  const { reward } = useCart();

  const toneStyles = {
    idle:    'bg-ink-100 text-ink-700 border-ink-100',
    nudge:   'bg-brand-50 text-brand-800 border-brand-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    info:    'bg-brand-50 text-brand-800 border-brand-200',
  };

  const barColor = reward.unlocked
    ? 'from-emerald-400 to-emerald-600'
    : 'from-brand-400 to-brand-700';

  return (
    <div className={`rounded-2xl border ${toneStyles[reward.tone] || toneStyles.info} p-4 transition-colors`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className="text-sm font-bold leading-snug">{reward.message}</p>
        <span className={`shrink-0 text-xs font-extrabold px-2 py-1 rounded-lg ${
          reward.unlocked ? 'bg-emerald-600 text-white' : 'bg-white text-brand-700'
        }`}>
          {reward.progress}%
        </span>
      </div>

      <div className="relative h-2.5 bg-white/80 rounded-full overflow-hidden">
        <motion.div
          className={`absolute inset-y-0 right-0 bg-gradient-to-l ${barColor} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${reward.progress}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        />
        <div className="absolute inset-0 shimmer-bar animate-shimmer rounded-full pointer-events-none" />
      </div>

      <div className="flex items-center justify-between text-[11px] text-ink-500 mt-2">
        <span>🛒 منتجين على الأقل</span>
        <span>160 ر.س</span>
      </div>
    </div>
  );
}
