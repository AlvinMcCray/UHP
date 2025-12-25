
import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal, User, Bot, Loader2, RefreshCw } from 'lucide-react';
import { createExpeditionChat } from '../services/geminiService';
import { Chat, GenerateContentResponse } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AiChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Mission Intelligence Unit online. How can I assist with your expedition queries today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatRef.current) {
      chatRef.current = createExpeditionChat();
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const responseStream = await chatRef.current.sendMessageStream({ message: userMessage });
      let fullResponse = '';
      
      // Add a placeholder for the model's message
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of responseStream) {
        const textChunk = (chunk as GenerateContentResponse).text;
        if (textChunk) {
          fullResponse += textChunk;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'model', text: fullResponse };
            return updated;
          });
        }
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, { role: 'model', text: 'Error: Connection lost. Please refresh mission data.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    chatRef.current = createExpeditionChat();
    setMessages([{ role: 'model', text: 'System reset. Mission Intelligence Unit standby.' }]);
  };

  return (
    <section className="py-24 bg-neutral-900/30 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 text-yellow-500 mb-4 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
              <Terminal className="w-4 h-4" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">Mission Control Interface</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-tight">
              Expedition <span className="text-neutral-500">Intelligence</span>
            </h2>
            <p className="text-neutral-400 text-lg mb-8 max-w-lg leading-relaxed">
              Query the system for route specifics, weather patterns, gear logistics, or mission progress. Access the full data archive through our AI interface.
            </p>

            <div className="space-y-4">
              <button 
                onClick={resetChat}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-yellow-500 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reset System State
              </button>
            </div>
          </div>

          <div className="w-full flex flex-col bg-neutral-950 border border-neutral-800 rounded-sm h-[500px] shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-neutral-900 px-4 py-3 border-b border-neutral-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">UHP_INTELLIGENCE_NODE_01</span>
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm scrollbar-thin scrollbar-thumb-neutral-800">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0 border border-neutral-700">
                      <Bot className="w-4 h-4 text-yellow-500" />
                    </div>
                  )}
                  <div className={`max-w-[80%] p-3 rounded-sm ${
                    msg.role === 'user' 
                      ? 'bg-yellow-500 text-black font-bold ml-8' 
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-300'
                  }`}>
                    {msg.text || (isLoading && i === messages.length - 1 ? <Loader2 className="w-4 h-4 animate-spin" /> : '')}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0 border border-neutral-700">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-neutral-900/50 border-t border-neutral-800 flex gap-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Request mission update..."
                className="flex-1 bg-neutral-950 border border-neutral-800 px-4 py-2 rounded-sm text-sm font-mono focus:outline-none focus:border-yellow-500 transition-colors"
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-yellow-500 text-black p-2 rounded-sm hover:bg-yellow-400 transition-colors disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiChatbot;
