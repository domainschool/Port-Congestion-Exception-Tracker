import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vessel } from '../types/vessel';
import { getStagnantDuration, formatDuration } from '../utils/dateUtils';
import { AlertCircle, Clock, ChevronRight } from 'lucide-react';

interface ExceptionListProps {
  exceptions: Vessel[];
}

const ExceptionList: React.FC<ExceptionListProps> = ({ exceptions }) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 custom-scrollbar">
      <div className="flex items-center justify-between mb-2 px-2">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Exceptions</h3>
        <span className="text-[10px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
          {exceptions.length} Critical
        </span>
      </div>

      <AnimatePresence mode="popLayout">
        {exceptions.map((vessel) => {
          const { hours, minutes } = getStagnantDuration(vessel.arrival_timestamp);
          
          return (
            <motion.div
              key={vessel.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
              className="bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 transition-colors group cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {vessel.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <Clock size={10} className="text-rose-400" />
                    <span>Stagnant: <span className="text-rose-400 font-medium">{formatDuration(hours, minutes)}</span></span>
                  </div>
                </div>
                <div className="p-1.5 bg-rose-500/10 rounded-lg text-rose-500">
                  <AlertCircle size={14} />
                </div>
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="text-[9px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded border border-slate-600/50">
                    {vessel.units_carried} Units
                  </span>
                  <span className="text-[9px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded border border-amber-500/20">
                    Tier 1
                  </span>
                </div>
                <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {exceptions.length === 0 && (
        <div className="text-center py-8 opacity-40">
          <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="text-slate-400" size={18} />
          </div>
          <p className="text-[10px] uppercase tracking-wider font-medium text-slate-500">No Critical Delays</p>
        </div>
      )}
    </div>
  );
};

export default ExceptionList;
