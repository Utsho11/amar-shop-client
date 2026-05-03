import { Lock, Database, EyeOff, ShieldCheck } from "lucide-react";

const Privacy = () => {
  return (
    <section className="min-h-screen bg-base-100 px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-[#A66B55]/10 px-4 py-2 text-sm font-semibold text-[#A66B55]">
            Privacy First
          </span>
          <h1 className="mt-5 text-4xl font-bold">Privacy Policy</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base-content/70">
            We collect only the information needed to provide a smooth shopping
            experience.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Policy icon={<Database />} title="Data Collection" text="We may collect your name, email, phone number, order details, and delivery information." />
          <Policy icon={<ShieldCheck />} title="Data Protection" text="We use reasonable security measures to protect your personal information." />
          <Policy icon={<Lock />} title="Account Security" text="You are responsible for keeping your login information private and secure." />
          <Policy icon={<EyeOff />} title="No Unnecessary Sharing" text="We do not sell your personal information to third parties." />
        </div>
      </div>
    </section>
  );
};

const Policy = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
  <div className="rounded-3xl border border-base-300 bg-base-200 p-7 shadow-sm">
    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A66B55]/10 text-[#A66B55]">
      {icon}
    </div>
    <h2 className="text-xl font-bold">{title}</h2>
    <p className="mt-3 text-base-content/70">{text}</p>
  </div>
);

export default Privacy;