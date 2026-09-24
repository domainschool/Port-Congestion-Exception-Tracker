import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vessel } from '../types/vessel';
import { getStagnantDuration, formatDuration } from '../utils/dateUtils';
import { AlertCircle, Clock, ChevronRight, ThermometerSnowflake, Building2, FileText, Pill } from 'lucide-react';

interface ExceptionListProps {
  exceptions: Vessel[];
  selectedVesselId?: string | null;
  onSelectVessel?: (vessel: Vessel) => void;
}

const ExceptionList: React.FC<ExceptionListProps> = ({ exceptions, selectedVesselId, onSelectVessel }) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 custom-scrollbar">
      <div className="flex items-center justify-between mb-1 px-1">
        <div className="flex items-center gap-1.5">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            API Stagnation Exceptions
          </h3>
        </div>
        <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
          {exceptions.length} Flagged
        </span>
      </div>

      <AnimatePresence mode="popLayout">
        {exceptions.map((vessel) => {
          const { hours, minutes } = getStagnantDuration(vessel.arrival_timestamp);
          const isSelected = selectedVesselId === vessel.id;
          
          return (
            <motion.div
              key={vessel.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
              onClick={() => onSelectVessel && onSelectVessel(vessel)}
              className={`bg-slate-850/70 hover:bg-slate-800/90 border rounded-xl p-3.5 transition-all group cursor-pointer shadow-lg ${
                isSelected 
                  ? 'border-cyan-500/60 ring-1 ring-cyan-500/30 bg-slate-800/90' 
                  : 'border-slate-700/60 hover:border-slate-600'
              }`}
            >
              {/* Top Header: Vessel Name + PO Badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
                      {vessel.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-400">
                    <FileText size={10} className="shrink-0" />
                    <span>{vessel.poNumber}</span>
                  </div>
                </div>
                <div className="p-1.5 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 shrink-0">
                  <AlertCircle size={14} />
                </div>
              </div>

              {/* API Material and Target Drug Product */}
              <div className="mt-2.5 space-y-1.5 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                <div className="flex items-start gap-1.5">
                  <Pill size={12} className="text-indigo-400 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-slate-200 leading-tight">
                      {vessel.apiMaterial}
                    </p>
                    <p className="text-[9.5px] text-slate-400 truncate">
                      Target: {vessel.drugProductImpacted}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[9.5px] text-slate-400 border-t border-slate-800/60 pt-1.5">
                  <Building2 size={11} className="text-slate-400 shrink-0" />
                  <span className="truncate">{vessel.manufacturingSite}</span>
                </div>
              </div>

              {/* Cold-Chain Regulated Warning Pill */}
              {vessel.coldChainRegulated && (
                <div className="mt-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] font-medium leading-tight">
                  <ThermometerSnowflake size={11} className="shrink-0 text-amber-400 animate-pulse" />
                  <span>Cold-Chain Integrity Risk: Exceeded Standard Dwell Time (2°C–8°C)</span>
                </div>
              )}

              {/* Bottom Metrics: Stagnation duration and Batch Count */}
              <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2">
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Clock size={11} className="text-rose-400" />
                  <span>Anchored: <strong className="text-rose-400">{formatDuration(hours, minutes)}</strong></span>
                </div>

                <div className="flex items-center gap-1 text-[9.5px] font-semibold text-slate-300">
                  <span className="bg-slate-750 px-2 py-0.5 rounded border border-slate-700/60">
                    Consigned for {vessel.impactedBatchCount} Commercial Batches
                  </span>
                  <ChevronRight size={13} className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {exceptions.length === 0 && (
        <div className="text-center py-10 bg-slate-900/30 rounded-2xl border border-slate-800/50">
          <div className="w-10 h-10 bg-slate-800/80 rounded-full flex items-center justify-center mx-auto mb-2.5 text-emerald-400">
            <Clock size={18} />
          </div>
          <p className="text-xs font-semibold text-slate-300">No Critical Bottlenecks</p>
          <p className="text-[10px] text-slate-500 mt-0.5">All inbound API carriers within SLA dwell threshold</p>
        </div>
      )}
    </div>
  );
};

export default ExceptionList;

