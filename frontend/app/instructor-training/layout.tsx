import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "강사양성프로그램 | 어린이리더십강사협회",
  description: "미래를 바꿀 최고의 리더십 강사가 되기 위한 전문 커리큘럼과 자격 과정을 안내합니다.",
};

export default function InstructorTrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
