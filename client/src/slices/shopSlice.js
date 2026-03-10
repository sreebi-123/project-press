import { SHOP_URL, USERS_URL } from "../../constants.js";
import { apiSlice } from "./apiSlice.js";

export const ShopApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // Existing endpoints...
    Shoplogin: builder.mutation({
      query: (data) => ({
        url: `${SHOP_URL}/signin`,
        method: "POST",
        body: data,
      }),
    }),

    ShopRegister: builder.mutation({
      query: (data) => ({
        url: `${SHOP_URL}/createPrintingUnit`,
        method: "POST",
        body: data,
      }),
    }),

    logoutShop: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/adminlogout`,
        method: "POST",
      }),
    }),

    getAllUnits: builder.query({
      query: () => ({
        url: `${SHOP_URL}/getallunits`,
      }),
      providesTags: ["Units"],
      keepUnusedDataFor: 5,
    }),

    getUnitById: builder.query({
      query: (id) => ({
        url: `${SHOP_URL}/getunitbyid/${id}`,
      }),
    }),

    verifyUnit: builder.mutation({
      query: (id) => ({
        url: `${SHOP_URL}/${id}/verify`,
        method: "PUT",
      }),
    }),

    rejectUnit: builder.mutation({
      query: (id) => ({
        url: `${SHOP_URL}/${id}/reject`,
        method: "PUT",
      }),
    }),

    deleteUnit: builder.mutation({
      query: (id) => ({
        url: `${SHOP_URL}/deleteunit/${id}`,
        method: "DELETE",
      }),
    }),

    ShopProfile: builder.query({
      query: () => ({
        url: `${SHOP_URL}/get-shop-profile`,
        method: "GET",
      }),
      providesTags: ["User"],
      refetchOnMountOrArgChange: true,
    }),

    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5,
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),

    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteOwnShopAccount: builder.mutation({
      query: (shopId) => ({
        url: `${SHOP_URL}/delete-my-account/${shopId}`,
        method: "DELETE",
      }),
    }),

    updateAdminUnit: builder.mutation({
      query: (data) => ({
        url: `${SHOP_URL}/adminupdateunit`,
        method: "PUT",
        body: data,
      }),
    }),

    uploadShopProfilePic: builder.mutation({
      query: ({ shopId, formData }) => ({
        url: `${SHOP_URL}/upload-profilepic/${shopId}`,
        method: "PUT",
        body: formData,
        formData: true,
        credentials: "include",
      }),
    }),

    uploadShopLogo: builder.mutation({
      query: ({ shopId, formData }) => ({
        url: `${SHOP_URL}/upload-logo/${shopId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    // ✅ ADD: Post a review
    addReviewToShop: builder.mutation({
      query: ({ printingUnitId, ...review }) => ({
        url: `/api/v1/review/${printingUnitId}`,
        method: 'POST',
        body: review,
      }),
      invalidatesTags: ['Reviews'],
    }),

    // ✅ ADD: Get reviews by shop ID
    getReviewsByShopId: builder.query({
      query: (printingUnitId) => ({
        url: `/api/v1/review/${printingUnitId}`,
        method: 'GET',
      }),
      providesTags: ['Reviews'],
    }),
  }),
});

// ✅ Export hooks
export const {
  useShoploginMutation,
  useShopRegisterMutation,
  useLogoutShopMutation,
  useShopProfileQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useGetAllUnitsQuery,
  useVerifyUnitMutation,
  useRejectUnitMutation,
  useDeleteUnitMutation,
  useDeleteOwnShopAccountMutation,
  useUpdateAdminUnitMutation,
  useGetUnitByIdQuery,
  useUploadShopProfilePicMutation,
  useUploadShopLogoMutation,
  useAddReviewToShopMutation,
  useGetReviewsByShopIdQuery,
} = ShopApiSlice;
