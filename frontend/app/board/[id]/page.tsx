"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronLeft, Calendar, User, Eye, Paperclip, File as FileIcon, Loader2 } from "lucide-react";

interface BoardDetail {
  id: string;
  title: string;
  content: string;
  category: string;
  authorName: string;
  viewCount: number;
  createdAt: string;
  attachments?: { name: string; url: string }[];
}

const CATEGORY_REVERSE_MAP: Record<string, string> = {
  "notice": "공지사항",
  "news": "협회활동",
  "education": "자료실",
  "general": "자유게시판"
};

export default function BoardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BoardDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/boards/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
        } else {
          alert("게시물을 찾을 수 없습니다.");
          router.push("/board");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Back Button */}
          <button
            onClick={() => router.push("/board")}
            className="flex items-center gap-2 text-gray-400 hover:text-black mb-10 font-bold transition-all group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            목록으로 돌아가기
          </button>

          <article className="max-w-4xl mx-auto">
            {/* Post Header */}
            <header className="border-b border-gray-100 pb-10 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                  post.category === "notice" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                }`}>
                  {CATEGORY_REVERSE_MAP[post.category] || post.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>{post.authorName || '익명'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span>조회 {post.viewCount}</span>
                </div>
              </div>
            </header>

            {/* Attachments Section */}
            {post.attachments && post.attachments.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-2 text-sm font-bold text-gray-800">
                  <Paperclip className="w-4 h-4 text-gray-400" />
                  첨부파일
                </div>
                <div className="border-y border-dashed border-gray-200 py-3 space-y-3">
                  {post.attachments.map((file, idx) => (
                    <a
                      key={idx}
                      href={file.url}
                      download={file.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors group"
                    >
                      <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center group-hover:bg-blue-50">
                        <FileIcon className="w-3 h-3 text-gray-400 group-hover:text-blue-600" />
                      </div>
                      {file.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Post Content */}
            <div className="text-gray-700 leading-relaxed min-h-[400px]">
              <div className="whitespace-pre-wrap font-medium text-lg mb-10">
                {post.content}
              </div>
              
              {/* Display Images from Attachments */}
              {post.attachments?.filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f.url)).map((img, idx) => (
                <div key={idx} className="mb-8 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-100">
                  <img src={img.url} alt={img.name} className="w-full h-auto" />
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-16 pt-10 border-t border-gray-100 flex justify-center">
                <button
                    onClick={() => router.push("/board")}
                    className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-xl shadow-gray-900/10"
                >
                    목록보기
                </button>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
