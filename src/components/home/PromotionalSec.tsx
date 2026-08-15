import { Link } from "react-router-dom";

const promoCards = [
  {
    id: "f3b336e2-a471-4f90-a7ef-ac4dbef2ebc7",
    title: "Immersive Audio",
    description:
      "Experience sound like never before with our premium headset collection.",
    button: "Shop Now",
    image: "https://res.cloudinary.com/dedov7ch9/image/upload/v1777821979/AmarShop/k5t56zo7s9-1777821978960-files-headphone.jpg",
  },
  {
    id: "df64b5e5-439e-4853-aebc-9d2c578afca1",
    title: "New Collection",
    description: "Soft cotton oversized t-shirt offering ultimate comfort and a trendy street-style look.",
    button: "Explore More",
    image: "https://res.cloudinary.com/dedov7ch9/image/upload/v1777818988/AmarShop/e9zc7uau2wp-1777818988410-files-Casual%20Oversized%20T-Shirt.jpg",
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

