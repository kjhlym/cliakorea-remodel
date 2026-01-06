'use client';

import useSWR from 'swr';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/lib/context/AuthContext';
import { Trash2 } from 'lucide-react';

const fetcher = async (url: string, token: string | null) => {
  const headers: HeadersInit = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, { headers });
  return res.json();
};

export default function ConsultationList() {
  const { token } = useAuth();
  const { data, error, mutate } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/consultations`, token] : null,
    ([url, t]) => fetcher(url, t)
  );

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/consultations/${id}/status`, {
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

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/consultations/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success('삭제되었습니다.');
        mutate();
      }
    } catch (e) {
      toast.error('삭제 실패');
    }
  };

  if (error) return <div className="p-8 text-red-500">데이터를 불러오는데 실패했습니다.</div>;
  if (!data) return <div className="p-8 text-gray-500">로딩 중...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-black text-gray-900">상담 내역 관리</h1>
      
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* 모바일 카드 뷰 */}
        <div className="md:hidden divide-y divide-gray-50">
          {data.map((con: any) => (
            <div key={con.id} className="p-4 bg-white flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                   <h3 className="font-bold text-gray-900 text-lg">{con.name}</h3>
                   <div className="text-sm text-gray-500">{con.email}</div>
                   <div className="text-sm text-gray-500">{con.phone}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      con.status === 'completed' ? 'bg-green-100 text-green-600' :
                      con.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
                      con.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {con.status === 'pending' ? '대기 중' :
                       con.status === 'in_progress' ? '진행 중' :
                       con.status === 'completed' ? '완료됨' : con.status}
                   </span>
                   <button 
                     onClick={() => handleDelete(con.id)} 
                     className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                   >
                      <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl text-sm text-gray-600">
                 {con.message}
              </div>

              <div>
                 <label className="block text-xs font-bold text-gray-400 mb-1">상태 변경</label>
                 <select 
                    className="w-full p-2 border border-gray-200 rounded-xl text-sm font-bold bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                    value={con.status}
                    onChange={(e) => handleStatusChange(con.id, e.target.value)}
                  >
                    <option value="pending">대기중</option>
                    <option value="in_progress">진행중</option>
                    <option value="completed">완료</option>
                  </select>
              </div>
            </div>
          ))}
        </div>

        <table className="w-full text-left hidden md:table">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">이름</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">연락처</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">이메일</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">내용</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">상태</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((con: any) => (
              <tr key={con.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">{con.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{con.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{con.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-[200px]">{con.message}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    con.status === 'completed' ? 'bg-green-100 text-green-600' :
                    con.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
                    con.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {con.status === 'pending' ? '대기 중' :
                     con.status === 'in_progress' ? '진행 중' :
                     con.status === 'completed' ? '완료됨' : con.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex items-center gap-3 whitespace-nowrap">
                  <select 
                    className="text-xs font-bold border-gray-100 rounded-lg focus:ring-blue-500"
                    value={con.status}
                    onChange={(e) => handleStatusChange(con.id, e.target.value)}
                  >
                    <option value="pending">대기중</option>
                    <option value="in_progress">진행중</option>
                    <option value="completed">완료</option>
                  </select>
                  <button onClick={() => handleDelete(con.id)} className="text-red-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && <div className="p-20 text-center text-gray-400">상담 내역이 없습니다.</div>}
      </div>
    </div>
  );
}
