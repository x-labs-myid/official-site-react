import {
  FaHeart,
  FaRocket,
  FaCode,
  FaServer,
  FaGraduationCap,
  FaShieldHalved,
} from "react-icons/fa6";

const SupportUs = () => {
  return (
    <section id="support-us" className="bg-[#6f42c1] w-full">
      <div className="w-full min-h-screen flex flex-col justify-center items-center mx-auto gap-2 py-20 lg:mb-0 xl:mb-0 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-white text-3xl font-bold mb-3 flex items-center justify-center gap-2">
              <FaHeart className="text-red-500" />
              Support Our Mission
            </h2>
            <p className="text-white text-lg opacity-90 mb-0">
              Help us build exceptional applications for a better digital future
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full lg:w-10/12 xl:w-8/12">
              <div className="card border-0 shadow-lg backdrop-blur-md bg-white/95 rounded-box">
                <div className="card-body p-8 sm:p-12">
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center bg-primary/10 rounded-full w-20 h-20 mb-4">
                      <FaRocket className="text-3xl text-primary" />
                    </div>
                    <h3 className="mb-3 text-gray-900 font-bold text-2xl">
                      Why Your Support Matters
                    </h3>
                    <p className="text-gray-900 text-lg leading-relaxed">
                      Your contribution enables us to continuously develop
                      high-quality applications, provide regular updates, and
                      create innovative features that benefit all users.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    <div className="text-center p-3">
                      <div className="inline-flex items-center justify-center bg-primary/10 rounded-full w-16 h-16 mb-3">
                        <FaCode className="text-xl text-primary" />
                      </div>
                      <h5 className="text-gray-900 font-semibold mb-2 text-lg">
                        Development
                      </h5>
                      <p className="text-gray-900 text-sm mb-0 opacity-80">
                        New features and improvements
                      </p>
                    </div>
                    <div className="text-center p-3">
                      <div className="inline-flex items-center justify-center bg-green-500/10 rounded-full w-16 h-16 mb-3">
                        <FaServer className="text-xl text-green-600" />
                      </div>
                      <h5 className="text-gray-900 font-semibold mb-2 text-lg">
                        Infrastructure
                      </h5>
                      <p className="text-gray-900 text-sm mb-0 opacity-80">
                        Servers and hosting services
                      </p>
                    </div>
                    <div className="text-center p-3">
                      <div className="inline-flex items-center justify-center bg-yellow-500/10 rounded-full w-16 h-16 mb-3">
                        <FaGraduationCap className="text-xl text-yellow-600" />
                      </div>
                      <h5 className="text-gray-900 font-semibold mb-2 text-lg">
                        Education
                      </h5>
                      <p className="text-gray-900 text-sm mb-0 opacity-80">
                        Learning and research
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="inline-block p-4 bg-gray-50 rounded-3xl shadow-sm min-h-[60px] min-w-[200px]">
                      <img
                        src="/assets/images/qris-payment.jpeg"
                        alt="QRIS X-LABS | my.id"
                        className="w-128 h-128 object-cover"
                      />
                    </div>
                    <p className="text-gray-900 text-sm mt-4 mb-0 flex items-center justify-center gap-1">
                      <FaShieldHalved className="text-green-600" />
                      Secure payment powered by QRIS
                    </p>
                    {/* <div
                      ref={containerRef}
                      className="inline-block p-4 bg-gray-50 rounded-3xl shadow-sm min-h-[60px] min-w-[200px]"
                    >
                    </div>
                    <p className="text-gray-900 text-sm mt-4 mb-0 flex items-center justify-center gap-1">
                      <FaShieldHalved className="text-green-600" />
                      Secure payment powered by Trakteer
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportUs;
