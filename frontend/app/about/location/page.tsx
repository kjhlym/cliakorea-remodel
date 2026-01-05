"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import { MapPin, Phone, Mail, Clock, Navigation, Map as MapIcon } from "lucide-react";

declare global {
  interface Window {
    kakao: any;
  }
}

const LOCATION = {
  lat: 37.6541,
  lng: 127.0621,
  address: "서울시 노원구 동일로 182길 47-23 104호",
};

const KAKAO_KEY = "b27692e44c793331e6decc7a6de3b0ab";

export default function LocationPage() {
  const kakaoMapRef = useRef<HTMLDivElement>(null);
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // 이미 로드되어 있는지 확인
    if ((window as any).kakao && (window as any).kakao.maps) {
      setIsKakaoLoaded(true);
    }
  }, []);

  // 카카오맵 초기화
  useEffect(() => {
    const initMap = () => {
      const kakao = (window as any).kakao;
      if (!kakao || !kakao.maps) return;

      // autoload=false가 없으면 바로 실행 가능하지만, 
      // 만약의 경우를 대비해 load 함수 내에서 실행
      const container = kakaoMapRef.current;
      if (!container) return;

      // 기존 맵 내용 삭제
      container.innerHTML = '';

      const options = {
        center: new kakao.maps.LatLng(LOCATION.lat, LOCATION.lng),
        level: 3,
      };

      const map = new kakao.maps.Map(container, options);
      const markerPosition = new kakao.maps.LatLng(LOCATION.lat, LOCATION.lng);
      const marker = new kakao.maps.Marker({ position: markerPosition });
      marker.setMap(map);

      const infowindow = new kakao.maps.InfoWindow({
        content: '<div style="padding:10px;font-size:14px;font-weight:bold;white-space:nowrap;color:black;">어린이리더십강사협회</div>',
      });
      infowindow.open(map, marker);
    };

    if (isKakaoLoaded) {
      // 스크립트 로드 후 객체가 인식될 때까지 약간의 여유를 둠
      const timer = setTimeout(initMap, 500);
      return () => clearTimeout(timer);
    }
  }, [isKakaoLoaded]);

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&libraries=services,clusterer,drawing&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => {
          const kakao = (window as any).kakao;
          if (kakao && kakao.maps) {
            kakao.maps.load(() => setIsKakaoLoaded(true));
          }
        }}
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
                </div>

                <div className="p-8">
                  <div className="w-full h-[400px] bg-gray-100 rounded-2xl mb-6 relative overflow-hidden">
                    {/* 카카오맵 컨테이너 */}
                    <div
                      ref={kakaoMapRef}
                      style={{ 
                        width: '100%', 
                        height: '100%'
                      }}
                    />
                  </div>

                  <div className="flex justify-center">
                    <a
                      href={`https://map.kakao.com/link/search/${LOCATION.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-[#FAE100] text-[#371D1E] rounded-2xl font-black hover:shadow-xl transition-all shadow-md flex items-center gap-2"
                    >
                      카카오맵에서 크게 보기
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
