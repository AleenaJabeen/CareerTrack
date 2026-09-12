import NavButton from "./NavButton";
import { 
  LayoutDashboard, 
  Briefcase, 
  Settings 
} from "lucide-react"; // npm install lucide-react (or use your own icons)

export default function Sidebar() {
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { href: "/dashboard/applications", label: "Job Applications", icon: <Briefcase size={20} /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-screen flex flex-col p-4">
      <div className="flex items-center gap-2 px-2 py-4 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600 text-white font-mono text-sm">
              CT
            </span>
            <span>CareerTrack</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavButton
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </nav>
    </aside>
  );
}