import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendarView from "../../../components/calendar/CalendarView";

export default function SchedulePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto py-12 px-4">
          <CalendarView />
        </div>
      </main>

      <Footer />
    </div>
  );
}
