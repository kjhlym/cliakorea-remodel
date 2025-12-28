import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProgramCategories from "@/components/ProgramCategories";
import QuickMenu from "@/components/QuickMenu";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ProgramCategories />
        <QuickMenu />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
