"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="opacity-80 hover:opacity-100 transition-opacity text-[#eb4141]"
    >
      <LogOut size={20} />
    </button>
  );
}

export default LogoutButton;
