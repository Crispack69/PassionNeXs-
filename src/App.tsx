import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const niches = [
  'App Developer', 'Website Development', 'AI', 
  'Financial Education', 'Art', 'Music', 
  'Dance', 'Graphic Design', 'Video Editing'
];

const roles = ['Mentor', 'Student', 'Freelancer', 'Gig Provider'];

export default function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    role: 'Student',
    selectedNiches: ['App Developer'] as string[],
    callTime: '',
    whatsappTime: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNicheToggle = (niche: string) => {
    setFormData(prev => ({
      ...prev,
      selectedNiches: prev.selectedNiches.includes(niche)
        ? prev.selectedNiches.filter(n => n !== niche)
        : [...prev.selectedNiches, niche]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }
      
      setSubmitStatus('success');
      // Reset form on success
      setFormData({
        fullName: '',
        contactNumber: '',
        email: '',
        role: 'Student',
        selectedNiches: ['App Developer'],
        callTime: '',
        whatsappTime: ''
      });
    } catch (err: any) {
      console.error('Form submission error:', err);
      setSubmitStatus('error');
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-[1024px] mx-auto px-8 min-h-screen pt-4">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-mint-teal/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      {/* Header */}
      <header className="flex justify-between items-center py-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-3"
        >
          <svg width="90" height="48" viewBox="0 0 150 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 drop-shadow-md">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C59B27" />
                <stop offset="40%" stopColor="#F5DEB3" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
              <linearGradient id="silverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E5E5E5" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#A3A3A3" />
              </linearGradient>
            </defs>
            
            {/* Silver X Stroke */}
            <path d="M 85 15 L 110 15 L 135 75 L 110 75 Z" fill="url(#silverGrad)" />
            
            {/* Gold P */}
            <path d="M 20 15 L 60 15 C 80 15 88 23 88 38 C 88 53 80 61 60 61 L 42 61 L 42 75 C 38 74 34 74 20 75 Z M 42 32 L 42 45 L 55 45 C 64 45 68 43 68 38 C 68 33 64 32 55 32 Z" fill="url(#goldGrad)" />
            
            {/* Mint Arrow */}
            <path d="M 15 85 Q 90 75 125 20 L 112 20 L 140 2 L 140 32 L 128 22 Q 95 85 15 85 Z" fill="#5CE1E6" />
          </svg>
          <span className="font-sans font-bold tracking-tighter text-2xl uppercase leading-none mt-1">
            <span className="text-gradient-silver">PassionNe</span>
            <span className="text-gradient-gold">Xs</span>
          </span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border border-silver/40 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-silver"
        >
          [ Status: Early Access Only ]
        </motion.div>
      </header>

      <main className="flex-1 flex flex-col justify-between mb-6 pb-12 overflow-y-auto overflow-x-hidden no-scrollbar">
        {/* Hero Section */}
        <section className="mb-6 pt-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="massive-header text-5xl md:text-6xl uppercase mb-3"
          >
            The Algorithm <br className="hidden md:block" />
            <span className="text-gradient-gold">Won't Save You.</span><br />
            PassionNeXs Can.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-silver max-w-2xl text-sm leading-relaxed opacity-80"
          >
            The next evolution of the creator economy is dropping. We are building a private network designed exclusively for elite talent to grow and get paid. Space is strictly limited.
          </motion.p>
        </section>

        {/* Bento Grid - The Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:h-32 mb-6 mt-4">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="bento-card p-4 rounded-xl flex flex-col justify-center relative overflow-hidden"
          >
             <span className="text-[10px] text-mint-teal uppercase tracking-widest mb-1 font-bold">Step 01</span>
             <h3 className="font-black text-lg leading-none mb-2">SKILLS</h3>
             <p className="text-[10px] text-silver leading-tight relative text-balance">
                Refine the raw execution that the algorithm tries to suppress...
             </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bento-card p-4 rounded-xl flex flex-col justify-center relative overflow-hidden"
          >
             <span className="text-[10px] text-mint-teal uppercase tracking-widest mb-1 font-bold">Step 02</span>
             <h3 className="font-black text-lg leading-none mb-2">GROW</h3>
             <p className="text-[10px] text-silver leading-tight relative text-balance">
                ...to build a hyper-loyal community that belongs strictly to you...
             </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bento-card p-4 rounded-xl flex flex-col justify-center border-mint-teal/40 relative overflow-hidden"
          >
             <span className="text-[10px] text-mint-teal uppercase tracking-widest mb-1 font-bold">Step 03</span>
             <h3 className="font-black text-lg leading-none mb-2">EARN</h3>
             <p className="text-[10px] text-silver leading-tight relative text-balance">
                ...and convert that pure leverage into predictable, sovereign income.
             </p>
          </motion.div>
        </section>

        {/* Lead Capture Form Section */}
        <section className="bento-card mt-2 p-6 rounded-2xl relative">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 flex flex-col justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <input 
                  id="fullName"
                  type="text" 
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  className="form-input"
                  placeholder="Full Name"
                />
                <input 
                  id="contactNumber"
                  type="tel" 
                  required
                  value={formData.contactNumber}
                  onChange={e => setFormData({...formData, contactNumber: e.target.value})}
                  className="form-input"
                  placeholder="Contact Number"
                />
                <input 
                  id="email"
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="form-input"
                  placeholder="Email Address"
                />
              </div>

              <div className="mb-4">
                <label className="text-[10px] uppercase text-silver/60 block mb-2 font-medium">Role of Application</label>
                <div className="flex flex-wrap gap-2">
                  {roles.map((r, idx) => (
                    <label key={idx} className={`chip ${formData.role === r ? 'chip-active' : ''} inline-block`}>
                      <input 
                        type="radio" 
                        name="role" 
                        value={r}
                        required
                        className="hidden"
                        checked={formData.role === r}
                        onChange={() => setFormData({...formData, role: r})}
                      />
                      {r}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase text-silver/60 block font-medium mb-2">
                  Niche <span className="lowercase opacity-50 ml-1">(Select your core domains)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {niches.map((niche, idx) => (
                    <label key={idx} className={`chip ${formData.selectedNiches.includes(niche) ? 'chip-active' : ''} inline-block`}>
                      <input 
                        type="checkbox" 
                        className="hidden"
                        checked={formData.selectedNiches.includes(niche)}
                        onChange={() => handleNicheToggle(niche)}
                      />
                      {niche}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col justify-between h-full gap-4 md:gap-0">
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[10px] uppercase text-silver/60 block mb-1 font-medium">Preferred Call Time</label>
                  <input 
                    type="text" 
                    required
                    value={formData.callTime}
                    onChange={e => setFormData({...formData, callTime: e.target.value})}
                    className="form-input"
                    placeholder="Best time for voice? (10AM-7PM)"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-silver/60 block mb-1 font-medium">WhatsApp Availability</label>
                  <input 
                    type="text" 
                    required
                    value={formData.whatsappTime}
                    onChange={e => setFormData({...formData, whatsappTime: e.target.value})}
                    className="form-input"
                    placeholder="Best time for text? (10AM-10PM)"
                  />
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col gap-2">
                {submitStatus === 'error' && (
                  <div className="text-red-400 text-[10px] uppercase font-bold text-center bg-red-400/10 p-2 rounded border border-red-400/20">
                    {errorMessage}
                  </div>
                )}
                {submitStatus === 'success' ? (
                  <div className="w-full bg-green-500/20 text-green-400 border border-green-500/30 font-black uppercase py-4 rounded-lg tracking-tighter transition-all flex items-center justify-center gap-2">
                    Application Received!
                  </div>
                ) : (
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-mint-teal text-black font-black uppercase py-4 rounded-lg tracking-tighter hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Submitting..." : "Apply for Phase 1 Access"} {!isLoading && <ArrowRight className="w-4 h-4 ml-1" />}
                  </button>
                )}
              </div>
            </div>
          </form>
        </section>
      </main>

      <footer className="py-4 border-t border-white/5 flex justify-center mt-auto">
        <p className="text-[10px] text-silver/40 uppercase tracking-widest text-center">
          2026 PassionNeXs. Built for the Creator Economy. Privacy Guaranteed.
        </p>
      </footer>
    </div>
  );
}
