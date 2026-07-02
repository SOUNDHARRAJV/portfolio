import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, RotateCcw } from 'lucide-react';

type BotReply =
  | { kind: 'text'; text: string }
  | { kind: 'section'; title: string; summary?: string; items: string[] };

interface Message {
  from: 'bot' | 'user';
  text?: string;
  reply?: BotReply;
}

interface ChatBotModalProps {
  darkMode: boolean;
}

// Simple keyword-matched Q&A so the bot gives real, accurate answers
// instead of "I don't understand" for everything.
const KNOWLEDGE_BASE: { keywords: string[]; response: BotReply | string }[] = [
  {
    keywords: ['skill', 'tech', 'stack', 'technolog', 'language', 'framework'],
    response: {
      kind: 'section',
      title: 'Skills',
      summary: 'Core stack and problem-solving strengths',
      items: [
        'React, TypeScript, Tailwind CSS',
        'Supabase, Firebase, and PostgreSQL',
        'Python and Java',
        '350+ LeetCode problems solved'
      ]
    }
  },
  {
    keywords: ['project', 'built', 'work', 'portfolio'],
    response: {
      kind: 'section',
      title: 'Projects',
      summary: 'Main work you can explore in the portfolio',
      items: [
        'CAMP - Centralised Approval Management Portal built with React, TypeScript, Supabase, and PostgreSQL',
        'SmartNotes - AI-assisted note sharing platform with Firebase',
        'SRK Farms - farm-to-home product listing and contact-based ordering site'
      ]
    }
  },
  {
    keywords: ['camp', 'approval'],
    response:
      'CAMP is a role-based change approval and workflow platform built with React, TypeScript, Supabase, and PostgreSQL with row-level security. It\'s his capstone project, deployed on Netlify.'
  },
  {
    keywords: ['smartnotes', 'smart notes', 'notes'],
    response:
      'SmartNotes is an AI-powered note sharing and summarization platform for students, built with React, TypeScript, and Firebase. Soundhar led the project team.'
  },
  {
    keywords: ['srk farm', 'farm'],
    response:
      "SRK Farms is Soundhar's family farm business, brought online as a responsive product-listing website with a contact-based ordering workflow."
  },
  {
    keywords: ['education', 'college', 'degree', 'study', 'university', 'cgpa'],
    response:
      "Soundhar is a final-year B.Tech Agricultural Engineering student (2023-2027) at Bannari Amman Institute of Technology, with a CGPA of 7.96."
  },
  {
    keywords: ['hackathon', 'competition', 'sih', 'yugam', 'codecraze', 'hacksagon'],
    response:
      "He's competed in YUGAM's Code2Duo Hackathon, CODECRAZE, Smart India Hackathon 2025, and Hacksagon 2026."
  },
  {
    keywords: ['contact', 'email', 'reach', 'hire', 'phone', 'number'],
    response: {
      kind: 'section',
      title: 'Contact',
      summary: 'Best ways to reach Soundhar',
      items: [
        'Email: soundharrajvellingiri@gmail.com',
        'Phone: +91 63808 31039',
        'Use the contact form on this page for a quick message'
      ]
    }
  },
  {
    keywords: ['leetcode', 'dsa', 'coding profile', 'hackerrank'],
    response:
      "He's solved 350+ problems on LeetCode focused on data structures and algorithms, and holds a 4-star C / 3-star Python rating on HackerRank."
  },
  {
    keywords: ['agri', 'agricultur', 'farm background', 'unique', 'different'],
    response:
      "Soundhar's Agricultural Engineering background combined with self-taught full-stack development gives him a rare AgriTech + software profile — few developers have hands-on farm operations experience to draw from."
  },
  {
    keywords: ['resume', 'cv'],
    response: 'You can download his CV using the "Download CV" button in the Hero section above.'
  },
  {
    keywords: ['hello', 'hi', 'hey'],
    response: "Hey! Ask me about Soundhar's skills, projects, education, or how to contact him."
  }
];

const BASE_FALLBACK_TEMPLATES = [
  'I can help with skills, projects, contact, education, and CV details. Which one should I open first?',
  'Try asking one clear prompt like: "show skills", "show projects", or "contact details".',
  'I can answer fast if you pick a topic: skills, projects, contact, education, or resume.',
  'I did not fully catch that. Ask in one line and I will format the answer clearly.'
];

const getTimeGreeting = (hour: number): string => {
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 22) return 'Good evening';
  return 'Working late';
};

