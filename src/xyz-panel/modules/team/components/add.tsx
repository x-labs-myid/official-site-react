import Modal from "@/components/ui/Modal";
import globalHook from "@/hooks/global";
import { createTeam } from "@/xyz-panel/api/team";
import {
  schemaTeamRequest,
  type SchemaTeamRequest,
} from "@/xyz-panel/types/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Add = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: (refreshData?: boolean) => void;
}) => {
  const { toggleLoading, toggleToast } = globalHook();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schemaTeamRequest),
    defaultValues: {
      avatar_url: "",
      name: "",
      title: "",
      is_visible: false,
    },
  });
  const avatarUrl = watch("avatar_url");
  const onSubmit = async (data: SchemaTeamRequest) => {
    try {
      toggleLoading(true, `Lagi nyimpen data team`);
      await createTeam(data);
      toggleToast(true, "Data team berhasil disimpan", "success");
      onClose(true);
      reset();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Terjadi kesalahan";
      toggleToast(true, message, "error");
    } finally {
      toggleLoading(false);
    }
  };
  return (
    <>
      <Modal show={show} title="Add Team" onClose={() => onClose(false)}>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Side: Avatar Preview */}
            <div className="flex flex-col gap-2 items-center justify-start pt-2">
              <div className="avatar">
                <div className="w-24 h-24 rounded-xl bg-base-200 border border-base-content/10 shadow-sm relative overflow-hidden">
                  <img
                    src={avatarUrl || "/icon-only-v2.png"}
                    alt="Avatar Preview"
                    className={`object-cover w-full h-full ${
                      !avatarUrl ? "grayscale opacity-50 p-4" : ""
                    }`}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = "/icon-only-v2.png";
                      if (!target.classList.contains("grayscale")) {
                        target.classList.add("grayscale", "opacity-50", "p-4");
                      }
                    }}
                  />
                </div>
              </div>
              <span className="text-xs font-bold opacity-50 uppercase tracking-widest text-center">
                Preview
              </span>
            </div>

            {/* Right Side: Inputs */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  className="input input-bordered w-full"
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Software Engineer"
                  className="input input-bordered w-full"
                  {...register("title")}
                />
                {errors.title && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">Avatar URL</span>
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  className="input input-bordered w-full font-mono text-sm"
                  {...register("avatar_url")}
                />
                <label className="label py-0">
                  <span className="label-text-alt opacity-50">
                    Leave empty to use default placeholder
                  </span>
                </label>
                {errors.avatar_url && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.avatar_url.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">Status</span>
                </label>
                <select
                  {...register("is_visible", {
                    setValueAs: (value) =>
                      value === "true"
                        ? true
                        : value === "false"
                        ? false
                        : value,
                  })}
                  className="w-full select select-bordered"
                >
                  <option value="">Select Status</option>
                  <option value="true">Published</option>
                  <option value="false">Draft</option>
                </select>
                <span className="text-red-500 text-sm mt-1">
                  {errors.is_visible?.message}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => onClose(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-blue-500/90 hover:bg-blue-400/80"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Add;
