import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import globalHook from "@/hooks/global";
import Pagination from "@/components/ui/Pagination";
import { getLogApi } from "@/xyz-panel/api/log";
import type { SchemaLogApiData } from "@/xyz-panel/types/log";

const ApiLog = () => {
  const [apiLog, setApiLog] = useState<SchemaLogApiData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

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
        error instanceof Error ? error.message : "Gagal memuat data api log";
      toggleToast(true, message, "error");
    } finally {
      toggleLoading(false);
    }
  }

  function changePage(page: number) {
    setCurrentPage(page);
    getDataApiLog();
  }

  useEffect(() => {
    getDataApiLog();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          API Log - X-LABS.my.id | Inovasi dan Pengembangan Aplikasi Mobile
        </title>
      </Helmet>
      <div className="w-full">
        <h1 className="text-4xl font-bold">API Log</h1>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-4">
          <table className="table">
            <thead>
              <tr>
                <th>End Point</th>
                <th>Method</th>
                <th>IP Address</th>
                <th>User Agent</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {apiLog.map((item, index) => (
                <tr key={index}>
                  <th>{item.endpoint}</th>
                  <td>{item.method}</td>
                  <td>{item.ip}</td>
                  <td>{item.userAgent}</td>
                  <td>{item.timestamp}</td>
                </tr>
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
