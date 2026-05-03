import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiOutlinePaperAirplane } from "react-icons/hi";

const Footer = () => {
  const quickLinks = [
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ];

  const supportLinks = [
    { label: "Returns & Refunds", href: "/returns" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ];

  const socials = [
    { icon: <FaFacebookF />, href: "/", label: "Facebook" },
    { icon: <FaTwitter />, href: "/", label: "Twitter" },
    { icon: <FaInstagram />, href: "/", label: "Instagram" },
    { icon: <FaLinkedinIn />, href: "/", label: "LinkedIn" },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#111315] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <h2 className="text-2xl font-bold text-white">AmarShop</h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              A simple and reliable marketplace for quality products, trusted
              shops, and smooth shopping experiences.
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 transition hover:border-[#A66B55]/50 hover:bg-[#e9c46a]/10 hover:text-[#e9c46a]"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-4">
            <FooterLinks title="Explore" links={quickLinks} />
            <FooterLinks title="Support" links={supportLinks} />
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Newsletter
            </h3>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Get updates about new products, offers, and shop announcements.
            </p>

            <form className="mt-5 flex overflow-hidden rounded-full border border-white/10 bg-white/5 p-1">
              <input
                type="email"
                placeholder="Email address"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-gray-500"
              />

              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A66B55] text-black transition hover:bg-[#d4a23a]"
                aria-label="Subscribe"
              >
                <HiOutlinePaperAirplane size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AmarShop. All rights reserved.</p>

          <p>Built for secure and seamless shopping.</p>
        </div>
      </div>
    </footer>
  );
};

const FooterLinks = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) => {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
        {title}
      </h3>

      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-gray-400 transition hover:text-[#e9c46a]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;