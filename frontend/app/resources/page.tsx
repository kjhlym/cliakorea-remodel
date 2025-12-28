"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FileText, Book, Box, Search, ChevronRight, Download, Lock } from "lucide-react";
import CTASection from "@/components/CTASection";

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "일반자료실", icon: <FileText className="w-4 h-4" /> },
    { id: "books", label: "추천도서목록", icon: <Book className="w-4 h-4" /> },
    { id: "materials", label: "교구자료", icon: <Box className="w-4 h-4" /> },
  ];

  // 일반자료실 데이터 (program01.php 참조)
  const generalResources = [
    { id: 244, title: "아이는 삶 속에서 배운다", date: "2024.03.15", views: 125 },
    { id: 243, title: "솔선수범과 자기희생의 리더십", date: "2024.03.10", views: 98 },
    { id: 242, title: "비관론자와 낙관론자의 차이", date: "2024.03.05", views: 112 },
    { id: 241, title: "못된 지도자와 위대한 지도자", date: "2024.02.28", views: 245 },
    { id: 240, title: "책임을 지면 신뢰는 따라온다", date: "2024.02.20", views: 156 },
    { id: 239, title: "생각의 전환", date: "2024.02.15", views: 104 },
    { id: 237, title: "굽이 돌아가는 길", date: "2024.02.10", views: 88 },
    { id: 236, title: "힘과 용기의 차이", date: "2024.02.05", views: 134 },
    { id: 235, title: "행복해지려면 행동 양식을 바꿔라", date: "2024.02.01", views: 167 },
    { id: 234, title: "소통과 공감의 자세", date: "2024.01.28", views: 189 },
    { id: 233, title: "당신의 '테이블'에 초대해야 하는 사람", date: "2024.01.20", views: 210 },
    { id: 232, title: "현명한 처신에 필요한 방법 9가지", date: "2024.01.15", views: 155 },
    { id: 231, title: "욕심", date: "2024.01.10", views: 99 },
    { id: 230, title: "괜찮아, 나는 너를 믿어", date: "2024.01.05", views: 302 },
    { id: 228, title: "나와 나타샤와 흰 당나귀", date: "2024.01.01", views: 145 },
    { id: 227, title: "세계 여러나라의 화폐이름과 화폐모델", date: "2023.12.28", views: 176 },
  ];

  // 추천도서 데이터 (recommend.php 참조)
  const books = [
    { title: "천개의 파랑", author: "천선란", date: "2025-07-22", color: "bg-blue-100 text-blue-600" },
    { title: "리더의 말그릇", author: "김윤나", date: "2025-03-24", color: "bg-indigo-100 text-indigo-600" },
    { title: "트렌드 코리아 2025", author: "김난도 외", date: "2025-03-04", color: "bg-purple-100 text-purple-600" },
    { title: "리더의 말습관", author: "임영주", date: "2024-11-20", color: "bg-green-100 text-green-600" },
    { title: "인공지능시대, 창의성을 디자인하라", author: "김경희", date: "2024-10-02", color: "bg-orange-100 text-orange-600" },
    { title: "말과 태도의 사이", author: "유정직", date: "2024-07-23", color: "bg-red-100 text-red-600" },
    { title: "지혜로운 교사는 어떻게 말하는가", author: "김성효", date: "2024-04-26", color: "bg-teal-100 text-teal-600" },
    { title: "디자인씽킹 수업", author: "송석리 외", date: "2024-01-30", color: "bg-yellow-100 text-yellow-600" },
    { title: "세상에서 가장 큰 우산을 써 본 날", author: "김동수", date: "2023-09-14", color: "bg-pink-100 text-pink-600" },
    { title: "나누면서 배우는 비경쟁토론", author: "정윤경", date: "2023-04-24", color: "bg-cyan-100 text-cyan-600" },
    { title: "리더는 칭찬하지 않는다", author: "아들러", date: "2022-10-05", color: "bg-slate-100 text-slate-600" },
  ];

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
          <div className="max-w-5xl mx-auto">
            
            {/* 1. 일반자료실 */}
            {activeTab === "general" && (
              <div className="animate-fade-in space-y-4">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                    총 <span className="text-blue-600">{generalResources.length}</span>건의 자료가 있습니다.
                  </h3>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="자료 검색..." 
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-64"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="grid grid-cols-12 bg-gray-50 p-4 text-sm font-bold text-gray-500 border-b border-gray-200">
                    <div className="col-span-2 text-center md:block hidden">번호</div>
                    <div className="col-span-12 md:col-span-8 px-4">제목</div>
                    <div className="col-span-2 text-center md:block hidden">등록일</div>
                  </div>
                  {generalResources.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 items-center">
                      <div className="col-span-2 text-center text-gray-400 font-medium md:block hidden">{item.id}</div>
                      <div className="col-span-12 md:col-span-8 px-4 cursor-pointer group">
                        <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                           {item.title}
                           <Download className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                        </span>
                      </div>
                      <div className="col-span-2 text-center text-gray-400 text-sm md:block hidden">{item.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. 추천도서목록 */}
            {activeTab === "books" && (
               <div className="animate-fade-in">
                 <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                    <Book className="w-6 h-6 text-indigo-600" />
                    리더십 추천 도서
                 </h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                   {books.map((book, idx) => (
                     <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                       <div className={`h-48 ${book.color} flex items-center justify-center relative overflow-hidden`}>
                          <Book className="w-16 h-16 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                       </div>
                       <div className="p-6">
                         <h4 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">{book.title}</h4>
                         <div className="flex justify-between items-center text-sm text-gray-500">
                           <span>{book.author}</span>
                           <span className="text-xs bg-gray-100 px-2 py-1 rounded">{book.date.split("-")[0]}</span>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            )}

            {/* 3. 교구자료 */}
            {activeTab === "materials" && (
              <div className="animate-fade-in flex flex-col items-center justify-center py-32 text-center bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <Lock className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">자료 준비 중입니다</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                  더 좋은 교육을 위해 교구 자료를 업데이트하고 있습니다.<br />
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
            )}
            
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