const getFallbackReply = (input: string, conversationTurns: number): BotReply => {
  const trimmed = input.trim();
  const hour = new Date().getHours();
  const timeGreeting = getTimeGreeting(hour);
  const seed = trimmed.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const isGreeting = /^(hi|hello|hey|yo|hii+|helo)$/i.test(trimmed);
  const isVeryShort = trimmed.length > 0 && trimmed.length <= 4;
  const isLong = trimmed.length >= 90;

  if (isGreeting) {
    return {
      kind: 'text',
      text: `${timeGreeting}! I can help with skills, projects, contact info, education, or CV. Tell me a topic and I will format it clearly.`
    };
  }

  if (isVeryShort) {
    return {
      kind: 'text',
      text: 'Could you add a bit more detail? Example: "show projects" or "how to contact Soundhar".'
    };
  }

  if (isLong) {
    return {
      kind: 'text',
      text: 'Got a longer message. If you want a quick answer, ask one focused prompt like skills, projects, contact, education, or CV.'
    };
  }

  if (conversationTurns >= 6) {
    return {
      kind: 'text',
      text: 'We have covered a few messages already. Want a quick recap format: Skills, Projects, Contact, Education, and CV?'
    };
  }

  const template = BASE_FALLBACK_TEMPLATES[(seed + conversationTurns + hour) % BASE_FALLBACK_TEMPLATES.length];
  return { kind: 'text', text: template };
};

const normalizeReply = (response: BotReply | string): BotReply => {
  if (typeof response === 'string') {
    return { kind: 'text', text: response };
  }
  return response;
};

const getReply = (input: string, conversationTurns: number): BotReply => {
  const lower = input.toLowerCase();
  const match = KNOWLEDGE_BASE.find((entry) =>
    entry.keywords.some((keyword) => lower.includes(keyword))
  );
  return match ? normalizeReply(match.response) : getFallbackReply(input, conversationTurns);
};

