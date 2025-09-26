import React, { useState, useEffect, useRef } from "react";

const CustomConfetti = ({ active }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (active) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let width = window.innerWidth;
      let height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const particles = [];
      const particleCount = 200;
      const colors = [
        "#f44336",
        "#e91e63",
        "#9c27b0",
        "#673ab7",
        "#3f51b5",
        "#2196f3",
        "#03a9f4",
        "#00bcd4",
        "#009688",
        "#4caf50",
        "#8bc34a",
        "#cddc39",
        "#ffeb3b",
        "#ffc107",
        "#ff9800",
        "#ff5722",
      ];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height - height,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 6 + 3,
          speedX: Math.random() * 3 - 1.5,
          speedY: Math.random() * 5 + 2,
        });
      }

      let animationFrameId;

      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p) => {
          p.y += p.speedY;
          p.x += p.speedX;

          if (p.y > height) {
            p.y = -20;
            p.x = Math.random() * width;
          }

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.rect(p.x, p.y, p.size, p.size * 2);
          ctx.fill();
        });
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      const timer = setTimeout(() => {
        cancelAnimationFrame(animationFrameId);
      }, 5000); // Stop confetti after 5 seconds

      return () => {
        cancelAnimationFrame(animationFrameId);
        clearTimeout(timer);
      };
    }
  }, [active]);

  if (!active) return null;

  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 9999, pointerEvents: "none" }} />;
};

export default CustomConfetti;
