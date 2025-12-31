'use client';

import { use, useEffect, useState } from 'react';
import useSWR from 'swr';
import ScheduleForm from '../../components/ScheduleForm';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function EditSchedulePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/schedules/${resolvedParams.id}`,
    fetcher
  );

  if (error) return <div className="p-8 text-red-500">데이터를 불러오는데 실패했습니다.</div>;
  if (!data) return <div className="p-8 text-gray-500">로딩 중...</div>;

  return (
    <div className="container mx-auto">
      <ScheduleForm initial={data} editMode />
    </div>
  );
}
