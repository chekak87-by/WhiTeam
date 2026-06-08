import { translations } from '../translations';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

export default function Calculator({ setActivePage, lang }) {
  const t = translations[lang] || translations['RU'];

  // === СЕТКА УСЛУГ ===
  const SERVICES = {
    web: {
      title: t.c_web,
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>,
      bases: [
        { id: 'wb1', title: t.c_wb1_t, desc: t.c_wb1_d, info: t.c_wb1_i, price: { RUB: 20000, USD: 200 } },
        { id: 'wb2', title: t.c_wb2_t, desc: t.c_wb2_d, info: t.c_wb2_i, price: { RUB: 45000, USD: 450 } },
        { id: 'wb3', title: t.c_wb3_t, desc: t.c_wb3_d, info: t.c_wb3_i, price: { RUB: 80000, USD: 800 } },
        { id: 'wb4', title: t.c_wb4_t, desc: t.c_wb4_d, info: t.c_wb4_i, price: { RUB: 120000, USD: 1200 } },
      ],
      design: [
        { id: 'wd1', title: t.c_wd1_t, desc: t.c_wd1_d, info: t.c_wd1_i, price: { RUB: 25000, USD: 250 } },
        { id: 'wd2', title: t.c_wd2_t, desc: t.c_wd2_d, info: t.c_wd2_i, price: { RUB: 20000, USD: 200 } },
        { id: 'wd3', title: t.c_wd3_t, desc: t.c_wd3_d, info: t.c_wd3_i, price: { RUB: 10000, USD: 100 } },
        { id: 'wd4', title: t.c_wd4_t, desc: t.c_wd4_d, info: t.c_wd4_i, price: { RUB: 30000, USD: 300 } },
      ],
      tech: [
        { id: 'wt1', title: t.c_wt1_t, desc: t.c_wt1_d, info: t.c_wt1_i, price: { RUB: 25000, USD: 250 } },
        { id: 'wt2', title: t.c_wt2_t, desc: t.c_wt2_d, info: t.c_wt2_i, price: { RUB: 15000, USD: 150 } },
        { id: 'wt3', title: t.c_wt3_t, desc: t.c_wt3_d, info: t.c_wt3_i, price: { RUB: 20000, USD: 200 } },
        { id: 'wt4', title: t.c_wt4_t, desc: t.c_wt4_d, info: t.c_wt4_i, price: { RUB: 10000, USD: 100 } },
        { id: 'wt5', title: t.c_wt5_t, desc: t.c_wt5_d, info: t.c_wt5_i, price: { RUB: 15000, USD: 150 } },
        { id: 'wt6', title: t.c_wt6_t, desc: t.c_wt6_d, info: t.c_wt6_i, price: { RUB: 30000, USD: 300 } },
        { id: 'wt7', title: t.c_wt7_t, desc: t.c_wt7_d, info: t.c_wt7_i, price: { RUB: 15000, USD: 150 } },
        { id: 'wt8', title: t.c_wt8_t, desc: t.c_wt8_d, info: t.c_wt8_i, price: { RUB: 0, USD: 0 }, isCustom: true },
      ]
    },
    bot: {
      title: t.c_bot,
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.204-.054-.318-.346-.116l-6.405 4.032-2.76-.864c-.602-.188-.616-.602.126-.894l10.793-4.156c.5-.188.948.113.826.852z" /></svg>,
      bases: [
        { id: 'bb1', title: t.c_bb1_t, desc: t.c_bb1_d, info: t.c_bb1_i, price: { RUB: 12000, USD: 120 } },
        { id: 'bb2', title: t.c_bb2_t, desc: t.c_bb2_d, info: t.c_bb2_i, price: { RUB: 35000, USD: 350 } },
        { id: 'bb3', title: t.c_bb3_t, desc: t.c_bb3_d, info: t.c_bb3_i, price: { RUB: 55000, USD: 550 } },
      ],
      design: [
        { id: 'bd1', title: t.c_bd1_t, desc: t.c_bd1_d, info: t.c_bd1_i, price: { RUB: 30000, USD: 300 } },
        { id: 'bd2', title: t.c_bd2_t, desc: t.c_bd2_d, info: t.c_bd2_i, price: { RUB: 10000, USD: 100 } },
        { id: 'bd3', title: t.c_bd3_t, desc: t.c_bd3_d, info: t.c_bd3_i, price: { RUB: 20000, USD: 200 } },
      ],
      tech: [
        { id: 'bt1', title: t.c_bt1_t, desc: t.c_bt1_d, info: t.c_bt1_i, price: { RUB: 20000, USD: 200 } },
        { id: 'bt2', title: t.c_bt2_t, desc: t.c_bt2_d, info: t.c_bt2_i, price: { RUB: 15000, USD: 150 } },
        { id: 'bt3', title: t.c_bt3_t, desc: t.c_bt3_d, info: t.c_bt3_i, price: { RUB: 15000, USD: 150 } },
        { id: 'bt4', title: t.c_bt4_t, desc: t.c_bt4_d, info: t.c_bt4_i, price: { RUB: 10000, USD: 100 } },
        { id: 'bt5', title: t.c_bt5_t, desc: t.c_bt5_d, info: t.c_bt5_i, price: { RUB: 15000, USD: 150 } },
        { id: 'bt6', title: t.c_bt6_t, desc: t.c_bt6_d, info: t.c_bt6_i, price: { RUB: 12000, USD: 120 } },
        { id: 'bt7', title: t.c_bt7_t, desc: t.c_bt7_d, info: t.c_bt7_i, price: { RUB: 25000, USD: 250 } },
        { id: 'bt8', title: t.c_bt8_t, desc: t.c_bt8_d, info: t.c_bt8_i, price: { RUB: 0, USD: 0 }, isCustom: true },
      ]
    }
  };

  const [platform, setPlatform] = useState('web');
  const [selectedBase, setSelectedBase] = useState('wb1');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [currency, setCurrency] = useState('RUB');
  const [infoModal, setInfoModal] = useState(null);

  // === ПРАВИЛЬНАЯ ФИКСАЦИЯ СКРОЛЛА (без 'unset') ===
  useEffect(() => {
    if (infoModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = ''; 
    }
    return () => { document.body.style.overflow = ''; };
  }, [infoModal]);

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

  const renderPrice = (feat) => {
    if (feat.isCustom) return t.c_custom_price;
    if (currency === 'RUB') return `${feat.price.RUB.toLocaleString('ru-RU')} ₽`;
    return `$${feat.price.USD.toLocaleString('en-US')}`;
  };

  const currentBase = SERVICES[platform].bases.find(b => b.id === selectedBase);
  const basePrice = currentBase ? currentBase.price[currency] : 0;
  
  const featuresPrice = selectedFeatures.reduce((acc, featureId) => {
    const feature = [...SERVICES[platform].design, ...SERVICES[platform].tech].find(f => f.id === featureId);
    return acc + (feature && !feature.isCustom ? feature.price[currency] : 0);
  }, 0);

  const totalPrice = basePrice + featuresPrice;

  const renderCard = (feat, isRadio = false, activeColor = 'purple') => {
    const isSelected = isRadio ? selectedBase === feat.id : selectedFeatures.includes(feat.id);
    const onClick = isRadio ? () => setSelectedBase(feat.id) : () => toggleFeature(feat.id);
    
    const colorClasses = {
      purple: { border: 'border-purple-500', bg: 'bg-purple-900/10', shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.15)]', text: 'text-purple-400', ring: 'border-purple-500/50' },
      fuchsia: { border: 'border-fuchsia-500', bg: 'bg-fuchsia-900/10', shadow: 'shadow-[0_0_15px_rgba(217,70,239,0.15)]', text: 'text-fuchsia-400', ring: 'border-fuchsia-500/50' },
      sky: { border: 'border-sky-400', bg: 'bg-sky-900/10', shadow: 'shadow-[0_0_15px_rgba(56,189,248,0.15)]', text: 'text-sky-400', ring: 'border-sky-400/50' }
    }[activeColor];

    return (
      <div 
        key={feat.id}
        onClick={onClick}
        className={`cursor-pointer group p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between min-h-[100px] relative overflow-hidden ${
          isSelected 
            ? `${colorClasses.bg} ${colorClasses.ring} ${colorClasses.shadow}` 
            : 'bg-[#09090B] border-zinc-800/80 hover:border-zinc-700 hover:bg-[#121214]'
        }`}
      >
        <div className="flex justify-between items-start gap-2 relative z-10">
          <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
            {feat.title}
          </span>
          <button 
            onClick={(e) => { e.stopPropagation(); setInfoModal(feat); }}
            className="w-6 h-6 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-500 hover:border-purple-500 hover:text-purple-400 hover:bg-purple-500/10 transition-all shrink-0"
            title="Подробнее"
          >
            <span className="text-[10px] font-bold font-mono uppercase">i</span>
          </button>
        </div>
        <div className="text-[11px] text-zinc-500 mt-1 mb-3 leading-tight relative z-10 pr-4">{feat.desc}</div>
        <div className={`text-xs font-mono font-medium relative z-10 ${isSelected ? colorClasses.text : 'text-zinc-500'}`}>
           {isRadio ? '' : '+'} {renderPrice(feat)}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-4 px-4 md:px-8 pb-10 relative">
      
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          {t.calcTitle1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">{t.calcTitle2}</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed">
          {t.calcSubtitle}
        </p>
      </div>

      {/* === КОНТЕЙНЕР КОЛОНОК === */}
      <div className="flex flex-col xl:flex-row gap-8 items-start relative">
        
        {/* ЛЕВАЯ КОЛОНКА (Конфигуратор) */}
        <div className="w-full xl:w-2/3 flex flex-col gap-10">
          
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

          <div>
            <h3 className="text-lg font-bold text-[#FAFAFA] mb-4 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)] animate-pulse"></span>
              {t.calcStep1}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
              {SERVICES[platform].bases.map((base) => renderCard(base, true, 'purple'))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#FAFAFA] mb-4 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.6)]"></span>
              {t.calcStep2}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {SERVICES[platform].design.map((feat) => renderCard(feat, false, 'fuchsia'))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#FAFAFA] mb-4 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.6)]"></span>
              {t.calcStep3}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SERVICES[platform].tech.map((feat) => renderCard(feat, false, 'sky'))}
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
                  {renderPrice(currentBase || {price: {RUB:0, USD:0}})}
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
      {/* <--- ЗАКРЫВАЮЩИЙ ТЕГ КОНТЕЙНЕРА КОЛОНОК ---> */}


      {/* === КНОПКА CREATED BY (СНАРУЖИ КОЛОНОК, СТРОГО ПО ЦЕНТРУ СНИЗУ) === */}
      <div className="w-full flex justify-center mt-16 relative z-10">
        <a href="/" className="select-none px-5 py-2 border border-[#27272A] rounded-xl bg-[#121214] flex items-center shadow-md hover:border-purple-500/50 hover:bg-[#18181B] hover:-translate-y-1 transition-all duration-[190ms] ease-out group">
          <span className="text-[11px] md:text-xs font-medium tracking-wide text-[#A1A1AA] group-hover:text-[#FAFAFA] transition-colors">
            Created by <span className="text-[#FAFAFA] font-semibold">Whi</span><span className="text-purple-500 font-semibold">Team</span>
          </span>
        </a>
      </div>

      {/* === ВСПЛЫВАЮЩЕЕ ОКНО (INFO MODAL) ЧЕРЕЗ ПОРТАЛ === */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {infoModal && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#09090B]/80 backdrop-blur-md"
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
              onClick={() => setInfoModal(null)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-md bg-[#0E0E11] border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-[0_20px_60px_rgba(168,85,247,0.15)] overflow-hidden"
                onClick={(e) => e.stopPropagation()} 
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 blur-[60px] rounded-full pointer-events-none"></div>
                
                <button 
                  onClick={() => setInfoModal(null)} 
                  className="absolute top-5 right-5 text-zinc-500 hover:text-white transition-colors bg-[#121214] p-1.5 rounded-lg border border-zinc-800"
                >
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="w-10 h-10 mb-4 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <span className="font-mono font-bold text-lg">i</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                  {infoModal.title}
                </h3>
                <p className="text-sm text-purple-400 font-mono mb-4 border-b border-zinc-800/50 pb-4 inline-block">
                  {renderPrice(infoModal)}
                </p>
                
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed relative z-10">
                  {infoModal.info}
                </p>

                <button 
                  onClick={() => setInfoModal(null)}
                  className="w-full mt-8 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 rounded-xl transition-colors relative z-10"
                >
                  Понятно
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </div>
  );
}