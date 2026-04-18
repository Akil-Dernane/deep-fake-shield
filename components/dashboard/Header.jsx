import { User } from "lucide-react";
import LogoutButton from "./Logout";

function Header() {
  return (
    <header className="fixed top-0 right-0 z-40 flex h-16 w-[calc(100%-16rem)] items-center justify-between bg-[#0b1326]/80 px-8 backdrop-blur-md font-headline">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <span className="uppercase text-sm font-black text-white tracking-[0.2em]">
          Verifai
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 text-[#adc6ff]">
        {/* Profile */}
        <button className="opacity-80 hover:opacity-100 transition-opacity">
          <User size={20} />
        </button>

        {/* Logout */}
        <LogoutButton />
      </div>

      {/* bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-800/50 to-transparent"></div>
    </header>
  );
}

export default Header;
