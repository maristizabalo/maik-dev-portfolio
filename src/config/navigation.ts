export type NavItem = {
  id: string;
  labelKey: string;
  href: string;
};

export const navItems: NavItem[] = [
  { id: "stack", labelKey: "stack", href: "/stack" },
  { id: "experience", labelKey: "experience", href: "/experience" },
  { id: "projects", labelKey: "work", href: "/work" },
  { id: "architecture", labelKey: "architecture", href: "/architecture" },
  { id: "ai", labelKey: "ai", href: "/ai" },
  { id: "contact", labelKey: "contact", href: "/contact" },
];

export const footerNav: NavItem[] = [
  { id: "stack", labelKey: "stack", href: "/stack" },
  { id: "experience", labelKey: "experience", href: "/experience" },
  { id: "projects", labelKey: "work", href: "/work" },
  { id: "architecture", labelKey: "architecture", href: "/architecture" },
  { id: "ai", labelKey: "ai", href: "/ai" },
  { id: "services", labelKey: "services", href: "/services" },
  { id: "certifications", labelKey: "certifications", href: "/certifications" },
  { id: "contact", labelKey: "contact", href: "/contact" },
];
