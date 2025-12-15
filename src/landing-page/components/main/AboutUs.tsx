import { FaTachometerAlt } from "react-icons/fa"
import { FaAddressCard, FaGifts, FaGithub, FaHeart, FaMobile, FaShield, FaWater } from "react-icons/fa6"

// About Us Section
const AboutUs = () => {
    return (
        <>
            <div className="w-full h-auto lg:h-screen xl:h-screen flex flex-col justify-center items-center mx-auto gap-2 mb-14 lg:mb-0 xl:mb-0">
                <div className="hero min-h-[20vh] bg-base-200">
                    <div className="hero-content text-center flex flex-col justify-center items-center">
                        <div className="flex flex-row justify-center items-center text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text gap-2">
                            <FaAddressCard className="w-6 h-6 inline" />
                            <p>About Us</p>
                        </div>
                        <p>Simple solutions, made with <FaHeart className="w-6 h-6 inline text-red-500" /> for everyone</p>
                    </div>
                </div>
                <div className="flex flex-row lg:flex-col gap-8 my-10">
                    <p>We are a team of passionate developers dedicated to building simple, open-source, and high-quality Android apps. Our mission is to create technology that is accessible and useful for everyone.</p>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="card bg-base-100 w-96 shadow-sm">
                            <div className="card-body text-center">
                                <div className="flex justify-center items-center">
                                    <FaMobile className="w-16 h-16" />
                                </div>
                                <p className="text-xl font-bold">Mobile First</p>
                                <p>Applications optimized for the best mobile experience</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 w-96 shadow-sm">
                            <div className="card-body text-center">
                                <div className="flex justify-center items-center">
                                    <FaGifts className="w-16 h-16" />
                                </div>
                                <p className="text-xl font-bold">Innovation & Quality</p>
                                <p>Delivering cutting-edge and high-quality technology solutions</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 w-96 shadow-sm">
                            <div className="card-body text-center">
                                <div className="flex justify-center items-center">
                                    <FaGithub className="w-16 h-16" />
                                </div>
                                <p className="text-xl font-bold">Open Source</p>
                                <p>Transparent development with open source principles</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 w-96 shadow-sm">
                            <div className="card-body text-center">
                                <div className="flex justify-center items-center">
                                    <FaWater className="w-16 h-16" />
                                </div>
                                <p className="text-xl font-bold">Simplicity</p>
                                <p>Clean and intuitive design for better user experience</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 w-96 shadow-sm">
                            <div className="card-body text-center">
                                <div className="flex justify-center items-center">
                                    <FaShield className="w-16 h-16" />
                                </div>
                                <p className="text-xl font-bold">Reability</p>
                                <p>Stable and dependable applications you can trust</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 w-96 shadow-sm">
                            <div className="card-body text-center">
                                <div className="flex justify-center items-center">
                                    <FaTachometerAlt className="w-16 h-16" />
                                </div>
                                <p className="text-xl font-bold">Performance</p>
                                <p>Fast and efficient apps optimized for your device</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs