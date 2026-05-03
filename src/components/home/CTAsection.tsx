import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = ({ theme }: { theme: string }) => {
  const isDark = theme === "dark";

  return (
    <section className="px-4 py-20">
      <div
        className="relative mx-auto max-w-6xl rounded-[2.5rem] overflow-hidden shadow-xl"
        style={{
          backgroundImage: "url('/CTA-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 ${
            isDark ? "bg-black/70" : "bg-black/50"
          }`}
        />

        {/* Content */}
        <div className="relative z-10 px-8 py-16 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Need Help or Have Questions?
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-white/80 text-lg">
            Our team is here to assist you. Reach out anytime and we’ll get back
            to you as soon as possible.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              to="/contact"
              className="flex items-center gap-2 rounded-full bg-[#A66B55] px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-[#8b5846]"
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;