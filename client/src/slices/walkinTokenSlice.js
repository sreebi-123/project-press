import { apiSlice } from "./apiSlice";

export const walkinTokenApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateWalkInToken: builder.mutation({
      query: () => ({
        url: "/api/v1/tokenRouter/tokengenerate",
        method: "POST",
        // credentials: "include", // for cookie-based/session auth
      }),
    }),
  }),
});

export const { useGenerateWalkInTokenMutation } = walkinTokenApiSlice;
