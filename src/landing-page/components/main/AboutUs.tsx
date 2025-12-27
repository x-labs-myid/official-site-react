import { FaTachometerAlt, FaMobileAlt } from "react-icons/fa";
import {
  FaAddressCard,
  FaGifts,
  FaGithub,
  FaHeart,
  FaMobile,
  FaShield,
  FaWater,
  FaCompass,
  FaLeaf,
  FaShieldHalved,
  FaAward,
} from "react-icons/fa6";

// About Us Section
const AboutUs = () => {
  return (
    <div data-theme="light">
      <div className="w-full h-auto lg:h-screen xl:h-screen flex flex-col justify-center items-center mx-auto gap-2 lg:mb-0 xl:mb-0">
        <div className="hero min-h-[20vh] bg-light">
          <div className="hero-content text-center flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center gap-2 text-3xl text-xlabs-primary">
              <FaCompass className="w-8 h-8 text-xlabs-primary" />
              <p className="text-xlabs-primary">About Us</p>
            </div>

            <p>
              Simple solutions, made with{" "}
              <FaHeart className="w-4 h-4 inline text-red-500" /> for everyone
            </p>
          </div>
        </div>
        <div className="flex flex-row lg:flex-col gap-5 my-1">
          <p className="text-center lg:text-[18px] xl:text-[18px]">
            We are a team of passionate developers dedicated to building simple,
            open-source, and high-quality
            <br />
            Android apps. Our mission is to create technology that is accessible
            and useful for everyone.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="card bg-base-100 w-96 shadow-none">
              <div className="card-body text-center">
                <div className="flex justify-center items-center">
                  <FaMobileAlt className="w-7 h-7 text-xlabs-primary" />
                </div>
                <p className="text-xl font-bold">Mobile First</p>
                <p>Applications optimized for the best mobile experience</p>
              </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-none">
              <div className="card-body text-center">
                <div className="flex justify-center items-center">
                  <FaAward className="w-7 h-7 text-xlabs-primary" />
                </div>
                <p className="text-xl font-bold">Innovation & Quality</p>
                <p>
                  Delivering cutting-edge and high-quality technology solutions
                </p>
              </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-none">
              <div className="card-body text-center">
                <div className="flex justify-center items-center">
                  <FaGithub className="w-7 h-7 text-xlabs-primary" />
                </div>
                <p className="text-xl font-bold">Open Source</p>
                <p>Transparent development with open source principles</p>
              </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-none">
              <div className="card-body text-center">
                <div className="flex justify-center items-center">
                  <FaLeaf className="w-7 h-7 text-xlabs-primary" />
                </div>
                <p className="text-xl font-bold">Simplicity</p>
                <p>Clean and intuitive design for better user experience</p>
              </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-none">
              <div className="card-body text-center">
                <div className="flex justify-center items-center">
                  <FaShieldHalved className="w-7 h-7 text-xlabs-primary" />
                </div>
                <p className="text-xl font-bold">Reability</p>
                <p>Stable and dependable applications you can trust</p>
              </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-none">
              <div className="card-body text-center">
                <div className="flex justify-center items-center">
                  <FaTachometerAlt className="w-7 h-7 text-xlabs-primary" />
                </div>
                <p className="text-xl font-bold">Performance</p>
                <p>Fast and efficient apps optimized for your device</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
