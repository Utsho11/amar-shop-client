const faqs = [
  {
    question: "What is AmarShop?",
    answer:
      "AmarShop is an online marketplace where customers can browse products, order items, and connect with trusted shops.",
  },
  {
    question: "How can I place an order?",
    answer:
      "Go to the products page, add your desired items to the cart, and complete the checkout process.",
  },
  {
    question: "Can vendors create their own shop?",
    answer:
      "Yes. Vendors can register, create a shop, add products, and manage orders from their dashboard.",
  },
  {
    question: "How can I track my orders?",
    answer:
      "After logging in as a customer, go to your dashboard and open the My Order section.",
  },
  {
    question: "Can I review a product?",
    answer:
      "Yes. After purchasing a product, you can review it from the To Review section.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can contact support through the Contact page or email us directly at support@amarshop.com.",
  },
];

const FAQ = () => {
  return (
    <section className="min-h-screen bg-base-100 px-4 py-16 text-base-content">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <p className="font-semibold text-primary">FAQ</p>
          <h1 className="mt-2 text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base-content/70">
            Find answers to the most common questions about AmarShop.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow border border-base-300 bg-base-200"
            >
              <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
              <div className="collapse-title text-lg font-semibold">
                {faq.question}
              </div>
              <div className="collapse-content text-base-content/70">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;