'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/lib/context/AuthContext';
import { Trash2, Edit2, Plus, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function ScheduleList() {
  const { token } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const limit = 7;

  // 검색어 디바운싱
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // 검색 시 1페이지로 리셋
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/schedules?page=${page}&limit=${limit}&search=${debouncedSearch}`,
    fetcher
  );

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/schedules/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
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

  const schedules = data.items || [];
  const totalPages = data.totalPages || 1;
  const totalItems = data.total || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-gray-900">교육 및 행사 일정 관리</h1>
        <div className="flex items-center gap-4">
          {/* 검색 바 */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="제목으로 검색..."
              className="pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none w-64 shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link 
            href="/admin/schedules/create"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            <Plus className="w-5 h-5" />
            신규 일정 등록
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        <div className="flex-grow overflow-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">유형</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">제목</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">기간</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">설명</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {schedules.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      item.type === 'EDUCATION' ? 'bg-blue-100 text-blue-600' :
                      item.type === 'EVENT' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{item.title}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span className="font-bold">{new Date(item.startDate).toLocaleDateString()}</span>
                      <span className="text-gray-400 text-xs">~ {new Date(item.endDate).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-[200px] truncate">
                    {item.description || '-'}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link 
                      href={`/admin/schedules/${item.id}`}
                      className="inline-flex p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {schedules.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center gap-4">
              <CalendarIcon className="w-12 h-12 text-gray-100" />
              <p className="text-gray-400 font-bold">
                {debouncedSearch ? '검색 결과가 없습니다.' : '등록된 교육 일정이 없습니다.'}
              </p>
            </div>
          )}
        </div>

        {/* 페이지네이션 컨트롤 */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Total <span className="text-gray-900">{totalItems}</span> Items • Page <span className="text-gray-900">{page}</span> of {totalPages}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 border border-gray-200 rounded-xl bg-white text-gray-400 hover:text-blue-600 hover:border-blue-200 disabled:opacity-30 disabled:hover:text-gray-400 transition-all shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 rounded-xl text-xs font-black transition-all ${
                    page === i + 1
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-white border border-gray-100 text-gray-400 hover:bg-white hover:text-blue-600 hover:border-blue-100 shadow-sm'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 border border-gray-200 rounded-xl bg-white text-gray-400 hover:text-blue-600 hover:border-blue-200 disabled:opacity-30 disabled:hover:text-gray-400 transition-all shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
