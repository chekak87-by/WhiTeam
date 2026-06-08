import { translations } from '../translations';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Partners({ setActivePage, lang }) {
  const t = translations[lang] || translations['RU'];

  const STEPS = [
    {
      id: 1,
      title: t.pCard1Title,
      desc: t.pCard1Desc,
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>,
      color: "from-purple-500/20 to-transparent",
      borderColor: "group-hover:border-purple-500/50",
      iconColor: "text-purple-400"
    },
    {
      id: 2,
      title: t.pCard2Title,
      desc: t.pCard2Desc,
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
      color: "from-fuchsia-500/20 to-transparent",
      borderColor: "group-hover:border-fuchsia-500/50",
      iconColor: "text-fuchsia-400"
    },
    {
      id: 3,
      title: t.pCard3Title,
      desc: t.pCard3Desc,
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      color: "from-emerald-500/20 to-transparent",
      borderColor: "group-hover:border-emerald-500/50",
      iconColor: "text-emerald-400"
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-4 px-4 md:px-8 pb-16">
      
      {/* Заголовок */}
      <div className="mb-16 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
          Up to 15% Cashback
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          {t.pTitle1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">{t.pTitle2}</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed">
          {t.pSubtitle}
        </p>
      </div>

      {/* Карточки шагов */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
      >
        {STEPS.map((step) => (
          <motion.div 
            key={step.id}
            variants={cardVariants}
            className={`relative p-6 md:p-8 rounded-[2rem] bg-[#0E0E11] border border-zinc-800 overflow-hidden group transition-all duration-500 ${step.borderColor} hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]`}
          >
            <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
            
            <div className="relative z-10">
              <div className={`w-14 h-14 mb-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 ${step.iconColor}`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Футуристичный блок с примером */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative w-full rounded-[2rem] p-[1px] overflow-hidden mb-16"
      >
        {/* Вращающийся градиент на границе */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-blue-500 animate-[spin_4s_linear_infinite] opacity-50"></div>
        
        <div className="relative w-full h-full bg-[#09090B] rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="flex-1 relative z-10 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t.pExampleTitle}
            </h3>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              {t.pExampleDesc} <span className="text-white font-medium px-2 py-1 bg-zinc-800 rounded-md border border-zinc-700 mx-1">{t.pExamplePrice}</span>.
            </p>
          </div>

          <div className="shrink-0 relative z-10 bg-[#121214] border border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-w-[280px] shadow-2xl">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
              {t.pExampleSumText}
            </span>
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">
              {t.pExampleSum}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Инженерный CTA-блок */}
      <motion.button 
        onClick={() => setActivePage('contacts')}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="w-full relative p-6 md:p-8 rounded-2xl border border-zinc-800/80 bg-[#0E0E11] text-left overflow-hidden group shadow-[0_0_40px_rgba(0,0,0,0.2)] hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          <h4 className="text-white font-semibold text-lg md:text-xl mb-2 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7] animate-pulse"></span>
            {t.pCtaTitle}
          </h4>
          <p className="text-zinc-400 text-sm md:text-base">
            {t.pCtaDesc}
          </p>
        </div>

        <div className="relative z-10 shrink-0 flex items-center gap-4 text-purple-400">
          <span className="text-sm font-mono tracking-widest uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 hidden md:block">
            {t.pCtaBtn}
          </span>
          <div className="w-12 h-12 rounded-full border border-zinc-700 group-hover:border-purple-500 group-hover:bg-purple-500/10 flex items-center justify-center transition-all duration-500">
            <svg className="w-5 h-5 text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </motion.button>

    </div>
  );
}