"use client";

import { FileText, MessageSquare, Users, TrendingUp } from "lucide-react";

const stats = [
  { label: "신규 신청", value: "12", icon: <FileText />, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "상담 대기", value: "5", icon: <MessageSquare />, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "전체 회원", value: "128", icon: <Users />, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "방문자 수", value: "1.2k", icon: <TrendingUp />, color: "text-orange-600", bg: "bg-orange-50" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">대시보드</h1>
        <p className="text-gray-500 font-medium">관리 서비스의 현황을 한눈에 확인하세요.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400">{stat.label}</p>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 최근 활동 (모의) */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50">
          <h2 className="text-xl font-bold text-gray-900">최근 신청 내역</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400">
                   {i}
                </div>
                <div>
                  <p className="font-bold text-gray-900">김철수 님이 '어린이 리더십'을 신청했습니다.</p>
                  <p className="text-xs text-gray-400 font-medium">10분 전</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg">대기 중</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
