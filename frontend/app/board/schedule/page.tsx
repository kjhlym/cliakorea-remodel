"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendarView from "../../../components/calendar/CalendarView";
import SubNav from "@/components/SubNav";

const boardNavItems = [

  { name: "공지사항", href: "/notice" },
  { name: "갤러리", href: "/board/gallery" },
  { name: "협회교육일정", href: "/board/schedule" },
];

export default function SchedulePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <SubNav items={boardNavItems} />
      
      <main className="flex-grow">
        <div className="container mx-auto py-8 md:py-16 px-2 md:px-4">
          <CalendarView />
        </div>
      </main>

      <Footer />
    </div>
  );
}
