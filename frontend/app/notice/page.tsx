"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Volume2, Clock, Eye, FileText, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import SubNav from "@/components/SubNav";

const boardNavItems = [

  { name: "공지사항", href: "/notice" },
  { name: "갤러리", href: "/board/gallery" },
  { name: "협회교육일정", href: "/board/schedule" },
];

interface Notice {
  id: string;
  title: string;
  authorName: string;
  createdAt: string;
  viewCount: number;
}

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        category: 'notice',
        page: page.toString(),
        limit: '10',
        search: searchTerm
      });
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/boards?${query}`);
      if (res.ok) {
        const data = await res.json();
        setNotices(data.items || []);
        setTotal(data.total || 0);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchNotices();
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <SubNav items={boardNavItems} />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Search Bar */}
            <div className="bg-gray-50 p-2 md:p-4 border border-gray-200 mb-6">
              <form onSubmit={handleSearch} className="flex justify-center">
                <input
                  type="text"
                  placeholder="제목 또는 내용 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 text-xs md:text-sm focus:outline-none focus:border-blue-500 flex-grow max-w-md"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 md:px-6 md:py-2 bg-red-600 text-white text-xs md:text-sm font-bold hover:bg-red-700 transition-colors"
                >
                  검색
                </button>
              </form>
            </div>

            {/* Total Count */}
            <div className="flex justify-end mb-4">
              <span className="text-sm font-bold text-gray-500">
                총 <span className="text-red-600">{total}</span> 건
              </span>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="grid grid-cols-12 bg-gray-50 p-5 text-sm font-bold text-gray-500 border-b border-gray-100">
                <div className="col-span-1 text-center hidden md:block">번호</div>
                <div className="col-span-12 md:col-span-8 px-4">제목</div>
                <div className="col-span-2 text-center hidden md:block">작성자</div>
                <div className="col-span-1 text-center hidden md:block">날짜</div>
              </div>

              {loading ? (
                <div className="p-20 text-center text-gray-400 font-medium">불러오는 중...</div>
              ) : notices.length > 0 ? (
                notices.map((notice, index) => (
                  <Link 
                    href={`/notice/${notice.id}`}
                    key={notice.id} 
                    className="grid grid-cols-12 p-3 md:p-5 items-center border-b-2 border-gray-200 hover:bg-blue-50/10 transition-colors group cursor-pointer last:border-b-0"
                  >
                    <div className="col-span-1 text-center hidden md:block font-medium text-gray-400">
                      {total - ((page - 1) * 10) - index}
                    </div>
                    <div className="col-span-12 md:col-span-8 px-2 md:px-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-sm md:text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {notice.title}
                        </h3>
                      </div>
                      <div className="flex md:hidden items-center gap-2 mt-1.5 text-[10px] text-gray-400">
                        <span>{notice.authorName || '관리자'}</span>
                        <span className="w-px h-2 bg-gray-300" />
                        <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                        <span className="w-px h-2 bg-gray-300" />
                        <span className="flex items-center gap-1">
                          <Eye className="w-2.5 h-2.5" /> {notice.viewCount}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2 text-center hidden md:block text-sm font-medium text-gray-600">
                      {notice.authorName || '관리자'}
                    </div>
                    <div className="col-span-1 text-center hidden md:block text-sm text-gray-400 font-medium">
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-20 text-center text-gray-400 font-medium">공지사항이 없습니다.</div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex justify-center items-center gap-2">
                <button 
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                      page === num 
                        ? "bg-blue-600 text-white shadow-md" 
                        : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <button 
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
