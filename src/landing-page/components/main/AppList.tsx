import type { LandingPageAppData } from "@/landing-page/type"
import { FaApple, FaGooglePlay } from "react-icons/fa6"
import { Link } from "react-router-dom"

const AppList = ({ appList }: { appList: LandingPageAppData[] }) => {
    return (
        <>
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
                    {appList.map((item, index) => (
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
                    {appList.map((_, index) => (
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
        </>
    )
}

export default AppList