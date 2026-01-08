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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-black text-gray-900">갤러리 관리</h1>
        <Link
          href="/admin/gallery/create"
          className="flex items-center justify-center gap-2 px-6 py-2.5 md:py-2 bg-blue-600 text-white rounded-xl md:rounded-lg font-bold hover:bg-blue-700 transition-colors text-sm md:text-base"
        >
          <Plus className="w-4 h-4" />
          사진 등록
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* 갤러리 그리드 뷰 (통합) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {galleries.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col overflow-hidden">
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img 
                  src={item.images?.[0] || item.imageUrl || '/images/no-image.png'} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-wider text-gray-700 shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">{item.title}</h3>
                  <p className="text-xs text-gray-400 font-medium flex items-center gap-1">
                    <span>{item.eventDate ? new Date(item.eventDate).toLocaleDateString() : '-'}</span>
                  </p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end">
                   <button 
                     onClick={() => handleDelete(item.id)}
                     className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                     title="삭제"
                   >
                     <Trash2 className="w-5 h-5" />
                   </button>
                </div>
              </div>
            </div>
          ))}
          {!loading && galleries.length === 0 && (
             <div className="col-span-full py-20 text-center text-gray-400 font-medium">
               등록된 갤러리가 없습니다.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
