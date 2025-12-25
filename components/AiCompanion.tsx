
import React, { useState, useRef, useCallback } from 'react';
import { Mic, MicOff, Waves, Volume2, Info } from 'lucide-react';
import { GoogleGenAI, Modality, LiveServerMessage, Blob } from '@google/genai';

const AiCompanion: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking'>('idle');
  const [transcription, setTranscription] = useState<string>('');

  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

  // Helper functions for base64 encoding/decoding as required by SDK rules
  const encode = (bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  };

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const createBlob = (data: Float32Array): Blob => {
    const int16 = new Int16Array(data.length);
    for (let i = 0; i < data.length; i++) int16[i] = data[i] * 32768;
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  };

  const startSession = async () => {
    try {
      setStatus('connecting');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: 'You are the mission navigator for "Under Human Power". You help endurance cyclists with route planning, mental motivation, and gear advice. Keep responses concise, direct, and supportive.',
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
            setStatus('listening');
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => prev + ' ' + message.serverContent?.outputTranscription?.text);
            }

            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              setStatus('speaking');
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputCtx.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setStatus('listening');
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => console.error('Gemini Live Error:', e),
          onclose: () => {
            setStatus('idle');
            setIsActive(false);
          },
        }
      });

      sessionRef.current = await sessionPromise;
      setIsActive(true);
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  const stopSession = () => {
    if (sessionRef.current) sessionRef.current.close();
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    setIsActive(false);
    setStatus('idle');
  };

  return (
    <section className="py-24 bg-neutral-900/30 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-yellow-500 mb-4 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
              <Volume2 className="w-4 h-4" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">Expedition Voice Command</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-tight">
              Speak to the <span className="text-neutral-500">Navigator</span>
            </h2>
            <p className="text-neutral-400 text-lg mb-8 max-w-lg leading-relaxed">
              Connect with our live AI companion for real-time navigation updates, mental coaching, and survival guidance while you're deep in the field.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-neutral-950 border border-neutral-800 rounded-sm">
                <Info className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                <p className="text-sm text-neutral-400">
                  Powered by <span className="text-white font-bold">Gemini 2.5 Flash Native Audio</span>. This interface provides sub-second latency voice interactions.
                </p>
              </div>
            </div>
          </div>

          <div className="relative aspect-square max-w-md mx-auto w-full flex flex-col items-center justify-center p-8 bg-neutral-950 border border-neutral-800 rounded-sm overflow-hidden group">
            {/* Visualizer Background */}
            <div className={`absolute inset-0 opacity-20 flex items-center justify-center transition-all duration-700 ${isActive ? 'scale-100' : 'scale-75'}`}>
              <Waves className={`w-full h-full text-yellow-500 ${status === 'speaking' ? 'animate-pulse' : ''}`} />
            </div>

            <div className="relative z-10 text-center flex flex-col items-center">
               <button 
                onClick={isActive ? stopSession : startSession}
                className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-red-500 text-white animate-pulse' : 'bg-yellow-500 text-black hover:scale-105'}`}
               >
                {isActive ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
               </button>
               
               <div className="mt-8">
                  <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">STATUS: {status.toUpperCase()}</p>
                  <p className="text-lg font-bold">
                    {status === 'idle' && 'Click to initiate uplink'}
                    {status === 'connecting' && 'Establishing satellite link...'}
                    {status === 'listening' && 'Listening for command...'}
                    {status === 'speaking' && 'Navigator transmitting...'}
                  </p>
               </div>
            </div>

            {/* Live Transcription Box */}
            {transcription && (
               <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/80 border border-neutral-800 backdrop-blur-md rounded-sm">
                  <p className="text-xs font-mono text-neutral-500 uppercase mb-1">Transcription Output</p>
                  <p className="text-sm text-white line-clamp-2">{transcription}</p>
               </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiCompanion;
