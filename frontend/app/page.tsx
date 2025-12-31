import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProgramCategories from "@/components/ProgramCategories";
import HomeScheduleList from "@/components/HomeScheduleList";
import QuickMenu from "@/components/QuickMenu";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        {/* 새롭게 구성된 메인 섹션: 일정 리스트 + 프로그램 카테고리 */}
        <section className="py-24 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-4 lg:px-20">
            <div className="flex flex-col xl:flex-row gap-12">
              {/* 왼쪽: 교육 일정 (사이드바 형태) */}
              <div className="xl:w-1/4">
                <HomeScheduleList />
              </div>
              
              {/* 오른쪽: 프로그램 카테고리 */}
              <div className="xl:w-3/4">
                <div className="mb-12">
                  <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">
                    Our Programs
                  </h2>
                  <h3 className="text-3xl font-black text-gray-900">
                    성장을 위한 맞춤형 리더십 과정
                  </h3>
                </div>
                <ProgramCategories standalone={false} />
              </div>
            </div>
          </div>
        </section>

        <QuickMenu />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
