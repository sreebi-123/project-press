import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../../utils/customBaseQuery";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});
