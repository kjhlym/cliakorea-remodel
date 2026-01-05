"use client";

import { useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const loginAttempted = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      // 이미 로그인 시도를 했으면 중단 (useEffect 중복 실행 방지)
      if (loginAttempted.current) return;

      const token = searchParams.get("token");

      if (token) {
        loginAttempted.current = true;
        console.log('[AuthCallback] Token received, processing login...');
        try {
          await login(token);
          console.log('[AuthCallback] Login successful, redirecting...');
          router.push("/");
        } catch (error) {
          console.error('[AuthCallback] Login failed:', error);
          router.push("/?error=auth_failed");
        }
      } else {
        console.error('[AuthCallback] No token found in URL');
        router.push("/?error=no_token");
      }
    };

    handleCallback();
  }, [searchParams, login, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-bold text-gray-900">로그인 처리 중...</h2>
        <p className="text-gray-500">잠시만 기다려 주세요.</p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-900">로그인 처리 중...</h2>
          <p className="text-gray-500">잠시만 기다려 주세요.</p>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
