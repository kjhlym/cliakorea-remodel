"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Users, Award } from "lucide-react";
import SubNav from "@/components/SubNav";

const aboutNavItems = [
  { name: "협회개요", href: "/about" },
  { name: "인사말", href: "/about/greeting" },
  { name: "사명과 미션", href: "/about/mission" },
  { name: "활동과 발자취", href: "/about/activities" },
  { name: "찾아오시는 길", href: "/about/location" },
];

export default function GreetingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* 헤더 섹션 */}
        <section className="py-10 md:py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl md:text-5xl font-black text-gray-900 mb-4 md:mb-6">
              인사말
            </h1>
            <p className="text-sm md:text-xl text-gray-500 max-w-2xl mx-auto break-keep">
              어린이리더십강사협회를 찾아주신 여러분을 환영합니다
            </p>
          </div>
        </section>

        <SubNav items={aboutNavItems} />

        {/* 인사말 내용 */}
        <section className="py-10 md:py-24 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 회장 인사 */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-12 mb-8 md:mb-12">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center mb-6 md:mb-8">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shrink-0">
                  <Users className="w-12 h-12 md:w-16 md:h-16 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2 text-center md:text-left">
                    협회장 인사말
                  </h2>
                  <p className="text-sm md:text-base text-gray-500 text-center md:text-left">어린이리더십강사협회 회장</p>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6 text-gray-700 leading-relaxed text-sm md:text-base text-justify">
                <p className="text-base md:text-lg font-bold">
                  안녕하십니까, 어린이리더십강사협회 회장입니다.
                </p>
                <p>
                  우리 협회는 대한민국의 미래를 이끌어갈 어린이들에게 올바른 리더십 교육을 제공하고자 설립되었습니다. 
                  어린이 시기의 리더십 교육은 단순히 지식을 전달하는 것이 아니라, 
                  아이들이 스스로 생각하고 판단하며 책임감 있게 행동할 수 있는 능력을 키워주는 것입니다.
                </p>
                <p>
                  저희 협회는 전문성을 갖춘 강사진을 양성하고, 체계적인 교육 프로그램을 개발하여 
                  전국의 어린이들에게 양질의 리더십 교육을 제공하고 있습니다. 
                  또한 강사들의 지속적인 역량 강화를 위한 다양한 연수 프로그램과 
                  정보 교류의 장을 마련하고 있습니다.
                </p>
                <p>
                  앞으로도 어린이리더십강사협회는 어린이 교육의 질적 향상과 
                  강사들의 전문성 제고를 위해 최선을 다하겠습니다. 
                  여러분의 많은 관심과 참여를 부탁드립니다.
                </p>
                <p className="text-base md:text-lg font-bold text-gray-900 mt-6 md:mt-8">
                  감사합니다.
                </p>
              </div>
            </div>

            {/* 핵심 가치 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">전문성</h3>
                <p className="text-gray-600">
                  체계적인 교육과 지속적인 연수를 통한 전문 강사 양성
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">협력</h3>
                <p className="text-gray-600">
                  강사 간 네트워킹과 정보 공유를 통한 상호 발전
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">책임</h3>
                <p className="text-gray-600">
                  어린이 교육에 대한 사명감과 책임감 있는 자세
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
