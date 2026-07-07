"use client";

import { useRef, useState, type MouseEvent } from "react";

export function ProductImageZoom({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState("center center");
  const [zoomed, setZoomed] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  return (
    <div
      ref={containerRef}
      className="gallary-item"
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={handleMouseMove}
      style={{ overflow: "hidden", cursor: zoomed ? "zoom-out" : "zoom-in" }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          transform: zoomed ? "scale(2)" : "scale(1)",
          transformOrigin: origin,
          transition: zoomed ? "none" : "transform 0.3s ease",
        }}
      />
    </div>
  );
}
