"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Search } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";

interface AdminGalleryItem {
  id: string;
  title: string;
  images: string[];
  category: string;
  eventDate: string;
  imageUrl?: string; // fallback
}

export default function AdminGalleryPage() {
  const { token } = useAuth();
  const [galleries, setGalleries] = useState<AdminGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGalleries = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/gallery?limit=100`);
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }
      const data = await res.json();
      setGalleries(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Failed to fetch galleries:", error);
      setGalleries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/gallery/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchGalleries();
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      console.error(error);
      alert("오류 발생");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-gray-900">갤러리 관리</h1>
        <Link
          href="/admin/gallery/create"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          사진 등록
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">이미지</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">제목</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">분류</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">행사일</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">작업</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {galleries.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                        <td className="p-4">
                            <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden">
                                <img src={item.images?.[0] || item.imageUrl} alt="" className="w-full h-full object-cover"/>
                            </div>
                        </td>
                        <td className="p-4 font-medium text-gray-900">{item.title}</td>
                        <td className="p-4 text-gray-500 text-sm">{item.category}</td>
                        <td className="p-4 text-gray-500 text-sm">{item.eventDate ? new Date(item.eventDate).toISOString().split('T')[0] : '-'}</td>
                        <td className="p-4 text-right">
                            <button 
                                onClick={() => handleDelete(item.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded"
                            >
                                <Trash2 className="w-4 h-4"/>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {!loading && galleries.length === 0 && (
            <div className="p-10 text-center text-gray-400">등록된 갤러리가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
