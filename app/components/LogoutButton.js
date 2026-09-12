"use client";

import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center justify-center  gap-2 rounded bg-red-500 px-4 py-2 text-white"
    >
      Logout
      <LogOut className="text-xs text-white font-bold" />
    </button>
  );
}