import { Helmet } from "react-helmet-async";
import type { SchemaCatalogData } from "@/xyz-panel/types/catalog";
import { useEffect, useState } from "react";
import { deleteCatalog, getCatalog } from "@/xyz-panel/api/catalog";
import globalHook from "@/hooks/global";
import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import Modal from "@/components/ui/Modal";
import Add from "./components/add";
import Edit from "./components/edit";

const Catalog = () => {
  const [catalogs, setCatalogs] = useState<SchemaCatalogData[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [detail, setDetail] = useState<SchemaCatalogData | null>(null);
  const [idForDelete, setIdForDelete] = useState<string | null>(null);
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

  useEffect(() => {
    getDataCatalog();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Catalog - X-LABS.my.id | Inovasi dan Pengembangan Aplikasi Mobile
        </title>
      </Helmet>
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
                <th>No</th>
                <th>Actions</th>
                <th>Icon</th>
                <th>Name</th>
                <th>Short Description</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {catalogs.map((item, index) => (
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
                  <td>
                    <img
                      src={item.icon_url}
                      alt={item.slug}
                      className="w-16 h-16"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <p>{item.short_description}</p>
                    {item.terms.map((term, index) => (
                      <span className="badge badge-ghost" key={index}>
                        {term.name}
                      </span>
                    ))}
                  </td>
                  <td>{item.public ? "Published" : "Draft"}</td>
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

export default Catalog;
