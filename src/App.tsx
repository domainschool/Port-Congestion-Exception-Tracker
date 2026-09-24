import React, { useState } from 'react';
import { 
  Pill, 
  LayoutDashboard, 
  ShieldCheck,
  Activity,
  Terminal,
  ThermometerSnowflake,
  Clock,
  Building2,
  FileSpreadsheet
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
  const [threshold, setThreshold] = useState<number>(24);
  const [coldChainOnly, setColdChainOnly] = useState<boolean>(false);
  const [selectedVesselId, setSelectedVesselId] = useState<string | null>(null);
  const [view, setView] = useState<'dashboard' | 'about' | 'prompts'>('dashboard');

  // Compute 24-hour 'At Anchor' stagnation exceptions
  const allExceptions = vessels.filter(v => {
    const { hours } = getStagnantDuration(v.arrival_timestamp);
    return v.status === 'At Anchor' && hours >= threshold;
  });

  // Filtered exceptions when cold chain filter is toggled
  const activeExceptions = coldChainOnly 
    ? allExceptions.filter(v => v.coldChainRegulated) 
    : allExceptions;

  // Filtered vessels displayed on map when cold chain toggle is active
  const displayedVessels = coldChainOnly
    ? vessels.filter(v => v.coldChainRegulated)
    : vessels;

  return (
    <div className="flex h-screen w-screen bg-[#090d16] text-slate-200 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-84 bg-slate-900/90 backdrop-blur-2xl border-r border-slate-800 flex flex-col shrink-0 z-20">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-cyan-600 to-blue-500 p-2.5 rounded-xl shadow-lg shadow-cyan-900/30 ring-1 ring-cyan-400/30">
              <Pill className="text-white w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-black text-base tracking-tight text-white leading-none">
                  BATCH<span className="text-cyan-400">GUARD</span>
                </h1>
                <span className="text-[9px] font-bold px-1.5 py-0.2 bg-cyan-500/10 text-cyan-400 rounded border border-cyan-500/20">
                  Rx Tower
                </span>
              </div>
              <span className="text-slate-400 text-[9.5px] font-semibold tracking-wider block mt-1">
                Pharma Inbound Control Tower
              </span>
            </div>
          </div>
          
          <button 
            onClick={() => setThreshold(threshold === 24 ? 48 : 24)}
            className={`p-2 rounded-xl border transition-all text-xs font-mono font-bold flex items-center gap-1 ${
              threshold === 48 
                ? 'bg-amber-500/10 border-amber-500/50 text-amber-400' 
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title={`Threshold: ${threshold} Hours`}
          >
            <Clock size={13} />
            <span>{threshold}h</span>
          </button>
        </div>

        {/* View Switcher Navigation */}
        <nav className="px-4 py-3 space-y-1">
          <NavItem 
            icon={<LayoutDashboard size={17} />} 
            label="API Control Tower" 
            badge={allExceptions.length > 0 ? `${allExceptions.length} Alerts` : undefined}
            active={view === 'dashboard'} 
            onClick={() => setView('dashboard')}
          />
          <NavItem 
            icon={<ShieldCheck size={17} />} 
            label="Domain Architecture" 
            active={view === 'about'} 
            onClick={() => setView('about')}
          />
          <NavItem 
            icon={<Terminal size={17} />} 
            label="Build Blueprint" 
            active={view === 'prompts'} 
            onClick={() => setView('prompts')}
          />
        </nav>

        {/* Dynamic Sidebar Content */}
        {view === 'dashboard' && (
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto custom-scrollbar">
            {/* Pharma Financial & Operational Risk Area */}
            {!loading && (
              <RiskWidget 
                exceptions={allExceptions} 
                coldChainOnly={coldChainOnly}
                onToggleColdChain={() => setColdChainOnly(!coldChainOnly)}
              />
            )}

            {/* Active API Exceptions Feed */}
            <ExceptionList 
              exceptions={activeExceptions} 
              selectedVesselId={selectedVesselId}
              onSelectVessel={(vessel) => setSelectedVesselId(vessel.id)}
            />

            {/* Congestion Trend Chart */}
            <CongestionChart />
          </div>
        )}

        {/* Sidebar Footer */}
        <div className="p-3.5 border-t border-slate-800/80 bg-slate-950/40 space-y-2 shrink-0">
          <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">AIS Stream Health</span>
            </div>
            <span className="text-[10px] text-cyan-400 font-mono">
              {loading ? 'Syncing...' : `${vessels.length} API Carriers Tracked`}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header Bar */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/60 backdrop-blur-md z-10">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="flex items-center gap-2">
              <Building2 size={16} className="text-cyan-400 shrink-0" />
              <h2 className="text-xs font-bold text-white uppercase tracking-wider truncate">
                Savannah Maritime Gateway // Downstream Drug Supply Pipeline
              </h2>
            </div>
            <div className="h-4 w-px bg-slate-700/80 hidden md:block"></div>
            <p className="text-[11px] text-slate-400 font-medium hidden lg:block truncate">
              Correlating Inbound API Shipments with Maritime Congestion to Prevent Drug Manufacturing Halts & Shortages.
            </p>
          </div>
          
          <div className="flex items-center gap-3 text-xs font-medium shrink-0">
            {/* Quick Status Pill */}
            {coldChainOnly && (
              <span className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2.5 py-1 rounded-lg text-[10px] font-bold animate-pulse">
                <ThermometerSnowflake size={12} />
                Filtering 2°C–8°C Only
              </span>
            )}
            
            <div className="hidden sm:flex items-center gap-2 text-slate-400 text-[11px] bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span>SLA Anchor Limit: <strong className="text-white font-mono">{threshold}h</strong></span>
            </div>

            <button 
              onClick={() => {
                const csvData = activeExceptions.map(v => 
                  `${v.poNumber},"${v.name}","${v.apiMaterial}","${v.drugProductImpacted}",${v.impactedBatchCount},$${v.batchRiskValue},"${v.manufacturingSite}",${v.coldChainRegulated ? 'YES' : 'NO'}`
                ).join('\n');
                const blob = new Blob([`PO_Number,Vessel_Name,API_Material,Impacted_Drug_Product,Batches_At_Risk,Financial_Risk_USD,Manufacturing_Site,Cold_Chain_Regulated\n${csvData}`], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `BatchGuard_API_Exceptions_${new Date().toISOString().slice(0,10)}.csv`;
                a.click();
              }}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-3.5 py-1.5 rounded-lg transition-all shadow-lg shadow-cyan-900/20 text-xs font-semibold flex items-center gap-1.5"
            >
              <FileSpreadsheet size={14} />
              <span>Export API Audit</span>
            </button>
          </div>
        </header>

        {/* Main Content View Switcher */}
        <div className="flex-1 overflow-y-auto relative">
          {view === 'dashboard' ? (
            <div className="h-full flex flex-col">
              {/* Leaflet Map Canvas */}
              <div className="flex-1 bg-[#090d16] relative overflow-hidden">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 z-50">
                    <div className="text-center">
                      <Activity className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-3" />
                      <p className="text-white font-semibold tracking-wide">Syncing Inbound API Telemetry...</p>
                      <p className="text-slate-400 text-xs mt-1">Cross-referencing maritime anchorage queues with PO schedules</p>
                    </div>
                  </div>
                ) : (
                  <MaritimeMap vessels={displayedVessels} threshold={threshold} />
                )}
                
                {/* Floating Map Legend and Telemetry Overlay */}
                <div className="absolute bottom-6 right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700/60 shadow-2xl min-w-[240px] z-[1000] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                      Control Tower HUD
                    </h3>
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800/40">
                      LIVE AIS
                    </span>
                  </div>

                  <div className="space-y-1.5 text-[10.5px]">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-rose-500/20"></span>
                        Halt Exception (&gt;{threshold}h Anchor)
                      </span>
                      <span className="font-bold text-rose-400">{allExceptions.length}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-amber-400/20"></span>
                        Cold-Chain Regulated (2°C–8°C)
                      </span>
                      <span className="font-bold text-amber-400">
                        {vessels.filter(v => v.coldChainRegulated).length}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                        Nominal Moored/Underway
                      </span>
                      <span className="font-bold text-slate-400">
                        {vessels.length - allExceptions.length}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[9.5px] text-slate-400 font-mono">
                    <span>PORT: SAVANNAH (SAV)</span>
                    <span className="text-cyan-400">STATUS: CONGESTED</span>
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
      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold shadow-md shadow-cyan-950/40' 
        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent'
    }`}>
      <span className={active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300 transition-colors'}>
        {icon}
      </span>
      <span className="text-xs tracking-wide">{label}</span>
      {badge && (
        <span className="ml-auto bg-rose-500/15 text-rose-400 text-[9.5px] font-bold px-2 py-0.5 rounded-full border border-rose-500/25 animate-pulse">
          {badge}
        </span>
      )}
    </button>
  );
}

export default App;

