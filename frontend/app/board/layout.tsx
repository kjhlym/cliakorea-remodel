import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "게시판 | 어린이리더십강사협회",
  description: "협회 공지사항, 갤러리, 자유게시판 및 교육 일정을 확인하실 수 있습니다.",
};

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
