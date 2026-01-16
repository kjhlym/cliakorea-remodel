"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Award, Users, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import SubNav from "@/components/SubNav";

const aboutNavItems = [
  { name: "협회소개", href: "/about" },
  { name: "인사말", href: "/about/greeting" },
  { name: "사명과 미션", href: "/about/mission" },
  { name: "활동과 발자취", href: "/about/activities" },
  { name: "찾아오시는 길", href: "/about/location" },
];

export default function ActivitiesPage() {
  const activities = [
   {
      year: "2025",
      events: [
        { month: "", title: "학교로 찾아가는 리더십 교육", description: "경기도 교육청" },
        { month: "", title: "펜빌딩 교구제작", description: "" },
      ],
    },
   {
      year: "2024",
      events: [
        { month: "", title: "협회원 역량강화 교육 ", description: "디자인 씽킹 활용법" },
        { month: "", title: "시립성동 청소년 센터 교육봉사", description: "너와 나의 리더십 찾기" },
      ],
    },
    {
      year: "2023",
      events: [
        { month: "", title: "성북여성취업교육센터 협업", description: "어린이 리더십 강사 양성과정 진행" },
        { month: "", title: "강사파견 2,000개소 달성", description: "전국 초, 중, 고등학교 및 각종 리더십 교육 출강" },
      ],
    },
    {
      year: "2022",
      events: [
        { month: "", title: "하남시 청소년수련관 협업", description: "스쿨어택 공동체리더십프로그램 진행" },
        { month: "", title: "교재 리뉴얼", description: "어린이 리더십 강사과정 기본/심화과정" },
        { month: "", title: "민주시민교육 제안", description: "민주화운동기념사업회 협력운영사업" },
      ],
    },
    {
      year: "2021",
      events: [
        { month: "", title: "성북구 더불어 교실", description: "사업 신청 및 선정, 진행" },
        { month: "", title: "사무실 이전", description: "노원구 공릉동" },
        { month: "", title: "인성교육 프로그램 개발", description: "중, 고등학교 전용 프로그램" },
      ],
    },
    {
      year: "2020",
      events: [
        { month: "", title: "비대면 프로그램 개발", description: "원격 리더십 프로그램 개발 및 진행" },
        { month: "", title: "워크북 제작", description: "리더덕목, 리더인물, 의사결정 주제 워크북" },
      ],
    },
    {
      year: "2019",
      events: [
        { month: "", title: "양성평등 공로상 수상", description: "성북구 양성평등주간 기념" },
        { month: "", title: "지역아동 리더십 프로젝트", description: "꿈터지역아동센터 진행" },
        { month: "", title: "‘공자의 식탁’ 진행", description: "성북구마을사회적경제센터" },
      ],
    },
    {
      year: "2018",
      events: [
        { month: "", title: "강사파견 600여 개소", description: "초, 중, 고 학교 및 각 기관/단체" },
        { month: "7-9월", title: "어린이리더십강사양성 협약", description: "여성중앙회 협약 진행" },
        { month: "3-12월", title: "반디교육 파트너 협약", description: "아름다운재단 협약 진행" },
        { month: "", title: "교재/교구 개발 프로젝트", description: "자체 교재 및 교구 개발" },
        { month: "", title: "주민 역량강화 세미나", description: "지역거주 여성 민주시민의식 함양" },
      ],
    },
    {
      year: "2017",
      events: [
        { month: "", title: "강사파견 500여 개소", description: "초, 중, 고 학교 및 각 기관/단체" },
        { month: "6-10월", title: "강사역량강화교육 협약", description: "여성중앙회/여성발전기금" },
        { month: "3-12월", title: "반디교육 파트너 협약", description: "아름다운재단 협약 진행" },
        { month: "10-11월", title: "공유경제 아카데미", description: "성북구 사회적경제과 진행" },
      ],
    },
    {
      year: "2016",
      events: [
        { month: "", title: "강사파견 400여 개소", description: "초, 중, 고 학교 및 각 기관/단체" },
        { month: "3-10월", title: "마을주민커뮤니티 협약", description: "여성중앙회/성북구 사업" },
        { month: "3-12월", title: "반디교육 파트너 협약", description: "아름다운재단 협약 진행" },
        { month: "", title: "진로상담코칭전문가 자격", description: "민간자격취득 (2016-003239)" },
      ],
    },
    {
      year: "2015",
      events: [
        { month: "", title: "강사파견 300여 개소", description: "초, 중, 고 학교 및 각 기관/단체" },
        { month: "7-10월", title: "창의리더강사 양성 협약", description: "종로여성인력개발센터" },
        { month: "5-10월", title: "공유경제 활동가 양성 협약", description: "여성중앙회/성북구 사업" },
      ],
    },
    {
      year: "2014",
      events: [
        { month: "", title: "강사파견 250여 개소", description: "초, 중, 고 학교 및 각 기관/단체" },
        { month: "6-9월", title: "비영리 프로젝트 진행", description: "협회 단독 (성자초, 아리랑정보도서관)" },
      ],
    },
    {
      year: "2013",
      events: [
        { month: "", title: "강사파견 200여 개소", description: "초, 중, 고 학교 및 각 기관/단체" },
        { month: "8월", title: "제3회 리더십 캠프", description: "협회 주최 캠프 진행" },
      ],
    },
    {
      year: "2012",
      events: [
        { month: "", title: "강사파견 150여 개소", description: "초, 중, 고 학교 및 각 기관/단체" },
        { month: "4-10월", title: "역사리더강사과정 협약", description: "여성중앙회/여성발전기금" },
        { month: "8-9월", title: "서희리더십아카데미", description: "경기도 이천시청 지원사업 강사과정" },
        { month: "", title: "자기주도학습지도사 자격", description: "민간자격취득 (2012-0026)" },
      ],
    },
    {
      year: "2011",
      events: [
        { month: "", title: "강사파견 120여 개소", description: "초, 중, 고 학교 및 각 기관/단체" },
        { month: "", title: "어린이리더십강사 자격", description: "민간자격취득 (2010-0170)" },
        { month: "6-9월", title: "창의인성 리더십 과정", description: "마포구청/신한은행 협약" },
        { month: "8월", title: "제2회 리더십 캠프", description: "협회 주최 캠프 진행" },
        { month: "", title: "‘북 페스티발’ 참가", description: "성북문화재단 성북정보도서관 주최" },
      ],
    },
    {
      year: "2010",
      events: [
        { month: "", title: "서울시 비영리단체 등록", description: "등록번호: 제1131호" },
        { month: "", title: "강사파견 90여 개소", description: "초, 중, 고 학교 및 각 기관/단체" },
        { month: "5-7월", title: "여성부사업 협약 진행", description: "서부여성인력개발센터" },
        { month: "8-11월", title: "서울시사업 협약 진행", description: "종로여성인력개발센터" },
      ],
    },
    {
      year: "2009",
      events: [
        { month: "", title: "강사파견 50여 개소", description: "초, 중, 고 학교 및 각 기관/단체" },
        { month: "8월", title: "제1회 리더십 캠프", description: "협회 주최 캠프 진행" },
      ],
    },
    {
      year: "2008",
      events: [
        { month: "10월", title: "어린이리더십강사협회 창립", description: "협회 공식 출범" },
      ],
    },
  ];

  const [stats, setStats] = useState({
    instructorCount: "2,000+",
    programCount: "50+",
    partnerCount: "15+",
    historyYears: "16년",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/statistics`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setStats({
            instructorCount: data.instructorCount || "2,000+",
            programCount: data.programCount || "50+",
            partnerCount: data.partnerCount || "15+",
            historyYears: data.historyYears || "16년",
          });
        }
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      }
    };
    fetchStats();
  }, []);

  const achievements = [
    {
      icon: Users,
      number: stats.instructorCount,
      label: "강사 파견 (누적)",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: BookOpen,
      number: stats.programCount,
      label: "교육 프로그램",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: Award,
      number: stats.partnerCount,
      label: "주요 협약 기관",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Calendar,
      number: stats.historyYears,
      label: "교육 역사",
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* 헤더 섹션 */}
        <section className="py-10 md:py-20 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-2xl md:text-5xl font-black text-white mb-4 md:mb-6">
              활동과 발자취
            </h1>
            <p className="text-sm md:text-xl text-gray-400 max-w-2xl mx-auto break-keep">
              어린이 리더십 교육을 위한 끔임없는 열정과 도전
            </p>
          </div>
        </section>

        <SubNav items={aboutNavItems} />

        {/* 주요 성과 */}
        <section className="py-24 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black text-center text-gray-900 mb-16">
              Number of CLIA
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievements.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-2 whitespace-nowrap">
                    {item.number}
                  </div>
                  <div className="text-gray-600 font-bold text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 연혁 */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-black text-center text-gray-900 mb-16">
                걸어온 길
              </h2>

              <div className="space-y-12">
                {activities.map((yearData, yearIndex) => (
                  <div key={yearIndex}>
                    {/* 연도 헤더 */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="text-5xl font-black text-blue-600">
                        {yearData.year}
                      </div>
                      <div className="flex-grow h-1 bg-gradient-to-r from-blue-600 to-transparent rounded-full"></div>
                    </div>

                    {/* 이벤트 목록 */}
                    <div className="space-y-6 pl-8 border-l-4 border-blue-200">
                      {yearData.events.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 ml-8 hover:shadow-xl transition-all duration-300"
                        >
                          {/* 타임라인 점 */}
                          <div className="absolute -left-[3.25rem] top-6 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>

                          <div className="flex items-start gap-4">
                            {event.month && (
                              <div className="shrink-0">
                                <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold whitespace-nowrap">
                                  {event.month}
                                </div>
                              </div>
                            )}
                            <div className="flex-grow">
                              <h3 className="text-lg font-black text-gray-900 mb-1">
                                {event.title}
                              </h3>
                              <p className="text-gray-600 text-sm">{event.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
