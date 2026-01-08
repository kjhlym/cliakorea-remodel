'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useSWR from 'swr';
import Link from 'next/link';
import { Phone } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(r => r.json());

interface Schedule {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  type: string;
  description?: string;
}

export default function HomeScheduleList() {
  const { data: schedules } = useSWR<Schedule[]>(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/schedules`,
    fetcher
  );

  const [tooltip, setTooltip] = useState<{ x: number; y: number; data: Schedule } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 예정된 일정 필터링 및 현재 시간 기준 정렬
  const upcomingSchedules = schedules
    ? [...schedules]
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .filter((s) => new Date(s.endDate) >= new Date(new Date().setHours(0,0,0,0)))
    : [];

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const hasData = upcomingSchedules.length > 0;
  
  // 끊김 없는 무한 스크롤을 위해 넉넉하게 복제 (최소 20개 이상의 아이템이 되도록)
  const repeatCount = hasData ? Math.ceil(20 / upcomingSchedules.length) + 1 : 0;
  const displaySchedules = hasData ? Array(repeatCount).fill(upcomingSchedules).flat() : [];

  // 애니메이션 속도 계산 (아이템당 약 2~3초)
  const duration = hasData ? Math.max(upcomingSchedules.length * 2.5, 15) : 0;

  // 마우스 진입 시 위치 계산 및 툴팁 표시
  const handleMouseEnter = (e: React.MouseEvent, data: Schedule) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // 툴팁 위치 계산 (화면 밖으로 나가지 않도록 조정 로직 추가 가능)
    setTooltip({
      x: rect.right + 15,
      y: rect.top,
      data
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className="bg-[#EAEAEA] p-4 rounded-3xl h-full border border-gray-200 shadow-sm flex flex-col min-h-[340px] relative">
      <div className="mb-4 flex items-center justify-between flex-shrink-0">
        <h2 className="text-[16px] font-black text-gray-700 uppercase tracking-tighter">CLIA 교육일정</h2>
        <Link href="/board/schedule" className="text-[9px] font-bold text-gray-400 hover:text-blue-600 uppercase tracking-tighter">
          More +
        </Link>
      </div>

      <div className="overflow-hidden relative flex-grow mb-4 group" style={{ height: '280px' }}>
        {hasData ? (
          <div 
            className="flex flex-col hover:[animation-play-state:paused]"
            style={{ 
              animation: `v-scroll ${duration}s linear infinite`,
              willChange: 'transform'
            }}
          >
            {displaySchedules.map((s, idx) => (
              <Link 
                key={`${s.id}-${idx}`} 
                href="/board/schedule" 
                className="flex items-center gap-3 group/item cursor-pointer h-[40px] border-b border-gray-300/30 last:border-0"
                onMouseEnter={(e) => handleMouseEnter(e, s)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="text-[12px] font-bold text-gray-400 whitespace-nowrap tracking-tighter tabular-nums">
                  {formatDate(s.startDate)}
                </span>
                <span className="text-[13px] font-black text-gray-700 group-hover/item:text-blue-600 transition-colors leading-tight truncate">
                  {s.title}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-400 font-bold text-lg">
            등록된 일정이 없습니다.
          </div>
        )}
      </div>

      {/* 툴팁 컴포넌트 (Portal using createPortal) */}
      {mounted && tooltip && createPortal(
        <div 
          className="fixed z-[99999] bg-gray-900/95 text-white p-4 rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm pointer-events-none animate-in fade-in zoom-in-95 duration-200 w-[280px]"
          style={{ 
            left: tooltip.x, 
            top: tooltip.y,
            transform: 'translateY(-10px)'
          }}
        >
          {/* 말풍선 화살표 */}
          <div className="absolute top-[20px] -left-2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-gray-900/95 border-b-[6px] border-b-transparent" />
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                tooltip.data.type === 'EDUCATION' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'
              }`}>
                {tooltip.data.type || '일정'}
              </span>
              <span className="text-[10px] text-gray-400 font-medium tracking-tight">
                {new Date(tooltip.data.startDate).toLocaleDateString()}
              </span>
            </div>
            
            <h4 className="font-bold text-sm text-blue-300 leading-snug">
              {tooltip.data.title}
            </h4>
            
            {tooltip.data.description && (
              <p className="text-xs text-gray-200 leading-relaxed font-medium break-keep whitespace-pre-wrap border-t border-gray-700/50 pt-2 mt-2">
                {tooltip.data.description}
              </p>
            )}
            {!tooltip.data.description && (
              <p className="text-xs text-gray-500 italic pt-1">
                상세 내용이 없습니다.
              </p>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* 추가 구성 섹션: 연락처 및 링크 */}
      <div className="mt-auto pt-4 border-t border-gray-300 flex-shrink-0">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500 animate-[wiggle_0.5s_ease-in-out_infinite]" />
              
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <p className="text-base md:text-xl font-black text-blue-600 hover:underline tracking-tighter">
                070-4384-7849
              </p>
              <p className="text-base md:text-xl font-black text-blue-600 hover:underline tracking-tighter">
                010-5465-7745
              </p>
            </div>
          </div>
          <a 
            href="https://nid.naver.com/nidlogin.login" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2 bg-[#03C75A] text-white rounded-lg text-[11px] font-bold hover:bg-[#02b351] transition-colors shadow-sm"
          >
            <span className="w-3.5 h-3.5 bg-white text-[#03C75A] flex items-center justify-center rounded-sm text-[9px] font-black">N</span>
            CLIA블로그
          </a>
        </div>
      </div>

      <style jsx global>{`
        @keyframes v-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-${100 / repeatCount}%); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
      `}</style>
    </div>
  );
}
