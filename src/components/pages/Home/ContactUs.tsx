import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { IconBrandWhatsapp } from "@tabler/icons-react";
interface IMailData {
  subject: string;
  returnMail: string;
  message: string;
}

const ContactUs = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"IDLE" | "SUCCESS" | "ERROR">("IDLE");

  const contactDetails = [
    { label: "OPERATOR", value: "Mahin Jaman" },
    { label: "LOCATION", value: "Mohammadpur, Dhaka, BD" },
    { label: "COMM_LINK", value: "+880 1644-448473" },
    { label: "DIRECT_MAIL", value: "mahinjaman01@gmail.com" },
    { label: "ENCRYPTED_WP", value: "Active on Main Link" },
  ];

  const [mailData, setMailData] = useState<IMailData>({
    message: "",
    returnMail: "",
    subject: "",
  });

  const sendMail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("IDLE");

    const serviceID = import.meta.env.VITE_SERVICE_ID;
    const templateID = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    const templateParams = {
      from_name: mailData.returnMail,
      to_name: "Mahin Jaman",
      subject: mailData.subject,
      message: mailData.message,
      reply_to: mailData.returnMail,
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey).then(
      () => {
        setLoading(false);
        setStatus("SUCCESS");
        setMailData({ message: "", returnMail: "", subject: "" });
        if (formRef.current) formRef.current.reset();
      },
      (error) => {
        setLoading(false);
        setStatus("ERROR");
        console.error("FAILED...", error.text);
      }
    );
  };
  return (
    <section
      id="contact"
      className="py-24 bg-transparent text-white font-mono relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div>
            <p className="text-orange-500 uppercase tracking-[0.4em] text-[10px] mb-2 font-bold">
              Establish Connection
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
              Contact <span className="text-orange-500">Uplink</span>
            </h2>
          </div>

          <div className="space-y-5 border-l-2 border-orange-500/20 pl-6">
            {contactDetails.map((detail, index) => (
              <div key={index} className="group">
                <p className="text-[10px] text-gray-500 tracking-widest uppercase mb-1 font-bold">
                  {detail.label}
                </p>
                <p className="text-lg font-bold group-hover:text-orange-500 transition-colors break-words">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="https://wa.me/8801644448473"
              target="_blank"
              rel="noreferrer"
              className="relative group px-8 py-3 overflow-hidden flex items-center gap-2 bg-orange-500/5 transition-all"
            >
              {/* TOP BORDER ANIMATION */}
              <motion.span
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"
              />

              {/* RIGHT BORDER ANIMATION */}
              <motion.span
                initial={{ y: "-100%" }}
                animate={{ y: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear",
                  delay: 0.75,
                }}
                className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-orange-500 to-transparent"
              />

              {/* BOTTOM BORDER ANIMATION */}
              <motion.span
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"
              />

              {/* LEFT BORDER ANIMATION */}
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: "-100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear",
                  delay: 0.75,
                }}
                className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-orange-500 to-transparent"
              />

              {/* Static subtle border for structure */}
              <div className="absolute inset-0 border border-white/5 group-hover:border-orange-500/20 transition-colors"></div>

              {/* Content */}
              <IconBrandWhatsapp
                size={18}
                className="text-gray-400 group-hover:text-green-500 transition-colors z-10"
              />
              <span className="text-gray-400 group-hover:text-white font-bold text-[10px] tracking-[0.2em] transition-colors z-10">
                WP_CONNECT
              </span>
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE: INTERACTIVE FORM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Decorative Frame */}
          <div className="absolute -inset-4 border border-orange-500/10 rounded-xl pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500 opacity-50"></div>

          <form className="bg-black/40 backdrop-blur-xl p-8 rounded-lg border border-white/5 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] text-orange-500 font-bold tracking-widest uppercase italic">
                  Subject_Identifer
                </label>
                <input
                  type="text"
                  placeholder="e.g. Project Inquiry"
                  className="w-full bg-white/5 border border-white/10 p-3 rounded-sm focus:outline-none focus:border-orange-500 transition-colors text-sm"
                  onChange={(e) =>
                    setMailData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-orange-500 font-bold tracking-widest uppercase italic">
                  Return_Signal_Mail
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 p-3 rounded-sm focus:outline-none focus:border-orange-500 transition-colors text-sm"
                  onChange={(e) =>
                    setMailData((prev) => ({
                      ...prev,
                      returnMail: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-orange-500 font-bold tracking-widest uppercase italic">
                  Message_Data_Payload
                </label>
                <textarea
                  placeholder="Type your transmission..."
                  className="w-full bg-white/5 border border-white/10 p-3 rounded-sm focus:outline-none focus:border-orange-500 transition-colors text-sm"
                  onChange={(e) =>
                    setMailData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full py-4 bg-orange-500 text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-orange-400 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
              onClick={sendMail}
            >
              {loading ? (
                <span className="animate-spin text-lg">⚙</span>
              ) : (
                <span className="animate-pulse">▶</span>
              )}
              {loading ? "TRANSMITTING..." : "EXECUTE_TRANSMISSION"}
            </button>

            {/* Status Messages */}
            {status === "SUCCESS" && (
              <p className="text-[10px] text-green-500 font-bold tracking-widest text-center animate-pulse">
                DATA_DELIVERED_SUCCESSFULLY
              </p>
            )}
            {status === "ERROR" && (
              <p className="text-[10px] text-red-500 font-bold tracking-widest text-center animate-pulse">
                CONNECTION_FAILED_RETRY_LATER
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
