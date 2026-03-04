import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Icon from "@/components/ui/icon";

const OWNERS_DATA = [
  { model: "Granta 2019", engine: "1.6 8кл", gearbox: "МКПП", city: 8.4, highway: 6.1, mixed: 7.2, comment: "Зима в Москве — доходит до 11 л" },
  { model: "Granta 2021", engine: "1.6 16кл", gearbox: "АМТ", city: 9.1, highway: 6.3, mixed: 7.8, comment: "АМТ расходует чуть больше в городе" },
  { model: "Granta 2020", engine: "1.6 8кл", gearbox: "МКПП", city: 7.8, highway: 5.8, mixed: 6.9, comment: "Трасса Самара–Саратов, спокойная езда" },
  { model: "Granta 2022", engine: "1.6 16кл", gearbox: "МКПП", city: 8.6, highway: 6.0, mixed: 7.4, comment: "Город Казань, пробки утром и вечером" },
  { model: "Granta 2018", engine: "1.6 8кл", gearbox: "МКПП", city: 9.5, highway: 6.8, mixed: 8.2, comment: "Старый двигатель, нужно ТО" },
  { model: "Granta 2023", engine: "1.6 16кл", gearbox: "АМТ", city: 8.2, highway: 5.9, mixed: 7.1, comment: "Новая машина, пробег 12 000 км" },
  { model: "Granta 2021", engine: "1.6 8кл", gearbox: "МКПП", city: 7.5, highway: 5.5, mixed: 6.6, comment: "Трасса, скорость 90–100 км/ч" },
  { model: "Granta 2020", engine: "1.6 16кл", gearbox: "МКПП", city: 8.9, highway: 6.4, mixed: 7.7, comment: "Кондиционер всё лето включён" },
];

const CHART_DATA = [
  { name: "Город", passport: 8.2, real: 8.5 },
  { name: "Трасса", passport: 5.6, real: 6.1 },
  { name: "Смешанный", passport: 6.5, real: 7.2 },
];

const REGIONS = [
  { region: "Москва и МО", avg: 8.8, note: "Высокая загруженность, пробки" },
  { region: "Санкт-Петербург", avg: 8.4, note: "Умеренные пробки, ровный климат" },
  { region: "Самарская обл.", avg: 7.1, note: "Трассы, спокойный трафик" },
  { region: "Краснодарский кр.", avg: 7.4, note: "Жарко, кондиционер" },
  { region: "Новосибирская обл.", avg: 9.2, note: "Холодные зимы, длительный прогрев" },
  { region: "Татарстан", avg: 7.8, note: "Смешанный режим езды" },
];

export default function RealConsumptionSection() {
  const [sortKey, setSortKey] = useState<"city" | "highway" | "mixed">("mixed");

  const sorted = [...OWNERS_DATA].sort((a, b) => a[sortKey] - b[sortKey]);

  return (
    <section id="real-consumption" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <span className="inline-block bg-lada-sky text-lada-blue text-sm font-golos font-semibold px-4 py-1.5 rounded-full mb-3">
            На основе 847 отзывов
          </span>
          <h2 className="font-oswald text-4xl font-bold text-gray-900 mb-3">Реальный расход топлива</h2>
          <p className="text-gray-600 font-golos max-w-xl mx-auto">
            Данные от реальных владельцев Lada Granta. Не заводские нормы — живые цифры с дорог России.
          </p>
          <div className="w-16 h-1 bg-lada-blue rounded mx-auto mt-4" />
        </div>

        {/* График */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-10">
          <h3 className="font-oswald text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Icon name="BarChart3" size={20} className="text-lada-blue" />
            Паспортный vs реальный расход
          </h3>
          <p className="text-gray-500 text-sm font-golos mb-6">Сравнение заявленных норм с усреднёнными показателями владельцев</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={CHART_DATA} barCategoryGap="35%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontFamily: "Golos Text", fontSize: 13, fill: "#555" }} />
              <YAxis
                domain={[4, 10]}
                tickFormatter={(v) => `${v} л`}
                tick={{ fontFamily: "Golos Text", fontSize: 12, fill: "#888" }}
              />
              <Tooltip
                formatter={(val: number) => [`${val} л/100 км`]}
                contentStyle={{ fontFamily: "Golos Text", borderRadius: 10, border: "1px solid #e5e7eb" }}
              />
              <Legend wrapperStyle={{ fontFamily: "Golos Text", fontSize: 13 }} />
              <Bar dataKey="passport" name="По паспорту" fill="#93c5fd" radius={[4, 4, 0, 0]} />
              <Bar dataKey="real" name="Реальный" fill="#1a4fa0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Таблица */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h3 className="font-oswald text-xl font-bold text-gray-800 flex items-center gap-2">
              <Icon name="TableProperties" size={20} className="text-lada-blue" />
              Данные от владельцев
            </h3>
            <div className="flex gap-2">
              {[
                { key: "city", label: "Город" },
                { key: "highway", label: "Трасса" },
                { key: "mixed", label: "Смешанный" },
              ].map((s) => (
                <button
                  key={s.key}
                  onClick={() => setSortKey(s.key as typeof sortKey)}
                  className={`text-sm font-golos px-3 py-1.5 rounded-lg border transition-all ${
                    sortKey === s.key
                      ? "bg-lada-blue text-white border-lada-blue"
                      : "border-gray-200 text-gray-600 hover:border-lada-blue/40"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm font-golos">
              <thead>
                <tr className="bg-lada-blue text-white">
                  {["Модель/год", "Двигатель", "КПП", "Город", "Трасса", "Смешанный", "Комментарий"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-gray-50 hover:bg-lada-sky/40 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                  >
                    <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{row.model}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{row.engine}</td>
                    <td className="px-4 py-3 text-gray-600">{row.gearbox}</td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${row.city > 9 ? "text-red-500" : row.city < 8 ? "text-green-600" : "text-orange-500"}`}>
                        {row.city}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${row.highway > 7 ? "text-red-500" : row.highway < 6 ? "text-green-600" : "text-orange-500"}`}>
                        {row.highway}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${row.mixed > 8 ? "text-red-500" : row.mixed < 7 ? "text-green-600" : "text-orange-500"}`}>
                        {row.mixed}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 max-w-xs">{row.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2 font-golos text-right">* Расход в л/100 км. Сортировка по выбранному столбцу (по возрастанию)</p>
        </div>

        {/* Карта по регионам */}
        <div>
          <h3 className="font-oswald text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Icon name="MapPin" size={20} className="text-lada-blue" />
            Расход по регионам России
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REGIONS.map((r) => (
              <div
                key={r.region}
                className="bg-gray-50 border border-gray-100 rounded-xl p-4 hover:border-lada-blue/30 hover:bg-lada-sky/30 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="font-golos font-semibold text-gray-800 text-sm">{r.region}</div>
                  <div className="font-oswald text-xl font-bold text-lada-blue ml-2 flex-shrink-0">
                    {r.avg} л
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                  <div
                    className="h-1.5 rounded-full bg-lada-blue transition-all"
                    style={{ width: `${((r.avg - 6) / 5) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 font-golos">{r.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
