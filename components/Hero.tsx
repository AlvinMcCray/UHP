
import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const IMAGES = [
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502675135487-e971002a6adb?q=80&w=2070&auto=format&fit=crop"
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // Fix: arrays use .length, not .size
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 6000); // Change image every 6 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {IMAGES.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              index === currentIndex ? 'opacity-60' : 'opacity-0'
            }`}
          >
            <img 
              src={src} 
              alt={`Endurance visual ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Consistent Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        <div className="inline-flex items-center gap-2 border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 rounded-full mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
          <span className="text-yellow-500 text-xs font-mono uppercase tracking-widest text-shadow-sm">Live Tracking Active</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase mb-6 leading-[0.9]">
          Under <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">Human</span> Power
        </h1>
        
        <p className="text-lg md:text-2xl text-neutral-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed drop-shadow-md">
          Exploring the limits of endurance through urban landscapes and untamed wilderness. No motors. No support. Just momentum.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button className="group bg-yellow-500 text-black px-8 py-4 rounded-sm font-bold tracking-wide hover:bg-yellow-400 transition-all flex items-center gap-2 shadow-lg shadow-yellow-500/10">
            View The Route
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 rounded-sm font-bold tracking-wide border border-neutral-700 backdrop-blur-md bg-white/5 hover:border-white transition-all text-neutral-300 hover:text-white">
            Watch The Series
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 transition-all duration-500 rounded-full ${
              index === currentIndex ? 'w-8 bg-yellow-500' : 'w-2 bg-neutral-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-neutral-500 z-10">
        <ChevronDown className="w-8 h-8" />
      </div>
    </header>
  );
};

export default Hero;
