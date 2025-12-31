'use client';

import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function HomeScheduleList() {
  const { data: schedules } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/schedules`,
    fetcher
  );

  // 예정된 일정 필터링 및 현재 시간 기준 정렬
  const upcomingSchedules = schedules
    ? [...schedules]
        .sort((a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .filter((s: any) => new Date(s.endDate) >= new Date(new Date().setHours(0,0,0,0)))
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

  return (
    <div className="bg-[#EAEAEA] p-6 rounded-3xl h-full border border-gray-200 shadow-sm flex flex-col min-h-[460px]">
      <div className="mb-6 flex items-center justify-between flex-shrink-0">
        <h2 className="text-[22px] font-black text-gray-700 uppercase tracking-tighter">CLIA 교육일정</h2>
        <Link href="/board/schedule" className="text-[11px] font-bold text-gray-400 hover:text-blue-600 uppercase tracking-tighter">
          More +
        </Link>
      </div>

      <div className="overflow-hidden relative flex-grow" style={{ height: '360px' }}>
        {hasData ? (
          <div 
            className="flex flex-col gap-2"
            style={{ 
              animation: `v-scroll ${duration}s linear infinite`,
              willChange: 'transform'
            }}
          >
            {displaySchedules.map((s: any, idx) => (
              <Link 
                key={`${s.id}-${idx}`} 
                href="/board/schedule" 
                className="flex items-start gap-5 group cursor-pointer py-2 border-b border-gray-300/30 last:border-0"
              >
                <span className="text-[16px] font-bold text-gray-400 whitespace-nowrap mt-0.5 tracking-tighter tabular-nums">
                  {formatDate(s.startDate)}--0
                </span>
                <span className="text-[18px] font-black text-gray-700 group-hover:text-blue-600 transition-colors leading-tight truncate">
                  {s.title}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-400 font-bold text-xl">
            등록된 일정이 없습니다.
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes v-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-${100 / repeatCount}%); }
        }
      `}</style>
    </div>
  );
}
