import type { IMenuItem } from "../../types";

// Hash links are prefixed with "/" so they navigate home and then scroll,
// working from any route (e.g. while reading a blog post).
export const menuData: IMenuItem[] = [
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Education",
    link: "/#education",
  },
  {
    title: "Skills",
    link: "/#skills",
  },
  {
    title: "Experience",
    link: "/#experience",
  },
  {
    title: "Projects",
    link: "/#projects",
  },
  {
    title: "Blog",
    link: "/blog",
    route: true,
  },
  {
    title: "Contact",
    link: "/#contact",
  },
];
