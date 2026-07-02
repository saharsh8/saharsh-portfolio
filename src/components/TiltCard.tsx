import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string, key?: React.Key }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  
  // For spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const currentMouseX = e.clientX - rect.left;
    const currentMouseY = e.clientY - rect.top;
    
    x.set(currentMouseX / width - 0.5);
    y.set(currentMouseY / height - 0.5);
    
    mouseX.set(currentMouseX);
    mouseY.set(currentMouseY);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group ${className}`}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([currentX, currentY]) => `radial-gradient(600px circle at ${currentX}px ${currentY}px, rgba(0,255,136,0.1), transparent 40%)`
          )
        }}
      />
      <div style={{ transform: "translateZ(30px)" }} className="h-full relative z-20">
        {children}
      </div>
    </motion.div>
  );
};
