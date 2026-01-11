import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { menuConfig } from "../config/menu";

interface SidebarProps {
  user: any;
  onLogout: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ user, onLogout, isOpen, onToggle }: SidebarProps) => {
  const navigate = useNavigate();

  console.log("Sidebar received user:", user);

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
        <div className="w-full bg-base-300 flex flex-col shrink-0 transition-all duration-300 z-50">
          {isOpen ? (
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3 overflow-hidden min-w-0">
                <div className="font-bold text-lg h-10 w-10 flex items-center justify-center bg-base-100 rounded-full text-base-content shadow-sm shrink-0">
                  {getInitials()}
                </div>
                <div className="flex flex-col min-w-0 overflow-hidden">
                  <span className="font-bold text-sm truncate text-base-content">
                    {getFullName()}
                  </span>
                  {user?.email && (
                    <span className="text-xs truncate opacity-70 text-base-content">
                      {user.email}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={onToggle}
                className="btn btn-square btn-sm hidden lg:flex bg-base-100 hover:bg-base-200 border-none text-base-content shadow-sm"
              >
                <FaChevronLeft />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center py-4 gap-3">
              <button
                onClick={onToggle}
                className="btn btn-circle btn-xs hidden lg:flex bg-base-100 hover:bg-base-200 border-none text-base-content shadow-sm"
              >
                <FaChevronRight />
              </button>
              <div className="font-bold text-xl h-10 w-10 flex items-center justify-center bg-base-100 rounded-full text-base-content shadow-sm">
                {getInitials()}
              </div>
            </div>
          )}
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
                return (
                  <ul key={itemIndex} className="menu-list p-0 w-full">
                    <li className={`${!isOpen ? "flex justify-center" : ""}`}>
                      <button
                        className={`flex items-center gap-4 ${
                          !isOpen
                            ? "tooltip tooltip-right justify-center w-10 h-10 p-0"
                            : ""
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
          <li className="mt-auto md:hidden lg:hidden xl:hidden">
            <button className="text-error" onClick={onLogout}>
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
