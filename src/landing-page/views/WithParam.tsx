import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataTermApp } from "@/landing-page/api";
import type { LandingPageTermAppData } from "@/landing-page/type";
import globalHook from "@/hooks/global";
import { Helmet } from "react-helmet-async";
import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa6";
import SimpleNavbar from "../components/main/SimpleNavbar";

const WithParam = () => {
  const { app, slug } = useParams();
  const titleWeb = app?.replaceAll("-", " ").toLocaleUpperCase();
  const [data, setData] = useState<LandingPageTermAppData>();
  const { toggleLoading, toggleToast } = globalHook();

  async function getData() {
    try {
      toggleLoading(true, `Fetching data for ${app}...`);
      const res = await getDataTermApp(`${app}/${slug}`);
      setData(res);
    } catch (e) {
      const message = e instanceof Error ? e.message : "An error occurred";
      toggleToast(true, message, "error");
    } finally {
      toggleLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (!data) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  const formattedDate = formatDate(data.term.updated_at);

  return (
    <>
      <Helmet>
        <title>
          {titleWeb
            ? `${titleWeb} - X-LABS.my.id | Mobile Application Development and Innovation`
            : "X-LABS.my.id | Mobile Application Development and Innovation"}
        </title>
      </Helmet>

      <SimpleNavbar />

      <div className="w-full min-h-screen flex flex-col">
        {/* Hero Section - Dark Theme */}
        {/* Hero Section - Gradient Theme (Matches Greeting) */}
        <section className="w-full bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 text-base-content pt-32 pb-16 px-4  shadow-sm relative overflow-hidden">
          <div className="container mx-auto max-w-4xl flex flex-col items-center text-center relative z-10">
            <img
              src={data?.app.icon_url}
              alt={data?.app.name}
              className="rounded-2xl w-28 h-28 object-cover mb-6"
              loading="lazy"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {data?.app.name}
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mb-6 font-light">
              {data?.app.short_description}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {data?.app.playstore_url && (
                <a
                  href={data.app.playstore_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary rounded-full px-6 normal-case text-white"
                >
                  <FaGooglePlay className="w-5 h-5 mr-2" />
                  Play Store
                </a>
              )}
              {data?.app.appstore_url && (
                <a
                  href={data.app.appstore_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-neutral rounded-full px-6 normal-case text-white"
                >
                  <FaAppStoreIos className="w-5 h-5 mr-2" />
                  App Store
                </a>
              )}
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-content/5 backdrop-blur-sm border border-base-content/10 text-sm opacity-80 text-base-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Last updated: {formattedDate}</span>
            </div>
          </div>
        </section>

        {/* Content Section - Light Theme */}
        <section className="flex-1 w-full bg-white px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white p-2 md:p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-primary pl-4">
                {data?.term.name}
              </h2>
              <div
                className="mt-6 text-gray-900 leading-relaxed [&_h1]:text-gray-900 [&_h2]:text-gray-900 [&_h3]:text-gray-900 [&_h4]:text-gray-900 [&_h5]:text-gray-900 [&_h6]:text-gray-900 [&_p]:text-gray-700 [&_p]:mb-4 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:text-gray-700 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:text-gray-700 [&_li]:mb-2 [&_li]:text-gray-700 [&_b]:font-bold [&_b]:text-gray-900 [&_strong]:font-bold [&_strong]:text-gray-900 [&_br]:block [&_br]:mb-2"
                dangerouslySetInnerHTML={{ __html: data?.term.content || "" }}
              />
            </div>
          </div>
        </section>

        {/* Footer Section - Simple */}
        <footer className="bg-base-200 py-8 text-center text-base-content/60 text-sm">
          <p>
            &copy; {new Date().getFullYear()} X-LABS.my.id. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default WithParam;
