import { createClient } from "@/lib/supabase/server";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
export default async function Layout({children}
){
     const supabase = await createClient();
    
      const {
        data: { user },
      } = await supabase.auth.getUser();
 if (!user) {
    redirect("/login");
  }
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar Server Component */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Server Component */}
        <Header user={user} />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}