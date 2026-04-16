"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Download, Trash2, Maximize, Share2 } from "lucide-react";

export default function ImagePreview({ activeImage, onClose, onDelete }) {
  // Lock scroll when modal is open
  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeImage]);

  if (!activeImage) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-0 md:p-10">
      {/* Backdrop with heavy blur for depth */}
      <div
        className="absolute inset-0 bg-[#000a1a]/50 backdrop-blur-2xl animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-7xl h-full md:h-[85vh] flex flex-col md:flex-row bg-[#0b1326] md:rounded-[40px] overflow-hidden border border-white/5 shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close Button (Mobile Only) */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 z-10 p-3 bg-black/40 backdrop-blur-md rounded-full text-white md:hidden"
        >
          <X size={20} />
        </button>

        {/* 1. Main Viewport */}
        <div
          className="flex-1 relative flex items-center justify-center bg-black/40 overflow-hidden cursor-zoom-out"
          onClick={onClose}
        >
          <Image
            src={`${activeImage.url}`}
            width={activeImage.width || 1920}
            height={activeImage.height || 1080}
            alt={activeImage.title}
            className="max-w-full max-h-full object-contain p-4 md:p-12 transition-transform duration-500"
            priority
          />
        </div>

        {/* 2. Technical Sidebar */}
        <aside className="w-full md:w-95 bg-[#131b2e] border-l border-white/5 flex flex-col shrink-0">
          {/* Sidebar Header */}
          <div className="p-8 pb-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#adc6ff] animate-pulse" />
              <span className="text-[10px] font-black text-[#adc6ff] tracking-[0.2em] uppercase">
                Asset Intelligence
              </span>
            </div>
            <button
              onClick={onClose}
              className="hidden md:flex p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Metadata Body */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
            {/* Title & ID */}
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white leading-tight tracking-tight">
                {activeImage.title}
              </h3>
              <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                REFERENCE_ID: {activeImage.img?.toUpperCase()}_55
              </p>
            </div>

            {/* Technical Grid */}
            <div className="grid grid-cols-2 gap-3">
              <InfoCard label="File Format" value="WEBP / 4:4:4" />
              <InfoCard
                label="Dimensions"
                value={`${activeImage.width}×${activeImage.height}`}
              />
              <InfoCard label="File Size" value={activeImage.size} />
              <InfoCard label="Color Space" value="sRGB / HDR" />
            </div>

            {/* Action Group */}
            <div className="space-y-3">
              <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                Available Operations
              </p>
              <div className="grid grid-cols-2 gap-2">
                <ActionButton icon={<Share2 size={14} />} label="Share" />
                <ActionButton icon={<Maximize size={14} />} label="Full Res" />
              </div>
            </div>
          </div>

          {/* Fixed Footer Actions */}
          <div className="p-8 pt-4 space-y-3 bg-linear-to-t from-[#131b2e] to-transparent">
            <button className="w-full py-4 bg-[#adc6ff] text-[#001a42] rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-[0_0_25px_rgba(173,198,255,0.25)] transition-all active:scale-[0.98]">
              <Download size={16} />
              Export Source File
            </button>
            <button
              onClick={() => onDelete?.(activeImage.id)}
              className="w-full py-4 bg-white/5 text-white/50 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#eb4141]/10 hover:text-[#eb4141] transition-all"
            >
              <Trash2 size={16} />
              Purge from Vault
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* Internal Sub-components for cleaner structure */
function InfoCard({ label, value }) {
  return (
    <div className="p-4 rounded-2xl bg-[#0b1326] border border-white/5 hover:border-white/10 transition-colors">
      <p className="text-[9px] text-slate-500 font-bold uppercase mb-1 tracking-tighter">
        {label}
      </p>
      <p className="text-xs text-white font-mono truncate">{value}</p>
    </div>
  );
}

function ActionButton({ icon, label }) {
  return (
    <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 text-white/70 text-[10px] font-bold uppercase border border-white/5 hover:bg-white/10 transition-all">
      {icon}
      {label}
    </button>
  );
}
