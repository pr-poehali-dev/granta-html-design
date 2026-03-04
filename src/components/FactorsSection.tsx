import { useState } from "react";
import Icon from "@/components/ui/icon";

const FACTORS = [
  {
    id: "driving",
    icon: "Gauge",
    title: "Стиль вождения",
    impact: "+2.5 л",
    color: "bg-red-50 border-red-200 text-red-600",
    iconBg: "bg-red-100",
    detail: {
      aggressive: { label: "Агрессивный", value: 9.5, desc: "Резкие ускорения, высокие обороты двигателя, частое торможение — расход возрастает до 9–11 л/100 км в городе." },
      calm: { label: "Спокойный", value: 7.0, desc: "Плавные разгоны, предсказуемое торможение, движение накатом — экономия до 2–3 литров на 100 км." },
    },
    tip: "Следите за оборотами двигателя: переключайте передачу до 2 500 об/мин.",
  },
  {
    id: "climate",
    icon: "Thermometer",
    title: "Климат и сезон",
    impact: "+1.8 л",
    color: "bg-blue-50 border-blue-200 text-blue-600",
    iconBg: "bg-blue-100",
    detail: {
      aggressive: { label: "Зима", value: 9.8, desc: "Прогрев двигателя, густое масло, прогрев салона, зимние шины — расход зимой выше на 20–35%." },
      calm: { label: "Лето", value: 7.4, desc: "Тёплый двигатель, летние шины — расход ниже. Но кондиционер может добавить +0.5–1 л." },
    },
    tip: "Не прогревайте двигатель на месте более 1–2 минут — это устаревший подход.",
  },
  {
    id: "traffic",
    icon: "Car",
    title: "Загруженность дорог",
    impact: "+2.1 л",
    color: "bg-orange-50 border-orange-200 text-orange-600",
    iconBg: "bg-orange-100",
    detail: {
      aggressive: { label: "Плотный город", value: 9.2, desc: "Стоп-энд-гоу, светофоры, пробки. Двигатель работает на холостых — топливо расходуется." },
      calm: { label: "Трасса", value: 6.1, desc: "Равномерная скорость 80–100 км/ч — оптимальный режим для расхода топлива на Granta." },
    },
    tip: "На трассе держите 90 км/ч — это экономичнее, чем 110 км/ч, на 15–20%.",
  },
  {
    id: "tech",
    icon: "Settings",
    title: "Техническое состояние",
    impact: "+1.5 л",
    color: "bg-purple-50 border-purple-200 text-purple-600",
    iconBg: "bg-purple-100",
    detail: {
      aggressive: { label: "Без обслуживания", value: 9.0, desc: "Засорённый воздушный фильтр, неисправные свечи, низкое давление в шинах — всё это повышает расход." },
      calm: { label: "После ТО", value: 7.3, desc: "Замена фильтров, свечей, свежее масло, правильное давление шин — расход снижается на 1–2 л." },
    },
    tip: "Проверяйте давление шин раз в 2–4 недели. Недокачанные на 0.5 атм — это +0.3 л к расходу.",
  },
  {
    id: "equipment",
    icon: "Wind",
    title: "Доп. оборудование",
    impact: "+0.8 л",
    color: "bg-green-50 border-green-200 text-green-600",
    iconBg: "bg-green-100",
    detail: {
      aggressive: { label: "Всё включено", value: 8.5, desc: "Кондиционер + обогрев сидений + подогрев зеркал + мощная аудиосистема нагружают генератор." },
      calm: { label: "Базовый режим", value: 7.5, desc: "Кондиционер выключен или работает в экономном режиме, минимум потребителей тока." },
    },
    tip: "Кондиционер в режиме 'авто' расходует меньше, чем постоянно включённый на максимум.",
  },
];

export default function FactorsSection() {
  const [active, setActive] = useState<string | null>(null);
  const [mode, setMode] = useState<"aggressive" | "calm">("calm");

  const activeFactor = FACTORS.find((f) => f.id === active);

  return (
    <section id="factors" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-lada-sky text-lada-blue text-sm font-golos font-semibold px-4 py-1.5 rounded-full mb-3">
            Интерактивная инфографика
          </span>
          <h2 className="font-oswald text-4xl font-bold text-gray-900 mb-3">Что влияет на расход?</h2>
          <p className="text-gray-600 font-golos max-w-xl mx-auto">
            Нажмите на карточку, чтобы увидеть детальный разбор каждого фактора
          </p>
          <div className="w-16 h-1 bg-lada-blue rounded mx-auto mt-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {FACTORS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(active === f.id ? null : f.id)}
              className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                active === f.id
                  ? "border-lada-blue bg-white shadow-lg shadow-lada-blue/10"
                  : "border-gray-200 bg-white hover:border-lada-blue/40"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${f.iconBg}`}>
                <Icon name={f.icon} size={20} className={f.color.split(" ")[2]} />
              </div>
              <div className="font-oswald text-base font-bold text-gray-900 mb-1">{f.title}</div>
              <div className={`text-xs font-golos font-semibold ${f.color.split(" ")[2]}`}>
                влияние: {f.impact}
              </div>
              {active === f.id && (
                <div className="mt-2">
                  <Icon name="ChevronUp" size={14} className="text-lada-blue" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Детальная панель */}
        {activeFactor && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-fade-up">
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeFactor.iconBg}`}>
                <Icon name={activeFactor.icon} size={24} className={activeFactor.color.split(" ")[2]} />
              </div>
              <div>
                <h3 className="font-oswald text-2xl font-bold text-gray-900">{activeFactor.title}</h3>
                <p className="text-gray-500 text-sm font-golos">Выберите режим для сравнения</p>
              </div>
            </div>

            {/* Переключатель */}
            <div className="flex gap-3 mb-6">
              {(["calm", "aggressive"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2.5 rounded-lg font-golos font-semibold text-sm transition-all ${
                    mode === m
                      ? "bg-lada-blue text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {activeFactor.detail[m].label}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="font-oswald text-5xl font-bold text-lada-blue">
                    {activeFactor.detail[mode].value}
                  </span>
                  <span className="text-gray-500 font-golos pb-1">л/100 км</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                  <div
                    className="h-2 rounded-full bg-lada-blue transition-all duration-500"
                    style={{ width: `${((activeFactor.detail[mode].value - 5) / 7) * 100}%` }}
                  />
                </div>
                <p className="text-gray-600 font-golos text-sm leading-relaxed">
                  {activeFactor.detail[mode].desc}
                </p>
              </div>
              <div className="bg-lada-sky rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-lada-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Lightbulb" size={15} className="text-white" />
                  </div>
                  <div>
                    <div className="font-golos font-semibold text-lada-blue text-sm mb-1">Совет</div>
                    <p className="text-gray-700 font-golos text-sm leading-relaxed">{activeFactor.tip}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
