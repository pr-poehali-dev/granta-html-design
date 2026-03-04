import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import HeroSection from "@/components/HeroSection";
import RealConsumptionSection from "@/components/RealConsumptionSection";
import FactorsSection from "@/components/FactorsSection";
import TipsSection from "@/components/TipsSection";
import ReviewsSection from "@/components/ReviewsSection";
import ForumSection from "@/components/ForumSection";
import FooterSection from "@/components/FooterSection";

export default function Index() {
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-white font-golos">
      {/* Навигация */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="font-oswald text-xl font-bold text-lada-blue"
          >
            Granta<span className="text-gray-400">Расход</span>
          </button>
          <div className="hidden md:flex items-center gap-1">
            {[
              { id: "real-consumption", label: "Расход" },
              { id: "factors", label: "Факторы" },
              { id: "tips", label: "Советы" },
              { id: "reviews", label: "Тесты" },
              { id: "forum", label: "Отзывы" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-gray-600 hover:text-lada-blue text-sm font-golos px-3 py-1.5 rounded-lg hover:bg-lada-sky transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("forum")}
            className="bg-lada-blue text-white text-sm font-golos font-semibold px-4 py-2 rounded-lg hover:bg-lada-blue-dark transition-all hover:scale-105"
          >
            Добавить отзыв
          </button>
        </div>
      </nav>

      <div className="h-[57px]" />

      <HeroSection onScrollTo={scrollTo} />
      <RealConsumptionSection />
      <FactorsSection />
      <TipsSection />
      <ReviewsSection />
      <ForumSection />
      <FooterSection />

      {showBackTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-lada-blue text-white rounded-full shadow-lg hover:bg-lada-blue-dark transition-all hover:scale-110 flex items-center justify-center animate-fade-in"
        >
          <Icon name="ChevronUp" size={20} />
        </button>
      )}
    </div>
  );
}
