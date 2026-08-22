import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Anchor, 
  BookOpen, 
  Database, 
  Users, 
  DollarSign, 
  Award, 
  Terminal, 
  Sparkles,
  Copy,
  Check,
  X,
  ChevronDown,
  Info,
  ShieldAlert
} from 'lucide-react';

interface AboutPageProps {
  onClose?: () => void;
}

// Data structures for educational sections

interface DomainConcept {
  term: string;
  definition: string;
  importance: string;
  devAction: string;
}

const domainConcepts: DomainConcept[] = [
  {
    term: "Inbound Logistics",
    definition: "The management of goods and materials coming into a business. This covers the 'in-take' phase from supplier shipping to warehouse arrival.",
    importance: "Inbound logistics is where lead time reliability is king. If inbound flows are delayed, production lines stall and customers face stockouts.",
    devAction: "Filter incoming telemetry data based on terminal destinations to track transit milestones."
  },
  {
    term: "Lead Time Variability",
    definition: "The difference between the promised delivery date and the actual delivery date. Consistency is more important than speed in supply chains.",
    importance: "High variability forces businesses to hold expensive safety stock. Reducing variance directly releases locked-up working capital.",
    devAction: "Calculate the mathematical variance of vessel arrivals against scheduled ETA windows."
  },
  {
    term: "AIS (Automatic Identification System)",
    definition: "A tracking system that uses transponders on ships to broadcast status, speed, course, and coordinates to other vessels and coastal stations.",
    importance: "AIS provides the raw GPS-like feed for maritime tracking. However, it can be messy, experiencing drops, latency, or spoofing.",
    devAction: "Ingest AIS webhooks and filter out duplicate coordinates and stale statuses."
  },
  {
    term: "Exception Management",
    definition: "An operational philosophy where managers only review data when it breaks a business rule (an 'exception'), rather than monitoring everything.",
    importance: "Instead of staring at 1,000 normal vessels, managers are alerted to only the 5 that are stuck. This multiplies team efficiency.",
    devAction: "Implement filters (e.g., status === 'At Anchor' && hours >= threshold) to isolate critical records."
  }
];

interface Stakeholder {
  role: string;
  title: string;
  avatar: string;
  kpi: string;
  painPoint: string;
  howTheyUse: string;
  benefit: string;
}

const stakeholders: Stakeholder[] = [
  {
    role: "coordinator",
    title: "Tactical Logistics Coordinator",
    avatar: "🎒",
    kpi: "On-Time Delivery (OTD) & Demurrage Fees",
    painPoint: "Stamps out fire drills when ships arrive late and trucks wait at empty ports.",
    howTheyUse: "Monitors the exception list daily. If a ship goes red, they immediately reschedule trucking partners and notify the warehouse.",
    benefit: "Avoids wait-time penalties ($150/hr per truck) and aligns warehouse crew schedules."
  },
  {
    role: "manager",
    title: "Port Operations Manager",
    avatar: "🏗️",
    kpi: "Berth Utilization & Tugboat Efficiency",
    painPoint: "Anchorage queues backing up, causing vessel collisions and labor bottlenecks.",
    howTheyUse: "Uses the spatial map and 7-day trend chart to coordinate tugboats and schedule crane crews before ships hit the dock.",
    benefit: "Maximizes terminal throughput and ensures crane crews aren't sitting idle."
  },
  {
    role: "director",
    title: "Supply Chain Director",
    avatar: "💼",
    kpi: "Total Cost to Serve & Safety Stock Levels",
    painPoint: "Paying $100k+ annually in Demurrage & Detention fees and holding buffer stock.",
    howTheyUse: "Reviews the Financial Risk Widget weekly to renegotiate shipping contracts and adjust inventory ordering frequencies.",
    benefit: "Leverages delay data to hold carriers accountable, reducing demurrage write-offs."
  }
];

interface PromptItem {
  number: string;
  phase: string;
  title: string;
  intent: string;
  content: string;
}

