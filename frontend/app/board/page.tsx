"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Search, PenSquare, ChevronRight, Eye, Clock, MessageSquare } from "lucide-react";

// 가상의 게시글 데이터
const mockPosts = [
  {
    id: 1,
    category: "공지사항",
    title: "2024년 동계 어린이 리더십 캠프 참가자 모집 안내",
    author: "관리자",
    date: "2024-12-20",
    views: 342,
    comments: 12,
    isNotice: true,
  },
  {
    id: 2,
    category: "협회활동",
    title: "경기도 교육청 협약 리더십 강사 파견 현장 스케치",
    author: "강사지원팀",
    date: "2024-12-18",
    views: 156,
    comments: 5,
    isNotice: false,
  },
  {
    id: 3,
    category: "자료실",
    title: "가정에서 실천하는 7가지 리더십 대화 가이드 (PDF)",
    author: "관리자",
    date: "2024-12-15",
    views: 890,
    comments: 45,
    isNotice: false,
  },
  {
    id: 4,
    category: "자유게시판",
    title: "우리 아이가 캠프 다녀와서 정말 많이 변했어요! 추천합니다.",
    author: "행복맘82",
    date: "2024-12-14",
    views: 210,
    comments: 8,
    isNotice: false,
  },
];

export default function BoardPage() {
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
                    className="pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all w-64 shadow-sm"
                  />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                  <PenSquare className="w-4 h-4" />
                  글쓰기
                </button>
              </div>
            </div>

            {/* 카테고리 탭 (모의) */}
            <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl mb-8 w-fit">
              {["전체", "공지사항", "협회활동", "자료실", "자유게시판"].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                    tab === "전체" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* 게시글 목록 */}
            <div className="border-t border-gray-100">
              {mockPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/board/${post.id}`}
                  className={`group flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-gray-50 hover:bg-gray-50/50 transition-all ${
                    post.isNotice ? "bg-blue-50/30" : ""
                  }`}
                >
                  <div className="flex-grow pr-10">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                        post.category === "공지사항" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400"
                      }`}>
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                        <Clock className="w-3 h-3" />
                        {post.date}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-8 mt-4 md:mt-0 min-w-[200px]">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <MessageSquare className="w-4 h-4" />
                        {post.comments}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Eye className="w-4 h-4" />
                        {post.views}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                      <span className="truncate max-w-[80px]">{post.author}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 페이지네이션 (모의) */}
            <div className="mt-12 flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  className={`w-10 h-10 rounded-xl font-bold text-sm flex items-center justify-center transition-all ${
                    num === 1 ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
