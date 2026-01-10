"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-10 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 bg-blue-900">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-30 animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-xl md:text-5xl font-extrabold text-white mb-6 md:mb-8 leading-tight break-keep">
          우리 아이의 가능성을 <br className="hidden md:block" />
          <span className="text-blue-400">리더십</span>으로 꽃피우세요.
        </h2>
        <p className="text-sm md:text-xl text-blue-100 mb-2 md:mb-4 font-medium max-w-2xl mx-auto leading-relaxed break-keep">
          CLIA 어린이 리더십 강사협회는 미래를 이끌어갈 아이들의 <br className="hidden md:block" />
          당당한 발걸음을 함께 응원하고 지원합니다.
        </p>
        
      

      </div>
    </section>
  );
}
