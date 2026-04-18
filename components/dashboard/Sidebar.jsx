"use client";
import { useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Image as image_icon, TestTube2, History, Plus } from "lucide-react";

function Sidebar() {
  const pathname = usePathname();

  const { data: session, status } = useSession();

  if (status === "loading") return <p>Syncing...</p>;

  const navItems = [
    { name: "Gallery", href: "/dashboard", icon: image_icon },
    { name: "Analyze", href: "/dashboard/analyze", icon: TestTube2 },
    { name: "History", href: "/dashboard/history", icon: History },
  ];
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-700/30 bg-[#060e20]/60 px-4 py-8 backdrop-blur-xl shadow-2xl">
      <div className="mb-10 px-2">
        <span className="block uppercase text-xl font-bold tracking-widest text-blue-100 font-headline">
          Verifai
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500">
          Precision Lab
        </span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                isActive
                  ? "bg-[#357df1]/10 text-[#adc6ff] border-r-2 border-[#357df1] font-bold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 font-medium"
              }`}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 2}
                className={
                  isActive
                    ? "text-[#adc6ff]"
                    : "group-hover:scale-110 transition-transform"
                }
              />
              <span className="text-sm tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-2 space-y-8">
        {pathname !== "/dashboard/analyze" && (
          <Link
            href={"/dashboard/analyze"}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-br from-[#adc6ff] to-[#357df1] py-3 px-4 font-bold text-[#002e6a] shadow-lg shadow-blue-500/10 hover:opacity-90 transition-all active:scale-95"
          >
            <Plus size={18} strokeWidth={3} />
            <span className="text-xs uppercase tracking-widest">
              New Analysis
            </span>
          </Link>
        )}

        <div className="flex items-center gap-3 border-t border-slate-700/30 pt-6">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-[#171f33] border border-white/5">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMPEP2AkSBO7zbNp5NekMAphIDGmTomKyCMGS23xOLwex9yKdVwd0oeQJcvwdQKO_A-yj14329FU3REJF68hfTWXJVHHqhM83x9XhSX4m-lZoLlmEhW_cnfa1w-04ZNaSOpyV6Zzp6jG5fbprZimKyXYPsdNDppjA6BzQK4uvXgrzQzONsZphRlkPbO9IwQAVx4Z3HRy0n_NJE_2oaiNDKkLpUN7pCn_DZhhN4pBB0X0x9k_h8aF2O_i9cs_WlJ5F8rdxECen2jP0"
              alt="Profile"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white capitalize">
              {session?.user?.first_name} {session?.user?.last_name}
            </span>
            <span className="text-sm tracking-tighter text-slate-500 font-semibold">
              {session?.user?.username}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
