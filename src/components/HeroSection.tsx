import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function HeroSection({ onScrollTo }: { onScrollTo: (id: string) => void }) {
  const [mileage, setMileage] = useState("");
  const [fuel, setFuel] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const km = parseFloat(mileage);
    const lt = parseFloat(fuel);
    if (km > 0 && lt > 0) setResult((lt / km) * 100);
  };

  const reset = () => {
    setMileage("");
    setFuel("");
    setResult(null);
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-lada-blue-dark via-lada-blue to-lada-blue-light min-h-screen flex flex-col"
    >
      {/* Декоративная сетка */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Круги-акценты */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-2xl" />

      <div className="relative flex-1 flex flex-col justify-center max-w-6xl mx-auto px-6 py-24 w-full">
        {/* Бейдж */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-1.5 w-fit mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white text-sm font-golos">Актуальные данные от реальных владельцев</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Lada Granta:<br />
              <span className="text-blue-200">реальный расход</span><br />
              топлива
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed mb-8 font-golos max-w-md">
              Данные владельцев, тесты, советы по экономии — всё в одном месте. Никакой рекламы, только честные цифры.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => onScrollTo("real-consumption")}
                className="bg-white text-lada-blue font-golos font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-all hover:scale-105 flex items-center gap-2"
              >
                <Icon name="BarChart3" size={18} />
                Узнать подробнее
              </button>
              <button
                onClick={() => onScrollTo("tips")}
                className="border border-white/40 text-white font-golos px-6 py-3 rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Icon name="Lightbulb" size={18} />
                Советы по экономии
              </button>
            </div>
            {/* Статы */}
            <div className="flex flex-wrap gap-6">
              {[
                { num: "847", label: "отзывов владельцев" },
                { num: "7.2", label: "л/100 км в среднем" },
                { num: "15%", label: "экономия с советами" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-oswald text-3xl font-bold text-white">{s.num}</div>
                  <div className="text-blue-200 text-sm font-golos">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Калькулятор */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-lada-blue/10 flex items-center justify-center">
                <Icon name="Calculator" size={20} className="text-lada-blue" />
              </div>
              <div>
                <h3 className="font-oswald text-lg text-gray-900">Рассчитайте свой расход</h3>
                <p className="text-gray-500 text-sm font-golos">Введите данные за любой период</p>
              </div>
            </div>

            <div className="space-y-4 mb-5">
              <div>
                <label className="block text-sm font-golos font-medium text-gray-700 mb-1.5">
                  Пробег за период, км
                </label>
                <input
                  type="number"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  placeholder="Например: 1500"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-golos focus:outline-none focus:ring-2 focus:ring-lada-blue/30 focus:border-lada-blue transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-golos font-medium text-gray-700 mb-1.5">
                  Объём потраченного топлива, л
                </label>
                <input
                  type="number"
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                  placeholder="Например: 110"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-golos focus:outline-none focus:ring-2 focus:ring-lada-blue/30 focus:border-lada-blue transition-all"
                />
              </div>
            </div>

            {result !== null ? (
              <div className="bg-lada-sky rounded-xl p-4 mb-4">
                <div className="text-center">
                  <div className="text-sm text-lada-blue font-golos mb-1">Ваш расход составляет</div>
                  <div className="font-oswald text-5xl font-bold text-lada-blue">
                    {result.toFixed(1)}
                    <span className="text-2xl ml-1">л/100 км</span>
                  </div>
                  <div className="mt-2 text-sm font-golos text-gray-600">
                    {result < 6.5
                      ? "🟢 Отличный результат! Ниже среднего по модели"
                      : result < 8
                      ? "🟡 Средний показатель для Granta"
                      : "🔴 Выше среднего — посмотрите советы по экономии"}
                  </div>
                </div>
              </div>
            ) : null}

            <div className="flex gap-3">
              <button
                onClick={calculate}
                className="flex-1 bg-lada-blue text-white font-golos font-semibold py-3 rounded-lg hover:bg-lada-blue-dark transition-all hover:scale-[1.02]"
              >
                Рассчитать
              </button>
              {result !== null && (
                <button
                  onClick={reset}
                  className="px-4 border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700 transition-colors font-golos"
                >
                  Сбросить
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Анонс разделов */}
      <div className="relative bg-lada-blue-dark/50 backdrop-blur border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex flex-wrap justify-center gap-2 md:gap-6">
            {[
              { icon: "TableProperties", label: "Реальный расход", id: "real-consumption" },
              { icon: "Zap", label: "Факторы влияния", id: "factors" },
              { icon: "Lightbulb", label: "Советы по экономии", id: "tips" },
              { icon: "PlayCircle", label: "Тесты и обзоры", id: "reviews" },
              { icon: "MessageSquare", label: "Отзывы", id: "forum" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onScrollTo(item.id)}
                className="flex items-center gap-2 text-blue-200 hover:text-white text-sm font-golos transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10"
              >
                <Icon name={item.icon} size={15} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
