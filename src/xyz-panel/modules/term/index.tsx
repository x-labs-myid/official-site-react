import { Helmet } from "react-helmet-async"
import type { SchemaTermData } from "@/xyz-panel/types/term"
import { Fragment, useEffect, useState } from "react"
import { deleteTerms, getTerms } from "@/xyz-panel/api/term"
import globalHook from "@/hooks/global"
import { FaBook, FaPencil, FaPlus, FaTrash } from "react-icons/fa6"
import Modal from "@/components/ui/Modal"
import Add from "./components/add"
import Edit from "./components/edit"
import { getCatalogForApps } from "@/xyz-panel/api/catalog"
import type { SchemaCatalogAppsListData } from "@/xyz-panel/types/catalog"

const Term = () => {
    const [terms, setTerms] = useState<any>([])
    const [apps, setApps] = useState<SchemaCatalogAppsListData[]>([])
    const [showAdd, setShowAdd] = useState<boolean>(false)
    const [detail, setDetail] = useState<SchemaTermData | null>(null)
    const [idForDelete, setIdForDelete] = useState<string | null>(null)
    const { toggleToast, toggleLoading } = globalHook()

    async function getDataTerm() {
        try {
            toggleLoading(true, "Lagi ngambil data term...")
            const [dataTerms, dataApps] = await Promise.all([
                getTerms(),
                getCatalogForApps()
            ])
            const grouped = dataTerms.data.reduce((acc: any, item: SchemaTermData) => {
                if (!acc[item.app_name]) {
                    acc[item.app_name] = []
                }
                acc[item.app_name].push(item)
                return acc
            }, {})
            const obj = Object.entries(grouped).map(([app_name, items]) => ({
                app_name,
                items
            }))
            setTerms(obj)
            setApps(dataApps.data)
        } catch (error) {
            const message = error instanceof Error ? error.message : "Gagal memuat data term"
            toggleToast(true, message, "error")
        } finally {
            toggleLoading(false)
        }
    }

    async function handleDelete() {
        try {
            if (!idForDelete) return
            toggleLoading(true, "Lagi menghapus data term...")
            await deleteTerms(idForDelete)
            toggleToast(true, "Data term berhasil dihapus", "success")
            getDataTerm()
        } catch (error) {
            const message = error instanceof Error ? error.message : "Gagal menghapus data term"
            toggleToast(true, message, "error")
        } finally {
            toggleLoading(false)
            setIdForDelete(null)
        }
    }

    function handleCloseModal(refreshData: boolean = false) {
        setShowAdd(false)
        setDetail(null)
        setIdForDelete(null)
        if (refreshData) getDataTerm()
    }

    useEffect(() => {
        getDataTerm()
    }, [])

    return (
        <>
            <Helmet>
                <title>Terms - X-LABS.my.id | Inovasi dan Pengembangan Aplikasi Mobile</title>
            </Helmet>
            <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-4xl font-bold">Terms</h1>
                    <button className="btn bg-blue-500/90 hover:bg-blue-400/80" onClick={() => setShowAdd(true)}>
                        <FaPlus className="w-4 h-4" />
                    </button>
                </div>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>App Name</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {terms.map((group: any, index: number) => (
                                <Fragment key={`group-${index}`}>
                                    {/* header app name */}
                                    <tr>
                                        <td colSpan={4}>
                                            <div className="flex items-center gap-2">
                                                <FaBook className="w-4 h-4" />
                                                <span className="font-bold">{group.app_name}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* isi term per app */}
                                    {group.items.map((item: any, i: number) => (
                                        <tr key={`item-${index}-${i}`}>
                                            <td>{item.name}</td>
                                            <td>{item.public ? 'Published' : 'Draft'}</td>
                                            <td>{item.created_at}</td>
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
                                        </tr>
                                    ))}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Add show={showAdd} apps={apps} onClose={handleCloseModal} />
            {detail && <Edit show={detail ? true : false} apps={apps} detail={detail} onClose={handleCloseModal} />}
            <Modal show={idForDelete ? true : false} title="Apakah kamu yakin mau hapus data ini?" onClose={() => handleCloseModal(false)}>
                <div className="flex justify-end gap-2">
                    <button className="btn bg-blue-500/90 hover:bg-blue-400/80" onClick={handleDelete}>Ya</button>
                    <button className="btn btn-ghost" onClick={() => handleCloseModal(false)}>Tidak</button>
                </div>
            </Modal>
        </>
    )
}

export default Term
