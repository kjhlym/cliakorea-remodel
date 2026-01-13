"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// cliakorea.kr 실제 배너 이미지
const carouselImages = [
  {
    src: "/images/main-banner-01.png",
    alt: "어린이 리더십 강사협회 메인 배너 1",
    title: "미래를 이끄는 리더십",
    subtitle: "창의적인 교육으로 어린이의 잠재력을 깨웁니다.",
  },
  {
    src: "/images/main-banner-02.png",
    alt: "어린이 리더십 강사협회 메인 배너 2",
    title: "글로벌 인재 양성",
    subtitle: "세계로 뻗어나가는 당당한 리더를 꿈꿉니다.",
  },
  {
    src: "/images/main-banner-03-new.png",
    alt: "어린이 리더십 강사협회 메인 배너 3",
    title: "전문 강사 커뮤니티",
    subtitle: "최고의 강사진과 함께하는 성장의 발판이 되어드립니다.",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 다음 이미지로 이동
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  }, []);

  // 이전 이미지로 이동
  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length
    );
  };

  // 특정 인덱스로 이동
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // 자동 슬라이더 (6초마다 자동 전환)
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  return (
    <section 
      className="relative w-full h-[56vh] min-h-[420px] overflow-hidden bg-gray-900 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 배경 이미지 레이어 */}
      <div className="absolute inset-0 z-0">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover object-center brightness-75"
              priority={index === 0}
              sizes="100vw"
              quality={100}
            />
            {/* 오버레이 효과 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          </div>
        ))}
      </div>

      {/* 콘텐츠 영역 (텍스트 제어) */}
      <div className="relative z-10 h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
        <div 
          className="max-w-4xl backdrop-blur-md bg-white/10 p-5 md:p-8 rounded-2xl border border-white/20 shadow-2xl animate-fade-in"
          key={currentIndex} // 인덱스 변경 시 리렌더링으로 애니메이션 유도
        >
          <span className="inline-block px-3 py-0.5 mb-3 bg-blue-600/80 text-white text-xs font-bold uppercase tracking-widest rounded-full backdrop-blur-sm">
            Children Leadership Instructor Association
          </span>
          <h1 className="text-4xl md:text-4xl lg:text-4xl xl:text-4xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg break-keep">
            {carouselImages[currentIndex].title}
          </h1>
          <p className="text-sm md:text-lg text-gray-100 mb-6 font-medium drop-shadow-md break-keep">
            {carouselImages[currentIndex].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/programs"
              className="group relative px-4 py-1.5 md:px-5 md:py-2 bg-white text-blue-900 rounded-full font-bold text-xs md:text-sm hover:bg-blue-50 transition-all duration-300 shadow-xl overflow-hidden"
            >
              <span className="relative z-10">프로그램 구경하기</span>
              <div className="absolute inset-0 bg-blue-100/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </a>
           
          </div>
        </div>
      </div>

      {/* 이전/다음 버튼 */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button
          onClick={goToPrevious}
          className="bg-white/10 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-xl border border-white/20 shadow-2xl transition-all pointer-events-auto"
          aria-label="이전 이미지"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="bg-white/10 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-xl border border-white/20 shadow-2xl transition-all pointer-events-auto"
          aria-label="다음 이미지"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 인디케이터 (네비게이션 점) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`group relative h-4 transition-all duration-300 ${
              index === currentIndex ? "w-12" : "w-4 hover:w-6"
            }`}
            aria-label={`이미지 ${index + 1}로 이동`}
          >
            <div 
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" : "bg-white/40 hover:bg-white/60"
              }`} 
            />
          </button>
        ))}
      </div>

      {/* 하단 장식용 그라데이션 라인 */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-30" />
    </section>
  );
}


