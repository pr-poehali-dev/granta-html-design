import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const CAR_COLORS = [
  { id: "red", name: "Гранатовый", hex: "#8B1A1A", glow: "rgba(139,26,26,0.7)" },
  { id: "black", name: "Обсидиан", hex: "#1a1a1a", glow: "rgba(80,80,80,0.5)" },
  { id: "white", name: "Арктический", hex: "#e8e8e8", glow: "rgba(200,200,200,0.5)" },
  { id: "blue", name: "Сапфир", hex: "#1a3a6b", glow: "rgba(26,58,107,0.7)" },
  { id: "silver", name: "Титан", hex: "#9E9E9E", glow: "rgba(158,158,158,0.5)" },
  { id: "green", name: "Хаки", hex: "#3a4a2a", glow: "rgba(58,74,42,0.6)" },
];

const TRIMS = [
  {
    id: "classic",
    name: "Классик",
    price: "729 900",
    features: ["Кондиционер", "Электростёкла", "Центральный замок", "ABS + EBD"],
  },
  {
    id: "comfort",
    name: "Комфорт",
    price: "849 900",
    features: ["Климат-контроль", "Мультируль", "Камера заднего вида", "ESP", "Подогрев сидений"],
  },
  {
    id: "luxe",
    name: "Люкс",
    price: "979 900",
    features: ["Кожаный салон", "Круиз-контроль", "Парктроник 360°", "Сигнализация", "Ксенон", "Android Auto"],
  },
];

const OPTIONS = [
  { id: "tinted", name: "Тонировка", price: 8900, icon: "Eye" },
  { id: "protectfilm", name: "Защитная плёнка", price: 24900, icon: "Shield" },
  { id: "allseason", name: "Зимние шины", price: 32000, icon: "Snowflake" },
  { id: "rugs", name: "Коврики 3D", price: 7500, icon: "LayoutGrid" },
  { id: "alarm", name: "Сигнализация GSM", price: 18000, icon: "Bell" },
  { id: "multimedia", name: "Медиасистема", price: 29900, icon: "Monitor" },
];

