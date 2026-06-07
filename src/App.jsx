import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';
import AdaptiveLayout from './AdaptiveLayout';
import Calculator from './components/Calculator';
import Rules from './components/Rules';
import Portfolio from './components/Portfolio';

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

   navButtons: {
      base: "select-none flex justify-center items-center px-4 py-2.5 xl:px-4 xl:py-2 rounded-xl border transition-all duration-[190ms] ease-out shadow-sm transform-gpu tracking-widest uppercase font-semibold text-[10px] xl:text-[11px] w-full xl:w-auto shrink-0",
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

  // === ЛОГИКА ДЛЯ КНОПКИ ПОДЕЛИТЬСЯ ===
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const siteUrl = "https://whiteam.online";

  const handleCopy = () => {
    navigator.clipboard.writeText(siteUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadQR = () => {
    const originalCanvas = document.getElementById("qr-gen");
    if (!originalCanvas) return;

    // 1. Создаем виртуальный холст для идеального экспорта
    const exportCanvas = document.createElement("canvas");
    const ctx = exportCanvas.getContext("2d");
    
    // Делаем картинку в высоком разрешении (1080x1080) для премиального качества
    const size = 1080;
    exportCanvas.width = size;
    exportCanvas.height = size;

    // 2. Рисуем премиальный темный фон
    ctx.fillStyle = "#0E0E11";
    ctx.fillRect(0, 0, size, size);

    // Координаты и размеры центральной карточки (идеально по центру)
    const boxSize = 600;
    const boxX = (size - boxSize) / 2;
    const boxY = (size - boxSize) / 2;

    // Надежная функция для рисования скругленных квадратов (работает в любом браузере)
    const drawRoundRect = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
    };

    // 3. Рисуем фиолетово-серую градиентную рамку
    const gradient = ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxSize);
    gradient.addColorStop(0, "rgba(168, 85, 247, 0.5)"); // Точно как from-purple-500/50
    gradient.addColorStop(1, "#27272A"); // Точно как to-[#27272A]
    ctx.fillStyle = gradient;
    drawRoundRect(boxX - 16, boxY - 16, boxSize + 32, boxSize + 32, 60); 

    // 4. Рисуем чисто белый фон для QR
    ctx.fillStyle = "#FAFAFA";
    drawRoundRect(boxX, boxY, boxSize, boxSize, 50);

    // 5. Переносим QR-код
    // Отключаем сглаживание, чтобы пиксели QR-кода при увеличении оставались бритвенно-четкими
    ctx.imageSmoothingEnabled = false;
    const qrPadding = 50; 
    const qrSize = boxSize - (qrPadding * 2);
    ctx.drawImage(originalCanvas, boxX + qrPadding, boxY + qrPadding, qrSize, qrSize);

    // 6. Рисуем футуристичные неоновые уголки-прицелы
    ctx.strokeStyle = "#C084FC"; // purple-400
    ctx.lineWidth = 14;
    const cornerLen = 80; 
    const cornerOffset = 45; 
    const cornerRadius = 35; 
    
    const drawCorner = (x, y, dirX, dirY) => {
      ctx.beginPath();
      ctx.moveTo(x + dirX * cornerLen, y);
      ctx.arcTo(x, y, x, y + dirY * cornerLen, cornerRadius);
      ctx.lineTo(x, y + dirY * cornerLen);
      ctx.stroke();
    };

    drawCorner(boxX - cornerOffset, boxY - cornerOffset, 1, 1); // Левый верхний
    drawCorner(boxX + boxSize + cornerOffset, boxY - cornerOffset, -1, 1); // Правый верхний
    drawCorner(boxX - cornerOffset, boxY + boxSize + cornerOffset, 1, -1); // Левый нижний
    drawCorner(boxX + boxSize + cornerOffset, boxY + boxSize + cornerOffset, -1, -1); // Правый нижний

    // 7. Скачиваем готовую красоту
    const pngUrl = exportCanvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "WhiTeam_QR.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const translations = {
    RU: {
      portfolio: 'Портфолио', rules: 'Регламент', calculator: 'Калькулятор', contacts: 'Контакты', about: 'Про нас',
      title1: 'Ваша идея.', title2: 'Наша реализация.', title3: 'Общий', title4: 'путь.',
      desc: 'Создаем премиальные цифровые решения под ваши задачи. Разрабатываем сайты и Telegram-боты без ограничений для вашей фантазии и бизнеса.',
      inDevelopment: 'Раздел в разработке', soon: 'Этот раздел скоро будет доступен.',
      contactsTitle: 'Связь с нами',
      contactsDesc: 'Готовы к сотрудничеству. Выберите удобный формат для обсуждения вашего проекта.',
      portfolioTitle: 'Наши работы',
      portfolioDesc: 'Проекты, которыми мы гордимся. Каркасы будущих шедевров.',
    },
    EN: {
      portfolio: 'Portfolio', rules: 'Guidelines', calculator: 'Calculator', contacts: 'Contacts', about: 'About Us',
      title1: 'Your idea.', title2: 'Our execution.', title3: 'Shared', title4: 'path.',
      desc: 'We build premium digital solutions tailored to your needs. Developing websites and Telegram bots with no limits to your imagination and business.',
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
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="fixed inset-0 z-[100] bg-[#09090B]/95 backdrop-blur-xl flex flex-col px-6 pt-8 pb-10">
            <div className="flex justify-between items-center w-full mb-12">
              <div onClick={() => handleNavClick('home')} className="text-3xl font-semibold tracking-tight select-none cursor-pointer">Whi<span className="text-purple-500">Team</span></div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2.5 rounded-xl border border-[#27272A] bg-[#121214] text-[#FAFAFA] hover:border-purple-500/50">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <nav className="flex flex-col gap-4 flex-1 justify-center">
              <button onClick={() => handleNavClick('about')} className={`${CONFIG.navButtons.base} ${activePage === 'about' ? CONFIG.navButtons.active : CONFIG.navButtons.inactive}`}>{t.about}</button>
              <button onClick={() => handleNavClick('portfolio')} className={`${CONFIG.navButtons.base} ${activePage === 'portfolio' ? CONFIG.navButtons.active : CONFIG.navButtons.inactive}`}>{t.portfolio}</button>
              <button onClick={() => handleNavClick('calculator')} className={`${CONFIG.navButtons.base} ${activePage === 'calculator' ? CONFIG.navButtons.active : CONFIG.navButtons.inactive}`}>{t.calculator}</button>
              <button onClick={() => handleNavClick('rules')} className={`${CONFIG.navButtons.base} ${activePage === 'rules' ? CONFIG.navButtons.active : CONFIG.navButtons.inactive}`}>{t.rules}</button>
              <button onClick={() => handleNavClick('contacts')} className={`${CONFIG.navButtons.base} ${activePage === 'contacts' ? CONFIG.navButtons.active : CONFIG.navButtons.inactive}`}>{t.contacts}</button>
            </nav>
            <div className="mt-auto flex justify-center pt-8">
              <div onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')} className="select-none relative flex items-center p-1 rounded-xl border border-[#27272A] bg-[#09090B] cursor-pointer w-[160px] h-12">
                <motion.div transition={{ type: "spring", stiffness: 500, damping: 25 }} className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg border border-[#3F3F46] bg-[#18181B] shadow-sm" initial={false} animate={{ left: lang === 'RU' ? '4px' : 'calc(50%)' }} />
                <div className={`relative z-10 flex-1 text-center py-2 text-[15px] tracking-wide transition-colors ${lang === 'RU' ? 'text-purple-500 font-bold' : 'text-[#FAFAFA] font-medium'}`}>RU</div>
                <div className={`relative z-10 flex-1 text-center py-2 text-[15px] tracking-wide transition-colors ${lang === 'EN' ? 'text-purple-500 font-bold' : 'text-[#FAFAFA] font-medium'}`}>EN</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

     {/* === ШАПКА === */}
      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: syncDuration, delay: syncDelay, ease: "easeOut" }} className="flex-none w-full flex justify-between xl:grid xl:grid-cols-12 xl:gap-[3vw] items-center relative z-50 shrink-0">
        
        {/* === ЛОГОТИП И КНОПКА SHARE === */}
        <div className="flex items-center gap-4 xl:col-span-5 relative z-50">
          
          {/* Логотип */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="text-3xl md:text-[2.5rem] xl:text-3xl font-semibold cursor-pointer leading-none relative z-20 transition-transform duration-[190ms] hover:-translate-y-1"
          >
            Whi<span className="text-purple-500">Team</span>
          </div>

          {/* Кнопка Share */}
          <div className="relative group block transition-transform duration-[190ms] hover:-translate-y-1 cursor-pointer">
            <div className="absolute inset-0 bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <button onClick={() => setIsShareOpen(true)} className="relative flex items-center justify-center p-2 md:p-2.5 rounded-xl border border-[#27272A] bg-[#09090B] group-hover:border-purple-500/50 hover:bg-[#121214] transition-all duration-300">
              <svg className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] text-[#A1A1AA] group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
            </button>
          </div>
        </div>
        
        {/* Гамбургер (мобильное меню) */}
        <button onClick={() => setIsMenuOpen(true)} className="xl:hidden p-2.5 md:p-3 rounded-xl border border-[#27272A] bg-[#121214] text-[#FAFAFA] hover:border-purple-500/50 transition-colors shrink-0">
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>

   {/* === МЕНЮ ДЛЯ ПК (Идеальная сетка, прижато вправо) === */}
        <nav className="hidden xl:flex items-center justify-end gap-2 text-sm font-semibold tracking-[0.1em] uppercase xl:col-start-6 xl:col-span-7 w-full">
          
          <div onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')} className="select-none relative flex items-center p-1 rounded-xl border border-[#27272A] bg-[#09090B] cursor-pointer hover:border-purple-500/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-[190ms] w-[80px] flex-none transform-gpu mr-2">
            <motion.div transition={{ type: "spring", stiffness: 500, damping: 25 }} className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg border border-[#3F3F46] bg-[#18181B] shadow-sm transform-gpu" initial={false} animate={{ left: lang === 'RU' ? '4px' : 'calc(50%)' }} />
            <div className={`relative z-10 flex-1 text-center py-1 text-[11px] tracking-wide transition-colors duration-[190ms] shrink-0 ${lang === 'RU' ? 'text-purple-500 font-bold' : 'text-[#FAFAFA] font-medium'}`}>RU</div>
            <div className={`relative z-10 flex-1 text-center py-1 text-[11px] tracking-wide transition-colors duration-[190ms] shrink-0 ${lang === 'EN' ? 'text-purple-500 font-bold' : 'text-[#FAFAFA] font-medium'}`}>EN</div>
          </div>
          
          <button onClick={() => handleNavClick('portfolio')} className={`${CONFIG.navButtons.base} ${activePage === 'portfolio' ? CONFIG.navButtons.active : CONFIG.navButtons.inactive}`}>{t.portfolio}</button>
          <button onClick={() => handleNavClick('calculator')} className={`${CONFIG.navButtons.base} ${activePage === 'calculator' ? CONFIG.navButtons.active : CONFIG.navButtons.inactive}`}>{t.calculator}</button>
          <button onClick={() => handleNavClick('rules')} className={`${CONFIG.navButtons.base} ${activePage === 'rules' ? CONFIG.navButtons.active : CONFIG.navButtons.inactive}`}>{t.rules}</button>
          <button onClick={() => handleNavClick('about')} className={`${CONFIG.navButtons.base} ${activePage === 'about' ? CONFIG.navButtons.active : CONFIG.navButtons.inactive}`}>{t.about}</button>
          <button onClick={() => handleNavClick('contacts')} className={`${CONFIG.navButtons.base} ${activePage === 'contacts' ? CONFIG.navButtons.active : CONFIG.navButtons.inactive}`}>{t.contacts}</button>
        </nav>

      </motion.header>

      {/* Невидимая распорка только для телефонов */}
      <div className="h-12 xl:hidden"></div>

     {/* === КОНТЕЙНЕР КОНТЕНТА === */}
      <div className={`flex-1 w-full flex flex-col relative z-10 max-w-7xl mx-auto ${
        activePage === 'home' 
          ? 'justify-center' 
          : 'justify-start pt-8 md:pt-12'
      }`}>

<AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>         
          
          {/* 1. ГЛАВНАЯ СТРАНИЦА */}
          {activePage === 'home' && (
            <motion.main key="home" initial={{ opacity: 0, y: 20, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -20, filter: "blur(5px)" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="w-full flex flex-col xl:grid xl:grid-cols-12 gap-10 xl:gap-[3vw] xl:h-[55vh] xl:min-h-[400px] xl:items-center">
      {/* ЛЕВАЯ КОЛОНКА (Заголовок и текст) */}
              <div className="w-full xl:col-span-5 flex flex-col justify-center items-start z-20 relative">
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: syncDuration, delay: syncDelay + 0.1, ease: "easeOut" }} 
                  className="text-[clamp(2.5rem,7vw,5rem)] xl:text-[clamp(3.2rem,4vw,5.5rem)] leading-[1.05] transform-gpu flex flex-col"
                >
                  {/* Строка 1 */}
                  <span className="text-[#E9D5FF] font-light tracking-wide mb-1 md:mb-2">
                    {t.title1}
                  </span>
                  
                  {/* Строка 2: Убрано свечение, цвет смягчен до 85% прозрачности, чтобы не слепить */}
                  <span className="text-white/85 font-semibold tracking-tight mb-1 md:mb-2">
                    {t.title2}
                  </span>
                  
                  {/* Строка 3 */}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 font-bold pb-2 w-fit">
                    {t.title3} {t.title4}
                  </span>
                </motion.h1>

                {/* Нижний текст с неоновой линией */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: syncDuration, delay: syncDelay + 0.2, ease: "easeOut" }} 
                  className="mt-6 md:mt-8 relative"
                >
                  <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-gradient-to-b from-purple-500 to-transparent rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                  
                  <p className="pl-5 md:pl-6 text-[clamp(0.95rem,4vw,1.1rem)] xl:text-[clamp(0.9rem,1.1vw,1.1rem)] text-[#E9D5FF]/80 font-light max-w-[420px] leading-relaxed transform-gpu">
                    {t.desc}
                  </p>
                </motion.div>

              </div>

           {/* ПРАВАЯ КОЛОНКА (3D-Слайдер Отзывов) */}
              <div className="w-full xl:col-start-7 xl:col-span-6 flex items-center justify-center relative min-h-[400px] xl:min-h-full mt-10 xl:mt-0">
                
                <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] xl:w-[420px] xl:h-[420px] shrink-0 flex items-center justify-center z-10 mx-auto">
                  
                  {/* Кнопка Влево */}
                  <button 
                    onClick={() => setActiveReview((prev) => (prev - 1 + 3) % 3)} 
                    className="absolute -left-4 sm:-left-12 xl:-left-16 z-50 w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:border-purple-500 hover:bg-purple-500/20 hover:-translate-x-1 transition-all duration-300 shadow-xl"
                  >
                    <svg className="w-5 h-5 xl:w-6 xl:h-6 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path></svg>
                  </button>

                  {/* Кнопка Вправо */}
                  <button 
                    onClick={() => setActiveReview((prev) => (prev + 1) % 3)} 
                    className="absolute -right-4 sm:-right-12 xl:-right-16 z-50 w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:border-purple-500 hover:bg-purple-500/20 hover:translate-x-1 transition-all duration-300 shadow-xl"
                  >
                    <svg className="w-5 h-5 xl:w-6 xl:h-6 pl-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>
                  </button>

                  <div className="absolute inset-0 bg-purple-500/15 blur-[70px] xl:blur-[90px] rounded-full pointer-events-none" />

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
                          x: position === 0 ? '0%' : (position === 1 ? '40%' : '-40%'),
                          scale: isFront ? 1 : 0.85,
                          opacity: isFront ? 1 : 0.15,
                          zIndex: isFront ? 30 : 20,
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className={`absolute inset-0 w-full h-full rounded-[2.5rem] border flex flex-col p-8 xl:p-10 shadow-2xl overflow-x-hidden transition-all duration-500 ${
                          isFront 
                            ? 'bg-[#0E0E11] border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.2)]' 
                            : 'bg-[#0E0E11] border-zinc-800/50'
                        }`}
                      >
                        <div className="flex flex-col justify-center h-full gap-6 xl:gap-8">
                          
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 xl:w-14 xl:h-14 rounded-full border flex items-center justify-center shrink-0 overflow-hidden relative shadow-inner transition-colors duration-500 ${
                              index === 1 
                                ? 'bg-zinc-950/50 border-fuchsia-500/30 shadow-[inset_0_0_15px_rgba(217,70,239,0.15)]' 
                                : 'bg-zinc-950/50 border-blue-500/30 shadow-[inset_0_0_15px_rgba(56,189,248,0.15)]'
                            }`}>
                               {index === 1 ? (
                                 <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 xl:w-7 xl:h-7 drop-shadow-[0_0_10px_rgba(217,70,239,0.6)]">
                                    <path d="M12 11.5C14.2091 11.5 16 9.70914 16 7.5C16 5.29086 14.2091 3.5 12 3.5C9.79086 3.5 8 5.29086 8 7.5C8 9.70914 9.79086 11.5 12 11.5Z" fill="url(#pinkGrad)" opacity="0.95"/>
                                    <path d="M5 21.5V19.5C5 16.7386 7.23858 14.5 10 14.5H14C16.7614 14.5 19 16.7386 19 19.5V21.5" stroke="url(#pinkGrad)" strokeWidth="2" strokeLinecap="round"/>
                                    <defs>
                                      <linearGradient id="pinkGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#F472B6"/>
                                        <stop offset="1" stopColor="#D946EF"/>
                                      </linearGradient>
                                    </defs>
                                  </svg>
                               ) : (
                                 <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 xl:w-7 xl:h-7 drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]">
                                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" fill="url(#blueGrad)" opacity="0.95"/>
                                    <path d="M4 21V19C4 16.7909 5.79086 15 8 15H16C18.2091 15 20 16.7909 20 19V21" stroke="url(#blueGrad)" strokeWidth="2" strokeLinecap="square"/>
                                    <defs>
                                      <linearGradient id="blueGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#38BDF8"/>
                                        <stop offset="1" stopColor="#3B82F6"/>
                                      </linearGradient>
                                    </defs>
                                  </svg>
                               )}
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                              <div className="w-[45%] h-2.5 rounded-full bg-zinc-700"></div>
                              <div className="w-[25%] h-2 rounded-full bg-purple-500"></div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-4">
                            <div className="w-[95%] h-2.5 rounded-full bg-zinc-600"></div>
                            <div className="w-[85%] h-2.5 rounded-full bg-zinc-600"></div>
                            <div className="w-[90%] h-2.5 rounded-full bg-zinc-600"></div>
                            <div className="w-[70%] h-2.5 rounded-full bg-zinc-600"></div>
                          </div>

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
                </div>
            </motion.main>
          )}

          {/* 2. РАЗДЕЛ "КОНТАКТЫ" */}
          {activePage === 'contacts' && (
            <motion.main key="contacts" initial={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="w-full flex flex-col items-center justify-center relative z-10">
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
          <motion.div 
            key="portfolio"
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }} 
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
            exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative z-20"
          >
            <section className="relative w-full pb-4">
               <Portfolio />
            </section>
          </motion.div>
        )}

          {/* 4. РАЗДЕЛ "РЕГЛАМЕНТ" И "КАЛЬКУЛЯТОР" (Заглушка) */}
          {activePage === 'about' && (
            <motion.main key="rules-placeholder" initial={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="w-full flex items-center justify-center relative z-10">
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

      {/* 5. РАЗДЕЛ "КАЛЬКУЛЯТОР" */}
      {activePage === 'calculator' && (
        <motion.div 
          key="calculator"
          initial={{ opacity: 0, y: 20, filter: "blur(5px)" }} 
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
          exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative z-20"
        >
          <section className="relative w-full pb-4"> 
             <Calculator setActivePage={setActivePage} />
          </section>
        </motion.div>
      )}

      {/* 6. РАЗДЕЛ "РЕГЛАМЕНТ" */}
          {activePage === 'rules' && (
            <motion.div 
              key="rules"
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }} 
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
              exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              /* ЖЕСТКИЙ ПРИКАЗ: Игнорировать внутренние анимации и скроллить при первом касании */
              style={{ touchAction: "pan-y", willChange: "transform" }}
              className="w-full relative z-20 transform-gpu"
            >
              <section className="relative w-full pb-4">
                <Rules setActivePage={setActivePage} />
              </section>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* === ФУТЕР === */}
      {activePage !== 'calculator' && (
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
      )}

      {/* === ФУТУРИСТИЧНАЯ МОДАЛКА "ПОДЕЛИТЬСЯ" === */}
      <AnimatePresence>
        {isShareOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#09090B]/80 backdrop-blur-md"
            onClick={() => setIsShareOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[380px] flex flex-col items-center rounded-[2.5rem] border border-[#27272A] bg-[#0E0E11] p-8 shadow-[0_20px_60px_rgba(168,85,247,0.15)] overflow-hidden"
              onClick={(e) => e.stopPropagation()} 
            >
              {/* Свечение на фоне */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none"></div>
              
              {/* Кнопка закрытия */}
              <button onClick={() => setIsShareOpen(false)} className="absolute top-6 right-6 text-[#71717A] hover:text-[#FAFAFA] transition-colors z-20">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              {/* Логотип */}
              <div className="text-2xl md:text-3xl font-semibold tracking-tight select-none mb-8 relative z-10">
                Whi<span className="text-purple-500">Team</span>
              </div>

              {/* Контейнер QR-кода с неоновой рамкой */}
              <div className="relative p-1 rounded-[1.75rem] bg-gradient-to-b from-purple-500/50 to-[#27272A] mb-8 group">
                <div className="relative p-4 rounded-[1.6rem] bg-[#FAFAFA] flex items-center justify-center overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]">
                  
                  {/* Анимация сканирующего лазера */}
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }} 
                    transition={{ duration: 3, ease: "linear", repeat: Infinity }} 
                    className="absolute left-0 right-0 h-0.5 bg-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,1)] z-20"
                  ></motion.div>

                  <QRCodeCanvas 
                    id="qr-gen"
                    value={siteUrl} 
                    size={180} 
                    level="H"
                    fgColor="#09090B" 
                    bgColor="transparent" 
                  />
                </div>
                
                {/* Футуристичные уголки-прицелы */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-purple-400 rounded-tl-xl pointer-events-none"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-purple-400 rounded-tr-xl pointer-events-none"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-purple-400 rounded-bl-xl pointer-events-none"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-purple-400 rounded-br-xl pointer-events-none"></div>
              </div>

              {/* Кнопки управления */}
              <div className="flex gap-3 w-full relative z-10">
                
                {/* Кнопка "Скачать" */}
                <button 
                  onClick={downloadQR}
                  className="flex-1 relative flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border border-[#27272A] bg-[#121214] hover:bg-[#18181B] hover:border-purple-500/50 transition-all duration-300 group overflow-hidden"
                >
                  <svg className="w-5 h-5 text-[#A1A1AA] group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  <span className="text-[#FAFAFA] font-medium text-[10px] tracking-wide uppercase">{lang === 'RU' ? 'Скачать QR' : 'Save QR'}</span>
                </button>

                {/* Кнопка "Скопировать" */}
                <button 
                  onClick={handleCopy}
                  className="flex-[2] relative flex items-center justify-center gap-2 py-3 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-500/60 transition-all duration-300 group overflow-hidden"
                >
                  {isCopied ? (
                    <>
                      <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      <span className="text-green-400 font-semibold text-xs tracking-wide uppercase">{lang === 'RU' ? 'Скопировано!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      <span className="text-[#FAFAFA] font-semibold text-xs tracking-wide uppercase">{lang === 'RU' ? 'Копировать' : 'Copy Link'}</span>
                    </>
                  )}
                </button>
                
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </AdaptiveLayout>
  );
}