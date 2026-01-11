import { useEffect, useState } from "react";
import PageHead from "@/xyz-panel/components/PageHead";
import globalHook from "@/hooks/global";
import { type SchemaTeamData } from "@/xyz-panel/types/team";
import { deleteTeam, getTeam } from "@/xyz-panel/api/team";
import {
  FaChevronDown,
  FaChevronUp,
  FaPencil,
  FaPlus,
  FaTrash,
} from "react-icons/fa6";
import Add from "./components/add";
import Edit from "./components/edit";
import Modal from "@/components/ui/Modal";

const Team = () => {
  const [teamList, setTeamList] = useState<SchemaTeamData[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [detail, setDetail] = useState<SchemaTeamData | null>(null);
  const [idForDelete, setIdForDelete] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const { toggleToast, toggleLoading } = globalHook();

  async function getDataTeam() {
    try {
      toggleLoading(true, "Loading team...");
      const response = await getTeam();
      setTeamList(response.data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gagal memuat data team";
      toggleToast(true, message, "error");
    } finally {
      toggleLoading(false);
    }
  }

  async function handleDelete() {
    try {
      if (!idForDelete) return;
      toggleLoading(true, "Lagi menghapus data team...");
      await deleteTeam(idForDelete);
      toggleToast(true, "Data team berhasil dihapus", "success");
      getDataTeam();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gagal menghapus data team";
      toggleToast(true, message, "error");
    } finally {
      toggleLoading(false);
      setIdForDelete(null);
    }
  }

  function handleCloseModal(refreshData?: boolean) {
    setShowAdd(false);
    setDetail(null);
    if (refreshData) getDataTeam();
  }

  function toggleRow(index: number) {
    setExpandedRow(expandedRow === index ? null : index);
  }

  useEffect(() => {
    getDataTeam();
  }, []);
  return (
    <>
      <PageHead title="Teams" />
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">Team</h1>
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
                <th>Member Info</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {teamList.map((item, index) => (
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
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-xl bg-base-200">
                            <img
                              src={
                                item.avatar_url ||
                                `https://ui-avatars.com/api/?name=${item.name}&background=random`
                              }
                              alt={item.name}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold">{item.name}</span>
                          <span className="text-xs opacity-60 font-mono">
                            {item.title}
                          </span>
                        </div>
                      </div>
                    </td>
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
                      <td colSpan={5} className="bg-base-200/50 p-0">
                        <div className="p-4 space-y-4">
                          {/* Social Media Block */}
                          <div className="card bg-base-100 shadow-sm compact">
                            <div className="card-body p-4">
                              <h3 className="font-bold text-sm mb-2 opacity-70">
                                Social Media
                              </h3>
                              {item.social_media &&
                              item.social_media.length > 0 ? (
                                <div className="flex gap-2 flex-wrap">
                                  {item.social_media.map((sm, i) => (
                                    <div
                                      key={i}
                                      className="badge badge-outline gap-2"
                                    >
                                      <span className="font-bold">
                                        {sm.name}
                                      </span>
                                      <span className="text-xs">
                                        {sm.username}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-xs opacity-50 italic">
                                  No social media linked
                                </p>
                              )}
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

export default Team;
