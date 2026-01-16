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

  // 툴팁 및 모달 상태 관리
  const [tooltip, setTooltip] = useState<{ x: number; y: number; data: any } | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<any | null>(null);
  const [selectedDaySchedules, setSelectedDaySchedules] = useState<any[] | null>(null);
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

  const handleMouseEnter = (e: React.MouseEvent, items: any[]) => {
    // 테스크톱(호버 가능 장치)에서만 툴팁 표시
    if (window.matchMedia("(hover: hover)").matches) {
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltip({
        x: rect.right + 10,
        y: rect.top,
        data: items
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const handleScheduleClick = (schedule: any) => {
    setSelectedSchedule(schedule);
    setSelectedDaySchedules(null);
    setTooltip(null);
  };

  const handleMoreClick = (e: React.MouseEvent, items: any[]) => {
    e.stopPropagation();
    if (!window.matchMedia("(hover: hover)").matches) {
      setSelectedDaySchedules(items);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-1 md:p-4">


      <div className="flex flex-col md:flex-row justify-between items-center mb-2 md:mb-6 gap-2 md:gap-4">
        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 md:gap-8 text-gray-600 w-full md:w-auto">
          <button onClick={prevMonth} className="p-1 hover:text-blue-600 transition-colors">
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <div className="flex items-center gap-1.5 md:gap-2 text-base md:text-2xl font-black text-gray-900">
            <span>{year}년</span>
            <span>{month}월</span>
          </div>

          <button onClick={nextMonth} className="p-1 hover:text-blue-600 transition-colors">
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Today */}
        <div className="text-gray-500 font-medium text-[9px] md:text-sm">
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
                                h-[80px] md:h-[130px] p-1 md:p-2 border-r border-b border-gray-200 relative overflow-hidden
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
                                        {daySchedules?.slice(0, 1).map(schedule => (
                                            <div 
                                                key={schedule.id}
                                                className="text-[10px] md:text-sm text-gray-600 bg-gray-50 px-0.5 py-0.5 md:p-1 rounded border border-gray-100 truncate cursor-pointer hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors"
                                                onMouseEnter={(e) => handleMouseEnter(e, daySchedules)}
                                                onMouseLeave={handleMouseLeave}
                                                onClick={() => handleScheduleClick(schedule)}
                                            >
                                                {schedule.title}
                                            </div>
                                        ))}
                                        {daySchedules?.length > 1 && (
                                            <div 
                                                className="text-[10px] md:text-sm text-gray-400 bg-gray-100/50 px-1 py-0.5 md:p-1 rounded border border-dashed border-gray-200 text-center cursor-pointer hover:bg-gray-200 transition-colors font-black"
                                                onClick={(e) => handleMoreClick(e, daySchedules)}
                                                onMouseEnter={(e) => handleMouseEnter(e, daySchedules)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                ...
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                );
            })}
            
            {/* Fill remaining cells to complete the row */}
            {Array.from({ length: (7 - (days.length % 7)) % 7 }).map((_, i) => (
                 <div key={`empty-${i}`} className="h-[80px] md:h-[130px] border-r border-b border-gray-200 bg-gray-50"></div>
            ))}
        </div>
      </div>
      
      {/* 툴팁 컴포넌트 (Portal) */}
      {mounted && tooltip && createPortal(
        <div 
          className="fixed z-[99999] bg-gray-900/95 text-white p-4 rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm pointer-events-none animate-in fade-in zoom-in-95 duration-200 w-[280px] hidden md:block"
          style={{ 
            left: tooltip.x, 
            top: tooltip.y,
            transform: 'translateY(-10px)'
          }}
        >
          {/* 말풍선 화살표 */}
          <div className="absolute top-[20px] -left-2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-gray-900/95 border-b-[6px] border-b-transparent" />
          
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-700/50 pb-2 mb-2">
               <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                교육 일정 목록
              </h4>
              <span className="text-[10px] text-gray-500 font-medium">
                {tooltip.data?.length > 0 && new Date(tooltip.data[0].startDate).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
              </span>
            </div>
            
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
              {tooltip.data.map((item: any) => (
                <div key={item.id} className="relative pl-3 border-l-2 border-blue-500/50">
                  <h5 className="font-bold text-[11px] text-blue-300 leading-snug break-keep">
                    {item.title}
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

       {/* 모바일용 상세 모달 */}
      {mounted && selectedSchedule && createPortal(
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedSchedule(null)}>
           <div 
            className="bg-white w-full max-w-[280px] rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-300"
            onClick={(e) => e.stopPropagation()}
           >
              <div className="p-5 bg-[#0066CC] text-white">
                <div className="flex justify-end items-start mb-2">
                  <button 
                    onClick={() => setSelectedSchedule(null)}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <h3 className="text-lg font-black leading-tight break-keep">
                  {selectedSchedule.title}
                </h3>
                <p className="mt-1.5 text-white/70 text-[11px] font-bold">
                  {new Date(selectedSchedule.startDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              
              <div className="p-5 bg-white">
                <div className="mb-5">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 italic">DESCRIPTION</h4>
                  {selectedSchedule.description ? (
                    <p className="text-gray-700 text-xs leading-relaxed whitespace-pre-wrap break-keep font-medium">
                      {selectedSchedule.description}
                    </p>
                  ) : (
                    <p className="text-gray-400 text-xs italic">상세 내용이 없습니다.</p>
                  )}
                </div>
                
                <button
                  onClick={() => setSelectedSchedule(null)}
                  className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 text-sm font-black rounded-xl border border-gray-100 transition-all"
                >
                  확인
                </button>
              </div>
           </div>
        </div>,
        document.body
      )}

      {/* 모바일용 전체 일정 목록 모달 */}
      {mounted && selectedDaySchedules && createPortal(
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedDaySchedules(null)}>
           <div 
            className="bg-white w-full max-w-[280px] rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-300 flex flex-col max-h-[70vh]"
            onClick={(e) => e.stopPropagation()}
           >
              <div className="p-5 bg-gray-900 text-white flex justify-between items-center">
                <h3 className="text-sm font-black uppercase tracking-widest italic">Schedule List</h3>
                <button onClick={() => setSelectedDaySchedules(null)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <div className="p-4 overflow-y-auto flex-grow bg-gray-50">
                <div className="space-y-2">
                  {selectedDaySchedules.map((schedule) => (
                    <div 
                      key={schedule.id}
                      onClick={() => handleScheduleClick(schedule)}
                      className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm active:scale-[0.98] transition-all"
                    >
                      <h4 className="text-xs font-black text-gray-800 leading-snug break-keep">{schedule.title}</h4>
                      <p className="text-[10px] text-gray-400 mt-1 font-bold">상세보기</p>
                    </div>
                  ))}
                </div>
              </div>
           </div>
        </div>,
        document.body
      )}

      {/* Mobile note or responsive adjustments could go here */}
    </div>
  );
}
