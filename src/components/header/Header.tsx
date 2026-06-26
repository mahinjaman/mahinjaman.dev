"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import {
  IconMenu2,
  IconX,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandFacebook,
} from "@tabler/icons-react";

import { menuData } from "../../app/data/MenuData";
import type { IMenuItem } from "../../types";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-[9999] transition-all duration-500 font-mono ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-orange-500/30 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* LOGO */}
        <div className="flex lg:flex-1 items-center gap-2 group">
          <Link to="/" className="overflow-hidden">
            <h1 className="text-xl font-black text-white tracking-tighter uppercase px-1">
              Mahin <span className="text-orange-500 italic">Jaman</span>
            </h1>
            <div className="h-[1px] w-0 bg-orange-500 group-hover:w-full transition-all duration-500"></div>
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 border border-orange-500/20 rounded-sm text-orange-500 bg-orange-500/5 hover:bg-orange-500 hover:text-black transition-all"
          >
            <IconMenu2 size={24} />
          </button>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-12">
          <PopoverGroup className="flex gap-x-8">
            {menuData.map((item: IMenuItem) => {
              const linkClass =
                "relative text-[11px] font-bold text-gray-400 hover:text-orange-500 transition uppercase tracking-[0.2em] group";
              const inner = (
                <>
                  <span className="opacity-0 group-hover:opacity-100 mr-1 transition-opacity text-orange-500">
                    [
                  </span>
                  {item.title}
                  <span className="opacity-0 group-hover:opacity-100 ml-1 transition-opacity text-orange-500">
                    ]
                  </span>
                </>
              );
              return item.route ? (
                <Link key={item.title} to={item.link} className={linkClass}>
                  {inner}
                </Link>
              ) : (
                <a key={item.title} href={item.link ?? "#"} className={linkClass}>
                  {inner}
                </a>
              );
            })}
          </PopoverGroup>

          {/* SOCIAL UPLINKS */}
          <div className="flex items-center gap-x-5 border-l border-white/10 pl-8">
            {[
              {
                icon: <IconBrandGithub size={20} />,
                href: "https://github.com/mahinjaman",
              },
              {
                icon: <IconBrandLinkedin size={20} />,
                href: "https://www.linkedin.com/in/mahin-jaman",
              },
              {
                icon: <IconBrandFacebook size={20} />,
                href: "https://facebook.com/mahinjaman01",
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                className="text-gray-500 hover:text-orange-500 hover:scale-110 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* MOBILE HUD MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Dialog
            static
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            className="relative z-[10001] lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              aria-hidden="true"
            />

            <div className="fixed inset-y-0 right-0 w-full max-w-xs flex">
              <DialogPanel
                as={motion.div}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className="relative ml-auto h-full w-full bg-[#0a0a0a] border-l border-orange-500/30 p-8 font-mono shadow-2xl"
              >
                {/* Close Button & Header */}
                <div className="flex items-center justify-between mb-12">
                  <div className="text-[10px] text-orange-500 font-bold tracking-[.3em]">
                    SYSTEM_MENU
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 border border-orange-500/20 text-orange-500 hover:bg-orange-500/10 transition-colors"
                  >
                    <IconX size={24} />
                  </button>
                </div>

                {/* Menu Links */}
                <div className="space-y-6">
                  {menuData.map((item: IMenuItem) => {
                    const label = (
                      <div className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors uppercase tracking-tighter">
                        {item.title}
                      </div>
                    );
                    return item.route ? (
                      <Link
                        key={item.title}
                        to={item.link}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block group"
                      >
                        {label}
                      </Link>
                    ) : (
                      <a
                        key={item.title}
                        href={item.link ?? "#"}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block group"
                      >
                        {label}
                      </a>
                    );
                  })}
                </div>

                {/* Mobile Footer */}
                <div className="absolute bottom-10 left-8 right-8">
                  <div className="h-[1px] bg-white/10 mb-6"></div>
                  <div className="flex justify-between items-center text-gray-500">
                    <div className="flex gap-4">
                      <a href="https://github.com/mahinjaman" target="_blank">
                        <IconBrandGithub
                          size={20}
                          className="hover:text-orange-500 transition-colors"
                        />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/mahin-jaman"
                        target="_blank"
                      >
                        <IconBrandLinkedin
                          size={20}
                          className="hover:text-orange-500 transition-colors"
                        />
                      </a>
                      <a
                        href="https://facebook.com/mahinjaman01"
                        target="_blank"
                      >
                        <IconBrandFacebook
                          size={20}
                          className="hover:text-orange-500 transition-colors"
                        />
                      </a>
                    </div>
                    <div className="text-[8px] tracking-widest uppercase opacity-40 italic font-bold">
                      Uplink_v2.4
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </header>
  );
}
