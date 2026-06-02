export default function AdaptiveLayout({ children }) {
  return (
    <div translate="no" className="w-full bg-[#09090B] text-[#FAFAFA] font-sans antialiased flex flex-col relative selection:bg-purple-500/30 cursor-default notranslate min-h-screen overflow-x-hidden xl:h-screen xl:overflow-hidden">
      
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="absolute top-[-20%] left-[20%] w-[50vw] h-[50vh] bg-white/[0.02] blur-[150px] rounded-full transform-gpu"></div>
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.08] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:5rem_5rem]"></div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto flex flex-col px-6 md:px-12 xl:px-[5vw] pt-6 xl:pt-[4vh] pb-0 relative z-10 flex-1 h-full">
        {children}
      </div>

    </div>
  );
}