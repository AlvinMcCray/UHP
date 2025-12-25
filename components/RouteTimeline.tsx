
import React from 'react';
import { MapPin } from 'lucide-react';

const RouteTimeline: React.FC = () => {
  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden border-b border-neutral-900">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neutral-900 to-transparent opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6">The Journey</h2>
          <p className="text-neutral-400">
            A continuous line connecting the Atlantic to the Pacific, dissected into four distinct stages of endurance.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-800 md:-translate-x-1/2"></div>

          <div className="space-y-16">
            {/* Stage 1 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
              <div className="md:w-[45%] md:text-right order-2 md:order-1 pl-12 md:pl-0 md:pr-12">
                <h3 className="text-2xl font-bold text-white mb-2">The Urban Exit</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Navigating the dense grid of the eastern seaboard. High traffic, intricate navigation, and the psychological shift from comfort to exposure.
                </p>
              </div>
              <div className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full bg-neutral-950 border-4 border-yellow-500 z-10 md:-translate-x-1/2 flex items-center justify-center order-1">
                 <MapPin className="w-4 h-4 text-white" />
              </div>
              <div className="md:w-[45%] order-3 pl-12 md:pl-12">
                <span className="font-mono text-yellow-500 text-xs tracking-widest uppercase">Stage 01 — Completed</span>
                <div className="h-40 w-full mt-4 bg-neutral-900 rounded-sm overflow-hidden border border-neutral-800">
                  <img src="https://images.unsplash.com/photo-1496147539180-13929f8aa03a?q=80&w=2070&auto=format&fit=crop" alt="City streets" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"/>
                </div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
               <div className="md:w-[45%] order-2 md:order-3 pl-12 md:pl-12">
                <h3 className="text-2xl font-bold text-white mb-2">The Great Plains</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Battling the headwinds of the interior. A test of mental fortitude against the infinite horizon and unrelenting isolation.
                </p>
              </div>
              <div className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full bg-neutral-950 border-4 border-neutral-700 z-10 md:-translate-x-1/2 flex items-center justify-center order-1">
                 <span className="w-2 h-2 bg-neutral-500 rounded-full"></span>
              </div>
              <div className="md:w-[45%] md:text-right order-3 md:order-1 pl-12 md:pl-0 md:pr-12">
                 <span className="font-mono text-neutral-500 text-xs tracking-widest uppercase">Stage 02 — In Progress</span>
                 <div className="h-40 w-full mt-4 bg-neutral-900 rounded-sm overflow-hidden border border-neutral-800 ml-auto">
                  <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" alt="Desert road" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"/>
                </div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
              <div className="md:w-[45%] md:text-right order-2 md:order-1 pl-12 md:pl-0 md:pr-12">
                <h3 className="text-2xl font-bold text-white mb-2">The Ascent</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  The Rockies. Vertical gain becomes the new metric. Thin air, snow squalls, and the physical peak of the expedition.
                </p>
              </div>
              <div className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full bg-neutral-950 border-4 border-neutral-800 z-10 md:-translate-x-1/2 flex items-center justify-center order-1">
                 <span className="w-2 h-2 bg-neutral-700 rounded-full"></span>
              </div>
              <div className="md:w-[45%] order-3 pl-12 md:pl-12">
                <span className="font-mono text-neutral-600 text-xs tracking-widest uppercase">Stage 03 — Pending</span>
                <div className="h-40 w-full mt-4 bg-neutral-900 rounded-sm overflow-hidden border border-neutral-800">
                  <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" alt="Mountain peaks" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RouteTimeline;
