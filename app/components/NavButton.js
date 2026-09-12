"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function NavButton({ href, label, icon }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
        isActive
          ? " bg-teal-600 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
      }`}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
}