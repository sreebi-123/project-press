import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ items, onAction, collapsed }) => {
  const location = useLocation();

  return (
    <aside
      className={` bg-white border-r border-gray-200 shadow-md py-4 px-2 flex flex-col gap-6 text-gray-800 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <Link to="/">
        {collapsed ? (
          <div className="text-indigo-500 cursor-pointer text-3xl font-bold text-center whitespace-nowrap transition-opacity duration-300">
            P
          </div>
        ) : (
          <div className="text-indigo-500 cursor-pointer text-2xl font-bold  px-5 pt-4 whitespace-nowrap transition-opacity duration-300">
            PrintPress
          </div>
        )}
      </Link>
      <ul className="flex flex-col gap-2 mt-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label}>
              {item.path ? (
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-indigo-100 hover:text-indigo-700 font-medium ${
                    location.pathname === item.path
                      ? "bg-indigo-50 text-indigo-600"
                      : ""
                  }`}
                >
                  <Icon className="text-xl" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              ) : (
                <button
                  onClick={() => onAction?.(item.action)}
                  className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-red-100 hover:text-red-600 font-medium text-red-500 cursor-pointer"
                >
                  <Icon className="text-xl" />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
