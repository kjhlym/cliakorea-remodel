"use client";

import React from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { X } from "lucide-react";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useAuth();

  if (!isLoginModalOpen) return null;

  const handleSocialLogin = (provider: string) => {
    const rawUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiUrl = (rawUrl && rawUrl !== "undefined") ? rawUrl : "http://localhost:3001";
    window.location.href = `${apiUrl}/auth/${provider}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* 닫기 버튼 */}
        <button
          onClick={closeLoginModal}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-10 pt-12 text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">CLIA 시작하기</h2>
            <p className="text-gray-500">
              어린이 리더십의 모든 것, <br />
              소셜 계정으로 1초 만에 시작하세요.
            </p>
          </div>

          <div className="space-y-4">
            {/* 구글 로그인 */}
            <button
              onClick={() => handleSocialLogin("google")}
              className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-semibold text-gray-700 shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.96l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84c.87-2.6 3.3-4.5 6.16-4.5z" fill="#EA4335"/>
              </svg>
              구글로 계속하기
            </button>

            {/* 카카오 로그인 */}
            <button
              onClick={() => handleSocialLogin("kakao")}
              className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-[#FEE500] rounded-xl hover:bg-[#FDE000] transition-all font-semibold text-gray-900"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C7.58 3 4 5.79 4 9.24c0 2.16 1.41 4.07 3.55 5.17-.16.58-.57 2.11-.65 2.45-.1.35.13.35.27.23.18-.15 2.87-1.95 3.37-2.3 2.5.35 1.47.33 1.46.33 4.42 0 8-2.79 8-6.23S16.42 3 12 3z"/>
              </svg>
              카카오로 계속하기
            </button>

            {/* 네이버 로그인 */}
            <button
              onClick={() => handleSocialLogin("naver")}
              className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-[#03C75A] rounded-xl hover:bg-[#02B351] transition-all font-semibold text-white"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.4 21H21V3h-4.6L7.6 13.9V3H3v18h4.6l8.8-10.9V21z"/>
              </svg>
              네이버로 계속하기
            </button>
          </div>

          <div className="mt-8 text-xs text-gray-400">
            가입 시 <span className="underline cursor-pointer">이용약관</span> 및{" "}
            <span className="underline cursor-pointer">개인정보처리방침</span>에 동의하게 됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}
