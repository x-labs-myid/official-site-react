import PageHead from "@/xyz-panel/components/PageHead";
import type { SchemaCatalogData } from "@/xyz-panel/types/catalog";
import { useEffect, useState } from "react";
import { deleteCatalog, getCatalog } from "@/xyz-panel/api/catalog";
import globalHook from "@/hooks/global";
import {
  FaChevronDown,
  FaChevronUp,
  FaPencil,
  FaPlus,
  FaTrash,
} from "react-icons/fa6";
import Modal from "@/components/ui/Modal";
import Add from "./components/add";
import Edit from "./components/edit";

const Catalog = () => {
  const [catalogs, setCatalogs] = useState<SchemaCatalogData[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [detail, setDetail] = useState<SchemaCatalogData | null>(null);
  const [idForDelete, setIdForDelete] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const { toggleToast, toggleLoading } = globalHook();

  async function getDataCatalog() {
    try {
      toggleLoading(true, "Loading catalog...");
      const response = await getCatalog();
      setCatalogs(response.data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gagal memuat data catalog";
      toggleToast(true, message, "error");
    } finally {
      toggleLoading(false);
    }
  }

  async function handleDelete() {
    try {
      if (!idForDelete) return;
      toggleLoading(true, "Lagi menghapus data catalog...");
      await deleteCatalog(idForDelete);
      toggleToast(true, "Data catalog berhasil dihapus", "success");
      getDataCatalog();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gagal menghapus data catalog";
      toggleToast(true, message, "error");
    } finally {
      toggleLoading(false);
      setIdForDelete(null);
    }
  }

  function handleCloseModal(refreshData?: boolean) {
    setShowAdd(false);
    setDetail(null);
    if (refreshData) getDataCatalog();
  }

  function toggleRow(index: number) {
    setExpandedRow(expandedRow === index ? null : index);
  }

  useEffect(() => {
    getDataCatalog();
  }, []);

  return (
    <>
      <PageHead title="Catalog" />
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">Catalog</h1>
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
                <th>Actions</th>
                <th>App Info</th>
                <th>Status</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {catalogs.map((item, index) => (
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
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-xl bg-base-200">
                            <img
                              src={item.icon_url}
                              alt={item.name}
                              onError={(e) => {
                                e.currentTarget.src = "/icon-only-v2.png";
                                e.currentTarget.classList.add(
                                  "grayscale",
                                  "opacity-50"
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold">{item.name}</span>
                          <span className="text-xs opacity-60 font-mono">
                            {item.package_name}
                          </span>
                          <div className="flex gap-1 mt-1">
                            {item.terms.map((term, i) => (
                              <span
                                key={i}
                                className="badge badge-xs badge-ghost"
                              >
                                {term.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        className={`badge ${
                          item.public ? "badge-success" : "badge-ghost"
                        } badge-sm`}
                      >
                        {item.public ? "Published" : "Draft"}
                      </div>
                    </td>
                    <td>
                      <div
                        className={`badge ${
                          item.is_web ? "badge-info" : "badge-primary"
                        } badge-sm badge-outline`}
                      >
                        {item.is_web ? "Web App" : "Mobile App"}
                      </div>
                    </td>
                  </tr>

                  {expandedRow === index && (
                    <tr>
                      <td colSpan={5} className="bg-base-200/50 p-0">
                        <div className="p-4 space-y-4">
                          {/* Description Block */}
                          <div className="card bg-base-100 shadow-sm compact">
                            <div className="card-body p-4">
                              <h3 className="font-bold text-sm mb-2 opacity-70">
                                Description
                              </h3>
                              <p className="text-sm font-medium">
                                {item.short_description}
                              </p>
                              <div className="divider my-1"></div>
                              <p className="text-sm opacity-80 whitespace-pre-line">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          {/* URLs & Technical Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="card bg-base-100 shadow-sm compact">
                              <div className="card-body p-4">
                                <h3 className="font-bold text-sm mb-2 opacity-70">
                                  App Links
                                </h3>
                                <div className="flex flex-col gap-2 text-sm">
                                  <div className="flex flex-col">
                                    <span className="text-xs opacity-60">
                                      Playstore URL
                                    </span>
                                    <a
                                      href={item.playstore_url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="link link-primary truncate transition-colors hover:text-primary-focus"
                                    >
                                      {item.playstore_url || "-"}
                                    </a>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-xs opacity-60">
                                      Appstore URL
                                    </span>
                                    <a
                                      href={item.appstore_url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="link link-primary truncate transition-colors hover:text-primary-focus"
                                    >
                                      {item.appstore_url || "-"}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="card bg-base-100 shadow-sm compact">
                              <div className="card-body p-4">
                                <h3 className="font-bold text-sm mb-2 opacity-70">
                                  Metadata
                                </h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <span className="text-xs opacity-60 block">
                                      Slug
                                    </span>
                                    <span className="font-mono bg-base-200 px-1 rounded">
                                      {item.slug}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-xs opacity-60 block">
                                      Created By
                                    </span>
                                    <span className="font-medium">System</span>
                                  </div>
                                  <div>
                                    <span className="text-xs opacity-60 block">
                                      Created At
                                    </span>
                                    <span className="font-mono text-xs">
                                      {item.created_at}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-xs opacity-60 block">
                                      Last Update
                                    </span>
                                    <span className="font-mono text-xs">
                                      {item.updated_at}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Add show={showAdd} onClose={handleCloseModal} />
      {detail && (
        <Edit
          show={detail ? true : false}
          detail={detail}
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
            onClick={() => setIdForDelete(null)}
          >
            Tidak
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Catalog;
