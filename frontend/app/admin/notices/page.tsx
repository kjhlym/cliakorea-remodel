"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Edit, Search, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";

interface Notice {
  id: string;
  title: string;
  category: string;
  authorName: string;
  viewCount: number;
  createdAt: string;
}

export default function AdminNoticesPage() {
  const { token } = useAuth();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotices = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      // category=notice만 가져오기
      const res = await fetch(`${apiUrl}/boards?category=notice&limit=100`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setNotices(data.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/boards/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchNotices();
      else alert("삭제 실패");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-gray-900">공지사항 관리</h1>
        <Link
          href="/admin/notices/create"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          공지 등록
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">제목</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">작성자</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">조회수</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">작성일</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {notices.map((notice) => (
              <tr key={notice.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-gray-900">{notice.title}</div>
                </td>
                <td className="p-4 text-sm text-gray-600 font-medium">{notice.authorName || '관리자'}</td>
                <td className="p-4 text-sm text-gray-500">{notice.viewCount}</td>
                <td className="p-4 text-sm text-gray-500">
                  {new Date(notice.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right space-x-2">
                  <Link
                    href={`/admin/notices/${notice.id}/edit`}
                    className="inline-flex p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(notice.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && notices.length === 0 && (
          <div className="p-20 text-center text-gray-400 font-medium">
            등록된 공지사항이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
