import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Trash2, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';
import { askAIChatbot } from '../../services/ai';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const { chatHistory, addChatMessage, clearChat, issData, newsArticles } = useStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatHistory, isOpen, isTyping]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    addChatMessage({ role: 'user', content: userMsg, timestamp: new Date().toISOString() });
    setIsTyping(true);

    try {
      // Build context string
      const issContext = issData 
        ? `ISS Location: Lat ${issData.lat.toFixed(2)}, Lon ${issData.lon.toFixed(2)}, Speed ${Math.round(issData.speed)} km/h over ${issData.locationName}.` 
        : 'ISS Location data currently unavailable.';
      
      const newsContext = newsArticles.length > 0
        ? `Latest News Headlines: ${newsArticles.slice(0, 3).map(a => a.title).join(' | ')}`
        : 'News data currently unavailable.';

      const contextStr = `${issContext}\n${newsContext}`;

      const aiResponse = await askAIChatbot(userMsg, contextStr);
      addChatMessage({ role: 'assistant', content: aiResponse, timestamp: new Date().toISOString() });
    } catch (error) {
      addChatMessage({ role: 'assistant', content: 'System error: Unable to process request. Please check API configuration or connection.', error: true, timestamp: new Date().toISOString() });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 p-4 bg-brand-600 hover:bg-brand-500 text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] z-50 flex items-center justify-center transition-colors"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] max-h-[80vh] glass dark:glass-dark border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-black/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-cyan-400 flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white leading-tight">OrbitIQ AI</h3>
                  <p className="text-[10px] text-green-500 font-medium">● Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {chatHistory.length > 0 && (
                  <button onClick={clearChat} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-slate-500" title="Clear Chat">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50/50 dark:bg-black/10">
              {chatHistory.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-60">
                  <Bot className="w-12 h-12 text-brand-500" />
                  <p className="text-sm text-slate-600 dark:text-slate-300 px-4">
                    Hello! I'm OrbitIQ. I can answer questions about the ISS location, speed, astronauts, or summarize the latest tech news.
                  </p>
                </div>
              ) : (
                chatHistory.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-200 dark:bg-slate-700' : 'bg-brand-500 text-white'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-slate-600 dark:text-slate-300" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-brand-500 text-white rounded-br-none' : msg.error ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-bl-none border border-red-200 dark:border-red-800' : 'glass dark:glass-dark text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-800'}`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))
              )}
              {isTyping && (
                <div className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center shrink-0 text-white">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="glass dark:glass-dark rounded-2xl rounded-bl-none border border-slate-200 dark:border-slate-800 p-3 py-4 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white/80 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 backdrop-blur-md">
              <form onSubmit={handleSend} className="flex items-center gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about ISS or News..."
                  disabled={isTyping}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-brand-500 outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-1.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                >
                  {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
