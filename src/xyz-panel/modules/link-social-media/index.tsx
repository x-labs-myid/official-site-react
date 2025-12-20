import { deleteLinkSocialMedia, getLinkSocialMedia } from "@/xyz-panel/api/link-social-media";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import globalHook from "@/hooks/global";
import { type SchemaLinkSocialMediaData } from "@/xyz-panel/types/link-social-media";
import { useEffect } from "react";
import { FaPlus, FaPencil, FaTrash } from "react-icons/fa6";
import Add from "./components/add";
import Edit from "./components/edit";
import Modal from "@/components/ui/Modal";

const LinkSocialMedia = () => {
    const [linkSocialMediaList, setLinkSocialMediaList] = useState<SchemaLinkSocialMediaData[]>([])
    const [showAdd, setShowAdd] = useState(false)
    const [detail, setDetail] = useState<SchemaLinkSocialMediaData | null>(null)
    const [idForDelete, setIdForDelete] = useState<string | null>(null)
    const { toggleToast, toggleLoading } = globalHook()

    async function getDataLinkSocialMedia() {
        try {
            toggleLoading(true, "Lagi ngambil data link social media...")
            const response = await getLinkSocialMedia()
            setLinkSocialMediaList(response.data)
        } catch (error) {
            const message = error instanceof Error ? error.message : "Gagal memuat data link social media"
            toggleToast(true, message, "error")
        } finally {
            toggleLoading(false)
        }
    }

    async function handleDelete() {
        try {
            if (!idForDelete) return
            toggleLoading(true, "Lagi menghapus data link social media...")
            await deleteLinkSocialMedia(idForDelete)
            toggleToast(true, "Data link social media berhasil dihapus", "success")
            getDataLinkSocialMedia()
        } catch (error) {
            const message = error instanceof Error ? error.message : "Gagal menghapus data link social media"
            toggleToast(true, message, "error")
        } finally {
            toggleLoading(false)
            setIdForDelete(null)
        }
    }

    function handleCloseModal(refreshData?: boolean) {
        setShowAdd(false)
        setDetail(null)
        if (refreshData) getDataLinkSocialMedia()
    }

    useEffect(() => {
        getDataLinkSocialMedia()
    }, [])
    return (
        <>
            <Helmet>
                <title>Link Social Media - X-LABS.my.id | Inovasi dan Pengembangan Aplikasi Mobile</title>
            </Helmet>
            <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-4xl font-bold">Link Social Media</h1>
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
                                <th>Icon</th>
                                <th>Name</th>
                                <th>Url</th>
                                <th>External Link</th>
                                <th>Position</th>
                                <th>Status</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {linkSocialMediaList.map((item, index) => (
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
                                    <td>{item.icon}</td>
                                    <td>{item.name}</td>
                                    <td>{item.url}</td>
                                    <td>{item.is_external_link ? "Yes" : "No"}</td>
                                    <td>{item.position}</td>
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

export default LinkSocialMedia;