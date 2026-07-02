import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Search, FileText, Code, User, Briefcase, Mail, Github, Linkedin, Terminal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CommandMenu = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-start justify-center pt-[20vh] px-4"
        >
          <div className="fixed inset-0 z-[-1]" onClick={() => setOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-neon-primary/20 rounded-2xl shadow-[0_0_50px_rgba(0,212,255,0.1)] overflow-hidden"
          >
            <Command label="Command Menu" className="w-full h-full flex flex-col" shouldFilter={false}>
              <div className="flex items-center px-4 border-b border-white/10 bg-white/5">
                <Search className="w-5 h-5 text-neon-primary mr-3 opacity-70" />
                <Command.Input 
                  autoFocus 
                  placeholder="Type a command or search..." 
                  className="w-full bg-transparent text-white placeholder-gray-500 h-14 outline-none border-none font-mono text-sm"
                />
                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <Command.List className="max-h-[350px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-neon-primary/30 scrollbar-track-transparent">
                <Command.Empty className="p-6 text-center text-sm text-gray-500 font-mono">No results found.</Command.Empty>
                
                <Command.Group heading="Navigation" className="text-[10px] uppercase font-mono text-gray-500 p-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:mb-2">
                  <Command.Item 
                    onSelect={() => { document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); }}
                    className="flex items-center px-3 py-2.5 rounded-lg hover:bg-neon-primary/10 cursor-pointer text-sm text-gray-300 aria-selected:bg-neon-primary/20 aria-selected:text-white transition-colors group"
                  >
                    <Briefcase className="w-4 h-4 mr-3 text-neon-primary group-hover:glow-primary" />
                    Experience
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); }}
                    className="flex items-center px-3 py-2.5 rounded-lg hover:bg-neon-secondary/10 cursor-pointer text-sm text-gray-300 aria-selected:bg-neon-secondary/20 aria-selected:text-white transition-colors group"
                  >
                    <Code className="w-4 h-4 mr-3 text-neon-secondary group-hover:glow-secondary" />
                    Projects
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => { document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); }}
                    className="flex items-center px-3 py-2.5 rounded-lg hover:bg-emerald-500/10 cursor-pointer text-sm text-gray-300 aria-selected:bg-emerald-500/20 aria-selected:text-white transition-colors group"
                  >
                    <Terminal className="w-4 h-4 mr-3 text-emerald-400" />
                    Skills Inventory
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Actions" className="text-[10px] uppercase font-mono text-gray-500 p-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:mb-2 border-t border-white/5 mt-2 pt-2">
                  <Command.Item 
                    onSelect={() => { 
                      window.open('/resume.pdf', '_blank');
                      setOpen(false); 
                    }}
                    className="flex items-center px-3 py-2.5 rounded-lg hover:bg-white/10 cursor-pointer text-sm text-gray-300 aria-selected:bg-white/10 aria-selected:text-white transition-colors group"
                  >
                    <FileText className="w-4 h-4 mr-3 text-gray-400 group-hover:text-white" />
                    Download Resume (PDF)
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => { window.location.href = 'mailto:saharsh.sriva08@gmail.com'; setOpen(false); }}
                    className="flex items-center px-3 py-2.5 rounded-lg hover:bg-white/10 cursor-pointer text-sm text-gray-300 aria-selected:bg-white/10 aria-selected:text-white transition-colors group"
                  >
                    <Mail className="w-4 h-4 mr-3 text-gray-400 group-hover:text-white" />
                    Email Contact
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Links" className="text-[10px] uppercase font-mono text-gray-500 p-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:mb-2 border-t border-white/5 mt-2 pt-2">
                  <Command.Item 
                    onSelect={() => { window.open('https://github.com/alonepair', '_blank'); setOpen(false); }}
                    className="flex items-center px-3 py-2.5 rounded-lg hover:bg-white/10 cursor-pointer text-sm text-gray-300 aria-selected:bg-white/10 aria-selected:text-white transition-colors group"
                  >
                    <Github className="w-4 h-4 mr-3 text-gray-400 group-hover:text-white" />
                    GitHub
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => { window.open('https://linkedin.com/in/saharsh-srivastava', '_blank'); setOpen(false); }}
                    className="flex items-center px-3 py-2.5 rounded-lg hover:bg-white/10 cursor-pointer text-sm text-gray-300 aria-selected:bg-white/10 aria-selected:text-white transition-colors group"
                  >
                    <Linkedin className="w-4 h-4 mr-3 text-gray-400 group-hover:text-white" />
                    LinkedIn
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
