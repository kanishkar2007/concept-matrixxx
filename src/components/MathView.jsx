import React, { useEffect, useRef } from 'react';

/**
 * Safely renders LaTeX mathematical expressions.
 * Automatically utilizes KaTeX if available in window, or provides styled fallback.
 */
export default function MathView({ math, block = false, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && window.katex) {
      try {
        window.katex.render(math, containerRef.current, {
          displayMode: block,
          throwOnError: false
        });
      } catch (e) {
        // Fallback to text
        if (containerRef.current) {
          containerRef.current.textContent = math;
        }
      }
    } else if (containerRef.current) {
      containerRef.current.textContent = math;
    }
  }, [math, block]);

  return (
    <span
      ref={containerRef}
      className={`font-mono text-indigo-300 ${block ? 'block py-1' : 'inline-block'} ${className}`}
    >
      {math}
    </span>
  );
}
