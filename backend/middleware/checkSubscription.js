import { printingPressunit } from "../model/printingPressunit.js";

export const checkSubscription = async (req, res, next) => {
  const shopId = req.user?.shopId || req.user?._id;
  const shop = await printingPressunit.findById(shopId);

  if (!shop) return res.status(404).json({ message: "Shop not found" });

  const today = new Date();
  const subscription = shop.subscription || {};

  if (!subscription.isPaid) {
    return res.status(403).json({
      reason: "not_subscribed",
      message: "Subscription not active. Please subscribe to continue.",
    });
  }

  if (new Date(subscription.nextDueDate) < today) {
    return res.status(403).json({
      reason: "expired",
      message: "Subscription expired. Please renew to continue.",
    });
  }

  next(); // Allow access
};