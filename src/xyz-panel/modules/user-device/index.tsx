import PageHead from "@/xyz-panel/components/PageHead";
import { useEffect, useState } from "react";
import globalHook from "@/hooks/global";
import type { SchemaLogUserDeviceData } from "@/xyz-panel/types/log";
import Pagination from "@/components/ui/Pagination";
import { getLogUserDevice } from "@/xyz-panel/api/log";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const UserDevice = () => {
  const [userDevice, setUserDevice] = useState<SchemaLogUserDeviceData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const { toggleToast, toggleLoading } = globalHook();

  const limit = 10;

  async function getDataUserDevice() {
    try {
      toggleLoading(true, "Loading user device...");
      const response = await getLogUserDevice(currentPage, limit);
      const total_page = Math.ceil(response.total / limit);
      setUserDevice(response.data);
      setTotalData(response.total);
      setTotalPages(total_page);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to load user device data";
      toggleToast(true, message, "error");
    } finally {
      toggleLoading(false);
    }
  }

  function changePage(page: number) {
    setCurrentPage(page);
  }

  function toggleRow(index: number) {
    setExpandedRow(expandedRow === index ? null : index);
  }

  useEffect(() => {
    getDataUserDevice();
  }, [currentPage]);

  return (
    <>
      <PageHead title="User Device" />
      <div className="w-full">
        <h1 className="text-4xl font-bold">User Device</h1>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-4">
          <table className="table">
            <thead>
              <tr>
                <th className="w-12"></th>
                <th>Timestamp / IP</th>
                <th>Activity</th>
                <th>Device Info</th>
                <th>App Info</th>
              </tr>
            </thead>
            <tbody>
              {userDevice.map((item, index) => (
                <>
                  <tr
                    key={index}
                    className="hover cursor-pointer"
                    onClick={() => toggleRow(index)}
                  >
                    <td>
                      <button className="btn btn-ghost btn-xs">
                        {expandedRow === index ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                    </td>
                    <td>
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-xs">
                          {item.timestamp}
                        </span>
                        <span className="badge badge-ghost badge-sm font-mono">
                          {item.ip_address}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm">
                          {item.activity_type}
                        </span>
                        <span className="text-xs text-base-content/70 line-clamp-1">
                          {item.activity_description}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-sm">
                          {item.manufacturer} {item.model}
                        </span>
                        <span className="text-xs badge badge-neutral badge-sm">
                          {item.os} {item.os_version}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{item.app_name}</span>
                        <span className="text-xs text-base-content/60">
                          v{item.app_version_name} ({item.app_version_code})
                        </span>
                      </div>
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr>
                      <td colSpan={5} className="bg-base-200/50">
                        <div className="p-4 space-y-4">
                          {/* Activity Details */}
                          <div className="card bg-base-100 shadow-sm">
                            <div className="card-body p-4">
                              <h3 className="font-bold text-sm mb-2">
                                Activity Detail
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="opacity-70 block text-xs">
                                    Activity Type
                                  </span>
                                  <span className="font-medium">
                                    {item.activity_type}
                                  </span>
                                </div>
                                <div>
                                  <span className="opacity-70 block text-xs">
                                    Description
                                  </span>
                                  <span className="font-medium">
                                    {item.activity_description || "-"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Device & System Detail */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="card bg-base-100 shadow-sm">
                              <div className="card-body p-4">
                                <h3 className="font-bold text-sm mb-2">
                                  Device Specification
                                </h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <span className="opacity-70 block text-xs">
                                      Model
                                    </span>
                                    <span className="font-medium">
                                      {item.manufacturer} {item.model}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="opacity-70 block text-xs">
                                      Type
                                    </span>
                                    <span className="font-medium">
                                      {item.device_type}
                                    </span>
                                  </div>
                                  <div className="col-span-2">
                                    <span className="opacity-70 block text-xs">
                                      UUID
                                    </span>
                                    <span className="font-mono text-xs break-all bg-base-200 p-1 rounded">
                                      {item.device_uuid}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="card bg-base-100 shadow-sm">
                              <div className="card-body p-4">
                                <h3 className="font-bold text-sm mb-2">
                                  System & Locale
                                </h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <span className="opacity-70 block text-xs">
                                      OS
                                    </span>
                                    <span className="font-medium">
                                      {item.os} {item.os_version}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="opacity-70 block text-xs">
                                      SDK
                                    </span>
                                    <span className="font-mono">
                                      {item.sdk_version}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="opacity-70 block text-xs">
                                      Language
                                    </span>
                                    <span className="font-medium">
                                      {item.language}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="opacity-70 block text-xs">
                                      Region
                                    </span>
                                    <span className="font-medium">
                                      {item.region}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Technical Info */}
                          <div className="card bg-base-100 shadow-sm">
                            <div className="card-body p-4">
                              <h3 className="font-bold text-sm mb-2">
                                Technical Information
                              </h3>
                              <div className="grid grid-cols-1 gap-2 text-sm">
                                <div>
                                  <span className="opacity-70 block text-xs">
                                    User Agent
                                  </span>
                                  <span className="font-mono text-xs break-all text-base-content/80">
                                    {item.user_agent}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <Pagination
            totalPages={totalPages}
            totalData={totalData}
            currentPage={currentPage}
            changePage={changePage}
          />
        </div>
      </div>
    </>
  );
};

export default UserDevice;
