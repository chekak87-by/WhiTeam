import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('web');

  return (
    <div className="w-full max-w-6xl mx-auto py-4 px-4 md:px-8 pb-16">
      
      {/* === ЗАГОЛОВОК И ПЕРЕКЛЮЧАТЕЛЬ === */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Наши <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">работы</span>
          </h2>
          <p className="text-zinc-400 max-w-xl text-sm md:text-base leading-relaxed">
            Мы создаем цифровые продукты, которые решают задачи бизнеса и выглядят безупречно.
          </p>
        </div>

        {/* Интерактивный тумблер */}
        <div className="flex bg-[#09090B] p-1.5 rounded-xl border border-zinc-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.3)] self-center md:self-end shrink-0 w-full md:w-auto relative z-20">
          <button
            onClick={() => setActiveTab('web')}
            className={`relative flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === 'web' 
                ? 'text-white' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {activeTab === 'web' && (
              <motion.div
                layoutId="portfolio-tab"
                className="absolute inset-0 bg-zinc-800/60 border border-zinc-700/50 rounded-lg shadow-inner"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">Веб-разработка</span>
          </button>
          <button
            onClick={() => setActiveTab('bot')}
            className={`relative flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === 'bot' 
                ? 'text-white' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {activeTab === 'bot' && (
              <motion.div
                layoutId="portfolio-tab"
                className="absolute inset-0 bg-zinc-800/60 border border-zinc-700/50 rounded-lg shadow-inner"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">Telegram-Боты</span>
          </button>
        </div>
      </div>

      {/* === ФУТУРИСТИЧНАЯ ЗАГЛУШКА ПРОЕКТОВ === */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-[2rem] border border-zinc-800/60 bg-[#09090B] overflow-hidden flex items-center justify-center group shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
        
        {/* Паттерн сетки на фоне (еле заметный) */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')]"></div>
        
        {/* Неоновый шар в центре, который реагирует на наведение */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full group-hover:bg-purple-500/20 group-hover:w-80 group-hover:h-80 transition-all duration-700 pointer-events-none"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center text-center px-6"
          >
            {/* Меняющаяся иконка */}
            <div className="w-20 h-20 mb-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl group-hover:border-purple-500/40 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-500 relative">
              {activeTab === 'web' ? (
                <svg className="w-10 h-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              ) : (
                <svg className="w-10 h-10 text-purple-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.204-.054-.318-.346-.116l-6.405 4.032-2.76-.864c-.602-.188-.616-.602.126-.894l10.793-4.156c.5-.188.948.113.826.852z" /></svg>
              )}
              {/* Пульсирующий индикатор сборки */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
              {activeTab === 'web' ? 'Проекты на стадии упаковки' : 'Боты проходят модерацию'}
            </h3>
            
            <p className="text-zinc-400 max-w-md text-sm md:text-base leading-relaxed">
              {activeTab === 'web' 
                ? 'Мы скрупулезно собираем наши лучшие веб-проекты в детальные кейсы. Совсем скоро этот раздел заполнится эстетикой и чистым кодом.' 
                : 'Наши Telegram-боты прямо сейчас решают задачи реальных бизнесов. Готовим красивые и интерактивные демонстрации их работы.'}
            </p>

            {/* Имитация процесса (точки) */}
            <div className="mt-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-[bounce_1.4s_infinite_0ms]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-[bounce_1.4s_infinite_200ms]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-[bounce_1.4s_infinite_400ms]"></span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}