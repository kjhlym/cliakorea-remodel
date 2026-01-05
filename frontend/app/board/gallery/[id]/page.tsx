"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronLeft, Calendar, Tag } from "lucide-react";

interface GalleryDetail {
  id: string;
  title: string;
  images: string[];
  eventDate: string;
  category?: string;
  createdAt: string;
}

export default function GalleryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [gallery, setGallery] = useState<GalleryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/gallery/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setGallery(data);
        } else {
          alert("게시물을 찾을 수 없습니다.");
          router.push("/board/gallery");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchGallery();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!gallery) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 font-medium transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            목록으로 돌아가기
          </button>

          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="flex justify-center gap-4 mb-4 text-sm font-bold text-blue-600">
                <span className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                    <Tag className="w-3 h-3"/> {gallery.category || '일반'}
                </span>
                <span className="flex items-center gap-1 bg-gray-50 text-gray-500 px-3 py-1 rounded-full">
                    <Calendar className="w-3 h-3"/> 
                    {gallery.eventDate ? new Date(gallery.eventDate).toISOString().split('T')[0] : new Date(gallery.createdAt).toISOString().split('T')[0]}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                {gallery.title}
              </h1>
            </div>

            {/* Main Image Viewer */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden mb-6 shadow-xl ring-1 ring-gray-200">
                <div className="aspect-[16/10] relative flex items-center justify-center bg-black/95">
                    <img 
                        key={selectedImageIndex}
                        src={gallery.images?.[selectedImageIndex]} 
                        alt="" 
                        className="max-h-full max-w-full object-contain animate-in fade-in duration-500"
                    />
                </div>
            </div>

            {/* Thumbnails */}
            {gallery.images && gallery.images.length > 1 && (
                <div className="flex flex-wrap gap-3 mb-12">
                    {gallery.images.map((img, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
                                selectedImageIndex === idx 
                                    ? "border-blue-600 ring-4 ring-blue-50 opacity-100 scale-105" 
                                    : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}

            {/* Content (Optional, if we add description later) */}
            {/* <div className="prose max-w-none text-gray-600">
                <p>본문 내용이 있다면 여기에 표시됩니다.</p>
            </div> */}

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
