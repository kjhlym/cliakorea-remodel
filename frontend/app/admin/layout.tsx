"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, FileText, MessageSquare, Settings, LogOut, Image as ImageIcon, BarChart3 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== "admin") {
        router.push("/");
      }
    }
  }, [user, isLoading, router]);


  // 페이지 이동 시 모바일 사이드바 닫기
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [children]);

  // 로딩 중이거나, 유저 정보가 아직 확인되지 않았을 때
  if (isLoading || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 font-bold">
            {isLoading ? "사용자 확인 중..." : "접근 권한 확인 중..."}
          </p>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: "대시보드", href: "/admin" },
    { icon: <FileText className="w-5 h-5" />, label: "신청 내역", href: "/admin/applications" },
    { icon: <MessageSquare className="w-5 h-5" />, label: "상담 내역", href: "/admin/consultations" },
    { icon: <FileText className="w-5 h-5" />, label: "공지사항 관리", href: "/admin/notices" },
    { icon: <ImageIcon className="w-5 h-5" />, label: "팝업 관리", href: "/admin/popups" },
    { icon: <ImageIcon className="w-5 h-5" />, label: "갤러리 관리", href: "/admin/gallery" },
    { icon: <Settings className="w-5 h-5" />, label: "교육 일정", href: "/admin/schedules" },
    { icon: <BarChart3 className="w-5 h-5" />, label: "통계 수치 관리", href: "/admin/statistics" },
    { icon: <Users className="w-5 h-5" />, label: "회원 관리", href: "/admin/users" },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-8 border-b border-gray-50 flex-shrink-0">
        <Link href="/" className="flex flex-col items-center gap-1">
          <img src="/clialogo.png" alt="CLIA Logo" className="h-10 w-auto object-contain" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Admin Portal</span>
        </Link>
      </div>

      <nav className="flex-grow p-4 md:p-6 space-y-1 md:space-y-2 overflow-y-auto">
        {sidebarItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-bold"
          >
            <div className="md:scale-110 scale-90">{item.icon}</div>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-50 flex-shrink-0">
         <button
           onClick={logout}
           className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold text-sm"
         >
           <LogOut className="w-5 h-5" />
           로그아웃
         </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* 모바일 헤더 */}
      <header className="bg-white border-b border-gray-100 p-3 flex items-center justify-between md:hidden sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-2">
          <img src="/clialogo.png" alt="CLIA Logo" className="h-6 w-auto object-contain" />
        </Link>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* 모바일 사이드바 오버레이 */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside className="absolute top-0 right-0 w-3/4 max-w-xs h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
             <div className="flex justify-end p-4">
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-gray-400 hover:gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* 데스크톱 사이드바 */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-100 flex-col sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-grow p-3 md:p-10 overflow-auto w-full text-sm md:text-base">
        {children}
      </main>
    </div>
  );
}
