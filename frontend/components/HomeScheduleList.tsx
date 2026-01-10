"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Schedule {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
  type?: string;
}

export default function HomeScheduleList() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch schedules from API
    const fetchSchedules = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/schedules?limit=9`);
        if (response.ok) {
          const data = await response.json();
          setSchedules(data.items || data);
        }
      } catch (error) {
        console.error("Failed to fetch schedules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-full">
        <h3 className="text-lg font-bold text-gray-900 mb-4">교육 일정</h3>
        <p className="text-gray-500 text-sm">로딩 중...</p>
      </div>
    );
  }

  // Triple the schedules for seamless loop
  const loopedSchedules = [...schedules, ...schedules, ...schedules];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">교육 일정</h3>
        <Link 
          href="/board/schedule"
          className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group"
        >
          <span>More</span>
          <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      {schedules.length === 0 ? (
        <p className="text-gray-500 text-sm">등록된 일정이 없습니다.</p>
      ) : (
        <div className="flex-1 overflow-hidden mb-6 relative" style={{ maxHeight: '450px' }}>
          <div className="schedule-scroll-container">
            <ul className="space-y-3">
              {loopedSchedules.map((schedule, index) => (
                <li key={`${schedule.id}-${index}`} className="border-l-4 border-blue-600 pl-3">
                  <p className="text-xs text-gray-500 mb-0.5">
                    {new Date(schedule.startDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <h4 className="font-semibold text-gray-900 text-xs leading-tight line-clamp-1">
                    {schedule.title}
                  </h4>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <div className="border-t border-gray-200 pt-4 mt-auto space-y-3">
        {/* Phone Numbers */}
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <div className="flex flex-col gap-1">
            <a 
              href="tel:070-4384-7849" 
              className="text-blue-600 font-bold text-base hover:text-blue-700 transition-colors"
            >
              070-4384-7849
            </a>
            <a 
              href="tel:010-5465-7745" 
              className="text-blue-600 font-bold text-base hover:text-blue-700 transition-colors"
            >
              010-5465-7745
            </a>
          </div>
        </div>

        {/* Naver Blog Button */}
        <a
          href="https://blog.naver.com/cliakorea"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm"
        >
          <span className="bg-white text-green-500 font-black text-xs px-1.5 py-0.5 rounded">N</span>
          <span>CLIA블로그</span>
        </a>
      </div>

      <style jsx>{`
        .schedule-scroll-container {
          animation: scroll-up 30s linear infinite;
        }

        .schedule-scroll-container:hover {
          animation-play-state: paused;
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.33%);
          }
        }
      `}</style>
    </div>
  );
}
