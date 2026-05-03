import { Link } from "react-router-dom";

const promoCards = [
  {
    id: "d3d0cc6c-11e0-4ed6-b374-6ece5f14e2c2",
    title: "Immersive Audio",
    description:
      "Experience sound like never before with our premium headset collection.",
    button: "Shop Now",
    image: "/Headphone.webp",
  },
  {
    id: "e6c024db-dc6e-49a8-ba82-de1144388415",
    title: "New Collection",
    description: "Step into the new season with our latest footwear drop.",
    button: "Explore More",
    image: "/shoe.png",
  },
];

const PromoBanner = () => {
  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
        {promoCards.map((card) => (
          <div
            key={card.title}
            className="group relative h-[300px] overflow-hidden rounded-2xl"
          >
            <img
              src={card.image}
              alt={card.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent" />

            <div className="absolute bottom-8 left-8 max-w-sm text-white">
              <h3 className="text-xl font-medium">{card.title}</h3>

              <p className="mt-3 text-sm leading-6 text-white/80">
                {card.description}
              </p>

              <button className="btn mt-5 rounded-full border-none bg-white px-7 text-sm text-black hover:bg-[#F1EAE0]">
                <Link to={`/products/${card.id}`}>{card.button}</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoBanner;

