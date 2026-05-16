'use client';

import { motion } from 'framer-motion';
import { MIN_ITEMS_FOR_MYSTERY } from '@/lib/rewards';

const rewards = [
  { icon: '🏷️', label: 'كوبون خصم', desc: 'خصم على طلبك القادم' },
  { icon: '📱', label: 'كفر جوال', desc: 'حافظة أنيقة مجانية' },
  { icon: '🔌', label: 'سلك شحن', desc: 'كيبل USB-C سريع' },
  { icon: '🎧', label: 'سماعة', desc: 'سماعة سلكية عالية الجودة' },
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
              : `يُفتح عند إضافة ${MIN_ITEMS_FOR_MYSTERY} منتجات`}
          </p>
        </div>
      </div>

      <div className={`relative mt-4 rounded-xl p-3 ${unlocked ? 'bg-white/10 backdrop-blur' : 'bg-white border border-ink-100'}`}>
        <p className={`text-[11px] font-extrabold mb-2.5 ${unlocked ? 'text-yellow-200' : 'text-ink-500'}`}>
          🎲 قد تحصل على واحدة من هذه الهدايا:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {rewards.map((r) => (
            <div
              key={r.label}
              className={`flex items-center gap-2 rounded-xl px-2.5 py-2 ${
                unlocked ? 'bg-white/10' : 'bg-ink-100/70'
              }`}
            >
              <span className="text-xl shrink-0">{r.icon}</span>
              <div className="min-w-0">
                <p className={`text-[11px] font-extrabold leading-tight ${unlocked ? 'text-white' : 'text-ink-900'}`}>
                  {r.label}
                </p>
                <p className={`text-[10px] leading-tight truncate ${unlocked ? 'text-white/70' : 'text-ink-500'}`}>
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className={`text-[10px] text-center mt-2.5 ${unlocked ? 'text-white/60' : 'text-ink-400'}`}>
          الهدية مفاجأة — ستُكشف عند استلام طلبك ✨
        </p>
      </div>
    </motion.div>
  );
}
