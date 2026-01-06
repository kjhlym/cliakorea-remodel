"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { Save, Loader2, BarChart3 } from "lucide-react";
import toast from "react-hot-toast";

interface Statistics {
  id: number;
  instructorCount: string;
  programCount: string;
  partnerCount: string;
  historyYears: string;
}

export default function AdminStatisticsPage() {
  const { token } = useAuth();
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/statistics`, { cache: 'no-store' });
      if (!res.ok) throw new Error("Failed to fetch statistics");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error(error);
      toast.error("통계 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stats) return;

    setSaving(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/statistics`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          instructorCount: stats.instructorCount,
          programCount: stats.programCount,
          partnerCount: stats.partnerCount,
          historyYears: stats.historyYears,
        }),
      });

      if (!res.ok) throw new Error("Failed to update");
      toast.success("통계 정보가 저장되었습니다.");
    } catch (error) {
      console.error(error);
      toast.error("저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-20">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
          <BarChart3 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900">통계 수치 관리</h1>
          <p className="text-gray-500 text-sm mt-1">홈페이지 '활동과 발자취' 섹션의 주요 지표를 관리합니다.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">강사 파견 (누적)</label>
              <input
                type="text"
                value={stats?.instructorCount || ""}
                onChange={(e) => setStats(prev => prev ? { ...prev, instructorCount: e.target.value } : null)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                placeholder="예: 2,000+"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">교육 프로그램</label>
              <input
                type="text"
                value={stats?.programCount || ""}
                onChange={(e) => setStats(prev => prev ? { ...prev, programCount: e.target.value } : null)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                placeholder="예: 50+"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">주요 협약 기관</label>
              <input
                type="text"
                value={stats?.partnerCount || ""}
                onChange={(e) => setStats(prev => prev ? { ...prev, partnerCount: e.target.value } : null)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                placeholder="예: 15+"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">교육 역사</label>
              <input
                type="text"
                value={stats?.historyYears || ""}
                onChange={(e) => setStats(prev => prev ? { ...prev, historyYears: e.target.value } : null)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                placeholder="예: 16년"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              변경사항 저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
