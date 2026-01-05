"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FileText, Book, Box, Search, Download, Lock, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import CTASection from "@/components/CTASection";

interface Resource {
  id: string;
  title: string;
  author?: string;
  category: string;
  imageUrl?: string;
  createdAt: string;
  viewCount: number;
  attachments?: { name: string; url: string }[];
}

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = activeTab === "books" ? 12 : 10;

  const tabs = [
    { id: "general", label: "일반자료실", icon: <FileText className="w-4 h-4" /> },
    { id: "books", label: "추천도서목록", icon: <Book className="w-4 h-4" /> },
    { id: "materials", label: "교구자료", icon: <Box className="w-4 h-4" /> },
  ];

  useEffect(() => {
    setPage(1);
  }, [activeTab, searchTerm]);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/resource?category=${activeTab}&search=${searchTerm}&page=${page}&limit=${limit}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setResources(data.data);
        setTotal(data.total);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, [activeTab, searchTerm, page, limit]);

  const totalPages = Math.ceil(total / limit);

  // Color mapping for books
  const getBookColor = (idx: number) => {
    const colors = [
      "bg-blue-100 text-blue-600",
      "bg-indigo-100 text-indigo-600",
      "bg-purple-100 text-purple-600",
      "bg-green-100 text-green-600",
      "bg-orange-100 text-orange-600",
      "bg-red-100 text-red-600",
      "bg-teal-100 text-teal-600",
      "bg-yellow-100 text-yellow-600",
      "bg-pink-100 text-pink-600",
      "bg-cyan-100 text-cyan-600",
      "bg-slate-100 text-slate-600",
    ];
    return colors[idx % colors.length];
  };

  const handleDownload = (attachments?: { name: string, url: string }[]) => {
    if (!attachments || attachments.length === 0) {
      alert("첨부된 파일이 없습니다.");
      return;
    }
    window.open(attachments[0].url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        {/* 상단 섹션 */}
        <section className="py-20 bg-white border-b border-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-50/50" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">교육 자료실</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              성장을 돕는 CLIA의 전문 지식과 실용적인 <br />
              교육 프로그램 자료를 자유롭게 이용해 보세요.
            </p>
          </div>
        </section>

        {/* 탭 네비게이션 */}
        <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-2 py-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-base font-bold transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-gray-900 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <section className="py-16 container mx-auto px-4 min-h-[600px]">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <div className="inline-flex items-center p-1 bg-gray-100 rounded-2xl">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="자료 제목 검색..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-6 py-3 bg-white border-none rounded-xl focus:outline-none shadow-sm text-sm w-80 font-medium"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-40 gap-4">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <p className="font-bold text-gray-400 text-lg">자료를 불러오는 중입니다...</p>
              </div>
            ) : resources.length === 0 ? (
              <div className="animate-fade-in flex flex-col items-center justify-center py-32 text-center bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <Lock className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">아직 등록된 자료가 없습니다</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                  더 좋은 교육을 위해 교육 자료를 업데이트하고 있습니다.<br />
                  빠른 시일 내에 찾아뵙겠습니다.
                </p>
                <div className="flex gap-4">
                  <Link href="/programs" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                    다른 프로그램 보기
                  </Link>
                  <Link href="/consultation" className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                    문의하기
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* 1. 일반자료실 (리스트 형태) */}
                {activeTab === "general" && (
                  <div className="animate-fade-in space-y-4">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-2xl font-bold flex items-center gap-2">
                        <FileText className="w-6 h-6 text-blue-600" />
                        총 <span className="text-blue-600">{total}</span>건의 자료가 있습니다.
                      </h3>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                      <div className="grid grid-cols-12 bg-gray-50 p-4 text-sm font-bold text-gray-500 border-b border-gray-200">
                        <div className="col-span-2 text-center md:block hidden">번호</div>
                        <div className="col-span-12 md:col-span-8 px-4">제목</div>
                        <div className="col-span-2 text-center md:block hidden">등록일</div>
                      </div>
                      {resources.map((item, idx) => (
                        <div key={item.id} className="grid grid-cols-12 p-5 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 items-center">
                          <div className="col-span-2 text-center text-gray-400 font-medium md:block hidden">{total - ((page - 1) * limit) - idx}</div>
                          <div className="col-span-12 md:col-span-8 px-4 flex items-center gap-4 group cursor-pointer" onClick={() => handleDownload(item.attachments)}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 text-blue-500">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                {item.title}
                              </span>
                              <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400 font-medium">
                                <span>{item.author}</span>
                                <span className="w-px h-2 bg-gray-200" />
                                <span>조회 {item.viewCount}</span>
                              </div>
                            </div>
                            <Download className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                          </div>
                          <div className="col-span-2 text-center text-gray-400 text-sm font-medium md:block hidden">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. 추천도서목록 & 교구자료 (그리드 형태) */}
                {(activeTab === "books" || activeTab === "materials") && (
                  <div className="animate-fade-in">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-2xl font-bold flex items-center gap-2">
                         {activeTab === "books" ? <Book className="w-6 h-6 text-indigo-600" /> : <Box className="w-6 h-6 text-orange-600" />}
                         {activeTab === "books" ? "리더십 추천 도서" : "혁신 교육 교구 자료"}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium">총 <span className="font-bold text-gray-900">{total}</span>개의 자료</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                      {resources.map((item, idx) => (
                        <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group">
                          <div className={`aspect-[3/4] ${item.imageUrl ? 'bg-gray-50' : getBookColor(idx)} flex items-center justify-center relative overflow-hidden`}>
                             {item.imageUrl ? (
                               <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                             ) : (
                               activeTab === "books" ? (
                                 <Book className="w-16 h-16 opacity-30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700" />
                               ) : (
                                 <Box className="w-16 h-16 opacity-30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700" />
                               )
                             )}
                          </div>
                          <div className="px-8 py-6">
                            <div className="max-w-[180px] mx-auto text-center">
                              <h4 className="font-black text-base md:text-lg text-gray-900 mb-0 line-clamp-2 min-h-[3rem] leading-tight group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => handleDownload(item.attachments)}>
                                {item.title}
                              </h4>
                              <div className="flex justify-center border-t border-gray-100 pt-1">
                                <span className="text-xs md:text-sm text-gray-400 font-bold tracking-tight">
                                  {new Date(item.createdAt).toISOString().split('T')[0]}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-16">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-3 rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                        <button
                          key={num}
                          onClick={() => setPage(num)}
                          className={`w-11 h-11 rounded-xl font-bold transition-all ${
                            page === num
                              ? "bg-gray-900 text-white shadow-lg"
                              : "bg-white border border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-3 rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
            
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
