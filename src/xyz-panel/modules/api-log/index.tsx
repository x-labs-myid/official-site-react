import { useEffect, useState } from "react";
import PageHead from "@/xyz-panel/components/PageHead";
import globalHook from "@/hooks/global";
import SearchFilter from "@/components/ui/SearchFilter";
import Pagination from "@/components/ui/Pagination";
import { getLogApi } from "@/xyz-panel/api/log";
import type { SchemaLogApiData } from "@/xyz-panel/types/log";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ApiLog = () => {
  const [apiLog, setApiLog] = useState<SchemaLogApiData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const { toggleToast, toggleLoading } = globalHook();

  const limit = 10;

  async function getDataApiLog() {
    try {
      toggleLoading(true, "Loading api log...");
      const response = await getLogApi(currentPage, limit);
      const total_page = Math.ceil(response.total / limit);
      setApiLog(response.data);
      setTotalData(response.total);
      setTotalPages(total_page);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load api log data";
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
    getDataApiLog();
  }, [currentPage]);

  return (
    <>
      <PageHead title="API Log" />
      <div className="w-full">
        <h1 className="text-4xl font-bold mb-4">API Log</h1>

        {/* <SearchFilter
          onSearch={(val) => console.log("Search:", val)}
          loading={false}
        /> */}

        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-4">
          <table className="table">
            <thead>
              <tr>
                <th className="w-12"></th>
                <th>Timestamp</th>
                <th>Endpoint</th>
                <th>Method</th>
                <th>IP Address</th>
                <th>App Name</th>
              </tr>
            </thead>
            <tbody>
              {apiLog.map((item, index) => (
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
                    <td className="font-mono text-xs">{item.timestamp}</td>
                    <td className="font-medium">{item.endpoint}</td>
                    <td>
                      <span
                        className={`badge ${
                          item.method === "POST"
                            ? "badge-success"
                            : item.method === "GET"
                            ? "badge-info"
                            : item.method === "PUT"
                            ? "badge-warning"
                            : "badge-error"
                        }`}
                      >
                        {item.method}
                      </span>
                    </td>
                    <td className="font-mono text-xs">{item.ip}</td>
                    <td className="font-medium">{item.body.app_name}</td>
                  </tr>
                  {expandedRow === index && (
                    <tr>
                      <td colSpan={6} className="bg-base-200/50">
                        <div className="p-4 space-y-4">
                          {/* Activity Info */}
                          <div className="card bg-base-100 shadow-sm">
                            <div className="card-body p-4">
                              <h3 className="font-bold text-sm mb-2">
                                Activity Information
                              </h3>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-base-content/60">
                                    Type:
                                  </span>
                                  <span className="ml-2 badge badge-primary badge-sm">
                                    {item.body.activity_type}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-base-content/60">
                                    Description:
                                  </span>
                                  <span className="ml-2 font-medium">
                                    {item.body.activity_description || "-"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Device Info */}
                          <div className="card bg-base-100 shadow-sm">
                            <div className="card-body p-4">
                              <h3 className="font-bold text-sm mb-2">
                                Device Information
                              </h3>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                                <div>
                                  <span className="text-base-content/60">
                                    Type:
                                  </span>
                                  <span className="ml-2 font-medium">
                                    {item.body.device_type}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-base-content/60">
                                    Manufacturer:
                                  </span>
                                  <span className="ml-2 font-medium">
                                    {item.body.manufacturer}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-base-content/60">
                                    Model:
                                  </span>
                                  <span className="ml-2 font-medium">
                                    {item.body.model}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-base-content/60">
                                    OS:
                                  </span>
                                  <span className="ml-2 font-medium">
                                    {item.body.os} {item.body.os_version}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-base-content/60">
                                    SDK:
                                  </span>
                                  <span className="ml-2 font-mono text-xs">
                                    {item.body.sdk_version}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-base-content/60">
                                    UUID:
                                  </span>
                                  <span className="ml-2 font-mono text-xs truncate">
                                    {item.body.device_uuid}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* App & Location Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="card bg-base-100 shadow-sm">
                              <div className="card-body p-4">
                                <h3 className="font-bold text-sm mb-2">
                                  App Information
                                </h3>
                                <div className="space-y-1 text-sm">
                                  <div>
                                    <span className="text-base-content/60">
                                      Version:
                                    </span>
                                    <span className="ml-2 font-medium">
                                      {item.body.app_version_name} (
                                      {item.body.app_version_code})
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card bg-base-100 shadow-sm">
                              <div className="card-body p-4">
                                <h3 className="font-bold text-sm mb-2">
                                  Location & Settings
                                </h3>
                                <div className="space-y-1 text-sm">
                                  <div>
                                    <span className="text-base-content/60">
                                      Region:
                                    </span>
                                    <span className="ml-2 font-medium">
                                      {item.body.region}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-base-content/60">
                                      Language:
                                    </span>
                                    <span className="ml-2 font-medium">
                                      {item.body.language}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* User Agent */}
                          <div className="card bg-base-100 shadow-sm">
                            <div className="card-body p-4">
                              <h3 className="font-bold text-sm mb-2">
                                User Agent
                              </h3>
                              <p className="text-xs font-mono text-base-content/70 break-all">
                                {item.userAgent}
                              </p>
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

export default ApiLog;
