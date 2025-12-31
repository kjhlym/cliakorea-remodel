'use client';

import { useState, useEffect } from 'react';
import MainPopup from './MainPopup';

export default function PopupProvider() {
  const [activePopups, setActivePopups] = useState<any[]>([]);
  const [closedIds, setClosedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/popups/active`);
        if (res.ok) {
          const data = await res.json();
          // 로컬 스토리지에 의해 숨겨진 팝업은 초기 필터링
          const visiblePopups = data.filter((popup: any) => {
            const hideUntil = localStorage.getItem(`hide_popup_${popup.id}`);
            return !hideUntil || new Date().getTime() > parseInt(hideUntil);
          });
          setActivePopups(visiblePopups);
        }
      } catch (e) {
        console.error('Failed to fetch popups', e);
      }
    };
    fetchPopups();
  }, []);

  const handleClose = (id: string) => {
    setClosedIds(prev => [...prev, id]);
  };

  const visiblePopups = activePopups.filter(p => !closedIds.includes(p.id));

  if (visiblePopups.length === 0) return null;

  return (
    <>
      {/* 통합 오버레이 배경 (블러 및 어두움 제거) */}
      <div className="fixed inset-0 z-[100] pointer-events-none" />
      
      {/* 팝업 카드 배열 컨테이너 (헤더 가림 방지를 위해 상단 여백 추가) */}
      <div className="fixed inset-0 z-[101] flex flex-wrap items-start justify-start gap-6 pt-32 p-10 overflow-y-auto pointer-events-none">
        {visiblePopups.map((popup) => (
          <div key={popup.id} className="pointer-events-auto">
            <MainPopup 
              id={popup.id}
              title={popup.title}
              imageUrl={popup.imageUrl}
              linkUrl={popup.linkUrl}
              type={popup.type}
              content={popup.content}
              onClose={handleClose}
            />
          </div>
        ))}
      </div>
    </>
  );
}
