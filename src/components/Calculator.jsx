import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- БАЗА ДАННЫХ ЦЕН (Рынок РФ - 20%) ---
const SERVICES = {
  web: {
    title: 'Веб-разработка',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
    ),
    bases: [
      { id: 'w1', title: 'Лендинг (Promo)', desc: 'Продающий одностраничник', price: 36000 },
      { id: 'w2', title: 'Корпоративный сайт', desc: 'Сайт компании, до 10 страниц', price: 76000 },
      { id: 'w3', title: 'E-commerce', desc: 'Полноценный интернет-магазин', price: 160000 },
      { id: 'w4', title: 'Веб-приложение (SaaS)', desc: 'Сложный портал с личным кабинетом', price: 280000 },
    ],
    features: [
      { id: 'wf1', title: 'Premium UI/UX Дизайн', desc: 'Индивидуальная отрисовка без шаблонов', price: 24000 },
      { id: 'wf2', title: '3D-анимации и WebGL', desc: 'Сложные эффекты физики и скролла', price: 32000 },
      { id: 'wf3', title: 'Онлайн-оплата', desc: 'Эквайринг (ЮKassa, Stripe, Tinkoff)', price: 16000 },
      { id: 'wf4', title: 'Кастомная Админ-панель', desc: 'Удобное управление всем контентом', price: 40000 },
      { id: 'wf5', title: 'Синхронизация с 1С/CRM', desc: 'Двусторонний обмен данными', price: 32000 },
      { id: 'wf6', title: 'Личный кабинет', desc: 'Авторизация и профили пользователей', price: 28000 },
      { id: 'wf7', title: 'Мультиязычность', desc: 'Поддержка нескольких языков (i18n)', price: 12000 },
      { id: 'wf8', title: 'Базовая SEO-оптимизация', desc: 'Подготовка под Яндекс и Google', price: 12000 },
    ]
  },
  bot: {
    title: 'Telegram-Бот',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
    ),
    bases: [
      { id: 'b1', title: 'Бот-Визитка', desc: 'Инфо-бот с кнопками и навигацией', price: 20000 },
      { id: 'b2', title: 'Telegram-Магазин', desc: 'Каталог товаров, корзина, заказы', price: 52000 },
      { id: 'b3', title: 'Бот-Сервис (Утилита)', desc: 'Сложная логика, бронирование, SaaS', price: 90000 },
    ],
    features: [
      { id: 'bf1', title: 'Web App (Mini App)', desc: 'Встроенный веб-интерфейс внутри ТГ', price: 40000 },
      { id: 'bf2', title: 'Интеграция AI (Нейросети)', desc: 'Подключение ChatGPT / Claude API', price: 32000 },
      { id: 'bf3', title: 'Оплата в Telegram', desc: 'Telegram Stars / ЮKassa', price: 20000 },
      { id: 'bf4', title: 'Админка прямо в ТГ', desc: 'Управление ботом без выхода из приложения', price: 16000 },
      { id: 'bf5', title: 'Парсинг данных', desc: 'Сбор информации со сторонних сайтов', price: 24000 },
      { id: 'bf6', title: 'Воронки и рассылки', desc: 'Система прогрева аудитории', price: 12000 },
      { id: 'bf7', title: 'Анти-спам модерация', desc: 'Защита чатов и удаление ссылок', price: 12000 },
    ]
  },
  general: [
    { id: 'g1', title: 'Айдентика и Логотип', desc: 'Разработка фирменного стиля проекта', price: 20000 },
    { id: 'g2', title: 'Копирайтинг', desc: 'Написание продающих текстов (до 5 стр.)', price: 12000 },
    { id: 'g3', title: 'Техническая поддержка', desc: '1 месяц приоритетного сопровождения', price: 12000, suffix: '/мес' },
  ]
};

