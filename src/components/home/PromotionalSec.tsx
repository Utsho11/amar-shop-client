import { Link } from "react-router-dom";
import { ArrowRight, Tag } from "lucide-react";

const promoCards = [
  {
    id: "f3b336e2-a471-4f90-a7ef-ac4dbef2ebc7",
    badge: "Spotlight Deal",
    title: "Immersive Studio Audio",
    description:
      "Experience high-fidelity sound, active noise cancellation, and ergonomic acoustics.",
    button: "Shop Now",
    image: "https://res.cloudinary.com/dedov7ch9/image/upload/v1777821979/AmarShop/k5t56zo7s9-1777821978960-files-headphone.jpg",
  },
  {
    id: "df64b5e5-439e-4853-aebc-9d2c578afca1",
    badge: "Seasonal Trend",
    title: "Artisan Apparel Line",
    description: "Breathable natural cotton oversized silhouettes offering ultimate comfort and street style.",
    button: "Explore More",
    image: "https://res.cloudinary.com/dedov7ch9/image/upload/v1777818988/AmarShop/e9zc7uau2wp-1777818988410-files-Casual%20Oversized%20T-Shirt.jpg",
  },
];

const PromoBanner = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid gap-6 md:grid-cols-2">
        {promoCards.map((card) => (
          <div
            key={card.title}
            className="group relative h-[320px] sm:h-[360px] overflow-hidden rounded-3xl border border-base-200 shadow-md"
          >
            <img
              src={card.image}
              alt={card.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* High-contrast gradient overlay for WCAG compliance */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />

            <div className="absolute bottom-6 left-6 right-6 max-w-md text-white">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider mb-2.5">
                <Tag size={12} />
                <span>{card.badge}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                {card.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/90 line-clamp-2">
                {card.description}
              </p>

              <div className="mt-4">
                <Link
                  to={`/products/${card.id}`}
                  className="btn btn-sm sm:btn-md rounded-full bg-white text-zinc-900 hover:bg-white/90 border-none font-semibold px-6 shadow-md inline-flex items-center gap-2 transition-transform hover:scale-105"
                >
                  <span>{card.button}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoBanner;
