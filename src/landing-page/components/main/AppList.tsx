import type { LandingPageAppData } from "@/landing-page/type";
import { FaApple, FaGooglePlay, FaShapes } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AppList = ({ appList }: { appList: LandingPageAppData[] }) => {
  return (
    <div data-theme="light">
      <div className="w-full h-auto lg:h-screen xl:h-screen flex flex-col justify-center items-center mx-auto gap-2 lg:mb-0 xl:mb-0">
        <div className="hero min-h-[20vh] bg-light">
          <div className="hero-content text-center flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center gap-2 text-3xl text-xlabs-primary">
              <FaShapes className="w-8 h-8 text-xlabs-primary" />
              <p className="text-xlabs-primary">Our Apps</p>
            </div>

            <p>Discover our collection of simple and fast mobile apps.</p>
          </div>
        </div>

        <div className="w-full mx-auto px-4 py-4">
          <div className="carousel carousel-center w-full space-x-4 bg-transparent p-4 rounded-box">
            {appList.map((item, index) => (
              <div
                id={`slide-${index}`}
                className="carousel-item relative w-full md:w-1/2 lg:w-1/3"
                key={index}
              >
                {item.icon_url && (
                  <div className="card bg-base-100 shadow-none w-full">
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
                      <p className="text-sm opacity-70 line-clamp-2">
                        {item.short_description}
                      </p>

                      {/* App Store Badges */}
                      <div className="flex gap-2 mt-4 flex-wrap justify-center">
                        {!item.playstore_url && !item.appstore_url ? (
                          <div className="flex gap-2">
                            <span>Coming Soon</span>
                            <div className="flex gap-2 justify-center">
                              <FaGooglePlay /> Play Store
                            </div>
                            <span>or</span>
                            <div className="flex gap-2 justify-center">
                              <FaApple /> App Store
                            </div>
                          </div>
                        ) : null}
                        {item.playstore_url && (
                          <a
                            href={item.playstore_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-green-playstore gap-2"
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
                      {/* {item.terms && item.terms.length > 0 && (
                      <div className="divider text-xs">Terms</div>
                    )} */}
                      <div className="flex flex-wrap gap-2 mt-5 justify-center">
                        {item.terms?.map((term, termIndex) => (
                          <Link
                            key={termIndex}
                            to={`/${item.slug}/term/${term.slug}`}
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
                )}
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
      </div>
    </div>
  );
};

export default AppList;
