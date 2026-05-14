import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, 
  Check, 
  Terminal, 
  Layers, 
  Database, 
  Cpu, 
  Layout, 
  LineChart, 
  Globe, 
  Palette, 
  CloudIcon,
  ChevronRight,
  Code2
} from 'lucide-react';

interface PromptStep {
  phase: string;
  title: string;
  intent: string;
  content: string;
  icon: React.ReactNode;
}

const promptSteps: PromptStep[] = [
  {
    phase: "Phase 1: Foundation & Scaffolding",
    title: "Project Initialization",
    intent: "Set up the environment and base UI shell.",
    content: "Initialize a new Vite project using React and TypeScript. Use `pnpm` for all package management. Install Tailwind CSS and Lucide-React. Create a basic high-fidelity layout with a dark-themed sidebar on the left and a large main content area for a map. The UI should look like a premium SaaS dashboard (use 'Inter' font and slate/zinc colors).",
    icon: <Terminal className="text-blue-400" />
  },
  {
    phase: "Phase 1: Foundation & Scaffolding",
    title: "The Map Canvas (Leaflet)",
    intent: "Establish the spatial context.",
    content: "Install `leaflet` and `react-leaflet`. Implement a Map component in the main content area. Center the map on the Port of Savannah (approx. 32.12, -81.13). Ensure the map container takes up 100% of the available space. Add a professional map tile layer (e.g., CartoDB Dark Matter). Add a single static marker with a custom 'Cargo Ship' icon from Lucide-React at the center.",
    icon: <Globe className="text-indigo-400" />
  },
  {
    phase: "Phase 2: Data & Domain Logic",
    title: "Data Layer & Mock Generator",
    intent: "Create the vessel data structure without needing an immediate API key.",
    content: "Create a custom hook `useVesselData`. Define a TypeScript interface for a `Vessel` including: `id`, `name`, `status` (At Anchor, Moored, Underway), `arrival_timestamp`, `lat`, `lng`, and `units_carried` (default 500). Write a function to generate 15 mock vessels clustered around Savannah. Ensure 5 of these vessels have an `arrival_timestamp` greater than 24 hours ago and status 'At Anchor'.",
    icon: <Database className="text-emerald-400" />
  },
  {
    phase: "Phase 2: Data & Domain Logic",
    title: "The Exception Engine",
    intent: "Implement the core 'Domain School' logic.",
    content: "Update the Map component to render the mock vessels. Implement the 'Stagnation Logic': 1. If a vessel is 'At Anchor' for > 24 hours, its icon must be Red and Pulsing. 2. Otherwise, vessels should be Slate/Gray. Add a popup to each marker showing the ship's name and how long it has been stagnant.",
    icon: <Cpu className="text-rose-400" />
  },
  {
    phase: "Phase 3: The 'Impressive' UI Components",
    title: "The Exception Sidebar",
    intent: "Tactical list for the logistics manager.",
    content: "Build an 'Active Exceptions' list in the left sidebar. This list should automatically filter and show only the vessels flagged by the 24-hour logic. Each card in the list should display the ship name, the delay duration (e.g., '32h 15m'), and a 'Critical' badge. Use Framer Motion for smooth entry animations when vessels enter the exception state.",
    icon: <Layout className="text-blue-400" />
  },
  {
    phase: "Phase 3: The 'Impressive' UI Components",
    title: "The Financial Risk Widget",
    intent: "Monetize the data for executives.",
    content: "Create a 'Risk Impact' widget at the top of the sidebar. It should calculate: 1. Total Units at Risk: Sum of units on all 'Exception' vessels. 2. Daily Demurrage Estimate: (Total Units / 10) * $150. Style this as a high-contrast 'Glassmorphism' card with a subtle glow effect to highlight the financial importance.",
    icon: <Code2 className="text-amber-400" />
  },
  {
    phase: "Phase 4: Advanced Visualization & Polish",
    title: "Congestion Trend Chart",
    intent: "Historical context using Recharts.",
    content: "Install `recharts`. Create a small area chart component at the bottom of the sidebar showing a '7-Day Congestion Trend.' Use mock data to show the number of ships at anchor increasing over the week. The chart should use a primary accent color (e.g., Emerald or Sky Blue) with a soft gradient fill.",
    icon: <LineChart className="text-emerald-400" />
  },
  {
    phase: "Phase 4: Advanced Visualization & Polish",
    title: "API Integration (The 'Real' Step)",
    intent: "Switch from mock to live data.",
    content: "Refactor `useVesselData` to fetch live data from the OpenSeaMap API or MarineTraffic API (use an environment variable `VITE_MARINETRAFFIC_KEY`). If the API call fails or the key is missing, gracefully fall back to the mock data generator with a small notification toast saying 'Using Simulated Data'.",
    icon: <Layers className="text-indigo-400" />
  },
  {
    phase: "Phase 5: Final Polish & Deployment",
    title: "Apple-Style UX Polish",
    intent: "Make it look elite.",
    content: "Apply a final 'Ogilvy/Apple-style' design pass. Add a blur-effect (backdrop-filter) to the sidebar. Use 'Lucide-React' icons for navigation. Add a 'Control Center' button that toggles the 24-hour threshold (e.g., change it to 48 hours and see the map update in real-time). Ensure all numbers are formatted with commas and currency symbols.",
    icon: <Palette className="text-purple-400" />
  },
  {
    phase: "Phase 5: Final Polish & Deployment",
    title: "Deployment Prep",
    intent: "Finalize for GitHub Pages.",
    content: "Configure the project for GitHub Pages deployment. Ensure the `base` path in `vite.config.ts` matches the repository name. Add the `gh-pages` package and set up the 'deploy' scripts in `package.json` as per the Deployment Standards in the instructions.",
    icon: <CloudIcon className="text-sky-400" />
  }
];

