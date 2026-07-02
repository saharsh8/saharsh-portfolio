import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github, Code2, Database } from "lucide-react";

export const ProjectModal = ({ project, isOpen, onClose }: { project: any, isOpen: boolean, onClose: () => void }) => {
  if (!project) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card border border-white/10 rounded-2xl shadow-2xl bg-cyber-dark/95 no-scrollbar flex flex-col"
          >
            <div className="sticky top-0 p-6 sm:px-8 border-b border-white/10 bg-black/60 backdrop-blur-xl flex justify-between items-start z-10">
              <div className="pr-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-primary to-neon-secondary">
                  {project.title}
                </h2>
                <p className="text-gray-400 mt-2 font-mono text-xs sm:text-sm">{project.stack.join(" • ")}</p>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white bg-black/20 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 sm:p-8 space-y-8 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-3 space-y-6">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-neon-primary" />
                    Architecture & Impact
                  </h3>
                  <div className="space-y-4">
                    {project.bullets.map((bullet: string, i: number) => {
                      const split = bullet.split(":");
                      return (
                        <div key={i} className="flex items-start glass-card p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-neon-primary to-neon-secondary mt-2 mr-4 shrink-0 shadow-[0_0_5px_rgba(0,240,255,0.5)]" />
                          <span className="text-gray-300 font-sans leading-relaxed text-sm">
                            {split.length > 1 ? (
                              <>
                                <strong className="text-white block mb-1 font-semibold">{split[0]}:</strong>
                                <span className="text-gray-400">{split.slice(1).join(":")}</span>
                              </>
                            ) : (
                              bullet
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-8">
                  <div className="glass-card p-6 rounded-xl border border-white/5 space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Database className="w-5 h-5 text-neon-secondary" />
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg border border-white/10 bg-black/40 text-xs font-mono text-gray-300 hover:border-neon-secondary/50 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.links && project.links.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <ExternalLink className="w-5 h-5 text-neon-primary" />
                        Resources
                      </h3>
                      <div className="flex flex-col gap-3">
                        {project.links.map((link: any, i: number) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-neon-primary/10 to-neon-secondary/10 border border-white/10 hover:border-neon-primary/50 text-white transition-all group"
                          >
                            <span className="flex items-center gap-2 font-medium">
                              {link.label === "GitHub" ? <Github className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                              {link.label}
                            </span>
                            <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
