"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get("token");
      console.log('[AuthCallback] Token from URL:', token ? token.substring(0, 30) + '...' : 'NO TOKEN');
      
      if (token) {
        console.log('[AuthCallback] Calling login with token');
        await login(token);
        console.log('[AuthCallback] Login completed, redirecting to home');
        router.push("/");
      } else {
        console.error('[AuthCallback] No token found in URL');
        router.push("/?error=auth_failed");
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
