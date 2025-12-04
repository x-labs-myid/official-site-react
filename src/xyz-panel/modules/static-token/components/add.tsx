import { FaMinus, FaPlus, FaQrcode } from "react-icons/fa6"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schemaStaticTokenRequest, type SchemaStaticTokenRequest } from "@/xyz-panel/types/static-token"
import { generateRandomString } from "@/xyz-panel/utils/general"
import Modal from "@/components/ui/Modal"
import type { SchemaCatalogAppsListData } from "@/xyz-panel/types/catalog"
import { createStaticToken } from "@/xyz-panel/api/static-token"
import globalHook from "@/hooks/global"

const Add = ({ show, apps, onClose }: { show: boolean, apps: SchemaCatalogAppsListData[], onClose: (refreshData?: boolean) => void }) => {
    const { toggleToast, toggleLoading } = globalHook()
    const { register, handleSubmit, control, setValue, formState: { errors }, reset } = useForm<SchemaStaticTokenRequest>({
        resolver: zodResolver(schemaStaticTokenRequest),
        defaultValues: {
            name: "",
            type: "",
            token: "",
            is_active: false,
            allowed_routes: ["/"]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        // @ts-expect-error - useFieldArray doesn't fully support primitive arrays in TypeScript
        name: "allowed_routes"
    })

    const onSubmit = async (data: SchemaStaticTokenRequest) => {
        try {
            console.log(data)
            toggleLoading(true, `Lagi nyimpen data static token`)
            await createStaticToken(data)
            toggleToast(true, "Data static token berhasil disimpan", "success")
            reset()
            onClose(true)
        } catch (error) {
            console.log(error)
            const message = error instanceof Error ? error.message : "Gagal memuat data static token"
            toggleToast(true, message, "error")
        } finally {
            toggleLoading(false)
        }
    }

    return (
        <>
            <Modal show={show} title="Add Static Token" onClose={() => onClose(false)}>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">App Name</span>
                        </label>
                        <select {...register("name")} className="w-full select select-bordered">
                            <option value="">Select App Name</option>
                            {apps.map((app) => (
                                <option key={app.guid} value={app.name}>
                                    {app.name}
                                </option>
                            ))}
                        </select>
                        <span className="text-red-500">{errors.name?.message}</span>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Type</span>
                        </label>
                        <select {...register("type")} className="w-full select select-bordered">
                            <option value="">Select Type</option>
                            <option value="TEST">Test</option>
                            <option value="PRODUCTION">Production</option>
                        </select>
                        <span className="text-red-500">{errors.type?.message}</span>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Token</span>
                        </label>
                        <div className="flex flex-row items-center gap-2">
                            <textarea {...register("token")} placeholder="Token" className="w-full textarea textarea-bordered" />
                            <button
                                type="button"
                                className="btn btn-ghost btn-xs"
                                onClick={() => setValue("token", "ST_ORANGUTAN_" + generateRandomString(128))}
                            >
                                <FaQrcode className="w-4 h-4" />
                            </button>
                        </div>
                        <span className="text-red-500">{errors.token?.message}</span>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Allowed Routes</span>
                        </label>
                        <div
                            className={`flex flex-col ${fields.length < 2 ? 'lg:flex-row xl:flex-row' : 'lg:flex-col xl:flex-col'} justify-between items-end gap-4 mb-4`}
                        >
                            {fields.map((field, index) => (
                                <div key={field.id} className="w-full flex flex-row items-center gap-2">
                                    <input type="text" {...register(`allowed_routes.${index}` as const)} placeholder="Allowed Routes" className="w-full input input-bordered" />
                                    {index < fields.length - 1 && (
                                        <button type="button" className="btn btn-ghost btn-xs" onClick={() => remove(index)}>
                                            <FaMinus className="w-4 h-4" />
                                        </button>
                                    )}
                                    {index === fields.length - 1 && (
                                        <button type="button" className="btn btn-ghost btn-xs" onClick={() => append("/" as any)}>
                                            <FaPlus className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <span className="text-red-500">{errors.allowed_routes?.message}</span>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <select {...register("is_active", {
                            setValueAs: (value) => value === "true" ? true : value === "false" ? false : value
                        })} className="w-full select select-bordered">
                            <option value="">Select Status</option>
                            <option value="true">Published</option>
                            <option value="false">Draft</option>
                        </select>
                        <span className="text-red-500">{errors.is_active?.message}</span>
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