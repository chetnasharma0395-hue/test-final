'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Draggable state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const dragStart = useRef({ mouseX: 0, mouseY: 0, elemX: 0, elemY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const dragThreshold = 5; // px moved before we consider it a drag (not a tap)

  // Show after scroll
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-expand hint after 4s (only once, and never again after the user dismisses it)
  const [hintDismissed, setHintDismissed] = useState(false);
  useEffect(() => {
    if (!visible || hintDismissed) return;
    const t = setTimeout(() => setExpanded(true), 4000);
    return () => clearTimeout(t);
  }, [visible, hintDismissed]);

  // Set initial position (bottom-right corner)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setPosition({
      x: window.innerWidth - 80,
      y: window.innerHeight - 80,
    });
  }, []);

  // Keep in bounds on window resize
  useEffect(() => {
    const onResize = () => {
      setPosition(prev => ({
        x: Math.min(prev.x, window.innerWidth - 70),
        y: Math.min(prev.y, window.innerHeight - 70),
      }));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // Only drag on the FAB button itself, not the expanded panel
    if ((e.target as HTMLElement).closest('.wa-panel')) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    setHasDragged(false);
    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      elemX: position.x,
      elemY: position.y,
    };
  }, [position]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.mouseX;
    const dy = e.clientY - dragStart.current.mouseY;

    if (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold) {
      setHasDragged(true);
    }

    const newX = dragStart.current.elemX + dx;
    const newY = dragStart.current.elemY + dy;

    // Clamp within viewport
    const padding = 8;
    const btnSize = 56;
    setPosition({
      x: Math.max(padding, Math.min(window.innerWidth - btnSize - padding, newX)),
      y: Math.max(padding, Math.min(window.innerHeight - btnSize - padding, newY)),
    });
  }, [isDragging]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    // If barely moved → treat as a tap → toggle expanded
    if (!hasDragged) {
      setExpanded(prev => !prev);
      setHintDismissed(true);
    }
    setHasDragged(false);
  }, [hasDragged]);

  // Track viewport width in state instead of reading window during render
  // (reading window in the render body is unsafe and can throw).
  const [viewportWidth, setViewportWidth] = useState(0);
  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!visible) return null;

  // Determine if panel should open left or right based on x position
  const openLeft = viewportWidth > 0 && position.x > viewportWidth / 2;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 200,
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      {/* Expanded panel — positioned relative to button */}
      {expanded && (
        <div
          className="wa-panel absolute bottom-16 bg-[#1A1A1A] rounded-[1.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-white/10 p-5 w-64 animate-fade-up"
          style={{ [openLeft ? 'right' : 'left']: 0 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-widest text-white">Available Now</p>
            </div>
            <button
              onClick={() => { setExpanded(false); setHintDismissed(true); }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-white font-black text-sm mb-1">Book a Taxi Instantly</p>
          <p className="text-white/70 text-xs font-light mb-4 leading-relaxed">
            Get a confirmed quote in under 15 minutes via WhatsApp. No app required.
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="https://wa.me/919258912169?text=Hi%2C%20I%20need%20a%20taxi%20quote%20for%20my%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>
            <a
              href="tel:+919258912169"
              className="flex items-center justify-center gap-2 py-3 bg-[#1A1A1A] text-white font-black text-[10px] uppercase tracking-widest rounded-xl border border-white/10 hover:bg-[#2a2a2a] transition-colors"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      )}

      {/* Main FAB — draggable */}
      <div
        data-lenis-prevent
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setExpanded((prev) => !prev);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Open WhatsApp booking"
        aria-expanded={expanded}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_40px_rgba(37,211,102,0.6)] transition-all duration-300 active:scale-95 select-none"
      >
        {/* Ping animation — only when not dragging */}
        {!isDragging && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        )}
        {/* Drag hint tooltip */}
        {isDragging && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[9px] font-bold px-2 py-1 rounded-full whitespace-nowrap">
            Move me
          </span>
        )}
        <MessageCircle className="w-7 h-7 text-white relative z-10 pointer-events-none" />
      </div>
    </div>
  );
}
