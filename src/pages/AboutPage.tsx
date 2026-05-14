import React, { useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { 
  ArrowDown, 
  ShieldCheck, 
  Zap, 
  Globe, 
  LineChart, 
  Cpu, 
  Anchor, 
  ChevronRight,
  TrendingDown,
  Award
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative bg-[#020617] text-slate-200 overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200">
      {/* Background Mesh/Particle Field */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,transparent_50%)]"></div>
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-8"
          >
            Project Sentinel // Global Logistics
          </motion.span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            The <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 animate-gradient-x">Smoke Detector</span> <br />
            for Global Supply Chains.
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Eliminating the "Black Hole" of port congestion with real-time AIS intelligence and tactical financial risk mapping.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-white text-slate-950 font-bold rounded-full overflow-hidden transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore the Project <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </motion.button>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 text-slate-500 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll to Discover</span>
          <ArrowDown size={16} />
        </motion.div>
      </section>

      {/* Pain Point Section */}
      <section className="relative py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white leading-tight">
              The "Black Hole" of the <br />
              <span className="text-blue-500">Last Mile.</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              While GPS tracks ships across oceans, the final miles are where money vanishes. 
              Delays trigger massive **Demurrage & Detention (D&D)** fees, and the "Bullwhip Effect" turns a 24-hour port delay into a two-week warehouse crisis.
            </p>
            
            <div className="space-y-4">
              <PainPointItem 
                icon={<ShieldCheck className="text-emerald-400" />} 
                label="Visibility Gap" 
                desc="Managers don't know a ship is delayed until it misses its window." 
              />
              <PainPointItem 
                icon={<TrendingDown className="text-rose-400" />} 
                label="Financial Leakage" 
                desc="Unpredicted penalties costing $100k+ annually." 
              />
            </div>
          </motion.div>

          <InteractivePainCard />
        </div>
      </section>

      {/* Bento Grid (Secret Sauce) */}
      <section className="relative py-32 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-3xl font-bold text-white mb-4">The Industry Secret Sauce</h2>
          <p className="text-slate-400 uppercase text-[10px] tracking-[0.3em] font-bold">Domain Knowledge Masterclass</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <BentoItem 
            className="md:col-span-2"
            icon={<Globe className="text-blue-400" />}
            title="AIS Integration"
            desc="The 'Global GPS' for ships. Every commercial vessel broadcasts its position, speed, and status."
            stat="Global Coverage"
          />
          <BentoItem 
            icon={<Zap className="text-amber-400" />}
            title="Exception Management"
            desc="Only looking at data when it breaks a rule. Track 1,000 ships, focus on the 5 that are stuck."
            stat="80/20 Rule"
          />
          <BentoItem 
            icon={<LineChart className="text-emerald-400" />}
            title="Inbound Logistics"
            desc="Management of goods coming INTO a business. Where lead time reliability is king."
            stat="Predictive"
          />
          <BentoItem 
            className="md:col-span-2"
            icon={<Cpu className="text-indigo-400" />}
            title="Lead Time Variability"
            desc="Success in supply chain isn't about speed; it's about consistency. Sentinel stabilizes the delta."
            stat="Zero Variance"
          />
        </div>
      </section>

      {/* Comparison Section */}
      <section className="relative py-32 px-6 max-w-5xl mx-auto overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">The Builder’s Blueprint</h2>
          <p className="text-slate-400 italic font-medium">Build vs. Buy Strategy</p>
        </div>
        <ComparisonSlider />
      </section>

      {/* Learning Path (Roadmap) */}
      <section className="relative py-32 px-6 max-w-4xl mx-auto">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent hidden md:block"></div>
        
        <div className="space-y-32">
          <RoadmapStep 
            index={1} 
            title="Coding for Value" 
            desc="You aren't just fetching JSON; you are calculating financial risk." 
            align="left"
          />
          <RoadmapStep 
            index={2} 
            title="The 'Aha!' Moment" 
            desc="Seeing a ship icon turn red and realizing it represents a multi-million dollar bottleneck." 
            align="right"
          />
          <RoadmapStep 
            index={3} 
            title="Real Problem Solving" 
            desc="Transitioning from building 'To-Do Lists' to building 'Profit Protectors'." 
            align="left"
          />
        </div>
      </section>

      {/* Footer / Conversion Zone */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden group">
          {/* Animated Glowing Border */}
          <div className="absolute inset-0 border-2 border-blue-400/0 group-hover:border-blue-400/50 transition-all duration-700 rounded-[40px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <Award className="text-blue-400 w-16 h-16 mx-auto mb-8 animate-bounce-slow" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Master the Domain.</h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              When you understand the business logic, the code becomes your secondary tool; <br />
              <span className="text-white font-bold italic">your primary tool becomes your judgment.</span>
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl shadow-[0_0_50px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] transition-all flex items-center gap-3 mx-auto group"
            >
              Join the Domain School Masterclass
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Sub-components

const PainPointItem = ({ icon, label, desc }: { icon: React.ReactNode, label: string, desc: string }) => (
  <div className="flex gap-4 p-4 rounded-2xl hover:bg-slate-900/50 transition-colors border border-transparent hover:border-slate-800">
    <div className="p-2 bg-slate-900 rounded-xl h-fit">
      {icon}
    </div>
    <div>
      <h4 className="text-white font-bold mb-1">{label}</h4>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const InteractivePainCard = () => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative aspect-square bg-slate-900 rounded-[40px] border border-slate-800 overflow-hidden group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-rose-500/5"></div>
      
      {/* Radar Effect */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
         <div className="w-[80%] h-[80%] border border-slate-700 rounded-full animate-ping-slow"></div>
         <div className="absolute w-[60%] h-[60%] border border-slate-700 rounded-full"></div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center transition-all duration-500 transform group-hover:scale-105">
        <div className={`p-6 rounded-3xl mb-8 transition-all duration-500 ${hovered ? 'bg-rose-500/20 text-rose-500 scale-110 shadow-[0_0_40px_rgba(244,63,94,0.3)]' : 'bg-blue-500/10 text-blue-500'}`}>
          <Anchor size={48} className={hovered ? 'animate-pulse' : ''} />
        </div>
        <h3 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${hovered ? 'text-rose-400' : 'text-white'}`}>
          {hovered ? 'CRITICAL LEAK DETECTED' : 'Normal Port Operations'}
        </h3>
        <p className="text-slate-400 leading-relaxed font-medium">
          {hovered ? 'Demurrage costs mounting: $2,500 / hour. Supply chain bullwhip initiated.' : 'Status: Normal. 24 vessels underway. No exceptions in the last 12 hours.'}
        </p>
        
        {hovered && (
          <div className="mt-8 px-6 py-2 bg-rose-500 text-white rounded-full text-xs font-black tracking-widest animate-bounce">
            PROFIT LOSS: $42,500
          </div>
        )}
      </div>
    </div>
  );
};

const BentoItem = ({ icon, title, desc, stat, className = "" }: { icon: React.ReactNode, title: string, desc: string, stat: string, className?: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`bg-slate-900/50 border border-slate-800 p-8 rounded-[32px] text-left group hover:border-blue-500/30 transition-all ${className}`}
  >
    <div className="p-3 bg-slate-900 rounded-2xl w-fit mb-6 group-hover:scale-110 group-hover:bg-blue-500/10 transition-all">
      {icon}
    </div>
    <div className="flex justify-between items-start mb-4">
      <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{title}</h4>
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-950 px-2 py-1 rounded">{stat}</span>
    </div>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const ComparisonSlider = () => {
  const [active, setActive] = React.useState<'mvp' | 'enterprise'>('mvp');

  return (
    <div className="space-y-12">
      <div className="flex justify-center">
        <div className="bg-slate-900 p-1 rounded-2xl border border-slate-800 flex gap-1">
          <button 
            onClick={() => setActive('mvp')}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${active === 'mvp' ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' : 'text-slate-500 hover:text-slate-300'}`}
          >
            The Vibe-Coded MVP
          </button>
          <button 
            onClick={() => setActive('enterprise')}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${active === 'enterprise' ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Enterprise Standards
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <CompareCard label="Primary Goal" mvp="Instant situational awareness" enterprise="End-to-end automation" active={active} />
        <CompareCard label="Prediction" mvp="Post-24h stasis alerts" enterprise="ML-driven 2-week forecasting" active={active} />
        <CompareCard label="Cost" mvp="Near-zero (API only)" enterprise="$100k+ Annual Licensing" active={active} />
      </div>
    </div>
  );
};

const CompareCard = ({ label, mvp, enterprise, active }: { label: string, mvp: string, enterprise: string, active: 'mvp' | 'enterprise' }) => (
  <div className="bg-slate-950/50 border border-slate-900 p-8 rounded-3xl relative overflow-hidden group">
    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-20"></div>
    <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">{label}</h5>
    <div className="min-h-[60px] flex items-center">
      <AnimatePresence mode="wait">
        <motion.p 
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-lg font-semibold text-white leading-tight"
        >
          {active === 'mvp' ? mvp : enterprise}
        </motion.p>
      </AnimatePresence>
    </div>
  </div>
);

const RoadmapStep = ({ index, title, desc, align }: { index: number, title: string, desc: string, align: 'left' | 'right' }) => (
  <motion.div 
    initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className={`relative flex items-center gap-12 ${align === 'right' ? 'flex-row-reverse' : ''}`}
  >
    <div className={`flex-1 ${align === 'right' ? 'text-left' : 'text-right'}`}>
      <div className={`inline-block px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4`}>
        Step 0{index}
      </div>
      <h4 className="text-3xl font-bold text-white mb-4 leading-tight">{title}</h4>
      <p className="text-slate-400 leading-relaxed text-lg">{desc}</p>
    </div>

    <div className="relative z-10 flex flex-col items-center justify-center w-12 h-12 bg-blue-600 rounded-full border-4 border-[#020617] shadow-[0_0_20px_rgba(37,99,235,0.4)]">
      <span className="text-white font-black text-sm">{index}</span>
    </div>

    <div className="flex-1"></div>
  </motion.div>
);

export default AboutPage;
