import { Ghost, Hand } from "lucide-react";
import LogoutButton from "./LogoutButton";


export default async function Header({user}) {
  
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between w-full">
       <div className="flex items-center gap-4">

      {/* <div className="w-9 h-9 rounded-full  bg-teal-600  flex items-center justify-center text-slate-700 dark:text-slate-200 font-semibold border">
          {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
        </div> */}
        <div className="text-right py-3">
          <p className="flex items-center justify-center gap-3 text-lg font-bold text-white dark:text-slate-200">
           <Ghost  className="text-yellow-400  text-lg font-bold" /> Welcome to CareerTrack
          </p>
        </div>
        </div>

      <div className="flex items-end gap-4">
        
<LogoutButton/>
       
      </div>
      
    </header>
  );
}