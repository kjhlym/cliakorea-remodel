"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";

export default function Footer() {
  // No state needed for purely static footer
  const { openLoginModal } = useAuth();

  const FooterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="flex flex-col items-center text-center md:border-none last:border-none py-2 md:py-0">
      <div className="text-sm md:text-base font-bold mb-2 w-full md:w-auto text-white">
        {title}
      </div>
      <div className="space-y-2 text-gray-300 transition-all duration-300 md:h-auto md:opacity-100 md:visible">
        <div className="pt-0 md:pt-0 text-[10px] md:text-sm">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <footer className="bg-gray-900 text-white py-6 md:py-8 text-xs md:text-sm">
      <div className="container mx-auto px-1 md:px-4">
        <div className="grid grid-cols-3 gap-2 md:gap-8 mb-4 md:mb-6">
          
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
