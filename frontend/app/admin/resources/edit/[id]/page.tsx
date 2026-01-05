"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Upload, Loader2, X, FileText } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";

export default function EditResourcePage() {
  const router = useRouter();
  const { id } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [existingAttachments, setExistingAttachments] = useState<{ name: string, url: string }[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/resource/${id}`);
        if (!res.ok) throw new Error("Failed to fetch resource");
        const data = await res.json();
        setTitle(data.title);
        setCategory(data.category);
        setAuthor(data.author || "");
        setContent(data.content || "");
        setImageUrl(data.imageUrl || "");
        setImagePreview(data.imageUrl || "");
        setExistingAttachments(data.attachments || []);
      } catch (error) {
        console.error(error);
        alert("자료를 불러오는데 실패했습니다.");
        router.push("/admin/resources");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchResource();
  }, [id, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setNewFiles(prev => [...prev, ...selectedFiles]);
    e.target.value = "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setNewImageFile(null);
    setImageUrl("");
    setImagePreview("");
  };

  const removeNewFile = (index: number) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingAttachment = (index: number) => {
    setExistingAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category) {
      alert("제목과 분류는 필수입니다.");
      return;
    }

    setSubmitting(true);

    try {
      let attachments = [...existingAttachments];
      let finalImageUrl = imageUrl;
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

      // Upload Cover Image
      if (newImageFile) {
        const imgFormData = new FormData();
        imgFormData.append("files", newImageFile);
        const imgRes = await fetch(`${apiUrl}/files/uploads`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: imgFormData,
        });
        if (imgRes.ok) {
          const { urls } = await imgRes.json();
          finalImageUrl = urls[0];
        }
      }

      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach(file => formData.append("files", file));

        const uploadRes = await fetch(`${apiUrl}/files/uploads`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("File upload failed");
        const { urls } = await uploadRes.json();
        
        const newlyUploaded = urls.map((url: string, idx: number) => ({
          name: newFiles[idx].name,
          url: url
        }));
        attachments = [...attachments, ...newlyUploaded];
      }

      const res = await fetch(`${apiUrl}/resource/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          category,
          author,
          content,
          imageUrl: finalImageUrl,
          attachments,
        }),
      });

      if (!res.ok) throw new Error(`Failed to update resource`);

      router.push("/admin/resources");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "수정 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 gap-4">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      <p className="font-bold text-gray-500">자료 정보를 불러오는 중입니다...</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/resources" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <h1 className="text-2xl font-black text-gray-900">자료 수정</h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">자료 분류</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
              >
                <option value="general">일반자료실</option>
                <option value="books">추천도서목록</option>
                <option value="materials">교구자료</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">저자 / 담당자</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">상세 설명</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">커버 이미지 / 썸네일 (추천도서 등)</label>
            <div className={`relative w-full aspect-[4/3] max-w-sm rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden group hover:border-blue-400 transition-colors ${imagePreview ? 'border-none' : 'p-8'}`}>
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center gap-2 text-gray-400">
                  <Upload className="w-8 h-8" />
                  <span className="text-xs font-bold text-center">도서 표지 등 이미지를 업로드하세요</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">현재 첨부 파일</label>
            <div className="space-y-2">
                {existingAttachments.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-blue-50/50 rounded-xl border border-blue-100 group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-blue-100">
                              <FileText className="w-4 h-4 text-blue-500" />
                            </div>
                            <span className="text-sm font-bold text-gray-700 truncate max-w-[200px] md:max-w-xs">{file.name}</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => removeExistingAttachment(idx)}
                            className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-all text-gray-400"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
                {existingAttachments.length === 0 && (
                  <div className="py-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400 text-sm">
                    첨부된 파일이 없습니다.
                  </div>
                )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">새 파일 추가</label>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:bg-gray-50 transition-colors cursor-pointer relative group">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-blue-500 transition-colors">
                <Upload className="w-8 h-8" />
                <span className="text-sm font-bold">파일을 추가하려면 클릭하세요</span>
              </div>
            </div>
            
            {newFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                    {newFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-green-50/30 rounded-xl border border-green-100">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                  <FileText className="w-4 h-4 text-green-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-gray-700 truncate max-w-[200px] md:max-w-xs">{file.name}</p>
                                  <p className="text-[10px] text-green-600 font-bold uppercase tracking-tight">새로 추가됨</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeNewFile(idx)}
                                className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-all text-gray-400"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
          </div>

          <div className="pt-8 border-t border-gray-100 flex justify-end gap-3">
            <Link href="/admin/resources" className="px-6 py-3 text-gray-500 font-bold rounded-xl hover:bg-gray-100 transition-all">
              취소
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50 flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  저장 중...
                </>
              ) : (
                "변경사항 저장"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
