import Modal from "@/components/ui/Modal"
import globalHook from "@/hooks/global"
import { updateCatalog } from "@/xyz-panel/api/catalog"
import { schemaCatalogRequest, type SchemaCatalogData, type SchemaCatalogRequest } from "@/xyz-panel/types/catalog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const Edit = (
    {
        show,
        detail,
        onClose
    }: {
        show: boolean,
        detail: SchemaCatalogData | null,
        onClose: (refreshData?: boolean) => void
    }) => {
        console.log(detail)
    const { toggleLoading, toggleToast } = globalHook()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SchemaCatalogRequest>({
        resolver: zodResolver(schemaCatalogRequest),
        defaultValues: {
            icon_url: detail?.icon_url || "",
            name: detail?.name || "",
            package_name: detail?.package_name || "",
            short_description: detail?.short_description || "",
            description: detail?.description || "",
            playstore_url: detail?.playstore_url || "",
            appstore_url: detail?.appstore_url || "",
            public: detail?.public || false,
            is_web: detail?.is_web || false
        }
    })

    const onSubmit = async (data: SchemaCatalogRequest) => {
        try {
            toggleLoading(true, `Lagi nyimpen data catalog`)
            await updateCatalog(detail?.guid || "", data)
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
        <>
            <Modal show={show} title="Edit Catalog" onClose={() => onClose(false)}>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Icon URL</span>
                        </label>
                        <input type="text" placeholder="Icon URL" className="input input-bordered w-full" {...register("icon_url")} />
                        {errors.icon_url && <span className="text-red-500">{errors.icon_url.message}</span>}
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
                            <span className="label-text">Short Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered w-full" placeholder="Short Description" {...register("short_description")}></textarea>
                        {errors.short_description && <span className="text-red-500">{errors.short_description.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered w-full" placeholder="Description" {...register("description")}></textarea>
                        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Playstore URL</span>
                        </label>
                        <input type="text" placeholder="Playstore URL" className="input input-bordered w-full" {...register("playstore_url")} />
                        {errors.playstore_url && <span className="text-red-500">{errors.playstore_url.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Appstore URL</span>
                        </label>
                        <input type="text" placeholder="Appstore URL" className="input input-bordered w-full" {...register("appstore_url")} />
                        {errors.appstore_url && <span className="text-red-500">{errors.appstore_url.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <select className="select select-bordered w-full" {...register("public", {
                            setValueAs: (value) => value === "true" ? true : value === "false" ? false : value
                        })}>
                            <option value="true">Published</option>
                            <option value="false">Draft</option>
                        </select>
                        {errors.public && <span className="text-red-500">{errors.public.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">For Website?</span>
                        </label>
                        <select className="select select-bordered w-full" {...register("is_web", {
                            setValueAs: (value) => value === "true" ? true : value === "false" ? false : value
                        })}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        {errors.is_web && <span className="text-red-500">{errors.is_web.message}</span>}
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

export default Edit
