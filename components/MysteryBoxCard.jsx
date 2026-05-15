'use client';

import { motion } from 'framer-motion';

const rewards = [
  { icon: '🧴', label: 'عينة مجانية' },
  { icon: '🎀', label: 'هدية صغيرة' },
  { icon: '🏷️', label: 'كوبون خصم' },
];

export default function MysteryBoxCard({ unlocked }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl p-4 border-2 border-dashed ${
        unlocked
          ? 'bg-gradient-to-br from-brand-600 to-brand-800 border-yellow-300 text-white'
          : 'bg-ink-100/60 border-ink-300 text-ink-500'
      }`}
    >
      {unlocked && (
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-yellow-300/30 rounded-full blur-2xl" />
      )}

      <div className="relative flex items-center gap-3">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
          unlocked ? 'bg-white/15 backdrop-blur' : 'bg-white'
        }`}>
          {unlocked ? '🎁' : '🔒'}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-extrabold text-sm">الصندوق الغامض</p>
            {unlocked && (
              <span className="bg-yellow-300 text-ink-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                مجاناً
              </span>
            )}
          </div>
          <p className={`text-xs leading-snug ${unlocked ? 'text-white/80' : 'text-ink-500'}`}>
            {unlocked
              ? 'تمت إضافته إلى سلتك تلقائياً 🎉'
              : 'يُفتح عند 2 منتج + 160 ر.س'}
          </p>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-2 mt-4">
        {rewards.map((r) => (
          <div
            key={r.label}
            className={`text-center rounded-xl p-2 ${
              unlocked ? 'bg-white/10 backdrop-blur' : 'bg-white border border-ink-100'
            }`}
          >
            <div className="text-2xl mb-1">{r.icon}</div>
            <p className={`text-[10px] font-bold ${unlocked ? 'text-white/90' : 'text-ink-700'}`}>
              {r.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
