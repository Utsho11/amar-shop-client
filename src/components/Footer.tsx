import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import {
  FiChevronRight,
  FiPhone,
  FiTruck,
  FiShield,
  FiFileText,
} from "react-icons/fi";
import { HiOutlinePaperAirplane } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Shop Info */}
          <div>
            <h2 className="text-2xl font-semibold text-white">AmarShop</h2>
            <p className="mt-4 text-sm">
              Your one-stop shop for quality products at affordable prices.
              Explore a wide range of items and enjoy seamless shopping!
            </p>
            <div className="flex mt-4 gap-4">
              <a
                href="/"
                className="text-gray-300 hover:text-white"
                aria-label="Facebook"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="/"
                className="text-gray-300 hover:text-white"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="/"
                className="text-gray-300 hover:text-white"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="/"
                className="text-gray-300 hover:text-white"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FiChevronRight className="mr-2" />
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li className="flex items-center">
                <FiChevronRight className="mr-2" />
                <a href="/products" className="hover:underline">
                  Shop Products
                </a>
              </li>
              <li className="flex items-center">
                <FiChevronRight className="mr-2" />
                <a href="/" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li className="flex items-center">
                <FiChevronRight className="mr-2" />
                <a href="/" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Customer Support
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FiPhone className="mr-2" />
                <a href="/" className="hover:underline">
                  Returns & Refunds
                </a>
              </li>
              <li className="flex items-center">
                <FiTruck className="mr-2" />
                <a href="/" className="hover:underline">
                  Shipping Policy
                </a>
              </li>
              <li className="flex items-center">
                <FiShield className="mr-2" />
                <a href="/" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li className="flex items-center">
                <FiFileText className="mr-2" />
                <a href="/" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Stay Connected
            </h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded-l-lg focus:outline-none text-gray-800"
              />
              <button
                type="submit"
                className="bg-[#ffb703] text-white px-4 py-2 rounded-r-lg hover:bg-[#e6a502]"
              >
                <HiOutlinePaperAirplane size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-600 pt-4 text-center text-sm">
          <p>&copy; 2025 AmarShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
