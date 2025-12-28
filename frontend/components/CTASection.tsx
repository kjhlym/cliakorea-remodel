"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 bg-blue-900">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-30 animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
          우리 아이의 가능성을 <br className="hidden md:block" />
          <span className="text-blue-400">리더십</span>으로 꽃피우세요.
        </h2>
        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
          CLIA 어린이 리더십 강사협회는 미래를 이끌어갈 아이들의 <br className="hidden md:block" />
          당당한 발걸음을 함께 응원하고 지원합니다.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/instructor-training"
            className="px-10 py-4 bg-white text-blue-900 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all transform hover:scale-105"
          >
            강사 양성 과정 알아보기
          </Link>
          <Link
            href="/consultation"
            className="px-10 py-4 bg-transparent border-2 border-white/40 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all"
          >
            교육 상담 신청
          </Link>
        </div>

        {/* 하단 신뢰 지표 (선택사항) */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-white text-sm font-semibold tracking-widest uppercase">Trusted by 100+ Schools</div>
          <div className="text-white text-sm font-semibold tracking-widest uppercase">Certified Instructors 500+</div>
          <div className="text-white text-sm font-semibold tracking-widest uppercase">10 Years of Excellence</div>
        </div>
      </div>
    </section>
  );
}
