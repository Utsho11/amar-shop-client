import { RotateCcw, CheckCircle, Clock, Package } from "lucide-react";

const Returns = () => {
  return (
    <section className="min-h-screen bg-base-100 px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] bg-[#A66B55] px-8 py-14 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
            AmarShop Policy
          </p>
          <h1 className="mt-3 text-4xl font-bold">Returns & Refunds</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Simple return and refund support for a safer shopping experience.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Card icon={<RotateCcw />} title="7 Days Return" text="Request a return within 7 days after receiving your product." />
          <Card icon={<Clock />} title="Fast Refund" text="Approved refunds are processed within 5-7 business days." />
          <Card icon={<Package />} title="Original Condition" text="Items must be unused and returned with original packaging." />
        </div>

        <div className="mt-8 rounded-3xl border border-base-300 bg-base-200 p-8">
          <h2 className="text-2xl font-bold text-[#A66B55]">Return Conditions</h2>
          <ul className="mt-5 space-y-3 text-base-content/70">
            <li className="flex gap-3"><CheckCircle className="text-[#A66B55]" /> Product must not be damaged by the customer.</li>
            <li className="flex gap-3"><CheckCircle className="text-[#A66B55]" /> Original invoice or order confirmation is required.</li>
            <li className="flex gap-3"><CheckCircle className="text-[#A66B55]" /> Refund time may vary depending on payment method.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

const Card = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
  <div className="rounded-3xl border border-base-300 bg-base-200 p-6 shadow-sm">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A66B55]/10 text-[#A66B55]">
      {icon}
    </div>
    <h3 className="font-bold">{title}</h3>
    <p className="mt-2 text-sm text-base-content/70">{text}</p>
  </div>
);

export default Returns;