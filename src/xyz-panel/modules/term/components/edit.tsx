import Modal from "@/components/ui/Modal";
import RichTextEditor from "@/components/ui/RichTextEditor";
import globalHook from "@/hooks/global";
import { updateTerms } from "@/xyz-panel/api/term";
import type { SchemaCatalogAppsListData } from "@/xyz-panel/types/catalog";
import {
  schemaTermRequest,
  type SchemaTermData,
  type SchemaTermRequest,
} from "@/xyz-panel/types/term";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

const Edit = ({
  show,
  apps,
  detail,
  onClose,
}: {
  show: boolean;
  apps: SchemaCatalogAppsListData[];
  detail: SchemaTermData;
  onClose: (refreshData?: boolean) => void;
}) => {
  const { toggleLoading, toggleToast } = globalHook();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<SchemaTermRequest>({
    resolver: zodResolver(schemaTermRequest),
    defaultValues: {
      apps_guid: detail.apps_guid || "",
      name: detail.name || "",
      content: detail.content || "",
      public: detail.public === "true",
    },
  });

  const onSubmit = async (data: SchemaTermRequest) => {
    try {
      toggleLoading(true, `Lagi nyimpen data term`);
      await updateTerms(detail.guid, data);
      toggleToast(true, "Data term berhasil disimpan", "success");
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
      <Modal
        show={show}
        title="Edit Term"
        onClose={() => onClose(false)}
        boxClassName="w-11/12 max-w-5xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Top Row: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">App Name</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("apps_guid", {
                  setValueAs: (value) => value || "",
                })}
              >
                <option value="">Select App Name</option>
                {apps.map((app) => (
                  <option key={app.guid} value={app.guid}>
                    {app.name}
                  </option>
                ))}
              </select>
              {errors.apps_guid && (
                <span className="text-red-500">{errors.apps_guid.message}</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full"
                {...register("name", {
                  setValueAs: (value) => value || "",
                })}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("public", {
                  setValueAs: (value) =>
                    value === "true" ? true : value === "false" ? false : value,
                })}
              >
                <option value="">Select Status</option>
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
              {errors.public && (
                <span className="text-red-500">{errors.public.message}</span>
              )}
            </div>
          </div>

          {/* Bottom Row: Content */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <div className="min-h-[400px]">
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
            </div>
            {errors.content && (
              <span className="text-red-500">{errors.content.message}</span>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-base-content/10">
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
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Edit;
