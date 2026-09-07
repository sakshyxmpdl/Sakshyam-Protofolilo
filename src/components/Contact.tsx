import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, CheckCircle2, MapPin, Github, Sparkles, MessageSquare, User, Bot, Loader2 } from 'lucide-react';
import { UserProfile } from '../types';

interface ContactProps {
  profile: UserProfile;
}


const playChatSound = (type: 'send' | 'receive') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    if (type === 'send') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    }
  } catch (e) {
    // Ignore error
  }
};

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);




  const [activeTab, setActiveTab] = useState<'email' | 'chat'>('chat');
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Array<{
    id: string;
    sender: 'user' | 'sakshyam' | 'system';
    text: string;
    time: string;
    tag?: string;
  }>>([
    {
      id: 'msg-1',
      sender: 'system',
      text: 'Sakshyam Support AI connected. Ask me anything about my work, projects, or commissions!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: 'msg-2',
      sender: 'sakshyam',
      text: 'Hey there! 👋 I am the AI version of Sakshyam. How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tag: 'Sakshyam Support AI'
    }
  ]);

const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'chat') {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isTyping, activeTab]);

  const handleSendMessage = (e?: React.FormEvent, directText?: string) => {
    if (e) e.preventDefault();
    const text = directText || chatInput.trim();
    if (!text) return;

    const userMsgId = `msg-${Date.now()}`;
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        sender: 'user',
        text: text,
        time: timeString
      }
    ]);
    setChatInput('');
    setIsTyping(true);
    playChatSound('send');

    const responseDelay = Math.min(1800, Math.max(900, text.length * 30));

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    })
    .then(res => res.json())
    .then(data => {
      setTimeout(() => {
        setIsTyping(false);
        playChatSound('receive');
        const sakshyamReply = data.reply || "I am currently unavailable, please contact me directly via Discord or Email.";
        setMessages((prev) => [
          ...prev,
          {
            id: `reply-${Date.now()}`,
            sender: 'sakshyam',
            text: sakshyamReply,
            time: timeString,
            tag: 'Sakshyam Support AI'
          }
        ]);
      }, responseDelay);
    })
    .catch(err => {
      console.error(err);
      setTimeout(() => {
        setIsTyping(false);
        playChatSound('receive');
        setMessages((prev) => [
          ...prev,
          {
            id: `reply-${Date.now()}`,
            sender: 'sakshyam',
            text: "I am having trouble connecting right now, please try again or send an email.",
            time: timeString,
            tag: 'System Error'
          }
        ]);
      }, 1000);
    });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(
      `[Portfolio Contact] ${formData.subject}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success banner after 5s
      setTimeout(() => setSuccess(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200/80 dark:border-zinc-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-200 dark:border-indigo-800/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            Have a project in mind, a consulting inquiry, or want to discuss full-time roles? Drop me a message!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Left Info Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Contact Information
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                I'm currently available for engineering leadership roles and selective Minecraft / Discord automation consulting. Feel free to reach out via email or connect on social networks.
              </p>

              <div className="space-y-4 pt-4">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs hover:border-indigo-500 transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">Email Address</span>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{profile.email}</p>
                  </div>
                </motion.a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">Location</span>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{profile.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 block">
                Social Profiles
              </span>
              <div className="flex items-center gap-3">
                <motion.a
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 shadow-xs transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href={profile.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 shadow-xs transition-colors"
                  aria-label="Discord Profile: Sakshyxm"
                  title="Discord: Sakshyxm"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.011c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </motion.a>
              </div>
            </div>

          </motion.div>

          {/* Right Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-3xl p-8 sm:p-10 border border-zinc-200/80 dark:border-zinc-800 shadow-xl relative shimmer-container"
          >
            
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-x-0 -top-16 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-lg"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 animate-bounce" />
                <span className="text-sm font-semibold">Message sent successfully! I'll get back to you within 24 hours.</span>
              </motion.div>
            )}

            
            {/* Tabs */}
            <div className="flex items-center gap-2 mb-8 bg-zinc-100 dark:bg-zinc-800/50 p-1.5 rounded-2xl">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'chat' ? 'bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
              >
                <Bot className="w-4 h-4" />
                Sakshyam Support AI
              </button>
              <button
                onClick={() => setActiveTab('email')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'email' ? 'bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
              >
                <Mail className="w-4 h-4" />
                Send an Email
              </button>
            </div>

            {activeTab === 'chat' ? (
              <div className="flex flex-col h-[400px]">
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-3 text-sm ${
                        msg.sender === 'system'
                          ? 'bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700/40 text-zinc-500 dark:text-zinc-400 text-center justify-center'
                          : ''
                      }`}
                    >
                      {msg.sender === 'sakshyam' && (
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center shrink-0 mt-1 border border-indigo-200 dark:border-indigo-700/50">
                          <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                      )}
                      
                      {msg.sender !== 'system' && (
                        <div className={`flex-1 ${msg.sender === 'user' ? 'flex justify-end' : ''}`}>
                          <div className={`inline-block max-w-[85%] ${
                            msg.sender === 'user'
                              ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-md shadow-indigo-600/10'
                              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-2xl rounded-tl-sm px-4 py-2.5'
                          }`}>
                            {msg.sender === 'sakshyam' && msg.tag && (
                              <div className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 mb-1 tracking-wider uppercase">
                                {msg.tag}
                              </div>
                            )}
                            <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                            <span className={`text-[10px] mt-1.5 block ${
                              msg.sender === 'user' ? 'text-indigo-200 text-right' : 'text-zinc-400 dark:text-zinc-500'
                            }`}>
                              {msg.time}
                            </span>
                          </div>
                        </div>
                      )}

                      {msg.sender === 'system' && (
                        <p className="text-xs">{msg.text}</p>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center shrink-0 mt-1 border border-indigo-200 dark:border-indigo-700/50">
                        <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 w-16 h-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="relative mt-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all shadow-sm"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || isTyping}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-all shadow-md"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (

<form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="Project Collaboration / Full-Time Role"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project or role requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

            </form>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
};
