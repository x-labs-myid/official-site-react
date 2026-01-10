import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SimpleNavbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 w-[90%] max-w-4xl px-6 py-3 rounded-full border border-white/10 ${
        isScrolled
          ? "bg-neutral/80 backdrop-blur-md shadow-lg"
          : "bg-neutral/40 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/icon-only-v2.png"
            alt="Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-lg text-white hidden sm:block">
            X-LABS
          </span>
        </div>

        <button
          onClick={() => navigate("/")}
          className="btn btn-sm btn-ghost text-white hover:bg-white/10 rounded-full normal-case"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SimpleNavbar;
