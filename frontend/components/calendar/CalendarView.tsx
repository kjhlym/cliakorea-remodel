"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { scheduleAPI } from "../../lib/api/client";

interface Schedule {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  type: string;
  description?: string;
}

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [schedules, setSchedules] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 툴팁 상태 관리
  const [tooltip, setTooltip] = useState<{ x: number; y: number; data: any } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  useEffect(() => {
    fetchSchedules();
  }, [currentDate]);

  const fetchSchedules = async () => {
    setIsLoading(true);
    try {
      const data = await scheduleAPI.getSchedules(year, month);
      setSchedules(data as any[]);
    } catch (error) {
      console.error("Failed to fetch schedules", error);
    } finally {
      setIsLoading(false);
    }
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 2, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month, 1));
  };

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 0 = Sunday
  
  // Generate calendar grid
  const days = [];
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Group schedules by day
  const schedulesByDay: { [key: number]: Schedule[] } = {};
  schedules.forEach(schedule => {
    const date = new Date(schedule.startDate);
    // Only verify if it belongs to current month/year (backend filters, but good to be safe)
    if (date.getMonth() === month - 1 && date.getFullYear() === year) {
        const day = date.getDate();
        if (!schedulesByDay[day]) schedulesByDay[day] = [];
        schedulesByDay[day].push(schedule);
    }
  });

  const todayStr = new Date().toISOString().split('T')[0];

  const handleMouseEnter = (e: React.MouseEvent, data: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      x: rect.right + 10,
      y: rect.top,
      data
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">


      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Navigation */}
        {/* Navigation */}
        <div className="flex items-center gap-2 md:gap-4 text-gray-600">
          <button onClick={prevMonth} className="flex items-center hover:text-blue-600 font-bold text-sm md:text-base">
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            지난달
          </button>
          
          <div className="flex items-center gap-1 md:gap-2 text-lg md:text-xl font-bold text-gray-800">
            <div className="border border-gray-300 rounded px-2 md:px-3 py-1 bg-white">
              {year}
            </div>
            <div className="border border-gray-300 rounded px-2 md:px-3 py-1 bg-white">
              {month}
            </div>
          </div>

          <button onClick={nextMonth} className="flex items-center hover:text-blue-600 font-bold text-sm md:text-base">
            다음달
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Today */}
        <div className="text-gray-500 font-medium">
          Today : {todayStr}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border-t border-l border-gray-200 bg-white shadow-sm text-sm md:text-base selection:bg-none">
        {/* Header Row */}
        <div className="grid grid-cols-7 text-center">
            {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                <div 
                    key={day} 
                    className={`
                        py-2 md:py-3 font-bold border-r border-b border-gray-200
                        ${index === 0 ? 'bg-[#D30000] text-white' : ''}
                        ${index === 6 ? 'bg-[#0066CC] text-white' : ''}
                        ${index !== 0 && index !== 6 ? 'bg-gray-100 text-gray-700' : ''}
                    `}
                >
                    <span className="md:hidden">{day}</span>
                    <span className="hidden md:inline">{day}요일</span>
                </div>
            ))}
        </div>

        {/* Calendar Body */}
        <div className="grid grid-cols-7">
            {days.map((day, index) => {
                const isSunday = index % 7 === 0;
                const isSaturday = index % 7 === 6;
                const daySchedules = day ? schedulesByDay[day] : [];

                return (
                    <div 
                        key={index} 
                        className={`
                            min-h-[80px] md:min-h-[120px] p-1 md:p-2 border-r border-b border-gray-200 relative
                            ${!day ? 'bg-gray-50' : 'bg-white'}
                        `}
                    >
                        {day && (
                            <>
                                <span className={`
                                    text-sm md:text-lg font-bold block mb-1 md:mb-2
                                    ${isSunday ? 'text-red-600' : ''}
                                    ${isSaturday ? 'text-blue-600' : ''}
                                    ${!isSunday && !isSaturday ? 'text-gray-700' : ''}
                                `}>
                                    {day}
                                </span>
                                <div className="space-y-1">
                                    {daySchedules?.map(schedule => (
                                        <div 
                                            key={schedule.id}
                                            className="text-[10px] md:text-xs text-gray-600 bg-gray-50 px-1 py-0.5 md:p-1 rounded border border-gray-100 truncate cursor-pointer hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors"
                                            onMouseEnter={(e) => handleMouseEnter(e, schedule)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <span className="md:hidden block truncate">{schedule.title}</span>
                                            <span className="hidden md:block truncate">{schedule.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
            
            {/* Fill remaining cells to complete the row */}
            {Array.from({ length: (7 - (days.length % 7)) % 7 }).map((_, i) => (
                 <div key={`empty-${i}`} className="min-h-[80px] md:min-h-[120px] border-r border-b border-gray-200 bg-gray-50"></div>
            ))}
        </div>
      </div>
      
      {/* 툴팁 컴포넌트 (Portal) */}
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

      {/* Mobile note or responsive adjustments could go here */}
    </div>
  );
}
