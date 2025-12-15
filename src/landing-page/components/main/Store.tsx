// Store Section
import { FaGooglePlay, FaShield } from "react-icons/fa6"

const Store = () => {
    return (
        <>
            <div id="store" className="w-full h-auto lg:h-screen xl:h-screen flex flex-col justify-center items-center mx-auto gap-2 mb-14 lg:mb-0 xl:mb-0">
                <div className="hero min-h-[20vh] bg-base-200">
                    <div className="hero-content text-center flex flex-col justify-center items-center">
                        <div className="flex flex-row justify-center items-center text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text gap-2">
                            <FaGooglePlay className="w-6 h-6 inline" />
                            <p>Play Store</p>
                        </div>
                        <p>Discover our applications on Google Play Store through two official developer accounts</p>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-8 my-10">
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
        </>
    )
}

export default Store