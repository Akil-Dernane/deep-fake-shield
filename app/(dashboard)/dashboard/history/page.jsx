"use client";

import React from "react";
import {
  Calendar,
  Tag,
  LayoutGrid,
  List,
  BadgeCheck,
  Clock,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

/* ---------------- MOCK BACKEND RESPONSE ---------------- */

const apiResponse = {
  meta: {
    title: "Verified Assets",
    subtitle: "Archive Protocol",
    range: "Last 30 Days",
  },

  featured: {
    name: "Core_Asset_0192.tif",
    confidence: 99.8,
    status: "AUTHENTIC",
    date: "Oct 24, 2023 · 14:22 GMT",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbDwcxbYkjg6eTdcIhim0BJckgfmjip0Gk7j7LjnyeyXzxeuZiN6czIH88_F8yKAOmd4vWSVaI9K6GNWBT0iWMmEqOU1VuR15jwncEhpZTpDDy1O4aNENoOVFOuRl5PuS5KOUR_SQGLazKNx_XrnrDXNJaEdY1O_SZfPdmNKOHOvH282e2Mo-LPKzrFrf4LleW2SXy91VE1PB4SV7xZ-i_S88x7nA0cryRlXhkwXV6oy3NI7LUkQCkm8Z2XQ2cZQvp8_-lYMJVNw0",
  },

  gallery: [
    { id: 1, name: "Data_Node_Delta.png", date: "12.10.23", status: "REAL" },
    { id: 2, name: "Spectral_Flux.jpg", date: "14.10.23", status: "FAKE" },
    { id: 3, name: "Global_Map_V2.png", date: "18.10.23", status: "REAL" },
    { id: 4, name: "Logic_Void.tif", date: "20.10.23", status: "FAKE" },
    { id: 5, name: "Block_Chain_Relay.png", date: "21.10.23", status: "REAL" },
    { id: 6, name: "Biolum_Trace_04.jpg", date: "22.10.23", status: "REAL" },
  ],

  stats: {
    integrity: 100,
    verifiedCount: 2481,
  },

  pagination: {
    current: 1,
    totalPages: 3,
    displayed: "1–12",
  },
};

/* ---------------- PAGE ---------------- */

export default function HistoryPage() {
  const { meta, featured, gallery, stats, pagination } = apiResponse;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HEADER */}
      <section className="mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 rounded-2xl bg-[#131b2e] border border-white/5">
          <div className="space-y-1">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#adc6ff] uppercase">
              {meta.subtitle}
            </p>
            <h2 className="text-2xl font-headline font-extrabold text-white">
              {meta.title}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <FilterButton icon={<Calendar size={14} />} label={meta.range} />
            <FilterButton icon={<Tag size={14} />} label="Evidence Tags" />

            <div className="flex bg-[#060e20] p-1 rounded-xl border border-white/5">
              <button className="p-2 bg-[#2d3449] rounded-lg text-[#adc6ff]">
                <LayoutGrid size={16} />
              </button>
              <button className="p-2 text-slate-500">
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* FEATURED */}
        <div className="sm:col-span-2 sm:row-span-2 group relative overflow-hidden rounded-[2.5rem] bg-[#131b2e] border border-white/5">
          <Image
            fill
            alt="Featured Asset"
            className="object-cover opacity-70 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
            src={featured.image}
          />

          <div className="absolute top-6 left-6 px-4 py-1.5 bg-[#00a572]/90 text-[#00311f] text-[10px] font-black rounded-full flex items-center gap-2">
            <BadgeCheck size={14} />
            {featured.status}
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-linear-to-t from-[#0b1326] to-transparent">
            <div className="bg-[#2d3449]/60 backdrop-blur-xl p-6 rounded-2xl">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-white font-bold text-xl">
                    {featured.name}
                  </h3>
                  <p className="text-slate-400 text-[10px] flex items-center gap-2">
                    <Clock size={12} />
                    {featured.date}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[9px] text-[#adc6ff] uppercase">
                    Confidence
                  </p>
                  <p className="text-4xl font-black text-[#4edea3]">
                    {featured.confidence}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GALLERY */}
        {gallery.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}

        {/* STATS */}
        <div className="lg:col-span-2 p-10 rounded-[2.5rem] bg-[#131b2e] border border-white/5 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <ShieldCheck size={200} />
          </div>

          <div className="grid grid-cols-2 gap-10 relative z-10">
            <div>
              <p className="text-[10px] text-[#adc6ff] uppercase tracking-widest">
                Vault Integrity
              </p>
              <p className="text-5xl font-black text-white">
                {stats.integrity}%
              </p>
            </div>

            <div>
              <p className="text-[10px] text-[#adc6ff] uppercase tracking-widest">
                Verified Files
              </p>
              <p className="text-5xl font-black text-white">
                {stats.verifiedCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-16 flex items-center justify-between py-8 border-t border-white/5">
        <p className="text-[10px] text-slate-600 uppercase">
          Displaying {pagination.displayed} of {stats.verifiedCount} assets
        </p>

        <div className="flex items-center gap-2">
          <PaginationButton icon={<ChevronLeft size={16} />} />

          {[...Array(pagination.totalPages)].map((_, i) => (
            <PaginationButton
              key={i}
              label={i + 1}
              active={pagination.current === i + 1}
            />
          ))}

          <PaginationButton icon={<ChevronRight size={16} />} />
        </div>
      </footer>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function FilterButton({ icon, label }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#222a3d] rounded-xl text-[11px] font-bold text-[#c6c6cd] border border-white/5">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function GalleryCard({ item }) {
  const isFake = item.status === "FAKE";

  return (
    <div className="bg-[#131b2e] rounded-3xl overflow-hidden border border-white/5 relative h-64">
      <Image
        fill
        alt={item.name}
        className="object-cover opacity-50"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXDv7NTomBrOFIYwwZoL-YmJfqsdRweJgCEM2ND49e9VScw_q00pLWCsfgWRCLuLGMrxi_j1XJvsyr6pC-hxf6RtFhuVB_seKqSrL3G6qaOl8Vh7ykZjvCweenClhDNp_mEEbjaI0F_xdjl5JpusEu2mt03AlM2J2cHWxqRQdCGtyNZMyZiGvKFDDGLd_dTtkbowYH4QqxBWLZzgBq6pdZxgcPbvPbeoTgHPWYbZR7uNbEkZXXl3-cDpXT34aPf638PLCSybZx1G0"
      />

      <div
        className={`absolute top-3 left-3 px-2 py-1 text-[8px] font-black rounded-full uppercase ${
          isFake
            ? "bg-red-500/20 text-red-400"
            : "bg-[#00a572]/20 text-[#4edea3]"
        }`}
      >
        {item.status}
      </div>

      <div className="absolute bottom-0 p-4 w-full bg-[#2d3449]/80">
        <p className="text-xs text-white font-bold truncate">{item.name}</p>
        <p className="text-[9px] text-slate-400">{item.date}</p>
      </div>
    </div>
  );
}

function PaginationButton({ icon, label, active }) {
  return (
    <button
      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
        active ? "bg-[#adc6ff]/10 text-[#adc6ff]" : "text-slate-500"
      }`}
    >
      {icon || <span className="text-xs">{label}</span>}
    </button>
  );
}
