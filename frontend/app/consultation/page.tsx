"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageCircle, Send, Phone, Mail, MapPin } from "lucide-react";

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "프로그램 문의",
    content: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/consultations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          message: formData.content, // content를 message로 맵핑
        }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        console.error("Consultation submit failed:", errorData);
        alert(`신청 중 오류가 발생했습니다: ${errorData.message || "다시 시도해주세요."}`);
      }
    } catch (error) {
      console.error("Consultation request failed", error);
      alert("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* 상단 섹션 */}
        <section className="py-20 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">1:1 맞춤 상담</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
              교육 프로그램에 대해 궁금한 점이 있으신가요? <br />
              전문 상담사가 직접 답변해 드립니다.
            </p>
          </div>
        </section>

        <section className="py-24 container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
            {/* 왼쪽: 연락처 정보 */}
            <div className="lg:w-1/3">
              <h2 className="text-3xl font-black text-gray-900 mb-8">연락처 정보</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">전화번호</p>
                    <p className="text-xl font-bold text-gray-900">070-4384-7849, 010-5465-7745</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">이메일</p>
                    <p className="text-xl font-bold text-gray-900">Email: only.youplus@daum.net</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">오시는 길</p>
                    <p className="text-lg font-bold text-gray-900">서울시 성북구 길음동 1276 길음삼부컨버니언아파트 상가 102동 지층 53호</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 상담 폼 */}
            <div className="lg:w-2/3">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3 ml-1">성함</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3 ml-1">연락처</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-900 mb-3 ml-1">이메일</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all"
                      />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-900 mb-3 ml-1">문의 유형</label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                        >
                          <option>프로그램 문의</option>
                          <option>강사 교육 문의</option>
                          <option>제휴 및 사업 문의</option>
                          <option>기타 문의</option>
                        </select>
                      </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-900 mb-3 ml-1">문의 내용</label>
                      <textarea
                        name="content"
                        rows={6}
                        required
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all resize-none"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 py-5 bg-blue-900 text-white rounded-2xl font-bold text-lg hover:bg-blue-800 transition-all shadow-xl"
                  >
                    상담 신청하기
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <div className="bg-white rounded-[2.5rem] shadow-2xl border border-emerald-100 p-16 text-center animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <MessageCircle className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-4">상담 신청 완료</h2>
                  <p className="text-gray-500 text-lg mb-0">상담 신청이 완료되었습니다. <br /> 확인 후 빠르게 답변 드리겠습니다.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
