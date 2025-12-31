'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function ScheduleTicker() {
  const { data: schedules } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/schedules`,
    fetcher
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  // 현재 날짜 기준 이후의 일정만 필터링 (가까운 순)
  const upcomingSchedules = schedules
    ? schedules
        .filter((s: any) => new Date(s.endDate) >= new Date())
        .sort((a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .slice(0, 5) // 최대 5개 노출
    : [];

  useEffect(() => {
    if (upcomingSchedules.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % upcomingSchedules.length);
      }, 5000); // 5초마다 전환
      return () => clearInterval(timer);
    }
  }, [upcomingSchedules]);

  if (!upcomingSchedules || upcomingSchedules.length === 0) return null;

  const current = upcomingSchedules[currentIndex];

  return (
    <div className="bg-blue-600 text-white overflow-hidden py-3 border-b border-blue-500 shadow-sm relative z-40">
      <div className="container mx-auto px-4 lg:px-20 flex items-center gap-4">
        {/* 라벨 */}
        <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
          <Calendar className="w-3 h-3" />
          <span>Education Schedule</span>
        </div>

        {/* 틱커 본문 */}
        <div className="flex-grow relative h-6 overflow-hidden">
          <Link 
            href="/board/schedule"
            key={current.id}
            className="absolute inset-0 flex items-center gap-3 animate-slide-up hover:opacity-80 transition-opacity"
          >
            <span className="font-bold text-sm truncate max-w-[200px] md:max-w-none">
                [{current.type === 'EDUCATION' ? '교육' : '행사'}] {current.title}
            </span>
            <span className="hidden md:inline px-2 py-0.5 bg-blue-700/50 rounded-lg text-[10px] font-medium border border-white/10">
              {new Date(current.startDate).toLocaleDateString()} - {new Date(current.endDate).toLocaleDateString()}
            </span>
            <ChevronRight className="w-4 h-4 text-white/50" />
          </Link>
        </div>

        {/* 카운터 (선택 사항) */}
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-black text-white/40">
          <span>{currentIndex + 1}</span>
          <div className="w-4 h-[1px] bg-white/20"></div>
          <span>{upcomingSchedules.length}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          0% { transform: translateY(100%); opacity: 0; }
          10% { transform: translateY(0); opacity: 1; }
          90% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
        .animate-slide-up {
          animation: slide-up 5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
