import { useEffect, useRef, useState } from "react";

interface AnimatedBackgroundProps {
  isDark: boolean;
}

export default function AnimatedBackground({ isDark }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic particle count based on screen width
    const getParticleCount = (w: number) => {
      if (w < 768) return 20; // Mobile
      if (w < 1024) return 45; // Tablet
      return 90; // Desktop
    };

    let particleCount = getParticleCount(width);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }

    let particles: Particle[] = [];

    const createParticles = () => {
      particles = [];
      const primaryColor = isDark ? "rgba(0, 255, 136, 0.4)" : "rgba(0, 255, 136, 0.3)";
      const secondaryColor = isDark ? "rgba(0, 229, 255, 0.4)" : "rgba(0, 229, 255, 0.3)";

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.4,
          vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? primaryColor : secondaryColor,
        });
      }
    };

    createParticles();

    // Mouse interactive coordinates
    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particleCount = getParticleCount(width);
      createParticles();
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    const draw = () => {
      if (!ctx || !canvas) return;

      // Clear with very slight transparency to leave a tiny trail (optional, currently solid for performance)
      ctx.fillStyle = isDark ? "#030712" : "#f9fafb";
      ctx.fillRect(0, 0, width, height);

      // Draw subtle background glowing radial gradients
      const gradient1 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.2,
        10,
        width * 0.2,
        height * 0.2,
        Math.min(width, height) * 0.6
      );
      gradient1.addColorStop(
        0,
        isDark ? "rgba(0, 255, 136, 0.04)" : "rgba(0, 255, 136, 0.03)"
      );
      gradient1.addColorStop(1, "rgba(0, 0, 0, 0)");

      const gradient2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.7,
        10,
        width * 0.8,
        height * 0.7,
        Math.min(width, height) * 0.6
      );
      gradient2.addColorStop(
        0,
        isDark ? "rgba(0, 229, 255, 0.04)" : "rgba(0, 229, 255, 0.03)"
      );
      gradient2.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);

      // Connect particles
      const connectionDist = 120;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.fill();

        // Update position (if not reduced motion)
        if (!prefersReducedMotion) {
          p1.x += p1.vx;
          p1.y += p1.vy;

          // Bounce off boundaries
          if (p1.x < 0 || p1.x > width) p1.vx *= -1;
          if (p1.y < 0 || p1.y > height) p1.vy *= -1;
        }

        // Connections between particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(255, 255, 255, ${alpha})`
              : `rgba(0, 0, 0, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Connection to mouse
        const mouseDx = p1.x - mouse.x;
        const mouseDy = p1.y - mouse.y;
        const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
        if (mouseDist < 180) {
          const alpha = (1 - mouseDist / 180) * 0.25;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isDark
            ? `rgba(0, 255, 136, ${alpha})`
            : `rgba(0, 255, 136, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDark, prefersReducedMotion]);

  return (
    <canvas
      id="bg-canvas"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none transition-colors duration-500"
    />
  );
}
