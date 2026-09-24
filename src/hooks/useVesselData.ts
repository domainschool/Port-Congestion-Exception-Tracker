import { useState, useEffect } from 'react';
import { Vessel, VesselStatus } from '../types/vessel';

const SAVANNAH_CENTER = { lat: 32.12, lng: -81.13 };

interface MockShipmentTemplate {
  name: string;
  poNumber: string;
  apiMaterial: string;
  drugProductImpacted: string;
  manufacturingSite: string;
  coldChainRegulated: boolean;
  impactedBatchCount: number;
}

const PHARMA_CARGO_FLEET: MockShipmentTemplate[] = [
  {
    name: 'Maersk Sentosa',
    poNumber: 'PO-84920-API',
    apiMaterial: 'Semaglutide Precursor (Peptide API)',
    drugProductImpacted: 'GLP-1 Injectables (Type 2 / Obesity)',
    manufacturingSite: 'Site 04 - RTP Facility (North Carolina)',
    coldChainRegulated: true,
    impactedBatchCount: 16,
  },
  {
    name: 'Ever Given',
    poNumber: 'PO-91402-API',
    apiMaterial: 'Atorvastatin Calcium (API)',
    drugProductImpacted: 'Lipid-Lowering Rx Tablets',
    manufacturingSite: 'Site 02 - Indianapolis Plant (Indiana)',
    coldChainRegulated: false,
    impactedBatchCount: 12,
  },
  {
    name: 'CMA CGM Marco Polo',
    poNumber: 'PO-77201-API',
    apiMaterial: 'Pembrolizumab mAb Intermediate',
    drugProductImpacted: 'Oncology Biologics Infusion',
    manufacturingSite: 'Site 07 - Cork Campus (Ireland Export)',
    coldChainRegulated: true,
    impactedBatchCount: 18,
  },
  {
    name: 'HMM Algeciras',
    poNumber: 'PO-60312-API',
    apiMaterial: 'Amoxicillin Trihydrate (Sterile API)',
    drugProductImpacted: 'Broad-Spectrum Antibiotics (Oral Suspension)',
    manufacturingSite: 'Site 08 - Kalamazoo Complex (MI)',
    coldChainRegulated: false,
    impactedBatchCount: 14,
  },
  {
    name: 'MSC Gulsun',
    poNumber: 'PO-55198-API',
    apiMaterial: 'Insulin Glargine Biosimilar Active',
    drugProductImpacted: 'Basal Insulin 100U/mL Cartridges',
    manufacturingSite: 'Site 01 - Cambridge Biotech Hub (MA)',
    coldChainRegulated: true,
    impactedBatchCount: 20,
  },
  {
    name: 'OOCL Hong Kong',
    poNumber: 'PO-44829-API',
    apiMaterial: 'Acetaminophen Granular (Pharma Grade)',
    drugProductImpacted: 'Pediatric & Adult Analgesics',
    manufacturingSite: 'Site 02 - Indianapolis Plant (Indiana)',
    coldChainRegulated: false,
    impactedBatchCount: 8,
  },
  {
    name: 'COSCO Shipping Universe',
    poNumber: 'PO-39201-API',
    apiMaterial: 'Methotrexate Sodium (Sterile Raw API)',
    drugProductImpacted: 'Immunosuppressants & Oncology Rx',
    manufacturingSite: 'Site 04 - RTP Facility (North Carolina)',
    coldChainRegulated: true,
    impactedBatchCount: 10,
  },
  {
    name: 'Madrid Maersk',
    poNumber: 'PO-33819-API',
    apiMaterial: 'Dexamethasone Sodium Phosphate',
    drugProductImpacted: 'Critical Care Anti-Inflammatory Vials',
    manufacturingSite: 'Site 09 - Singapore Sterile Fill Facility',
    coldChainRegulated: false,
    impactedBatchCount: 6,
  },
  {
    name: 'MOL Triumph',
    poNumber: 'PO-28410-API',
    apiMaterial: 'Adalimumab Recombinant API',
    drugProductImpacted: 'Anti-TNF Autoimmune Pre-Filled Syringes',
    manufacturingSite: 'Site 07 - Cork Campus (Ireland Export)',
    coldChainRegulated: true,
    impactedBatchCount: 15,
  },
  {
    name: 'Barzan',
    poNumber: 'PO-22941-API',
    apiMaterial: 'Paclitaxel Semi-Synthetic API',
    drugProductImpacted: 'Chemotherapy IV Concentrates',
    manufacturingSite: 'Site 01 - Cambridge Biotech Hub (MA)',
    coldChainRegulated: true,
    impactedBatchCount: 9,
  },
  {
    name: 'Triton',
    poNumber: 'PO-18492-API',
    apiMaterial: 'Rosuvastatin Calcium Intermediate',
    drugProductImpacted: 'Cardiovascular Statin Capsules',
    manufacturingSite: 'Site 02 - Indianapolis Plant (Indiana)',
    coldChainRegulated: false,
    impactedBatchCount: 11,
  },
  {
    name: 'Al Nefud',
    poNumber: 'PO-14920-API',
    apiMaterial: 'Azithromycin Dihydrate (Sterile API)',
    drugProductImpacted: 'Emergency Care Antibiotic Infusions',
    manufacturingSite: 'Site 08 - Kalamazoo Complex (MI)',
    coldChainRegulated: false,
    impactedBatchCount: 13,
  },
  {
    name: 'MSC Oscar',
    poNumber: 'PO-11829-API',
    apiMaterial: 'Heparin Sodium (USP Grade Active)',
    drugProductImpacted: 'Hospital Anticoagulant Injections',
    manufacturingSite: 'Site 04 - RTP Facility (North Carolina)',
    coldChainRegulated: true,
    impactedBatchCount: 17,
  },
  {
    name: 'CSCL Globe',
    poNumber: 'PO-09412-API',
    apiMaterial: 'Metformin Hydrochloride Granules',
    drugProductImpacted: 'Type 2 Diabetes Extended-Release',
    manufacturingSite: 'Site 02 - Indianapolis Plant (Indiana)',
    coldChainRegulated: false,
    impactedBatchCount: 7,
  },
  {
    name: 'Magleby Maersk',
    poNumber: 'PO-07823-API',
    apiMaterial: 'Epinephrine API Micronized',
    drugProductImpacted: 'Emergency Anaphylaxis Auto-Injectors',
    manufacturingSite: 'Site 09 - Singapore Sterile Fill Facility',
    coldChainRegulated: true,
    impactedBatchCount: 14,
  }
];

