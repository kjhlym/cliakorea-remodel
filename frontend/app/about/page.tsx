"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Heart, Shield, Target, Users } from "lucide-react";
import CTASection from "@/components/CTASection";
import SubNav from "@/components/SubNav";

const aboutNavItems = [
  { name: "협회소개", href: "/about" },
  { name: "인사말", href: "/about/greeting" },
  { name: "사명과 미션", href: "/about/mission" },
  { name: "활동과 발자취", href: "/about/activities" },
  { name: "찾아오시는 길", href: "/about/location" },
];


const values = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: "진정성 있는 교육",
    description: "단순한 지식 전달이 아닌 아이들의 마음을 움직이는 교육을 지향합니다.",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "주도적 성격 형성",
    description: "스스로 문제를 해결하고 목표를 설정하는 주도적인 글로벌 인재를 양성합니다.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "전문성 및 신뢰",
    description: "10년 이상의 노하우를 가진 최고의 강사진이 체계적인 커리큘럼을 제공합니다.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* 히어로 섹션 */}
        {/* 히어로 섹션 */}
        <section className="py-10 md:py-20 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-2xl md:text-5xl font-black text-white mb-4 md:mb-6 break-keep">
              미래의 리더를 키우는              
            </h1>
            <h1 className="text-2xl md:text-5xl font-black text-white mb-4 md:mb-6 break-keep">
              <span className="text-blue-500">가장 당당한 발걸음</span>
            </h1>
            <p className="text-sm md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed break-keep">
              CLIA 어린이 리더십 강사협회는 미래 세대가 자신의 잠재력을 발견하고, <br className="hidden md:block" />
              세상을 긍정적으로 변화시키는 리더로 성장할 수 있도록 돕는 전문 교육 기관입니다.
            </p>
          </div>
        </section>

        <SubNav items={aboutNavItems} />

        {/* 협회 철학 */}
        <section className="py-10 md:py-24 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center max-w-5xl mx-auto">
            <div className="relative mb-8 md:mb-0">
              <div className="aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="/images/about-vision.png" 
                  alt="협회 비전" 
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 md:mb-6 break-keep">우리의 소명</h2>
              <p className="text-sm md:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8 text-justify md:text-left break-keep">
                아이들은 태어날 때부터 각기 다른 모양의 리더십 씨앗을 가지고 태어납니다. 
                우리의 역할은 그 씨앗이 올바른 양분과 환경 속에서 찬란하게 꽃피울 수 있도록 
                전문적인 지도와 따뜻한 격려를 제공하는 것입니다.
              </p>
              <div className="space-y-4">
                {[
                  "현장 중심의 생생한 교육 프로그램 운영",
                  "검증된 리더십 전문 강사 양성 및 파견",
                  "가정과 학교를 잇는 소통형 교육 커뮤니티"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-gray-800 font-bold">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Award className="w-3 h-3" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 핵심 가치 */}
        <section className="py-10 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-16">
              <h3 className="text-blue-600 font-black uppercase tracking-widest text-xs md:text-sm mb-2 md:mb-3">Core Values</h3>
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 break-keep">CLIA가 추구하는 세 가지 가치</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {values.map((v) => (
                <div key={v.title} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 shrink-0 ${v.bgColor} ${v.color} rounded-2xl flex items-center justify-center`}>
                      {v.icon}                    
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{v.title}</h4>
                  </div>
                  <p className="text-gray-500 leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <CTASection /> */}
      </main>

      <Footer />
    </div>
  );
}
