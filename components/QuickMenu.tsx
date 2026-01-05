"use client";

import React from "react";
import Link from "next/link";

export default function QuickMenu() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            빠른 메뉴
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 교육 신청 */}
            <Link
              href="/apply"
              className="group relative overflow-hidden rounded-lg bg-blue-600 text-white p-8 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">교육 신청</h3>
                  <p className="text-sm opacity-90">바로가기</p>
                </div>
                <span className="text-4xl">→</span>
              </div>
            </Link>

            {/* 온라인 상담 */}
            <Link
              href="/consultation"
              className="group relative overflow-hidden rounded-lg bg-red-600 text-white p-8 hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">온라인 상담</h3>
                  <p className="text-sm opacity-90">바로가기</p>
                </div>
                <span className="text-4xl">→</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

