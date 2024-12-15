const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          About Us
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to <span className="font-semibold">AmarShop</span>, your go-to
          e-commerce destination for all your shopping needs. At AmarShop, we
          aim to provide an exceptional online shopping experience, offering a
          wide range of products at competitive prices.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Whether you're looking for the latest gadgets, fashionable clothing,
          or everyday essentials, we have it all under one roof. Our platform is
          designed to be user-friendly, ensuring that you can find what you're
          looking for quickly and easily.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          About the Developer
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Hi, I'm <span className="font-semibold">Utsho Roy</span>, the
          developer behind AmarShop. My passion for technology and innovation
          drives me to create solutions that enhance everyday life. With
          AmarShop, my goal is to bring convenience and quality to your shopping
          experience.
        </p>
        <p className="text-lg text-gray-700">
          Thank you for choosing AmarShop. Your trust and satisfaction are our
          top priorities, and we're committed to making your online shopping
          journey seamless and enjoyable.
        </p>
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
