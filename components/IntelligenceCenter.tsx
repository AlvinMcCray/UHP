
import React, { useState } from 'react';
import { Search, Map as MapIcon, Link as LinkIcon, Loader2, CloudRain } from 'lucide-react';
import { getRouteIntelligence } from '../services/geminiService';
import { GroundingSource } from '../types';

const IntelligenceCenter: React.FC = () => {
  const [location, setLocation] = useState('Kansas City, MO');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{ text: string, sources: GroundingSource[] } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await getRouteIntelligence(location);
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tight">Route <span className="text-yellow-500">Intelligence</span></h2>
          <p className="text-neutral-400">
            Real-time environmental scanning. We cross-reference satellite data and regional reports to give you the most accurate trail status.
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12 flex gap-2">
          <input 
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city or trail name..."
            className="flex-1 bg-neutral-900 border border-neutral-800 px-6 py-4 rounded-sm focus:outline-none focus:border-yellow-500 text-white font-mono text-sm"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="bg-yellow-500 text-black px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-yellow-400 transition-all flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            Scan
          </button>
        </form>

        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-8 bg-neutral-900/50 border border-neutral-800 rounded-sm">
              <div className="flex items-center gap-2 mb-6 text-neutral-500">
                <CloudRain className="w-5 h-5" />
                <h3 className="font-mono text-xs uppercase tracking-widest">Intelligence Summary</h3>
              </div>
              <div className="text-neutral-300 leading-relaxed font-mono text-sm whitespace-pre-wrap">
                {data.text}
              </div>
            </div>

            <div className="p-8 bg-neutral-950 border border-neutral-800 rounded-sm">
              <h3 className="font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-yellow-500" />
                Verified Sources
              </h3>
              <div className="space-y-4">
                {data.sources.map((source, idx) => (
                  <a 
                    key={idx} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-4 bg-neutral-900 border border-neutral-800 hover:border-yellow-500 transition-colors group"
                  >
                    <p className="text-sm font-bold text-white mb-1 group-hover:text-yellow-500 transition-colors">{source.title}</p>
                    <p className="text-[10px] font-mono text-neutral-600 truncate">{source.uri}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default IntelligenceCenter;
