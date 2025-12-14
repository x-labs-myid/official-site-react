import Modal from "@/components/ui/Modal"
import globalHook from "@/hooks/global"
import { useForm } from "react-hook-form"

const Edit = (
    {
        show,
        detail,
        onClose
    }: {
        show: boolean,
        detail: any,
        onClose: (refreshData?: boolean) => void
    }) => {
    const { toggleLoading, toggleToast } = globalHook()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({})
    const onSubmit = async (data: any) => {
        try {
            toggleLoading(true, `Lagi nyimpen data catalog`)
            toggleToast(true, "Data catalog berhasil disimpan", "success")
            onClose(true)
            reset()
        } catch (error) {
            const message = error instanceof Error ? error.message : "Terjadi kesalahan"
            toggleToast(true, message, "error")
        } finally {
            toggleLoading(false)
        }
    }
    return (
        <Modal show={show} title="Edit Catalog" onClose={() => onClose(false)}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

            </form>
        </Modal>
    )
}
export default Edit