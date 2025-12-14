import { FaChevronDown, FaGithub, FaHeart, FaLinkedin } from "react-icons/fa6";
import { PiButterfly } from "react-icons/pi";

const Greeting = () => {
    return (
        <>
            {/* Greeting Section */}
            <div className="w-full h-screen flex flex-col justify-center items-center mx-auto px-4 py-4 gap-8">
                <img src="https://x-labs.my.id/public/assets/images/icon-v2-white.png" alt="Logo X-LABS" className="w-[80%] lg:w-[50%] xl:w-[50%]" loading="lazy" />
                <p className="text-center text-xl lg:text-3xl xl:text-3xl">A simple open source Android app, made with <FaHeart className="inline text-red-500" /> and specially brought to you</p>
                <div className="flex gap-8 mb-20">
                    <a href="https://bsky.app/profile/x-labs.bsky.social" target="_blank" rel="noopener noreferrer" className="btn bg-base-200">
                        <PiButterfly className="inline" /> Bluesky
                    </a>
                    <a href="https://github.com/x-labs-myid" target="_blank" rel="noopener noreferrer" className="btn bg-base-200">
                        <FaGithub className="inline" /> GitHub
                    </a>
                    <a href="https://www.linkedin.com/company/x-labs-myid" target="_blank" rel="noopener noreferrer" className="btn bg-base-200">
                        <FaLinkedin className="inline" /> LinkedIn
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
        </>
    )
}

export default Greeting