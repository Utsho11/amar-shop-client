import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle, MessageSquare } from "lucide-react";

const CTASection = ({ theme }: { theme: string }) => {
  const isDark = theme === "dark";

  return (
    <section className="container mx-auto px-4 py-16">
      <div
        className="relative mx-auto max-w-6xl rounded-[2.5rem] overflow-hidden shadow-xl bg-neutral"
        style={{
          backgroundImage: "url('/CTA-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* High-contrast accessible overlay */}
        <div
          className={`absolute inset-0 ${
            isDark ? "bg-black/80 backdrop-blur-xs" : "bg-black/65 backdrop-blur-xs"
          }`}
        />

        {/* Content */}
        <div className="relative z-10 px-6 sm:px-12 py-16 text-center text-white space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-amber-200">
            <HelpCircle size={14} />
            <span>Dedicated Shopper & Merchant Support</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            Need Help or Have Inquiries?
          </h2>

          <p className="max-w-xl mx-auto text-xs sm:text-base leading-relaxed text-white/85">
            Our multi-vendor marketplace team is here to assist with order tracking, vendor conflicts, returns, or seller onboarding.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="btn btn-primary rounded-full px-8 btn-md text-sm font-semibold shadow-xl shadow-primary/30 inline-flex items-center gap-2 hover:scale-[1.03] transition-transform"
            >
              <MessageSquare size={16} />
              <span>Contact Support</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/faq"
              className="btn btn-outline rounded-full px-7 btn-md text-sm font-semibold text-white border-white/40 hover:bg-white/20 hover:border-white transition"
            >
              Browse FAQs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;