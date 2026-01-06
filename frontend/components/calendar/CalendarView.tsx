"use client";

import { useState, useEffect } from "react";
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

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-black text-center text-gray-800 mb-8 border-t-2 border-gray-800 pt-8 w-fit mx-auto">
        협회교육일정
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Navigation */}
        <div className="flex items-center gap-4 text-gray-600">
          <button onClick={prevMonth} className="flex items-center hover:text-blue-600 font-bold">
            <ChevronLeft className="w-5 h-5" />
            지난달
          </button>
          
          <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <div className="border border-gray-300 rounded px-3 py-1 bg-white">
              {year}
            </div>
            <div className="border border-gray-300 rounded px-3 py-1 bg-white">
              {month}
            </div>
          </div>

          <button onClick={nextMonth} className="flex items-center hover:text-blue-600 font-bold">
            다음달
            <ChevronRight className="w-5 h-5" />
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
                                            className="text-[10px] md:text-xs text-gray-600 bg-gray-50 px-1 py-0.5 md:p-1 rounded border border-gray-100 truncate"
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
     
     {/* Mobile note or responsive adjustments could go here */}
    </div>
  );
}
