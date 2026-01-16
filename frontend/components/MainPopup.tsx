'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface PopupProps {
  id: string;
  title: string;
  imageUrl?: string;
  linkUrl?: string;
  type?: 'IMAGE' | 'HTML' | 'PRESET';
  content?: string;
  onClose: (id: string) => void;
}

export default function MainPopup({ id, title, imageUrl, linkUrl, type = 'IMAGE', content, onClose }: PopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hideForToday, setHideForToday] = useState(false);

  useEffect(() => {
    // 로컬 스토리지 확인하여 팝업 노출 여부 결정
    const hideUntil = localStorage.getItem(`hide_popup_${id}`);
    if (!hideUntil || new Date().getTime() > parseInt(hideUntil)) {
      setIsOpen(true);
    }
  }, [id]);

  const handleClose = () => {
    if (hideForToday) {
      // 24시간 뒤의 타임스탬프 계산
      const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem(`hide_popup_${id}`, expiry.toString());
    }
    setIsOpen(false);
    onClose(id);
  };

  if (!isOpen) return null;

  return (
    <div className="relative w-full max-w-[288px] animate-in fade-in zoom-in-95 duration-500 shrink-0">
      <div className="bg-white rounded-none shadow-[20px_20px_50px_rgba(0,0,0,0.25)] overflow-hidden border-[0.5px] border-black/10">
        {/* 내용 영역 */}
        <div className="relative min-h-[112px] bg-gray-50">
          {type === 'HTML' ? (
            <div 
              className="w-full h-full p-8 overflow-y-auto max-h-[224px] prose prose-sm"
              dangerouslySetInnerHTML={{ __html: content || '' }}
            />
          ) : (
            <div className="relative aspect-[1/1.414] bg-gray-100">
              {imageUrl ? (
                <a href={linkUrl || '#'} target={linkUrl ? "_blank" : "_self"} rel="noopener noreferrer" className="block w-full h-full">
                  <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                </a>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8 text-center text-gray-300">
                  <h3 className="text-xl font-bold">{title}</h3>
                </div>
              )}
            </div>
          )}
          

        </div>

        {/* 하단 컨트롤 영역 */}
        <div className="py-1.5 px-4 flex items-center justify-between bg-white border-t border-gray-100">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center">
              <input 
                type="checkbox" 
                checked={hideForToday}
                onChange={(e) => setHideForToday(e.target.checked)}
                className="peer sr-only"
              />
              <div className="w-4 h-4 border-2 border-gray-200 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all"></div>
              <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity left-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-[9px] font-bold text-gray-400 group-hover:text-gray-600 transition-colors">오늘 하루 보지 않기</span>
          </label>
          
          <button 
            onClick={handleClose}
            className="text-[9px] font-black text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-wider"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
