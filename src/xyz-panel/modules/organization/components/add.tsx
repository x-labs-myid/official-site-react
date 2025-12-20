import Modal from "@/components/ui/Modal"
import globalHook from "@/hooks/global"
import { createOrg } from "@/xyz-panel/api/organization"
import { schemaOrgRequest, type SchemaOrgRequest } from "@/xyz-panel/types/organization"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const Add = ({ show, onClose }: { show: boolean, onClose: (refreshData?: boolean) => void }) => {
    const { toggleLoading, toggleToast } = globalHook()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schemaOrgRequest),
        defaultValues: {
            label: "",
            value: "",
            is_visible: false
        }
    })
    const onSubmit = async (data: SchemaOrgRequest) => {
        try {
            toggleLoading(true, `Lagi nyimpen data organization`)
            await createOrg(data)
            toggleToast(true, "Data organization berhasil disimpan", "success")
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
            <Modal show={show} title="Add Organization" onClose={() => onClose(false)}>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Label</span>
                        </label>
                        <input type="text" placeholder="Label/Key" className="input input-bordered w-full" {...register("label")} />
                        {errors.label && <span className="text-red-500">{errors.label.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Value</span>
                        </label>
                        <input type="text" placeholder="Value" className="input input-bordered w-full" {...register("value")} />
                        {errors.value && <span className="text-red-500">{errors.value.message}</span>}
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