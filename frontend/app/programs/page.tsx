
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
    const validTabs = ["children", "youth", "special"];
    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const tabs = [
    { id: "children", label: "어린이 리더십" },
    { id: "youth", label: "청소년 리더십" },
    { id: "special", label: "환경 리더" },
  ];

  interface ProgramContent {
    title: string;
    subtitle: string;
    description: string;
    color: string;
    icon: React.ReactNode;
    image: string;
    features: { title: string; items: string[] }[];
    tableData?: { headers: string[]; rows: string[][] };
    additionalFeatures?: { title: string; desc: string }[];
    isInstructor?: boolean;
  }

  const content: Record<string, ProgramContent> = {
    children: {
      title: "어린이 리더십 프로그램",
      subtitle: "미래인재 핵심역량 4C를 키우는 리더십 교육",
      description: "어린이들이 스스로의 잠재력을 발견하고, 타인과 소통하며 협력하는 미래의 리더로 성장하도록 돕습니다.",
      additionalFeatures: [
        { title: "Communication (소통)", desc: "경청과 공감을 바탕으로 자신의 생각을 명확히 표현하며 긍정적 관계를 맺는 능력" },
        { title: "Collaboration (협업)", desc: "공동의 목표를 위해 친구들과 배려하고 협력하며 함께 성과를 만들어가는 태도" },
        { title: "Critical Thinking (비판적 사고)", desc: "주어진 상황을 스스로 분석하고 논리적으로 판단하여 올바른 결정을 내리는 힘" },
        { title: "Creativity (창의성)", desc: "새로운 관점으로 세상을 바라보고 독창적인 아이디어로 문제를 해결하는 능력" }
      ],
      features: [], // 테이블 데이터 사용
      tableData: {
        headers: ["차시", "대주제", "키워드(덕목)", "제 목", "기대 효과"],
        rows: [
          ["1", "리더와 리더십", "솔선수범, 책임", "나는 리더!\n나의 리더십 찾기", "리더의 특성과 역할\n나의 리더십 탐구"],
          ["2", "자기이해", "존중, 사랑", "나를 찾아가는 길", "내 안에 숨은 그림\n소중한 나.너.우리"],
          ["3", "의사소통", "공감, 경청", "소통도 연습이 필요해", "마음으로 듣고 말하기\n공감과 이해"],
          ["4", "다양성", "배려, 존중", "다른건 틀린게 아니야", "선입견 편견 깨기\n다름을 인정하기"],
          ["5", "갈등관리", "배려, 소통", "술술 풀어봐요", "갈등 관리\n서로의 마음 이해"],
          ["6", "의사결정", "결단, 합리성", "함께 결정해요", "나의 결정, 우리의 결정\n합리적 결정과 수용"],
          ["7", "창의적 문제해결", "창의성, 문제해결능력", "반짝반짝 풀어가요", "창의적 사고\n발상의 전환"],
          ["8", "팀빌딩", "협력, 소통", "나, 너, 우리", "나의 역할 찾기\n공동의 목표"],
          ["9", "스피치", "자신감, 용기", "리더의 스피치", "바른 태도와 목소리\n자신감 향상"],
          ["10", "토의토론", "경청, 설득력", "생각을 나누고 모으기", "생각하는 훈련\n논리적인 언어"],
          ["11", "꿈과 희망, 비전", "통찰, 실천", "비전을 찾아 떠나요", "미래의 꿈\n비전 설정"]
        ]
      },
      color: "blue",
      icon: <Star className="w-12 h-12 text-blue-600" />,
      image: "/images/program-children.png"
    },
    youth: {
      title: "청소년 리더십 프로그램",
      subtitle: "진로와 인성을 아우르는 입체적 리더십",
      description: "청소년기에 필요한 진로 탐색과 올바른 인성 함양을 통해, 자신의 삶을 주도적으로 이끄는 리더로 육성합니다.",
      features: [], // 테이블 데이터 사용
      tableData: {
        headers: ["차시", "대주제", "키워드", "제 목", "기대 효과"],
        rows: [
          ["1", "리더와 리더십\n(인물탐구)", "영향력, 태도,\n솔선수범", "함께하는 리더", "공동체 내에서 리더의 선택과 행동에\n대해 책임지는 태도 형성"],
          ["2", "팀빌딩", "소통, 협력, 배려", "팀으로 빛나다", "팀워크와 협동심, 타인에 대한 배려와\n신뢰감 증진"],
          ["3", "셀프리더십\n(자기이해)", "습관, 실천,\n주도성", "나만의 토핑 리더십", "자기이해를 바탕으로 소통과 책임감을\n가진 주도적 리더로 성장"],
          ["4", "의사소통", "존중, 경청, 공감", "유쾌한 티키타카", "효과적인 의사소통, 경청, 협상, 갈등\n해결 등 다양한 사회적 기술 향상"],
          ["5", "토의토론", "수용, 자신감,\n존중", "Do Learn (두런)", "발표, 토론, 팀활동 등에서 타인에 대한\n존중과 수용의 자세 향상"],
          ["6", "갈등관리", "합리성, 공감, 수용", "터놓고 말해요", "갈등의 의미 이해하고, 공동체 안에서\n발생하는 문제상황에 대한 역량 강화"],
          ["7", "다양성", "다름, 배려, 존중", "다름!\n그래서 아름다움", "글로벌 시민으로서 다양한 가치관을\n존중하는 마음가짐 형성"],
          ["8", "협상", "역지사지, 경청,\n자기효능감", "다리를 잇다", "자신의 의견을 표현하고, 상대방과의\n갈등을 조율하는 과정에서\n자기효능감 향상"],
          ["9", "창의적\n문제해결", "창의성, 도전,\n유연성", "생각발전소", "문제해결, 전략적 사고, 변화에 대한\n유연한 대응 등 핵심역량 강화"],
          ["10", "비전", "목표, 희망,\n비전", "포지티브 모멘텀", "자신의 목표를 구체적으로 설정하고,\n실천 능력 향상"]
        ]
      },
      color: "purple",
      icon: <Target className="w-12 h-12 text-purple-600" />,
      image: "/images/program-youth.png"
    },

    special: {
      title: "환경 리더 프로그램",
      subtitle: "생각을 넘어 행동하는 환경리더 되기",
      description: "환경 위기를 인식하고, 일상 속 지속 가능한 실천 능력을 함양하여 지구를 지키는 리더로 성장합니다.",
      features: [], // 테이블 데이터 사용
      tableData: {
        headers: ["차시", "대주제", "키워드", "제 목", "활 동"],
        rows: [
          ["1", "리더와 환경", "책임, 공감", "내가 먼저 시작하는 환경리더", "환경위기 시계 만들기\n생존 가방 꾸리기"],
          ["2", "탄소중립", "배려, 양심", "지구가 아파요", "탄소밸런스 활동 - 카드맞추기\n북극곰 구하기 젠가"],
          ["3", "제로 웨이스트", "협동, 진정성", "찾아보자, 다함께", "탄소중립 캘린더 만들기"],
          ["4", "생활 속 실천", "실천, 긍정", "지구를 위한 한걸음", "0.5도를 지키는 환경식단\n실천포스터 만들기"]
        ]
      },
      color: "green",
      icon: <Lightbulb className="w-12 h-12 text-green-600" />,
      image: "/images/environment.png"
    },

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
            {/* 4C 등 추가 설명 섹션 */}
            {(activeContent as any).additionalFeatures && (
               <div className="mb-12">
                 <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    미래인재 핵심역량 4C
                 </h3>
                 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                   {(activeContent as any).additionalFeatures.map((item: any, idx: number) => (
                     <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:-translate-y-1 transition-transform duration-300">
                       <div className="w-14 h-14 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 font-black text-2xl shadow-inner">
                          {item.title.charAt(0)}
                       </div>
                       <h4 className="font-bold text-gray-900 mb-2 text-center text-sm md:text-base break-keep">{item.title}</h4>
                       <p className="text-xs md:text-sm text-gray-600 text-center break-keep leading-relaxed">{item.desc}</p>
                     </div>
                   ))}
                 </div>
               </div>
            )}

            {/* 특징 카드 그리드 OR 테이블 */}
            {(activeContent as any).tableData ? (
              <div className="mb-16 overflow-hidden rounded-3xl border border-gray-200 shadow-xl bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className={`bg-${activeContent.color}-50 text-${activeContent.color}-900`}>
                        {(activeContent as any).tableData.headers.map((header: string, idx: number) => (
                          <th key={idx} className="p-4 md:p-5 text-sm md:text-lg font-black border-b border-gray-200 whitespace-nowrap text-center">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(activeContent as any).tableData.rows.map((row: string[], rowIdx: number) => (
                        <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
                          {row.map((cell, cellIdx) => (
                            <td key={cellIdx} className={`p-4 text-sm md:text-base text-gray-700 leading-relaxed align-middle ${cellIdx === 0 ? 'text-center font-bold text-gray-400 bg-gray-50/50' : 'text-center'}`}>
                              {cell.split('\n').map((line, i) => (
                                <span key={i} className="block">{line}</span>
                              ))}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
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
            )}

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
