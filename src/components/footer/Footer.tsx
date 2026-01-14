import { motion } from "framer-motion";
import { 
  FaGithub, 
  FaLinkedinIn, 
  FaFacebookF, 
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: "GitHub", 
      icon: <FaGithub />, 
      url: "https://github.com/mahinjaman",
      color: "hover:text-[#f0f6fc] hover:border-[#f0f6fc]"
    },
    { 
      name: "LinkedIn", 
      icon: <FaLinkedinIn />, 
      url: "https://linkedin.com/in/mahin-jaman",
      color: "hover:text-[#0077b5] hover:border-[#0077b5]"
    },
    { 
      name: "Facebook", 
      icon: <FaFacebookF />, 
      url: "https://facebook.com/mahinjaman01",
      color: "hover:text-[#1877f2] hover:border-[#1877f2]"
    },
    { 
      name: "WhatsApp", 
      icon: <FaWhatsapp />, 
      url: "https://wa.me/8801644448473",
      color: "hover:text-[#25d366] hover:border-[#25d366]"
    }
  ];

  return (
    <footer className="relative py-16 px-6 border-t border-white/5 bg-transparent text-white font-mono overflow-hidden">
      
      {/* Top HUD Line Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
        
        {/* IDENTITY SECTION */}
        <div className="text-center space-y-3">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-black tracking-tighter uppercase"
          >
            Mahin <span className="text-orange-500">Jaman</span>
          </motion.h3>
          <p className="text-[10px] text-gray-500 tracking-[0.4em] uppercase">
            Full Stack Web Developer
          </p>
        </div>

        {/* SOCIAL ICONS GRID */}
        <div className="flex gap-5">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -5 }}
              className={`w-12 h-12 flex items-center justify-center border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm text-xl transition-all duration-300 ${social.color} hover:shadow-[0_0_15px_currentColor]`}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {/* BOTTOM METADATA */}
        <div className="w-full pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">
              Uplink Stable
            </span>
          </div>

          <p className="text-[10px] text-gray-600 uppercase tracking-widest">
            © {currentYear} Mahin_Jaman
          </p>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex flex-col items-center gap-1"
          >
            <span className="text-[9px] text-orange-500 font-bold tracking-tighter uppercase group-hover:animate-bounce">Top</span>
            <div className="w-4 h-[1px] bg-orange-500/50"></div>
          </button>
        </div>

      </div>

      {/* Aesthetic Corners */}
      <div className="absolute bottom-0 left-0 p-4 opacity-10">
        <div className="w-10 h-10 border-b-2 border-l-2 border-white"></div>
      </div>
      <div className="absolute bottom-0 right-0 p-4 opacity-10">
        <div className="w-10 h-10 border-b-2 border-r-2 border-white"></div>
      </div>
      
    </footer>
  );
};

export default Footer;