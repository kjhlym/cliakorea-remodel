import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/context/AuthContext";
import LoginModal from "@/components/LoginModal";
import { Toaster } from "react-hot-toast";
import PopupProvider from "@/components/PopupProvider";

export const metadata: Metadata = {
  title: "어린이리더십강사협회 | CLIA",
  description: "어린이 리더십 교육 프로그램을 제공하는 전문 강사 협회",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <AuthProvider>
          {children}
          <LoginModal />
          <PopupProvider />
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
