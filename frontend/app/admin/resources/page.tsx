"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Edit2, FileText, Search, ExternalLink } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";

interface ResourceItem {
  id: string;
  title: string;
  category: string;
  imageUrl?: string;
  author?: string;
  createdAt: string;
  viewCount: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  general: "일반자료실",
  books: "추천도서목록",
  materials: "교구자료",
};

export default function AdminResourcesPage() {
  const { token } = useAuth();
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResources = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/resource?limit=100`);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data = await res.json();
      setResources(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Failed to fetch resources:", error);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/resource/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchResources();
      else alert("삭제 실패");
    } catch (error) {
      console.error(error);
      alert("오류 발생");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-gray-900">자료실 관리</h1>
          <p className="text-gray-500 text-xs md:text-sm mt-1">일반자료, 추천도서, 교구자료를 통합 관리합니다.</p>
        </div>
        <Link
          href="/admin/resources/create"
          className="flex items-center justify-center gap-2 px-6 py-2.5 md:py-2 bg-blue-600 text-white rounded-xl md:rounded-lg font-bold hover:bg-blue-700 transition-colors text-sm md:text-base"
        >
          <Plus className="w-4 h-4" />
          자료 등록
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* 모바일 카드 뷰 */}
        <div className="md:hidden divide-y divide-gray-100">
          {resources.map(item => (
            <div key={item.id} className="p-4 bg-white flex gap-4">
               {/* 썸네일 */}
               <div className="shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <FileText className="w-8 h-8 text-gray-300" />
                  )}
               </div>

               {/* 내용 */}
               <div className="flex-grow flex flex-col justify-between min-w-0">
                  <div className="space-y-1">
                     <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.category === 'books' ? 'bg-indigo-100 text-indigo-600' :
                        item.category === 'materials' ? 'bg-orange-100 text-orange-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {CATEGORY_LABELS[item.category] || item.category}
                      </span>
                      <h3 className="text-sm font-bold text-gray-900 truncate">{item.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{item.author || '-'}</span>
                        <span>•</span>
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                     <span className="text-[10px] text-gray-400">조회수 {item.viewCount}</span>
                     <div className="flex gap-1">
                        <Link 
                          href={`/admin/resources/edit/${item.id}`}
                          className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg bg-gray-50"
                        >
                          <Edit2 className="w-3.5 h-3.5"/>
                        </Link>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg bg-gray-50"
                        >
                          <Trash2 className="w-3.5 h-3.5"/>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>

        <table className="w-full text-left hidden md:table">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase whitespace-nowrap">이미지</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase whitespace-nowrap">분류</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase whitespace-nowrap">제목</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase whitespace-nowrap">저자/담당</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase whitespace-nowrap">등록일</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right whitespace-nowrap">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {resources.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-4 whitespace-nowrap">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-100">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <FileText className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    item.category === 'books' ? 'bg-indigo-100 text-indigo-600' :
                    item.category === 'materials' ? 'bg-orange-100 text-orange-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {CATEGORY_LABELS[item.category] || item.category}
                  </span>
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-900 line-clamp-1">{item.title}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">조회수: {item.viewCount}</div>
                </td>
                <td className="p-4 text-gray-500 text-sm font-medium whitespace-nowrap">{item.author || '-'}</td>
                <td className="p-4 text-gray-500 text-sm whitespace-nowrap">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-right whitespace-nowrap">
                  <div className="flex justify-end gap-1">
                    <Link 
                      href={`/admin/resources/edit/${item.id}`}
                      className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4"/>
                    </Link>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4"/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && resources.length === 0 && (
          <div className="p-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-400 font-bold">등록된 자료가 없습니다.</p>
            <Link href="/admin/resources/create" className="text-blue-600 text-sm font-bold mt-2 inline-block">첫 번째 자료 등록하기</Link>
          </div>
        )}
        {loading && (
          <div className="p-20 text-center text-gray-400">자료를 불러오는 중입니다...</div>
        )}
      </div>
    </div>
  );
}
