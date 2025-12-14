import { useEffect, useState } from "react";
import { getDataApp, getDataOrgProfile } from "@/landing-page/api";
import type { LandingPageAppData, LandingPageOrgProfileData } from "@/landing-page/type";
import globalHook from "@/hooks/global";
import { Helmet } from "react-helmet-async";
import Greeting from "../components/main/Greeting";
import Store from "../components/main/Store";
import AppList from "../components/main/AppList";

const Main = () => {
    const [appList, setAppList] = useState<LandingPageAppData[]>([]);
    const [orgProfile, setOrgProfile] = useState<LandingPageOrgProfileData | null>(null);
    const { toggleLoading, toggleToast } = globalHook()

    async function getData() {
        try {
            toggleLoading(true, 'Lagi ngambil data app...')
            const [dataOrgProfile, dataApp] = await Promise.all([
                getDataOrgProfile(),
                getDataApp()
            ])
            setOrgProfile(dataOrgProfile)
            setAppList(dataApp)
        } catch (e) {
            const message = e instanceof Error ? e.message : "Terjadi kesalahan"
            toggleToast(true, message, 'error')
        } finally {
            toggleLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <Helmet>
                <title>X-LABS Applications - {orgProfile?.value || 'X-LABS.my.id'} | Inovasi dan Pengembangan Aplikasi Mobile</title>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
                <Greeting />
                <Store />
                {appList.length > 0 && <AppList appList={appList} />}
            </div>
        </>
    );
}

export default Main