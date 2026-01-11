import { useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { menuConfig } from "../config/menu";

interface SidebarProps {
  user: any;
  onLogout: () => void;
  isOpen: boolean;
}

const Sidebar = ({ user, onLogout, isOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log("Sidebar received user:", user);
  console.log("Sidebar isOpen:", isOpen);

  const getFullName = () => {
    if (!user) return "USER";
    const parts = [user.first_name, user.middle_name, user.last_name].filter(
      Boolean
    );
    const fullName =
      parts.length > 0 ? parts.join(" ") : user.username || "USER";
    console.log("Full name:", fullName);
    return fullName;
  };

  const getInitials = () => {
    if (!user) return "U";
    if (user.first_name) return user.first_name.charAt(0).toUpperCase();
    if (user.username) return user.username.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <div className="drawer-side z-40">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div
        className={`flex min-h-full flex-col bg-base-200 transition-all duration-300 relative ${
          isOpen ? "w-64 items-start" : "w-20 items-center"
        }`}
      >
        {/* Sidebar Header */}
        <div className="w-full flex flex-col shrink-0 z-[60] border-b border-base-content/10 sticky top-0 mt-16 bg-gradient-to-r from-slate-700 to-gray-800">
          <div className="flex items-center justify-between px-4 py-3 min-h-[4rem]">
            <div className="flex items-center gap-3 overflow-hidden min-w-0 flex-1">
              <div className="font-bold text-lg h-10 w-10 flex items-center justify-center bg-primary text-primary-content rounded-full shadow-lg shrink-0">
                {getInitials()}
              </div>
              <div className="flex flex-col min-w-0 overflow-hidden gap-0.5">
                <span className="font-bold text-sm truncate text-white">
                  {getFullName()}
                </span>
                <span className="text-xs truncate opacity-80 text-gray-200">
                  {user?.email || user?.username || "No email"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <ul
          className={`menu w-full grow gap-2 overflow-x-hidden ${
            isOpen ? "p-2" : "px-2 py-4 items-center"
          }`}
        >
          {menuConfig.map((category, catIndex) => (
            <li
              key={catIndex}
              className={`flex flex-col gap-1 ${
                !isOpen ? "w-full items-center" : ""
              }`}
            >
              {/* Category Title */}
              {isOpen && (
                <>
                  <span className="menu-title font-bold uppercase text-xs opacity-50 mt-2 whitespace-nowrap">
                    {category.title}
                  </span>
                  <div className="divider my-0 py-0 h-1 opacity-20"></div>
                </>
              )}
              {!isOpen && (
                <div className="divider my-0 py-0 h-1 opacity-20 w-10 self-center"></div>
              )}

              {/* Category Items */}
              {category.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <ul key={itemIndex} className="menu-list p-0 w-full">
                    <li className={`${!isOpen ? "flex justify-center" : ""}`}>
                      <button
                        className={`flex items-center gap-4 ${
                          !isOpen
                            ? "tooltip tooltip-right justify-center w-10 h-10 p-0"
                            : ""
                        } ${
                          isActive
                            ? "bg-primary text-primary-content shadow-md"
                            : "hover:bg-base-300"
                        }`}
                        data-tip={!isOpen ? item.label : undefined}
                        onClick={() => navigate(item.path)}
                      >
                        <Icon className="text-lg shrink-0" />
                        {isOpen && (
                          <span className="whitespace-nowrap fade-in">
                            {item.label}
                          </span>
                        )}
                      </button>
                    </li>
                  </ul>
                );
              })}
            </li>
          ))}

          {/* Logout Button (Mobile) */}
          {/* Logout Button (Mobile) */}
          <li className="mt-auto md:hidden lg:hidden xl:hidden px-2 pb-4">
            <div className="divider my-2"></div>
            <button
              className="btn bg-error/90 hover:bg-error w-full justify-start gap-3 transition-colors text-white font-medium shadow-sm"
              onClick={onLogout}
            >
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
