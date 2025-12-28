"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/context/AuthContext";
import { CheckCircle2, ChevronRight, Send } from "lucide-react";

export default function ApplicationPage() {
  const { user } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    programType: "children",
    programName: "어린이 리더십 교실",
    applicantName: user?.fullName || "",
    applicantEmail: user?.email || "",
    applicantPhone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 text-center animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">신청 완료!</h2>
            <p className="text-gray-500 mb-8">
              교육 신청이 성공적으로 접수되었습니다. <br />
              담당자가 확인 후 영업일 기준 1~2일 내에 <br />
              연락드리겠습니다.
            </p>
            <button
               onClick={() => window.location.href = "/"}
               className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all"
            >
              홈으로 돌아가기
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-black text-gray-900 mb-4">교육 신청하기</h1>
              <p className="text-gray-500 font-medium">당당한 리더를 위한 첫걸음, 지금 신청하세요.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* 프로그램 선택 */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-bold text-gray-900 mb-3 ml-1">신청 프로그램</label>
                  <select
                    name="programType"
                    value={formData.programType}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                  >
                    <option value="children">어린이 리더십</option>
                    <option value="youth">청소년 보컬 리더십</option>
                    <option value="parent">부모 코칭 과정</option>
                    <option value="specialized">강사 양성 과정</option>
                  </select>
                </div>

                {/* 이름 */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 ml-1">신청자 성함</label>
                  <input
                    type="text"
                    name="applicantName"
                    required
                    value={formData.applicantName}
                    onChange={handleChange}
                    placeholder="홍길동"
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                  />
                </div>

                {/* 연락처 */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 ml-1">연락처</label>
                  <input
                    type="tel"
                    name="applicantPhone"
                    required
                    value={formData.applicantPhone}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                  />
                </div>

                {/* 이메일 */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-bold text-gray-900 mb-3 ml-1">이메일 주소</label>
                  <input
                    type="email"
                    name="applicantEmail"
                    required
                    value={formData.applicantEmail}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                  />
                </div>

                {/* 메시지 */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-bold text-gray-900 mb-3 ml-1">추가 문의 사항</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="궁금한 점이 있다면 자유롭게 적어주세요."
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all font-medium resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
              >
                신청서 제출하기
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
