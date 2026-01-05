"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const confirmPayment = async () => {
      const paymentKey = searchParams.get("paymentKey");
      const orderId = searchParams.get("orderId");
      const amount = searchParams.get("amount");

      if (!paymentKey || !orderId || !amount) {
        setStatus("error");
        setMessage("결제 정보가 올바르지 않습니다.");
        return;
      }

      try {
        const rawUrl = process.env.NEXT_PUBLIC_API_URL;
        const apiUrl = (rawUrl && rawUrl !== "undefined") ? rawUrl : "http://localhost:3001";

        const response = await fetch(`${apiUrl}/credits/confirm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: parseInt(amount),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setStatus("success");
          setMessage(`${data.payment.credits}개의 크레딧이 충전되었습니다!`);

          // 3초 후 홈으로 리다이렉트
          setTimeout(() => {
            router.push("/");
          }, 3000);
        } else {
          setStatus("error");
          setMessage("결제 확인에 실패했습니다.");
        }
      } catch (error) {
        console.error("Payment confirmation error:", error);
        setStatus("error");
        setMessage("결제 처리 중 오류가 발생했습니다.");
      }
    };

    confirmPayment();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">결제 처리 중...</h2>
            <p className="text-gray-500">잠시만 기다려 주세요.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">결제 완료!</h2>
            <p className="text-lg text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-400">잠시 후 홈페이지로 이동합니다...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">결제 실패</h2>
            <p className="text-lg text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => router.push("/pricing")}
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all"
            >
              다시 시도하기
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">결제 처리 중...</h2>
          <p className="text-gray-500">잠시만 기다려 주세요.</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
