
import React from 'react';
import Hero from './components/Hero';
import Stats from './components/Stats';
import LiveTracker from './components/LiveTracker';
import RouteTimeline from './components/RouteTimeline';
import AiChatbot from './components/AiChatbot';
import GearAnalyzer from './components/GearAnalyzer';
import IntelligenceCenter from './components/IntelligenceCenter';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-yellow-500 selection:text-black">
      {/* Navigation Overlay */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="text-xl font-black uppercase tracking-tighter">
          UHP<span className="text-yellow-500">_EXPEDITION</span>
        </div>
        <div className="hidden md:flex gap-8 font-mono text-xs uppercase tracking-widest text-neutral-400">
          <a href="#" className="hover:text-white transition-colors">Route</a>
          <a href="#" className="hover:text-white transition-colors">Metrics</a>
          <a href="#" className="hover:text-white transition-colors">Intelligence</a>
          <a href="#" className="hover:text-white transition-colors">Journal</a>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors">
          Live Link
        </button>
      </nav>

      <main>
        {/* Core Identity */}
        <Hero />
        
        {/* Data Layer */}
        <Stats />

        {/* Real-time Tracking Layer */}
        <LiveTracker />
        
        {/* AI Layer — Intelligent Features */}
        <IntelligenceCenter />
        <AiChatbot />
        <GearAnalyzer />
        
        {/* Journey Storytelling */}
        <RouteTimeline />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
