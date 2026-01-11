
import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-transparent text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center space-y-4">
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Blog</a>
          <a href="#" className="hover:text-white transition-colors">Jobs</a>
          <a href="#" className="hover:text-white transition-colors">Press</a>
          <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          <a href="#" className="hover:text-white transition-colors">Partners</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 mt-2 text-gray-400">
          <a href="#" className="hover:text-white transition-colors"><FaFacebookF size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><FaInstagram size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><FaX size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><FaGithub size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><FaYoutube size={20} /></a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 mt-4">
          © 2024 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
