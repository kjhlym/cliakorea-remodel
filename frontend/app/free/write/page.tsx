"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FreeBoardWritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 모의 제출 처리 (실제 API 연동 시 이곳에 로직 추가)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("게시글이 성공적으로 등록되었습니다.");
    router.push("/free");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow bg-gray-50/50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* 상단 네비게이션 */}
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/free"
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                목록으로 돌아가기
              </Link>
              <h1 className="text-2xl font-black text-gray-900">글쓰기</h1>
            </div>

            {/* 글쓰기 폼 */}
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              {/* 카테고리 & 제목 */}
              <div className="space-y-6 mb-8">
                <div>
                  <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-2">
                    카테고리
                  </label>
                  <select
                    id="category"
                    className="w-full md:w-64 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                  >
                    <option value="free">자유게시판</option>
                    <option value="qna">질문/답변</option>
                    <option value="info">정보공유</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">
                    제목
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력해 주세요"
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-lg font-bold focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                  />
                </div>
              </div>

              {/* 에디터 툴바 (데모용) */}
              <div className="border border-gray-200 rounded-t-xl bg-gray-50 p-3 flex gap-2">
                <button type="button" className="p-2 text-gray-500 hover:text-gray-900 hover:bg-white rounded-lg transition-all">
                  <span className="font-bold">B</span>
                </button>
                <button type="button" className="p-2 text-gray-500 hover:text-gray-900 hover:bg-white rounded-lg transition-all">
                  <span className="italic">I</span>
                </button>
                <button type="button" className="p-2 text-gray-500 hover:text-gray-900 hover:bg-white rounded-lg transition-all">
                  <span className="underline">U</span>
                </button>
                <div className="w-px h-6 bg-gray-300 mx-2 self-center" />
                <button type="button" className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-white rounded-lg transition-all text-xs font-bold">
                  <ImageIcon className="w-4 h-4" />
                  이미지 첨부
                </button>
              </div>

              {/* 본문 입력 */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 자유롭게 작성해 주세요. (서로를 배려하는 고운 말을 사용해 주세요)"
                required
                className="w-full h-96 p-6 border-x border-b border-gray-200 rounded-b-xl resize-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none leading-relaxed text-gray-700"
              />

              {/* 하단 버튼 */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-50">
                <Link
                  href="/free"
                  className="px-8 py-3 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  취소
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {isSubmitting ? "등록 중..." : "등록하기"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
