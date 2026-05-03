import { Truck, MapPin, Clock, ShieldCheck } from "lucide-react";

const Shipping = () => {
  return (
    <section className="min-h-screen bg-base-100 px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-base-300 bg-base-200 p-8 shadow-sm md:p-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#A66B55]/10 text-[#A66B55]">
            <Truck size={32} />
          </div>

          <h1 className="mt-6 text-4xl font-bold">Shipping Policy</h1>
          <p className="mt-4 max-w-2xl text-base-content/70">
            We work to deliver orders safely and quickly across supported areas.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Info icon={<Clock />} title="Delivery Time" value="3-7 business days" />
          <Info icon={<MapPin />} title="Coverage" value="Available locations only" />
          <Info icon={<ShieldCheck />} title="Safe Delivery" value="Packed and handled carefully" />
        </div>

        <div className="mt-8 rounded-3xl bg-[#A66B55] p-8 text-white">
          <h2 className="text-2xl font-bold">Shipping Notes</h2>
          <p className="mt-4 text-white/80">
            Shipping charges may vary depending on product size, shop location,
            and delivery address. Customers can check order updates from their
            dashboard.
          </p>
        </div>
      </div>
    </section>
  );
};

const Info = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => (
  <div className="rounded-3xl border border-base-300 bg-base-200 p-6">
    <div className="text-[#A66B55]">{icon}</div>
    <p className="mt-4 text-sm text-base-content/60">{title}</p>
    <h3 className="mt-1 text-xl font-bold">{value}</h3>
  </div>
);

export default Shipping;