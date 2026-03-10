// import { apiSlice } from "./apiSlice";
// import { ORDER_URL } from "../../constants";

// export const orderApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // ✅ Create Walk-In or Online Order
//     createOrder: builder.mutation({
//       query: (data) => ({
//         url: `${ORDER_URL}/CreateOrder`,
//         method: "POST",
//         body: data,
//         credentials: "include",
//       }),
//     }),

//     // ✅ Get Orders (Confirmed) with Pagination, Filter, Search
//     getAllOrders: builder.query({
//       query: ({ shopId, page = 1, limit = 10, orderType, search, status }) => {
//         const params = new URLSearchParams();
//         params.append("shopId", shopId);
//         params.append("page", page);
//         params.append("limit", limit);
//         if (orderType) params.append("orderType", orderType);
//         if (search) params.append("search", search);
//         if (status) params.append("status", status);

//         return {
//           url: `${ORDER_URL}/getAllOrders?${params.toString()}`,
//           credentials: "include",
//         };
//       },
//       keepUnusedDataFor: 5,
//     }),

//     // ✅ Get Single Order by ID
//     getOrderById: builder.query({
//       query: (id) => ({
//         url: `${ORDER_URL}/${id}`,
//         credentials: "include",
//       }),
//     }),

//     // ✅ Update Order
//     updateOrder: builder.mutation({
//       query: ({ id, data }) => ({
//         url: `${ORDER_URL}/updateOrder/${id}`,
//         method: "PUT",
//         body: data,
//         credentials: "include",
//       }),
//     }),

//     // ✅ Delete Order
//     deleteOrder: builder.mutation({
//       query: (id) => ({
//         url: `${ORDER_URL}/deleteOrder/${id}`,
//         method: "DELETE",
//         credentials: "include",
//       }),
//     }),

//     // ✅ Update Billing Details
//     updateBilling: builder.mutation({
//       query: ({ id, billingDetails }) => ({
//         url: `${ORDER_URL}/${id}/billing`,
//         method: "PATCH",
//         body: { billingDetails },
//         credentials: "include",
//       }),
//     }),

//     // ✅ Mark Order As Paid (Admin only)
//     markOrderAsPaid: builder.mutation({
//       query: (id) => ({
//         url: `${ORDER_URL}/${id}/mark-paid`,
//         method: "PATCH",
//         credentials: "include",
//       }),
//       // ✅ Designer: Get Assigned Orders
//     getDesignerOrders: builder.query({
//       query: () => ({
//         url: `${ORDER_URL}/orders/designer`,
//         credentials: "include",
//       }),
//       providesTags: ["Orders"],
//     }),

//     // ✅ Designer: Update Design Status (Start / Complete)
//     updateDesignStatus: builder.mutation({
//       query: ({ id, status }) => ({
//         url: `${ORDER_URL}/${id}/design-status`,
//         method: "PUT",
//         body: { status },
//         credentials: "include",
//       }),
//       invalidatesTags: ["Orders"],
//     }),

//     // ✅ Designer: Upload Design File
//     uploadDesignFile: builder.mutation({
//       query: ({ id, fileUrl }) => ({
//         url: `${ORDER_URL}/${id}/upload-design`,
//         method: "POST",
//         body: { fileUrl },
//         credentials: "include",
//       }),
//       invalidatesTags: ["Orders"],
//     }),
//     }),
//   }),
// });

