import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  credentials: "include",
});

export const customBaseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    const reason = result.error.data?.reason;
    if (reason === "expired" || reason === "not_subscribed") {
      // Redirect to subscription page globally
      if (typeof window !== "undefined") {
        toast.error("Subscription required. Redirecting...");
        window.location.href = "/subscription";
      }
    }
  }

  return result;
};
