import Modal from "@/components/ui/Modal"
import globalHook from "@/hooks/global"
import { useForm } from "react-hook-form"

const Add = ({ show, onClose }: { show: boolean, onClose: (refreshData?: boolean) => void }) => {
    const { toggleLoading, toggleToast } = globalHook()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({})
    const onSubmit = async (data: any) => {
        try {
            toggleLoading(true, `Lagi nyimpen data link social media`)
            toggleToast(true, "Data link social media berhasil disimpan", "success")
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
        <>
            <Modal show={show} title="Add Catalog" onClose={() => onClose(false)}>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

                </form>
            </Modal>
        </>
    )
}

export default Add