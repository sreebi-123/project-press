import { apiSlice } from "./apiSlice";
import { PDF_URL } from "../../constants";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    downloadInvoicePDF: builder.mutation({
      query: (orderId) => ({
        url: `${PDF_URL}/pdf/${orderId}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
        credentials: "include", // if your backend is protected by cookies/session
      }),
    }),
  }),
});

export const { useDownloadInvoicePDFMutation } = authApiSlice;
