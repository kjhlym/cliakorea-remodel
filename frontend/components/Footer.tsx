"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";

export default function Footer() {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const { openLoginModal } = useAuth();

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const isSectionOpen = (title: string) => openSections.includes(title);

  const FooterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="flex flex-col items-center text-center border-b md:border-none border-gray-800 last:border-none py-4 md:py-0">
      <button 
        onClick={() => toggleSection(title)}
        className="flex items-center justify-center gap-2 text-sm md:text-base font-bold mb-1 md:mb-2 w-full md:w-auto md:pointer-events-none hover:text-blue-400 md:hover:text-white transition-colors"
      >
        {title}
        <ChevronDown 
          className={`w-4 h-4 md:hidden transition-transform duration-300 ${isSectionOpen(title) ? "rotate-180" : ""}`} 
        />
      </button>
      <div 
        className={`space-y-2 text-gray-300 transition-all duration-300 overflow-hidden md:h-auto md:opacity-100 md:visible ${
          isSectionOpen(title) 
            ? "max-h-40 opacity-100" 
            : "max-h-0 opacity-0 md:max-h-none"
        }`}
      >
        <div className="pt-2 md:pt-0">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <footer className="bg-gray-900 text-white py-6 md:py-8 text-xs md:text-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8 mb-4 md:mb-6">
          
          <FooterSection title="연락처">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">대표전화:</span>
              </p>
              <p>
                <a href="tel:070-4384-7849" className="hover:text-white">
                  070-4384-7849
                </a>
              </p>
              <p>
                <a href="tel:010-5465-7745" className="hover:text-white">
                  010-5465-7745
                </a>
              </p>
              <p>
                <a href="tel:010-5465-7745" className="hover:text-white">
                 Email: only.youplus@daum.net
                </a>
              </p>
            </div>
          </FooterSection>

          <FooterSection title="오시는 길">
             <div className="space-y-2">
              <p>
                서울 성북구 길음동 1276
              </p>
              <p>
                길음 삼부컨버니언아파트 상가 
                <br />
                102동 지층 53호
              </p>
              <Link 
                href="/about/location" 
                className="inline-block mt-0.5 md:mt-1 text-[10px] md:text-xs text-blue-400 hover:text-blue-300 underline"
              >
                지도 보기 &rarr;
              </Link>
            </div>
          </FooterSection>

          <FooterSection title="빠른 링크">
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white">
                  협회소개
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-white">
                  교육프로그램
                </Link>
              </li>
              <li>
                <Link href="/board" className="hover:text-white">
                  게시판
                </Link>
              </li>
              <li>
                <button 
                  onClick={openLoginModal}
                  className="hover:text-white transition-colors"
                >
                  Admin
                </button>
              </li>
            </ul>
          </FooterSection>

        </div>

        {/* 저작권 */}
        <div className="border-t border-gray-800 pt-4 text-center text-gray-400 text-[10px] md:text-xs">
          <p className="mb-1">사업자 등록번호: 209-82-67773</p>
          <p>© 2025 어린이리더십강사협회 (CLIA). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
