'use client';
import useSWR from 'swr';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Trash2, Edit2 } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function AdminTable() {
  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/admin`,
    fetcher,
  );

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    if (!data) return [];
    if (!Array.isArray(data)) return [];
    return data.filter(
      (a: any) =>
        a.name?.toLowerCase().includes(search.toLowerCase()) ||
        a.email?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / pageSize);

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/admin/${id}`, {
        method: 'DELETE',
      });
      mutate(); // 리스트 재조회
    } catch (e) {
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  if (error) return <div className="text-red-500 p-4">데이터 로드 실패</div>;
  if (!data) return <div className="text-gray-500 p-4">로드 중…</div>;

  return (
    <section className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          관리자 관리
        </h1>
        <Link
          href="/admin/create"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          새 관리자 등록
        </Link>
      </div>

      <input
        type="text"
        placeholder="이름·이메일 검색"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">이름</th>
              <th className="p-2 text-left">이메일</th>
              <th className="p-2 text-left">생성일</th>
              <th className="p-2 text-center">액션</th>
            </tr>
          </thead>
          <tbody>
            {(paginated.length > 0) ? paginated.map((admin: any) => (
              <tr
                key={admin.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <td className="p-2">{admin.id}</td>
                <td className="p-2">{admin.name}</td>
                <td className="p-2">{admin.email}</td>
                <td className="p-2">
                  {new Date(admin.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 flex justify-center space-x-2">
                  <Link
                    href={`/admin/${admin.id}`}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <Edit2 size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(admin.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              } hover:bg-indigo-500 transition`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