const PromptsPage: React.FC = () => {
  return (
    <div className="relative bg-[#020617] text-slate-200 min-h-screen selection:bg-indigo-500/30">
      {/* Background Mesh */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,#1e1b4b_0%,transparent_50%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,#0f172a_0%,transparent_50%)]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-24">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
            Modular Build System
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-8">
            The <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Sentinel Blueprint</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            10 sequential prompts designed to build the Port Congestion Exception Tracker incrementally using "Vibe Coding" principles.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-12 relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-indigo-500/50 via-slate-800 to-indigo-500/50 hidden md:block"></div>

          {promptSteps.map((step, index) => (
            <PromptCard key={index} step={step} index={index + 1} />
          ))}
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-40 text-center"
        >
          <div className="p-12 bg-slate-900/50 border border-slate-800 rounded-[40px] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Deploy?</h2>
            <p className="text-slate-400 mb-10 max-w-xl mx-auto">
              Follow Phase 5 to finalize the production bundle and push your tracker to the live environment.
            </p>
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-900/20 flex items-center gap-2 mx-auto">
              Proceed to Deployment <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const PromptCard = ({ step, index }: { step: PromptStep, index: number }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(step.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative flex gap-8 group"
    >
      {/* Connector Dot */}
      <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-slate-900 border-2 border-slate-800 rounded-full flex items-center justify-center text-xs font-black text-slate-500 group-hover:border-indigo-500 group-hover:text-indigo-400 transition-all shadow-xl hidden md:flex">
        {index}
      </div>

      <div className="flex-1 bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 rounded-[32px] hover:border-slate-700 transition-all relative group/card">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity rounded-[32px]"></div>

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
             <div className="p-2.5 bg-slate-950 rounded-xl">
               {step.icon}
             </div>
             <div>
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">
                 {step.phase}
               </span>
               <h3 className="text-xl font-bold text-white tracking-tight">
                 {step.title}
               </h3>
             </div>
          </div>

          <div className="mb-8">
            <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-3">Intent</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-medium italic">
              "{step.intent}"
            </p>
          </div>

          <div className="relative group/code">
            <div className="absolute top-4 right-4 z-20">
              <button 
                onClick={handleCopy}
                className={`p-2 rounded-lg backdrop-blur-md transition-all ${
                  copied ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            
            <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800/50 font-mono text-sm leading-relaxed text-indigo-100 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/30"></div>
               {step.content}
            </div>
            
            <AnimatePresence>
              {copied && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-12 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl"
                >
                  COPIED TO CLIPBOARD
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PromptsPage;
