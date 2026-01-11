import PageHead from "@/xyz-panel/components/PageHead";
import {
  FaChevronDown,
  FaChevronUp,
  FaPencil,
  FaPlus,
  FaTrash,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import { type SchemaOrgData } from "@/xyz-panel/types/organization";
import globalHook from "@/hooks/global";
import { deleteOrg, getOrg } from "@/xyz-panel/api/organization";
import Add from "./components/add";
import Edit from "./components/edit";
import Modal from "@/components/ui/Modal";

const Organization = () => {
  const [orgList, setOrgList] = useState<SchemaOrgData[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [detail, setDetail] = useState<SchemaOrgData | null>(null);
  const [idForDelete, setIdForDelete] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const { toggleToast, toggleLoading } = globalHook();

  async function getDataOrg() {
    try {
      toggleLoading(true, "Loading organization...");
      const response = await getOrg();
      setOrgList(response.data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal memuat data organization";
      toggleToast(true, message, "error");
    } finally {
      toggleLoading(false);
    }
  }

  async function handleDelete() {
    try {
      if (!idForDelete) return;
      toggleLoading(true, "Lagi menghapus data organization...");
      await deleteOrg(idForDelete);
      toggleToast(true, "Data organization berhasil dihapus", "success");
      getDataOrg();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal menghapus data organization";
      toggleToast(true, message, "error");
    } finally {
      toggleLoading(false);
      setIdForDelete(null);
    }
  }

  function handleCloseModal(refreshData?: boolean) {
    setShowAdd(false);
    setDetail(null);
    if (refreshData) getDataOrg();
  }

  function toggleRow(index: number) {
    setExpandedRow(expandedRow === index ? null : index);
  }

  useEffect(() => {
    getDataOrg();
  }, []);

  return (
    <>
      <PageHead title="Organization" />
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">Organization</h1>
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
                <th>Key</th>
                <th>Value</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {orgList.map((item, index) => (
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
                          <FaPencil className="w-4 h-4 text-white" />
                        </button>
                        <button
                          className="btn bg-red-500/90 hover:bg-red-400/80 btn-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIdForDelete(item.guid);
                          }}
                        >
                          <FaTrash className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </td>
                    <td className="font-bold">{item.key}</td>
                    <td className="max-w-xs truncate">{item.value}</td>
                    <td>
                      <div
                        className={`badge ${
                          item.is_visible ? "badge-success" : "badge-ghost"
                        } badge-sm`}
                      >
                        {item.is_visible ? "Published" : "Draft"}
                      </div>
                    </td>
                    <td className="font-mono text-xs">{item.created_at}</td>
                  </tr>
                  {expandedRow === index && (
                    <tr>
                      <td colSpan={6} className="bg-base-200/50 p-0">
                        <div className="p-4 space-y-4">
                          {/* Value Block */}
                          <div className="card bg-base-100 shadow-sm compact">
                            <div className="card-body p-4">
                              <h3 className="font-bold text-sm mb-2 opacity-70">
                                Value
                              </h3>
                              <p className="text-sm font-medium whitespace-pre-wrap">
                                {item.value}
                              </p>
                            </div>
                          </div>

                          {/* Metadata */}
                          <div className="card bg-base-100 shadow-sm compact">
                            <div className="card-body p-4">
                              <h3 className="font-bold text-sm mb-2 opacity-70">
                                Metadata
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-xs opacity-60 block">
                                    GUID
                                  </span>
                                  <span className="font-mono bg-base-200 px-1 rounded text-xs select-all">
                                    {item.guid}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-xs opacity-60 block">
                                    Created By
                                  </span>
                                  <span className="font-medium">
                                    {item.created_by}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-xs opacity-60 block">
                                    Updated At
                                  </span>
                                  <span className="font-mono text-xs">
                                    {item.updated_at || "-"}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-xs opacity-60 block">
                                    Key
                                  </span>
                                  <span className="font-mono text-xs">
                                    {item.key}
                                  </span>
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

export default Organization;
