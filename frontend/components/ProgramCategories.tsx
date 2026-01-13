"use client";

import Link from "next/link";

// 프로그램 카테고리 데이터
const programCategories = [
  {
    id: 1,
    name: "어린이 리더십",
    englishName: "Children Leadership",
    description: "올바른 인성과 리더십의 기초를 다지는 초등학생 맞춤 교육",
    gradient: "from-orange-400 to-red-500",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    href: "/programs?tab=children",
  },
  {
    id: 2,
    name: "청소년 리더십",
    englishName: "Youth Leadership",
    description: "꿈과 비전을 구체화하고 주도적인 삶을 설계하는 성장 교육",
    gradient: "from-amber-400 to-yellow-600",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    href: "/programs?tab=youth",
  },
  {
    id: 3,
    name: "부모 리더십",
    englishName: "Parent Leadership",
    description: "자녀의 거울이 되는 부모를 위한 코칭 및 소통 전문 교육",
    gradient: "from-emerald-400 to-teal-600",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    href: "/programs?tab=parent",
  },
  {
    id: 4,
    name: "특화 프로그램",
    englishName: "Special Course",
    description: "창의적 사고와 문제 해결력을 키우는 맞춤형 심화 과정",
    gradient: "from-blue-400 to-indigo-600",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9l-.707.707M16.242 16.242l-.707.707M12 18a6 6 0 100-12 6 6 0 000 12z" />
      </svg>
    ),
    href: "/programs?tab=special",
  },
];

export default function ProgramCategories({ standalone = true }: { standalone?: boolean }) {
  const content = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6">
      {programCategories.map((program) => (
        <Link
          key={program.id}
          href={program.href}
          className="group relative bg-white rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col items-start text-left"
        >
          <div className="flex items-center gap-4 mb-3 md:mb-5">
            {/* 아이콘 컨테이너 */}
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${program.gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 flex-shrink-0`}>
              <div className="scale-90 md:scale-100">{program.icon}</div>
            </div>       

            <h4 className="text-lg md:text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
              {program.name}
            </h4>
          </div>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 break-keep">
            {program.description}
          </p>
          
          {/* 화살표 가이드 */}
          <div className="mt-auto flex items-center gap-2 text-blue-600 font-bold text-xs">
            <span>자세히 보기</span>
            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          {/* 하단 투명 장식 */}
          <div className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${program.gradient} opacity-[0.03] rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />
        </Link>
      ))}

      {/* 교육 신청 버튼 (모바일에서 카드들 다음에 위치) */}
      <Link
        href="/apply"
        className="group relative bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl p-6 transition-all shadow-lg hover:shadow-xl overflow-hidden"
      >
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h5 className="text-xl font-black mb-1">교육 신청</h5>
              <p className="text-sm text-blue-100 font-medium">협회의 다양한 교육 프로그램을 신청하세요.</p>
            </div>
          </div>
          <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      {/* 온라인 상담 버튼 (모바일에서 카드들 다음에 위치) */}
      <Link
        href="/consultation"
        className="group relative bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-2xl p-6 transition-all shadow-lg hover:shadow-xl overflow-hidden"
      >
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h5 className="text-xl font-black mb-1">온라인 상담</h5>
              <p className="text-sm text-purple-100 font-medium">궁금하신 점을 전문가에게 물어보세요.</p>
            </div>
          </div>
          <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
    </div>
  );

  if (!standalone) return content;

  return (
    <section className="py-10 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <h2 className="text-xs md:text-sm font-bold text-blue-600 tracking-widest uppercase mb-2 md:mb-3">
            Our Programs
          </h2>
          <h3 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 md:mb-6 break-keep">
            성장을 위한 맞춤형 리더십 과정
          </h3>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full" />
        </div>
        {content}
      </div>
    </section>
  );
}


