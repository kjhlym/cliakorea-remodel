"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, MessageSquare, User, Heart, PenSquare } from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/CTASection";

// 자유게시판 가상 데이터 (http://cliakorea.kr/bbs/?so_table=free 참조)
const posts = [
  { id: 766, title: "<안내> 아름다운재단 Nice to meet NGO", author: "사무국", date: "2024-11-20", views: 245, comments: 2, likes: 15 },
  { id: 765, title: "<참여안내> 서울시 악기나눔", author: "회원지원", date: "2024-11-18", views: 189, comments: 0, likes: 12 },
  { id: 764, title: "<안내>공연과 전시로 만나는 여성독립운동가", author: "홍보팀", date: "2024-11-15", views: 302, comments: 5, likes: 23 },
  { id: 747, title: "<전시안내>삼일운동100주년 간송특별전 '대한콜랙숀' 전시 개최", author: "문화팀", date: "2024-10-25", views: 412, comments: 8, likes: 45 },
  { id: 715, title: "<안내>하반기 모두의 시민청 '잘돼지2019'", author: "시민청", date: "2024-09-30", views: 156, comments: 1, likes: 8 },
  { id: 714, title: "<안내>2018서울교육 희망메세지 사진공모전", author: "공모전", date: "2024-09-15", views: 234, comments: 3, likes: 19 },
  { id: 713, title: "<안내>인생더하기교실 '산다는 것의 의미' - 김형석 교수", author: "교육팀", date: "2024-09-01", views: 567, comments: 12, likes: 89 },
  { id: 712, title: "<안내>서울동물원 늑대 숲 여우 굴", author: "체험학습", date: "2024-08-20", views: 123, comments: 0, likes: 5 },
  { id: 711, title: "<전시안내>나는 코코 카피탄, 오늘을 살아가는 너에게", author: "전시회", date: "2024-08-10", views: 345, comments: 4, likes: 28 },
  { id: 710, title: "<안내>서울시 평생학습포털 모바일 접속 이벤트", author: "관리자", date: "2024-08-01", views: 198, comments: 2, likes: 11 },
  { id: 709, title: "<참여자모집>어린이리더십 강사과정 수강생 리얼 후기", author: "김미영", date: "2024-07-25", views: 678, comments: 15, likes: 56 },
  { id: 693, title: "어린이리더십 강사협회 아름다운 재단 수익 기부 소식", author: "사무국", date: "2024-05-15", views: 890, comments: 23, likes: 112 },
];

export default function FreeBoardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* 헤더 */}
        <section className="bg-gray-50 border-b border-gray-100 py-16">
           <div className="container mx-auto px-4 text-center">
             <h1 className="text-4xl font-black text-gray-900 mb-4">자유게시판</h1>
             <p className="text-gray-500 max-w-2xl mx-auto">
               회원님들의 자유로운 이야기와 유익한 정보를 나누는 공간입니다. <br />
               서로 존중하고 배려하는 마음으로 소통해주세요.
             </p>
           </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            {/* 툴바 */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
              <div className="text-sm font-bold text-gray-500">
                총 <span className="text-blue-600">{posts.length}</span>개의 이야기가 있습니다.
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                 <div className="relative flex-grow md:flex-grow-0">
                    <input 
                      type="text" 
                      placeholder="검색어 입력" 
                      className="w-full md:w-60 pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 </div>
                 <Link href="/free/write" className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 shrink-0">
                   <PenSquare className="w-4 h-4" />
                   글쓰기
                 </Link>
              </div>
            </div>

            {/* 게시판 리스트 */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div 
                  key={post.id}
                  className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2 text-xs font-medium text-gray-400">
                         <span className="flex items-center gap-1">
                           <User className="w-3 h-3" />
                           {post.author}
                         </span>
                         <span className="w-px h-3 bg-gray-200" />
                         <span>{post.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-1">
                        CLIA와 함께하는 즐거운 소통! 이 게시글은 자유롭게 작성된 내용의 미리보기입니다. 클릭하여 전체 내용을 확인하세요.
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-gray-400 text-sm font-medium pt-4 md:pt-0 border-t md:border-t-0 border-gray-50">
                       <div className="flex items-center gap-1.5 group-hover:text-red-500 transition-colors">
                         <Heart className="w-4 h-4" />
                         {post.likes}
                       </div>
                       <div className="flex items-center gap-1.5 group-hover:text-blue-500 transition-colors">
                         <MessageSquare className="w-4 h-4" />
                         {post.comments}
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 페이지네이션 */}
            <div className="mt-12 flex justify-center">
              <nav className="flex gap-1.5 bg-gray-50 p-1.5 rounded-xl">
                 {[1, 2, 3, 4].map((num) => (
                   <button 
                    key={num}
                    className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                      num === 1 
                        ? "bg-white text-blue-600 shadow-sm" 
                        : "text-gray-400 hover:text-gray-900 hover:bg-gray-200"
                    }`}
                   >
                     {num}
                   </button>
                 ))}
              </nav>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
