
"use client";

import { useState, useEffect, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BookOpen, Users, Star, ArrowRight, CheckCircle2, Lightbulb, Target, Heart, Briefcase, GraduationCap } from "lucide-react";
import CTASection from "@/components/CTASection";

function ProgramsContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("children");

  useEffect(() => {
    const tab = searchParams.get("tab");
    const validTabs = ["children", "youth", "parent", "special", "instructor"];
    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const tabs = [
    { id: "children", label: "어린이 리더십" },
    { id: "youth", label: "청소년 리더십" },
    { id: "parent", label: "부모 리더십" },
    { id: "special", label: "특화 프로그램" },
    { id: "instructor", label: "강사양성" },
  ];

  const content = {
    children: {
      title: "어린이 리더십 프로그램",
      subtitle: "미래인재 핵심역량 4C를 키우는 리더십 교육",
      description: "어린이들이 스스로의 잠재력을 발견하고, 타인과 소통하며 협력하는 미래의 리더로 성장하도록 돕습니다.",
      features: [
        {
          title: "미래인재 핵심역량 4C",
          items: ["Communication (소통)", "Collaboration (협업)", "Critical Thinking (비판적 사고)", "Creativity (창의성)"]
        },
        {
          title: "일반과정 12차시",
          items: ["자아존중감 향상", "셀프 리더십", "소통과 배려", "비전 수립"]
        }
      ],
      color: "blue",
      icon: <Star className="w-12 h-12 text-blue-600" />,
      image: "/images/program-children.png"
    },
    youth: {
      title: "청소년 리더십 프로그램",
      subtitle: "진로와 인성을 아우르는 입체적 리더십",
      description: "청소년기에 필요한 진로 탐색과 올바른 인성 함양을 통해, 자신의 삶을 주도적으로 이끄는 리더로 육성합니다.",
      features: [
        {
          title: "진로 리더십",
          items: ["자신의 흥미와 적성 탐색", "주도적인 진로 설계", "직업 세계의 이해", "꿈을 향한 로드맵 작성"]
        },
        {
          title: "창의 인성 리더십",
          items: ["타인 존중과 공감 능력", "공동체 의식 함양", "창의적 문제 해결", "갈등 관리 및 소통"]
        }
      ],
      color: "purple",
      icon: <Target className="w-12 h-12 text-purple-600" />,
      image: "/images/program-youth.png"
    },
    parent: {
      title: "부모 리더십 프로그램",
      subtitle: "자녀와 함께 성장하는 부모를 위한 코칭",
      description: "부모가 변하면 아이도 변합니다. 올바른 양육 가치관을 정립하고 자녀의 든든한 멘토가 되어주세요.",
      features: [
        {
          title: "교육 대상",
          items: ["초/중/고등학생 자녀를 둔 학부모", "어린이집/유치원 자녀 학부모", "관공서/기업체 학부모 연수", "좋은 부모를 꿈꾸는 예비 부모"]
        },
        {
          title: "주요 교육 내용",
          items: ["자녀와의 효과적인 소통법", "감정 코칭 및 훈육", "자기주도학습 지도", "부모의 자존감 회복"]
        }
      ],
      color: "teal",
      icon: <Heart className="w-12 h-12 text-teal-600" />,
      image: "/images/about-vision.png"
    },
    special: {
      title: "특화 프로그램",
      subtitle: "시대의 흐름을 읽는 특별한 교육",
      description: "변화하는 사회 환경에 맞춰 필요한 역량을 기를 수 있는 주제별 특화 프로그램을 제공합니다.",
      features: [
        {
          title: "기업가정신 (Entrepreneurship)",
          items: ["도전정신과 혁신적 사고", "문제 해결 능력 함양", "스타트업 생태계 이해", "모의 창업 프로젝트"]
        },
        {
          title: "청소년 의회 프로그램",
          items: ["민주주의 의사결정 과정 체험", "토론과 협상 능력", "조례 제정 및 정책 제안", "리더십 실전 훈련"]
        }
      ],
      color: "orange",
      icon: <Lightbulb className="w-12 h-12 text-orange-600" />,
      image: "/images/main-banner-02.png"
    },
    instructor: {
      title: "강사양성 프로그램",
      subtitle: "전문성을 갖춘 교육 전문가로의 도약",
      description: "체계적인 커리큘럼과 실습을 통해 현장에서 바로 통하는 전문 강사를 양성합니다.",
      isInstructor: true,
      features: [
        {
          title: "운영 과정",
          items: ["어린이 리더십 강사 과정", "자기주도학습 지도사 과정", "진로 코칭 전문가 과정"]
        },
        {
          title: "자격 및 혜택",
          items: ["민간자격증 취득 지원", "협회 인증 강사 위촉", "강의 파견 및 취업 지원", "강사 역량 강화 워크숍"]
        }
      ],
      color: "indigo",
      icon: <Briefcase className="w-12 h-12 text-indigo-600" />,
      image: "/images/main-banner-03.png"
    }
  };

  const activeContent = content[activeTab as keyof typeof content];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* 상단 히어로 */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-6 animate-fade-in">교육 프로그램</h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto font-medium">
              CLIA만의 차별화된 교육 철학을 담은 <br className="md:hidden" />
              생애 주기별 맞춤 리더십 프로그램을 만나보세요.
            </p>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="sticky top-[72px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto no-scrollbar justify-start md:justify-center gap-2 py-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2.5 rounded-full text-sm md:text-base font-bold whitespace-nowrap transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            {/* 타이틀 및 설명 */}
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center mb-16 animate-fade-in">
               <div className="w-full md:w-1/2">
                  <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden shadow-2xl group">
                    <img 
                      src={(activeContent as any).image} 
                      alt={activeContent.title} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
               </div>
               <div className="w-full md:w-1/2 text-left">
                  <div className="flex items-center gap-4 mb-6">
                     <div className={`p-3 rounded-xl bg-${activeContent.color}-100`}>
                       {activeContent.icon}
                     </div>
                     <span className={`px-4 py-1.5 rounded-full bg-${activeContent.color}-50 text-${activeContent.color}-600 font-bold text-sm tracking-widest uppercase border border-${activeContent.color}-100`}>
                        {tabs.find(t => t.id === activeTab)?.label}
                     </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                    {activeContent.title}
                  </h2>
                  <p className={`text-xl font-bold text-${activeContent.color}-600 mb-6`}>{activeContent.subtitle}</p>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {activeContent.description}
                  </p>
               </div>
            </div>

            {/* 특징 카드 그리드 */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {activeContent.features.map((feature, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:scale-[1.02] transition-transform duration-300"
                >
                  <h3 className={`text-2xl font-black mb-6 flex items-center gap-2 text-${activeContent.color}-600`}>
                    <BookOpen className="w-6 h-6" />
                    {feature.title}
                  </h3>
                  <ul className="space-y-4">
                    {feature.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-gray-700 font-medium">
                        <CheckCircle2 className={`w-5 h-5 text-${activeContent.color}-500 shrink-0 mt-0.5`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 강사양성일 경우 추가 버튼 */}
            {(activeContent as any).isInstructor && (
              <div className="text-center mb-16">
                <Link
                  href="/instructor-training"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  <GraduationCap className="w-6 h-6" />
                  강사양성 과정 자세히 보기
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
            
            {/* 하단 배너 */}
             <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-2xl md:text-3xl font-black mb-6">
                   맞춤형 교육 상담이 필요하신가요?
                 </h3>
                 <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                   기관의 특성과 상황에 맞는 최적의 교육 프로그램을 제안해 드립니다. <br />
                   1회 특강부터 연차 프로그램까지 유연하게 구성 가능합니다.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Link
                     href="/consultation"
                     className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all"
                   >
                     교육 상담 신청하기
                   </Link>
                   <Link
                     href="/about/location"
                     className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl font-bold transition-all"
                   >
                     오시는 길
                   </Link>
                 </div>
               </div>
             </div>

          </div>
        </div>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

export default function ProgramsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <ProgramsContent />
    </Suspense>
  );
}
