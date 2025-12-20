import Modal from "@/components/ui/Modal"
import globalHook from "@/hooks/global"
import { createSocialMedia } from "@/xyz-panel/api/social-media"
import { schemaSocialMediaRequest, type SchemaSocialMediaRequest } from "@/xyz-panel/types/social-media"
import type { SchemaTeamData } from "@/xyz-panel/types/team"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const Add = ({ show, teams, onClose }: { show: boolean, teams: SchemaTeamData[], onClose: (refreshData?: boolean) => void }) => {
    const { toggleLoading, toggleToast } = globalHook()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schemaSocialMediaRequest),
        defaultValues: {
            teams_guid: "",
            name: "",
            icon: "",
            username: "",
        }
    })
    const onSubmit = async (data: SchemaSocialMediaRequest) => {
        try {
            toggleLoading(true, `Lagi nyimpen data link social media`)
            await createSocialMedia(data)
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
            <Modal show={show} title="Add Social Media" onClose={() => onClose(false)}>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Team Name</span>
                        </label>
                        <select {...register("teams_guid")} className="w-full select select-bordered">
                            <option value="">Select Team</option>
                            {teams.map((team) => (
                                <option key={team.guid} value={team.guid}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                        <span className="text-red-500">{errors.teams_guid?.message}</span>
                    </div>
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
                            <span className="label-text">Username</span>
                        </label>
                        <input type="text" placeholder="Username" className="input input-bordered w-full" {...register("username")} />
                        {errors.username && <span className="text-red-500">{errors.username.message}</span>}
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