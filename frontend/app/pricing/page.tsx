"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Sparkles } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  credits: number;
  price: number;
  discountedPrice: number | null;
  discountPercentage: number | null;
  isActive: boolean;
}

export default function PricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const rawUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = (rawUrl && rawUrl !== "undefined") ? rawUrl : "http://localhost:3001";
      const response = await fetch(`${apiUrl}/pricing-plans`);
      if (response.ok) {
        const data = await response.json();
        setPlans(data);
      }
    } catch (error) {
      console.error("Failed to fetch pricing plans", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (planId: string) => {
    try {
      const rawUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = (rawUrl && rawUrl !== "undefined") ? rawUrl : "http://localhost:3001";
      const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];
      
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await fetch(`${apiUrl}/credits/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ planId }),
      });

      if (response.ok) {
        const payment = await response.json();
        // 토스페이먼츠 결제 페이지로 리다이렉트
        window.location.href = `https://pay.toss.im/web/checkout?orderId=${payment.tossOrderId}&amount=${payment.amount}`;
      }
    } catch (error) {
      console.error("Failed to create purchase", error);
      alert("구매 요청에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />

      <main className="flex-grow">
        {/* 헤더 섹션 */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              크레딧 충전
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              합리적인 가격으로
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                교육을 시작하세요
              </span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              크레딧을 충전하고 다양한 교육 프로그램을 자유롭게 이용하세요.
            </p>
          </div>
        </section>

        {/* 요금제 카드 */}
        <section className="py-12 pb-24">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan) => {
                  const finalPrice = plan.discountedPrice || plan.price;
                  const hasDiscount = plan.discountedPrice && plan.discountedPrice < plan.price;

                  return (
                    <div
                      key={plan.id}
                      className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-black text-gray-900 mb-2">{plan.name}</h3>
                        <div className="flex items-center justify-center gap-2">
                          {hasDiscount && (
                            <span className="text-lg text-gray-400 line-through">
                              {plan.price.toLocaleString()}원
                            </span>
                          )}
                          <span className="text-4xl font-black text-blue-600">
                            {finalPrice.toLocaleString()}
                          </span>
                          <span className="text-gray-500">원</span>
                        </div>
                        {hasDiscount && plan.discountPercentage && (
                          <div className="mt-2 inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold">
                            {plan.discountPercentage}% 할인
                          </div>
                        )}
                      </div>

                      <div className="mb-8">
                        <div className="flex items-center justify-center gap-2 py-4 bg-blue-50 rounded-2xl">
                          <span className="text-3xl font-black text-blue-600">{plan.credits}</span>
                          <span className="text-gray-600 font-bold">크레딧</span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-gray-600">
                          <Check className="w-5 h-5 text-green-500" />
                          <span>교육 프로그램 신청 가능</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-600">
                          <Check className="w-5 h-5 text-green-500" />
                          <span>유효기간 없음</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-600">
                          <Check className="w-5 h-5 text-green-500" />
                          <span>환불 가능</span>
                        </li>
                      </ul>

                      <button
                        onClick={() => handlePurchase(plan.id)}
                        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                      >
                        구매하기
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
