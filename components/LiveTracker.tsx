
import React, { useState, useEffect } from 'react';
import { Radio, Zap, Activity, Navigation, Satellite, Map as MapIcon, ShieldCheck } from 'lucide-react';
import { TelemetryData } from '../types';

const LiveTracker: React.FC = () => {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    heartRate: 145,
    speed: 28.4,
    power: 210,
    cadence: 88,
    latitude: 39.0997,
    longitude: -94.5786
  });

  const [lastSync, setLastSync] = useState<string>(new Date().toLocaleTimeString());

  // Simulate real-time data jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        heartRate: Math.floor(prev.heartRate + (Math.random() * 4 - 2)),
        speed: parseFloat((prev.speed + (Math.random() * 0.6 - 0.3)).toFixed(1)),
        power: Math.floor(prev.power + (Math.random() * 20 - 10)),
        cadence: Math.floor(prev.cadence + (Math.random() * 2 - 1)),
        latitude: prev.latitude + 0.0001,
        longitude: prev.longitude + 0.0001,
      }));
      setLastSync(new Date().toLocaleTimeString());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-neutral-950 border-b border-neutral-900 relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Side: Map Visualizer */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-500 p-2 rounded-sm">
                  <Navigation className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">Live <span className="text-yellow-500">Beacon</span></h2>
                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Connected via Strava Beacon API</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full">
                <Satellite className="w-3 h-3 text-green-500 animate-pulse" />
                <span className="text-[10px] font-mono text-green-500 uppercase font-bold tracking-widest">Signal Stable</span>
              </div>
            </div>

            <div className="aspect-video w-full bg-neutral-900 rounded-sm border border-neutral-800 relative overflow-hidden group">
              {/* Mock Map Background */}
              <div className="absolute inset-0 opacity-40 grayscale contrast-125">
                 <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop" 
                  alt="Topographic map" 
                  className="w-full h-full object-cover"
                 />
              </div>
              
              {/* Tactical Overlays */}
              <div className="absolute inset-0 bg-neutral-950/40" />
              <div className="absolute top-4 left-4 font-mono text-[10px] text-yellow-500/50 space-y-1">
                <p>LAT: {telemetry.latitude.toFixed(4)}</p>
                <p>LON: {telemetry.longitude.toFixed(4)}</p>
              </div>

              {/* Pulsing Location Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 w-8 h-8 bg-yellow-500 rounded-full animate-ping opacity-20" />
                  <div className="relative w-4 h-4 bg-yellow-500 rounded-full border-2 border-black shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
                </div>
              </div>

              <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="p-2 bg-black/80 border border-neutral-800 rounded-sm hover:bg-neutral-800 transition-colors">
                  <MapIcon className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              <span>Sat-Com ID: UHP-77-ALPHA</span>
              <span>Last Sync: {lastSync}</span>
            </div>
          </div>

          {/* Right Side: Telemetry HUD */}
          <div className="w-full lg:w-96 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500 mb-6 flex items-center gap-2">
              <Radio className="w-4 h-4" /> Telemetry Stream
            </h3>

            <TelemetryCard 
              icon={<Activity className="w-4 h-4" />} 
              label="Heart Rate" 
              value={telemetry.heartRate} 
              unit="BPM" 
              color="text-red-500"
            />
            <TelemetryCard 
              icon={<Zap className="w-4 h-4" />} 
              label="Power Output" 
              value={telemetry.power} 
              unit="Watts" 
              color="text-yellow-500"
            />
            <TelemetryCard 
              icon={<Navigation className="w-4 h-4" />} 
              label="Speed" 
              value={telemetry.speed} 
              unit="km/h" 
              color="text-blue-500"
            />
            <TelemetryCard 
              icon={<ShieldCheck className="w-4 h-4" />} 
              label="Cadence" 
              value={telemetry.cadence} 
              unit="RPM" 
              color="text-green-500"
            />

            <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-sm">
              <p className="text-[10px] font-mono text-yellow-500/70 leading-relaxed uppercase tracking-tight">
                Athlete is currently maintaining zone 2 endurance pace. Projected arrival at next waypoint: 14:45 UTC.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const TelemetryCard = ({ icon, label, value, unit, color }: { icon: React.ReactNode, label: string, value: string | number, unit: string, color: string }) => (
  <div className="bg-neutral-900 border border-neutral-800 p-4 flex items-center justify-between hover:border-neutral-700 transition-all group">
    <div className="flex items-center gap-4">
      <div className={`${color} opacity-50 group-hover:opacity-100 transition-opacity`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black font-mono leading-none mt-1">{value}</p>
      </div>
    </div>
    <span className="text-[10px] font-mono text-neutral-600 font-bold">{unit}</span>
  </div>
);

export default LiveTracker;
