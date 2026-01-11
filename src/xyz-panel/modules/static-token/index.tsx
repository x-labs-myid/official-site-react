import PageHead from "@/xyz-panel/components/PageHead";
import {
  FaChevronDown,
  FaChevronUp,
  FaCopy,
  FaPencil,
  FaPlus,
  FaTrash,
} from "react-icons/fa6";
import type { SchemaStaticTokenData } from "@/xyz-panel/types/static-token";
import { useEffect, useState } from "react";
import {
  deleteStaticToken,
  getStaticToken,
} from "@/xyz-panel/api/static-token";
import globalHook from "@/hooks/global";
import Add from "./components/add";
import type { SchemaCatalogAppsListData } from "@/xyz-panel/types/catalog";
import { getCatalogForApps } from "@/xyz-panel/api/catalog";
import Edit from "./components/edit";
import Modal from "@/components/ui/Modal";

const StaticToken = () => {
  const [staticToken, setStaticToken] = useState<SchemaStaticTokenData[]>([]);
  const [apps, setApps] = useState<SchemaCatalogAppsListData[]>([]);
  const [detail, setDetail] = useState<SchemaStaticTokenData | null>(null);
  const [idForDelete, setIdForDelete] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const { toggleToast, toggleLoading } = globalHook();

  async function getData() {
    try {
      toggleLoading(true, "Loading static token...");
      const [dataStaticToken, dataApps] = await Promise.all([
        getStaticToken(),
        getCatalogForApps(),
      ]);
      setStaticToken(dataStaticToken.data);
      setApps(dataApps.data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal memuat data static token";
      toggleToast(true, message, "error");
    } finally {
      toggleLoading(false);
    }
  }

  async function handleDelete() {
    try {
      if (!idForDelete) return;
      toggleLoading(true, "Lagi menghapus data static token...");
      await deleteStaticToken(idForDelete);
      toggleToast(true, "Data static token berhasil dihapus", "success");
      getData();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal menghapus data static token";
      toggleToast(true, message, "error");
    } finally {
      toggleLoading(false);
      setIdForDelete(null);
    }
  }

  function handleCloseModal(refreshData: boolean = false) {
    setShowAdd(false);
    setDetail(null);
    setIdForDelete(null);
    if (refreshData) getData();
  }

  function toggleRow(index: number) {
    setExpandedRow(expandedRow === index ? null : index);
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <PageHead title="Static Token" />
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">Static Token</h1>
          <button
            className="btn bg-blue-500/90 hover:bg-blue-400/80"
            onClick={() => setShowAdd(true)}
          >
            <FaPlus className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-4">
          <table className="table">
            <thead>
              <tr>
                <th className="w-12"></th>
                <th>No</th>
                <th>Actions</th>
                <th>Name</th>
                <th>Token</th>
                <th>Type</th>
                <th>Allowed Routes</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {staticToken.map((item, index) => {
                let routes: string[] = [];
                try {
                  routes = JSON.parse(item.allowed_routes);
                } catch (e) {
                  routes = [];
                }

                return (
                  <>
                    <tr
                      key={index}
                      className="hover cursor-pointer"
                      onClick={() => toggleRow(index)}
                    >
                      <td>
                        <button className="btn btn-ghost btn-xs">
                          {expandedRow === index ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </button>
                      </td>
                      <th>{index + 1}</th>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn bg-blue-500/90 hover:bg-blue-400/80 btn-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDetail(item);
                            }}
                          >
                            <FaPencil className="w-3 h-3 text-white" />
                          </button>
                          <button
                            className="btn bg-red-500/90 hover:bg-red-400/80 btn-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIdForDelete(item.guid);
                            }}
                          >
                            <FaTrash className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      </td>
                      <td className="font-bold">{item.name}</td>
                      <td>
                        <div className="flex items-center gap-2 group">
                          <span className="font-mono text-xs opacity-70">
                            {item.token.substring(0, 10)}...
                            {item.token.substring(item.token.length - 10)}
                          </span>
                          <button
                            className="btn btn-ghost btn-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(item.token);
                              toggleToast(true, "Token copied!", "success");
                            }}
                            title="Copy Token"
                          >
                            <FaCopy className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td>
                        <div
                          className={`badge ${
                            item.type === "PROD"
                              ? "badge-error"
                              : item.type === "DEV"
                              ? "badge-warning"
                              : "badge-info"
                          } badge-sm font-bold`}
                        >
                          {item.type}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost badge-sm font-mono">
                          {routes.length} Routes
                        </span>
                      </td>
                      <td>
                        <div
                          className={`badge ${
                            item.is_active ? "badge-success" : "badge-ghost"
                          } badge-sm`}
                        >
                          {item.is_active ? "Active" : "Inactive"}
                        </div>
                      </td>
                      <td className="text-xs opacity-60 font-mono">
                        {item.created_at}
                      </td>
                      <td className="text-xs opacity-60 font-mono">
                        {item.updated_at}
                      </td>
                    </tr>
                    {expandedRow === index && (
                      <tr>
                        <td colSpan={10} className="bg-base-200/50 p-0">
                          <div className="p-4">
                            <h3 className="font-bold text-sm mb-2 opacity-70">
                              Allowed Routes Config
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {routes.map((route, i) => (
                                <span
                                  key={i}
                                  className="badge badge-neutral font-mono"
                                >
                                  {route}
                                </span>
                              ))}
                              {routes.length === 0 && (
                                <span className="text-xs opacity-50 italic">
                                  No routes configured
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Add show={showAdd} apps={apps} onClose={handleCloseModal} />
      {detail && (
        <Edit
          show={detail ? true : false}
          detail={detail}
          apps={apps}
          onClose={handleCloseModal}
        />
      )}
      <Modal
        show={idForDelete ? true : false}
        title="Apakah kamu yakin mau hapus data ini?"
        onClose={() => handleCloseModal(false)}
      >
        <div className="flex justify-end gap-2">
          <button
            className="btn bg-blue-500/90 hover:bg-blue-400/80"
            onClick={handleDelete}
          >
            Ya
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => handleCloseModal(false)}
          >
            Tidak
          </button>
        </div>
      </Modal>
    </>
  );
};

export default StaticToken;
