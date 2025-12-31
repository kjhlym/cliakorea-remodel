'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

type Props = {
  initial?: { name: string; email: string; password?: string };
  editMode?: boolean;
  adminId?: number;
};

export default function AdminForm({ initial, editMode = false, adminId }: Props) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    email: initial?.email ?? '',
    password: '',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/admin${editMode ? `/${adminId}` : ''}`;
    const method = editMode ? 'PATCH' : 'POST';

    const payload = { ...form };
    // 수정 모드이고 비밀번호가 비어있으면 전송하지 않음 (변경 안 함)
    if (editMode && !payload.password) {
      delete (payload as any).password;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editMode ? '관리자 정보가 업데이트되었습니다.' : '새 관리자가 생성되었습니다.');
        router.push('/admin');
      } else {
        const err = await res.text();
        toast.error(`오류: ${err}`);
      }
    } catch (error) {
       toast.error('요청 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
        {editMode ? '관리자 수정' : '새 관리자 등록'}
      </h2>

      <label className="block mb-2">
        <span className="text-gray-700 dark:text-gray-200">이름</span>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required={!editMode}
          className="mt-1 block w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 border focus:ring-indigo-500 focus:outline-none"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700 dark:text-gray-200">이메일</span>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required={!editMode}
          className="mt-1 block w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 border focus:ring-indigo-500 focus:outline-none"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-200">비밀번호 {editMode && '(변경 시에만 입력)'}</span>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required={!editMode}
          className="mt-1 block w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 border focus:ring-indigo-500 focus:outline-none"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        {editMode ? '수정 저장' : '등록'}
      </button>
    </form>
  );
}
