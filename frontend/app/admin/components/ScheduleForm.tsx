'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/lib/context/AuthContext';
import { useRouter } from 'next/navigation';

type Props = {
  initial?: any;
  editMode?: boolean;
};

export default function ScheduleForm({ initial, editMode = false }: Props) {
  const { token } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    title: initial?.title || '',
    startDate: initial?.startDate ? new Date(initial.startDate).toISOString().split('T')[0] : '',
    endDate: initial?.endDate ? new Date(initial.endDate).toISOString().split('T')[0] : '',
    description: initial?.description || '',
    type: initial?.type || 'EDUCATION',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const url = editMode 
      ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/schedules/${initial.id}`
      : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/schedules`;
    
    const method = editMode ? 'PATCH' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        toast.success(editMode ? '일정이 수정되었습니다.' : '새 일정이 등록되었습니다.');
        router.push('/admin/schedules');
        router.refresh();
      } else {
        toast.error('저장에 실패했습니다.');
      }
    } catch (e) {
      toast.error('오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
      <h2 className="text-xl font-black text-gray-900">{editMode ? '일정 수정' : '새 일정 등록'}</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">제목</label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded-xl border-gray-100 focus:ring-blue-500 focus:border-blue-500 font-bold"
            value={form.title}
            onChange={e => setForm({...form, title: e.target.value})}
            placeholder="교육 과정명 또는 행사명"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">시작일</label>
            <input
              type="date"
              required
              className="w-full px-4 py-3 rounded-xl border-gray-100 focus:ring-blue-500 focus:border-blue-500 font-bold text-sm"
              value={form.startDate}
              onChange={e => setForm({...form, startDate: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">종료일</label>
            <input
              type="date"
              required
              className="w-full px-4 py-3 rounded-xl border-gray-100 focus:ring-blue-500 focus:border-blue-500 font-bold text-sm"
              value={form.endDate}
              onChange={e => setForm({...form, endDate: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">분류</label>
          <select
            className="w-full px-4 py-3 rounded-xl border-gray-100 focus:ring-blue-500 focus:border-blue-500 font-bold"
            value={form.type}
            onChange={e => setForm({...form, type: e.target.value})}
          >
            <option value="EDUCATION">교육</option>
            <option value="EVENT">행사</option>
            <option value="NOTICE">공지</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">상세 내용</label>
          <textarea
            className="w-full px-4 py-3 rounded-xl border-gray-100 focus:ring-blue-500 focus:border-blue-500 font-medium min-h-[150px]"
            value={form.description}
            onChange={e => setForm({...form, description: e.target.value})}
            placeholder="교육 장소, 시간 등 상세 정보를 입력하세요."
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-grow py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-colors"
        >
          {editMode ? '수정하기' : '등록하기'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-200 transition-colors"
        >
          취소
        </button>
      </div>
    </form>
  );
}
