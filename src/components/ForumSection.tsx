import { useState } from "react";
import Icon from "@/components/ui/icon";

const INITIAL_REVIEWS = [
  {
    name: "Алексей К.",
    city: "Москва",
    model: "Granta 2021",
    engine: "1.6 16кл",
    gearbox: "АМТ",
    city_cons: 8.8,
    highway_cons: 6.2,
    comment:
      "Езжу два года. Расход в городе стабильный — 8.5–9. На трассе удалось добиться 5.8 л при 90 км/ч. Главное — не торопиться.",
    date: "12 февраля 2024",
    likes: 14,
    rating: 4,
  },
  {
    name: "Марина С.",
    city: "Краснодар",
    model: "Granta 2022",
    engine: "1.6 8кл",
    gearbox: "МКПП",
    city_cons: 7.9,
    highway_cons: 5.7,
    comment:
      "У нас тепло, поэтому без прогрева и зимних шин. Летом с кондиционером — около 8.5. Осенью–весной — 7.5–8 в смешанном режиме.",
    date: "3 марта 2024",
    likes: 8,
    rating: 5,
  },
  {
    name: "Дмитрий В.",
    city: "Новосибирск",
    model: "Granta 2019",
    engine: "1.6 8кл",
    gearbox: "МКПП",
    city_cons: 10.5,
    highway_cons: 7.1,
    comment:
      "Зимой в −30 расход доходит до 12–13 л. Машина прогревается минут 20. Летом всё нормально — около 7.5 в смешанном.",
    date: "18 января 2024",
    likes: 22,
    rating: 3,
  },
  {
    name: "Игорь П.",
    city: "Самара",
    model: "Granta 2023",
    engine: "1.6 16кл",
    gearbox: "МКПП",
    city_cons: 8.1,
    highway_cons: 5.9,
    comment:
      "Новая машина, пробег 15 000. Пока расход устраивает. На трассе Самара–Тольятти при 90 км/ч получил 5.6 л — очень доволен.",
    date: "5 апреля 2024",
    likes: 6,
    rating: 5,
  },
];

const ENGINES = ["Все двигатели", "1.6 8кл", "1.6 16кл"];
const GEARBOXES = ["Все КПП", "МКПП", "АМТ"];