const ChatBotModal: React.FC<ChatBotModalProps> = ({ darkMode }) => {
  const initialMessages: Message[] = [
    { from: 'bot', text: 'Hi! Ask me anything about Soundhar — his skills, projects, or how to reach him.' }
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const quickQuestions = [
    'What projects has he built?',
    'What tech stack does he use?',
    'How can I contact him?'
  ];

  const scheduleBotReply = (question: string, conversationTurns: number) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setIsTyping(true);
    timeoutRef.current = window.setTimeout(() => {
      const botMessage: Message = { from: 'bot', reply: getReply(question, conversationTurns) };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      timeoutRef.current = null;
    }, 2500);
  };

  const sendQuickQuestion = (question: string) => {
    const userMessage: Message = { from: 'user', text: question };
    const conversationTurns = messages.filter((msg) => msg.from === 'user').length + 1;
    setMessages((prev) => [...prev, userMessage]);
    scheduleBotReply(question, conversationTurns);
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleResetConversation = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setMessages(initialMessages);
    setInput('');
    setIsTyping(false);
  };

  const handleCloseChat = () => {
    handleResetConversation();
    setIsOpen(false);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = { from: 'user', text: input };
    const conversationTurns = messages.filter((msg) => msg.from === 'user').length + 1;

    setMessages((prev) => [...prev, userMessage]);
    scheduleBotReply(input, conversationTurns);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open chat about Soundhar"
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          darkMode
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/30'
            : 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-orange-500/30'
        }`}
      >
        <MessageCircle />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className={`pointer-events-auto fixed bottom-24 right-4 sm:right-6 w-[min(92vw,30rem)] h-[min(80vh,44rem)] overflow-hidden flex flex-col border backdrop-blur-2xl shadow-[0_24px_80px_rgba(15,23,42,0.28)] ${
            darkMode
              ? 'bg-slate-950/70 border-white/10 text-white rounded-[2.25rem] ring-1 ring-cyan-400/10'
              : 'bg-white/70 border-white/40 text-gray-900 rounded-[2.25rem] ring-1 ring-orange-400/10'
          }`}>
            <div className={`relative flex justify-between items-center px-5 py-4 border-b ${
              darkMode ? 'border-white/10 bg-white/5' : 'border-gray-200/70 bg-white/40'
            }`}>
              <div>
                <h2 className="text-lg font-semibold leading-none">Ask about Soundhar</h2>
                <p className={`text-xs mt-1 ${darkMode ? 'text-cyan-100/70' : 'text-gray-500'}`}>
                  Quick answers, no clutter
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetConversation}
                  aria-label="Reset conversation"
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? 'bg-white/10 text-white/80 hover:bg-white/15'
                      : 'bg-black/5 text-gray-600 hover:bg-black/10'
                  }`}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button onClick={handleCloseChat} aria-label="Close chat">
                  <X />
                </button>
              </div>
            </div>

            <div className={`flex flex-col flex-1 p-4 overflow-y-auto space-y-2 ${
              darkMode ? 'bg-transparent' : 'bg-transparent'
            }`}>
              {messages.map((msg, index) => (
                msg.from === 'bot' && msg.reply?.kind === 'section' ? (
                  <div
                    key={index}
                    className={`w-fit max-w-[92%] rounded-2xl border p-4 shadow-sm ${
                      darkMode
                        ? 'self-start bg-white/5 text-gray-100 border-white/10'
                        : 'self-start bg-black/5 text-gray-900 border-black/5'
                    }`}
                  >
                    <div className={`text-[11px] uppercase tracking-[0.22em] font-semibold mb-2 ${
                      darkMode ? 'text-cyan-300' : 'text-orange-600'
                    }`}>
                      {msg.reply.title}
                    </div>
                    {msg.reply.summary && (
                      <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {msg.reply.summary}
                      </p>
                    )}
                    <div className="space-y-2">
                      {msg.reply.items.map((item) => (
                        <div key={item} className="flex gap-2 text-sm leading-snug">
                          <span className={`mt-2 h-1.5 w-1.5 rounded-full flex-none ${
                            darkMode ? 'bg-cyan-300' : 'bg-orange-500'
                          }`} />
                          <span className={darkMode ? 'text-gray-100' : 'text-gray-800'}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  (() => {
                    const bubbleText = msg.text ?? (msg.reply?.kind === 'text' ? msg.reply.text : '');
                    return (
                  <div
                    key={index}
                    className={`inline-flex w-fit max-w-[85%] text-sm px-3 py-2 rounded-lg leading-snug whitespace-pre-wrap ${
                      msg.from === 'bot'
                        ? darkMode
                          ? 'self-start bg-white/5 text-gray-200 text-left border border-white/10'
                          : 'self-start bg-black/5 text-gray-800 text-left border border-black/5'
                        : darkMode
                          ? 'self-end ml-auto text-right border border-cyan-400/20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-50 shadow-[0_10px_24px_rgba(34,211,238,0.12)]'
                          : 'self-end ml-auto text-right border border-orange-300/25 bg-gradient-to-r from-orange-400/20 to-red-400/20 text-orange-900 shadow-[0_10px_24px_rgba(249,115,22,0.12)]'
                    }`}
                  >
                    {bubbleText}
                  </div>
                    );
                  })()
                )
              ))}
              {isTyping && (
                <div className={`inline-flex self-start items-center gap-1 px-3 py-2 rounded-full w-fit ${
                  darkMode ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/5'
                }`}>
                  <span className={`h-2 w-2 rounded-full animate-pulse ${darkMode ? 'bg-gray-200' : 'bg-gray-500'}`} />
                  <span className={`h-2 w-2 rounded-full animate-pulse ${darkMode ? 'bg-gray-300' : 'bg-gray-400'}`} style={{ animationDelay: '150ms' }} />
                  <span className={`h-2 w-2 rounded-full animate-pulse ${darkMode ? 'bg-gray-400' : 'bg-gray-300'}`} style={{ animationDelay: '300ms' }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className={`border-t p-3 ${darkMode ? 'border-white/10 bg-white/5' : 'border-gray-200/60 bg-white/35'}`}>
              {messages.length === 1 && !isTyping && (
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {quickQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => sendQuickQuestion(question)}
                      className={`rounded-full px-3 py-1.5 text-[11px] leading-none font-medium transition-all duration-300 hover:scale-[1.02] backdrop-blur-md ${
                        darkMode
                          ? 'bg-white/8 text-white/70 border border-white/10 hover:bg-white/12'
                          : 'bg-white/25 text-gray-600 border border-white/40 hover:bg-white/35'
                      }`}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}

              <div className={`flex items-center gap-2 rounded-[1.25rem] border p-2 ${
                darkMode ? 'border-white/10 bg-slate-950/35' : 'border-white/50 bg-white/50'
              }`}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask about skills, projects, contact..."
                  className={`flex-1 px-3 py-2.5 rounded-[1rem] focus:outline-none text-sm bg-transparent ${
                    darkMode ? 'text-white placeholder-white/35' : 'text-gray-900 placeholder-gray-400'
                  }`}
                />
                <button
                  onClick={sendMessage}
                  aria-label="Send message"
                  className={`flex h-11 w-11 items-center justify-center rounded-[1rem] text-white transition-all duration-300 hover:scale-105 ${
                    darkMode ? 'bg-white/15 hover:bg-white/20' : 'bg-black/10 hover:bg-black/15'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotModal;
