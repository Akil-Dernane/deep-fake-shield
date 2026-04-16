"use client";

import { useRef, useState } from "react";
import { CloudUpload, ShieldCheck, Database, Loader2 } from "lucide-react";

export default function UploadZone() {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file) => {
    // Basic validation
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    setUploading(true);
    console.log("Initializing forensic scan for:", file.name);

    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      alert(`File "${file.name}" received for analysis.`);
    }, 2000);
  };

  return (
    <section className="relative">
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
      />

      <div
        className={`p-1 rounded-2xl border-2 border-dashed transition-colors duration-300 ${
          isDragging
            ? "border-[#adc6ff] bg-[#adc6ff]/10"
            : "border-[#adc6ff]/20 bg-[#131b2e]/30"
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`relative bg-[#060e20] rounded-xl py-20 flex flex-col items-center justify-center text-center group cursor-pointer transition-all duration-500 ${
            uploading ? "opacity-50 pointer-events-none" : "hover:bg-[#131b2e]"
          }`}
        >
          {/* Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#adc6ff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full bg-[#adc6ff]/5 flex items-center justify-center border border-[#adc6ff]/20 group-hover:scale-110 transition-transform duration-500">
              {uploading ? (
                <Loader2 className="text-[#adc6ff] animate-spin" size={40} />
              ) : (
                <CloudUpload className="text-[#adc6ff]" size={40} />
              )}
            </div>
            {!uploading && (
              <div className="absolute -top-1 -right-1">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#adc6ff] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#adc6ff]"></span>
                </span>
              </div>
            )}
          </div>

          <h3 className="text-xl font-bold font-headline text-white mb-2 uppercase tracking-wide">
            {uploading ? "Analyzing Matrix..." : "Secure Drop Zone"}
          </h3>
          <p className="text-[#c6c6cd] max-w-sm font-body text-sm">
            {uploading ? (
              "Running deep-pixel consistency checks..."
            ) : (
              <>
                Drag source files here or{" "}
                <span className="text-[#adc6ff] font-semibold hover:underline">
                  browse files
                </span>
                . <br />
                JPG, PNG, WEBP (Max 50MB)
              </>
            )}
          </p>

          <div className="mt-8 flex gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#222a3d] rounded text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              <ShieldCheck size={12} /> AES-256 Encrypted
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#222a3d] rounded text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              <Database size={12} /> No-Retention Policy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
