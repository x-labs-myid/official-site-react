import Modal from "@/components/ui/Modal"
import globalHook from "@/hooks/global"
import { updateLinkSocialMedia } from "@/xyz-panel/api/link-social-media"
import { schemaLinkSocialMediaRequest, type SchemaLinkSocialMediaData, type SchemaLinkSocialMediaRequest } from "@/xyz-panel/types/link-social-media"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const Edit = (
    {
        show,
        detail,
        onClose
    }: {
        show: boolean,
        detail: SchemaLinkSocialMediaData,
        onClose: (refreshData?: boolean) => void
    }) => {
    const { toggleLoading, toggleToast } = globalHook()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schemaLinkSocialMediaRequest),
        defaultValues: {
            icon: "",
            name: "",
            url: "",
            is_external_link: false,
            position: "",
            is_visible: false
        }
    })
    const onSubmit = async (data: SchemaLinkSocialMediaRequest) => {
        try {
            toggleLoading(true, `Lagi nyimpen data catalog`)
            await updateLinkSocialMedia(detail.guid, data)
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
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Icon</span>
                    </label>
                    <input type="text" placeholder="Icon" className="input input-bordered w-full" {...register("icon")} />
                    {errors.icon && <span className="text-red-500">{errors.icon.message}</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Name" className="input input-bordered w-full" {...register("name")} />
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">External Link</span>
                    </label>
                    <select {...register("is_external_link", {
                        setValueAs: (value) => value === "true" ? true : value === "false" ? false : value
                    })} className="w-full select select-bordered">
                        <option value="">Select Status</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <span className="text-red-500">{errors.is_external_link?.message}</span>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Position</span>
                    </label>
                    <input type="text" placeholder="Position" className="input input-bordered w-full" {...register("position")} />
                    {errors.position && <span className="text-red-500">{errors.position.message}</span>}
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
    )
}
export default Edit