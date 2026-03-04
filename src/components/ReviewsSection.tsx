import Icon from "@/components/ui/icon";

const TESTS = [
  {
    title: "Тест-драйв Granta: замеряем расход в городе и на трассе",
    date: "Март 2024",
    city: 8.3,
    highway: 5.9,
    mixed: 7.2,
    duration: "2 000 км",
    desc: "Проехали Москва–Самара и обратно, плюс городские циклы. Машина удивила экономичностью на трассе при 90 км/ч.",
    tags: ["Трасса", "Город", "1.6 16кл"],
    color: "from-blue-500 to-lada-blue",
  },
  {
    title: "Зимний расход: Granta при −25°C",
    date: "Январь 2024",
    city: 11.2,
    highway: 8.1,
    mixed: 9.8,
    duration: "850 км",
    desc: "Сибирская зима — настоящее испытание. Прогрев по 10 минут, печка на максимуме, зимние шины — всё это ощутимо влияет.",
    tags: ["Зима", "Сибирь", "−25°C"],
    color: "from-sky-400 to-blue-600",
  },
  {
    title: "Granta vs Vesta vs Logan: кто экономичнее?",
    date: "Ноябрь 2023",
    city: null,
    highway: null,
    mixed: null,
    duration: "Сравнение",
    desc: "Сравнили три популярных бюджетных седана в одинаковых условиях. Результаты удивили: Granta не худший вариант по расходу.",
    tags: ["Сравнение", "Vesta", "Logan"],
    color: "from-lada-blue to-purple-600",
    comparison: [
      { name: "Lada Granta", city: 8.5, highway: 6.1, color: "#1a4fa0" },
      { name: "Lada Vesta", city: 8.8, highway: 6.3, color: "#3b72c8" },
      { name: "Renault Logan", city: 9.1, highway: 6.5, color: "#6b7280" },
    ],
  },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-lada-sky text-lada-blue text-sm font-golos font-semibold px-4 py-1.5 rounded-full mb-3">
            Реальные замеры
          </span>
          <h2 className="font-oswald text-4xl font-bold text-gray-900 mb-3">Тесты и обзоры</h2>
          <p className="text-gray-600 font-golos max-w-xl mx-auto">
            Подробные тест-драйвы с реальными замерами расхода в разных условиях
          </p>
          <div className="w-16 h-1 bg-lada-blue rounded mx-auto mt-4" />
        </div>

        <div className="space-y-6">
          {TESTS.map((test, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              {/* Шапка */}
              <div className={`bg-gradient-to-r ${test.color} p-6`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {test.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/20 text-white text-xs font-golos px-2.5 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-oswald text-xl font-bold text-white mb-1">{test.title}</h3>
                    <div className="flex items-center gap-3 text-white/70 text-sm font-golos">
                      <span>{test.date}</span>
                      <span>·</span>
                      <span>{test.duration}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="PlayCircle" size={24} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Тело */}
              <div className="p-6">
                <p className="text-gray-600 font-golos mb-5 leading-relaxed">{test.desc}</p>

                {test.city !== null ? (
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Город", value: test.city, icon: "Building2" },
                      { label: "Трасса", value: test.highway, icon: "Navigation" },
                      { label: "Смешанный", value: test.mixed, icon: "Route" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-gray-50 rounded-xl p-4 text-center">
                        <Icon name={stat.icon} size={16} className="text-lada-blue mx-auto mb-1.5" />
                        <div className="font-oswald text-2xl font-bold text-lada-blue">{stat.value}</div>
                        <div className="text-gray-500 text-xs font-golos mt-0.5">{stat.label}, л/100 км</div>
                      </div>
                    ))}
                  </div>
                ) : test.comparison ? (
                  <div className="space-y-3">
                    {test.comparison.map((car) => (
                      <div key={car.name} className="flex items-center gap-4">
                        <div className="w-32 font-golos text-sm font-semibold text-gray-700 flex-shrink-0">{car.name}</div>
                        <div className="flex-1 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400 w-12">Город</span>
                            <div className="flex-1 bg-gray-100 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all"
                                style={{ width: `${(car.city / 12) * 100}%`, background: car.color }}
                              />
                            </div>
                            <span className="text-xs font-golos font-bold text-gray-700 w-12 text-right">{car.city} л</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400 w-12">Трасса</span>
                            <div className="flex-1 bg-gray-100 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all"
                                style={{ width: `${(car.highway / 12) * 100}%`, background: car.color }}
                              />
                            </div>
                            <span className="text-xs font-golos font-bold text-gray-700 w-12 text-right">{car.highway} л</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
