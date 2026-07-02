import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Terminal, Cpu, Braces, Layers } from 'lucide-react';

export const SkillOrbit = () => {
  return (
    <div className="relative w-full aspect-square max-w-[200px] mx-auto flex items-center justify-center my-8">
      {/* Center core */}
      <div className="absolute z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-neon-primary to-neon-secondary shadow-[0_0_30px_rgba(0,212,255,0.4)] flex items-center justify-center border-2 border-white/20">
        <span className="text-[10px] font-bold text-white font-mono text-center leading-tight">AI<br/>ENGINE</span>
      </div>

      {/* Orbit Rings */}
      <div className="absolute w-[140%] h-[140%] rounded-full border border-white/5 border-dashed" />
      <div className="absolute w-[180%] h-[180%] rounded-full border border-white/5 border-dashed" />

      {/* Orbiting items - inner ring */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[140%] h-[140%] rounded-full"
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 p-2 rounded-full bg-[#0a0a0a] border border-white/10 text-neon-primary shadow-lg">
          <Code2 className="w-4 h-4" />
        </div>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 p-2 rounded-full bg-[#0a0a0a] border border-white/10 text-neon-secondary shadow-lg">
          <Terminal className="w-4 h-4" />
        </div>
      </motion.div>

      {/* Orbiting items - outer ring */}
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute w-[180%] h-[180%] rounded-full"
      >
        <div className="absolute top-1/2 -left-3 -translate-y-1/2 p-2 rounded-full bg-[#0a0a0a] border border-white/10 text-violet-400 shadow-lg">
          <Database className="w-4 h-4" />
        </div>
        <div className="absolute top-1/2 -right-3 -translate-y-1/2 p-2 rounded-full bg-[#0a0a0a] border border-white/10 text-emerald-400 shadow-lg">
          <Braces className="w-4 h-4" />
        </div>
        <div className="absolute -top-1 right-8 p-2 rounded-full bg-[#0a0a0a] border border-white/10 text-pink-400 shadow-lg">
          <Layers className="w-4 h-4" />
        </div>
        <div className="absolute -bottom-1 left-8 p-2 rounded-full bg-[#0a0a0a] border border-white/10 text-blue-400 shadow-lg">
          <Cpu className="w-4 h-4" />
        </div>
      </motion.div>
    </div>
  );
};
