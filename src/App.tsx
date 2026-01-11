import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { getUser, logout } from "./xyz-panel/utils/auth";
import { useEffect, useState } from "react";
import Modal from "./components/ui/Modal";
import Sidebar from "./xyz-panel/components/Sidebar";

const STORAGE_KEY = "sidebar_state";

const App = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [modalLogout, setModalLogout] = useState<boolean>(false);

  // Initialize state from local storage, default to checked (open)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    const userData = getUser();
    console.log("User data from localStorage:", userData);

    if (userData && Object.keys(userData).length > 0) {
      console.log("Setting user:", userData);
      setUser(userData);
    } else {
      console.log("No user data found, using fallback");
      setUser({
        username: "Superuser",
        first_name: "Super",
        last_name: "User",
        email: "user@example.com",
      });
    }
  }, []);

  // Sync state to local storage
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const newState = !prev;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle"
          checked={isSidebarOpen}
          onChange={toggleSidebar}
        />
        <div className="drawer-content transition-all duration-300">
          <nav className="navbar w-full fixed top-0 left-0 right-0 z-50 bg-base-300">
            {/* Mobile Toggle (Hamburger) */}
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <FaBars />
            </label>
            <div className="w-full flex justify-between items-center">
              <div className="text-2xl font-bold px-4 flex items-center gap-2">
                Xyz Panel
                <img src="/icon-only-v2.png" className="h-5" alt="" />
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="btn btn-ghost gap-2 hover:bg-error/10 hover:text-error transition-colors"
                  onClick={() => setModalLogout(true)}
                >
                  <FaSignOutAlt className="text-lg" />
                  <span className="hidden lg:inline font-medium">Logout</span>
                </button>
              </div>
            </div>
          </nav>
          <div className="px-10 pt-24 pb-4 h-screen overflow-y-auto">
            {children}
          </div>
        </div>

        {/* Sidebar Component */}
        <Sidebar
          user={user}
          onLogout={() => setModalLogout(true)}
          isOpen={isSidebarOpen}
        />
      </div>
      <Modal
        show={modalLogout}
        title="Apakah kamu yakin mau logout?"
        onClose={() => setModalLogout(false)}
      >
        <div className="flex justify-center gap-3 mt-6">
          <button
            className="btn btn-ghost min-w-[100px]"
            onClick={() => setModalLogout(false)}
          >
            Tidak
          </button>
          <button
            className="btn bg-error hover:bg-error/80 text-white min-w-[100px]"
            onClick={logout}
          >
            Ya
          </button>
        </div>
      </Modal>
    </>
  );
};

export default App;
