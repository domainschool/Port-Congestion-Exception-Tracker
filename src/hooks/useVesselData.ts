import { useState, useEffect } from 'react';
import { Vessel, VesselStatus } from '../types/vessel';

const SAVANNAH_CENTER = { lat: 32.12, lng: -81.13 };

const MOCK_NAMES = [
  'Maersk Sentosa', 'Ever Given', 'CMA CGM Marco Polo', 'HMM Algeciras', 
  'MSC Gulsun', 'OOCL Hong Kong', 'COSCO Shipping Universe', 'Madrid Maersk',
  'MOL Triumph', 'Barzan', 'Triton', 'Al Nefud', 'MSC Oscar', 'CSCL Globe', 'Magleby Maersk'
];

export const useVesselData = () => {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate mock data
    const generateMockVessels = (): Vessel[] => {
      const now = new Date();
      
      return MOCK_NAMES.map((name, index) => {
        // First 5 vessels are "Exceptions" (At Anchor > 24h)
        const isException = index < 5;
        const status: VesselStatus = isException ? 'At Anchor' : (index % 2 === 0 ? 'Moored' : 'Underway');
        
        let arrival_timestamp: string;
        if (isException) {
          // 25 to 48 hours ago
          const hoursAgo = 25 + Math.random() * 23;
          arrival_timestamp = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000).toISOString();
        } else {
          // 2 to 20 hours ago
          const hoursAgo = 2 + Math.random() * 18;
          arrival_timestamp = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000).toISOString();
        }

        // Random clustering around Savannah
        const lat = SAVANNAH_CENTER.lat + (Math.random() - 0.5) * 0.1;
        const lng = SAVANNAH_CENTER.lng + (Math.random() - 0.5) * 0.1;

        return {
          id: `vessel-${index}`,
          name,
          status,
          arrival_timestamp,
          lat,
          lng,
          units_carried: 500,
        };
      });
    };

    // Simulate API delay
    const timer = setTimeout(() => {
      setVessels(generateMockVessels());
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { vessels, loading };
};
