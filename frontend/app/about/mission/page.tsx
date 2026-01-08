"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, Lightbulb, TrendingUp, Shield } from "lucide-react";
import SubNav from "@/components/SubNav";

const aboutNavItems = [
  { name: "협회개요", href: "/about" },
  { name: "인사말", href: "/about/greeting" },
  { name: "사명과 미션", href: "/about/mission" },
  { name: "활동과 발자취", href: "/about/activities" },
  { name: "찾아오시는 길", href: "/about/location" },
];

export default function MissionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* 헤더 섹션 */}
        <section className="py-10 md:py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl md:text-5xl font-black text-gray-900 mb-4 md:mb-6">
              사명과 미션
            </h1>
            <p className="text-sm md:text-xl text-gray-500 max-w-2xl mx-auto break-keep">
              미래의 글로벌 리더를 양성하는 어린이리더십강사협회
            </p>
          </div>
        </section>

        <SubNav items={aboutNavItems} />

        {/* 사명 */}
        <section className="py-10 md:py-24 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-xs md:text-sm font-bold mb-4 md:mb-6">
                <Target className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="text-2xl md:text-5xl font-black mb-6 md:mb-8">
                우리의 사명
              </h2>
              <p className="text-sm md:text-xl leading-relaxed opacity-90 text-justify md:text-center whitespace-pre-line break-keep">
                새로운 미래의 주역으로 활약할 청소년들에게 리더로서의 자질과 품성을 개발하고, 
                창의적인 생각과 자율적인 행동을 통해 민주사회의 일원으로 성장하는 것을 돕는다. 
                또한 청소년들이 긍정과 소통의 힘을 발휘하여 글로벌 리더로서 비전을 실현하는데 
                조력자로서 사명을 다한다.
              </p>
            </div>
          </div>
        </section>

        {/* 핵심 미션 */}
        <section className="py-10 md:py-24 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-black text-center text-gray-900 mb-8 md:mb-16">
              핵심 가치
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 미션 1: 사람됨 */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-blue-100 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">
                  선한 영향력을 끼치는<br />
                  <span className="text-blue-600">"사람됨"</span>
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>밝고, 긍정적인 태도를 가진 사람</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>스스로 변화 성장하고 발전하는 사람</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>잠재능력을 발휘하며 나만의 탁월함을 찾아 영향력을 발휘하는 사람</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>작은 결정부터 주체적으로 선택하며 책임지는 사람</span>
                  </li>
                </ul>
              </div>

              {/* 미션 2: 하나됨 */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-indigo-100 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">
                  행동으로 영향력을 보여주는<br />
                  <span className="text-indigo-600">"하나됨"</span>
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>타인과의 협력으로 시너지를 만드는 팀빌딩 훈련</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>승·승 패러다임을 익히는 문제해결 훈련</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>창조적인 생각으로 비전을 세우는 훈련</span>
                  </li>
                </ul>
              </div>

              {/* 미션 3: 리더됨 */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">
                  올바른 영향력을 미치는<br />
                  <span className="text-purple-600">"리더됨"</span>
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">•</span>
                    <span>모두가 내 삶의 주인공이 되는 리더십 프로그램</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">•</span>
                    <span>건전한 민주시민양성을 위한 민주시민교육 프로그램</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">•</span>
                    <span>4차 산업혁명 시대에 요구되는 미래인재 양성 핵심역량 4C 프로그램</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">•</span>
                    <span>자신의 미래를 스스로 계획하는 진로/기업가정신 프로그램</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
