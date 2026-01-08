"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { X, Eye, EyeOff } from "lucide-react";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ id: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSocialLogin = (provider: string) => {
    const rawUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiUrl = (rawUrl && rawUrl !== "undefined") ? rawUrl : "http://localhost:3001";
    window.location.href = `${apiUrl}/auth/${provider}`;
  };

  const handleAdminLogin = () => {
    setShowAdminLogin(true);
    setError('');
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const rawUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = (rawUrl && rawUrl !== "undefined") ? rawUrl : "http://localhost:3001";
      
      const response = await fetch(`${apiUrl}/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminId: adminCredentials.id,
          password: adminCredentials.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await login(data.accessToken);
        setShowAdminLogin(false);
        setAdminCredentials({ id: '', password: '' });
        closeLoginModal();
        
        // Admin 로그인 성공 시 admin 페이지로 리다이렉트
        window.location.href = '/admin';
      } else {
        setError(data.message || 'Admin 로그인에 실패했습니다.');
      }
    } catch (error) {
      setError('서버 연결에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetModal = () => {
    setShowAdminLogin(false);
    setAdminCredentials({ id: '', password: '' });
    setError('');
    setShowPassword(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* 닫기 버튼 */}
        <button
          onClick={() => {
            closeLoginModal();
            resetModal();
          }}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-10 pt-12 text-center">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 mb-3">
              관리자 로그인
            </h2>
            <p className="text-gray-500 font-medium">
              관리자 계정으로 로그인하세요
            </p>
          </div>

          <form onSubmit={handleAdminSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}
            
            <div className="text-left">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin ID
              </label>
              <input
                type="text"
                value={adminCredentials.id}
                onChange={(e) => setAdminCredentials(prev => ({ ...prev, id: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="cliaadmin"
                required
              />
            </div>

            <div className="text-left">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={adminCredentials.password}
                  onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
