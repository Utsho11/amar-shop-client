import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setShowAlert(true);

    e.currentTarget.reset();

    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <section className="min-h-screen bg-base-100 px-4 py-16">
      {/* Toast */}
      {showAlert && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-success shadow-lg">
            <span>Message sent successfully 🎉</span>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE - INFO */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Let’s Talk 👋</h1>
          <p className="text-base-content/70 max-w-md">
            Have questions or need support? Reach out to us and we’ll get back
            to you as soon as possible.
          </p>

          <div className="space-y-4">
            <ContactItem icon={<Mail />} text="support@amarshop.com" />
            <ContactItem icon={<Phone />} text="+880 1234-567890" />
            <ContactItem icon={<MapPin />} text="Dhaka, Bangladesh" />
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="card bg-base-200 border border-base-300 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl">Send a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered w-full"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input input-bordered w-full"
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                className="input input-bordered w-full"
              />

              <textarea
                placeholder="Write your message..."
                className="textarea textarea-bordered w-full min-h-32"
              />

              <button
                className="btn bg-[#A66B55] text-white w-full rounded-full"
                type="submit"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-base-200 border border-base-300">
      <div className="p-3 rounded-xl bg-[#A66B55]/10 text-[#A66B55]">
        {icon}
      </div>
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default Contact;
