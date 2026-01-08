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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-black text-gray-900">공지사항 관리</h1>
        <Link
          href="/admin/notices/create"
          className="flex items-center justify-center gap-2 px-6 py-2.5 md:py-2 bg-blue-600 text-white rounded-xl md:rounded-lg font-bold hover:bg-blue-700 transition-colors text-sm md:text-base"
        >
          <Plus className="w-4 h-4" />
          공지 등록
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* 공지사항 그리드 뷰 (통합) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {notices.map((notice) => (
            <div key={notice.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group flex flex-col overflow-hidden hover:-translate-y-1 duration-300">
              <div className={`h-2 w-full ${notice.category === 'notice' ? 'bg-red-500' : 'bg-gray-200'}`} />
              
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                     <span className={`px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider ${
                       notice.category === 'notice' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'
                     }`}>
                       {notice.category === 'notice' ? '공지' : '일반'}
                     </span>
                     <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                        <Search className="w-3 h-3" />
                        {notice.viewCount}
                     </span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 leading-snug min-h-[3.5rem]">
                    {notice.title}
                  </h3>
                  
                  <div className="text-xs text-gray-500 font-medium flex items-center gap-2 mb-6">
                    <span className="bg-gray-50 px-2 py-1 rounded-md">{notice.authorName || '관리자'}</span>
                    <span className="text-gray-300">|</span>
                    <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-50 flex gap-2">
                   <Link 
                     href={`/admin/notices/${notice.id}/edit`}
                     className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-100 transition-colors"
                   >
                     <Edit className="w-4 h-4" />
                     수정
                   </Link>
                   <button 
                     onClick={() => handleDelete(notice.id)}
                     className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                     title="삭제"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </div>
          ))}
          {!loading && notices.length === 0 && (
             <div className="col-span-full py-20 text-center text-gray-400 font-medium">
               등록된 공지사항이 없습니다.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