export default function Calculator() {
  const [platform, setPlatform] = useState('web'); // 'web' или 'bot'
  const [selectedBase, setSelectedBase] = useState('w2'); // По дефолту Корпоративный
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  // Обработка переключения платформы
  const handlePlatformSwitch = (newPlatform) => {
    setPlatform(newPlatform);
    setSelectedBase(SERVICES[newPlatform].bases[0].id);
    setSelectedFeatures([]); // Сбрасываем фичи при смене платформы
  };

  // Выбор базы (Радио-кнопка)
  const handleBaseSelect = (id) => setSelectedBase(id);

  // Выбор дополнительных фич (Чекбоксы)
  const toggleFeature = (id) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  // --- МАТЕМАТИКА ---
  const currentBase = SERVICES[platform].bases.find(b => b.id === selectedBase);
  const basePrice = currentBase ? currentBase.price : 0;
  
  const featuresPrice = selectedFeatures.reduce((acc, featureId) => {
    // Ищем фичу в текущей платформе или в общих
    const feature = SERVICES[platform].features.find(f => f.id === featureId) || 
                    SERVICES.general.find(g => g.id === featureId);
    return acc + (feature ? feature.price : 0);
  }, 0);

  const totalPrice = basePrice + featuresPrice;

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 md:px-8">
      
      {/* Заголовок секции */}
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Прозрачная <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">смета</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed">
          Мы не берем цены с потолка. Собери свой идеальный продукт как конструктор 
          и мгновенно узнай его стоимость на рынке. Никаких скрытых платежей.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start">
        
        {/* ЛЕВАЯ ЧАСТЬ: КОНСТРУКТОР */}
        <div className="w-full xl:w-2/3 flex flex-col gap-8">
          
          {/* 1. Выбор платформы (Web / Bot) */}
          <div className="flex bg-[#09090B] border border-zinc-800/80 p-1.5 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            {Object.keys(SERVICES).filter(k => k !== 'general').map((key) => {
              const isActive = platform === key;
              return (
                <button
                  key={key}
                  onClick={() => handlePlatformSwitch(key)}
                  className={`relative flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="platform-indicator"
                      className="absolute inset-0 bg-zinc-800/50 border border-zinc-700/50 rounded-lg shadow-inner"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {SERVICES[key].icon}
                    {SERVICES[key].title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 2. Выбор масштаба проекта (Основа) */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Масштаб проекта
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SERVICES[platform].bases.map((base) => {
                const isSelected = selectedBase === base.id;
                return (
                  <div 
                    key={base.id}
                    onClick={() => handleBaseSelect(base.id)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 flex flex-col gap-1 ${
                      isSelected 
                        ? 'bg-purple-900/10 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                        : 'bg-[#09090B] border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`font-semibold ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                        {base.title}
                      </span>
                      <div className={`w-4 h-4 rounded-full border-2 mt-1 flex items-center justify-center transition-colors ${
                        isSelected ? 'border-purple-500' : 'border-zinc-700'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-purple-500" />}
                      </div>
                    </div>
                    <span className="text-xs text-zinc-500">{base.desc}</span>
                    <span className="text-sm font-mono text-purple-400/80 mt-2">
                      {base.price.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Функционал (Web / Bot) */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
              Модули и интеграции
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SERVICES[platform].features.map((feat) => {
                const isChecked = selectedFeatures.includes(feat.id);
                return (
                  <div 
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`cursor-pointer group p-3 px-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                      isChecked 
                        ? 'bg-white/5 border-zinc-500/50' 
                        : 'bg-transparent border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className={`text-sm font-medium transition-colors ${isChecked ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}`}>
                        {feat.title}
                      </span>
                      <span className="text-[11px] text-zinc-600 mt-0.5">{feat.desc}</span>
                    </div>
                    <div className="text-right ml-4 shrink-0">
                      <span className={`text-xs font-mono transition-colors ${isChecked ? 'text-purple-400' : 'text-zinc-500'}`}>
                        +{feat.price.toLocaleString('ru-RU')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Общие услуги (Брендинг, копирайтинг) */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-600"></span>
              Дополнительные услуги
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {SERVICES.general.map((feat) => {
                const isChecked = selectedFeatures.includes(feat.id);
                return (
                  <div 
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`cursor-pointer group p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between min-h-[90px] ${
                      isChecked 
                        ? 'bg-white/5 border-zinc-500/50' 
                        : 'bg-transparent border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className={`text-sm font-medium transition-colors ${isChecked ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}`}>
                        {feat.title}
                      </div>
                      <div className="text-[10px] text-zinc-600 mt-1 leading-tight">{feat.desc}</div>
                    </div>
                    <div className={`text-xs font-mono mt-2 transition-colors ${isChecked ? 'text-purple-400' : 'text-zinc-500'}`}>
                      +{feat.price.toLocaleString('ru-RU')} {feat.suffix || '₽'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ПРАВАЯ ЧАСТЬ: ИТОГОВАЯ ПАНЕЛЬ (Dashboard) */}
        <div className="w-full xl:w-1/3 xl:sticky xl:top-24 mt-8 xl:mt-0">
          <div className="bg-[#09090B] border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
            
            {/* Декоративное свечение */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"></div>

            <h4 className="text-zinc-400 font-mono text-sm tracking-widest uppercase mb-6">Смета проекта</h4>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-500 mb-1">Базовая разработка</span>
                  <span className="text-white text-sm font-medium">{currentBase?.title}</span>
                </div>
                <span className="text-white font-mono">{basePrice.toLocaleString('ru-RU')} ₽</span>
              </div>

              <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-500 mb-1">Дополнительные опции</span>
                  <span className="text-zinc-300 text-sm">{selectedFeatures.length} модулей</span>
                </div>
                <span className="text-purple-400 font-mono">+{featuresPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-xs text-zinc-500 uppercase tracking-widest">Итоговая стоимость</span>
              <div className="flex items-baseline gap-2 mt-2">
                <AnimatePresence mode="popLayout">
                  <motion.span 
                    key={totalPrice}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    className="text-4xl md:text-5xl font-bold text-white"
                  >
                    {totalPrice.toLocaleString('ru-RU')}
                  </motion.span>
                </AnimatePresence>
                <span className="text-xl text-purple-500 font-medium">₽</span>
              </div>
              <p className="text-[10px] text-zinc-600 mt-2 leading-tight">
                *Финальная стоимость может незначительно измениться после составления детального ТЗ.
              </p>
            </div>

            <button className="w-full mt-8 bg-white hover:bg-zinc-200 text-black font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Обсудить проект
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}