
import React, { useState } from 'react';
import { Camera, Search, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { analyzeGear } from '../services/geminiService';

const GearAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
      setAnalysis(null);
    }
  };

  const handleAnalyze = async () => {
    if (!preview || !file) return;
    setIsLoading(true);
    try {
      const base64Data = preview.split(',')[1];
      const result = await analyzeGear(base64Data, file.type);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setAnalysis("Analysis failed. Please check your network connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="flex-1">
            <h2 className="text-4xl font-black uppercase mb-6 tracking-tight">AI Gear <span className="text-yellow-500">Inspection</span></h2>
            <p className="text-neutral-400 mb-8 max-w-lg">
              Upload a photograph of your bike, rack setup, or kit. Our AI expert will scan for potential mechanical failures and reliability optimizations.
            </p>

            <div className="space-y-6">
              <div className="relative group">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                />
                <div className="w-full h-48 border-2 border-dashed border-neutral-800 flex flex-col items-center justify-center rounded-sm group-hover:border-yellow-500 transition-colors bg-neutral-900/20">
                  <Camera className="w-10 h-10 text-neutral-600 mb-4 group-hover:text-yellow-500 transition-colors" />
                  <p className="text-sm font-mono uppercase tracking-widest text-neutral-500">
                    {file ? file.name : "Click or drop photo here"}
                  </p>
                </div>
              </div>

              {preview && (
                <button 
                  onClick={handleAnalyze}
                  disabled={isLoading}
                  className="w-full py-4 bg-yellow-500 text-black font-bold uppercase tracking-widest rounded-sm hover:bg-yellow-400 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                  {isLoading ? "Analyzing..." : "Run Inspection"}
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 min-h-[400px]">
             {isLoading ? (
               <div className="h-full bg-neutral-900/50 border border-neutral-800 rounded-sm flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 text-yellow-500 animate-spin mx-auto mb-4" />
                    <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">Scanning mechanical subsystems...</p>
                  </div>
               </div>
             ) : analysis ? (
               <div className="h-full bg-neutral-900/50 border border-neutral-800 rounded-sm p-8 overflow-y-auto">
                  <div className="flex items-center gap-2 mb-6 text-yellow-500">
                    <CheckCircle2 className="w-6 h-6" />
                    <h3 className="font-bold uppercase tracking-widest">Inspection Report</h3>
                  </div>
                  <div className="prose prose-invert prose-sm max-w-none text-neutral-300 whitespace-pre-wrap font-mono leading-relaxed">
                    {analysis}
                  </div>
               </div>
             ) : (
               <div className="h-full bg-neutral-900/5 border border-neutral-800 border-dashed rounded-sm flex items-center justify-center">
                  <p className="text-neutral-600 font-mono text-xs uppercase tracking-widest">Awaiting sensor data...</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GearAnalyzer;
