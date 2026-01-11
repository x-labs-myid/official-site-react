import { useEffect, useState } from "react";
import PageHead from "@/xyz-panel/components/PageHead";
import globalHook from "@/hooks/global";
import { type SchemaTeamData } from "@/xyz-panel/types/team";
import { deleteTeam, getTeam } from "@/xyz-panel/api/team";
import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import Add from "./components/add";
import Edit from "./components/edit";
import Modal from "@/components/ui/Modal";

const Team = () => {
  const [teamList, setTeamList] = useState<SchemaTeamData[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [detail, setDetail] = useState<SchemaTeamData | null>(null);
  const [idForDelete, setIdForDelete] = useState<string | null>(null);
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
                <th>No</th>
                <th>Actions</th>
                <th>Name</th>
                <th>Title</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {teamList.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn bg-blue-500/90 hover:bg-blue-400/80 btn-xs"
                        onClick={() => setDetail(item)}
                      >
                        <FaPencil className="w-4 h-4" />
                      </button>
                      <button
                        className="btn bg-red-500/90 hover:bg-red-400/80 btn-xs"
                        onClick={() => setIdForDelete(item.guid)}
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.title}</td>
                  <td>
                    <p>{item.is_visible ? "Published" : "Draft"}</p>
                  </td>
                  <td>{item.created_at}</td>
                </tr>
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
