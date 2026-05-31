import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdaptiveLayout from './AdaptiveLayout';

export default function App() {
  // =========================================================================================
  // 🎛️ ИДЕАЛЬНЫЙ ПУЛЬТ УПРАВЛЕНИЯ ЭКРАНАМИ (СТРОГИЕ ПИКСЕЛИ) 🎛️
  // =========================================================================================
  const CONFIG = {
    
    devCard: {
      mobile:  "w-full max-w-[350px] h-[350px] p-6 mx-auto", 
      tablet:  "md:max-w-[600px] md:h-[550px] md:p-10",      
      laptop:  "lg:max-w-[700px] lg:h-[650px] lg:p-12 lg:mx-auto",      
      desktop: "xl:max-w-[430px] xl:h-[370px] xl:p-12 xl:mx-auto"       
    },

    footer: {
      bottomOffset: { mobile: "pb-2", tablet: "md:pb-4", desktop: "xl:pb-2" },
      gap: { mobile: "mt-1", tablet: "md:mt-5", desktop: "xl:mt-6" }
    },

    homeCard: {
      mobile:  "w-full max-w-[355px] h-[355px] mx-auto",     
      tablet:  "md:max-w-[600px] md:h-[500px] md:mx-auto",
      laptop:  "lg:max-w-[700px] lg:h-[600px] lg:mx-auto",   
      desktop: "xl:max-w-[590px] xl:h-[390px] xl:ml-auto xl:mx-0" 
    },

    // Слегка уменьшен шрифт (text-[11px]) и паддинги, чтобы уместить 4 кнопки в одну линию 590px
    navButtons: {
      base: "select-none flex justify-center items-center px-1 py-2.5 xl:py-2.5 rounded-xl border transition-all duration-[190ms] ease-out shadow-sm transform-gpu tracking-widest uppercase font-semibold text-[10px] xl:text-[11px] w-full shrink-0",
      inactive: "border-[#27272A] bg-[#121214] text-[#FAFAFA] hover:border-purple-500/50 hover:bg-[#18181B] hover:-translate-y-1 hover:shadow-lg",
      active: "border-purple-500/50 bg-[#18181B] text-white -translate-y-1 shadow-[0_10px_20px_-10px_rgba(168,85,247,0.4)]"
    },

    sectionWrapper: {
      mobile:  "w-full max-w-[360px] mx-auto",
      tablet:  "md:max-w-[700px] md:mx-auto",
      laptop:  "lg:max-w-[900px] lg:mx-auto",
      desktop: "xl:max-w-[1050px] xl:mx-auto" 
    }

  };
  // =========================================================================================

  const [activePage, setActivePage] = useState('home');
const [activeReview, setActiveReview] = useState(0);
const [lang, setLang] = useState('RU');
const [isMenuOpen, setIsMenuOpen] = useState(false);

  const translations = {
    RU: {
      portfolio: 'Портфолио', rules: 'Регламент', calculator: 'Калькулятор', contacts: 'Контакты',
      title1: 'Здесь будет', title2: 'твой текст.', title3: 'С идеальным', title4: 'балансом.',
      desc: 'Этот блок нужен, чтобы правая карточка не перевешивала. Типографика адаптируется, но остается массивной.',
      inDevelopment: 'Раздел в разработке', soon: 'Этот раздел скоро будет доступен.',
      contactsTitle: 'Связь с нами',
      contactsDesc: 'Готовы к сотрудничеству. Выберите удобный формат для обсуждения вашего проекта.',
      portfolioTitle: 'Наши работы',
      portfolioDesc: 'Проекты, которыми мы гордимся. Каркасы будущих шедевров.',
    },
    EN: {
      portfolio: 'Portfolio', rules: 'Guidelines', calculator: 'Calculator', contacts: 'Contacts',
      title1: 'Your text', title2: 'goes here.', title3: 'With perfect', title4: 'balance.',
      desc: 'This block is needed to balance the right card layout. The typography adapts while maintaining its massive weight.',
      inDevelopment: 'Section in development', soon: 'This section will be available soon.',
      contactsTitle: 'Get in touch',
      contactsDesc: 'Ready for collaboration. Choose a convenient format to discuss your project.',
      portfolioTitle: 'Our works',
      portfolioDesc: 'Projects we are proud of. Frameworks of future masterpieces.',
    }
  };

  const t = translations[lang];
  const syncDuration = 0.8;
  const syncDelay = 0.1; 
  const targetText = `const [activePage, setActivePage] = useState('${activePage}');`;
  const [displayedText, setDisplayedText] = useState('');

const contactsList = [
    {
      id: 'telegram', title: 'Telegram', value: '@WhiTeam3005', href: 'https://t.me/WhiTeam3005',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6 xl:w-5 xl:h-5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
    },
    // ... дальше идут WhatsApp, Instagram и Почта
    {
      id: 'whatsapp', title: 'WhatsApp', value: '+7 921 784-64-88', href: 'https://wa.me/79217846488',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6 xl:w-5 xl:h-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
    },
    {
      id: 'instagram', title: 'Instagram', value: 'whiteam_off', href: 'https://instagram.com/whiteam_off',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6 xl:w-5 xl:h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    },
    {
      id: 'mail', title: 'Email', value: 'whiteam3005@gmail.com', href: 'mailto:whiteam3005@gmail.com',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6 xl:w-5 xl:h-5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
    }
  ];

  const portfolioItems = [
    { id: 1, category: { RU: 'Веб-дизайн', EN: 'Web Design' }, title: { RU: 'Проект Альфа', EN: 'Project Alpha' } },
    { id: 2, category: { RU: 'Разработка', EN: 'Development' }, title: { RU: 'Проект Бета', EN: 'Project Beta' } },
    { id: 3, category: { RU: 'Брендинг', EN: 'Branding' }, title: { RU: 'Проект Гамма', EN: 'Project Gamma' } },
  ];

  useEffect(() => {
    let timeoutId;
    if (displayedText !== targetText) {
      let commonLen = 0;
      while (commonLen < displayedText.length && commonLen < targetText.length && displayedText[commonLen] === targetText[commonLen]) { commonLen++; }
      if (displayedText.length > commonLen) {
        timeoutId = setTimeout(() => { setDisplayedText(prev => prev.slice(0, -1)); }, 15);
      } else {
        timeoutId = setTimeout(() => { setDisplayedText(targetText.slice(0, displayedText.length + 1)); }, 40);
      }
    }
    return () => clearTimeout(timeoutId);
  }, [displayedText, targetText, activePage]);

  const isTypingComplete = displayedText === targetText;

  const renderCode = (text) => {
    const tokens = [
      { s: "const", c: "text-purple-500" }, { s: " [", c: "text-[#71717A]" }, { s: "activePage", c: "text-[#FAFAFA]" }, { s: ", ", c: "text-[#71717A]" },
      { s: "setActivePage", c: "text-[#FAFAFA]" }, { s: "] = ", c: "text-[#71717A]" }, { s: "useState", c: "text-purple-500" }, { s: "(", c: "text-[#71717A]" }, { s: "'", c: "text-[#A1A1AA]" }
    ];
    let curr = text; let elements = [];
    for (let i = 0; i < tokens.length; i++) {
      if (curr.length === 0) break;
      const tok = tokens[i].s;
      if (curr.startsWith(tok)) { elements.push(<span key={i} className={tokens[i].c}>{tok}</span>); curr = curr.slice(tok.length); } 
      else if (tok.startsWith(curr)) { elements.push(<span key={i} className={tokens[i].c}>{curr}</span>); curr = ""; break; } 
      else { elements.push(<span key={i} className={tokens[i].c}>{curr}</span>); curr = ""; break; }
    }
    if (curr.length > 0) {
      let dynamicEls = [];
      for (let j = 0; j < curr.length; j++) {
          const char = curr[j];
          if (char === ')' || char === ';') { dynamicEls.push(<span key={'dyn'+j} className="text-[#71717A]">{char}</span>); } 
          else { dynamicEls.push(<span key={'dyn'+j} className="text-[#A1A1AA]">{char}</span>); }
      }
      elements.push(<span key="dynamic">{dynamicEls}</span>);
    }
    return elements;
  };

  const handleNavClick = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };

  return (
    <AdaptiveLayout>
      
      {/* === МОБИЛЬНОЕ МЕНЮ === */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2, ease: "easeOut" }} className="fixed inset-0 z-[100] bg-[#09090B]/95 backdrop-blur-xl flex flex-col px-6 pt-8 pb-10">
            <div className="flex justify-between items-center w-full mb-12">
              <div onClick={() => handleNavClick('home')} className="text-3xl font-semibold tracking-tight select-none cursor-pointer">Whi<span className="text-purple-500">Team</span></div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2.5 rounded-xl border border-[#27272A] bg-[#121214] text-[#FAFAFA] hover:border-purple-500/50">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <nav className="flex flex-col gap-4 flex-1 justify-center">
              <button onClick={() => handleNavClick('portfolio')} className={`${CONFIG.navButtons.base} ${activePage === 'portfolio' ? CONFIG.navButtons.active : CONFIG.navButtons.inactive}`}>{t.portfolio}</button>
              {/* ДОБАВЛЕНО: Кнопка "Калькулятор" в мобильном меню */}
              <button onClick={() => handleNavClick('calculator')} className={`${CONFIG.navButtons.base} ${activePage === 'calculator' ? CONFIG.navButtons.active : CONFIG.navButtons.inactive}`}>{t.calculator}</button>
              <button onClick={() => handleNavClick('rules')} className={`${CONFIG.navButtons.base} ${activePage === 'rules' ? CONFIG.navButtons.active : CONFIG.navButtons.inactive}`}>{t.rules}</button>
              <button onClick={() => handleNavClick('contacts')} className={`${CONFIG.navButtons.base} ${activePage === 'contacts' ? CONFIG.navButtons.active : CONFIG.navButtons.inactive}`}>{t.contacts}</button>
            </nav>
            <div className="mt-auto flex justify-center pt-8">
              <div onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')} className="select-none relative flex items-center p-1 rounded-xl border border-[#27272A] bg-[#09090B] cursor-pointer w-[160px] h-12">
                <motion.div layout transition={{ type: "spring", stiffness: 500, damping: 25 }} className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg border border-[#3F3F46] bg-[#18181B] shadow-sm" initial={false} animate={{ left: lang === 'RU' ? '4px' : 'calc(50%)' }} />
                <div className={`relative z-10 flex-1 text-center py-2 text-[15px] tracking-wide transition-colors ${lang === 'RU' ? 'text-purple-500 font-bold' : 'text-[#FAFAFA] font-medium'}`}>RU</div>
                <div className={`relative z-10 flex-1 text-center py-2 text-[15px] tracking-wide transition-colors ${lang === 'EN' ? 'text-purple-500 font-bold' : 'text-[#FAFAFA] font-medium'}`}>EN</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === ШАПКА === */}
      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: syncDuration, delay: syncDelay, ease: "easeOut" }} className="flex-none w-full flex justify-between xl:grid xl:grid-cols-12 xl:gap-[3vw] items-center relative z-50 shrink-0">
        <div className="flex items-center gap-6 xl:col-span-5">
          <div onClick={() => setActivePage('home')} className="text-3xl md:text-[2.5rem] xl:text-3xl font-semibold tracking-tight select-none cursor-pointer hover:-translate-y-1 transition-transform duration-[190ms] transform-gpu">
            Whi<span className="text-purple-500">Team</span>
          </div>
          <div className="relative group hidden xl:block">
            <div className="absolute inset-0 bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-[190ms] rounded-full transform-gpu"></div>
            <button className="relative flex items-center justify-center p-2.5 rounded-xl border border-[#27272A] bg-[#121214] text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-purple-500/50 hover:bg-[#18181B] hover:-translate-y-1 hover:shadow-lg transition-all duration-[190ms] z-10 transform-gpu">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
            </button>
          </div>
        </div>
        
        <button onClick={() => setIsMenuOpen(true)} className="xl:hidden p-2.5 md:p-3 rounded-xl border border-[#27272A] bg-[#121214] text-[#FAFAFA] hover:border-purple-500/50 transition-colors shrink-0">
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>

        {/* Изменен gap-3 на gap-2, чтобы 4 кнопки комфортно поместились */}
        <nav className="hidden xl:flex items-center justify-between gap-2 text-sm font-semibold tracking-[0.1em] uppercase xl:col-start-7 xl:col-span-6 w-full xl:max-w-[590px] xl:ml-auto">
          {/* Уменьшена ширина свитчера до w-[90px] (этого вполне достаточно для RU/EN) */}
          <div onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')} className="select-none relative flex items-center p-1 rounded-xl border border-[#27272A] bg-[#09090B] cursor-pointer hover:border-purple-500/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-[190ms] w-[90px] flex-none transform-gpu">
            <motion.div layout transition={{ type: "spring", stiffness: 500, damping: 25 }} className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg border border-[#3F3F46] bg-[#18181B] shadow-sm transform-gpu" initial={false} animate={{ left: lang === 'RU' ? '4px' : 'calc(50%)' }} />
            <div className={`relative z-10 flex-1 text-center py-1.5 text-xs tracking-wide transition-colors duration-[190ms] shrink-0 ${lang === 'RU' ? 'text-purple-500 font-bold' : 'text-[#FAFAFA] font-medium'}`}>RU</div>
            <div className={`relative z-10 flex-1 text-center py-1.5 text-xs tracking-wide transition-colors duration-[190ms] shrink-0 ${lang === 'EN' ? 'text-purple-500 font-bold' : 'text-[#FAFAFA] font-medium'}`}>EN</div>
          </div>
          <button onClick={() => setActivePage('portfolio')} className={`xl:flex-1 ${CONFIG.navButtons.base} ${activePage === 'portfolio' ? CONFIG.navButtons.active : CONFIG.navButtons.inactive}`}>{t.portfolio}</button>
          {/* ДОБАВЛЕНО: Кнопка "Калькулятор" в десктопном меню */}
          <button onClick={() => setActivePage('calculator')} className={`xl:flex-1 ${CONFIG.navButtons.base} ${activePage === 'calculator' ? CONFIG.navButtons.active : CONFIG.navButtons.inactive}`}>{t.calculator}</button>
          <button onClick={() => setActivePage('rules')} className={`xl:flex-1 ${CONFIG.navButtons.base} ${activePage === 'rules' ? CONFIG.navButtons.active : CONFIG.navButtons.inactive}`}>{t.rules}</button>
          <button onClick={() => setActivePage('contacts')} className={`xl:flex-1 ${CONFIG.navButtons.base} ${activePage === 'contacts' ? CONFIG.navButtons.active : CONFIG.navButtons.inactive}`}>{t.contacts}</button>
        </nav>
      </motion.header>

      {/* === КОНТЕЙНЕР КОНТЕНТА === */}
      <div className="flex-1 w-full flex flex-col justify-center my-8 xl:my-0 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* 1. ГЛАВНАЯ СТРАНИЦА */}
          {activePage === 'home' && (
            <motion.main key="home" initial={{ opacity: 0, y: 20, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -20, filter: "blur(5px)" }} transition={{ duration: 0.4, ease: "easeInOut" }} className="w-full flex flex-col xl:grid xl:grid-cols-12 gap-10 xl:gap-[3vw] xl:h-[55vh] xl:min-h-[400px] xl:items-center">
              <div className="w-full xl:col-span-5 flex flex-col justify-center items-start">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: syncDuration, delay: syncDelay + 0.1, ease: "easeOut" }} className="text-[clamp(2.5rem,8vw,6rem)] xl:text-[clamp(2.5rem,4vw,6rem)] font-medium leading-[1.05] tracking-tight text-[#FAFAFA] transform-gpu">
                  {t.title1} <br /><span className="text-[#A1A1AA]">{t.title2}</span> <br />{t.title3} <br /><span className="text-purple-500 font-light italic tracking-normal">{t.title4}</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: syncDuration, delay: syncDelay + 0.2, ease: "easeOut" }} className="mt-6 text-[clamp(0.9rem,4vw,1.1rem)] xl:text-[clamp(0.8rem,1vw,1.1rem)] text-[#71717A] font-light max-w-md leading-relaxed transform-gpu">
                  {t.desc}
                </motion.p>
              </div>

            {/* Контейнер карточки - делаем строгий КВАДРАТ (aspect-square) */}
                <div className="relative w-full max-w-[360px] xl:max-w-[400px] aspect-square flex items-center justify-center z-10 mt-8 xl:mt-0">
                  
                  {/* Кнопка Влево */}
                  <button 
                    onClick={() => setActiveReview((prev) => (prev - 1 + 3) % 3)} 
                    className="absolute -left-4 sm:-left-12 xl:-left-16 z-50 w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center rounded-full bg-zinc-950/90 border border-zinc-800/80 text-zinc-400 backdrop-blur-md hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 hover:-translate-x-1 transition-all duration-300 shadow-xl"
                  >
                    <svg className="w-5 h-5 xl:w-6 xl:h-6 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path></svg>
                  </button>

              {/* Кнопка Вправо */}
                  <button 
                    onClick={() => setActiveReview((prev) => (prev + 1) % 3)} 
                    className="absolute -right-4 sm:-right-12 xl:-right-16 z-50 w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center rounded-full bg-zinc-950/90 border border-zinc-800/80 text-zinc-400 backdrop-blur-md hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 hover:translate-x-1 transition-all duration-300 shadow-xl"
                  >
                    <svg className="w-5 h-5 xl:w-6 xl:h-6 pl-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>
                  </button>

                  {/* Фоновое свечение за слайдером */}
                  <div className="absolute inset-0 bg-purple-500/15 blur-[70px] xl:blur-[90px] rounded-full pointer-events-none" />

                  {/* Генерируем 3 карточки */}
                  {[0, 1, 2].map((index) => {
                    let position;
                    if (index === activeReview) position = 0;
                    else if (index === (activeReview + 1) % 3) position = 1;
                    else position = -1;

                    const isFront = position === 0;

                    return (
                      <motion.div
                        key={index}
                        initial={false}
                        animate={{
                          x: position === 0 ? '0%' : (position === 1 ? '40%' : '-40%'), // Раздвинули веер шире
                          scale: isFront ? 1 : 0.8,
                          opacity: isFront ? 1 : 0.15, // Задние карточки сделали очень тусклыми
                          zIndex: isFront ? 30 : 20,
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        // ВАЖНО: bg-[#09090B] - это плотный цвет без прозрачности, чтобы задние карты не просвечивались!
                        className={`absolute inset-0 w-full h-full rounded-[2.5rem] border flex flex-col p-8 xl:p-10 shadow-2xl overflow-hidden transition-colors duration-500 ${isFront ? 'bg-[#09090B] border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.2)]' : 'bg-[#09090B] border-zinc-800/50'}`}
                      >
                        <div className="flex flex-col justify-center h-full gap-6 xl:gap-8">
                          
                          {/* Аватар и имя */}
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-full border border-zinc-700 shrink-0 overflow-hidden relative">
                               {/* Сделали градиенты ярче (opacity-80) */}
                               <div className={`absolute inset-0 opacity-80 ${index === 0 ? 'bg-gradient-to-br from-purple-500 to-blue-500' : index === 1 ? 'bg-gradient-to-br from-emerald-500 to-teal-500' : 'bg-gradient-to-br from-orange-500 to-rose-500'}`} />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                              <div className="w-[45%] h-2.5 rounded-full bg-zinc-600"></div>
                              <div className="w-[25%] h-2 rounded-full bg-purple-500/80"></div>
                            </div>
                          </div>

                          {/* Линии текста по центру - сделали светлее */}
                          <div className="flex flex-col gap-4">
                            <div className="w-[95%] h-2.5 rounded-full bg-zinc-800"></div>
                            <div className="w-[85%] h-2.5 rounded-full bg-zinc-800"></div>
                            <div className="w-[90%] h-2.5 rounded-full bg-zinc-800"></div>
                            <div className="w-[70%] h-2.5 rounded-full bg-zinc-800"></div>
                          </div>

                          {/* Звездочки - зажгли ярким фиолетовым */}
                          <div className="flex gap-1.5">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 xl:w-5 xl:h-5 text-purple-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            ))}
                          </div>

                        </div>
                      </motion.div>
                    );
                  })}
                </div>
            </motion.main>
          )}

          {/* 2. РАЗДЕЛ "КОНТАКТЫ" */}
          {activePage === 'contacts' && (
            <motion.main key="contacts" initial={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }} transition={{ duration: 0.4, ease: "easeOut" }} className="w-full flex flex-col items-center justify-center relative z-10">
              <div className="absolute inset-0 bg-purple-500/5 blur-[100px] pointer-events-none rounded-full"></div>

              <div className={`relative z-10 flex flex-col items-center w-full ${CONFIG.sectionWrapper.mobile} ${CONFIG.sectionWrapper.tablet} ${CONFIG.sectionWrapper.laptop} ${CONFIG.sectionWrapper.desktop}`}>
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: syncDelay + 0.1 }} className="text-center mb-8 xl:mb-10">
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#FAFAFA] mb-3">{t.contactsTitle}</h2>
                  <p className="text-[#71717A] text-sm md:text-base max-w-md mx-auto font-light leading-relaxed">{t.contactsDesc}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 xl:gap-5 w-full max-w-[900px] mx-auto">
                  {contactsList.map((contact, i) => (
                    <motion.a key={contact.id} href={contact.href} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: syncDelay + 0.2 + (i * 0.1), ease: "easeOut" }} className="select-none relative group p-5 md:p-8 xl:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-[#27272A] bg-[#0E0E11] hover:bg-[#121214] hover:border-purple-500/40 transition-all duration-[250ms] flex items-center justify-between overflow-hidden shadow-sm hover:shadow-[0_10px_30px_-15px_rgba(168,85,247,0.2)] transform-gpu">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      <div className="flex items-center gap-4 md:gap-6 relative z-10">
                        <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 xl:w-12 xl:h-12 rounded-2xl bg-[#18181B] border border-[#27272A] group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all duration-300 text-[#A1A1AA] group-hover:text-purple-400 group-hover:scale-105 transform-gpu shrink-0">
                          {contact.icon}
                        </div>
                        <div className="flex flex-col gap-1 md:gap-1.5">
                          <span className="text-[10px] md:text-xs font-medium tracking-wider uppercase text-[#71717A] group-hover:text-[#A1A1AA] transition-colors">{contact.title}</span>
                          <span className="text-[15px] md:text-lg font-semibold tracking-wide text-[#FAFAFA] group-hover:text-purple-50 transition-colors">{contact.value}</span>
                        </div>
                      </div>
                      <div className="relative z-10 w-8 h-8 rounded-full border border-[#27272A] flex items-center justify-center bg-[#09090B] group-hover:border-purple-500/40 group-hover:bg-purple-500/10 transition-all duration-300 shrink-0">
                        <svg className="w-4 h-4 text-[#71717A] group-hover:text-purple-400 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.main>
          )}

          {/* 3. РАЗДЕЛ "ПОРТФОЛИО" */}
          {activePage === 'portfolio' && (
            <motion.main key="portfolio" initial={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }} transition={{ duration: 0.4, ease: "easeOut" }} className="w-full flex flex-col items-center justify-center relative z-10">
              <div className="absolute inset-0 bg-purple-500/5 blur-[100px] pointer-events-none rounded-full"></div>

              <div className={`relative z-10 flex flex-col items-center w-full ${CONFIG.sectionWrapper.mobile} ${CONFIG.sectionWrapper.tablet} ${CONFIG.sectionWrapper.laptop} ${CONFIG.sectionWrapper.desktop}`}>
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: syncDelay + 0.1 }} className="text-center mb-8 xl:mb-10">
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#FAFAFA] mb-3">{t.portfolioTitle}</h2>
                  <p className="text-[#71717A] text-sm md:text-base max-w-md mx-auto font-light leading-relaxed">{t.portfolioDesc}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-6 w-full">
                  {portfolioItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: syncDelay + 0.2 + (i * 0.1), ease: "easeOut" }}
                      className="select-none relative group p-4 md:p-5 xl:p-4 rounded-[2rem] border border-[#27272A] bg-[#0E0E11] hover:bg-[#121214] hover:border-purple-500/40 transition-all duration-[250ms] flex flex-col overflow-hidden shadow-sm hover:shadow-[0_10px_30px_-15px_rgba(168,85,247,0.2)] transform-gpu cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                      <div className="w-full aspect-video rounded-2xl bg-[#18181B] border border-[#27272A] mb-4 overflow-hidden relative group-hover:border-purple-500/30 transition-colors duration-300">
                         <div className="absolute inset-0 flex items-center justify-center">
                             <svg className="w-8 h-8 text-[#27272A] group-hover:text-purple-500/30 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                             </svg>
                         </div>
                      </div>

                      <div className="flex flex-col gap-2 relative z-10 px-2">
                        <span className="text-[10px] font-medium tracking-wider uppercase text-purple-500/80">
                          {item.category[lang]}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-base md:text-lg font-semibold tracking-wide text-[#FAFAFA] group-hover:text-purple-50 transition-colors">
                            {item.title[lang]}
                          </span>
                          
                          <div className="w-8 h-8 rounded-full border border-[#27272A] flex items-center justify-center bg-[#09090B] group-hover:border-purple-500/40 group-hover:bg-purple-500/10 transition-all duration-300 shrink-0">
                            <svg className="w-3.5 h-3.5 text-[#71717A] group-hover:text-purple-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19L19 5M19 5v10M19 5H9" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.main>
          )}

          {/* 4. РАЗДЕЛ "РЕГЛАМЕНТ" И "КАЛЬКУЛЯТОР" */}
          {/* ИСПРАВЛЕНО: Теперь обе страницы показывают макет "В разработке" */}
          {(activePage === 'rules' || activePage === 'calculator') && (
            <motion.main key={activePage} initial={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }} transition={{ duration: 0.4, ease: "easeOut" }} className="w-full flex items-center justify-center relative z-10">
              <div className="relative flex justify-center w-full px-6">
                <div className="absolute inset-0 bg-purple-500/5 blur-[80px] rounded-[3rem] pointer-events-none"></div>
                <div className={`rounded-[2.5rem] border border-[#27272A] bg-[#0E0E11] flex flex-col items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden transform-gpu w-full ${CONFIG.devCard.mobile} ${CONFIG.devCard.tablet} ${CONFIG.devCard.laptop} ${CONFIG.devCard.desktop}`}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                  <div className="relative flex items-center justify-center mb-6 md:mb-10 w-12 h-12 md:w-16 md:h-16 xl:w-14 xl:h-14 shrink-0">
                    <div className="absolute w-full h-full border-[1.5px] border-[#3F3F46] rounded-md animate-[spin_6s_linear_infinite]"></div>
                    <div className="absolute w-full h-full border-[1.5px] border-[#3F3F46] rounded-md rotate-45 animate-[spin_6s_linear_infinite_reverse]"></div>
                    <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 xl:w-3 xl:h-3 bg-purple-500 rounded-sm shadow-[0_0_15px_rgba(168,85,247,0.8)] animate-pulse relative z-10"></div>
                  </div>
                  <h2 className="select-none text-xl md:text-2xl xl:text-xl font-medium text-[#FAFAFA] tracking-[0.15em] uppercase text-center mb-2 md:mb-4 xl:mb-3">{t.inDevelopment}</h2>
                  <p className="select-none text-sm md:text-base xl:text-sm text-[#71717A] text-center font-light">{t.soon}</p>
                </div>
              </div>
            </motion.main>
          )}

        </AnimatePresence>
      </div>

      {/* === ФУТЕР === */}
      <motion.footer 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: syncDuration, delay: syncDelay + 0.4, ease: "easeOut" }}
        className={`w-full flex flex-col relative z-40 transform-gpu shrink-0 mt-auto pt-4 ${CONFIG.footer.bottomOffset.mobile} ${CONFIG.footer.bottomOffset.tablet} ${CONFIG.footer.bottomOffset.desktop}`}
      >
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-end w-full gap-2 md:gap-0">
          <div className="font-mono text-[10px] md:text-xs xl:text-sm hidden md:flex justify-start items-center select-none pointer-events-auto">
            <div className="whitespace-nowrap flex items-center">
              {renderCode(displayedText)}
              <span className="animate-pulse w-[6px] xl:w-[8px] h-[12px] xl:h-[16px] bg-purple-500 ml-[2px] rounded-sm flex-none"></span>
            </div>
          </div>
          <div className="flex justify-center md:justify-end w-full md:w-auto">
            <motion.div initial={{ opacity: 0.3 }} animate={{ opacity: isTypingComplete ? 1 : 0.3 }} transition={{ duration: 0.25, ease: "linear" }} className="text-xs md:text-sm font-mono tracking-wide text-[#71717A] flex items-center pointer-events-auto transform-gpu select-none">
              Status: <span className={`ml-1.5 font-medium transition-colors duration-300 ${activePage === 'home' && isTypingComplete ? 'text-purple-500 animate-pulse' : 'text-[#52525B]'}`}>{activePage === 'home' ? 'online' : 'offline'}</span>
            </motion.div>
          </div>
        </div>

        <div className={`flex justify-center w-full ${CONFIG.footer.gap.mobile} ${CONFIG.footer.gap.tablet} ${CONFIG.footer.gap.desktop}`}>
          <a href="/" className="select-none px-5 py-2 border border-[#27272A] rounded-xl bg-[#121214] flex items-center shadow-md hover:border-purple-500/50 hover:bg-[#18181B] hover:-translate-y-1 transition-all duration-[190ms] ease-out group">
            <span className="text-[11px] md:text-xs font-medium tracking-wide text-[#A1A1AA] group-hover:text-[#FAFAFA] transition-colors">
              Created by <span className="text-[#FAFAFA] font-semibold">Whi</span><span className="text-purple-500 font-semibold">Team</span>
            </span>
          </a>
        </div>
      </motion.footer>

    </AdaptiveLayout>
  );
}