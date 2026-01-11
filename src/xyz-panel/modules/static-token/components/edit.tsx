import { FaMinus, FaPlus, FaQrcode } from "react-icons/fa6";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schemaStaticTokenRequest,
  type SchemaStaticTokenRequest,
} from "@/xyz-panel/types/static-token";
import { generateRandomString } from "@/xyz-panel/utils/general";
import Modal from "@/components/ui/Modal";
import type { SchemaCatalogAppsListData } from "@/xyz-panel/types/catalog";
import type { SchemaStaticTokenData } from "@/xyz-panel/types/static-token";
import { updateStaticToken } from "@/xyz-panel/api/static-token";
import globalHook from "@/hooks/global";

const Edit = ({
  show,
  detail,
  apps,
  onClose,
}: {
  show: boolean;
  detail: SchemaStaticTokenData | null;
  apps: SchemaCatalogAppsListData[];
  onClose: (refreshData?: boolean) => void;
}) => {
  const { toggleToast, toggleLoading } = globalHook();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<SchemaStaticTokenRequest>({
    resolver: zodResolver(schemaStaticTokenRequest),
    defaultValues: {
      name:
        detail?.name
          .replace(" --dev", "")
          .replace(" --prod", "")
          .replace(" --test", "") || "",
      type: detail?.type || "",
      token: detail?.token || "",
      is_active: detail?.is_active || false,
      allowed_routes: JSON.parse(detail?.allowed_routes || "[]"),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-expect-error - useFieldArray doesn't fully support primitive arrays in TypeScript
    name: "allowed_routes",
  });

  const [newRoute, setNewRoute] = useState("");

  const handleAddRoute = () => {
    if (newRoute.trim()) {
      append(newRoute.trim() as any);
      setNewRoute("");
    }
  };

  const onSubmit = async (data: SchemaStaticTokenRequest) => {
    try {
      toggleLoading(true, `Lagi nyimpen data static token`);
      await updateStaticToken(detail?.guid || "", data);
      toggleToast(true, "Data static token berhasil diupdate", "success");
      onClose(true);
      reset();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal memuat data static token";
      toggleToast(true, message, "error");
    } finally {
      toggleLoading(false);
    }
  };

  return (
    <>
      <Modal
        show={show}
        title="Edit Static Token"
        onClose={() => onClose(false)}
        boxClassName="w-11/12 max-w-4xl"
      >
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Left Column: Basic Info */}
          <div className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <select
                {...register("name")}
                className="w-full select select-bordered"
              >
                <option value="">Select App Name</option>
                {apps.map((app) => (
                  <option key={app.name} value={app.name}>
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
              <select
                {...register("type")}
                className="w-full select select-bordered"
              >
                <option value="">Select Type</option>
                <option value="TEST">Test</option>
                <option value="DEV">Development</option>
                <option value="PROD">Production</option>
              </select>
              <span className="text-red-500">{errors.type?.message}</span>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Token</span>
              </label>
              <div className="flex flex-row items-center gap-2">
                <textarea
                  {...register("token")}
                  placeholder="Token"
                  className="w-full textarea textarea-bordered h-24 font-mono text-xs"
                />
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() =>
                    setValue(
                      "token",
                      "ST_ORANGUTAN_" + generateRandomString(128)
                    )
                  }
                  title="Generate Token"
                >
                  <FaQrcode className="w-5 h-5" />
                </button>
              </div>
              <span className="text-red-500">{errors.token?.message}</span>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                {...register("is_active", {
                  setValueAs: (value) =>
                    value === "true" ? true : value === "false" ? false : value,
                })}
                className="w-full select select-bordered"
              >
                <option value="">Select Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              <span className="text-red-500">{errors.is_active?.message}</span>
            </div>
          </div>

          {/* Right Column: Configuration */}
          <div className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Allowed Routes</span>
              </label>

              {/* Add New Route Input */}
              <div className="flex flex-row items-center gap-2 mb-4">
                <input
                  type="text"
                  value={newRoute}
                  onChange={(e) => setNewRoute(e.target.value)}
                  placeholder="Add new route (e.g. /api/v1/users)"
                  className="w-full input input-bordered input-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddRoute();
                    }
                  }}
                />
                <button
                  type="button"
                  className={`btn btn-square btn-sm text-white ${
                    newRoute.trim()
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={handleAddRoute}
                  disabled={!newRoute.trim()}
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>

              {/* List of Routes */}
              <div className="bg-base-200/50 p-4 rounded-xl max-h-[400px] overflow-y-auto">
                <div className="flex flex-col gap-2">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="w-full flex flex-row items-center gap-2"
                    >
                      <input
                        type="text"
                        {...register(`allowed_routes.${index}` as const)}
                        placeholder={`Route ${index + 1}`}
                        className="w-full input input-bordered input-sm"
                        readOnly
                      />
                      <button
                        type="button"
                        className="btn btn-ghost btn-xs text-error"
                        onClick={() => remove(index)}
                      >
                        <FaMinus className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {fields.length === 0 && (
                    <div className="text-center text-xs opacity-50 py-4">
                      No routes allowed yet. Add one above.
                    </div>
                  )}
                </div>
              </div>
              <span className="text-red-500">
                {errors.allowed_routes?.message}
              </span>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4 pt-4 border-t border-base-content/10">
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
