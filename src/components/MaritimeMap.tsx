import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Ship, Clock, ThermometerSnowflake, Building2, FileText, Pill, ShieldAlert } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import { Vessel } from '../types/vessel';
import { getStagnantDuration, formatDuration } from '../utils/dateUtils';

// Fix for default Leaflet icon paths in Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
});

const SAVANNAH_COORDS: [number, number] = [32.12, -81.13];

interface MaritimeMapProps {
  vessels: Vessel[];
  threshold: number;
}

// Custom Ship Icon Generator for Pharma API carriers
const createShipIcon = (isCritical: boolean, isColdChain: boolean) => {
  let color = '#94a3b8'; // slate-400 default
  if (isCritical) {
    color = isColdChain ? '#f59e0b' : '#f43f5e'; // amber-500 or rose-500
  }
  
  const iconHtml = renderToStaticMarkup(
    <div 
      className={`relative flex items-center justify-center ${isCritical ? 'pulse-red' : ''}`} 
      style={{ color }}
    >
      <Ship size={24} />
      {isCritical && isColdChain && (
        <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-slate-900 animate-ping"></span>
      )}
    </div>
  );
  
  return L.divIcon({
    html: iconHtml,
    className: 'custom-ship-icon',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
};

const MaritimeMap: React.FC<MaritimeMapProps> = ({ vessels, threshold }) => {
  return (
    <div className="w-full h-full relative">
      <MapContainer 
        center={SAVANNAH_COORDS} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {vessels.map((vessel) => {
          const { hours, minutes } = getStagnantDuration(vessel.arrival_timestamp);
          const isCritical = hours >= threshold && vessel.status === 'At Anchor';
          const icon = createShipIcon(isCritical, vessel.coldChainRegulated);

          return (
            <Marker 
              key={vessel.id} 
              position={[vessel.lat, vessel.lng]} 
              icon={icon}
            >
              <Popup className="custom-popup" maxWidth={320}>
                <div className="p-3 min-w-[260px] max-w-[300px] space-y-2.5 font-sans">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 border-b border-slate-700/60 pb-2">
                    <div>
                      <h3 className="font-bold text-white text-sm tracking-tight leading-tight">{vessel.name}</h3>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 mt-0.5">
                        <FileText size={10} />
                        <span>{vessel.poNumber}</span>
                      </div>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                      isCritical 
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' 
                        : 'bg-slate-700 text-slate-300 border-slate-600'
                    }`}>
                      {vessel.status}
                    </span>
                  </div>
                  
                  {/* API Payload & Downstream Drug Impact */}
                  <div className="space-y-1.5 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <div className="flex items-start gap-1.5">
                      <Pill size={12} className="text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Inbound Active API</span>
                        <p className="text-xs font-semibold text-white leading-tight">{vessel.apiMaterial}</p>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-300 pt-1 border-t border-slate-800">
                      <span className="text-slate-400 font-medium">Downstream Impact: </span>
                      <strong className="text-cyan-300">{vessel.drugProductImpacted}</strong>
                    </div>

                    <div className="flex items-start gap-1.5 text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                      <Building2 size={11} className="text-slate-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">{vessel.manufacturingSite}</span>
                    </div>
                  </div>

                  {/* Cold Chain Risk Warning */}
                  {vessel.coldChainRegulated && (
                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2 text-[9.5px] text-amber-300">
                      <ThermometerSnowflake size={13} className="shrink-0 text-amber-400 mt-0.5 animate-pulse" />
                      <div className="leading-tight">
                        <span className="font-bold block text-amber-400">Cold-Chain Integrity Risk (2°C–8°C)</span>
                        Exceeded Standard Dwell Time at outer anchorage.
                      </div>
                    </div>
                  )}

                  {/* Operational Metrics */}
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-400 text-[10px]">
                      <span className="flex items-center gap-1.5">
                        <Clock size={11} className={isCritical ? 'text-rose-400' : 'text-slate-500'} />
                        Stagnant Duration:
                      </span>
                      <span className={isCritical ? 'text-rose-400 font-bold' : 'text-slate-300 font-medium'}>
                        {formatDuration(hours, minutes)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-800">
                      <span className="text-slate-400">Consigned Volume:</span>
                      <span className="font-semibold text-slate-200">
                        Consigned Raw Material for {vessel.impactedBatchCount} Commercial Batches
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">Potential Risk Exposure:</span>
                      <span className="font-bold text-rose-400 font-mono">
                        ${vessel.batchRiskValue.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {isCritical && (
                    <div className="flex items-center gap-1.5 text-rose-400 text-[10px] font-bold uppercase tracking-wider pt-2 border-t border-rose-500/20 bg-rose-500/5 -mx-3 -mb-3 p-2 rounded-b-xl">
                      <ShieldAlert size={12} />
                      Production Halt Threat Detected
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MaritimeMap;

