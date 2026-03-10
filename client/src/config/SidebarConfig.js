import {
  MdApproval,
  MdPeople,
  MdStore,
  MdLogout,
  MdDashboard,
  MdAddShoppingCart,
  MdGroup,
  MdListAlt,
  MdPerson,
  MdDesignServices,
  MdAddCircle,
  MdPrint, 
} from "react-icons/md";

export const sidebars = {
  superadmin: [
    { label: "Shop Approval", path: "/superadmin/shop-list", icon: MdApproval },
    {
      label: "Online Customers",
      path: "/superadmin/customers-list",
      icon: MdPeople,
    },
    { label: "Shops", path: "/superadmin/shops", icon: MdStore },
    {
      label: "Create Plan",
      path: "/superadmin/create-plan",
      icon: MdAddCircle,
    },
    { label: "Plans", path: "/superadmin/plans", icon: MdListAlt },
    { label: "Logout", action: "logout", icon: MdLogout },
  ],
  admin: [
    { label: "Dashboard", path: "/admin", icon: MdDashboard },
    {
      label: "Create order",
      path: "/admin/create-order",
      icon: MdAddShoppingCart,
    },
    { label: "Staffs", path: "/admin/staffs", icon: MdGroup },
    { label: "Orders", path: "/admin/orders", icon: MdListAlt },
    {
      label: "Printing Dashboard",
      path: "/admin/printing-dashboard",
      icon: MdPrint,
    },
    { label: "Production Dashboard", path: "/admin/production-dashboard", icon: MdDesignServices },
    { label: "Profile", path: "/admin/profile", icon: MdPerson },
    { label: "subscription", path: "/admin/subscription", icon: MdPerson },
    { label: "Logout", action: "logout", icon: MdLogout },
  ],
  designer: [
    { label: "Designer Dashboard", path: "/designer", icon: MdDesignServices },
    { label: "Logout", action: "logout", icon: MdLogout },
  ],
};
