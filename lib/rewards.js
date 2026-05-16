export const FREE_SHIPPING_THRESHOLD = 200;
export const MIN_ITEMS_FOR_MYSTERY = 2;

export function getRewardState({ itemCount, total }) {
  const remainingAmount = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const remainingItems = Math.max(0, MIN_ITEMS_FOR_MYSTERY - itemCount);

  const mysteryProgress = Math.round(
    Math.min(1, itemCount / MIN_ITEMS_FOR_MYSTERY) * 100,
  );
  const shippingProgress = Math.round(
    Math.min(1, total / FREE_SHIPPING_THRESHOLD) * 100,
  );

  const mysteryUnlocked = itemCount >= MIN_ITEMS_FOR_MYSTERY;
  const shippingUnlocked = total >= FREE_SHIPPING_THRESHOLD;
  const allUnlocked = mysteryUnlocked && shippingUnlocked;

  let message;
  let tone = 'info';

  if (itemCount === 0) {
    message = 'ابدأ التسوق وافتح مكافأتين رائعتين بانتظارك ✨';
    tone = 'idle';
  } else if (allUnlocked) {
    message = 'تم فتح جميع مكافآتك 🎉 شحن مجاني + صندوق غامض';
    tone = 'success';
  } else if (mysteryUnlocked && !shippingUnlocked) {
    message = `رائع! 🎁 أضف ${remainingAmount} ر.س للحصول على الشحن المجاني 🚚`;
    tone = 'nudge';
  } else if (shippingUnlocked && !mysteryUnlocked) {
    message = 'الشحن مجاني ✨ أضف منتجاً واحداً لفتح الصندوق الغامض 🎁';
    tone = 'nudge';
  } else if (remainingItems === 1 && remainingAmount > 0) {
    message = `أضف منتجاً واحداً لفتح الصندوق الغامض 🎁 و${remainingAmount} ر.س للشحن المجاني 🚚`;
    tone = 'nudge';
  } else {
    message = `أضف ${remainingItems} منتج للصندوق الغامض 🎁 و${remainingAmount} ر.س للشحن المجاني 🚚`;
    tone = 'nudge';
  }

  return {
    mysteryUnlocked,
    shippingUnlocked,
    allUnlocked,
    mysteryProgress,
    shippingProgress,
    remainingAmount,
    remainingItems,
    message,
    tone,
  };
}

export function formatSAR(amount) {
  return `${amount.toLocaleString('ar-EG')} ر.س`;
}
