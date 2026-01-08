import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "협회소개 | 어린이리더십강사협회",
  description: "CLIA 어린이리더십강사협회의 소명, 인사말, 활동 내역 및 오시는 길을 안내합니다.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
