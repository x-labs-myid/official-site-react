import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import globalHook from "@/hooks/global";
import type { SchemaLogUserDeviceData } from "@/xyz-panel/types/log";
import Pagination from "@/components/ui/Pagination";
import { getLogUserDevice } from "@/xyz-panel/api/log";

const UserDevice = () => {
  const [userDevice, setUserDevice] = useState<SchemaLogUserDeviceData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

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
          : "Gagal memuat data user device";
      toggleToast(true, message, "error");
    } finally {
      toggleLoading(false);
    }
  }

  function changePage(page: number) {
    setCurrentPage(page);
    getDataUserDevice();
  }

  useEffect(() => {
    getDataUserDevice();
  }, []);
  return (
    <>
      <Helmet>
        <title>
          User Device - X-LABS.my.id | Inovasi dan Pengembangan Aplikasi Mobile
        </title>
      </Helmet>
      <div className="w-full">
        <h1 className="text-4xl font-bold">User Device</h1>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-4">
          <table className="table">
            <thead>
              <tr>
                <th>Activity Type</th>
                <th>Activity Description</th>
                <th>Device UUID</th>
                <th>Device Type</th>
                <th>Language</th>
                <th>Manufacturer</th>
                <th>Model</th>
                <th>OS</th>
                <th>OS Version</th>
                <th>Region</th>
                <th>SDK Version</th>
                <th>App Name</th>
                <th>App Version Code</th>
                <th>App Version Name</th>
                <th>IP Address</th>
                <th>User Agent</th>
              </tr>
            </thead>
            <tbody>
              {userDevice.map((item, index) => (
                <tr key={index}>
                  <th>{item.activity_type}</th>
                  <td>{item.activity_description}</td>
                  <td>{item.device_uuid}</td>
                  <td>{item.device_type}</td>
                  <td>{item.language}</td>
                  <td>{item.manufacturer}</td>
                  <td>{item.model}</td>
                  <td>{item.os}</td>
                  <td>{item.os_version}</td>
                  <td>{item.region}</td>
                  <td>{item.sdk_version}</td>
                  <td>{item.app_name}</td>
                  <td>{item.app_version_code}</td>
                  <td>{item.app_version_name}</td>
                  <td>{item.ip_address}</td>
                  <td>{item.user_agent}</td>
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

export default UserDevice;
