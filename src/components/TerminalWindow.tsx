import { useState, useEffect } from "react";

export const TerminalWindow = () => {
  const [text, setText] = useState("");
  const fullText = `> executing saharsh_profile.py...\n> loading AI/ML models...\n> connecting to RAG_engine...\n> mounting React components...\n> connection established.\n> status: ONLINE`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md shadow-[0_0_30px_rgba(0,240,255,0.1)] font-mono text-xs sm:text-sm mt-8 relative group">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="flex items-center px-4 py-2.5 border-b border-white/10 bg-black/60 relative z-10">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
        </div>
        <div className="mx-auto text-gray-500 text-xs font-semibold tracking-wider">saharsh@ai-studio:~</div>
      </div>
      <div className="p-5 text-neon-primary min-h-[140px] overflow-hidden whitespace-pre-wrap leading-relaxed relative z-10">
        {text}
        <span className="animate-pulse ml-1 text-white">_</span>
      </div>
    </div>
  );
};
