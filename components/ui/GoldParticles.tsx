"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/** Lightweight canvas of drifting gold dust. Pauses when off-screen. */
export function GoldParticles({ className, density = 70 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0, raf = 0, visible = true;
    const count = window.innerWidth < 768 ? Math.round(density * 0.5) : density;

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; t: number };
    let ps: P[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const spawn = (initial: boolean): P => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 10,
      r: 0.4 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -(0.12 + Math.random() * 0.45),
      a: 0.15 + Math.random() * 0.6,
      t: Math.random() * Math.PI * 2,
    });

    resize();
    ps = Array.from({ length: count }, () => spawn(true));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.t += 0.015;
        p.x += p.vx + Math.sin(p.t) * 0.12;
        p.y += p.vy;
        if (p.y < -10) Object.assign(p, spawn(false));
        const flicker = 0.65 + Math.sin(p.t * 2.3) * 0.35;
        ctx.beginPath();
        ctx.fillStyle = `rgba(205,176,131,${p.a * flicker})`;
        ctx.shadowColor = "rgba(177,139,82,0.9)";
        ctx.shadowBlur = p.r * 6;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (visible) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} />;
}
