import { sidebars } from "../config/SidebarConfig.js";
import { Outlet, useNavigate, ScrollRestoration} from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import store from "../store.js";
import { useState } from "react";
import { LogoutModal } from "../components/LogoutModal.jsx";
import { useLogoutMutation } from "../slices/usersApiSlice.js";
import { logoutUser } from "../slices/authSlice.js";
import { useDispatch } from "react-redux";
import { FiMenu } from "react-icons/fi";

const DashboardLayout = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const state = store.getState();
  const user = state.auth?.userInfo;
  const items = sidebars[user?.role] || [];
  const [logout] = useLogoutMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAction = (action) => {
    if (action === "logout") {
      setShowLogoutModal(true);
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutUser());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    localStorage.removeItem("accessToken");
    setShowLogoutModal(false);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar items={items} onAction={handleAction} collapsed={collapsed} />

      <div className="flex-1 flex flex-col">
        <nav className="bg-white px-4 py-5 flex items-center justify-between border-b border-gray-200">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-600 cursor-pointer hover:text-indigo-500 transition-colors"
          >
            <FiMenu className="text-2xl" />
          </button>
          <h1 className="text-lg font-semibold text-gray-700">User Name</h1>
        </nav>

        <main className="flex-1 ">
          <Outlet />
          <ScrollRestoration />
        </main>
      </div>

      {showLogoutModal && (
        <LogoutModal
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
