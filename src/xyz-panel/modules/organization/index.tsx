import { Helmet } from "react-helmet-async";
import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { type SchemaOrgData } from "@/xyz-panel/types/organization";
import globalHook from "@/hooks/global";
import { deleteOrg, getOrg } from "@/xyz-panel/api/organization";
import Add from "./components/add";
import Edit from "./components/edit";
import Modal from "@/components/ui/Modal";

const Organization = () => {
    const [orgList, setOrgList] = useState<SchemaOrgData[]>([])
    const [showAdd, setShowAdd] = useState(false)
    const [detail, setDetail] = useState<SchemaOrgData | null>(null)
    const [idForDelete, setIdForDelete] = useState<string | null>(null)
    const { toggleToast, toggleLoading } = globalHook()

    async function getDataOrg() {
        try {
            toggleLoading(true, "Lagi ngambil data organization...")
            const response = await getOrg()
            setOrgList(response.data)
        } catch (error) {
            const message = error instanceof Error ? error.message : "Gagal memuat data organization"
            toggleToast(true, message, "error")
        } finally {
            toggleLoading(false)
        }
    }

    async function handleDelete() {
        try {
            if (!idForDelete) return
            toggleLoading(true, "Lagi menghapus data organization...")
            await deleteOrg(idForDelete)
            toggleToast(true, "Data organization berhasil dihapus", "success")
            getDataOrg()
        } catch (error) {
            const message = error instanceof Error ? error.message : "Gagal menghapus data organization"
            toggleToast(true, message, "error")
        } finally {
            toggleLoading(false)
            setIdForDelete(null)
        }
    }

    function handleCloseModal(refreshData?: boolean) {
        setShowAdd(false)
        setDetail(null)
        if (refreshData) getDataOrg()
    }

    useEffect(() => {
        getDataOrg()
    }, [])

    return (
        <>
            <Helmet>
                <title>Organization - X-LABS.my.id | Inovasi dan Pengembangan Aplikasi Mobile</title>
            </Helmet>
            <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-4xl font-bold">Organization</h1>
                    <button className="btn bg-blue-500/90 hover:bg-blue-400/80" onClick={() => setShowAdd(true)}>
                        <FaPlus className="w-4 h-4" />
                    </button>
                </div>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Actions</th>
                                <th>Key</th>
                                <th>Value</th>
                                <th>Status</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orgList.map((item, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex gap-2">
                                            <button className="btn bg-blue-500/90 hover:bg-blue-400/80 btn-xs" onClick={() => setDetail(item)}>
                                                <FaPencil className="w-4 h-4" />
                                            </button>
                                            <button className="btn bg-red-500/90 hover:bg-red-400/80 btn-xs" onClick={() => setIdForDelete(item.guid)}>
                                                <FaTrash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                    <td>{item.key}</td>
                                    <td>{item.value}</td>
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
            {detail && <Edit show={detail ? true : false} detail={detail} onClose={handleCloseModal} />}
            <Modal show={idForDelete ? true : false} title="Apakah kamu yakin mau hapus data ini?" onClose={() => handleCloseModal(false)}>
                <div className="flex justify-end gap-2">
                    <button className="btn bg-blue-500/90 hover:bg-blue-400/80" onClick={handleDelete}>Ya</button>
                    <button className="btn btn-ghost" onClick={() => setIdForDelete(null)}>Tidak</button>
                </div>
            </Modal>
        </>
    );
};

export default Organization;