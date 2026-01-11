import { Helmet } from "react-helmet-async";
import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
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

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Helmet>
        <title>
          Static Token - X-LABS.my.id | Inovasi dan Pengembangan Aplikasi Mobile
        </title>
      </Helmet>
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
                <th>No</th>
                <th>Actions</th>
                <th>Name</th>
                <th>Token</th>
                <th>Type</th>
                <th>Allowed Routes</th>
                <th>Is Active</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {staticToken.map((item, index) => (
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
                  <td>{item.token}</td>
                  <td>{item.type}</td>
                  <td>{item.allowed_routes}</td>
                  <td>{item.is_active ? "Published" : "Draft"}</td>
                  <td>{item.created_at}</td>
                  <td>{item.updated_at}</td>
                </tr>
              ))}
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
