import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { day: 'Mon', count: 2 },
  { day: 'Tue', count: 3 },
  { day: 'Wed', count: 5 },
  { day: 'Thu', count: 4 },
  { day: 'Fri', count: 6 },
  { day: 'Sat', count: 8 },
  { day: 'Sun', count: 7 },
];

const CongestionChart: React.FC = () => {
  return (
    <div className="px-4 py-2">
      <div className="bg-slate-800/20 border border-slate-700/30 rounded-xl p-4">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">7-Day Congestion Trend</h3>
        
        <div className="h-24 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.1} />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 8 }} 
                dy={10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  fontSize: '10px',
                  color: '#f1f5f9'
                }}
                itemStyle={{ color: '#0ea5e9' }}
                cursor={{ stroke: '#334155', strokeWidth: 1 }}
              />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="#0ea5e9" 
                fillOpacity={1} 
                fill="url(#colorCount)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CongestionChart;
