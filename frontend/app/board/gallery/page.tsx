"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import SubNav from "@/components/SubNav";

const boardNavItems = [
  { name: "전체글", href: "/board" },
  { name: "공지사항", href: "/notice" },
  { name: "갤러리", href: "/board/gallery" },
  { name: "협회교육일정", href: "/board/schedule" },
];

interface GalleryItem {
  id: string;
  title: string;
  images: string[];
  eventDate: string;
  category?: string;
}

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("전체분류");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page: page.toString(),
        limit: "6",
        category: category !== "전체분류" ? category : "",
        search: searchTerm,
      });
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/gallery?${query}`);
      if (res.ok) {
        const data = await res.json();
        setGalleries(data.data);
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, [page]); // Reload when page changes. Search/Category triggered by button.

  const handleSearch = () => {
    setPage(1);
    fetchGalleries();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <SubNav items={boardNavItems} />

      <main className="flex-grow">
        {/* Title Section */}
        <section className="py-12 border-b border-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-black text-gray-900 mb-2">갤러리</h1>
            <div className="w-10 h-1 bg-black mx-auto mt-4"></div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Filter Bar */}
            <div className="bg-gray-50 p-4 border border-gray-200 mb-6">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-blue-500 w-32 md:w-40 bg-white"
                >
                  <option>전체분류</option>
                  <option>활동</option>
                  <option>행사</option>
                  <option>기타</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-blue-500 w-32 md:w-40 bg-white">
                  <option>전체</option>
                  <option>2025</option>
                  <option>2024</option>
                </select>
                <input
                  type="text"
                  placeholder="검색어를 입력해 주세요"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-blue-500 flex-grow max-w-md"
                />
                <button
                  onClick={handleSearch}
                  className="px-6 py-2 bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-colors"
                >
                  검색
                </button>
              </div>
            </div>

            {/* Total Count */}
            <div className="flex justify-end mb-4">
              <span className="text-sm font-bold text-gray-500">
                총 <span className="text-red-600">{total}</span> 건
              </span>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="text-center py-20 text-gray-400">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {galleries.map((item) => (
                  <Link href={`/board/gallery/${item.id}`} key={item.id} className="group cursor-pointer">
                    <div className="relative aspect-square overflow-hidden bg-gray-100 mb-3">
                      <img
                        src={item.images?.[0] || '/images/logo.png'}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-sm font-bold text-gray-800 mb-1 truncate px-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {item.eventDate ? new Date(item.eventDate).toISOString().split('T')[0] : ''}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            
            {/* Empty State */}
            {!loading && galleries.length === 0 && (
                <div className="text-center py-20 text-gray-400 bg-gray-50 rounded-lg">
                    게시물이 없습니다.
                </div>
            )}

            {/* Pagination */}
            <div className="mt-10 flex justify-center items-center gap-2">
              {Array.from({ length: Math.ceil(total / 6) }, (_, i) => i + 1).map((num) => (
                 <button
                   key={num}
                   onClick={() => setPage(num)}
                   className={`w-8 h-8 text-xs font-bold transition-colors ${
                     page === num
                       ? "text-red-600 font-black border-b-2 border-red-600"
                       : "text-gray-500 hover:text-black"
                   }`}
                 >
                   {num}
                 </button>
              ))}
              {total > 0 && (
                <div className="flex gap-1 ml-2">
                    <button 
                        disabled={page === 1}
                        onClick={() => setPage(prev => Math.max(1, prev - 1))}
                        className="p-1 border border-gray-300 hover:bg-gray-50 disabled:opacity-30"
                    >
                        <ChevronLeft className="w-3 h-3" />
                    </button>
                    <button 
                        disabled={page >= Math.ceil(total / 6)}
                        onClick={() => setPage(prev => Math.min(Math.ceil(total / 6), prev + 1))}
                        className="p-1 border border-gray-300 hover:bg-gray-50 disabled:opacity-30"
                    >
                        <ChevronRight className="w-3 h-3" />
                    </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
