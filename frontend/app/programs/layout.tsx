import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "교육 프로그램 | 어린이리더십강사협회",
  description: "어린이, 청소년, 부모 리더십 및 환경 리더십 등 CLIA만의 차별화된 맞춤형 교육 프로그램을 소개합니다.",
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
