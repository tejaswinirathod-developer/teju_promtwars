import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw,
  MessageSquare
} from 'lucide-react';
import { DecisionInput, AnalysisResult, ChatMessage } from '../types';
import { askAssistantAPI } from '../services/apiClient';

interface ChatAssistantProps {
  decision: DecisionInput;
  analysis: AnalysisResult;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  decision,
  analysis,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: `Hello! I have completed your cognitive decision analysis for "${decision.title}". I am ready to help you pressure-test specific blind spots, design low-risk validation experiments for your assumptions, or draft discovery questions for key stakeholders. What would you like to explore deeper?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const samplePromptChips = [
    'Why is this considered a blind spot?',
    'What assumptions am I taking for granted?',
    'What specific questions should I ask before deciding?',
    'How do I test my primary assumption with low risk?',
    'What other perspectives should I consider?',
    'Can you explain the biggest downside risk?',
  ];

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const reply = await askAssistantAPI({
        decision,
        analysis,
        history: historyPayload,
        message: text,
      });

      const assistantMessage: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        role: 'assistant',
        content: 'I encountered an issue connecting to the AI decision service. Please verify your connection or try asking again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md flex flex-col h-[650px] overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-[#101426] via-[#1A1F3B] to-[#101426] text-white border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6C4CF1] to-[#39D5F6] flex items-center justify-center text-white shadow-md">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-white">ThinkWise Decision Partner</h3>
              <span className="text-[10px] font-semibold bg-[#39D5F6]/20 text-[#39D5F6] border border-[#39D5F6]/30 px-2 py-0.5 rounded-full">
                Context-Aware
              </span>
            </div>
            <p className="text-xs text-gray-300">
              Socratic inquiry exploring: <span className="font-semibold text-white truncate inline-block max-w-[220px] align-bottom">{decision.title}</span>
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-1.5 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Non-Directive Thinking Partner</span>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-4 py-2.5 bg-[#F6F7FC] border-b border-gray-200 overflow-x-auto flex items-center space-x-2 scrollbar-none">
        <span className="text-[11px] font-bold text-[#6C4CF1] uppercase tracking-wider shrink-0 flex items-center space-x-1">
          <Sparkles className="w-3 h-3" />
          <span>Inquire:</span>
        </span>
        {samplePromptChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(chip)}
            disabled={isLoading}
            className="text-xs text-gray-700 hover:text-[#6C4CF1] bg-white hover:bg-[#F0EDFF] border border-gray-200 hover:border-[#6C4CF1]/40 px-3 py-1 rounded-full whitespace-nowrap transition-colors shadow-2xs shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Messages Thread */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-white">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0 shadow-xs ${
                  isUser
                    ? 'bg-gradient-to-tr from-[#6C4CF1] to-[#9275FF] text-white'
                    : 'bg-[#101426] text-[#39D5F6]'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-2xs ${
                  isUser
                    ? 'bg-gradient-to-r from-[#6C4CF1] to-[#9275FF] text-white rounded-tr-xs'
                    : 'bg-[#F6F7FC] text-[#20243A] border border-gray-200 rounded-tl-xs'
                }`}
              >
                {m.content}
                <div
                  className={`text-[10px] mt-1.5 text-right ${
                    isUser ? 'text-white/70' : 'text-gray-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#101426] text-[#39D5F6] flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[#F0EDFF] border border-[#6C4CF1]/20 rounded-2xl rounded-tl-xs p-4 flex items-center space-x-2 text-xs text-[#6C4CF1]">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Synthesizing critical thinking guidance...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 sm:p-4 bg-white border-t border-gray-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything (e.g. 'What discovery questions should I ask in the interview?')..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]/20 focus:border-[#6C4CF1] transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`p-2.5 rounded-xl text-white transition-all shadow-xs ${
              !input.trim() || isLoading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#6C4CF1] to-[#39D5F6] hover:scale-105 active:scale-95'
            }`}
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-gray-500 text-center mt-2">
          ThinkWise AI acts as an objective thinking partner. It does not provide legal, academic, or financial guarantees.
        </p>
      </div>
    </div>
  );
};