const SPECS = [
  { label: "Мощность", value: "106", unit: "л.с." },
  { label: "Разгон 0–100", value: "9.9", unit: "сек" },
  { label: "Расход топлива", value: "6.3", unit: "л/100км" },
  { label: "Объём двигателя", value: "1.6", unit: "л" },
  { label: "Клиренс", value: "174", unit: "мм" },
  { label: "Объём багажника", value: "480", unit: "л" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimCounter({ value, unit }: { value: string; unit: string }) {
  const [displayed, setDisplayed] = useState("0");
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(value);
    const isDecimal = value.includes(".");
    const steps = 40;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const current = (num * step) / steps;
      setDisplayed(isDecimal ? current.toFixed(1) : Math.floor(current).toString());
      if (step >= steps) {
        setDisplayed(value);
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [inView, value]);
  return (
    <div ref={ref} className="text-center">
      <span className="text-5xl font-oswald font-bold text-red-500">{displayed}</span>
      <span className="text-lg text-gray-400 ml-1 font-golos">{unit}</span>
    </div>
  );
}

function getCarFilter(colorId: string) {
  switch (colorId) {
    case "white":
      return "brightness(1.5) saturate(0.05)";
    case "silver":
      return "brightness(1.3) saturate(0.2)";
    case "black":
      return "brightness(0.35) saturate(0.2)";
    case "blue":
      return "hue-rotate(200deg) saturate(1.5)";
    case "green":
      return "hue-rotate(80deg) saturate(1.2) brightness(0.7)";
    default:
      return "";
  }
}

export default function Index() {
  const [selectedColor, setSelectedColor] = useState(CAR_COLORS[0]);
  const [selectedTrim, setSelectedTrim] = useState(TRIMS[1]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [navScrolled, setNavScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleOption = (id: string) =>
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );

  const optionsTotal = selectedOptions.reduce((sum, id) => {
    const opt = OPTIONS.find((o) => o.id === id);
    return sum + (opt?.price || 0);
  }, 0);

  const trimPrice = parseInt(selectedTrim.price.replace(/\s/g, ""));
  const totalPrice = (trimPrice + optionsTotal).toLocaleString("ru-RU");

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-[#0a0a0a] min-h-screen font-golos overflow-x-hidden">
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navScrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-oswald text-2xl font-bold tracking-widest text-white">
            AUTO<span className="text-red-500">.</span>RU
          </div>
          <div className="hidden md:flex gap-8">
            {[
              { id: "hero", label: "Главная" },
              { id: "specs", label: "Характеристики" },
              { id: "configurator", label: "Конфигуратор" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-gray-400 hover:text-white font-golos text-sm tracking-wider uppercase transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>
          <button className="bg-red-600 hover:bg-red-500 text-white font-oswald px-5 py-2 text-sm tracking-wider uppercase transition-all duration-200 hover:scale-105">
            Заказать
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#100808] to-[#0a0a0a]" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-20"
            style={{
              background: `radial-gradient(circle, ${selectedColor.glow} 0%, transparent 70%)`,
              transition: "background 0.8s ease",
            }}
          />
          <div
            className="absolute top-0 left-0 w-full h-full opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center pt-24">
          <div className="space-y-6">
            <div
              className={`transition-all duration-1000 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <span className="text-red-500 font-oswald text-sm tracking-[0.4em] uppercase">
                Новое поколение
              </span>
              <h1 className="font-oswald text-7xl lg:text-8xl font-bold text-white leading-none mt-2">
                SEDAN
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #ef4444, #dc2626, #991b1b)",
                  }}
                >
                  PRO
                </span>
              </h1>
            </div>

            <p
              className={`text-gray-400 text-lg max-w-md leading-relaxed transition-all duration-1000 delay-200 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Технологии завтрашнего дня в доступном автомобиле сегодня. Надёжность. Стиль. Характер.
            </p>

            <div
              className={`flex gap-4 transition-all duration-1000 delay-300 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <button
                onClick={() => scrollTo("configurator")}
                className="bg-red-600 hover:bg-red-500 text-white font-oswald px-8 py-4 text-base tracking-wider uppercase transition-all duration-200 hover:scale-105 animate-glow-pulse"
              >
                Настроить
              </button>
              <button
                onClick={() => scrollTo("specs")}
                className="border border-white/20 hover:border-white/50 text-white font-oswald px-8 py-4 text-base tracking-wider uppercase transition-all duration-200 hover:bg-white/5"
              >
                Характеристики
              </button>
            </div>

            <div
              className={`flex gap-8 pt-4 transition-all duration-1000 delay-500 ${
                heroVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {[
                { val: "729 900 ₽", label: "от" },
                { val: "5 лет", label: "гарантия" },
                { val: "106 л.с.", label: "мощность" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-white font-oswald text-xl font-bold">{item.val}</div>
                  <div className="text-gray-500 text-xs uppercase tracking-widest">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`relative flex items-center justify-center transition-all duration-1200 delay-400 ${
              heroVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            }`}
          >
            <div
              className="absolute inset-0 rounded-full opacity-30 blur-3xl transition-all duration-1000"
              style={{
                background: `radial-gradient(circle, ${selectedColor.glow} 0%, transparent 70%)`,
              }}
            />
            <img
              src="https://cdn.poehali.dev/projects/7a5fe47a-454c-484e-9de6-08130819fb5f/files/00b4cd31-a2bc-4fb4-af8f-13006e3a79b8.jpg"
              alt="Автомобиль"
              className="relative z-10 w-full max-w-xl object-contain animate-float"
              style={{
                filter: `drop-shadow(0 0 40px ${selectedColor.glow}) ${getCarFilter(selectedColor.id)}`,
                transition: "filter 0.8s ease",
              }}
            />
            <div
              className="absolute bottom-4 right-4 z-20 w-6 h-6 rounded-full border-2 border-white/30 transition-all duration-500"
              style={{ background: selectedColor.hex }}
            />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gray-600 text-xs uppercase tracking-widest">Листать</span>
          <Icon name="ChevronDown" size={16} className="text-gray-600" />
        </div>
      </section>

      {/* SPECS */}
      <section id="specs" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-red-500 font-oswald text-sm tracking-[0.4em] uppercase">
              Технические данные
            </span>
            <h2 className="font-oswald text-5xl font-bold text-white mt-2">ХАРАКТЕРИСТИКИ</h2>
            <div className="w-20 h-0.5 bg-red-600 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5">
            {SPECS.map((spec) => (
              <div
                key={spec.label}
                className="bg-[#0d0d0d] p-8 group hover:bg-[#111] transition-colors duration-300"
              >
                <AnimCounter value={spec.value} unit={spec.unit} />
                <div className="text-gray-500 text-sm text-center mt-2 uppercase tracking-wider font-golos group-hover:text-gray-300 transition-colors">
                  {spec.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {[
              ["Тип кузова", "Седан, 4 двери"],
              ["КПП", "5-ступенчатая МКПП / АМТ"],
              ["Привод", "Передний"],
              ["Топливо", "АИ-92 / АИ-95"],
              ["Объём бака", "50 л"],
              ["Снаряжённая масса", "1 110 кг"],
              ["Макс. скорость", "182 км/ч"],
              ["Экологический класс", "Евро-5"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between items-center border-b border-white/5 py-3 group"
              >
                <span className="text-gray-500 text-sm font-golos group-hover:text-gray-400 transition-colors">
                  {k}
                </span>
                <span className="text-white text-sm font-golos font-medium">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIGURATOR */}
      <section id="configurator" className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-red-500 font-oswald text-sm tracking-[0.4em] uppercase">
              Выбери своё
            </span>
            <h2 className="font-oswald text-5xl font-bold text-white mt-2">КОНФИГУРАТОР</h2>
            <div className="w-20 h-0.5 bg-red-600 mx-auto mt-4" />
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left panel */}
            <div className="lg:col-span-3 space-y-10">
              {/* Color picker */}
              <div>
                <h3 className="font-oswald text-xl text-white tracking-widest uppercase mb-5 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-red-600" />
                  Цвет кузова
                </h3>
                <div className="flex flex-wrap gap-4">
                  {CAR_COLORS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className="relative group flex flex-col items-center gap-2"
                    >
                      <div
                        className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                          selectedColor.id === color.id
                            ? "border-red-500 scale-110"
                            : "border-white/10 hover:border-white/40 hover:scale-105"
                        }`}
                        style={{
                          background: color.hex,
                          boxShadow:
                            selectedColor.id === color.id
                              ? `0 0 20px ${color.glow}`
                              : "none",
                        }}
                      />
                      <span
                        className={`text-xs font-golos transition-colors ${
                          selectedColor.id === color.id
                            ? "text-white"
                            : "text-gray-600 group-hover:text-gray-400"
                        }`}
                      >
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trim */}
              <div>
                <h3 className="font-oswald text-xl text-white tracking-widest uppercase mb-5 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-red-600" />
                  Комплектация
                </h3>
                <div className="space-y-3">
                  {TRIMS.map((trim) => (
                    <button
                      key={trim.id}
                      onClick={() => setSelectedTrim(trim)}
                      className={`w-full text-left p-5 border transition-all duration-300 ${
                        selectedTrim.id === trim.id
                          ? "border-red-600 bg-red-950/20"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-oswald text-white text-lg tracking-wider">
                            {trim.name}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {trim.features.map((f) => (
                              <span
                                key={f}
                                className="text-xs text-gray-500 bg-white/5 px-2 py-0.5"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right ml-4 flex-shrink-0">
                          <div className="font-oswald text-white font-bold text-lg">
                            {trim.price} ₽
                          </div>
                          {selectedTrim.id === trim.id && (
                            <div className="mt-1">
                              <Icon
                                name="CheckCircle"
                                size={16}
                                className="text-red-500 ml-auto"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div>
                <h3 className="font-oswald text-xl text-white tracking-widest uppercase mb-5 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-red-600" />
                  Опции и аксессуары
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {OPTIONS.map((opt) => {
                    const active = selectedOptions.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => toggleOption(opt.id)}
                        className={`p-4 border text-left transition-all duration-300 group ${
                          active
                            ? "border-red-600 bg-red-950/20"
                            : "border-white/10 hover:border-white/25"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <Icon
                            name={opt.icon}
                            size={20}
                            className={`transition-colors ${
                              active
                                ? "text-red-500"
                                : "text-gray-600 group-hover:text-gray-400"
                            }`}
                          />
                          {active && (
                            <Icon name="Check" size={14} className="text-red-500" />
                          )}
                        </div>
                        <div
                          className={`font-golos text-sm mt-3 transition-colors ${
                            active ? "text-white" : "text-gray-400"
                          }`}
                        >
                          {opt.name}
                        </div>
                        <div className="font-oswald text-xs mt-1 text-gray-500">
                          +{opt.price.toLocaleString("ru-RU")} ₽
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="relative bg-[#0d0d0d] border border-white/5 p-6 mb-4 overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-20 transition-all duration-1000"
                    style={{
                      background: `radial-gradient(circle at 50% 60%, ${selectedColor.glow}, transparent 70%)`,
                    }}
                  />
                  <img
                    src="https://cdn.poehali.dev/projects/7a5fe47a-454c-484e-9de6-08130819fb5f/files/00b4cd31-a2bc-4fb4-af8f-13006e3a79b8.jpg"
                    alt="Автомобиль"
                    className="relative z-10 w-full object-contain transition-all duration-700"
                    style={{
                      filter: `drop-shadow(0 0 20px ${selectedColor.glow}) ${getCarFilter(selectedColor.id)}`,
                    }}
                  />
                  <div className="relative z-10 text-center mt-2">
                    <span
                      className="text-sm font-golos"
                      style={{
                        color: selectedColor.hex === "#e8e8e8" ? "#aaa" : selectedColor.hex,
                      }}
                    >
                      ● {selectedColor.name}
                    </span>
                  </div>
                </div>

                <div className="bg-[#0d0d0d] border border-white/5 p-6">
                  <div className="font-oswald text-sm text-gray-500 tracking-widest uppercase mb-4">
                    Итоговая стоимость
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Комплектация «{selectedTrim.name}»
                      </span>
                      <span className="text-gray-300">{selectedTrim.price} ₽</span>
                    </div>
                    {selectedOptions.map((id) => {
                      const opt = OPTIONS.find((o) => o.id === id);
                      return opt ? (
                        <div key={id} className="flex justify-between text-sm">
                          <span className="text-gray-500">{opt.name}</span>
                          <span className="text-gray-300">
                            +{opt.price.toLocaleString("ru-RU")} ₽
                          </span>
                        </div>
                      ) : null;
                    })}
                  </div>

                  <div className="border-t border-white/10 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-oswald text-white text-lg uppercase tracking-wider">
                        Итого
                      </span>
                      <span className="font-oswald text-3xl text-red-500 font-bold">
                        {totalPrice} ₽
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-red-600 hover:bg-red-500 text-white font-oswald py-4 text-base tracking-widest uppercase transition-all duration-200 hover:scale-[1.02]">
                    Заказать автомобиль
                  </button>
                  <button className="w-full border border-white/15 hover:border-white/30 text-gray-400 hover:text-white font-oswald py-3 text-sm tracking-widest uppercase mt-3 transition-all duration-200">
                    Записаться на тест-драйв
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 bg-[#060606]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-oswald text-xl font-bold text-white tracking-widest">
            AUTO<span className="text-red-500">.</span>RU
          </div>
          <div className="text-gray-600 text-sm font-golos">© 2024 · Все права защищены</div>
          <div className="flex gap-6">
            {["Контакты", "Дилеры", "Сервис"].map((link) => (
              <button
                key={link}
                className="text-gray-600 hover:text-gray-300 text-sm font-golos transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
