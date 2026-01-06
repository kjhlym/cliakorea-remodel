"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2, Save, Paperclip, X } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";

export default function CreateNoticePage() {
  const router = useRouter();
  const { token, user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("notice");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;
    setFiles(prev => [...prev, ...selectedFiles]);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    setSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      let uploadedAttachments: { name: string, url: string }[] = [];
      
      // 1. Upload Attachments if any
      if (files.length > 0) {
        const formData = new FormData();
        files.forEach(file => formData.append("files", file));
        
        const uploadRes = await fetch(`${apiUrl}/files/uploads`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });
        
        if (!uploadRes.ok) throw new Error("File upload failed");
        const uploadData = await uploadRes.json();
        uploadedAttachments = uploadData.files; // { url, name }[]
      }

      // 2. Create Notice
      const res = await fetch(`${apiUrl}/boards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          category,
          authorName: user?.fullName || "관리자",
          attachments: uploadedAttachments,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Failed to create notice");
      }

      router.push("/admin/notices");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "등록 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/notices"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <h1 className="text-xl md:text-2xl font-black text-gray-900">새 공지사항 작성</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
              placeholder="공지사항 제목을 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium resize-none shadow-inner"
              placeholder="공지사항 내용을 상세히 입력하세요"
            />
          </div>

          {/* Attachments */}
          <div className="border-t border-gray-100 pt-6">
            <label className="block text-sm font-bold text-gray-700 mb-4">첨부 파일</label>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-dashed border-gray-200 rounded-xl text-sm font-bold text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all cursor-pointer">
                <input type="file" multiple onChange={handleFileChange} className="hidden" />
                <Paperclip className="w-4 h-4" />
                파일 추가
              </label>

              {files.map((file, idx) => (
                <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold group">
                  <span className="max-w-[150px] truncate">{file.name}</span>
                  <button type="button" onClick={() => removeFile(idx)} className="p-0.5 hover:bg-blue-100 rounded-full transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-50 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center gap-2"
            >
              {submitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
