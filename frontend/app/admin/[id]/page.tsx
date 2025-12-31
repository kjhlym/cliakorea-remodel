'use client';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import AdminForm from '../components/AdminForm';
import { useEffect, useState, use } from 'react';

export default function EditAdminPage({ params }: { params: Promise<{ id: string }> }) {
  // Next.js 15+ 에서는 params가 Promise임
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const { data, error } = useSWR(
    resolvedParams ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/admin/${resolvedParams.id}` : null,
    (url) => fetch(url).then((r) => r.json()),
  );

  if (!resolvedParams) return <div className="p-6">파라미터 로딩 중…</div>;
  if (error) return <div className="p-6">데이터 로드 실패</div>;
  if (!data) return <div className="p-6">로드 중…</div>;

  return (
    <div className="container mx-auto py-8">
      <AdminForm
        initial={{ name: data.name, email: data.email }}
        editMode
        adminId={Number(resolvedParams.id)}
      />
    </div>
  );
}
