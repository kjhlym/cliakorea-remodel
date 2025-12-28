"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 연락처 정보 */}
          <div>
            <h3 className="text-lg font-bold mb-4">연락처</h3>
            <div className="space-y-2 text-gray-300">
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
            </div>
          </div>

          {/* 소셜 미디어 */}
          <div>
            <h3 className="text-lg font-bold mb-4">소셜 미디어</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <span className="text-white font-bold">f</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="Instagram"
              >
                <span className="text-white text-xl">📷</span>
              </a>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-lg font-bold mb-4">빠른 링크</h3>
            <ul className="space-y-2 text-gray-300">
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
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© 2025 어린이리더십강사협회 (CLIA). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

