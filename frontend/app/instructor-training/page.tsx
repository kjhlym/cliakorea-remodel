"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GraduationCap, Users, Laptop, Zap, CheckCircle2, ArrowRight, Award, Search } from "lucide-react";
import CTASection from "@/components/CTASection";
import Link from "next/link";

export default function InstructorTrainingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* 히어로 */}
        <section className="bg-gradient-to-br from-indigo-900 to-blue-900 text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              Professional Instructor Course
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              아이들의 미래를 바꿀 <br />
              <span className="text-blue-400">최고의 리더십 강사</span>에 도전하세요
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium">
              CLIA의 전문 커리큘럼을 통해 실무 역량을 갖춘 <br />
              리더십 전문가로 성장할 수 있습니다.
            </p>
          </div>
        </section>

        {/* 운영 자격 과정 (핵심 콘텐츠) */}
        <section className="py-24 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-4">운영 자격 과정</h2>
              <p className="text-gray-600">협회에서 운영하는 전문 강사 양성 과정을 소개합니다.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                { 
                  title: "어린이 리더십 강사", 
                  desc: "어린이들의 잠재력을 깨우고 올바른 가치관을 심어주는 리더십 교육 전문가 과정입니다.", 
                  color: "blue",
                  features: ["미래인재 핵심역량 교육법", "아동 발달 심리 이해", "놀이 중심 리더십 코칭"]
                },
                { 
                  title: "자기주도학습 지도사", 
                  desc: "학생 스스로 학습 목표를 설정하고 달성하도록 돕는 러닝 코치 양성 과정입니다.", 
                  color: "indigo",
                  features: ["학습 동기 부여 전략", "시간 관리 및 플래닝 지도", "메타인지 학습법 코칭"]
                },
                { 
                  title: "진로코칭 전문가", 
                  desc: "청소년들이 자신의 적성과 흥미를 발견하고 미래를 설계하도록 돕는 멘토 과정입니다.", 
                  color: "purple",
                  features: ["진로 심리 검사 활용", "직업 세계의 변화 이해", "커리어 로드맵 설계 지도"]
                }
              ].map((course, idx) => (
                <div key={idx} className={`group bg-white rounded-[2rem] p-8 border border-gray-100 hover:border-${course.color}-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col`}>
                  <div className={`w-14 h-14 rounded-2xl bg-${course.color}-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Award className={`w-7 h-7 text-${course.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h3>
                  <p className="text-gray-500 mb-6 leading-relaxed flex-grow">{course.desc}</p>
                  
                  <div className="space-y-3 pt-6 border-t border-gray-50">
                    {course.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2 className={`w-4 h-4 text-${course.color}-500`} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 자격증 조회 링크 (program05.php 참조) */}
            <div className="bg-gray-50 rounded-3xl p-10 md:p-14 text-center border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">민간자격 정식 등록 기관</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                본 협회의 자격 과정은 한국직업능력연구원에 정식 등록된 민간자격입니다.<br />
                투명하고 신뢰할 수 있는 자격증 발급을 보장합니다.
              </p>
              <a 
                href="https://www.pqi.or.kr/inf/qul/infQulList.do" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-gray-300 rounded-full font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
              >
                <Search className="w-5 h-5 text-gray-500" />
                민간자격 정보 조회하기
              </a>
            </div>
          </div>
        </section>

        {/* 교육 혜택 */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
             <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-black mb-16 text-center">CLIA 강사만의 특별한 혜택</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { icon: <GraduationCap className="w-10 h-10" />, title: "전문 자격증 발급", desc: "협회 공식 인증 강사 자격증 수여 (자격기본법 준수)" },
                    { icon: <Users className="w-10 h-10" />, title: "취업 및 파견 지원", desc: "학교, 도서관, 관공서 등 다양한 교육 기관 강의 기회 제공" },
                    { icon: <Laptop className="w-10 h-10" />, title: "최신 교안 제공", desc: "현장에서 즉시 사용 가능한 실전 교안 및 PPT 자료 제공" },
                    { icon: <Zap className="w-10 h-10" />, title: "보수 교육 무료", desc: "강사 역량 강화를 위한 정기 보수 교육 및 세미나 지원" },
                  ].map((item, i) => (
                    <div key={i} className="p-8 rounded-3xl bg-gray-800 hover:bg-gray-700 transition-all duration-300">
                      <div className="text-blue-400 mb-6">{item.icon}</div>
                      <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </section>

        {/* 커리큘럼 리스트 (공통 프로세스) */}
        <section className="py-24 container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-black mb-16 text-center text-gray-900">표준 양성 커리큘럼</h2>
              <div className="space-y-12">
                {[
                  { step: "01", title: "이론 및 철학 (Theory)", items: ["리더십의 역사와 현대적 의미", "대상별(아동/청소년) 발달 심리학", "CLIA 교육 철학의 이해"] },
                  { step: "02", title: "교수 설계 및 실습 (Practice)", items: ["학습자 중심의 수업 설계(Instructional Design)", "창의적 교구 개발 및 활용법", "효과적인 아이스브레이킹 기법"] },
                  { step: "03", title: "시연 및 피드백 (Demonstration)", items: ["신뢰감을 주는 발성/발음 및 스피치 훈련", "모의 강의 시연 및 전문가 1:1 피드백", "돌발 상황 대처 및 클래스 매니지먼트"] },
                ].map((c) => (
                  <div key={c.step} className="flex gap-8 md:gap-16 items-start">
                    <span className="text-6xl font-black text-gray-100 leading-none select-none">{c.step}</span>
                    <div className="pt-2">
                      <h4 className="text-2xl font-bold mb-4 text-gray-900">{c.title}</h4>
                      <div className="grid sm:grid-cols-1 gap-3">
                        {c.items.map((item) => (
                          <div key={item} className="flex items-start gap-3 text-gray-600">
                            <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <span className="text-base">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
