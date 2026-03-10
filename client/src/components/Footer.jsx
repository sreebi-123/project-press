import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full bg-white text-gray-500 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-200 pb-6">
        <div className="md:max-w-md">
          <h1 className="text-indigo-500 font-extrabold text-3xl">
            PrintPress
          </h1>
          <p className="mt-6 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. It has been the industry's standard dummy text ever since
            the 1500s.
          </p>
        </div>
        <div className="flex-1 flex flex-col md:flex-row md:justify-end gap-10">
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/About"className="hover:underline">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:underline">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+1-212-456-7890</p>
              <p>contact@example.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        © 2025 PrintPress. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
