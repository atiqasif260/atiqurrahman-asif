import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulseSpeed: number;
  pulsePhase: number;
  layer: number; // 0 = back, 1 = mid, 2 = front
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    const tokens = getComputedStyle(document.documentElement);
    const primary = tokens.getPropertyValue("--primary").trim();
    const accent = tokens.getPropertyValue("--accent").trim();
    const color = (token: string, alpha: number) => `hsl(${token} / ${alpha})`;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize neural network nodes
    const count = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 10000));
    nodesRef.current = Array.from({ length: count }, () => {
      const layer = Math.random() < 0.3 ? 0 : Math.random() < 0.6 ? 1 : 2;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (0.2 + layer * 0.15),
        vy: (Math.random() - 0.5) * (0.2 + layer * 0.15),
        size: (Math.random() * 1.5 + 0.5) * (1 + layer * 0.3),
        opacity: Math.random() * 0.4 + 0.1 + layer * 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
        layer,
      };
    });

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    const animate = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        // Mouse interaction
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0 && dist < 200) {
          const force = (200 - dist) / 200;
          n.vx += (dx / dist) * force * 0.03;
          n.vy += (dy / dist) * force * 0.03;
        }

        // Dampen
        n.vx *= 0.998;
        n.vy *= 0.998;
      }

      // Draw connections (neural synapses)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 150;
          if (dist < maxDist) {
            const alpha = 0.12 * (1 - dist / maxDist);
            
            // Data flow animation along connections
            const flowPos = (Math.sin(t * 2 + i * 0.5) + 1) / 2;
            const mx = nodes[i].x + (nodes[j].x - nodes[i].x) * flowPos;
            const my = nodes[i].y + (nodes[j].y - nodes[i].y) * flowPos;

            // Connection line
            const lineGrad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            lineGrad.addColorStop(0, color(primary, alpha * 0.6));
            lineGrad.addColorStop(0.5, color(accent, alpha));
            lineGrad.addColorStop(1, color(primary, alpha * 0.6));
            
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Data pulse dot traveling along connection
            if (dist < maxDist * 0.7) {
              ctx.beginPath();
              ctx.arc(mx, my, 1.2, 0, Math.PI * 2);
              ctx.fillStyle = color(primary, alpha * 2.5);
              ctx.fill();
            }
          }
        }
      }

      // Draw nodes with glow
      for (const n of nodes) {
        const pulse = Math.sin(t * n.pulseSpeed * 60 + n.pulsePhase) * 0.3 + 0.7;
        const hue = n.layer === 1 ? accent : primary;
        const alpha = n.opacity * pulse;

        // Outer glow
        const glowSize = n.size * 4;
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowSize);
        glow.addColorStop(0, color(hue, alpha * 0.3));
        glow.addColorStop(1, color(hue, 0));
        ctx.fillStyle = glow;
        ctx.fillRect(n.x - glowSize, n.y - glowSize, glowSize * 2, glowSize * 2);

        // Core node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = color(hue, alpha);
        ctx.fill();
      }

      // Mouse proximity highlight ring
      const closestNodes = nodes
        .map((n) => ({ n, d: Math.sqrt((n.x - mouse.x) ** 2 + (n.y - mouse.y) ** 2) }))
        .filter((x) => x.d < 180)
        .sort((a, b) => a.d - b.d)
        .slice(0, 8);

      if (closestNodes.length > 2) {
        for (let i = 0; i < closestNodes.length; i++) {
          for (let j = i + 1; j < closestNodes.length; j++) {
            const a = closestNodes[i].n;
            const b = closestNodes[j].n;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = color(primary, 0.08);
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      if (!document.hidden && !motion.matches) animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    const resume = () => {
      cancelAnimationFrame(animationRef.current);
      if (!document.hidden && !motion.matches) animate();
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    document.addEventListener("visibilitychange", resume);
    motion.addEventListener("change", resume);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      document.removeEventListener("visibilitychange", resume);
      motion.removeEventListener("change", resume);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-70" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default AnimatedBackground;
