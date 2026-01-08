'use client';

import useSWR from 'swr';
import { Users, FileText, MessageSquare, CreditCard, ArrowUpRight } from 'lucide-react';

import { useAuth } from '@/lib/context/AuthContext';

const fetcher = async ([url, token]: [string, string | null]) => {
  const headers: HeadersInit = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, { headers });
  return res.json();
};

export default function AdminDashboard() {
  const { token } = useAuth();
  
  const { data, error } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/admin/stats`, token] : null,
    fetcher
  );
  
  const { data: popups } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/popups`, token] : null,
    fetcher
  );

  if (error) return <div className="p-8 text-red-500">데이터를 불러오는데 실패했습니다.</div>;
  if (!data) return <div className="p-8 text-gray-500">로딩 중...</div>;

  const { stats, recentApplications, recentConsultations } = data;
  // popups가 배열인지 확인 후 filter
  const activePopupsCount = Array.isArray(popups) ? popups.filter((p: any) => p.isActive).length : 0;

  const statCards = [
    { label: '전체 회원', value: stats.totalUsers, icon: <Users className="w-6 h-6 text-blue-500" />, color: 'bg-blue-50' },
    { label: '신청 건수', value: stats.totalApplications, icon: <FileText className="w-6 h-6 text-orange-500" />, color: 'bg-orange-50' },
    { label: '상담 건수', value: stats.totalConsultations, icon: <MessageSquare className="w-6 h-6 text-green-500" />, color: 'bg-green-50' },
    { label: '진행중 팝업', value: activePopupsCount, icon: <CreditCard className="w-6 h-6 text-purple-500" />, color: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">관리자 대시보드</h1>
        <p className="text-gray-500 font-medium">서비스의 전반적인 현황을 한눈에 확인하세요.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} p-3 rounded-2xl`}>
                {card.icon}
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{card.label}</span>
            </div>
            <div className="text-3xl font-black text-gray-900">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 최근 신청 내역 */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-lg font-black text-gray-900">최근 신청 내역</h2>
            <button className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline">
              전체보기 <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentApplications.map((app: any) => (
              <div key={app.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">{app.applicantName}</div>
                  <div className="text-xs text-gray-400">{new Date(app.createdAt).toLocaleString()}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                  app.status === 'completed' ? 'bg-green-100 text-green-600' :
                  app.status === 'approved' ? 'bg-blue-100 text-blue-600' :
                  app.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {app.status}
                </span>
              </div>
            ))}
            {recentApplications.length === 0 && <div className="p-8 text-center text-gray-400 text-sm">최근 신청 내역이 없습니다.</div>}
          </div>
        </div>

        {/* 최근 상담 내역 */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-lg font-black text-gray-900">최근 상담 내역</h2>
            <button className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline">
              전체보기 <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentConsultations.map((con: any) => (
              <div key={con.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">{con.name}</div>
                  <div className="text-xs text-gray-400">{new Date(con.createdAt).toLocaleString()}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                  con.status === 'completed' ? 'bg-green-100 text-green-600' :
                  con.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
                  con.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {con.status}
                </span>
              </div>
            ))}
            {recentConsultations.length === 0 && <div className="p-8 text-center text-gray-400 text-sm">최근 상담 내역이 없습니다.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
