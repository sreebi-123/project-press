import store from "../src/store.js";
import { redirect } from "react-router-dom";

export const roleGuard = (allowedRoles = []) => {
  const state = store.getState();
  const user = state.auth?.userInfo;
  /*
  const role = user.role;
  const isPaid = user?.subscription?.isPaid;
  if (!user) {
    return redirect("/");
  }
  if (!isPaid && role !== "superadmin") {
    return redirect("/subscription");
  }
    */
  if (!allowedRoles.includes(user.role)) {
    return redirect("/unauthorized");
  }
  // All good
  return null;
};
