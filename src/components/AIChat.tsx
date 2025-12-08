import React, { useState, useRef, useEffect } from 'react';
import { sendMessageStream } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: "Hi! I'm an AI assistant powered by Gemini. Ask me anything about my experience, skills, or projects!",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const modelMsgId = (Date.now() + 1).toString();
    
    // Add placeholder for model response
    setMessages(prev => [
      ...prev,
      { id: modelMsgId, role: 'model', text: '', timestamp: new Date() }
    ]);

    try {
      const stream = sendMessageStream(userMsg.text);
      let fullResponse = "";

      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === modelMsgId 
            ? { ...msg, text: fullResponse }
            : msg
        ));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] bg-secondary border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 transition-all duration-300 ease-in-out transform origin-bottom-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-robot text-white"></i>
              <h3 className="text-white font-semibold">AI Assistant</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-primary/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-accent text-primary rounded-br-none'
                      : 'bg-slate-700 text-slate-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && messages[messages.length - 1].role === 'user' && (
               <div className="flex justify-start">
                 <div className="bg-slate-700 text-slate-100 rounded-2xl rounded-bl-none p-3 text-sm">
                    <span className="animate-pulse">Thinking...</span>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-secondary border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about my skills..."
                className="flex-1 bg-slate-900 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent border border-slate-700 placeholder-slate-500"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-accent hover:bg-accent-hover text-primary rounded-full w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fa-solid fa-paper-plane text-sm"></i>
              </button>
            </div>
            <div className="text-[10px] text-slate-500 text-center mt-2">
              Powered by Gemini 2.5 Flash
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? 'scale-0' : 'scale-100'
        } transition-transform duration-300 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg shadow-indigo-500/30`}
        aria-label="Chat with AI"
      >
        <i className="fa-solid fa-sparkles text-xl animate-pulse"></i>
      </button>
    </div>
  );
};

export default AIChat;