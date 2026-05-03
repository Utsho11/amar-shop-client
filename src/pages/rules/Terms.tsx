import { FileText, UserCheck, ShoppingBag, RefreshCcw } from "lucide-react";

const Terms = () => {
  const terms = [
    {
      icon: <UserCheck />,
      title: "User Responsibility",
      text: "Users must provide accurate information and keep their account secure.",
    },
    {
      icon: <ShoppingBag />,
      title: "Orders",
      text: "Orders depend on stock availability, vendor confirmation, and payment status.",
    },
    {
      icon: <RefreshCcw />,
      title: "Policy Updates",
      text: "AmarShop may update these terms when necessary to improve service quality.",
    },
  ];

  return (
    <section className="min-h-screen bg-base-100 px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#A66B55] to-[#6f3f30] p-10 text-white">
          <FileText size={42} />
          <h1 className="mt-5 text-4xl font-bold">Terms & Conditions</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            By using AmarShop, you agree to follow these simple terms and
            conditions.
          </p>
        </div>

        <div className="mt-8 space-y-5">
          {terms.map((item) => (
            <div
              key={item.title}
              className="flex gap-5 rounded-3xl border border-base-300 bg-base-200 p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#A66B55]/10 text-[#A66B55]">
                {item.icon}
              </div>

              <div>
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="mt-2 text-base-content/70">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Terms;
