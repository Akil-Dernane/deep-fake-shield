import { Search, Filter, Image as ImageIcon } from "lucide-react";
import GalleryGrid from "@/components/dashboard/GalleryGrid";

export default function GalleryPage() {
  const IMAGES = [
    {
      id: "20",
      title: "Project_Sentinel_01",
      size: "2.4 MB",
      width: 1200,
      height: 800,
      url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "22",
      title: "Scan_Result_Deep",
      size: "4.8 MB",
      width: 1920,
      height: 1080,
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
    },
    {
      id: "23",
      title: "Metadata_Dump_04",
      size: "940 KB",
      width: 800,
      height: 800,
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "25",
      title: "Neural_Artifact_01",
      size: "5.1 MB",
      width: 1200,
      height: 1600,
      url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "24",
      title: "Audit_Trail_Log",
      size: "3.2 MB",
      width: 1400,
      height: 900,
      url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "26",
      title: "Vortex_Analysis",
      size: "2.9 MB",
      width: 1000,
      height: 1000,
      url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "27",
      title: "Core_Structure_Raw",
      size: "1.7 MB",
      width: 1600,
      height: 1200,
      url: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "28",
      title: "Archive_Sync_X",
      size: "6.2 MB",
      width: 2000,
      height: 1500,
      url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=2000&q=80",
    },
    {
      id: "29",
      title: "Thermal_Map_Beta",
      size: "3.1 MB",
      width: 1200,
      height: 1800,
      url: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80",
    },
  ];
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header & Search Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#adc6ff] uppercase">
            Personal Repository
          </p>
          <h2 className="text-4xl font-headline font-black text-white">
            Media Gallery
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={14}
            />
            <input
              type="text"
              placeholder="Search assets..."
              className="bg-[#131b2e] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs text-white focus:ring-1 focus:ring-[#adc6ff] w-64 transition-all"
            />
          </div>
          <button className="p-2.5 bg-[#131b2e] border border-white/5 rounded-xl text-slate-400 hover:text-[#adc6ff] transition-all">
            <Filter size={18} />
          </button>
        </div>
      </section>

      {/* Masonry Layout Container */}
      <GalleryGrid images={IMAGES} />
      {/* Capacity Indicator */}
      <section className="mt-12 p-6 rounded-3xl bg-[#131b2e] border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#adc6ff]/10 rounded-2xl">
            <ImageIcon className="text-[#adc6ff]" size={20} />
          </div>
          <div>
            <p className="text-white text-xs font-bold uppercase">
              Vault Storage
            </p>
            <p className="text-[10px] text-slate-500 font-medium">
              842 MB of 2 GB Used
            </p>
          </div>
        </div>
        <div className="w-64 h-2 bg-[#0b1326] rounded-full overflow-hidden">
          <div className="h-full bg-[#adc6ff] w-[42%] rounded-full shadow-[0_0_10px_rgba(173,198,255,0.3)]"></div>
        </div>
      </section>
    </div>
  );
}
