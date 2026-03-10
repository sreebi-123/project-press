import {
  useCreateRazorpayOrderMutation,
  useVerifyRazorpayMutation,
} from "../slices/paymentApiSlice";
import { loadRazorpayScript } from "../../utils/loadRazorpay.js";

export const useRazorpay = () => {
  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();
  const [verifyRazorpay] = useVerifyRazorpayMutation();

  const checkout = async ({ path, payload, onSuccess, onError }) => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      return onError("Razorpay SDK failed to load. Are you online?");
    }

    try {
      const order = await createRazorpayOrder({ path, body: payload }).unwrap();
      const rzp = new window.Razorpay({
        key: import.meta.env.VITE_RZP_KEY_ID,
        order_id: order.id,
        handler: async (resp) => {
          console.log(resp);
          await verifyRazorpay({
            path,
            body: { ...resp, ...payload },
          }).unwrap();
          onSuccess(resp);
        },
        prefill: {
          name: payload.userInfo.name,
          email: payload.userInfo.email,
          contact: payload.userInfo.phone,
        },
        theme: {
          color: "#6366F1", // Tailwind indigo-500
        },
      });
      rzp.open();
    } catch (err) {
      onError(err);
    }
  };

  return checkout;
};
