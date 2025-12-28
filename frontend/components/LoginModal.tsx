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
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              구글로 계속하기
            </button>

            {/* 카카오 로그인 */}
            <button
              onClick={() => handleSocialLogin("kakao")}
              className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-[#FEE500] rounded-xl hover:bg-[#FDE000] transition-all font-semibold text-gray-900"
            >
              <img src="https://kakaocorp.com/favicon.ico" alt="Kakao" className="w-5 h-5" />
              카카오로 계속하기
            </button>

            {/* 네이버 로그인 */}
            <button
              onClick={() => handleSocialLogin("naver")}
              className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-[#03C75A] rounded-xl hover:bg-[#02B351] transition-all font-semibold text-white"
            >
              <img src="https://www.naver.com/favicon.ico" alt="Naver" className="w-5 h-5 invert grayscale brightness-200" />
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
