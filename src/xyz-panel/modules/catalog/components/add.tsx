import Modal from "@/components/ui/Modal";
import globalHook from "@/hooks/global";
import { createCatalog } from "@/xyz-panel/api/catalog";
import {
  schemaCatalogRequest,
  type SchemaCatalogRequest,
} from "@/xyz-panel/types/catalog";
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
  } = useForm<SchemaCatalogRequest>({
    resolver: zodResolver(schemaCatalogRequest),
    defaultValues: {
      icon_url: "",
      name: "",
      package_name: "",
      short_description: "",
      description: "",
      playstore_url: "",
      appstore_url: "",
      public: false,
      is_web: true,
    },
  });

  const iconUrl = watch("icon_url");

  const onSubmit = async (data: SchemaCatalogRequest) => {
    try {
      toggleLoading(true, `Lagi nyimpen data catalog`);
      await createCatalog(data);
      toggleToast(true, "Data catalog berhasil disimpan", "success");
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
      <Modal show={show} title="Add Catalog" onClose={() => onClose(false)}>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Side: Icon Preview */}
            <div className="flex flex-col gap-2 items-center justify-start pt-2">
              <div className="avatar">
                <div className="w-24 h-24 rounded-xl bg-base-200 border border-base-content/10 shadow-sm relative overflow-hidden">
                  <img
                    src={iconUrl || "/icon-only-v2.png"}
                    alt="Icon Preview"
                    className={`object-cover w-full h-full ${
                      !iconUrl ? "grayscale opacity-50 p-4" : ""
                    }`}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = "/icon-only-v2.png";
                      // Add classes manually since we can't depend on state for onError loop prevention in simple way
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

            {/* Right Side: Main Info */}
            <div className="flex-1 grid grid-cols-1 gap-3">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-bold opacity-70">
                    App Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. My Super App"
                  className="input input-bordered input-sm w-full"
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-bold opacity-70">
                    Package Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. com.example.app"
                  className="input input-bordered input-sm w-full font-mono"
                  {...register("package_name")}
                />
                {errors.package_name && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.package_name.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-bold opacity-70">
                    Icon URL
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  className="input input-bordered input-sm w-full font-mono"
                  {...register("icon_url")}
                />
                {errors.icon_url && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.icon_url.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="divider my-0 opacity-10"></div>

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text text-xs font-bold opacity-70">
                  Type
                </span>
              </label>
              <select
                className="select select-bordered select-sm w-full"
                {...register("is_web", {
                  setValueAs: (value) =>
                    value === "true" ? true : value === "false" ? false : value,
                })}
              >
                <option value="true">Web App</option>
                <option value="false">Mobile App</option>
              </select>
              {errors.is_web && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.is_web.message}
                </span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text text-xs font-bold opacity-70">
                  Status
                </span>
              </label>
              <select
                className="select select-bordered select-sm w-full"
                {...register("public", {
                  setValueAs: (value) =>
                    value === "true" ? true : value === "false" ? false : value,
                })}
              >
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
              {errors.public && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.public.message}
                </span>
              )}
            </div>
          </div>

          {/* URLs */}
          <div className="flex flex-col gap-3">
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text text-xs font-bold opacity-70">
                  Playstore URL
                </span>
              </label>
              <input
                type="text"
                placeholder="https://play.google.com/..."
                className="input input-bordered input-sm w-full"
                {...register("playstore_url")}
              />
              {errors.playstore_url && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.playstore_url.message}
                </span>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text text-xs font-bold opacity-70">
                  Appstore URL
                </span>
              </label>
              <input
                type="text"
                placeholder="https://apps.apple.com/..."
                className="input input-bordered input-sm w-full"
                {...register("appstore_url")}
              />
              {errors.appstore_url && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.appstore_url.message}
                </span>
              )}
            </div>
          </div>

          {/* Descriptions */}
          <div className="flex flex-col gap-3">
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text text-xs font-bold opacity-70">
                  Short Description
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered h-20 w-full"
                placeholder="Brief summary..."
                {...register("short_description")}
              ></textarea>
              {errors.short_description && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.short_description.message}
                </span>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text text-xs font-bold opacity-70">
                  Full Description
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered h-32 w-full"
                placeholder="Detailed explanation..."
                {...register("description")}
              ></textarea>
              {errors.description && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>

          <div className="modal-action mt-2">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => onClose(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary px-8">
              Save Catalog
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Add;
