'use client';

import useSWR from 'swr';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/lib/context/AuthContext';
import { Trash2, UserCog } from 'lucide-react';

const fetcher = async (url: string, token: string | null) => {
  const headers: HeadersInit = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, { headers });
  return res.json();
};

export default function UserList() {
  const { token } = useAuth();
  const { data, error, mutate } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users`, token] : null,
    ([url, t]) => fetcher(url, t)
  );

  const handleRoleChange = async (id: string, role: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users/${id}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });
      if (res.ok) {
        toast.success('권한이 변경되었습니다.');
        mutate();
      }
    } catch (e) {
      toast.error('권한 변경 실패');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users/${id}`, {
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
      <h1 className="text-2xl font-black text-gray-900">회원 관리</h1>
      
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">사용자</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">이메일</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">권한</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">크레딧</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">가입일</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((user: any) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt="" className="w-8 h-8 rounded-full border border-gray-100" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">
                        {user.fullName?.[0] || 'U'}
                      </div>
                    )}
                    <span className="font-bold text-gray-900">{user.fullName || '익명'}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-700">{user.totalCredits || 0}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <select 
                    className="text-xs font-bold border-gray-100 rounded-lg focus:ring-blue-500"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="user">USER</option>
                    <option value="admin">ADMIN</option>
                  </select>
                  <button onClick={() => handleDelete(user.id)} className="text-red-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && <div className="p-20 text-center text-gray-400">회원이 없습니다.</div>}
      </div>
    </div>
  );
}
