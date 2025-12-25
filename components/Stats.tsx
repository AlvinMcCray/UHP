
import React from 'react';
import { Bike, Mountain, Activity, Wind } from 'lucide-react';

const Stats: React.FC = () => {
  return (
    <section className="py-24 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 md:flex justify-between items-end">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">
            Mission <span className="text-yellow-500">Metrics</span>
          </h2>
          <p className="text-neutral-500 mt-4 md:mt-0 font-mono text-sm">
            LAST UPDATED: 2 HOURS AGO
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Bike />} label="TOTAL DISTANCE" value="4,280" unit="km" />
          <StatCard icon={<Mountain />} label="ELEVATION GAIN" value="52" unit="k meters" />
          <StatCard icon={<Activity />} label="CALORIES BURNED" value="120" unit="k" />
          <StatCard icon={<Wind />} label="DAYS ON ROAD" value="42" unit="days" />
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, label, value, unit }: { icon: React.ReactNode, label: string, value: string, unit: string }) => (
  <div className="p-8 bg-neutral-900/50 border border-neutral-800 hover:border-yellow-500/50 transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <div className="text-neutral-600 group-hover:text-yellow-500 transition-colors scale-125">
        {icon}
      </div>
      <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">{label}</span>
    </div>
    <p className="text-5xl font-black tracking-tighter">{value}<span className="text-xl text-neutral-600 ml-1">{unit}</span></p>
  </div>
);

export default Stats;
