export const FREE_SHIPPING_THRESHOLD = 160;
export const MIN_ITEMS_FOR_REWARD = 2;

export function getRewardState({ itemCount, total }) {
  const remainingAmount = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const remainingItems = Math.max(0, MIN_ITEMS_FOR_REWARD - itemCount);
  const amountProgress = Math.min(1, total / FREE_SHIPPING_THRESHOLD);
  const itemsProgress = Math.min(1, itemCount / MIN_ITEMS_FOR_REWARD);
  const progress = Math.round(Math.min(amountProgress, itemsProgress) * 100);
  const unlocked = itemCount >= MIN_ITEMS_FOR_REWARD && total >= FREE_SHIPPING_THRESHOLD;

  let message;
  let tone = 'info';

  if (itemCount === 0) {
    message = 'ابدأ التسوق وافتح مكافآت رائعة بانتظارك ✨';
    tone = 'idle';
  } else if (unlocked) {
    message = 'تم فتح مكافآتك 🎉 شحن مجاني + صندوق غامض';
    tone = 'success';
  } else if (remainingItems > 0 && remainingAmount > 0) {
    message = `أضف منتجاً آخر وأكمل ${remainingAmount} ر.س لفتح صندوقك الغامض 🎁`;
    tone = 'nudge';
  } else if (remainingItems > 0) {
    message = 'أضف منتجاً واحداً فقط لفتح صندوقك الغامض 🎁';
    tone = 'nudge';
  } else if (remainingAmount > 0) {
    message = `أضف ${remainingAmount} ر.س لفتح الشحن المجاني 🚚`;
    tone = 'nudge';
  }

  return {
    progress,
    unlocked,
    remainingAmount,
    remainingItems,
    message,
    tone,
  };
}

export function formatSAR(amount) {
  return `${amount.toLocaleString('ar-EG')} ر.س`;
}