// export const {
//   useCreateOrderMutation,
//   useGetAllOrdersQuery,
//   useGetOrderByIdQuery,
//   useUpdateOrderMutation,
//   useDeleteOrderMutation,
//   useUpdateBillingMutation,
//   useMarkOrderAsPaidMutation,
//   useGetDesignerOrdersQuery,
//   useUpdateDesignStatusMutation,
//   useUploadDesignFileMutation,
// } = orderApiSlice;
import { apiSlice } from "./apiSlice";
import { ORDER_URL } from "../../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create Walk-In or Online Order
    // createOrder: builder.mutation({
    //   query: (data) => ({
    //     url: `${ORDER_URL}/CreateOrder`,
    //     method: "POST",
    //     body: data,
    //     credentials: "include",
    //   }),
    // }),
    // createOrder: builder.mutation({
    //   query: (formData) => {
    //     return {
    //       url: `${ORDER_URL}/CreateOrder`,
    //       method: "POST",
    //       body: formData, // formData must be sent as is for multipart/form-data
    //       credentials: "include",
    //       // Do NOT set 'Content-Type' header here, browser sets it automatically for FormData
    //     };
    //   },
    // }),
    createOrder: builder.mutation({
      query: (formData) => ({
        url: `${ORDER_URL}/CreateOrder`,
        method: "POST",
        body: formData,
        credentials: "include", 
      }),
      invalidatesTags: ["Orders"],
    }),

    // ✅ Get Orders (Confirmed) with Pagination, Filter, Search
    getAllOrders: builder.query({
      query: ({ shopId, page = 1, limit = 10, orderType, search, status }) => {
        const params = new URLSearchParams();
        params.append("shopId", shopId);
        params.append("page", page);
        params.append("limit", limit);
        if (orderType) params.append("orderType", orderType);
        if (search) params.append("search", search);
        if (status) params.append("status", status);

        return {
          url: `${ORDER_URL}/getAllOrders?${params.toString()}`,
          credentials: "include",
        };
      },
      keepUnusedDataFor: 5,
    }),

    // ✅ Get Single Order by ID
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        credentials: "include",
      }),
    }),

    // ✅ Update Order
    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ORDER_URL}/updateOrder/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    // ✅ Delete Order
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/deleteOrder/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    // ✅ Update Billing Details
    updateBilling: builder.mutation({
      query: ({ id, billingDetails }) => ({
        url: `${ORDER_URL}/${id}/billing`,
        method: "PATCH",
        body: { billingDetails },
        credentials: "include",
      }),
    }),

    // ✅ Mark Order As Paid (Admin only)
    markOrderAsPaid: builder.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/${id}/mark-paid`,
        method: "PATCH",
        credentials: "include",
      }),
    }),

    // ✅ Designer: Get Assigned Orders
    getDesignerOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/designer`,
        credentials: "include",
      }),
      providesTags: ["Orders"],
    }),

    // ✅ Designer: Update Design Status (Start / Complete)
    updateDesignStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `${ORDER_URL}/${id}/design-status`,
        method: "PUT",
        body: { status },
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),

    // ✅ Designer: Upload Design File
    // uploadDesignFile: builder.mutation({
    //   query: ({ id, fileUrl }) => ({
    //     url: `${ORDER_URL}/${id}/upload-design`,
    //     method: "POST",
    //     body: { fileUrl },
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["Orders"],
    // }),
    uploadDesignFile: builder.mutation({
      query: ({ id, file }) => {
        const formData = new FormData();
        formData.append("design", file); // 👈 Must match `upload.single("design")`

        return {
          url: `${ORDER_URL}/${id}/upload-design`,
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["Orders"],
    }),
    // ✅ Get Employee Stats
    getEmployeeStats: builder.query({
      query: (userId) => ({
        url: `/api/stats/employee/${userId}`,
        credentials: "include",
      }),
    }),
   // 1. Fetch design complete orders
    // getDesignCompleteOrders: builder.query({
    //   query: () => `${ORDER_URL}/design-complete`,
    //   providesTags: ["Orders"],
    // }),
    getDesignCompleteOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/design-complete`,
        method: "GET",
        credentials: "include", // 👈 ensures cookie/session is sent
      }),
      providesTags: ["Orders"],
    }),

    // markOrderAsPrinted: builder.mutation({
    //   query: (orderId) => ({
    //     url: `${ORDER_URL}/${orderId}/printed`,
    //     method: "PATCH",
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["Orders"],
    // }),

    // getPrintReadyOrders: builder.query({
    //   query: () => ({
    //     url: `${ORDER_URL}/printing-done`,
    //     method: "GET",
    //     credentials: "include",
    //   }),
    //   providesTags: ["Orders"],
    //   transformResponse: (response) => ({ orders: response.orders || [] }),
    // }),

    // // ------------------ Production Dashboard ------------------
    // getProductionReadyOrders: builder.query({
    //   query: () => ({
    //     url: `${ORDER_URL}/production-ready`,
    //     method: "GET",
    //     credentials: "include",
    //   }),
    //   providesTags: ["Orders"],
    //   transformResponse: (response) => ({ orders: response.orders || [] }),
    // }),

    // markOrderAsCompleted: builder.mutation({
    //   query: (orderId) => ({
    //     url: `${ORDER_URL}/${orderId}/mark-completed`,
    //     method: "PUT",
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["Orders"],
    // }),

    // markOrderAsDelivered: builder.mutation({
    //   query: (orderId) => ({
    //     url: `${ORDER_URL}/${orderId}/mark-delivered`,
    //     method: "PUT",
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["Orders"],
    // }),
    markOrderAsPrinted: builder.mutation({
  query: (orderId) => ({
    url: `${ORDER_URL}/${orderId}/printed`,
    method: "PATCH",
    credentials: "include",
  }),
  invalidatesTags: ["Orders"],
}),

getPrintReadyOrders: builder.query({
  query: () => ({
    url: `${ORDER_URL}/printing-done`,
    method: "GET",
    credentials: "include",
  }),
  providesTags: ["Orders"],
  transformResponse: (response) => ({ orders: response.orders || [] }),
}),

// Production Dashboard
getProductionReadyOrders: builder.query({
  query: () => ({
    url: `${ORDER_URL}/production-ready`,
    method: "GET",
    credentials: "include",
  }),
  providesTags: ["Orders"],
  transformResponse: (response) => ({ orders: response.orders || [] }),
}),

// NOTE: backend routes expect PATCH /:id/completed and PATCH /:id/delivered
markOrderAsCompleted: builder.mutation({
  query: (orderId) => ({
    url: `${ORDER_URL}/${orderId}/completed`,
    method: "PATCH",
    credentials: "include",
  }),
  invalidatesTags: ["Orders"],
}),

markOrderAsDelivered: builder.mutation({
  query: (orderId) => ({
    url: `${ORDER_URL}/${orderId}/delivered`,
    method: "PATCH",
    credentials: "include",
  }),
  invalidatesTags: ["Orders"],
}),

  }),
});


export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useUpdateBillingMutation,
  useMarkOrderAsPaidMutation,
  useGetDesignerOrdersQuery,
  useUpdateDesignStatusMutation,
  useUploadDesignFileMutation,
  useGetEmployeeStatsQuery,
    useGetDesignCompleteOrdersQuery,
  useMarkOrderAsPrintedMutation,
  useGetPrintReadyOrdersQuery,
  useGetProductionReadyOrdersQuery,
  useMarkOrderAsCompletedMutation,
  useMarkOrderAsDeliveredMutation,
} = orderApiSlice;
