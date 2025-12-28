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
    href: "/notice",
    submenu: [
      { name: "공지사항", href: "/notice" },
      { name: "협회활동", href: "/activities" },
      { name: "자유게시판", href: "/free" },
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
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-blue-600 rotate-12 flex items-center justify-center -mr-2 shadow-lg">
                <span className="text-white font-black text-lg -rotate-12">C</span>
              </div>
              <div className="h-8 w-8 rounded-lg bg-indigo-500 -rotate-3 flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-lg rotate-3">L</span>
              </div>
            </div>
            <div className="flex flex-col ml-1">
              <span className="text-xl font-black text-gray-900 leading-none">CLIA</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Instructor Association</span>
            </div>
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
              <>
                {/* 크레딧 표시 */}
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-100">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-bold text-gray-700">{user.totalCredits || 0}</span>
                  <span className="text-xs text-gray-500">크레딧</span>
                </div>

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
              </>
            ) : (
              <button
                onClick={openLoginModal}
                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-blue-900 text-white rounded-full text-sm font-bold hover:bg-blue-800 transition-all shadow-lg hover:shadow-blue-900/20"
              >
                <LogIn className="w-4 h-4" />
                시작하기
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


