"use client";

import { useEffect, useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Search, PenSquare, ChevronRight, Eye, Clock, MessageSquare, Loader2 } from "lucide-react";

interface Post {
  id: string;
  category: string;
  title: string;
  authorName: string;
  createdAt: string;
  viewCount: number;
  isNotice?: boolean;
}

const CATEGORY_MAP: Record<string, string> = {
  "전체": "all",
  "공지사항": "notice",
  "협회활동": "news",
  "자료실": "education",
  "자유게시판": "general"
};

const CATEGORY_REVERSE_MAP: Record<string, string> = {
  "notice": "공지사항",
  "news": "협회활동",
  "education": "자료실",
  "general": "자유게시판"
};

export default function BoardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const category = CATEGORY_MAP[activeTab];
      const categoryQuery = category !== "all" ? `&category=${category}` : "";
      
      const res = await fetch(`${apiUrl}/boards?page=${currentPage}&limit=10${categoryQuery}`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      
      const data = await res.json();
      setPosts(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, currentPage]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            {/* 상단 섹션 */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-3">소통 창구</h1>
                <p className="text-gray-500 font-medium">협회의 새로운 소식과 다양한 이야기를 나누는 공간입니다.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all w-64 shadow-sm"
                  />
                </div>
                <Link 
                  href="/admin/free/create"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                >
                  <PenSquare className="w-4 h-4" />
                  글쓰기
                </Link>
              </div>
            </div>

            {/* 카테고리 탭 */}
            <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl mb-8 w-fit overflow-x-auto max-w-full">
              {Object.keys(CATEGORY_MAP).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                    tab === activeTab ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* 게시글 목록 */}
            <div className="border-t border-gray-100 min-h-[400px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                  <p className="text-gray-400 font-medium">게시글을 불러오고 있습니다...</p>
                </div>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/board/${post.id}`}
                    className={`group flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-gray-50 hover:bg-gray-50/50 transition-all ${
                      post.category === "notice" ? "bg-blue-50/30" : ""
                    }`}
                  >
                    <div className="flex-grow pr-10">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                          post.category === "notice" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400"
                        }`}>
                          {CATEGORY_REVERSE_MAP[post.category] || post.category}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                          <Clock className="w-3 h-3" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-8 mt-4 md:mt-0 min-w-[200px]">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Eye className="w-4 h-4" />
                          {post.viewCount}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                        <span className="truncate max-w-[80px]">{post.authorName || '익명'}</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                )
              )) : (
                <div className="py-24 text-center text-gray-400 font-medium">
                  게시글이 존재하지 않습니다.
                </div>
              )}
            </div>

            {/* 페이지네이션 */}
            {!loading && totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm flex items-center justify-center transition-all ${
                      num === currentPage ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
