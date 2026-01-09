import { FaCode } from "react-icons/fa6";

const stackList = [
  {
    name: "PHP",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/php.webp",
  },
  {
    name: "CodeIgniter",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/codeigniter.webp",
  },
  {
    name: "NativeScript",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/nativescript.webp",
  },
  {
    name: "Flutter",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/flutter.webp",
  },
  {
    name: "Kotlin",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/kotlin.webp",
  },
  {
    name: "Angular",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/angular.webp",
  },
  {
    name: "AlpineJS",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/alpinejs.webp",
  },
  {
    name: "ReactJS",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/reactjs.webp",
  },
  {
    name: "Vue",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/vue.webp",
  },
  {
    name: "TypeScript",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/typescript.webp",
  },
  {
    name: "JavaScript",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/javascript.webp",
  },
  {
    name: "TailwindCSS",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/tailwindcss.webp",
  },
  {
    name: "Bootstrap",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/bootstrap.webp",
  },
  {
    name: "Go",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/go.webp",
  },
  {
    name: "Firebase",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/firebase.webp",
  },
  {
    name: "Supabase",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/supabase.webp",
  },
  {
    name: "MariaDB",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/mariadb.webp",
  },
  {
    name: "MySQL",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/mysql.webp",
  },
  {
    name: "PostgreSQL",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/postgresql.webp",
  },
  {
    name: "WatermelonDB",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/watermelondb.webp",
  },
  {
    name: "SQLite",
    icon_url:
      "https://cdn.jsdelivr.net/gh/x-labs-myid/app-info/icons-more/our-stack/sqlite.webp",
  },
];

const OurStack = () => {
  return (
    <div id="stack" data-theme="light">
      <div className="w-full h-auto lg:h-screen xl:h-screen flex flex-col justify-center items-center mx-auto gap-2 lg:mb-0 xl:mb-0">
        <div className="hero min-h-[20vh] bg-light">
          <div className="hero-content text-center flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center gap-2 text-3xl text-xlabs-primary">
              <FaCode className="w-8 h-8 text-xlabs-primary" />
              <p className="text-xlabs-primary">Our Technology Stack</p>
            </div>

            <p>
              Explore the powerful technologies and frameworks we use to build
              exceptional mobile applications.
            </p>
          </div>
        </div>
        <div className="flex flex-row lg:flex-col gap-5 my-1 w-full max-w-4xl px-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 w-full place-items-center">
            {stackList.map((item, index) => (
              <div key={index} className="tooltip" data-tip={item.name}>
                <img
                  src={item.icon_url}
                  alt={item.name}
                  className="w-16 h-16 object-contain hover:scale-110 transition-transform duration-200"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStack;
