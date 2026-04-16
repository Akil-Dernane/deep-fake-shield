import Image from "next/image";
import { BarChart3, FileDown, Dna, Zap } from "lucide-react";

// components
import UploadZone from "@/components/dashboard/Analyze/UploadZone";

export default function AnalyzePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
      {/* Hero */}
      <section className="grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 md:col-span-7">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#adc6ff] font-bold mb-2 block">
            AI Image Analysis
          </span>

          <h2 className="text-5xl font-black font-headline text-white leading-tight">
            ANALYZE <br />
            <span className="bg-linear-to-r from-[#adc6ff] to-[#357df1] bg-clip-text text-transparent italic">
              YOUR IMAGE
            </span>
          </h2>
        </div>

        <div className="col-span-12 md:col-span-5 text-[#c6c6cd] font-body text-sm leading-relaxed pb-2 border-l border-[#222a3d] pl-6">
          Upload an image and let the AI detect whether it is real or
          manipulated. You will receive a prediction along with a confidence
          score.
        </div>
      </section>

      {/* Upload */}
      <UploadZone />

      {/* Result Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
            <BarChart3 size={16} />
            Most Recent Analysis
          </h4>

          <span className="text-[10px] text-slate-700 font-bold uppercase tracking-widest">
            Session ID: #0001
          </span>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Image Result */}
          <div className="col-span-12 lg:col-span-8 group relative overflow-hidden rounded-3xl shadow-2xl border border-white/5">
            <Image
              fill
              alt="Analyzed Image"
              className="w-full aspect-video object-cover transition-transform duration-1000 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqVL6RgMQaQgOBkmnkq_VhtV1QTco988IZDmFMAspLc18i8U-EHFao6-xlx1sjc-3TytJMHDhSYnk9plimkjZwPefdKwhMHSRaKMyXQgCXmUxYS4E4td97N67sap4pw76E5bd_-SBg3qMSXMEyKzrpO2AhoQ9MCrrcHpXEAO8d2Lh4Fd4wdcZBx0BVeUK-pg1EquxWDRUFtGJ4ma4IvkfpwwE98CXYOpLO1ANQZ3NBJvQe4pbdhJ0zBIrQsSiQlIztmjRevjTZwoo"
            />
            {/* Scanning Line Effect */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-[#adc6ff]/50 shadow-[0_0_15px_#adc6ff] animate-scan"></div>

            {/* Verdict */}
            <div className="absolute top-6 left-6 flex items-center gap-4">
              <div className="bg-[#2d3449]/60 backdrop-blur-md px-4 py-2 flex items-center gap-3 rounded-xl border border-[#4edea3]/30">
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#4edea3]"></span>
                <span className="text-[#4edea3] font-black font-headline tracking-[0.2em] text-xs">
                  REAL
                </span>
              </div>

              <div className="bg-[#2d3449]/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <span className="text-white text-[10px] font-bold uppercase">
                  Confidence:{" "}
                </span>
                <span className="text-[#adc6ff] font-black font-headline text-xs">
                  98%
                </span>
              </div>
            </div>

            {/* Info boxes */}
            <div className="absolute bottom-8 right-8 flex flex-col gap-2 items-end">
              <div className="bg-[#2d3449]/80 backdrop-blur-md p-3 rounded-lg border-l-2 border-[#adc6ff]">
                <p className="text-[9px] text-[#adc6ff] font-black uppercase mb-1">
                  Image Info
                </p>
                <p className="text-[10px] font-mono text-slate-300">
                  Processed Successfully
                </p>
              </div>

              <div className="bg-[#2d3449]/80 backdrop-blur-md p-3 rounded-lg border-l-2 border-[#4edea3]">
                <p className="text-[9px] text-[#4edea3] font-black uppercase mb-1">
                  Analysis Result
                </p>
                <p className="text-[10px] font-mono text-slate-300">
                  No strong manipulation detected
                </p>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#222a3d] rounded-2xl p-6 flex-1 relative overflow-hidden border border-white/5">
              <div className="absolute top-4 right-4 opacity-5">
                <Dna size={80} />
              </div>

              <h5 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                <Zap size={14} className="text-[#adc6ff]" />
                Analysis Details
              </h5>

              <div className="space-y-5">
                <ProgressItem
                  label="Editing Artifacts"
                  value="10%"
                  status="Low"
                />
                <ProgressItem
                  label="Compression Artifacts"
                  value="30%"
                  status="Normal"
                />
                <ProgressItem
                  label="Image Consistency"
                  value="90%"
                  status="High"
                />
              </div>

              <div className="mt-10 pt-6 border-t border-slate-700/50">
                <h5 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
                  Image Information
                </h5>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  <ExifItem label="Source" value="Unknown" />
                  <ExifItem label="Quality" value="High" />
                  <ExifItem label="Location" value="N/A" />
                  <ExifItem label="Editing Tool" value="Not detected" />
                </div>
              </div>
            </div>

            <button className="bg-[#2d3449] hover:bg-[#31394d] transition-all py-4 rounded-2xl flex items-center justify-center gap-3 group active:scale-95 shadow-xl">
              <FileDown size={18} />
              <span className="text-[11px] font-black uppercase tracking-widest text-white">
                Download Result
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="space-y-6">
        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
          Recent Images
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ArchiveCard name="image1.jpg" status="FAKE" id="#0219" />
          <ArchiveCard name="image2.png" status="REAL" id="#0218" />
          <ArchiveCard name="image3.webp" status="REAL" id="#0217" />
          <ArchiveCard name="image4.jpg" status="FAKE" id="#0216" />
        </div>
      </section>
    </div>
  );
}

/* Sub Components */

function ProgressItem({ label, value, status }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400">
        <span>{label}</span>
        <span className="text-white">{status}</span>
      </div>

      <div className="h-1 bg-[#0b1326] rounded-full overflow-hidden">
        <div className="h-full bg-[#adc6ff]" style={{ width: value }}></div>
      </div>
    </div>
  );
}

function ExifItem({ label, value }) {
  return (
    <div>
      <p className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">
        {label}
      </p>
      <p className="text-[11px] text-white font-medium">{value}</p>
    </div>
  );
}

function ArchiveCard({ name, status, id }) {
  const isFake = status === "FAKE";

  return (
    <div className="bg-[#131b2e] rounded-2xl overflow-hidden border border-white/5 hover:border-[#adc6ff]/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
      <div className="h-32 relative overflow-hidden">
        <Image
          fill
          alt={name}
          className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
          src="https://cdn.pixabay.com/photo/2024/05/14/21/45/rhino-8762188_1280.jpg"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span
            className={`text-[8px] font-black px-2 py-0.5 rounded tracking-widest ${
              isFake
                ? "bg-[#eb4141]/20 text-[#eb4141]"
                : "bg-[#4edea3]/20 text-[#4edea3]"
            }`}
          >
            {status}
          </span>

          <span className="text-[10px] text-slate-600 font-mono">{id}</span>
        </div>

        <p className="text-xs font-bold text-white truncate">{name}</p>
        <p className="text-[9px] text-slate-500 uppercase font-bold">
          Checked recently
        </p>
      </div>
    </div>
  );
}
