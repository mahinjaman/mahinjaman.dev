"use client";

import { useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";

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

  console.log(location.hash);

  return (
    <header
      className={`fixed w-full top-0 z-[9999] transition-colors duration-30 backdrop-blur-xl bg-orange-500/5 border-b border-orange-400/30`}
    >
      <nav className="mx-auto flex max-w-7xl relative items-center justify-between p-6 lg:px-8 z-50 bg-transparent">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <h1 className="text-2xl font-bold text-orange-400">Mahin Jaman</h1>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-white"
          >
            <IconMenu2 size={26} stroke={1.8} />
          </button>
        </div>

        {/* Desktop Menu + Social Icons */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-10">
          {/* Menu items */}
          <PopoverGroup className="flex gap-x-8">
            {menuData.map((item: IMenuItem) => (
              <a
                key={item.title}
                href={item.link ?? "#"}
                className="text-sm font-semibold text-white hover:text-orange-400 transition"
              >
                {item.title}
              </a>
            ))}
          </PopoverGroup>

          {/* Social Icons */}
          <div className="flex items-center gap-x-4 border-l border-white/10 pl-6">
            <a
              href="https://github.com/"
              target="_blank"
              className="text-gray-400 hover:text-white transition"
            >
              <IconBrandGithub size={22} stroke={1.8} />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              className="text-gray-400 hover:text-white transition"
            >
              <IconBrandLinkedin size={22} stroke={1.8} />
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              className="text-gray-400 hover:text-white transition"
            >
              <IconBrandFacebook size={22} stroke={1.8} />
            </a>
          </div>
        </div>
      </nav>


      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-gray-900 p-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-orange-400">Mahin Jaman</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-400"
            >
              <IconX size={26} />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {menuData.map((item: IMenuItem) => (
              <a
                key={item.title}
                href={item.link ?? "#"}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
              >
                {item.title}
              </a>
            ))}
          </div>

          {/* Mobile Social Icons */}
          <div className="mt-8 flex gap-x-5 border-t border-white/10 pt-6">
            <IconBrandGithub className="text-gray-400 hover:text-white" />
            <IconBrandLinkedin className="text-gray-400 hover:text-white" />
            <IconBrandFacebook className="text-gray-400 hover:text-white" />
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
