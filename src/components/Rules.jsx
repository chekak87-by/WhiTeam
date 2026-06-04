import { motion } from 'framer-motion';

// === МАССИВ С ПРАВИЛАМИ (ВЕСЬ ТЕКСТ ЗДЕСЬ) ===
const RULES_DATA = [
  {
    id: '01',
    title: 'Погружение и ТЗ',
    desc: 'Начинаем с детального брифинга. Мы не пишем код «вслепую». Мы изучаем ваш бизнес, конкурентов и целевую аудиторию. Итогом этого этапа становится подробное Техническое Задание (ТЗ) и утвержденная смета.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg>
  },
  {
    id: '02',
    title: 'Оплата и старт',
    desc: 'Мы работаем по системе 50/50. После утверждения ТЗ вносится предоплата 50%, и команда приступает к дизайну и разработке. Оставшаяся часть оплачивается только после успешного тестирования и приемки готового проекта.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
  },
  {
    id: '03',
    title: 'Дизайн и Разработка',
    desc: 'Процесс абсолютно прозрачен. Мы показываем промежуточные результаты: сначала структуру, затем UI-дизайн, а после — работающий прототип сайта или логику Telegram-бота на тестовом сервере.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"></path></svg>
  },
  {
    id: '04',
    title: 'Правки и Утверждение',
    desc: 'В стоимость заложено 2 бесплатных итерации глобальных правок на этапе дизайна. Это гарантирует, что итоговый продукт будет на 100% соответствовать вашим ожиданиям без раздувания бюджета.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"></path></svg>
  },
  {
    id: '05',
    title: 'Релиз и Поддержка',
    desc: 'Разворачиваем проект на вашем домене или сервере, передаем права на исходный код и ключи от ботов. В течение 1 месяца после запуска мы бесплатно оказываем техническую поддержку и мониторим стабильность работы.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.45m.31-.311a14.9 14.9 0 01-2.448-2.45"></path></svg>
  }
];

// === АНИМАЦИИ ===
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function Rules({ setActivePage }) {
  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-4 md:px-8 pb-16">
      
      {/* Заголовок */}
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Регламент <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">работы</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed">
          Предсказуемый результат рождается из прозрачных процессов. 
          Мы ценим ваше время, поэтому выстроили работу так, чтобы на каждом этапе вы понимали, что происходит.
        </p>
      </div>

      {/* Список правил */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6 relative"
      >
        {/* Декоративная линия слева (видна только на ПК) */}
        <div className="hidden md:block absolute left-[31px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-purple-500/50 via-zinc-800/50 to-transparent"></div>

        {RULES_DATA.map((rule) => (
          <motion.div 
            key={rule.id}
            variants={cardVariants}
            className="relative flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-2xl bg-[#09090B] border border-zinc-800/80 overflow-hidden group hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-500 z-10"
          >
            {/* Иконка (с кругом на ПК для линии) */}
            <div className="shrink-0 relative">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-purple-400 group-hover:border-purple-500/50 transition-colors duration-500 relative z-20 shadow-lg">
                {rule.icon}
              </div>
            </div>

            {/* Текст */}
            <div className="flex flex-col relative z-20 mt-2 md:mt-0">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                <span className="text-purple-500 font-mono text-sm tracking-widest md:hidden">{rule.id}</span>
                {rule.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                {rule.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Выделенный CTA-блок с кнопкой */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12 relative p-6 md:p-8 rounded-2xl border border-zinc-700/50 bg-[#09090B] text-center overflow-hidden group shadow-[0_0_40px_rgba(0,0,0,0.3)] hover:border-purple-500/40 transition-colors duration-500"
      >
        {/* Неоновая подсветка при наведении */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <p className="text-zinc-300 text-sm md:text-base relative z-10 leading-loose md:leading-normal">
          Остались вопросы по процессам? Мы готовы 
          <button 
            onClick={() => setActivePage('contacts')}
            className="inline-flex items-center justify-center px-5 py-1.5 mx-2 text-sm font-medium text-white bg-purple-500/10 border border-purple-500/40 rounded-full hover:bg-purple-500/20 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            обсудить
          </button>
          их индивидуально перед стартом.
        </p>
      </motion.div>

    </div>
  );
}