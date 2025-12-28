"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, FileText, MessageSquare, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 실제 운영 환경에서는 서버 사이드에서도 체크해야 함
    if (user && user.role !== "admin") {
      router.push("/");
    }
  }, [user, router]);

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 font-bold">관리자 권한 확인 중...</p>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: "대시보드", href: "/admin" },
    { icon: <FileText className="w-5 h-5" />, label: "신청 내역", href: "/admin/applications" },
    { icon: <MessageSquare className="w-5 h-5" />, label: "상담 내역", href: "/admin/consultations" },
    { icon: <Users className="w-5 h-5" />, label: "회원 관리", href: "/admin/users" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 사이드바 */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-gray-50">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-blue-600">CLIA</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Admin Portal</span>
          </Link>
        </div>

        <nav className="flex-grow p-6 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-bold"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-50">
           <button
             onClick={logout}
             className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold text-sm"
           >
             <LogOut className="w-5 h-5" />
             로그아웃
           </button>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-grow p-10 overflow-auto">
        {children}
      </main>
    </div>
  );
}
