import React from 'react';
import { 
  Anchor, 
  LayoutDashboard, 
  Settings, 
  ShieldCheck,
  Activity,
  Terminal
} from 'lucide-react';
import MaritimeMap from './components/MaritimeMap';
import { useVesselData } from './hooks/useVesselData';
import { getStagnantDuration } from './utils/dateUtils';
import RiskWidget from './components/RiskWidget';
import ExceptionList from './components/ExceptionList';
import CongestionChart from './components/CongestionChart';
import AboutPage from './pages/AboutPage';
import PromptsPage from './pages/PromptsPage';

function App() {
  const { vessels, loading } = useVesselData();
  const [threshold, setThreshold] = React.useState(24);
  const [view, setView] = React.useState<'dashboard' | 'about' | 'prompts'>('dashboard');

  const exceptions = vessels.filter(v => {
    const { hours } = getStagnantDuration(v.arrival_timestamp);
    return v.status === 'At Anchor' && hours >= threshold;
  });
  return (
    <div className="flex h-screen w-screen bg-[#0f172a] text-slate-200 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-900/20">
              <Anchor className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-white leading-none">SENTINEL</h1>
              <span className="text-blue-500 text-[9px] font-bold tracking-[0.2em] uppercase">Maritime AI</span>
            </div>
          </div>
          <button 
            onClick={() => setThreshold(threshold === 24 ? 48 : 24)}
            className={`p-2 rounded-lg border transition-all ${
              threshold === 48 ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Toggle Threshold"
          >
            <Settings size={16} />
          </button>
        </div>

        {/* View Switcher Navigation */}
        <nav className="px-4 py-2 space-y-1 mb-4">
          <NavItem 
            icon={<LayoutDashboard size={18} />} 
            label="Live Dashboard" 
            active={view === 'dashboard'} 
            onClick={() => setView('dashboard')}
          />
          <NavItem 
            icon={<ShieldCheck size={18} />} 
            label="About Project" 
            active={view === 'about'} 
            onClick={() => setView('about')}
          />
          <NavItem 
            icon={<Terminal size={18} />} 
            label="Build Prompts" 
            active={view === 'prompts'} 
            onClick={() => setView('prompts')}
          />
        </nav>

        {/* Financial Risk Area */}
        {view === 'dashboard' && !loading && <RiskWidget exceptions={exceptions} />}

        {/* Exceptions Feed */}
        {view === 'dashboard' && <ExceptionList exceptions={exceptions} />}

        {view === 'dashboard' && <CongestionChart />}

        <div className="p-4 border-t border-slate-800 space-y-2">
          <NavItem icon={<Settings size={18} />} label="System Config" />
          <div className="bg-slate-800/30 rounded-xl p-3 border border-slate-700/30">
            <div className="flex items-center gap-2 mb-1.5 text-emerald-400">
              <Activity size={12} />
              <span className="text-[9px] font-bold uppercase tracking-wider">AIS Health</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              {loading 
                ? 'Syncing frequencies...' 
                : `${vessels.length} Nodes Connected`}
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-medium text-slate-400 uppercase tracking-widest">Savannah Terminal</h2>
            <div className="h-4 w-px bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-medium text-emerald-500/80">Live Data Feed</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="text-slate-500 italic">Last update: 2 mins ago</span>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all shadow-lg shadow-blue-900/20">
              Export Report
            </button>
          </div>
        </header>

        {/* Main Content Render */}
        <div className="flex-1 overflow-y-auto">
          {view === 'dashboard' ? (
            <div className="h-full flex flex-col">
              {/* Map Container */}
              <div className="flex-1 bg-[#0b1120] relative overflow-hidden">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-50">
                    <div className="text-center">
                        <Activity className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                        <p className="text-slate-400 font-medium animate-pulse">Syncing AIS Data Streams...</p>
                    </div>
                  </div>
                ) : (
                  <MaritimeMap vessels={vessels} threshold={threshold} />
                )}
                
                {/* Mock UI Elements for "Premium" Feel */}
                <div className="absolute bottom-8 right-8 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700/50 shadow-2xl min-w-[200px] z-[1000]">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-3">Map Controls</h3>
                  <div className="space-y-2">
                      <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-blue-500"></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>THRESHOLD: {threshold}H</span>
                        <span>LAT: 32.12</span>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          ) : view === 'about' ? (
            <AboutPage onClose={() => setView('dashboard')} />
          ) : (
            <PromptsPage />
          )}
        </div>
      </main>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}

function NavItem({ icon, label, active, badge, onClick }: NavItemProps) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
    }`}>
      <span className={active ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300 transition-colors'}>
        {icon}
      </span>
      <span className="text-sm font-medium">{label}</span>
      {badge && (
        <span className="ml-auto bg-rose-500/10 text-rose-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-500/20">
          {badge}
        </span>
      )}
    </button>
  );
}

export default App;