const promptsList: PromptItem[] = [
  {
    number: "1.1",
    phase: "Phase 1: Foundation & Scaffolding",
    title: "Project Initialization",
    intent: "Set up the environment and base UI shell.",
    content: "Initialize a new Vite project using React and TypeScript. Use `pnpm` for all package management. Install Tailwind CSS and Lucide-React. Create a basic high-fidelity layout with a dark-themed sidebar on the left and a large main content area for a map. The UI should look like a premium SaaS dashboard (use 'Inter' font and slate/zinc colors)."
  },
  {
    number: "1.2",
    phase: "Phase 1: Foundation & Scaffolding",
    title: "The Map Canvas (Leaflet)",
    intent: "Establish the spatial context.",
    content: "Install `leaflet` and `react-leaflet`. Implement a Map component in the main content area. Center the map on the Port of Savannah (approx. 32.12, -81.13). Ensure the map container takes up 100% of the available space. Add a professional map tile layer (e.g., CartoDB Dark Matter). Add a single static marker with a custom 'Cargo Ship' icon from Lucide-React at the center."
  },
  {
    number: "2.1",
    phase: "Phase 2: Data & Domain Logic",
    title: "Data Layer & Mock Generator",
    intent: "Create the vessel data structure without needing an immediate API key.",
    content: "Create a custom hook `useVesselData`. Define a TypeScript interface for a `Vessel` including: `id`, `name`, `status` (At Anchor, Moored, Underway), `arrival_timestamp`, `lat`, `lng`, and `units_carried` (default 500). Write a function to generate 15 mock vessels clustered around Savannah. Ensure 5 of these vessels have an `arrival_timestamp` greater than 24 hours ago and status 'At Anchor'."
  },
  {
    number: "2.2",
    phase: "Phase 2: Data & Domain Logic",
    title: "The Exception Engine",
    intent: "Implement the core 'Domain School' logic.",
    content: "Update the Map component to render the mock vessels. Implement the 'Stagnation Logic':\n1. If a vessel is 'At Anchor' for > 24 hours, its icon must be Red and Pulsing.\n2. Otherwise, vessels should be Slate/Gray.\nAdd a popup to each marker showing the ship's name and how long it has been stagnant."
  },
  {
    number: "3.1",
    phase: "Phase 3: The 'Impressive' UI Components",
    title: "The Exception Sidebar",
    intent: "Tactical list for the logistics manager.",
    content: "Build an 'Active Exceptions' list in the left sidebar. This list should automatically filter and show only the vessels flagged by the 24-hour logic. Each card in the list should display the ship name, the delay duration (e.g., '32h 15m'), and a 'Critical' badge. Use Framer Motion for smooth entry animations when vessels enter the exception state."
  },
  {
    number: "3.2",
    phase: "Phase 3: The 'Impressive' UI Components",
    title: "The Financial Risk Widget",
    intent: "Monetize the data for executives.",
    content: "Create a 'Risk Impact' widget at the top of the sidebar. It should calculate:\n1. Total Units at Risk: Sum of units on all 'Exception' vessels.\n2. Daily Demurrage Estimate: (Total Units / 10) * $150.\nStyle this as a high-contrast 'Glassmorphism' card with a subtle glow effect to highlight the financial importance."
  },
  {
    number: "4.1",
    phase: "Phase 4: Advanced Visualization & Polish",
    title: "Congestion Trend Chart",
    intent: "Historical context using Recharts.",
    content: "Install `recharts`. Create a small area chart component at the bottom of the sidebar showing a '7-Day Congestion Trend.' Use mock data to show the number of ships at anchor increasing over the week. The chart should use a primary accent color (e.g., Emerald or Sky Blue) with a soft gradient fill."
  },
  {
    number: "4.2",
    phase: "Phase 4: Advanced Visualization & Polish",
    title: "API Integration (The 'Real' Step)",
    intent: "Switch from mock to live data.",
    content: "Refactor `useVesselData` to fetch live data from the OpenSeaMap API or MarineTraffic API (use an environment variable `VITE_MARINETRAFFIC_KEY`). If the API call fails or the key is missing, gracefully fall back to the mock data generator with a small notification toast saying 'Using Simulated Data'."
  },
  {
    number: "5.1",
    phase: "Phase 5: Final Polish & Deployment",
    title: "Apple-Style UX Polish",
    intent: "Make it look elite.",
    content: "Apply a final 'Ogilvy/Apple-style' design pass. Add a blur-effect (backdrop-filter) to the sidebar. Use 'Lucide-React' icons for navigation. Add a 'Control Center' button that toggles the 24-hour threshold (e.g., change it to 48 hours and see the map update in real-time). Ensure all numbers are formatted with commas and currency symbols."
  },
  {
    number: "5.2",
    phase: "Phase 5: Final Polish & Deployment",
    title: "Deployment Prep",
    intent: "Finalize for GitHub Pages.",
    content: "Configure the project for GitHub Pages deployment. Ensure the `base` path in `vite.config.ts` matches the repository name. Add the `gh-pages` package and set up the 'deploy' scripts in `package.json` as per the Deployment Standards in the instructions."
  }
];

