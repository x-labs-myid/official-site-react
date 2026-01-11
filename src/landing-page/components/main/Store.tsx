// Store Section
import { FaGooglePlay, FaShield } from "react-icons/fa6";
import type { LandingPageStoreData } from "@/landing-page/type";

const Store = ({ storeList }: { storeList: LandingPageStoreData[] }) => {
  return (
    <>
      <div
        id="store"
        className="w-full min-h-screen flex flex-col justify-center items-center mx-auto gap-2 py-20 lg:mb-0 xl:mb-0"
      >
        <div className="hero min-h-[20vh] bg-dark">
          <div className="hero-content text-center flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text gap-2">
              <FaGooglePlay className="w-6 h-6 inline" />
              <p>Play Store</p>
            </div>
            <p>
              Discover our applications on Google Play Store through two
              official developer accounts
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 my-10">
          {storeList.map((store) => (
            <div className="card bg-white text-gray-800 max-w-md pt-5 shadow-sm w-96">
              <figure>
                <img src={store.logo} width={100} alt="Play Store" />
              </figure>
              <div className="card-body text-center text-black">
                <p className="text-2xl">{store.store_name}</p>
                <p>
                  {store.store_name === "X-LABS | my.id"
                    ? "Official Main Account"
                    : "Official Other Account"}
                </p>
                <div className="flex flex-col justify-center items-center gap-2 mt-4">
                  <button
                    className="btn bg-green-playstore border border-green-playstore text-white w-full"
                    onClick={() => window.open(store.url, "_blank")}
                  >
                    Visit Store
                  </button>
                  <p className="text-xs">Available on Google Play Store</p>
                </div>
              </div>
            </div>
          ))}
          {/* <div className="card bg-white text-dark w-96 shadow-sm">
            <figure>
              <img
                src="https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/store/playstore-only-icon.png"
                alt="Play Store"
              />
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
          </div> */}
        </div>
        <div role="alert" className="alert alert-vertical sm:alert-horizontal">
          <FaShield className="w-6 h-6" />
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Security Notice</h3>
            <div className="text-xs">
              For your security and app quality assurance, please download
              applications exclusively from these two verified accounts.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
