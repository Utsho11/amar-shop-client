import {
  FaHandsHelping,
  FaBullseye,
  FaLightbulb,
  FaUsers,
  FaShoppingCart,
} from "react-icons/fa";
import image from "/images.jpeg";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
const AboutPage = () => {
  const { theme } = useTheme();

  return (
    <div
      className={` ${
        theme === "dark"
          ? "bg-gray-900  text-gray-200"
          : " text-gray-800 bg-gray-50"
      }`}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-2">
            Welcome to <span className="text-yellow-300">AmarShop</span>
          </h1>
          <p className="text-lg md:text-xl">
            Your one-stop destination for quality products and exceptional
            service.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img
            src={image}
            alt="Our Story"
            className="rounded-lg shadow-lg w-full"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <FaUsers className="text-blue-500" /> Our Story
            </h2>
            <p className="text-lg leading-relaxed">
              AmarShop was founded with the vision of creating a seamless online
              shopping platform that connects people to products they love. From
              humble beginnings, we’ve grown into a trusted brand, offering a
              wide range of products to meet the needs of every customer.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section
        className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} py-16`}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
            <FaBullseye className="text-green-500" /> Our Mission & Vision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`p-6 ${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              } rounded-lg shadow-md`}
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <FaHandsHelping className="text-blue-500" /> Our Mission
              </h3>
              <p>
                To provide an unparalleled shopping experience by offering the
                highest quality products and exceptional service.
              </p>
            </div>
            <div
              className={`p-6 ${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              } rounded-lg shadow-md`}
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <FaBullseye className="text-green-500" /> Our Vision
              </h3>
              <p>
                To be the leading e-commerce platform, bringing convenience and
                joy to millions of shoppers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
            <FaLightbulb className="text-yellow-500" /> Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className={`p-6 ${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              } rounded-lg shadow-md`}
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <FaUsers className="text-blue-500" /> Customer First
              </h3>
              <p>
                We prioritize our customers and their satisfaction above all
                else.
              </p>
            </div>
            <div
              className={`p-6 ${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              } rounded-lg shadow-md`}
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <FaLightbulb className="text-yellow-500" /> Integrity
              </h3>
              <p>Honesty and transparency are the pillars of our business.</p>
            </div>
            <div
              className={`p-6 ${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              } rounded-lg shadow-md`}
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <FaShoppingCart className="text-green-500" /> Innovation
              </h3>
              <p>
                We continuously strive to improve and innovate our services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            <FaHandsHelping className="text-yellow-400" /> Join Our Journey
          </h2>
          <p className="text-lg mb-6">
            Be a part of our growing community and experience the difference
            with AmarShop.
          </p>
          <Link to="/products">
            <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">
              Start Shopping
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
