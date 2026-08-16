import {
  Sparkles,
  Scale,
  Truck,
  Store,
  Zap,
  ShoppingBag,
  ArrowRight,
  Award,
  CheckCircle2,
  Lock,
  Cpu,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const stats = [
    { label: "Verified Merchants", value: "500+", sub: "Vetted storefronts" },
    { label: "Curated Products", value: "12,000+", sub: "Quality guaranteed" },
    { label: "Satisfied Customers", value: "45,000+", sub: "Across the country" },
    { label: "On-Time Dispatch", value: "99.8%", sub: "Within 24 hours" },
  ];

  const pillars = [
    {
      icon: Store,
      title: "Verified Merchant Ecosystem",
      description:
        "Every vendor on Amar Shop passes strict authentication and quality checks. We empower authentic local creators and established boutiques with direct merchant-to-shopper storefronts.",
      badge: "Quality First",
      color: "from-amber-500/20 to-orange-500/10",
      iconColor: "text-amber-500",
    },
    {
      icon: Scale,
      title: "Side-by-Side Product Comparison",
      description:
        "We believe in 100% purchasing clarity. Our multi-attribute comparison matrix lets buyers evaluate specs, pricing, ratings, and stock levels before making a decision.",
      badge: "Clarity & Choice",
      color: "from-purple-500/20 to-indigo-500/10",
      iconColor: "text-purple-500",
    },
    {
      icon: Truck,
      title: "4-Stage Live Order Tracking",
      description:
        "No more guesswork. From the moment payment clears to packaging, shipping, and doorstep delivery, customers and vendors share a synchronized, real-time tracking timeline.",
      badge: "Full Transparency",
      color: "from-blue-500/20 to-cyan-500/10",
      iconColor: "text-blue-500",
    },
    {
      icon: Lock,
      title: "Zero-Trust Payment Security",
      description:
        "All calculations, coupon deductions, and inventory locks are verified server-side against PostgreSQL records with SSLCommerz gateway integration to guarantee zero price tampering.",
      badge: "Bank-Grade Safety",
      color: "from-emerald-500/20 to-teal-500/10",
      iconColor: "text-emerald-500",
    },
  ];

  const techHighlights = [
    { title: "React 18 & TypeScript", desc: "Type-safe, component-driven UI architecture" },
    { title: "Redux Toolkit & RTK Query", desc: "Predictable state & intelligent data caching" },
    { title: "Prisma ORM & PostgreSQL", desc: "Relational data modeling with atomic consistency" },
    { title: "Vite & Code Splitting", desc: "Dynamic chunk auto-recovery and rapid load speeds" },
  ];

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#141312] text-[#F9F5F0]" : "bg-[#F9F5F0] text-[#3D352F]"}`}>
      {/* Hero Banner Section */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#A66B55]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#E9C46A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest animate-in fade-in">
            <Sparkles size={14} />
            <span>The Modern Multi-Vendor Commerce Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
            Redefining E-Commerce with <br />
            <span className="text-primary">Integrity, Precision & Choice</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600 dark:text-zinc-300 leading-relaxed">
            Amar Shop is an engineered marketplace that connects discerning shoppers with vetted merchant stores through transparent comparison tools, smart recommendations, and end-to-end order telemetry.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link
              to="/products"
              className="btn btn-primary rounded-full px-8 btn-md text-sm font-semibold shadow-lg shadow-primary/25 gap-2 hover:scale-105 transition-transform"
            >
              <ShoppingBag size={18} />
              <span>Explore Marketplace</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/auth/register"
              className="btn btn-outline rounded-full px-6 btn-md text-sm font-semibold gap-2 hover:bg-base-200"
            >
              <Store size={18} />
              <span>Become a Vendor</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="container mx-auto px-4 -mt-6 sm:-mt-10 mb-16 relative z-10">
        <div
          className={`rounded-3xl border p-6 sm:p-8 shadow-sm ${
            isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-base-200">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
                  idx > 0 ? "pt-6 sm:pt-0 sm:pl-6 lg:pl-8" : ""
                }`}
              >
                <div className="text-2xl sm:text-4xl font-extrabold text-primary tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs font-bold text-base-content mt-1">{item.label}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission & Philosophy Section */}
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <Zap size={14} />
              <span>Our Core Philosophy</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Bridging Authentic Merchants with Conscious Shoppers
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
              Traditional e-commerce platforms often flood consumers with duplicate listings, hidden fees, and unreliable delivery dates. We built Amar Shop to eliminate that friction.
            </p>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
              By enforcing single-vendor cart clarity, verifying store identities, and giving shoppers interactive comparison matrices, we put total purchasing confidence back in the buyer's hands.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs font-semibold">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>100% Genuine Products</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Real-Time Stock Counters</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Transparent Delivery Milestones</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Encrypted Payment Pipelines</span>
              </div>
            </div>
          </div>

          {/* Interactive Visual Card */}
          <div
            className={`p-8 rounded-3xl border shadow-sm space-y-6 relative overflow-hidden ${
              isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Amar Shop Quality Standard</h4>
                  <p className="text-[11px] text-gray-400">Strict merchant verification protocol</p>
                </div>
              </div>
              <span className="badge badge-primary badge-sm font-semibold">Verified</span>
            </div>

            <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed italic">
              "We believe that a great marketplace isn't just about the volume of items listed — it's about the trust earned through every single fulfilled order."
            </p>

            <div className="pt-4 border-t border-base-200 grid grid-cols-2 gap-4 text-center">
              <div className="p-3 rounded-2xl bg-base-200">
                <div className="text-lg font-bold text-primary">24 Hours</div>
                <div className="text-[10px] text-gray-400 font-semibold">Dispatch Window</div>
              </div>
              <div className="p-3 rounded-2xl bg-base-200">
                <div className="text-lg font-bold text-emerald-500">30 Days</div>
                <div className="text-[10px] text-gray-400 font-semibold">Return Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Pillars */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] ${
              isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
            }`}
          >
            Built Differently
          </p>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold">The Amar Shop Advantage</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((item, index) => (
            <div
              key={index}
              className={`p-7 rounded-3xl border shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md ${
                isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-base-200 ${item.iconColor}`}>
                    <item.icon size={22} />
                  </div>
                  <span className="badge badge-sm font-semibold bg-base-200 text-[10px] uppercase">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Excellence Section */}
      <section
        className={`py-16 border-y ${
          isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
        }`}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                <Cpu size={14} />
                <span>Architecture & Engineering</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">Enterprise-Grade Tech Stack</h2>
            </div>
            <span className="badge badge-primary badge-sm font-semibold">100% Type-Safe Architecture</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techHighlights.map((tech, i) => (
              <div key={i} className="p-5 rounded-2xl bg-base-200 border border-base-300/40">
                <h4 className="font-bold text-sm mb-1">{tech.title}</h4>
                <p className="text-xs text-gray-500 dark:text-zinc-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="container mx-auto px-4 py-20 max-w-5xl">
        <div
          className={`rounded-3xl p-8 sm:p-12 border shadow-lg text-center space-y-6 relative overflow-hidden ${
            isDark
              ? "bg-gradient-to-r from-[#2A2421] via-[#1E1B1A] to-[#141312] border-white/10"
              : "bg-gradient-to-r from-[#F1EAE0] via-[#E8DED2] to-[#D4C3B3] border-base-200"
          }`}
        >
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Experience Better Shopping?
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
            Join thousands of satisfied customers and verified vendors in Bangladesh's most innovative multi-vendor marketplace today.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
            <Link
              to="/products"
              className="btn btn-primary rounded-full px-8 font-semibold shadow-md gap-2"
            >
              <ShoppingBag size={16} />
              <span>Start Exploring</span>
            </Link>
            <Link
              to="/contact"
              className="btn btn-outline rounded-full px-6 font-semibold"
            >
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
