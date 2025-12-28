"use client";

import Link from "next/link";

const quickMenus = [
  {
    name: "교육 신청",
    description: "협회의 다양한 교육 프로그램을 신청하세요.",
    href: "/apply",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    bgColor: "bg-blue-600",
    hoverBg: "hover:bg-blue-700",
  },
  {
    name: "온라인 상담",
    description: "궁금하신 점을 전문가에게 물어보세요.",
    href: "/consultation",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    bgColor: "bg-indigo-600",
    hoverBg: "hover:bg-indigo-700",
  },
];

export default function QuickMenu() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quickMenus.map((menu) => (
              <Link
                key={menu.name}
                href={menu.href}
                className={`group relative flex items-center p-8 rounded-3xl ${menu.bgColor} text-white shadow-xl ${menu.hoverBg} transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      {menu.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{menu.name}</h3>
                  </div>
                  <p className="text-blue-100 text-lg">{menu.description}</p>
                </div>
                
                <div className="ml-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>

                {/* 장식용 패턴 */}
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" fill="none" />
                    <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


