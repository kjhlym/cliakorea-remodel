"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Volume2, Clock, Eye, FileText, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

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

      <main className="flex-grow">
        <section className="bg-gray-900 py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="container mx-auto px-4 text-center relative z-10 text-white">
            <h1 className="text-4xl font-black mb-4">공지사항</h1>
            <p className="text-gray-400 font-medium">CLIA의 새로운 소식과 주요 안내사항을 확인하세요.</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-end mb-8">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="제목 또는 내용 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-full text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all w-64 md:w-80"
                />
              </form>
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
                    className="grid grid-cols-12 p-5 items-center border-b border-gray-50 hover:bg-blue-50/10 transition-colors group cursor-pointer"
                  >
                    <div className="col-span-1 text-center hidden md:block font-medium text-gray-400">
                      {total - ((page - 1) * 10) - index}
                    </div>
                    <div className="col-span-12 md:col-span-8 px-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {notice.title}
                        </h3>
                      </div>
                      <div className="flex md:hidden items-center gap-3 mt-2 text-xs text-gray-400">
                        <span>{notice.authorName || '관리자'}</span>
                        <span className="w-px h-3 bg-gray-300" />
                        <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                        <span className="w-px h-3 bg-gray-300" />
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {notice.viewCount}
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
