import { translations } from '../translations';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Calculator({ setActivePage, lang }) {
  const t = translations[lang];

  // === ОБЪЕКТ SERVICES ПЕРЕНЕСЕН ВНУТРЬ ===
  const SERVICES = {
    web: {
      title: t.c_web,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
      ),
      bases: [
        { id: 'w1', title: t.c_w1_t, desc: t.c_w1_d, price: { RUB: 36000, USD: 350 } },
        { id: 'w2', title: t.c_w2_t, desc: t.c_w2_d, price: { RUB: 76000, USD: 750 } },
        { id: 'w3', title: t.c_w3_t, desc: t.c_w3_d, price: { RUB: 160000, USD: 1500 } },
        { id: 'w4', title: t.c_w4_t, desc: t.c_w4_d, price: { RUB: 280000, USD: 2500 } },
      ],
      features: [
        { id: 'wf1', title: t.c_wf1_t, desc: t.c_wf1_d, price: { RUB: 24000, USD: 240 } },
        { id: 'wf2', title: t.c_wf2_t, desc: t.c_wf2_d, price: { RUB: 32000, USD: 320 } },
        { id: 'wf3', title: t.c_wf3_t, desc: t.c_wf3_d, price: { RUB: 16000, USD: 150 } },
        { id: 'wf4', title: t.c_wf4_t, desc: t.c_wf4_d, price: { RUB: 40000, USD: 400 } },
        { id: 'wf5', title: t.c_wf5_t, desc: t.c_wf5_d, price: { RUB: 32000, USD: 320 } },
        { id: 'wf6', title: t.c_wf6_t, desc: t.c_wf6_d, price: { RUB: 28000, USD: 280 } },
        { id: 'wf7', title: t.c_wf7_t, desc: t.c_wf7_d, price: { RUB: 12000, USD: 120 } },
        { id: 'wf8', title: t.c_wf8_t, desc: t.c_wf8_d, price: { RUB: 12000, USD: 120 } },
      ]
    },
    bot: {
      title: t.c_bot,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.204-.054-.318-.346-.116l-6.405 4.032-2.76-.864c-.602-.188-.616-.602.126-.894l10.793-4.156c.5-.188.948.113.826.852z" /></svg>
      ),
      bases: [
        { id: 'b1', title: t.c_b1_t, desc: t.c_b1_d, price: { RUB: 20000, USD: 200 } },
        { id: 'b2', title: t.c_b2_t, desc: t.c_b2_d, price: { RUB: 52000, USD: 500 } },
        { id: 'b3', title: t.c_b3_t, desc: t.c_b3_d, price: { RUB: 90000, USD: 900 } },
      ],
      features: [
        { id: 'bf1', title: t.c_bf1_t, desc: t.c_bf1_d, price: { RUB: 40000, USD: 400 } },
        { id: 'bf2', title: t.c_bf2_t, desc: t.c_bf2_d, price: { RUB: 32000, USD: 320 } },
        { id: 'bf3', title: t.c_bf3_t, desc: t.c_bf3_d, price: { RUB: 20000, USD: 200 } },
        { id: 'bf4', title: t.c_bf4_t, desc: t.c_bf4_d, price: { RUB: 16000, USD: 150 } },
        { id: 'bf5', title: t.c_bf5_t, desc: t.c_bf5_d, price: { RUB: 24000, USD: 240 } },
        { id: 'bf6', title: t.c_bf6_t, desc: t.c_bf6_d, price: { RUB: 12000, USD: 120 } },
        { id: 'bf7', title: t.c_bf7_t, desc: t.c_bf7_d, price: { RUB: 12000, USD: 120 } },
      ]
    },
    general: [
      { id: 'g1', title: t.c_g1_t, desc: t.c_g1_d, price: { RUB: 20000, USD: 200 } },
      { id: 'g2', title: t.c_g2_t, desc: t.c_g2_d, price: { RUB: 12000, USD: 120 } },
      { id: 'g3', title: t.c_g3_t, desc: t.c_g3_d, price: { RUB: 12000, USD: 120 }, isMonthly: true },
    ]
  };

  const [platform, setPlatform] = useState('web');
  const [selectedBase, setSelectedBase] = useState('w2');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [currency, setCurrency] = useState('RUB');

  const handlePlatformSwitch = (newPlatform) => {
    setPlatform(newPlatform);
    setSelectedBase(SERVICES[newPlatform].bases[0].id);
    setSelectedFeatures([]);
  };

  const handleBaseSelect = (id) => setSelectedBase(id);

  const toggleFeature = (id) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  // Функция для вывода цен с учетом языка (рубли/месяцы)
  const renderPrice = (priceObj, isMonthly = false) => {
    if (currency === 'RUB') {
      return `${priceObj.RUB.toLocaleString('ru-RU')} ${isMonthly ? t.c_mo_rub : '₽'}`;
    } else {
      return `$${priceObj.USD.toLocaleString('en-US')}${isMonthly ? t.c_mo_usd : ''}`;
    }
  };

  const currentBase = SERVICES[platform].bases.find(b => b.id === selectedBase);
  const basePrice = currentBase ? currentBase.price[currency] : 0;
  
  const featuresPrice = selectedFeatures.reduce((acc, featureId) => {
    const feature = SERVICES[platform].features.find(f => f.id === featureId) || 
                    SERVICES.general.find(g => g.id === featureId);
    return acc + (feature ? feature.price[currency] : 0);
  }, 0);

  const totalPrice = basePrice + featuresPrice;

  return (
    <div className="w-full max-w-6xl mx-auto py-4 px-4 md:px-8">
      
      {/* Заголовок */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          {t.calcTitle1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">{t.calcTitle2}</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed">
          {t.calcSubtitle}
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start relative">
        
        {/* ЛЕВАЯ КОЛОНКА (Модули) */}
        <div className="w-full xl:w-2/3 flex flex-col gap-8">
          
          {/* Свитчер платформ */}
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

          {/* Масштаб проекта */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              {t.calcScale}
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
                      {renderPrice(base.price, base.isMonthly)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Модули и интеграции */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
              {t.calcModules}
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
                        ? 'bg-purple-900/10 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                        : 'bg-[#09090B] border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900'
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
                        +{renderPrice(feat.price, feat.isMonthly)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Дополнительные услуги */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-600"></span>
              {t.calcExtra}
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
                        ? 'bg-purple-900/10 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                        : 'bg-[#09090B] border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900'
                    }`}
                  >
                    <div>
                      <div className={`text-sm font-medium transition-colors ${isChecked ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}`}>
                        {feat.title}
                      </div>
                      <div className="text-[10px] text-zinc-600 mt-1 leading-tight">{feat.desc}</div>
                    </div>
                    <div className={`text-xs font-mono mt-2 transition-colors ${isChecked ? 'text-purple-400' : 'text-zinc-500'}`}>
                      +{renderPrice(feat.price, feat.isMonthly)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ПРАВАЯ КОЛОНКА - Итог */}
        <div className="w-full xl:w-1/3 xl:sticky xl:top-0 mt-8 xl:mt-0">
          <div className="bg-[#09090B] border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
            
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"></div>

            {/* Заголовок сметы и тумблер валют */}
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h4 className="text-zinc-400 font-mono text-sm tracking-widest uppercase m-0">{t.calcEstimate}</h4>
              <div className="flex items-center bg-zinc-900/80 p-0.5 rounded-lg border border-zinc-800/50 backdrop-blur-sm">
                <button
                  onClick={() => setCurrency('RUB')}
                  className={`px-2.5 py-1 text-[11px] font-bold tracking-wider rounded-md transition-all duration-300 ${
                    currency === 'RUB' 
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]' 
                      : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
                  }`}
                >
                  RUB
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-2.5 py-1 text-[11px] font-bold tracking-wider rounded-md transition-all duration-300 ${
                    currency === 'USD' 
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]' 
                      : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
                  }`}
                >
                  USD
                </button>
              </div>
            </div>
            
            <div className="space-y-4 mb-8 relative z-10">
              <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-500 mb-1">{t.calcBaseDev}</span>
                  <span className="text-white text-sm font-medium">{currentBase?.title}</span>
                </div>
                <span className="text-white font-mono">
                  {renderPrice(currentBase?.price || {RUB:0, USD:0})}
                </span>
              </div>

              <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-500 mb-1">{t.calcExtraOptions}</span>
                  <span className="text-zinc-300 text-sm">{selectedFeatures.length} {t.calcModulesCount}</span>
                </div>
                <span className="text-purple-400 font-mono">
                  +{currency === 'RUB' ? `${featuresPrice.toLocaleString('ru-RU')} ₽` : `$${featuresPrice.toLocaleString('en-US')}`}
                </span>
              </div>
            </div>

            <div className="mt-4 relative z-10">
              <span className="text-xs text-zinc-500 uppercase tracking-widest">{t.calcTotal}</span>
              <div className="flex items-baseline gap-2 mt-2">
                <AnimatePresence mode="popLayout">
                  <motion.span 
                    key={totalPrice}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    className="text-4xl md:text-5xl font-bold text-white"
                  >
                    {currency === 'RUB' ? totalPrice.toLocaleString('ru-RU') : totalPrice.toLocaleString('en-US')}
                  </motion.span>
                </AnimatePresence>
                <span className="text-xl text-purple-500 font-medium">
                  {currency === 'RUB' ? '₽' : '$'}
                </span>
              </div>
              <p className="text-[10px] text-zinc-600 mt-2 leading-tight">
                {t.calcDisclaimer}
              </p>
            </div>

            <button 
              onClick={() => setActivePage('contacts')}
              className="w-full mt-8 bg-white hover:bg-zinc-200 text-black font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] relative z-10"
            >
              {t.calcDiscuss}
            </button>

          </div>
        </div>

      </div>

      {/* === КНОПКА CREATED BY === */}
      <div className="flex justify-center w-full mt-10 pb-4">
        <a href="/" className="select-none px-5 py-2 border border-[#27272A] rounded-xl bg-[#121214] flex items-center shadow-md hover:border-purple-500/50 hover:bg-[#18181B] hover:-translate-y-1 transition-all duration-[190ms] ease-out group">
          <span className="text-[11px] md:text-xs font-medium tracking-wide text-[#A1A1AA] group-hover:text-[#FAFAFA] transition-colors">
            Created by <span className="text-[#FAFAFA] font-semibold">Whi</span><span className="text-purple-500 font-semibold">Team</span>
          </span>
        </a>
      </div>

    </div>
  );
}