import { translations } from '../translations';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Calculator({ setActivePage, lang }) {
  const t = translations[lang] || translations['RU'];

  // === НОВАЯ БИЗНЕС-ЛОГИКА (3 ШАГА: БАЗА -> ДИЗАЙН -> НАЧИНКА) ===
  const SERVICES = {
    web: {
      title: t.c_web,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
      ),
      bases: [
        { id: 'wb1', title: t.c_wb1_t, desc: t.c_wb1_d, price: { RUB: 20000, USD: 200 } },
        { id: 'wb2', title: t.c_wb2_t, desc: t.c_wb2_d, price: { RUB: 45000, USD: 450 } },
        { id: 'wb3', title: t.c_wb3_t, desc: t.c_wb3_d, price: { RUB: 80000, USD: 800 } },
        { id: 'wb4', title: t.c_wb4_t, desc: t.c_wb4_d, price: { RUB: 120000, USD: 1200 } },
      ],
      design: [
        { id: 'wd1', title: t.c_wd1_t, desc: t.c_wd1_d, price: { RUB: 25000, USD: 250 } },
        { id: 'wd2', title: t.c_wd2_t, desc: t.c_wd2_d, price: { RUB: 20000, USD: 200 } },
        { id: 'wd3', title: t.c_wd3_t, desc: t.c_wd3_d, price: { RUB: 10000, USD: 100 } },
      ],
      tech: [
        { id: 'wt1', title: t.c_wt1_t, desc: t.c_wt1_d, price: { RUB: 25000, USD: 250 } },
        { id: 'wt2', title: t.c_wt2_t, desc: t.c_wt2_d, price: { RUB: 15000, USD: 150 } },
        { id: 'wt3', title: t.c_wt3_t, desc: t.c_wt3_d, price: { RUB: 20000, USD: 200 } },
        { id: 'wt4', title: t.c_wt4_t, desc: t.c_wt4_d, price: { RUB: 10000, USD: 100 } },
      ]
    },
    bot: {
      title: t.c_bot,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.204-.054-.318-.346-.116l-6.405 4.032-2.76-.864c-.602-.188-.616-.602.126-.894l10.793-4.156c.5-.188.948.113.826.852z" /></svg>
      ),
      bases: [
        { id: 'bb1', title: t.c_bb1_t, desc: t.c_bb1_d, price: { RUB: 12000, USD: 120 } },
        { id: 'bb2', title: t.c_bb2_t, desc: t.c_bb2_d, price: { RUB: 35000, USD: 350 } },
        { id: 'bb3', title: t.c_bb3_t, desc: t.c_bb3_d, price: { RUB: 55000, USD: 550 } },
      ],
      design: [
        { id: 'bd1', title: t.c_bd1_t, desc: t.c_bd1_d, price: { RUB: 30000, USD: 300 } },
        { id: 'bd2', title: t.c_bd2_t, desc: t.c_bd2_d, price: { RUB: 10000, USD: 100 } },
      ],
      tech: [
        { id: 'bt1', title: t.c_bt1_t, desc: t.c_bt1_d, price: { RUB: 20000, USD: 200 } },
        { id: 'bt2', title: t.c_bt2_t, desc: t.c_bt2_d, price: { RUB: 15000, USD: 150 } },
        { id: 'bt3', title: t.c_bt3_t, desc: t.c_bt3_d, price: { RUB: 15000, USD: 150 } },
        { id: 'bt4', title: t.c_bt4_t, desc: t.c_bt4_d, price: { RUB: 15000, USD: 150 } },
        { id: 'bt5', title: t.c_bt5_t, desc: t.c_bt5_d, price: { RUB: 10000, USD: 100 } },
      ]
    }
  };

  const [platform, setPlatform] = useState('web');
  const [selectedBase, setSelectedBase] = useState('wb1');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [currency, setCurrency] = useState('RUB');

  const handlePlatformSwitch = (newPlatform) => {
    setPlatform(newPlatform);
    setSelectedBase(SERVICES[newPlatform].bases[0].id);
    setSelectedFeatures([]);
  };

  const toggleFeature = (id) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const renderPrice = (priceObj) => {
    if (currency === 'RUB') {
      return `${priceObj.RUB.toLocaleString('ru-RU')} ₽`;
    } else {
      return `$${priceObj.USD.toLocaleString('en-US')}`;
    }
  };

  const currentBase = SERVICES[platform].bases.find(b => b.id === selectedBase);
  const basePrice = currentBase ? currentBase.price[currency] : 0;
  
  const featuresPrice = selectedFeatures.reduce((acc, featureId) => {
    const feature = [...SERVICES[platform].design, ...SERVICES[platform].tech].find(f => f.id === featureId);
    return acc + (feature ? feature.price[currency] : 0);
  }, 0);

  const totalPrice = basePrice + featuresPrice;

  return (
    <div className="w-full max-w-6xl mx-auto py-4 px-4 md:px-8 pb-16">
      
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
        
        {/* ЛЕВАЯ КОЛОНКА (Конфигуратор) */}
        <div className="w-full xl:w-2/3 flex flex-col gap-10">
          
          {/* Свитчер платформ */}
          <div className="flex bg-[#09090B] border border-zinc-800/80 p-1.5 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            {Object.keys(SERVICES).map((key) => {
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

          {/* ШАГ 1: База */}
          <div>
            <h3 className="text-lg font-bold text-[#FAFAFA] mb-4 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]"></span>
              {t.calcStep1}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SERVICES[platform].bases.map((base) => {
                const isSelected = selectedBase === base.id;
                return (
                  <div 
                    key={base.id}
                    onClick={() => setSelectedBase(base.id)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 flex flex-col gap-1 ${
                      isSelected 
                        ? 'bg-purple-900/10 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                        : 'bg-[#09090B] border-zinc-800/80 hover:border-zinc-700 hover:bg-[#121214]'
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
                      {renderPrice(base.price)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ШАГ 2: Дизайн */}
          <div>
            <h3 className="text-lg font-bold text-[#FAFAFA] mb-4 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.6)]"></span>
              {t.calcStep2}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SERVICES[platform].design.map((feat) => {
                const isChecked = selectedFeatures.includes(feat.id);
                return (
                  <div 
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`cursor-pointer group p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                      isChecked 
                        ? 'bg-fuchsia-900/10 border-fuchsia-500/50 shadow-[0_0_15px_rgba(217,70,239,0.15)]' 
                        : 'bg-[#09090B] border-zinc-800/80 hover:border-zinc-700 hover:bg-[#121214]'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className={`text-sm font-medium transition-colors ${isChecked ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}`}>
                        {feat.title}
                      </span>
                      <span className="text-[11px] text-zinc-600 mt-0.5">{feat.desc}</span>
                    </div>
                    <div className="text-right ml-4 shrink-0">
                      <span className={`text-xs font-mono transition-colors ${isChecked ? 'text-fuchsia-400' : 'text-zinc-500'}`}>
                        +{renderPrice(feat.price)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ШАГ 3: Начинка */}
          <div>
            <h3 className="text-lg font-bold text-[#FAFAFA] mb-4 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.6)]"></span>
              {t.calcStep3}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SERVICES[platform].tech.map((feat) => {
                const isChecked = selectedFeatures.includes(feat.id);
                return (
                  <div 
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`cursor-pointer group p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                      isChecked 
                        ? 'bg-sky-900/10 border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.15)]' 
                        : 'bg-[#09090B] border-zinc-800/80 hover:border-zinc-700 hover:bg-[#121214]'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className={`text-sm font-medium transition-colors ${isChecked ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}`}>
                        {feat.title}
                      </span>
                      <span className="text-[11px] text-zinc-600 mt-0.5">{feat.desc}</span>
                    </div>
                    <div className="text-right ml-4 shrink-0">
                      <span className={`text-xs font-mono transition-colors ${isChecked ? 'text-sky-400' : 'text-zinc-500'}`}>
                        +{renderPrice(feat.price)}
                      </span>
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

            <div className="flex justify-between items-center mb-6 relative z-10">
              <h4 className="text-[#A1A1AA] font-mono text-sm tracking-widest uppercase m-0">{t.calcEstimate}</h4>
              <div className="flex items-center bg-[#121214] p-0.5 rounded-lg border border-zinc-800/50">
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
                  <span className="text-xs text-[#A1A1AA] mb-1">{t.calcBaseDev}</span>
                  <span className="text-[#FAFAFA] text-sm font-medium">{currentBase?.title}</span>
                </div>
                <span className="text-[#FAFAFA] font-mono">
                  {renderPrice(currentBase?.price || {RUB:0, USD:0})}
                </span>
              </div>

              <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
                <div className="flex flex-col">
                  <span className="text-xs text-[#A1A1AA] mb-1">{t.calcExtraOptions}</span>
                  <span className="text-zinc-300 text-sm">{selectedFeatures.length} {t.calcModulesCount}</span>
                </div>
                <span className="text-purple-400 font-mono">
                  +{currency === 'RUB' ? `${featuresPrice.toLocaleString('ru-RU')} ₽` : `$${featuresPrice.toLocaleString('en-US')}`}
                </span>
              </div>
            </div>

            <div className="mt-4 relative z-10">
              <span className="text-xs text-[#A1A1AA] uppercase tracking-widest">{t.calcTotal}</span>
              <div className="flex items-baseline gap-2 mt-2">
                <AnimatePresence mode="popLayout">
                  <motion.span 
                    key={totalPrice}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    className="text-4xl md:text-5xl font-bold text-[#FAFAFA]"
                  >
                    {currency === 'RUB' ? totalPrice.toLocaleString('ru-RU') : totalPrice.toLocaleString('en-US')}
                  </motion.span>
                </AnimatePresence>
                <span className="text-xl text-purple-500 font-medium">
                  {currency === 'RUB' ? '₽' : '$'}
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 mt-3 leading-relaxed">
                {t.calcDisclaimer}
              </p>
            </div>

            <button 
              onClick={() => setActivePage('contacts')}
              className="w-full mt-8 bg-[#FAFAFA] hover:bg-white text-[#09090B] font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 relative z-10"
            >
              {t.calcDiscuss}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}