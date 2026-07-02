import { motion, useScroll, useSpring } from "motion/react";

export const TopProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-primary to-neon-secondary origin-left z-[100]" 
      style={{ scaleX }} 
    />
  );
};
