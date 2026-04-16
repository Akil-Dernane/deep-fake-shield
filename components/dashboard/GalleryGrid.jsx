"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Maximize2, MoreVertical, Plus, Trash2 } from "lucide-react";
import ImagePreview from "./ImagePreview";

export default function GalleryGrid({ images }) {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {/* Upload New Placeholder */}
        <Link
          href={"/dashboard/analyze"}
          className="break-inside-avoid mb-4 flex aspect-square rounded-lg border-2 border-dashed border-white/5 bg-[#131b2e]/30 flex-col items-center justify-center gap-3 group hover:border-[#adc6ff]/40 hover:bg-[#131b2e]/50 transition-all duration-500"
        >
          <div className="p-4 rounded-full bg-[#adc6ff]/5 group-hover:scale-110 transition-transform">
            <Plus className="text-[#adc6ff]" size={24} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
            Add Image
          </span>
        </Link>

        {/* Passing the whole image object to setActiveImage so the preview has all details */}
        {images.map((image) => (
          <MediaCard
            key={image.id}
            image={image}
            onExpand={() => setActiveImage(image)}
          />
        ))}
      </div>

      <ImagePreview
        activeImage={activeImage}
        onClose={() => setActiveImage(null)}
      />
    </>
  );
}

function MediaCard({ image, onExpand }) {
  const { url, title, size, width, height } = image;

  return (
    <div
      onClick={onExpand}
      className="break-inside-avoid mb-4 group relative rounded-lg overflow-hidden bg-[#131b2e] border border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-[#adc6ff]/10 hover:-translate-y-1 cursor-zoom-in"
    >
      <Image
        src={url}
        width={width}
        height={height}
        alt={title}
        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
      />

      {/* Selection Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-[#0b1326] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-3 right-3">
          <button
            onClick={(e) => e.stopPropagation()} // Prevents opening preview when clicking menu
            className="p-1.5 bg-[#0b1326]/60 backdrop-blur-md rounded-lg text-white hover:text-[#adc6ff] transition-colors"
          >
            <MoreVertical size={14} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-[10px] font-black text-white truncate uppercase tracking-tighter mb-1">
            {title}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-slate-400 font-bold">{size}</span>
            <div className="flex gap-2">
              <button className="text-slate-400 hover:text-white transition-colors">
                <Download size={14} />
              </button>
              <button className="text-slate-400 hover:text-[#eb4141] transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Center Icon Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
          <Maximize2 className="text-white" size={18} />
        </div>
      </div>
    </div>
  );
}
