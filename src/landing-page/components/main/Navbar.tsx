import { useState, useEffect } from "react";

interface NavbarProps {
  hasStore: boolean;
  hasApps: boolean;
  hasTeam: boolean;
}

const Navbar = ({ hasStore, hasApps, hasTeam }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [
        "home",
        "about",
        "store",
        "apps",
        "team",
        "stack",
        "support-us",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "store", label: "Store", show: hasStore },
    { id: "apps", label: "Apps", show: hasApps },
    { id: "team", label: "Team", show: hasTeam },
    { id: "stack", label: "Stack" },
    { id: "support-us", label: "Support" },
  ];

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 w-[90%] max-w-4xl px-4 py-2 rounded-full border border-white/10 ${
        isScrolled
          ? "bg-base-100/70 backdrop-blur-md shadow-lg py-3"
          : "bg-white/5 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          <img
            src="/icon-only-v2.png"
            alt="Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-lg hidden sm:block">X-LABS</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-4 overflow-x-auto no-scrollbar">
          {navLinks
            .filter((link) => link.show !== false)
            .map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeSection === link.id
                    ? "bg-primary text-primary-content shadow-sm"
                    : "hover:bg-white/10 opacity-70 hover:opacity-100"
                }`}
              >
                {link.label}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