export default function ForumSection() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [filterEngine, setFilterEngine] = useState("Все двигатели");
  const [filterGearbox, setFilterGearbox] = useState("Все КПП");

  const [form, setForm] = useState({
    name: "",
    city: "",
    model: "",
    engine: "1.6 8кл",
    gearbox: "МКПП",
    city_cons: "",
    highway_cons: "",
    comment: "",
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);

  const filtered = reviews.filter(
    (r) =>
      (filterEngine === "Все двигатели" || r.engine === filterEngine) &&
      (filterGearbox === "Все КПП" || r.gearbox === filterGearbox)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.comment || !form.city_cons) return;
    const newReview = {
      name: form.name,
      city: form.city || "Не указан",
      model: form.model || "Granta",
      engine: form.engine,
      gearbox: form.gearbox,
      city_cons: parseFloat(form.city_cons) || 8.0,
      highway_cons: parseFloat(form.highway_cons) || 6.0,
      comment: form.comment,
      date: new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }),
      likes: 0,
      rating: form.rating,
    };
    setReviews([newReview, ...reviews]);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", city: "", model: "", engine: "1.6 8кл", gearbox: "МКПП", city_cons: "", highway_cons: "", comment: "", rating: 5 });
  };

  return (
    <section id="forum" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-lada-sky text-lada-blue text-sm font-golos font-semibold px-4 py-1.5 rounded-full mb-3">
            Сообщество владельцев
          </span>
          <h2 className="font-oswald text-4xl font-bold text-gray-900 mb-3">Отзывы владельцев</h2>
          <p className="text-gray-600 font-golos max-w-xl mx-auto">
            Поделитесь своим реальным расходом и помогите другим принять решение
          </p>
          <div className="w-16 h-1 bg-lada-blue rounded mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Форма */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
              <h3 className="font-oswald text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Icon name="PenLine" size={20} className="text-lada-blue" />
                Расскажите о своём расходе
              </h3>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <Icon name="CheckCircle" size={32} className="text-green-500 mx-auto mb-2" />
                  <div className="font-golos font-semibold text-green-700">Спасибо!</div>
                  <div className="text-green-600 text-sm font-golos">Ваш отзыв добавлен</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-golos font-medium text-gray-600 mb-1">Ваше имя *</label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Имя"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-golos focus:outline-none focus:ring-2 focus:ring-lada-blue/25 focus:border-lada-blue"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-golos font-medium text-gray-600 mb-1">Город</label>
                      <input
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="Город"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-golos focus:outline-none focus:ring-2 focus:ring-lada-blue/25 focus:border-lada-blue"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-golos font-medium text-gray-600 mb-1">Модель/год</label>
                    <input
                      value={form.model}
                      onChange={(e) => setForm({ ...form, model: e.target.value })}
                      placeholder="Granta 2022"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-golos focus:outline-none focus:ring-2 focus:ring-lada-blue/25 focus:border-lada-blue"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-golos font-medium text-gray-600 mb-1">Двигатель</label>
                      <select
                        value={form.engine}
                        onChange={(e) => setForm({ ...form, engine: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-golos focus:outline-none focus:ring-2 focus:ring-lada-blue/25 focus:border-lada-blue bg-white"
                      >
                        <option>1.6 8кл</option>
                        <option>1.6 16кл</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-golos font-medium text-gray-600 mb-1">КПП</label>
                      <select
                        value={form.gearbox}
                        onChange={(e) => setForm({ ...form, gearbox: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-golos focus:outline-none focus:ring-2 focus:ring-lada-blue/25 focus:border-lada-blue bg-white"
                      >
                        <option>МКПП</option>
                        <option>АМТ</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-golos font-medium text-gray-600 mb-1">Город, л/100 км *</label>
                      <input
                        type="number"
                        step="0.1"
                        value={form.city_cons}
                        onChange={(e) => setForm({ ...form, city_cons: e.target.value })}
                        placeholder="8.5"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-golos focus:outline-none focus:ring-2 focus:ring-lada-blue/25 focus:border-lada-blue"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-golos font-medium text-gray-600 mb-1">Трасса, л/100 км</label>
                      <input
                        type="number"
                        step="0.1"
                        value={form.highway_cons}
                        onChange={(e) => setForm({ ...form, highway_cons: e.target.value })}
                        placeholder="6.0"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-golos focus:outline-none focus:ring-2 focus:ring-lada-blue/25 focus:border-lada-blue"
                      />
                    </div>
                  </div>

                  {/* Рейтинг */}
                  <div>
                    <label className="block text-xs font-golos font-medium text-gray-600 mb-1">Оценка</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setForm({ ...form, rating: s })}
                          className={`text-2xl transition-transform hover:scale-110 ${s <= form.rating ? "text-yellow-400" : "text-gray-200"}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-golos font-medium text-gray-600 mb-1">Комментарий *</label>
                    <textarea
                      value={form.comment}
                      onChange={(e) => setForm({ ...form, comment: e.target.value })}
                      placeholder="Расскажите об условиях эксплуатации, особенностях расхода..."
                      rows={3}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-golos focus:outline-none focus:ring-2 focus:ring-lada-blue/25 focus:border-lada-blue resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-lada-blue text-white font-golos font-semibold py-3 rounded-lg hover:bg-lada-blue-dark transition-all hover:scale-[1.02]"
                  >
                    Опубликовать отзыв
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Лента отзывов */}
          <div className="lg:col-span-3">
            {/* Фильтры */}
            <div className="flex flex-wrap gap-2 mb-5">
              {ENGINES.map((e) => (
                <button
                  key={e}
                  onClick={() => setFilterEngine(e)}
                  className={`text-sm font-golos px-3 py-1.5 rounded-lg border transition-all ${
                    filterEngine === e
                      ? "bg-lada-blue text-white border-lada-blue"
                      : "border-gray-200 text-gray-600 hover:border-lada-blue/40"
                  }`}
                >
                  {e}
                </button>
              ))}
              <div className="w-px bg-gray-200 mx-1" />
              {GEARBOXES.map((g) => (
                <button
                  key={g}
                  onClick={() => setFilterGearbox(g)}
                  className={`text-sm font-golos px-3 py-1.5 rounded-lg border transition-all ${
                    filterGearbox === g
                      ? "bg-lada-blue text-white border-lada-blue"
                      : "border-gray-200 text-gray-600 hover:border-lada-blue/40"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filtered.map((review, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-xl border border-gray-100 p-5 hover:border-lada-blue/20 transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-lada-blue/15 flex items-center justify-center flex-shrink-0">
                        <span className="font-oswald font-bold text-lada-blue text-sm">
                          {review.name[0]}
                        </span>
                      </div>
                      <div>
                        <div className="font-golos font-semibold text-gray-900 text-sm">{review.name}</div>
                        <div className="text-gray-400 text-xs font-golos">{review.city} · {review.date}</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-yellow-400 text-sm">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
                      <div className="text-xs text-gray-400 font-golos">{review.model}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-lada-sky text-lada-blue text-xs font-golos font-semibold px-2.5 py-1 rounded-full">
                      {review.engine}
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs font-golos px-2.5 py-1 rounded-full">
                      {review.gearbox}
                    </span>
                    <span className="bg-gray-100 text-gray-700 text-xs font-golos px-2.5 py-1 rounded-full">
                      Город: <strong>{review.city_cons}</strong> л
                    </span>
                    <span className="bg-gray-100 text-gray-700 text-xs font-golos px-2.5 py-1 rounded-full">
                      Трасса: <strong>{review.highway_cons}</strong> л
                    </span>
                  </div>

                  <p className="text-gray-600 font-golos text-sm leading-relaxed">{review.comment}</p>

                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                    <button className="flex items-center gap-1.5 text-gray-400 hover:text-lada-blue text-xs font-golos transition-colors">
                      <Icon name="ThumbsUp" size={13} />
                      {review.likes} полезно
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
