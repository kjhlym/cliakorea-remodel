'use client';

import useSWR from 'swr';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/lib/context/AuthContext';

const fetcher = async (url: string, token: string | null) => {
  const headers: HeadersInit = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, { headers });
  return res.json();
};

export default function ApplicationList() {
  const { token } = useAuth();
  const { data, error, mutate } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/applications`, token] : null,
    ([url, t]) => fetcher(url, t)
  );

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/applications/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        toast.success('상태가 변경되었습니다.');
        mutate();
      }
    } catch (e) {
      toast.error('상태 변경 실패');
    }
  };

  if (error) return <div className="p-8 text-red-500">데이터를 불러오는데 실패했습니다.</div>;
  if (!data) return <div className="p-8 text-gray-500">로딩 중...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-900">신청 내역 관리</h1>
      
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">신청자</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">프로그램</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">연락처</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">상태</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">신청일</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((app: any) => (
              <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-900">{app.applicantName}</div>
                  <div className="text-[10px] text-gray-400">{app.applicantEmail}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-700">{app.programName}</div>
                  <div className="text-[10px] text-gray-400">
                    {app.programType === 'children' ? '어린이 리더십' :
                     app.programType === 'youth' ? '청소년 리더십' :
                     app.programType === 'parent' ? '부모 리더십' :
                     app.programType === 'specialized' ? '특화 프로그램' : app.programType}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{app.applicantPhone || '-'}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    app.status === 'completed' ? 'bg-green-100 text-green-600' :
                    app.status === 'approved' ? 'bg-blue-100 text-blue-600' :
                    app.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {app.status === 'pending' ? '대기 중' :
                     app.status === 'approved' ? '승인됨' :
                     app.status === 'rejected' ? '거절됨' :
                     app.status === 'completed' ? '완료됨' : app.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{new Date(app.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <select 
                    className="text-xs font-bold border-gray-100 rounded-lg focus:ring-blue-500"
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                  >
                    <option value="pending">대기중</option>
                    <option value="approved">승인</option>
                    <option value="completed">완료</option>
                    <option value="rejected">거절</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && <div className="p-20 text-center text-gray-400">신청 내역이 없습니다.</div>}
      </div>
      
      {/* 상세 문의 내용 표시를 위한 섹션 (선택적) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {data.filter((app: any) => app.message).map((app: any) => (
          <div key={`msg-${app.id}`} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-gray-900">{app.applicantName} 님의 문의</h3>
              <span className="text-[10px] text-gray-400">{new Date(app.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-wrap bg-gray-50 p-4 rounded-xl">
              {app.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
