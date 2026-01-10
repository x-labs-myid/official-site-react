import { FaTachometerAlt, FaMobileAlt } from "react-icons/fa";
import {
  FaGithub,
  FaHeart,
  FaCompass,
  FaLeaf,
  FaShieldHalved,
  FaAward,
} from "react-icons/fa6";

// About Us Section
const AboutUs = () => {
  return (
    <div id="about" data-theme="light">
      <div className="w-full min-h-screen flex flex-col justify-center items-center mx-auto gap-4 py-10 px-4">
        <div className="hero bg-light">
          <div className="hero-content text-center flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center gap-2 text-3xl text-xlabs-primary">
              <FaCompass className="w-8 h-8 text-xlabs-primary" />
              <p className="text-xlabs-primary">About Us</p>
            </div>

            <p className="mt-2 text-lg">
              Simple solutions, made with{" "}
              <FaHeart className="w-4 h-4 inline text-red-500" /> for everyone
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8 w-full max-w-7xl">
          <p className="text-center text-lg lg:w-2/3 mx-auto">
            We are a team of passionate developers dedicated to building simple,
            open-source, and high-quality Android apps. Our mission is to create
            apps that are accessible and useful for everyone.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="card-body text-center items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-2">
                  <FaMobileAlt className="w-8 h-8 text-xlabs-primary" />
                </div>
                <h3 className="card-title text-xl font-bold">Mobile First</h3>
                <p>Applications optimized for the best mobile experience</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="card-body text-center items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-2">
                  <FaAward className="w-8 h-8 text-xlabs-primary" />
                </div>
                <h3 className="card-title text-xl font-bold">
                  Innovation & Quality
                </h3>
                <p>
                  Delivering cutting-edge and high-quality technology solutions
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="card-body text-center items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-2">
                  <FaGithub className="w-8 h-8 text-xlabs-primary" />
                </div>
                <h3 className="card-title text-xl font-bold">Open Source</h3>
                <p>Transparent development with open source principles</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="card-body text-center items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-2">
                  <FaLeaf className="w-8 h-8 text-xlabs-primary" />
                </div>
                <h3 className="card-title text-xl font-bold">Simplicity</h3>
                <p>Clean and intuitive design for better user experience</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="card-body text-center items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-2">
                  <FaShieldHalved className="w-8 h-8 text-xlabs-primary" />
                </div>
                <h3 className="card-title text-xl font-bold">Reliability</h3>
                <p>Stable and dependable applications you can trust</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="card-body text-center items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-2">
                  <FaTachometerAlt className="w-8 h-8 text-xlabs-primary" />
                </div>
                <h3 className="card-title text-xl font-bold">Performance</h3>
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
