"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Image as ImageIcon, MapPin, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/CTASection";

// 협회활동 가상 데이터 (http://cliakorea.kr/bbs/?so_table=gallery 참조)
const activities = [
  { id: 462, title: "하안북중학교 리더십 캠프", location: "하안북중학교", date: "2025-10-15", image: "http://cliakorea.kr/banner/item/80.jpg" },
  { id: 461, title: "내손중고등학교 진로 특강", location: "내손중고등학교", date: "2025-10-15", image: "http://cliakorea.kr/banner/item/40.jpg" },
  { id: 460, title: "성남 성수초등학교 체험활동", location: "성남 성수초", date: "2025-10-15", image: "http://cliakorea.kr/banner/item/1.jpg" },
  { id: 459, title: "서울 진관초등학교 임원 리더십 교육", location: "서울 진관초", date: "2025-10-15", image: "http://cliakorea.kr/banner/item/2.jpg" },
  { id: 458, title: "남양주 광동중학교 진로 멘토링", location: "남양주 광동중", date: "2025-10-15", image: "http://cliakorea.kr/banner/item/40.jpg" },
  { id: 457, title: "고양 송산중학교 자유학년제 프로그램", location: "고양 송산중", date: "2025-10-15", image: "http://cliakorea.kr/banner/item/120.jpg" },
  { id: 456, title: "화성 이산고등학교 리더십 워크숍", location: "화성 이산고", date: "2025-10-15", image: "http://cliakorea.kr/banner/item/80.jpg" },
  { id: 455, title: "남양주 도제원초등학교 인성 교육", location: "남양주 도제원초", date: "2025-10-15", image: "http://cliakorea.kr/banner/item/1.jpg" },
  { id: 454, title: "고양 가좌고등학교 학생회 리더십 연수", location: "고양 가좌고", date: "2025-10-15", image: "http://cliakorea.kr/banner/item/2.jpg" },
  { id: 453, title: "성남 신흥초등학교 학급 임원 교육", location: "성남 신흥초", date: "2025-10-15", image: "http://cliakorea.kr/banner/item/120.jpg" },
  { id: 452, title: "서울 오륜초등학교 배려와 나눔 교육", location: "서울 오륜초", date: "2025-10-15", image: "http://cliakorea.kr/banner/item/40.jpg" },
  { id: 451, title: "중앙기독학교 리더십 페스티벌", location: "중앙기독학교", date: "2025-10-15", image: "http://cliakorea.kr/banner/item/80.jpg" },
];

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* 상단 히어로 */}
        <section className="bg-gradient-to-r from-blue-900 to-slate-900 py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="container mx-auto px-4 text-center relative z-10 text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-6">협회 활동</h1>
            <p className="text-xl text-blue-100 font-medium max-w-2xl mx-auto">
              전국 각지에서 펼쳐지는 CLIA의 생생한 교육 현장과 <br />
              다양한 활동 모습을 소개합니다.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="max-w-7xl mx-auto">
            {/* 필터 및 검색 */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
               <div className="flex gap-2">
                 {["전체", "초등학교", "중/고등학교", "기관/단체"].map((keyword, i) => (
                   <button 
                    key={i}
                    className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                      i === 0 
                        ? "bg-gray-900 text-white border-gray-900" 
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                   >
                     {keyword}
                   </button>
                 ))}
               </div>
               <div className="relative w-full md:w-auto">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <input
                   type="text"
                   placeholder="학교/기관명 검색"
                   className="w-full md:w-72 pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                 />
               </div>
            </div>

            {/* 갤러리 그리드 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity) => (
                <Link 
                  href={`/activities/${activity.id}`} 
                  key={activity.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                >
                  <div className="h-56 bg-gray-200 relative overflow-hidden">
                    <img 
                      src={activity.image} 
                      alt={activity.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30">
                        <ImageIcon className="w-3 h-3" />
                        사진 더 보기
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-600 mb-3 uppercase tracking-wide">
                      <MapPin className="w-3 h-3" />
                      {activity.location}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {activity.title}
                    </h3>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <Calendar className="w-4 h-4" />
                        {activity.date}
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 더보기 버튼 */}
            <div className="mt-16 text-center">
              <button className="px-10 py-3 bg-white border border-gray-200 text-gray-800 font-bold rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                활동 더 보기
              </button>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}
