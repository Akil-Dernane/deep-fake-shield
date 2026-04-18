// Components
import AuthProvider from "@/components/providers/SessionProvider";

import Slidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] font-body selection:bg-[#adc6ff]/30 selection:text-white antialiased">
      <AuthProvider>
        {/* Sidebar - Desktop */}
        <Slidebar />

        {/* Header - Desktop */}
        <Header />

        {/* Main Content Area */}
        <main className="ml-64 min-h-screen pt-24 px-8 pb-12">{children}</main>
      </AuthProvider>
    </div>
  );
}
