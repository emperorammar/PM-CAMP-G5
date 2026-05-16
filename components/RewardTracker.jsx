'use client';

import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { FREE_SHIPPING_THRESHOLD, MIN_ITEMS_FOR_MYSTERY } from '@/lib/rewards';

function MiniBar({ icon, label, progress, unlocked, hint }) {
  return (
    <div className="bg-white/70 rounded-xl p-2.5">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-base shrink-0">{icon}</span>
          <p className="text-[11px] font-bold text-ink-900 truncate">{label}</p>
        </div>
        {unlocked ? (
          <span className="text-[10px] font-extrabold bg-emerald-600 text-white px-2 py-0.5 rounded-full shrink-0">
            مفتوح ✓
          </span>
        ) : (
          <span className="text-[10px] font-bold text-ink-500 shrink-0">{hint}</span>
        )}
      </div>
      <div className="h-2 bg-white rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            unlocked
              ? 'bg-gradient-to-l from-emerald-400 to-emerald-600'
              : 'bg-gradient-to-l from-brand-400 to-brand-700'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          style={{ marginRight: 'auto' }}
        />
      </div>
    </div>
  );
}

export default function RewardTracker() {
  const { reward, itemCount, total } = useCart();

  const toneStyles = {
    idle:    'bg-ink-100 text-ink-700 border-ink-100',
    nudge:   'bg-brand-50 text-brand-800 border-brand-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    info:    'bg-brand-50 text-brand-800 border-brand-200',
  };

  return (
    <div className={`rounded-2xl border ${toneStyles[reward.tone] || toneStyles.info} p-4 transition-colors`}>
      <p className="text-sm font-bold leading-snug mb-3">{reward.message}</p>

      <div className="grid grid-cols-2 gap-2">
        <MiniBar
          icon="🎁"
          label="الصندوق الغامض"
          progress={reward.mysteryProgress}
          unlocked={reward.mysteryUnlocked}
          hint={`${itemCount}/${MIN_ITEMS_FOR_MYSTERY} منتج`}
        />
        <MiniBar
          icon="🚚"
          label="الشحن المجاني"
          progress={reward.shippingProgress}
          unlocked={reward.shippingUnlocked}
          hint={`${total}/${FREE_SHIPPING_THRESHOLD} ر.س`}
        />
      </div>
    </div>
  );
}
