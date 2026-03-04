import { useState } from "react";
import Icon from "@/components/ui/icon";

const TIPS = [
  {
    num: "01",
    icon: "Gauge",
    title: "Поддерживайте давление в шинах",
    desc: "Проверяйте каждые 2–4 недели. Недокачанное колесо на 0.5 атм даёт +0.3–0.4 л к расходу. Норма для Granta: 2.0 спереди, 2.0 сзади (без нагрузки).",
    saving: 0.4,
  },
  {
    num: "02",
    icon: "TrendingDown",
    title: "Избегайте частых разгонов и торможений",
    desc: "Плавная езда экономит до 2 л/100 км. Смотрите вперёд — предугадывайте светофоры и замедляйтесь заблаговременно, не жмите газ до последнего.",
    saving: 1.5,
  },
  {
    num: "03",
    icon: "Wind",
    title: "Используйте кондиционер разумно",
    desc: "Кондиционер потребляет 0.5–1 л/100 км. На скорости до 50 км/ч выгоднее открыть окно. На трассе — лучше кондиционер (аэродинамическое сопротивление).",
    saving: 0.6,
  },
  {
    num: "04",
    icon: "Wrench",
    title: "Проводите регулярное ТО",
    desc: "Свежие свечи, чистый воздушный и топливный фильтры, хорошее масло — снижают расход на 1–1.5 л. Не откладывайте ТО — оно окупается на бензине.",
    saving: 1.2,
  },
  {
    num: "05",
    icon: "Package",
    title: "Уберите лишний груз из багажника",
    desc: "Каждые 100 кг лишнего веса — +0.5 л к расходу. Уберите зимние шины летом, снимите автобоксы и багажники на крыше, когда они не нужны.",
    saving: 0.3,
  },
  {
    num: "06",
    icon: "Navigation",
    title: "Стройте маршруты без пробок",
    desc: "Час в пробке — это 0.5–1.5 л сожжённого топлива на холостом ходу. Используйте навигаторы с пробками: Яндекс.Навигатор, 2ГИС.",
    saving: 0.8,
  },
  {
    num: "07",
    icon: "Fuel",
    title: "Заправляйтесь качественным топливом",
    desc: "На Granta с 8-клапанным двигателем достаточно АИ-92. На 16-клапанном — АИ-95. Некачественное топливо снижает мощность и повышает расход.",
    saving: 0.3,
  },
  {
    num: "08",
    icon: "RotateCcw",
    title: "Не прогревайте двигатель подолгу",
    desc: "Современный двигатель достаточно прогревать 1–2 минуты, затем трогаться без нагрузки. Долгий прогрев — лишний расход и нагар на свечах.",
    saving: 0.4,
  },
];

export default function TipsSection() {
  const [currentConsumption, setCurrentConsumption] = useState("8.5");
  const [targetConsumption, setTargetConsumption] = useState("7.0");
  const [monthKm, setMonthKm] = useState("1500");
  const [fuelPrice, setFuelPrice] = useState("55");
  const [calcResult, setCalcResult] = useState<{ monthly: number; yearly: number; liters: number } | null>(null);

  const calculate = () => {
    const cur = parseFloat(currentConsumption);
    const tgt = parseFloat(targetConsumption);
    const km = parseFloat(monthKm);
    const price = parseFloat(fuelPrice);
    if (cur > tgt && km > 0 && price > 0) {
      const liters = ((cur - tgt) / 100) * km;
      const monthly = liters * price;
      setCalcResult({ monthly, yearly: monthly * 12, liters });
    }
  };

  return (
    <section id="tips" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-50 text-green-700 text-sm font-golos font-semibold px-4 py-1.5 rounded-full mb-3">
            Проверено на практике
          </span>
          <h2 className="font-oswald text-4xl font-bold text-gray-900 mb-3">Советы по экономии</h2>
          <p className="text-gray-600 font-golos max-w-xl mx-auto">
            Реальные советы, которые уже помогли сотням владельцев Lada Granta
          </p>
          <div className="w-16 h-1 bg-lada-blue rounded mx-auto mt-4" />
        </div>

        {/* Советы */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {TIPS.map((tip) => (
            <div
              key={tip.num}
              className="flex gap-4 p-5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-lada-sky/30 hover:border-lada-blue/20 transition-all group"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-lada-blue/10 flex items-center justify-center group-hover:bg-lada-blue/15 transition-colors">
                  <Icon name={tip.icon} size={18} className="text-lada-blue" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h3 className="font-oswald text-base font-bold text-gray-900 leading-snug">{tip.title}</h3>
                  <span className="flex-shrink-0 bg-green-100 text-green-700 text-xs font-golos font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                    −{tip.saving} л
                  </span>
                </div>
                <p className="text-gray-600 text-sm font-golos leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Калькулятор экономии */}
        <div className="bg-gradient-to-br from-lada-blue to-lada-blue-dark rounded-2xl p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon name="PiggyBank" size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-oswald text-2xl font-bold">Калькулятор экономии</h3>
              <p className="text-blue-200 font-golos text-sm">Сколько вы сэкономите, следуя советам?</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Текущий расход, л/100 км", value: currentConsumption, setter: setCurrentConsumption },
              { label: "Желаемый расход, л/100 км", value: targetConsumption, setter: setTargetConsumption },
              { label: "Пробег в месяц, км", value: monthKm, setter: setMonthKm },
              { label: "Цена бензина, ₽/л", value: fuelPrice, setter: setFuelPrice },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-blue-200 text-xs font-golos mb-1.5">{field.label}</label>
                <input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  className="w-full bg-white/15 border border-white/25 rounded-lg px-3 py-2.5 text-white font-golos placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={calculate}
              className="bg-white text-lada-blue font-golos font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-all hover:scale-105"
            >
              Рассчитать экономию
            </button>

            {calcResult && (
              <div className="flex flex-wrap gap-6">
                <div>
                  <div className="text-blue-200 text-xs font-golos">Экономия топлива в месяц</div>
                  <div className="font-oswald text-2xl font-bold">{calcResult.liters.toFixed(1)} л</div>
                </div>
                <div>
                  <div className="text-blue-200 text-xs font-golos">Экономия в месяц</div>
                  <div className="font-oswald text-2xl font-bold">{calcResult.monthly.toFixed(0)} ₽</div>
                </div>
                <div>
                  <div className="text-blue-200 text-xs font-golos">Экономия в год</div>
                  <div className="font-oswald text-3xl font-bold text-green-300">{calcResult.yearly.toFixed(0)} ₽</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
