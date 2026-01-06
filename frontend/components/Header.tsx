"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/context/AuthContext";
import { User, LogOut, Settings, UserCircle, LogIn, ChevronDown } from "lucide-react";

// 메뉴 데이터 타입 정의
interface MenuItem {
  name: string;
  href: string;
  submenu?: { name: string; href: string }[];
}

const menuItems: MenuItem[] = [
  {
    name: "협회소개",
    href: "/about",
    submenu: [
      { name: "인사말", href: "/about/greeting" },
      { name: "사명과 미션", href: "/about/mission" },
      { name: "활동과 발자취", href: "/about/activities" },
      { name: "찾아오시는 길", href: "/about/location" },
    ],
  },
  { name: "교육프로그램", href: "/programs" },
  { name: "강사양성프로그램", href: "/instructor-training" },
  { name: "자료실", href: "/resources" },
  {
    name: "게시판",
    href: "/board",
    submenu: [
      { name: "공지사항", href: "/notice" },
      { name: "갤러리", href: "/board/gallery" },
      { name: "협회교육일정", href: "/board/schedule" },
    ],
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout, openLoginModal } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* 로고 영역 */}
          <Link href="/" className="flex items-center">
            <img src="/clialogo.png" alt="CLIA Logo" className="h-12 w-auto object-contain" />
          </Link>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden lg:flex items-center gap-10">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 font-bold text-sm tracking-tight transition-colors flex items-center gap-1"
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="w-4 h-4 opacity-50" />}
                </Link>
                {item.submenu && activeSubmenu === item.name && (
                  <div className="absolute left-0 top-full pt-4 w-48 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl py-3 border border-gray-50">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-6 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* 우측 액션 영역 */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 pl-3 bg-gray-50 rounded-full border border-gray-100 hover:bg-gray-100 transition-all"
                >
                  <span className="text-xs font-bold text-gray-600">{user.fullName || user.email}님</span>
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white overflow-hidden shadow-md">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.fullName || user.email} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold text-sm">{(user.fullName || user.email)?.[0]?.toUpperCase() || 'U'}</span>
                    )}
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-50 py-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-6 py-3 border-b border-gray-50 mb-2">
                      <p className="text-xs text-gray-400 mb-1">Signed in as</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                    </div>
                    <Link href="/mypage" className="flex items-center gap-3 px-6 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                      <UserCircle className="w-4 h-4" />
                      마이페이지
                    </Link>
                    <Link href="/settings" className="flex items-center gap-3 px-6 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                      <Settings className="w-4 h-4" />
                      환경 설정
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-6 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-2.5 bg-blue-900 text-white rounded-full text-xs md:text-sm font-bold hover:bg-blue-800 transition-all shadow-lg hover:shadow-blue-900/20 whitespace-nowrap"
              >
                <LogIn className="w-3 h-3 md:w-4 md:h-4" />
                <span>시작하기</span>
              </button>
            )}

            {/* 모바일 메뉴 버튼 */}
            <button
              className="lg:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="메뉴 열기"
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-gray-50 space-y-4 animate-in slide-in-from-top-2 duration-300">
            {menuItems.map((item) => (
              <div key={item.name} className="px-2">
                <Link
                  href={item.href}
                  className="block py-2 text-lg font-bold text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-50 ml-1">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block py-1 text-sm text-gray-500 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {!user && (
              <div className="pt-4 px-2">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    openLoginModal();
                  }}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-600/20"
                >
                  무료 시작하기
                </button>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}


