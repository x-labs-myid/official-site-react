import { useEffect, useState } from "react";
import { getDataApp } from "@/landing-page/api";
import type { LandingPageAppData } from "@/landing-page/type";
import { Link } from "react-router-dom";
import { FaApple, FaChevronDown, FaGooglePlay, FaHeart, FaShield } from "react-icons/fa6";
import globalHook from "@/hooks/global";
import { Helmet } from "react-helmet-async";

const Main = () => {
    const [data, setData] = useState<LandingPageAppData[]>([]);
    const { toggleLoading } = globalHook()

    async function getData() {
        try {
            toggleLoading(true, 'Lagi ngambil data app...')
            const res = await getDataApp()
            setData(res)
        } catch (e) {
            console.log(e)
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
                <title>X-LABS Applications - X-LABS.my.id | Inovasi dan Pengembangan Aplikasi Mobile</title>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
                {/* Greeting Section */}
                <div className="w-full h-screen flex flex-col justify-center items-center mx-auto px-4 py-4 gap-8">
                    <img src="https://x-labs.my.id/public/assets/images/icon-v2-white.png" alt="Logo X-LABS" className="w-[80%] lg:w-[50%] xl:w-[50%]" loading="lazy" />
                    <p className="text-center text-xl lg:text-3xl xl:text-3xl">A simple open source Android app, made with <FaHeart className="inline text-red-500" /> and specially brought to you</p>
                    <div className="flex gap-8 mb-20">
                        <a href="https://bsky.app/profile/x-labs.bsky.social" target="_blank" rel="noopener noreferrer" className="btn bg-base-200">
                            Bluesky
                        </a>
                        <a href="https://github.com/x-labs-myid" target="_blank" rel="noopener noreferrer" className="btn bg-base-200">
                            GitHub
                        </a>
                        <a href="https://www.linkedin.com/company/x-labs-myid" target="_blank" rel="noopener noreferrer" className="btn bg-base-200">
                            LinkedIn
                        </a>
                    </div>
                    <a
                        href="#store"
                        className="flex flex-col justify-center items-center shake"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('store')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <p className="text-lg mb-3">See Our Official Store</p>
                        <FaChevronDown className="w-6 h-6" />
                    </a>
                </div>
                {/* Store Section */}
                <div id="store" className="w-full h-screen flex flex-col justify-center items-center mx-auto gap-2">
                    <div className="hero min-h-[20vh] bg-base-200">
                        <div className="hero-content text-center flex flex-col justify-center items-center">
                            <div className="flex flex-row justify-center items-center text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text gap-2">
                                <FaGooglePlay className="w-6 h-6 inline" />
                                <p>Play Store</p>
                            </div>
                            <p>Discover our applications on Google Play Store through two official developer accounts</p>
                        </div>
                    </div>
                    <div className="flex gap-8 my-10">
                        <div className="card bg-base-100 w-96 shadow-sm">
                            <figure>
                                <img
                                    src="https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/store/playstore-only-icon.png"
                                    alt="Play Store" />
                            </figure>
                            <div className="card-body text-center">
                                <p className="text-3xl">X-LABS | my.id</p>
                                <p>Official main account</p>
                                <div className="flex flex-col justify-center items-center gap-2 mt-4">
                                    <button className="btn btn-success text-white w-full">
                                        Visit Store
                                    </button>
                                    <p className="text-xs">Available on Google Play Store</p>
                                </div>
                            </div>
                        </div>
                        <div className="card bg-base-100 w-96 shadow-sm">
                            <figure>
                                <img
                                    src="https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/store/playstore-only-icon.png"
                                    alt="Play Store" />
                            </figure>
                            <div className="card-body text-center">
                                <p className="text-3xl">X-LABS Sub | my.id</p>
                                <p>Official secondary account</p>
                                <div className="flex flex-col justify-center items-center gap-2 mt-4">
                                    <button className="btn btn-success text-white w-full">
                                        Visit Store
                                    </button>
                                    <p className="text-xs">Available on Google Play Store</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div role="alert" className="alert alert-vertical sm:alert-horizontal">
                        <FaShield className="w-6 h-6" />
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-bold">Security Notice</h3>
                            <div className="text-xs">For your security and app quality assurance, please download applications exclusively from these two verified accounts.</div>
                        </div>
                    </div>
                </div>
                {/* App Hero Section */}
                <div className="hero min-h-[10vh] bg-base-200">
                    <div className="hero-content text-center">
                        <div className="py-20 max-w-2xl">
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                X-LABS Applications
                            </h1>
                            <p className="mt-2 text-lg opacity-80">
                                Discover our collection of simple and fast mobile apps.
                            </p>
                        </div>
                    </div>
                </div>

                {/* App Carousel Section */}
                <div className="w-full mx-auto px-4 py-4">
                    <div className="carousel carousel-center w-full space-x-4 bg-transparent p-4 rounded-box">
                        {data.map((item, index) => (
                            <div
                                id={`slide-${index}`}
                                className="carousel-item relative w-full md:w-1/2 lg:w-1/3"
                                key={index}
                            >
                                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-full">
                                    <figure className="px-10 pt-10">
                                        <img
                                            src={item.icon_url}
                                            alt={item.name}
                                            className="rounded-xl w-32 h-32 object-cover"
                                            loading="lazy"
                                        />
                                    </figure>
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title text-2xl">{item.name}</h2>
                                        <p className="text-sm opacity-70 line-clamp-2">{item.short_description}</p>

                                        {/* App Store Badges */}
                                        <div className="flex gap-2 mt-4 flex-wrap justify-center">
                                            {item.playstore_url && (
                                                <a
                                                    href={item.playstore_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-sm btn-primary gap-2"
                                                >
                                                    <FaGooglePlay />
                                                    Play Store
                                                </a>
                                            )}
                                            {item.appstore_url && (
                                                <a
                                                    href={item.appstore_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-sm btn-secondary gap-2"
                                                >
                                                    <FaApple />
                                                    App Store
                                                </a>
                                            )}
                                        </div>

                                        {/* Terms Links */}
                                        {item.terms && item.terms.length > 0 && (
                                            <div className="divider text-xs">Terms</div>
                                        )}
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {item.terms?.map((term, termIndex) => (
                                                <Link
                                                    key={termIndex}
                                                    to={`/${item.slug}/${term.slug}`}
                                                    className="badge badge-outline badge-sm hover:badge-primary transition-all"
                                                >
                                                    {term.name}
                                                </Link>
                                            ))}
                                        </div>

                                        <div className="card-actions mt-4">
                                            <Link
                                                to={`/${item.slug}`}
                                                className="btn btn-outline btn-sm"
                                            >
                                                Lihat Detail
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Carousel Navigation Dots */}
                    <div className="flex justify-center w-full py-8 gap-2">
                        {data.map((_, index) => (
                            <a
                                key={index}
                                href={`#slide-${index}`}
                                className="btn btn-xs btn-circle hover:btn-primary"
                            >
                                {index + 1}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main