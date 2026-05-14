import React from 'react';
import { Vessel } from '../types/vessel';
import { TrendingUp, DollarSign, Package } from 'lucide-react';

interface RiskWidgetProps {
  exceptions: Vessel[];
}

const RiskWidget: React.FC<RiskWidgetProps> = ({ exceptions }) => {
  const totalUnits = exceptions.reduce((acc, v) => acc + v.units_carried, 0);
  const dailyDemurrage = (totalUnits / 10) * 150;

  return (
    <div className="p-4">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-5 shadow-2xl shadow-rose-900/10">
        {/* Glassmorphism Shine */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-500/10 blur-[60px] rounded-full"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Risk Exposure</h3>
            <div className="p-1.5 bg-rose-500/20 text-rose-400 rounded-lg animate-pulse">
              <TrendingUp size={14} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Package size={12} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Units at Risk</span>
              </div>
              <p className="text-xl font-bold text-white tabular-nums tracking-tight">
                {totalUnits.toLocaleString()}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500">
                <DollarSign size={12} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Daily Loss</span>
              </div>
              <p className="text-xl font-bold text-rose-500 tabular-nums tracking-tight">
                ${dailyDemurrage.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-700/50">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] text-slate-500 font-medium">Demurrage Intensity</span>
              <span className="text-[9px] text-rose-400 font-bold">High Risk</span>
            </div>
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-1000" 
                style={{ width: `${Math.min((dailyDemurrage / 10000) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskWidget;
