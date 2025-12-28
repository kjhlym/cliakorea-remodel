"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Volume2, Clock, Eye, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

// 공지사항 가상 데이터 (http://cliakorea.kr/bbs/?so_table=notice 참조)
const notices = [
  { id: 84, title: "어린이리더십강사협회 교육 안내문", author: "관리자", date: "2024-03-20", views: 450, isImportant: true },
  { id: 85, title: "제17차 어린이리더십강사협회 정기총회 안내", author: "사무국", date: "2024-02-15", views: 320, isImportant: true },
  { id: 83, title: "제16차 어린이리더십강사협회 정기총회 결과 보고", author: "사무국", date: "2023-02-20", views: 280, isImportant: false },
  { id: 82, title: "제15차 어린이리더십강사협회 정기총회 개최", author: "관리자", date: "2022-02-18", views: 210, isImportant: false },
  { id: 79, title: "제14차 정기총회 및 신년 하례식 안내", author: "관리자", date: "2021-01-15", views: 190, isImportant: false },
  { id: 78, title: "[성북구지원] 어린이리더십강사과정 수강생 모집", author: "교육팀", date: "2020-03-10", views: 560, isImportant: false },
  { id: 77, title: "제12차 정기총회 공고", author: "사무국", date: "2019-02-05", views: 150, isImportant: false },
  { id: 76, title: "제11차 정기총회 회의록", author: "관리자", date: "2018-02-22", views: 140, isImportant: false },
  { id: 75, title: "<워크샵 안내> 어린이리더십강사협회 하계 워크샵", author: "교육팀", date: "2017-07-15", views: 330, isImportant: false },
  { id: 74, title: "<어린이리더십강사과정> 20기 수강생 모집", author: "교육팀", date: "2017-03-02", views: 410, isImportant: false },
  { id: 71, title: "<모집안내> 여성 리더에게 리더십을 묻다!", author: "사무국", date: "2016-11-10", views: 290, isImportant: false },
  { id: 70, title: "2016년 파트너 학교 선정 결과", author: "관리자", date: "2016-02-28", views: 220, isImportant: false },
];

export default function NoticePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* 상단 히어로 */}
        <section className="bg-gray-900 py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="container mx-auto px-4 text-center relative z-10 text-white">
            <h1 className="text-4xl font-black mb-4">공지사항</h1>
            <p className="text-gray-400 font-medium">CLIA의 새로운 소식과 주요 안내사항을 확인하세요.</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            {/* 검색 및 필터 */}
            <div className="flex justify-end mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="제목 또는 내용 검색"
                  className="pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-full text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all w-64 md:w-80"
                />
              </div>
            </div>

            {/* 리스트 */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="grid grid-cols-12 bg-gray-50 p-5 text-sm font-bold text-gray-500 border-b border-gray-100">
                <div className="col-span-1 text-center hidden md:block">번호</div>
                <div className="col-span-12 md:col-span-8 px-4">제목</div>
                <div className="col-span-2 text-center hidden md:block">작성자</div>
                <div className="col-span-1 text-center hidden md:block">날짜</div>
              </div>

              {notices.map((notice) => (
                <div 
                  key={notice.id} 
                  className={`grid grid-cols-12 p-5 items-center border-b border-gray-50 hover:bg-blue-50/10 transition-colors group cursor-pointer ${
                    notice.isImportant ? "bg-red-50/20" : ""
                  }`}
                >
                  <div className="col-span-1 text-center hidden md:block font-medium text-gray-400">
                    {notice.isImportant ? <Volume2 className="w-5 h-5 text-red-500 mx-auto" /> : notice.id}
                  </div>
                  <div className="col-span-12 md:col-span-8 px-4">
                    <div className="flex items-center gap-3">
                      {notice.isImportant && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-black rounded tracking-widest uppercase">
                          NOTICE
                        </span>
                      )}
                      <h3 className="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {notice.title}
                      </h3>
                    </div>
                    {/* 모바일용 메타 정보 */}
                    <div className="flex md:hidden items-center gap-3 mt-2 text-xs text-gray-400">
                      <span>{notice.author}</span>
                      <span className="w-px h-3 bg-gray-300" />
                      <span>{notice.date}</span>
                      <span className="w-px h-3 bg-gray-300" />
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {notice.views}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2 text-center hidden md:block text-sm font-medium text-gray-600">
                    {notice.author}
                  </div>
                  <div className="col-span-1 text-center hidden md:block text-sm text-gray-400 font-medium">
                    {notice.date}
                  </div>
                </div>
              ))}
            </div>

            {/* 페이지네이션 */}
            <div className="mt-10 flex justify-center gap-2">
              <button className="w-10 h-10 rounded-lg bg-blue-600 text-white font-bold text-sm shadow-md">1</button>
              <button className="w-10 h-10 rounded-lg bg-gray-50 text-gray-400 font-bold text-sm hover:bg-gray-100 transition-colors">2</button>
              <button className="w-10 h-10 rounded-lg bg-gray-50 text-gray-400 font-bold text-sm hover:bg-gray-100 transition-colors">3</button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
