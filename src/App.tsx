import { FaBars, FaConnectdevelop, FaListOl, FaLockOpen, FaSignOutAlt } from "react-icons/fa";
import { FaBookOpenReader, FaBuilding, FaFireBurner, FaGlobe, FaLink, FaMobileScreen, FaPeopleGroup } from "react-icons/fa6";
import { getUser, logout } from "./xyz-panel/utils/auth";
import { useEffect, useState } from "react";
import Modal from "./components/ui/Modal";
import { useNavigate } from "react-router-dom";

const App = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string>("");
  const [modalLogout, setModalLogout] = useState<boolean>(false);
  const navigate = useNavigate()

  useEffect(() => {
    const user = getUser();
    setUsername(user.username);
  }, [username]);
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <nav className="navbar w-full fixed top-0 left-0 right-0 z-50 bg-base-300">
            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <FaBars />
            </label>
            <div className="w-full flex justify-between items-center">
              <div className="text-2xl font-bold px-4">Official Site X-Labs</div>
              <div className="hidden md:block lg:block xl:block">
                <button className="btn btn-square btn-ghost" onClick={() => setModalLogout(true)}>
                  <FaSignOutAlt />
                </button>
              </div>
            </div>
          </nav>
          <div className="px-10 pt-24 pb-4 h-screen overflow-y-auto">{children}</div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="flex min-h-full flex-col is-drawer-open:items-start is-drawer-close:items-center bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            <div className="text-2xl font-bold text-center bg-base-300 p-4 mt-20 rounded is-drawer-close:block is-drawer-open:hidden">
              {username.charAt(0).toUpperCase()}
            </div>
            <div className="flex items-center justify-between w-full p-4 mt-20 is-drawer-close:hidden is-drawer-open:block">
              <div className="text-2xl font-bold text-center bg-base-300 p-2 rounded-full">{username.toUpperCase()}</div>
              <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            </div>
            <ul className="menu w-full grow">
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard" onClick={() => navigate("/dashboard")}>
                  <FaFireBurner />
                  <span className="is-drawer-close:hidden">Dashboard</span>
                </button>
              </li>
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="API Log" onClick={() => navigate("/api-log")}>
                  <FaConnectdevelop />
                  <span className="is-drawer-close:hidden">API Log</span>
                </button>
              </li>
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Static Token" onClick={() => navigate("/static-token")}>
                  <FaLockOpen />
                  <span className="is-drawer-close:hidden">Static Token</span>
                </button>
              </li>
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="User Device" onClick={() => navigate("/user-device")}>
                  <FaMobileScreen />
                  <span className="is-drawer-close:hidden">User Device</span>
                </button>
              </li>
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Catalog" onClick={() => navigate("/catalog")}>
                  <FaListOl />
                  <span className="is-drawer-close:hidden">Catalog</span>
                </button>
              </li>
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Terms" onClick={() => navigate("/term")}>
                  <FaBookOpenReader />
                  <span className="is-drawer-close:hidden">Terms</span>
                </button>
              </li>
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Organization" onClick={() => navigate("/organization")}>
                  <FaBuilding />
                  <span className="is-drawer-close:hidden">Organization</span>
                </button>
              </li>
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Team" onClick={() => navigate("/team")}>
                  <FaPeopleGroup />
                  <span className="is-drawer-close:hidden">Team</span>
                </button>
              </li>
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Social Media" onClick={() => navigate("/social-media")}>
                  <FaGlobe />
                  <span className="is-drawer-close:hidden">Social Media</span>
                </button>
              </li>
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Link Social Media" onClick={() => navigate("/link-social-media")}>
                  <FaLink />
                  <span className="is-drawer-close:hidden">Link Social Media</span>
                </button>
              </li>
              <li className="block md:hidden lg:hidden xl:hidden">
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Logout" onClick={() => setModalLogout(true)}>
                  <FaSignOutAlt />
                  <span className="is-drawer-close:hidden">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Modal
        show={modalLogout}
        title="Apakah kamu yakin mau logout?"
        onClose={() => setModalLogout(false)}
      >
        <div className="flex justify-end gap-2">
          <button className="btn bg-blue-500/90 hover:bg-blue-400/80" onClick={logout}>Ya</button>
          <button className="btn btn-ghost" onClick={() => setModalLogout(false)}>Tidak</button>
        </div>
      </Modal>
    </>
  )
}

export default App