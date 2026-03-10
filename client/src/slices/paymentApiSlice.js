
// import { apiSlice } from "./apiSlice.js";

// export const paymentApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//       createOrder: builder.mutation({
//         query: (amount) => ({
//           url: 'api/v1/payment/create-order',
//           method: 'POST',
//           body: { amount },
//         }),
//       }),
//     }),
//   });

//   export const { useCreateOrderMutation } = paymentApiSlice;


// 

import { PAYMENT_URL } from "../../constants.js";
import { apiSlice } from "./apiSlice.js";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRazorpayOrder: builder.mutation({
      query: ({ path, body }) => ({
        url: `${PAYMENT_URL}/create-${path}-order`,
        method: "POST",
        body,
      }),
    }),
    verifyRazorpay: builder.mutation({
      query: ({ path, body }) => ({
        url: `${PAYMENT_URL}/verify-${path}-payment`,
        method: "POST",
        body,
      }),
    }),
    createPlan: builder.mutation({
      query: (newPlan) => ({
        url: `${PAYMENT_URL}/create-plan`,
        method: "POST",
        body: newPlan,
      }),
    }),
    getVisiblePlan: builder.query({
      query: () => `${PAYMENT_URL}/visible-plan`,
    }),
    setVisiblePlan: builder.mutation({
      query: (planId) => ({
        url: `${PAYMENT_URL}/set-visible-plan`,
        method: "POST",
        body: { planId },
      }),
    }),
    getAllPlans: builder.query({
      query: () => `${PAYMENT_URL}/all-plans`,
    }),
    createSubscription: builder.mutation({
      query: ({ planId, name, email, phone }) => ({
        url: `${PAYMENT_URL}/create-subscription`,
        method: "POST",
        body: { planId, name, email, phone },
      }),
    }),
  }),
});

export const {
  useCreateRazorpayOrderMutation,
  useVerifyRazorpayMutation,
  useCreateOrderMutation,
  useCreatePlanMutation,
  useGetAllPlansQuery,
  useGetVisiblePlanQuery,
  useSetVisiblePlanMutation,
  useCreateSubscriptionMutation,
} = paymentApiSlice;