export const AboutPage: React.FC<AboutPageProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedPersona, setSelectedPersona] = useState<string>("coordinator");
  
  // Tab 5: ROI Calculator State
  const [numContainers, setNumContainers] = useState<number>(120);
  const [avgDelayDays, setAvgDelayDays] = useState<number>(4);
  const [demurrageRate, setDemurrageRate] = useState<number>(150);

  // Tab 6: Resume Copy State
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Tab 7: Prompts Expand & Copy State
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>("1.1");
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Tab 8: Voting State
  const [votes, setVotes] = useState<Record<string, number>>({
    ml: 42,
    alerts: 78,
    erp: 29,
    geofence: 51
  });
  const [voted, setVoted] = useState<Record<string, boolean>>({});

  const handleVote = (key: string) => {
    if (voted[key]) return;
    setVotes(prev => ({ ...prev, [key]: prev[key] + 1 }));
    setVoted(prev => ({ ...prev, [key]: true }));
  };

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyPrompt = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  // ROI calculations
  const totalMonthlyExposure = numContainers * avgDelayDays * demurrageRate;
  const savingsWithApp = totalMonthlyExposure * 0.8; // Assume 80% efficiency resolution
  const consultingInvestment = 95000;
  const paybackPeriodMonths = savingsWithApp > 0 ? (consultingInvestment / savingsWithApp).toFixed(1) : "0";

  const tabs = [
    { id: 0, label: "1. Problem & Core Concept", icon: <Anchor size={18} /> },
    { id: 1, label: "2. Required Domain Knowledge", icon: <BookOpen size={18} /> },
    { id: 2, label: "3. Data Pipeline & Architecture", icon: <Database size={18} /> },
    { id: 3, label: "4. Stakeholders & Personas", icon: <Users size={18} /> },
    { id: 4, label: "5. Commercial Valuations", icon: <DollarSign size={18} /> },
    { id: 5, label: "6. College & Resume Strategy", icon: <Award size={18} /> },
    { id: 6, label: "7. AI Vibe-Coding Prompts", icon: <Terminal size={18} /> },
    { id: 7, label: "8. Further Enhancements", icon: <Sparkles size={18} /> },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0b0f19] text-slate-100 overflow-hidden font-sans">
      {/* Top Banner Header */}
      <div className="bg-[#111827] border-b border-slate-800 px-8 py-5 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/20 p-2.5 rounded-xl border border-blue-500/30">
            <Anchor className="text-blue-400 w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white tracking-wide uppercase">
              Sentinel Learning Deck & Systems Architecture
            </h1>
            <p className="text-[10.5px] text-slate-400 font-medium tracking-wide">
              The Educational Blueprint & Domain Masterclass for Port Congestion Exception Tracking
            </p>
          </div>
        </div>
        
        {onClose && (
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700"
            title="Back to Dashboard"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Main Educational Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Interactive Nav Sidebar */}
        <aside className="w-80 bg-[#0d1323] border-r border-slate-800/80 p-5 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-2">
            <div className="px-3 mb-4">
              <span className="text-[10px] font-bold text-blue-500 tracking-[0.2em] uppercase">
                Learning Modules
              </span>
            </div>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 text-left border ${
                    isActive 
                      ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/10 font-semibold' 
                      : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border-transparent'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-slate-500'}>
                    {tab.icon}
                  </span>
                  <span className="text-xs tracking-wide">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Footer Info Box */}
          <div className="mt-8 p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80">
            <div className="flex items-center gap-2 mb-2">
              <Info size={14} className="text-blue-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Target Audience</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
              Designed for aspiring Software Engineers, Technical Product Managers, and Solution Architects looking to master domain-centric development.
            </p>
          </div>
        </aside>

        {/* Right Active Content Panel */}
        <main className="flex-1 bg-[#090d16] p-8 overflow-y-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              
              {/* TAB 1: PROBLEM & CORE CONCEPT */}
              {activeTab === 0 && (
                <div className="space-y-6">
                  <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full"></div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="p-1.5 bg-blue-500/15 rounded-lg text-blue-400">
                        <Anchor size={16} />
                      </span>
                      <h2 className="text-xl font-bold text-white">The Business Problem: Preventing Medication & Cargo Delays</h2>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      Vessels carrying raw materials, pharmaceutical supplies, and consumer products circle major ports for days. While GPS tracks ocean voyages, the final terminal queues act as a **black hole of logistics**. Managers find out their cargo is delayed only after it misses its unloading slot, triggering severe downstream disruptions.
                    </p>
                    
                    <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl flex gap-3 text-xs text-yellow-500/90 leading-relaxed">
                      <ShieldAlert size={18} className="shrink-0 text-yellow-500" />
                      <div>
                        <span className="font-semibold text-white block mb-0.5">Demurrage & Detention (D&D) Penalities</span>
                        If containers are left in terminal slots beyond their agreed free time (often 2-4 days), port operators levy daily penalty fees ranging from $150 to $500 per container. For 100 delayed containers, this creates an unpredicted cost leakage of $15,000+ daily.
                      </div>
                    </div>
                  </div>

                  {/* Interactive Problem Flowchart */}
                  <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Interactive Problem Flow</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                      
                      {/* Flow Step 1 */}
                      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 relative group hover:border-blue-500/30 transition-all">
                        <div className="text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-1">01. Arrival</div>
                        <h4 className="text-white font-bold text-xs mb-1.5">Vessel Enters Queue</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed">Cargo ship reaches the outer anchorage coordinates near Savannah.</p>
                      </div>

                      {/* Flow Step 2 */}
                      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 relative group hover:border-amber-500/30 transition-all">
                        <div className="text-amber-400 text-[10px] font-bold tracking-widest uppercase mb-1">02. Stagnation</div>
                        <h4 className="text-white font-bold text-xs mb-1.5">Stuck At Anchor</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed">Breaches the 24-hour limit without reaching the dock terminal.</p>
                      </div>

                      {/* Flow Step 3 */}
                      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 relative group hover:border-rose-500/30 transition-all">
                        <div className="text-rose-400 text-[10px] font-bold tracking-widest uppercase mb-1">03. Penalty</div>
                        <h4 className="text-white font-bold text-xs mb-1.5">Demurrage Accrual</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed">Carrier triggers contract penalties. Unpredicted costs leak rapidly.</p>
                      </div>

                      {/* Flow Step 4 */}
                      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 relative group hover:border-emerald-500/30 transition-all">
                        <div className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-1">04. Disruption</div>
                        <h4 className="text-white font-bold text-xs mb-1.5">Inland Supply Stall</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed">Warehouse stands empty, assembly lines stall, stockouts occur.</p>
                      </div>

                    </div>

                    <div className="mt-5 text-center">
                      <p className="text-[11px] text-slate-500 italic">
                        The Solution: Sentinel acts as a **"Smoke Detector"** to identify step 02 in real-time, preventing step 03 and 04 entirely.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: REQUIRED DOMAIN KNOWLEDGE */}
              {activeTab === 1 && (
                <div className="space-y-6">
                  <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="p-1.5 bg-indigo-500/15 rounded-lg text-indigo-400">
                        <BookOpen size={16} />
                      </span>
                      <h2 className="text-xl font-bold text-white">Required Domain Knowledge</h2>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      To successfully build logistics tracking software, developers must transcend syntax. They need a deep grasp of specific supply-chain concepts to translate telemetric data points into business value.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {domainConcepts.map((concept, index) => (
                      <div key={index} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/30 transition-all group">
                        <div className="flex justify-between items-center mb-2.5">
                          <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                            {concept.term}
                          </h3>
                          <span className="text-[8.5px] font-bold uppercase tracking-wider bg-slate-950 px-2 py-0.5 rounded text-indigo-400">
                            Core Term
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-3">
                          {concept.definition}
                        </p>
                        <div className="border-t border-slate-800/80 pt-3 space-y-2">
                          <div>
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Business Value</span>
                            <p className="text-[10px] text-slate-400 leading-relaxed font-medium">{concept.importance}</p>
                          </div>
                          <div className="bg-indigo-950/20 rounded-lg p-2 border border-indigo-900/20">
                            <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest block mb-0.5">Developer Action</span>
                            <p className="text-[10.5px] text-slate-300 font-mono">{concept.devAction}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: DATA PIPELINE & ARCHITECTURE */}
              {activeTab === 2 && (
                <div className="space-y-6">
                  <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="p-1.5 bg-emerald-500/15 rounded-lg text-emerald-400">
                        <Database size={16} />
                      </span>
                      <h2 className="text-xl font-bold text-white">System Architecture & Data Flow</h2>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Sentinel processes ship coordinates from transponders, compares them to operational constraints, and displays warnings dynamically.
                    </p>
                  </div>

                  {/* Architecture Diagram */}
                  <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Pipeline Data Flow</h3>
                    
                    <div className="space-y-6 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                      
                      {/* Step 1 */}
                      <div className="flex items-start gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shrink-0 text-slate-400 font-black text-xs">
                          1
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex-1">
                          <h4 className="text-white text-xs font-bold mb-1">AIS Telemetry Streams (Ingestion)</h4>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Simulated transponder coordinates, status flags, and arrival times from OpenSeaMap/MarineTraffic are converted into standard JSON objects.
                          </p>
                          <span className="inline-block mt-2 font-mono text-[9px] text-blue-400 bg-blue-950/30 px-2 py-0.5 rounded border border-blue-900/30">
                            Telemetry Schema: id | name | lat | lng | status | arrival_timestamp
                          </span>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="flex items-start gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-blue-600 flex items-center justify-center shrink-0 text-blue-400 font-black text-xs shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                          2
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex-1">
                          <h4 className="text-white text-xs font-bold mb-1">Exception Engine Calculation (Evaluation)</h4>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            A dynamic evaluation hook computes how long each ship has been stagnant:
                            <code className="block mt-1.5 p-2 bg-slate-950 rounded font-mono text-[10px] text-emerald-400 leading-relaxed border border-slate-800">
                              stagnantHours = (CurrentTime - ArrivalTime) / 3.6e6;<br/>
                              isException = VesselStatus === 'At Anchor' && stagnantHours &gt;= UserThreshold;
                            </code>
                          </p>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="flex items-start gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shrink-0 text-slate-400 font-black text-xs">
                          3
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex-1">
                          <h4 className="text-white text-xs font-bold mb-1">Visual Layer Presentation (Rendering)</h4>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Interactive Leaflet components overlay coordinate clusters, rendering critical vessels with red pulsing radar markers. Concurrently, Recharts graphs show the 7-day trend.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: STAKEHOLDERS & PERSONAS */}
              {activeTab === 3 && (
                <div className="space-y-6">
                  <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="p-1.5 bg-blue-500/15 rounded-lg text-blue-400">
                        <Users size={16} />
                      </span>
                      <h2 className="text-xl font-bold text-white">Stakeholders & Personas</h2>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Supply chain software interacts with multiple layers of enterprise roles. Selecting a stakeholder below demonstrates how the app solves their operational goals.
                    </p>
                  </div>

                  {/* Interactive Stakeholder Tabs */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
                    {stakeholders.map((s) => (
                      <button
                        key={s.role}
                        onClick={() => setSelectedPersona(s.role)}
                        className={`py-2 px-3 rounded-lg text-xs font-bold tracking-wide transition-all ${
                          selectedPersona === s.role 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/40'
                        }`}
                      >
                        {s.role === 'coordinator' && "Logistics Coordinator"}
                        {s.role === 'manager' && "Port Manager"}
                        {s.role === 'director' && "Supply Chain VP"}
                      </button>
                    ))}
                  </div>

                  {/* Active Stakeholder Card */}
                  <AnimatePresence mode="wait">
                    {stakeholders.filter(s => s.role === selectedPersona).map((s) => (
                      <motion.div
                        key={s.role}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-4xl">{s.avatar}</span>
                          <div>
                            <h3 className="text-base font-bold text-white leading-tight">{s.title}</h3>
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mt-0.5">
                              Primary KPI: {s.kpi}
                            </span>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 border-t border-slate-800/80 pt-4">
                          <div>
                            <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Operational Pain Point</span>
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">{s.painPoint}</p>
                          </div>
                          <div>
                            <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Application Usage Pattern</span>
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">{s.howTheyUse}</p>
                          </div>
                        </div>

                        <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-3 flex items-start gap-2.5">
                          <span className="text-emerald-400 font-bold text-xs bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/30">
                            ROI Impact
                          </span>
                          <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                            {s.benefit}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* TAB 5: COMMERCIAL VALUATIONS */}
              {activeTab === 4 && (
                <div className="space-y-6">
                  <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="p-1.5 bg-blue-500/15 rounded-lg text-blue-400">
                        <DollarSign size={16} />
                      </span>
                      <h2 className="text-xl font-bold text-white">Commercial Valuations</h2>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      If an external consulting company designed, built, and deployed this custom application for an enterprise client, here is a realistic commercial project breakdown.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Project Budget Cards */}
                    <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-5 space-y-4">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Consulting Budget Breakdown</h3>
                      
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">Discovery & Architecture (2 wks)</span>
                          <span className="font-mono text-white font-bold">$15,000</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">UI/UX & Map Dashboard (4 wks)</span>
                          <span className="font-mono text-white font-bold">$35,000</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">API Integration & Alerting Engine (3 wks)</span>
                          <span className="font-mono text-white font-bold">$25,000</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">Quality Assurance & Load Testing (2 wks)</span>
                          <span className="font-mono text-white font-bold">$12,000</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">CI/CD & Cloud Deployment (1 wk)</span>
                          <span className="font-mono text-white font-bold">$8,000</span>
                        </div>
                        
                        <div className="border-t border-slate-800 pt-2.5 flex justify-between items-center">
                          <span className="text-xs font-bold text-white">Estimated Total Cost</span>
                          <span className="font-mono text-blue-400 font-extrabold text-sm">$95,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-slate-500 uppercase font-bold">Project Timeline</span>
                          <span className="text-[10px] text-slate-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            12 Weeks
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive ROI Calculator */}
                    <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Interactive ROI Simulator</h3>
                        
                        <div className="space-y-3.5">
                          {/* Slider 1 */}
                          <div>
                            <div className="flex justify-between text-[11px] mb-1 font-semibold">
                              <span className="text-slate-400">Stagnant Containers/Mo</span>
                              <span className="text-white font-mono">{numContainers}</span>
                            </div>
                            <input 
                              type="range" 
                              min="10" 
                              max="500" 
                              step="10"
                              value={numContainers}
                              onChange={(e) => setNumContainers(Number(e.target.value))}
                              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                          </div>

                          {/* Slider 2 */}
                          <div>
                            <div className="flex justify-between text-[11px] mb-1 font-semibold">
                              <span className="text-slate-400">Avg. Delay Duration (Days)</span>
                              <span className="text-white font-mono">{avgDelayDays} Days</span>
                            </div>
                            <input 
                              type="range" 
                              min="1" 
                              max="10" 
                              step="1"
                              value={avgDelayDays}
                              onChange={(e) => setAvgDelayDays(Number(e.target.value))}
                              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                          </div>

                          {/* Slider 3 */}
                          <div>
                            <div className="flex justify-between text-[11px] mb-1 font-semibold">
                              <span className="text-slate-400">Demurrage Rate/Day ($)</span>
                              <span className="text-white font-mono">${demurrageRate}</span>
                            </div>
                            <input 
                              type="range" 
                              min="50" 
                              max="500" 
                              step="25"
                              value={demurrageRate}
                              onChange={(e) => setDemurrageRate(Number(e.target.value))}
                              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Calculations Panel */}
                      <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 space-y-2 mt-4">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500">
                          <span>Monthly Penalty Exposure:</span>
                          <span className="font-mono text-slate-400">${totalMonthlyExposure.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[10.5px] font-bold text-slate-300">
                          <span>Estimated Prevented Loss (80%):</span>
                          <span className="font-mono text-emerald-400">${savingsWithApp.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-slate-850 pt-1.5 flex justify-between items-center text-xs">
                          <span className="font-bold text-white">Investment Payback Period:</span>
                          <span className="font-mono font-extrabold text-blue-400">{paybackPeriodMonths} Months</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: COLLEGE & RESUME STRATEGY */}
              {activeTab === 5 && (
                <div className="space-y-6">
                  <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="p-1.5 bg-blue-500/15 rounded-lg text-blue-400">
                        <Award size={16} />
                      </span>
                      <h2 className="text-xl font-bold text-white">College Application & Resume Strategy</h2>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      To stand out, do not present this as a generic 'React Map API' project. Elevate your positioning by framing it around real-world domain value, telemetry parsing, and exception management algorithms.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Copyable Professional Resume Bullet Points</h3>
                    
                    <div className="space-y-3">
                      {[
                        "Engineered a real-time maritime tracking dashboard parsing simulated AIS transponder coordinates to eliminate lead time visibility gaps for inbound terminal cargo.",
                        "Designed a modular React exception engine that calculates stagnation hours dynamically and alerts logistics coordinators to vessel delays breaching contractual 24h thresholds.",
                        "Built a dynamic financial risk calculation component that quantifies demurrage exposure in real-time, translating raw telemetric coordinates into actionable cash flow analytics."
                      ].map((bullet, idx) => {
                        const isCopied = copiedIndex === idx;
                        return (
                          <div 
                            key={idx} 
                            className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between gap-4 group hover:border-blue-500/25 transition-all"
                          >
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">
                              {bullet}
                            </p>
                            <button
                              onClick={() => handleCopyText(bullet, idx)}
                              className={`p-2.5 rounded-lg shrink-0 border transition-all ${
                                isCopied 
                                  ? 'bg-emerald-500 border-emerald-400 text-white' 
                                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'
                              }`}
                              title="Copy bullet point"
                            >
                              {isCopied ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: AI VIBE-CODING PROMPTS */}
              {activeTab === 6 && (
                <div className="space-y-6">
                  <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="p-1.5 bg-blue-500/15 rounded-lg text-blue-400">
                        <Terminal size={16} />
                      </span>
                      <h2 className="text-xl font-bold text-white">AI Vibe-Coding Prompt Runway</h2>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Review the sequential prompts used to construct this application incrementally. Tap any prompt to expand and copy the exact instructions.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {promptsList.map((prompt) => {
                      const isExpanded = expandedPrompt === prompt.number;
                      const isCopied = copiedPromptId === prompt.number;
                      return (
                        <div 
                          key={prompt.number} 
                          className="bg-slate-900/30 border border-slate-800/60 rounded-xl overflow-hidden transition-all hover:border-slate-700"
                        >
                          {/* Header toggle */}
                          <div 
                            onClick={() => setExpandedPrompt(isExpanded ? null : prompt.number)}
                            className="p-4 flex items-center justify-between cursor-pointer select-none bg-slate-900/50 hover:bg-slate-900 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-[10.5px] font-mono font-bold text-blue-400 bg-blue-950/40 border border-blue-900/40 px-2.5 py-0.5 rounded">
                                Prompt {prompt.number}
                              </span>
                              <h3 className="text-xs font-bold text-white">{prompt.title}</h3>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500">
                              <span className="text-[10px] text-slate-400 font-semibold">{prompt.phase}</span>
                              <ChevronDown size={16} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                          </div>

                          {/* Expandable Content Area */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden border-t border-slate-850"
                              >
                                <div className="p-4 bg-slate-950/80 space-y-3 font-mono text-[11px] leading-relaxed text-slate-300">
                                  <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                                    <div>
                                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">Intent</span>
                                      <span className="text-[10.5px] text-indigo-300 italic">"{prompt.intent}"</span>
                                    </div>
                                    <button
                                      onClick={() => handleCopyPrompt(prompt.content, prompt.number)}
                                      className={`p-2 rounded-lg transition-all flex items-center gap-1.5 font-sans font-bold text-[9.5px] tracking-wide ${
                                        isCopied 
                                          ? 'bg-emerald-500 text-white' 
                                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                                      }`}
                                    >
                                      {isCopied ? (
                                        <>
                                          <Check size={11} />
                                          Copied!
                                        </>
                                      ) : (
                                        <>
                                          <Copy size={11} />
                                          Copy Prompt
                                        </>
                                      )}
                                    </button>
                                  </div>
                                  <pre className="whitespace-pre-wrap font-mono bg-slate-950 p-3 rounded-lg border border-slate-900 text-blue-100 max-h-60 overflow-y-auto">
                                    {prompt.content}
                                  </pre>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 8: FURTHER ENHANCEMENTS */}
              {activeTab === 7 && (
                <div className="space-y-6">
                  <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="p-1.5 bg-blue-500/15 rounded-lg text-blue-400">
                        <Sparkles size={16} />
                      </span>
                      <h2 className="text-xl font-bold text-white">Further Enhancements</h2>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      While the exception tracker handles real-time alerts effectively, enterprise operations demand deeper automation. Review these roadmap concepts and cast your vote on priorities.
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    {/* ML Predictive */}
                    <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between gap-6 hover:border-blue-500/25 transition-all">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-white">01. ML-Based Delay & Queue Forecasting</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                          Build a predictive model analyzing historical port anchorage times, weather data, and crew scheduling to forecast congestion risks 14 days before vessel arrival.
                        </p>
                      </div>
                      <button
                        onClick={() => handleVote('ml')}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 border transition-all shrink-0 ${
                          voted['ml'] 
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 cursor-default' 
                            : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500'
                        }`}
                      >
                        {votes.ml} Upvotes {voted['ml'] && '✓'}
                      </button>
                    </div>

                    {/* Alerts webhook */}
                    <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between gap-6 hover:border-blue-500/25 transition-all">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-white">02. Automated SMS & Slack Exception Webhooks</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                          Push automated alerts containing demurrage exposure data directly to dispatchers via Slack channels and SMS hooks the minute a vessel enters the exception state.
                        </p>
                      </div>
                      <button
                        onClick={() => handleVote('alerts')}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 border transition-all shrink-0 ${
                          voted['alerts'] 
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 cursor-default' 
                            : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500'
                        }`}
                      >
                        {votes.alerts} Upvotes {voted['alerts'] && '✓'}
                      </button>
                    </div>

                    {/* ERP Integration */}
                    <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between gap-6 hover:border-blue-500/25 transition-all">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-white">03. ERP Integration (SAP & Oracle GTM)</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                          Synchronize demurrage logs and shipping containers with enterprise systems of record to handle bills of lading and dispatch scheduling paperlessly.
                        </p>
                      </div>
                      <button
                        onClick={() => handleVote('erp')}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 border transition-all shrink-0 ${
                          voted['erp'] 
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 cursor-default' 
                            : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500'
                        }`}
                      >
                        {votes.erp} Upvotes {voted['erp'] && '✓'}
                      </button>
                    </div>

                    {/* Geofence Map */}
                    <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between gap-6 hover:border-blue-500/25 transition-all">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-white">04. Custom Polygon Geofencing Maps</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                          Give administrators the ability to draw custom polygon boundaries around marine port layouts directly on the map, dynamically defining custom exception areas.
                        </p>
                      </div>
                      <button
                        onClick={() => handleVote('geofence')}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 border transition-all shrink-0 ${
                          voted['geofence'] 
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 cursor-default' 
                            : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500'
                        }`}
                      >
                        {votes.geofence} Upvotes {voted['geofence'] && '✓'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AboutPage;
