"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import { MapPin, Phone, Mail, Clock, Navigation, Map as MapIcon } from "lucide-react";

declare global {
  interface Window {
    kakao: any;
    google: any;
  }
}

const LOCATION = {
  lat: 37.6541,
  lng: 127.0621,
  address: "서울시 노원구 동일로 182길 47-23 104호",
};

export default function LocationPage() {
  const kakaoMapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<HTMLDivElement>(null);
  const [activeMap, setActiveMap] = useState<"kakao" | "google">("kakao");
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  // 카카오맵 초기화
  useEffect(() => {
    if (activeMap === "kakao" && isKakaoLoaded && kakaoMapRef.current) {
      const initKakaoMap = () => {
        if (!window.kakao || !window.kakao.maps) return;

        const options = {
          center: new window.kakao.maps.LatLng(LOCATION.lat, LOCATION.lng),
          level: 3,
        };

        const map = new window.kakao.maps.Map(kakaoMapRef.current, options);
        const markerPosition = new window.kakao.maps.LatLng(LOCATION.lat, LOCATION.lng);
        const marker = new window.kakao.maps.Marker({ position: markerPosition });
        marker.setMap(map);

        const infowindow = new window.kakao.maps.InfoWindow({
          content: '<div style="padding:10px;font-size:14px;font-weight:bold;">어린이리더십강사협회</div>',
        });
        infowindow.open(map, marker);
      };

      window.kakao.maps.load(initKakaoMap);
    }
  }, [activeMap, isKakaoLoaded]);

  // 구글맵 초기화
  useEffect(() => {
    if (activeMap === "google" && isGoogleLoaded && googleMapRef.current) {
      if (!window.google || !window.google.maps) return;

      const map = new window.google.maps.Map(googleMapRef.current, {
        center: { lat: LOCATION.lat, lng: LOCATION.lng },
        zoom: 17,
      });

      const marker = new window.google.maps.Marker({
        position: { lat: LOCATION.lat, lng: LOCATION.lng },
        map: map,
        title: "어린이리더십강사협회",
      });

      const infowindow = new window.google.maps.InfoWindow({
        content: '<div style="color:black; padding:5px; font-weight:bold;">어린이리더십강사협회</div>',
      });
      infowindow.open(map, marker);
    }
  }, [activeMap, isGoogleLoaded]);

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
        strategy="lazyOnload"
        onLoad={() => setIsKakaoLoaded(true)}
      />
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        strategy="lazyOnload"
        onLoad={() => setIsGoogleLoaded(true)}
      />

      <div className="min-h-screen flex flex-col bg-white">
        <Header />

        <main className="flex-grow">
          {/* 헤더 섹션 */}
          <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                찾아오시는 길
              </h1>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                어린이리더십강사협회로 오시는 방법을 안내해 드립니다
              </p>
            </div>
          </section>

          {/* 연락처 정보 */}
          <section className="py-24 container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">주소</h3>
                  <p className="text-gray-900 font-bold">
                    서울시 노원구<br />
                    동일로 182길 47-23 104호
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
                  
                  {/* 지도 전환 탭 */}
                  <div className="flex bg-white/20 p-1 rounded-xl backdrop-blur-sm">
                    <button
                      onClick={() => setActiveMap("kakao")}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        activeMap === "kakao"
                          ? "bg-white text-blue-600 shadow-lg"
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      카카오맵
                    </button>
                    <button
                      onClick={() => setActiveMap("google")}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        activeMap === "google"
                          ? "bg-white text-blue-600 shadow-lg"
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      구글맵
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  <div className="w-full h-[400px] bg-gray-100 rounded-2xl mb-6 relative overflow-hidden">
                    {/* 카카오맵 컨테이너 */}
                    <div
                      ref={kakaoMapRef}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        display: activeMap === "kakao" ? "block" : "none" 
                      }}
                    />
                    
                    {/* 구글맵 컨테이너 */}
                    <div
                      ref={googleMapRef}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        display: activeMap === "google" ? "block" : "none" 
                      }}
                    />

                    {/* API 키 안내 메시지 (디버깅용, 키 없을 때만 표시 옵션 고려 가능) */}
                    {((activeMap === "kakao" && !process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY) || 
                      (activeMap === "google" && !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100/90 z-10">
                         <div className="text-center p-6">
                           <MapIcon className="w-12 h-12 text-gray-400 mx-auto mb-2"/>
                           <p className="text-gray-500 font-bold">API 키 설정이 필요합니다.</p>
                           <p className="text-sm text-gray-400">환경 변수를 확인해 주세요.</p>
                         </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    <a
                      href={`https://map.kakao.com/link/search/${LOCATION.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#FAE100] text-[#371D1E] rounded-2xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      카카오맵에서 크게 보기
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LOCATION.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-bold hover:border-blue-500 hover:text-blue-600 hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <img src="https://www.google.com/favicon.ico" alt="G" className="w-4 h-4" />
                      구글맵에서 크게 보기
                    </a>
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
                        <span className="font-bold">4호선 상계역</span> 1번 출구<br />
                        <span className="text-sm text-gray-600">도보 약 10분</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                      <div>
                        <span className="font-bold">4호선 노원역</span> 3번 출구<br />
                        <span className="text-sm text-gray-600">도보 약 15분</span>
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
                      <span className="text-sm">1155, 1156, 1165</span>
                    </li>
                    <li>
                      <span className="font-bold text-green-600">지선버스</span><br />
                      <span className="text-sm">1136, 1137, 1138</span>
                    </li>
                    <li>
                      <span className="font-bold text-red-600">마을버스</span><br />
                      <span className="text-sm">노원08, 노원09</span>
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
                      <span>동일로 → 동일로182길 진입</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>건물 주차장 이용 가능</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>네비게이션: 서울시 노원구 동일로182길 47-23</span>
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
                      <span>상계역 (도보 10분)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>노원역 (도보 15분)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>상계주공아파트 인근</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
