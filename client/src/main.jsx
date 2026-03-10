import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import RegisterEmploye from "./pages/RegisterEmploye";
import store from "./store";
import { Provider } from "react-redux";
import CustomerLogin from "./pages/CustomerLogin";
import RegisterShop from "./pages/RegisterShop";
import ShopLogin from "./pages/ShopLogin";
import AdminDashboard from "./pages/AdminDashboard";
import OnlineCustomerRegisterPage from "./pages/OnlineCustomerRegisterPage";
import ShopApprovalList from "./pages/ShopApprovalList";
import ThankYou from "./pages/Thankyou";
import { roleGuard } from "../utils/roleGuard";
import roleRedirectLoader from "../utils/roleRedirectLoader";
import WalkInOrderForm from "./pages/WalkInOrderForm";
import CustomerProfileScreen from "./pages/CustomerProfileScreen";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import NotFound from "./pages/NotFound";
import WalkInToken from "./components/WalkInToken";
import Unauthorized from "./pages/Unauthorized";
import AdminOrderList from "./pages/AdminOrderList";
import ShopProfile from "./pages/ShopProfile";
import CustomersList from "./pages/CustomersList";
import ViewCustomerProfile from "./pages/ViewCustomerProfile";
import BillingDetailsPage from "./pages/BillingDetailsPage";
import ShopList from "./pages/ShopList";
import ShopDetails from "./pages/ShopDetails";
import Staffs from "./pages/Staffs";
import DesignerDashboard from "./pages/DesignerDashboard";
// import Payment from "./pages/Payment.jsx";
import EmployeeLogin from "./pages/EmployeeLogin";
import Shops from "./pages/Shops.jsx";
import EmployeeDetails from "./pages/EmployeeDetails.jsx";
import InvoicePage from "./pages/InvoicePage.jsx";
import OnlineCustomerOrderForm from "./pages/OnlineCustomerOrderForm.jsx";

import SubscriptionCard from "./pages/SubscriptionCard.jsx";
import AdminPlan from "./pages/AdminPlan.jsx";
import CreatePlan from "./pages/CreatePlan.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import PrintingDashboard from "./pages/PrintingDashboard.jsx";
import ProductionDashboard from "./pages/ProductionDashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    loader: roleRedirectLoader,
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login-customer", element: <CustomerLogin /> },
      { path: "register-customer", element: <OnlineCustomerRegisterPage /> },
      { path: "register-shop", element: <RegisterShop /> },
      { path: "login-shop", element: <ShopLogin /> },
      { path: "thank-you", element: <ThankYou /> },
      { path: "shop-details/:shopId", element: <Shops /> },
      { path: "*", element: <NotFound /> },
      { path: "profile", element: <CustomerProfileScreen /> },
      { path: "unauthorized", element: <Unauthorized /> },
      { path: "online/:shopId", element: <OnlineCustomerOrderForm /> },
      { path: "About", element: <AboutUs /> },
      { path: "contact", element: <ContactPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "privacy", element: <PrivacyPolicy /> },
    ],
  },
  { path: "login-superadmin", element: <SuperAdminLogin /> },
  { path: "employee-login", element: <EmployeeLogin /> },
  { path: "invoice/:id", element: <InvoicePage /> },
  {
    path: "/admin",
    element: <DashboardLayout />,
    loader: () => roleGuard(["admin"]),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "register", element: <RegisterEmploye /> },
      { path: "create-order", element: <WalkInOrderForm /> },
      { path: "staffs", element: <Staffs /> },
      { path: "staff/:id", element: <EmployeeDetails /> },
      { path: "token", element: <WalkInToken /> },
      { path: "orders", element: <AdminOrderList /> },
      { path: "profile", element: <ShopProfile /> },
      { path: "/admin/billing/:id", element: <BillingDetailsPage /> },
      { path: "subscription", element: <SubscriptionCard /> },
      // { path: "subscription", element: <Payment /> },
      { path: "printing-dashboard", element: <PrintingDashboard /> },
       { path: "production-dashboard", element: <ProductionDashboard /> },
    ],
  },
  {
    path: "/superadmin",
    element: <DashboardLayout />,
    loader: () => roleGuard(["superadmin"]),
    children: [
      { index: true, element: <SuperAdminDashboard /> },
      { path: "shop-list", element: <ShopApprovalList /> },
      { path: "customers-list", element: <CustomersList /> },
      { path: "customers/:id", element: <ViewCustomerProfile /> },
      { path: "shops", element: <ShopList /> },
      { path: "shop-details/:id", element: <ShopDetails /> },
      { path: "create-plan", element: <CreatePlan /> },
      { path: "plans", element: <AdminPlan /> },
    ],
  },
  /*
  {
    path: "/customer",
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "profile", element: <CustomerProfileScreen /> },
    ],
  },
  */
  {
    path: "/designer",
    element: <DashboardLayout />,
    loader: () => roleGuard(["designer"]),
    children: [{ index: true, element: <DesignerDashboard /> }],
  },
]);

export default router;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
