import Icon from "@/components/ui/icon";

export default function FooterSection() {
  return (
    <footer className="bg-lada-blue-dark text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Лого и описание */}
          <div>
            <div className="font-oswald text-2xl font-bold mb-3">
              Granta<span className="text-blue-300">Расход</span>.рф
            </div>
            <p className="text-blue-200 text-sm font-golos leading-relaxed mb-4">
              Независимый информационный ресурс о реальном расходе топлива Lada Granta. Данные от живых владельцев.
            </p>
            <div className="flex gap-3">
              {["Mail", "MessageCircle", "Share2"].map((icon) => (
                <button
                  key={icon}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Icon name={icon} size={16} className="text-blue-200" />
                </button>
              ))}
            </div>
          </div>

          {/* Разделы */}
          <div>
            <h4 className="font-oswald text-base font-bold mb-4 text-blue-100">Разделы сайта</h4>
            <ul className="space-y-2">
              {[
                { label: "Главная", id: "hero" },
                { label: "Реальный расход", id: "real-consumption" },
                { label: "Факторы влияния", id: "factors" },
                { label: "Советы по экономии", id: "tips" },
                { label: "Тесты и обзоры", id: "reviews" },
                { label: "Отзывы владельцев", id: "forum" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
                    className="text-blue-300 hover:text-white text-sm font-golos transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты и ссылки */}
          <div>
            <h4 className="font-oswald text-base font-bold mb-4 text-blue-100">Официальные ресурсы</h4>
            <ul className="space-y-2 mb-6">
              {[
                { label: "АвтоВАЗ — официальный сайт", url: "https://www.lada.ru" },
                { label: "Lada Granta — комплектации", url: "https://www.lada.ru/cars/granta" },
                { label: "Сервисные центры", url: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-white text-sm font-golos transition-colors flex items-center gap-1.5"
                  >
                    <Icon name="ExternalLink" size={12} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-blue-300 text-sm font-golos">
              <Icon name="Mail" size={14} />
              <span>info@granta-rashod.ru</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-blue-300 text-xs font-golos">
            © 2024 ГрантаРасход.рф · Все права защищены
          </p>
          <p className="text-blue-400 text-xs font-golos max-w-md text-right">
            Данные носят справочный характер. Реальный расход зависит от множества факторов: стиля вождения, технического состояния, климата и условий эксплуатации.
          </p>
        </div>
      </div>
    </footer>
  );
}
