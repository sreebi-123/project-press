import { CUSTOMERS_URL } from "../../constants.js";
import { apiSlice } from "./apiSlice.js";

export const onlineSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    customerLogin: builder.mutation({
      query: (data) => ({
        url: `${CUSTOMERS_URL}/signin`,
        method: "POST",
        body: data,
      }),
    }),

    customerRegister: builder.mutation({
      query: (data) => ({
        url: `${CUSTOMERS_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),

    customerLogout: builder.mutation({
      query: () => ({
        url: `${CUSTOMERS_URL}/logout`,
        method: "POST",
      }),
    }),

    CustomerProfile: builder.query({
      query: () => ({
        url: `${CUSTOMERS_URL}/getOnlineCustomerProfile`,
        method: "GET",
      }),
      providesTags: ["Customer"],
      refetchOnMountOrArgChange: true,
    }),

    CustomerProfileid: builder.query({
      query: (userId) => ({
        url: `${CUSTOMERS_URL}/${userId}`,
        method: "GET",
        body: data,
      }),
    }),

    getCustomer: builder.query({
      query: () => ({
        url: CUSTOMERS_URL,
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5,
    }),

    deleteCustomer: builder.mutation({
      query: (userId) => ({
        url: `${CUSTOMERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),

    updateCustomer: builder.mutation({
      query: (data) => ({
        url: `${CUSTOMERS_URL}/updateOnlineCustomer`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Customer"],

    }),

    // Add get all customers
    getAllCustomers: builder.query({
      query: () => ({
        url: `${CUSTOMERS_URL}/getAllOnlineCustomers`,
      }),
      providesTags: ["Customer"],
      keepUnusedDataFor: 0
    }),

    getCustomerById: builder.query({
      query: (userId) => ({
        url: `${CUSTOMERS_URL}/profile/${userId}`,
        method: "GET",
      }),
    }),

    // Get all orders of a specific customer
    getCustomerOrders: builder.query({
      query: (userId) => ({
        url: `${CUSTOMERS_URL}/orders/${userId}`,
        method: "GET",
      }),
      providesTags: ["Customer"],
    }),

    // Get all reviews of a specific customer
    getCustomerReviews: builder.query({
      query: (userId) => ({
        url: `${CUSTOMERS_URL}/reviews/${userId}`,
        method: "GET",
      }),
      providesTags: ["Customer"],
    }),

    // Request password reset
    requestPasswordReset: builder.mutation({
      query: (data) => ({
        url: `${CUSTOMERS_URL}/request-password-reset`,
        method: "POST",
        body: data,
      }),
    }),

    // Reset password with token
    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: `${CUSTOMERS_URL}/reset-password/${token}`,
        method: "POST",
        body: { newPassword },
      }),
    }),

    changeCustomerPassword: builder.mutation({
      query: (data) => ({
        url: `${CUSTOMERS_URL}/change-password`,
        method: "PUT",
        body: data,
      }),
    }),


  }),
});

export const {
  useCustomerLoginMutation,
  useCustomerRegisterMutation,
  useCustomerLogoutMutation,
  useLazyCustomerProfileQuery,
  useCustomerProfileQuery,
  useGetCustomerQuery,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
  useGetAllCustomersQuery,
  useGetCustomerByIdQuery,
  useGetCustomerOrdersQuery,
  useGetCustomerReviewsQuery,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useChangeCustomerPasswordMutation,
} = onlineSlice;
