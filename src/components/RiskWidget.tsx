import React from 'react';
import { Vessel } from '../types/vessel';
import { ShieldAlert, DollarSign, Pill, ThermometerSnowflake, Activity } from 'lucide-react';

interface RiskWidgetProps {
  exceptions: Vessel[];
  coldChainOnly: boolean;
  onToggleColdChain: () => void;
}

const RiskWidget: React.FC<RiskWidgetProps> = ({ exceptions, coldChainOnly, onToggleColdChain }) => {
  const filteredExceptions = coldChainOnly 
    ? exceptions.filter(v => v.coldChainRegulated) 
    : exceptions;

  const totalBatchesAtRisk = filteredExceptions.reduce((acc, v) => acc + v.impactedBatchCount, 0);
  const totalProductionLoss = filteredExceptions.reduce((acc, v) => acc + v.batchRiskValue, 0);
  
  // Calculate unique life-saving drug formulations impacted
  const uniqueDrugs = Array.from(new Set(filteredExceptions.map(v => v.drugProductImpacted)));
  const coldChainCount = exceptions.filter(v => v.coldChainRegulated).length;

  // Determine dynamic shortage vulnerability index
  const getVulnerabilityRating = () => {
    if (uniqueDrugs.length >= 4) {
      return {
        label: `CRITICAL — ${uniqueDrugs.length} Life-Saving Rx Impacted`,
        color: 'text-rose-400',
        bg: 'bg-rose-500/10 border-rose-500/30',
        progressColor: 'from-rose-600 via-amber-500 to-rose-500',
        pct: 94,
      };
    } else if (uniqueDrugs.length >= 2) {
      return {
        label: `HIGH — ${uniqueDrugs.length} Rx Formulations Threatened`,
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/30',
        progressColor: 'from-amber-600 to-amber-400',
        pct: 68,
      };
    } else if (uniqueDrugs.length === 1) {
      return {
        label: `ELEVATED — 1 Active Formulation at Risk`,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10 border-blue-500/30',
        progressColor: 'from-blue-600 to-cyan-400',
        pct: 35,
      };
    }
    return {
      label: 'NOMINAL — No Active Pipeline Halts',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      progressColor: 'from-emerald-600 to-emerald-400',
      pct: 5,
    };
  };

  const rating = getVulnerabilityRating();

  return (
    <div className="p-4">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-700/60 rounded-2xl p-5 shadow-2xl shadow-rose-950/20">
        {/* Ambient Glows */}
        <div className="absolute -top-20 -left-20 w-44 h-44 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-rose-500/10 blur-[50px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Activity size={13} className="text-cyan-400 animate-pulse" />
              <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                API Pipeline Risk Exposure
              </h3>
            </div>
            <div className="p-1.5 bg-rose-500/15 text-rose-400 rounded-lg border border-rose-500/20">
              <ShieldAlert size={14} />
            </div>
          </div>

          {/* Primary Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/40">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Pill size={13} className="text-indigo-400" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Batches at Risk</span>
              </div>
              <p className="text-xl font-bold text-white tabular-nums tracking-tight">
                {totalBatchesAtRisk}
                <span className="text-[10px] font-normal text-slate-400 ml-1">lots</span>
              </p>
              <span className="text-[8.5px] text-slate-500">Commercial finished batches</span>
            </div>

            <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/40">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <DollarSign size={13} className="text-rose-400" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Potential Loss</span>
              </div>
              <p className="text-xl font-bold text-rose-400 tabular-nums tracking-tight">
                ${(totalProductionLoss / 1000).toLocaleString()}k
              </p>
              <span className="text-[8.5px] text-slate-500">@ $120k / commercial batch</span>
            </div>
          </div>

          {/* Drug Shortage Vulnerability Index */}
          <div className={`p-2.5 rounded-xl border ${rating.bg} space-y-1.5`}>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                Shortage Vulnerability Index
              </span>
              <span className={`text-[9.5px] font-extrabold ${rating.color}`}>
                {rating.pct}%
              </span>
            </div>
            <p className={`text-[10.5px] font-bold ${rating.color} leading-tight`}>
              {rating.label}
            </p>
            <div className="h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${rating.progressColor} rounded-full transition-all duration-700`}
                style={{ width: `${rating.pct}%` }}
              ></div>
            </div>
          </div>

          {/* Cold Chain Sensitive Filter Toggle */}
          <button
            onClick={onToggleColdChain}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
              coldChainOnly 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-lg shadow-amber-900/20' 
                : 'bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-700/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <ThermometerSnowflake size={14} className={coldChainOnly ? 'text-amber-400 animate-spin-slow' : 'text-slate-400'} />
              <span className="text-[10px] tracking-wide">
                Cold-Chain Sensitive (2°C–8°C)
              </span>
            </div>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
              coldChainOnly 
                ? 'bg-amber-500 text-slate-950' 
                : 'bg-slate-700 text-slate-300'
            }`}>
              {coldChainCount} Active
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskWidget;

