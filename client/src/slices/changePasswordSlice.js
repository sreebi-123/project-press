import { apiSlice } from "./apiSlice";
import { CHANGE_URL } from "../../constants";
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => ({
        url: `${CHANGE_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = authApiSlice;
