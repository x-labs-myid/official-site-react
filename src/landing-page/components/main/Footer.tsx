import {
  FaShop,
  FaOsi,
  FaArrowUpRightFromSquare,
  FaFileLines,
} from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral text-neutral-content py-10 px-4 md:px-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h5 className="font-bold border-b-2 border-neutral-content pb-2 mb-4 flex items-center gap-2">
              <FaShop />
              Features Apps
            </h5>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.kang.cahya.apps.bukukasbon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                  Buku Kasbon
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.kang.cahya.apps.mykbbi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                  MyKBBI
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.kang.cahya.SimpleQRCodeScanner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                  Simple QR Code Scanner PRO
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold border-b-2 border-neutral-content pb-2 mb-4 flex items-center gap-2">
              <FaOsi />
              Open Source
            </h5>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a
                  href="https://github.com/dyazincahya/quran-api-with-php-codeigniter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                  Quran API
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/dyazincahya/nativescript-book-id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                  NativeScript Book ID
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/dyazincahya/KBBI-SQL-database"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                  KBBI Database
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/dyazincahya/sqlite-helper-nativescript"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                  SQLite Helper for NativeScript
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold border-b-2 border-neutral-content pb-2 mb-4 flex items-center gap-2">
              <FaArrowUpRightFromSquare />
              External Link
            </h5>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a
                  href="https://github.com/x-labs-myid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                  Github Organization
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/dev?id=8941046243892038548"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                  Google Playstore
                </a>
              </li>
              <li>
                <a
                  href="https://app-privacy-policy-generator.nisrulz.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                  Privacy Generator
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold border-b-2 border-neutral-content pb-2 mb-4 flex items-center gap-2">
              <FaFileLines />
              Pages
            </h5>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a
                  href="https://x-labs.my.id/apps/whatsapp-sender/terms-and-conditions.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a
                  href="https://x-labs.my.id/apps/whatsapp-sender/privacy-policy.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-neutral-content/20 text-center">
          <div className="mb-4">
            <span className="mr-2">2019–{currentYear} &copy;</span>
            <img
              src="/icon-v2-white.png"
              alt="Logo"
              className="inline-block h-4 opacity-80"
              loading="lazy"
            />
          </div>
          <p className="text-sm">
            Develop by{" "}
            <a
              href="https://www.kang-cahya.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline"
            >
              X-LABS | my.id Teams
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
