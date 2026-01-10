"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import SubNav from "@/components/SubNav";

const aboutNavItems = [
  { name: "협회소개", href: "/about" },
  { name: "인사말", href: "/about/greeting" },
  { name: "사명과 미션", href: "/about/mission" },
  { name: "활동과 발자취", href: "/about/activities" },
  { name: "찾아오시는 길", href: "/about/location" },
];

// Google Maps iframe에서는 좌표보다 주소 쿼리를 직접 사용하는 것이 정확하므로
// 표면적 텍스트용 상수는 유지합니다.
const LOCATION = {
  address: "서울 성북구 길음동 1276 길음 삼부컨버니언아파트 상가 102동 지층 53호",
};

export default function LocationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* 헤더 섹션 */}
        <section className="py-10 md:py-20 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-2xl md:text-5xl font-black text-white mb-4 md:mb-6">
              찾아오시는 길
            </h1>
            <p className="text-sm md:text-xl text-gray-400 max-w-2xl mx-auto break-keep">
              어린이리더십강사협회로 오시는 방법을 안내해 드립니다
            </p>
          </div>
        </section>

        <SubNav items={aboutNavItems} />

        {/* 연락처 정보 */}
        <section className="py-10 md:py-24 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">주소</h3>
                <p className="text-gray-900 font-bold">
                  서울 성북구 길음동 1276<br />
                  길음 삼부컨버니언아파트 상가 102동 지층 53호
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">대표번호</h3>
                <p className="text-gray-900 font-bold">
                  070-4384-7894<br />
                  010-5465-7745
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">이메일</h3>
                <p className="text-gray-900 font-bold break-all">
                  only.youplus@daum.net
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">운영시간</h3>
                <p className="text-gray-900 font-bold">
                  평일 09:00 - 18:00<br />
                  <span className="text-sm text-gray-500">(주말 및 공휴일 휴무)</span>
                </p>
              </div>
            </div>

            {/* 지도 영역 */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-16">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <Navigation className="w-6 h-6" />
                  오시는 길
                </h2>
              </div>

              <div className="p-8">
                <div className="w-full h-[400px] bg-gray-100 rounded-2xl relative overflow-hidden">
                  <iframe
                    title="어린이리더십강사협회 위치"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps?q=서울+성북구+길음동+1276&output=embed`}
                  />
                </div>
              </div>
            </div>

            {/* 교통편 안내 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                    🚇
                  </span>
                  지하철 이용 시
                </h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <div>
                      <span className="font-bold">4호선 길음역</span> 8번 출구<br />
                      <span className="text-sm text-gray-600">도보 약 5분</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-3xl p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                    🚌
                  </span>
                  버스 이용 시
                </h3>
                <ul className="space-y-4 text-gray-700">
                  <li>
                    <span className="font-bold text-blue-600">간선버스</span><br />
                    <span className="text-sm">100, 102, 103, 106, 107, 140, 142, 143, 150, 151, 152, 160, 171, 172, 710</span>
                  </li>
                  <li>
                    <span className="font-bold text-green-600">지선버스</span><br />
                    <span className="text-sm">1113, 1114, 1164, 1213, 7211</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                    🚗
                  </span>
                  자가용 이용 시
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>동소문로 → 길음역 방면 진입</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>건물 주차장 이용 가능</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>네비게이션: 서울 성북구 길음동 1276</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-6">
                  📍 주변 랜드마크
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>길음역 (도보 5분)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>길음 시장</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>길음역 8번 출구 인근</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