export const useVesselData = () => {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate mock pharmaceutical API vessel data
    const generateMockVessels = (): Vessel[] => {
      const now = new Date();
      
      return PHARMA_CARGO_FLEET.map((cargo, index) => {
        // First 5 vessels are "Exceptions" (At Anchor > 24h)
        const isException = index < 5;
        const status: VesselStatus = isException ? 'At Anchor' : (index % 2 === 0 ? 'Moored' : 'Underway');
        
        let arrival_timestamp: string;
        if (isException) {
          // 25 to 48 hours ago
          const hoursAgo = 25 + (index * 4.5) + (Math.random() * 2);
          arrival_timestamp = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000).toISOString();
        } else {
          // 2 to 20 hours ago
          const hoursAgo = 2 + Math.random() * 18;
          arrival_timestamp = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000).toISOString();
        }

        // Random clustering around Savannah outer anchorage
        const lat = SAVANNAH_CENTER.lat + (Math.random() - 0.5) * 0.12;
        const lng = SAVANNAH_CENTER.lng + (Math.random() - 0.5) * 0.12;

        const batchCostPerUnit = 120000; // $120,000 per commercial finished batch
        const batchRiskValue = cargo.impactedBatchCount * batchCostPerUnit;

        return {
          id: `vessel-${index}`,
          name: cargo.name,
          status,
          arrival_timestamp,
          lat,
          lng,
          units_carried: cargo.impactedBatchCount,
          poNumber: cargo.poNumber,
          apiMaterial: cargo.apiMaterial,
          drugProductImpacted: cargo.drugProductImpacted,
          impactedBatchCount: cargo.impactedBatchCount,
          batchRiskValue,
          manufacturingSite: cargo.manufacturingSite,
          coldChainRegulated: cargo.coldChainRegulated,
        };
      });
    };

    // Simulate API delay
    const timer = setTimeout(() => {
      setVessels(generateMockVessels());
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { vessels, loading };
};

