"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Edit, Search, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";

interface BoardPost {
  id: string;
  title: string;
  category: string;
  authorName: string;
  viewCount: number;
  createdAt: string;
}

export default function AdminFreeBoardPage() {
  const { token } = useAuth();
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      // category=general (자유게시판) 가져오기
      const res = await fetch(`${apiUrl}/boards?category=general&limit=100`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setPosts(data.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/boards/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchPosts();
      else alert("삭제 실패");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-black text-gray-900">자유게시판 관리</h1>
        <Link
          href="/admin/free/create"
          className="flex items-center justify-center gap-2 px-6 py-2.5 md:py-2 bg-blue-600 text-white rounded-xl md:rounded-lg font-bold hover:bg-blue-700 transition-colors text-sm md:text-base"
        >
          <Plus className="w-4 h-4" />
          게시글 등록
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <>

            {/* 모바일 카드 뷰 */}
            <div className="md:hidden divide-y divide-gray-100">
              {posts.map((post) => (
                <div key={post.id} className="p-4 bg-white flex flex-col gap-2">
                   <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900 text-base line-clamp-2">{post.title}</h3>
                      <div className="flex gap-1 shrink-0 ml-2">
                        <Link
                          href={`/admin/free/${post.id}/edit`}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                   </div>
                   <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex gap-2">
                        <span>{post.authorName || '익명'}</span>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <span>조회수 {post.viewCount}</span>
                   </div>
                </div>
              ))}
            </div>

            <table className="w-full text-left hidden md:table">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase whitespace-nowrap">제목</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase whitespace-nowrap">작성자</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase whitespace-nowrap">조회수</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase whitespace-nowrap">작성일</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right whitespace-nowrap">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-gray-900 line-clamp-1">{post.title}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600 font-medium whitespace-nowrap">{post.authorName || '익명'}</td>
                    <td className="p-4 text-sm text-gray-500 whitespace-nowrap">{post.viewCount}</td>
                    <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <Link
                        href={`/admin/free/${post.id}/edit`}
                        className="inline-flex p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {posts.length === 0 && (
              <div className="p-20 text-center text-gray-400 font-medium">
                등록된 게시글이 없습니다.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
