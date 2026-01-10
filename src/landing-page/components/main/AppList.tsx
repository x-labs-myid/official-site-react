import type { LandingPageAppData } from "@/landing-page/type";
import { useEffect, useRef, useState } from "react";
import { FaAppStoreIos, FaGooglePlay, FaShapes } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AppList = ({ appList }: { appList: LandingPageAppData[] }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Pagination State
  const [activePage, setActivePage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3); // Default for desktop

  // Effect to calculate Items Per Page based on sizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(3); // lg
      else if (window.innerWidth >= 768) setItemsPerPage(2); // md
      else setItemsPerPage(1); // mobile
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(appList.length / itemsPerPage);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftState(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    sliderRef.current.scrollLeft = scrollLeftState - walk;
  };

  // Sync Active Page on Scroll
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;

    const scrollPosition = container.scrollLeft;
    const containerWidth = container.clientWidth;

    const page = Math.round(scrollPosition / containerWidth);

    // Bounds check
    const cleanPage = Math.min(Math.max(page, 0), totalPages - 1);
    setActivePage(cleanPage);
  };

  // Scroll to Specific Page
  const scrollToPage = (pageIndex: number) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const containerWidth = container.clientWidth;

    container.scrollTo({
      left: pageIndex * containerWidth,
      behavior: "smooth",
    });
    setActivePage(pageIndex);
  };

  return (
    <div id="apps" data-theme="light">
      <div className="w-full min-h-screen flex flex-col justify-center items-center mx-auto gap-2 py-20 lg:mb-0 xl:mb-0">
        <div className="hero min-h-[20vh] bg-light">
          <div className="hero-content text-center flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center gap-2 text-3xl text-xlabs-primary">
              <FaShapes className="w-8 h-8 text-xlabs-primary" />
              <p className="text-xlabs-primary">Our Apps</p>
            </div>

            <p>Discover our collection of simple and fast mobile apps.</p>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 py-4">
          <div
            ref={sliderRef}
            className={`carousel carousel-center w-full space-x-4 p-4 rounded-box overflow-x-auto cursor-grab ${
              isDown ? "cursor-grabbing select-none" : ""
            }`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onScroll={handleScroll}
          >
            {appList.map((item, index) => (
              <div
                id={`slide-${index}`}
                className="carousel-item relative w-full md:w-1/2 lg:w-1/3 transition-all duration-300"
                key={index}
              >
                {item.icon_url && (
                  <div className="card bg-base-100 shadow-none w-full transition-shadow duration-300 border border-transparent hover:border-base-200/50">
                    <figure className="px-10 pt-10">
                      <img
                        src={item.icon_url}
                        alt={item.name}
                        className="rounded-xl w-28 h-28 object-cover shadow-sm pointer-events-none"
                        loading="lazy"
                      />
                    </figure>
                    <div className="card-body items-center text-center p-6">
                      <h2 className="card-title text-xl font-bold mb-2">
                        {item.name}
                      </h2>
                      <p className="text-sm opacity-70 line-clamp-2 mb-4 min-h-[2.5em]">
                        {item.short_description}
                      </p>

                      {/* App Store Badges */}
                      <div className="flex gap-2 mb-4 flex-wrap justify-center">
                        {!item.playstore_url && !item.appstore_url ? (
                          <div className="badge badge-ghost p-4 gap-2 opacity-50">
                            Coming Soon
                          </div>
                        ) : null}
                        {item.playstore_url && (
                          <a
                            href={item.playstore_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-primary rounded-full px-4 normal-case text-white shadow-md hover:shadow-lg transition-all"
                            onMouseDown={(e) => e.stopPropagation()}
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
                            className="btn btn-sm btn-neutral rounded-full px-4 normal-case text-white shadow-md hover:shadow-lg transition-all"
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            <FaAppStoreIos />
                            App Store
                          </a>
                        )}
                      </div>

                      {/* Terms Links */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        {item.terms?.map((term, termIndex) => (
                          <Link
                            key={termIndex}
                            to={`/${item.slug}/term/${term.slug}`}
                            className="btn btn-xs btn-outline rounded-full font-normal opacity-70 hover:opacity-100 hover:bg-primary hover:text-white hover:border-primary transition-all normal-case"
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            {term.name}
                          </Link>
                        ))}
                      </div>

                      {/* <div className="card-actions mt-6">
                        <Link
                          to={`/${item.slug}`}
                          className="btn btn-ghost btn-sm text-primary hover:bg-primary/10"
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          View Details
                        </Link>
                      </div> */}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center w-full py-8 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToPage(index)}
                className={`btn btn-xs btn-circle transition-all duration-300 ${
                  activePage === index
                    ? "btn-primary scale-110"
                    : "btn-ghost bg-base-300 hover:bg-base-400"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppList;
