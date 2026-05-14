import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Ship, AlertCircle, Clock } from 'lucide-react';
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

// Custom Ship Icon Generator
const createShipIcon = (isCritical: boolean) => {
  const color = isCritical ? '#f43f5e' : '#94a3b8'; // rose-500 or slate-400
  const iconHtml = renderToStaticMarkup(
    <div className={`${isCritical ? 'pulse-red' : ''}`} style={{ color }}>
      <Ship size={24} />
    </div>
  );
  
  return L.divIcon({
    html: iconHtml,
    className: 'custom-ship-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
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
          const isCritical = hours >= threshold;
          const icon = createShipIcon(isCritical && vessel.status === 'At Anchor');

          return (
            <Marker 
              key={vessel.id} 
              position={[vessel.lat, vessel.lng]} 
              icon={icon}
            >
              <Popup className="custom-popup">
                <div className="p-2 min-w-[180px]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white text-sm uppercase tracking-wide">{vessel.name}</h3>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isCritical ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-700 text-slate-300'
                    }`}>
                      {vessel.status}
                    </span>
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <Clock size={12} />
                      <span>Duration: <span className={isCritical ? 'text-rose-400 font-medium' : ''}>
                        {formatDuration(hours, minutes)}
                      </span></span>
                    </div>
                    
                    {isCritical && (
                      <div className="flex items-center gap-2 text-rose-400 text-[10px] font-bold uppercase tracking-wider mt-2 pt-2 border-t border-slate-700">
                        <AlertCircle size={10} />
                        Critical Exception Detect
                      </div>
                    )}
                    
                    <div className="text-[10px] text-slate-500 mt-1">
                      Payload: {vessel.units_carried} Units
                    </div>
                  </div>
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
