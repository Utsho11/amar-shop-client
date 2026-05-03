import { Link } from "react-router-dom";
import cartImg from "../../../assets/banner.png"; // তোমার image path
import { useTheme } from "../../../context/ThemeContext";

export default function Banner() {
  const {theme} = useTheme()
  return (
   <section
  className={`min-h-[90vh] flex items-center px-6 md:px-16 ${
    theme === "dark" ? "bg-[#1A1716]" : "bg-[#F9F5F0]"
  }`}
>
  <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-10 items-center">
    {/* LEFT CONTENT */}
    <div className="order-2 lg:order-1 space-y-6">
      <p className="text-sm tracking-widest font-semibold text-[#A66B55]">
        NEW SEASON ARRIVAL
      </p>

      <h1
        className={`text-3xl md:text-5xl font-bold leading-tight ${
          theme === "dark" ? "text-[#F9F5F0]" : "text-[#3D352F]"
        }`}
      >
        Welcome to Amar Shop
      </h1>

      <p
        className={`max-w-md ${
          theme === "dark" ? "text-[#B8AFA8]" : "text-[#6B5E57]"
        }`}
      >
        Discover a curated collection of premium essentials designed for the
        modern lifestyle. Effortless style meets functional elegance.
      </p>

      <button
        className={`btn rounded-full px-8 border-none shadow-lg transition ${
          theme === "dark"
            ? "bg-[#A66B55] text-white hover:bg-[#8b5846]"
            : "bg-[#A66B55] text-white hover:bg-[#1f2a1f]"
        }`}
      >
        <Link to="/products">Start Shopping</Link>
      </button>
    </div>

    {/* RIGHT IMAGE */}
    <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
      <img
        src={cartImg}
        alt="Shopping Cart"
        className={`w-[280px] md:w-[380px] lg:w-[450px] rounded-xl shadow-2xl ${
          theme === "dark" ? "shadow-black/50" : ""
        }`}
      />
    </div>
  </div>
</section>
  );
}
