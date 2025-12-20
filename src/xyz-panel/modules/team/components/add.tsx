import Modal from "@/components/ui/Modal"
import globalHook from "@/hooks/global"
import { createTeam } from "@/xyz-panel/api/team"
import { schemaTeamRequest, type SchemaTeamRequest } from "@/xyz-panel/types/team"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const Add = ({ show, onClose }: { show: boolean, onClose: (refreshData?: boolean) => void }) => {
    const { toggleLoading, toggleToast } = globalHook()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schemaTeamRequest),
        defaultValues: {
            name: "",
            title: "",
            is_visible: false
        }
    })
    const onSubmit = async (data: SchemaTeamRequest) => {
        try {
            toggleLoading(true, `Lagi nyimpen data team`)
            await createTeam(data)
            toggleToast(true, "Data team berhasil disimpan", "success")
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
            <Modal show={show} title="Add Team" onClose={() => onClose(false)}>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Name" className="input input-bordered w-full" {...register("name")} />
                        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" placeholder="Title" className="input input-bordered w-full" {...register("title")} />
                        {errors.title && <span className="text-red-500">{errors.title.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <select {...register("is_visible", {
                            setValueAs: (value) => value === "true" ? true : value === "false" ? false : value
                        })} className="w-full select select-bordered">
                            <option value="">Select Status</option>
                            <option value="true">Published</option>
                            <option value="false">Draft</option>
                        </select>
                        <span className="text-red-500">{errors.is_visible?.message}</span>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" className="btn btn-ghost" onClick={() => onClose(false)}>Cancel</button>
                        <button type="submit" className="btn bg-blue-500/90 hover:bg-blue-400/80">Submit</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default Add