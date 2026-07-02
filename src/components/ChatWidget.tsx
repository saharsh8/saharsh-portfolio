import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot } from "lucide-react";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm Saharsh's AI assistant. Ask me anything about his experience, skills, or projects!" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: "user", text: input }]);
    const currentInput = input;
    setInput("");
    
    setTimeout(() => {
      let reply = "I'm a mock AI assistant! But Saharsh really does build full-stack AI apps.";
      const lower = currentInput.toLowerCase();
      if (lower.includes("python") || lower.includes("fastapi") || lower.includes("ai")) {
        reply = "Saharsh is highly skilled in Python and FastAPI, having built robust AI agents, LangChain wrappers, and RAG pipelines.";
      } else if (lower.includes("react") || lower.includes("frontend")) {
        reply = "He uses Next.js, React, and Tailwind CSS to build stunning, responsive, and performance-optimized user interfaces.";
      } else if (lower.includes("experience") || lower.includes("work") || lower.includes("intern")) {
        reply = "He has worked as an AI/ML Intern at IBM SkillsBuild and as a Web Development Intern at Candour Software Pvt. Ltd.";
      } else if (lower.includes("contact") || lower.includes("hire") || lower.includes("email")) {
        reply = "You can reach him at alonepair07@gmail.com or via his LinkedIn profile!";
      }
      setMessages(prev => [...prev, { sender: "bot", text: reply }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-3rem)] sm:w-96 h-[400px] glass-card rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden bg-cyber-dark/95 backdrop-blur-xl"
          >
            <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-primary to-neon-secondary flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">AI Assistant</h3>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <p className="text-xs text-gray-400">Online</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors cursor-pointer p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4 no-scrollbar">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.sender === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] p-3 text-sm ${msg.sender === "user" ? "bg-gradient-to-r from-neon-primary to-neon-secondary text-white rounded-2xl rounded-tr-sm" : "bg-white/10 border border-white/5 text-gray-200 rounded-2xl rounded-tl-sm shadow-md"}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-3 border-t border-white/10 bg-black/40 flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about my resume..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-primary/50 transition-colors"
              />
              <button 
                onClick={handleSend} 
                className="p-2.5 rounded-xl bg-neon-primary/20 text-neon-primary hover:bg-neon-primary hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                disabled={!input.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-neon-primary to-neon-secondary flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer border border-white/20 hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-shadow group relative"
      >
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <X className="w-6 h-6 text-white relative z-10" /> : <MessageSquare className="w-6 h-6 text-white relative z-10" />}
      </motion.button>
    </div>
  );
};
