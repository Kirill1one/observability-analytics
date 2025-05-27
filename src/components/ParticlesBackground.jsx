import React, { useEffect, useRef, useState } from 'react';
 

const ParticlesBackground = ({ 
  density = 10000,
  maxDistance = 100,
  lineColor = 'rgba(255, 255, 255, 0.1)',
  particleColors = [
    'rgba(255, 109, 0, 0.6)',
    'rgba(0, 191, 255, 0.6)',
    'rgba(138, 43, 226, 0.6)'
  ],
  responsive = true
}) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [dpr, setDpr] = useState(window.devicePixelRatio);
  const particlesRef = useRef([]);
  const animationIdRef = useRef(null);

  // Инициализация частиц
  const initParticles = () => {
    const count = Math.min(Math.floor((dimensions.width * dimensions.height) / density), 150);
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      opacity: Math.random() * 0.5 + 0.1
    }));
  };

  // Отрисовка соединений между частицами
  const drawConnections = (ctx) => {
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x * dpr, particles[i].y * dpr);
          ctx.lineTo(particles[j].x * dpr, particles[j].y * dpr);
          ctx.stroke();
        }
      }
    }
  };

  // Анимационный цикл
  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, dimensions.width * dpr, dimensions.height * dpr);

    particlesRef.current.forEach(particle => {
      // Обновление позиции
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Отскок от границ
      if (particle.x < 0 || particle.x > dimensions.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > dimensions.height) particle.speedY *= -1;

      // Отрисовка частицы
      ctx.fillStyle = particle.color.replace('0.6', `${particle.opacity}`);
      ctx.beginPath();
      ctx.arc(
        particle.x * dpr,
        particle.y * dpr,
        particle.size * dpr,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });

    drawConnections(ctx);
    animationIdRef.current = requestAnimationFrame(animate);
  };

  // Обработчик изменения размера
  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
    setDpr(window.devicePixelRatio || 1);
  };

  // Эффекты для инициализации
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Установка размеров canvas
    const updateCanvasSize = () => {
      canvas.width = dimensions.width * dpr;
      canvas.height = dimensions.height * dpr;
      canvas.style.width = `${dimensions.width}px`;
      canvas.style.height = `${dimensions.height}px`;
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();
    initParticles();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationIdRef.current);
    };
  }, [dimensions, dpr, density, particleColors]);

  return (
    <canvas
      ref={canvasRef}
      className="particles-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none'
      }}
    />
  );
};

export default ParticlesBackground;