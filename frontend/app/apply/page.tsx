"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { applicationAPI } from "@/lib/api/client";

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    programType: "",
    programName: "",
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await applicationAPI.createApplication(formData);
      setSubmitStatus("success");
      setFormData({
        programType: "",
        programName: "",
        applicantName: "",
        applicantEmail: "",
        applicantPhone: "",
        message: "",
      });
    } catch (error) {
      console.error("교육 신청 오류:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold text-center mb-8">교육 신청</h1>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-6">
              {/* 프로그램 유형 */}
              <div>
                <label htmlFor="programType" className="block text-sm font-medium text-gray-700 mb-2">
                  프로그램 유형 *
                </label>
                <select
                  id="programType"
                  name="programType"
                  value={formData.programType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">선택하세요</option>
                  <option value="children">어린이 리더십 프로그램</option>
                  <option value="youth">청소년 리더십 프로그램</option>
                  <option value="parent">부모 리더십 프로그램</option>
                  <option value="specialized">특화 프로그램</option>
                </select>
              </div>

              {/* 프로그램명 */}
              <div>
                <label htmlFor="programName" className="block text-sm font-medium text-gray-700 mb-2">
                  프로그램명 *
                </label>
                <input
                  type="text"
                  id="programName"
                  name="programName"
                  value={formData.programName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* 신청자 이름 */}
              <div>
                <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700 mb-2">
                  신청자 이름 *
                </label>
                <input
                  type="text"
                  id="applicantName"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* 이메일 */}
              <div>
                <label htmlFor="applicantEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 *
                </label>
                <input
                  type="email"
                  id="applicantEmail"
                  name="applicantEmail"
                  value={formData.applicantEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* 전화번호 */}
              <div>
                <label htmlFor="applicantPhone" className="block text-sm font-medium text-gray-700 mb-2">
                  전화번호 *
                </label>
                <input
                  type="tel"
                  id="applicantPhone"
                  name="applicantPhone"
                  value={formData.applicantPhone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* 메시지 */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  문의사항
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* 제출 버튼 */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "제출 중..." : "신청하기"}
              </button>

              {/* 상태 메시지 */}
              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 text-green-800 rounded-lg">
                  교육 신청이 완료되었습니다. 감사합니다!
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-4 bg-red-50 text-red-800 rounded-lg">
                  오류가 발생했습니다. 다시 시도해주세요.
                </div>
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

