# Explainer: Port Congestion Exception Tracker

## Architecture & Data Flow
The application is a high-fidelity React dashboard built with Vite and TypeScript, following a domain-centric architecture:
1. **Data Layer (`useVesselData`):** A custom hook that simulates AIS (Automatic Identification System) data. It generates 15 vessels, with a subset strategically aged to trigger "Exception" states.
2. **Domain Logic (`dateUtils`):** Centralized logic for calculating stagnation duration. It determines if a vessel has exceeded the user-defined threshold (default 24h).
3. **State Management:** React `useState` manages the `threshold` and `vessels` list. `useMemo` (implicitly via filtering) drives the sidebar and map updates.
4. **UI Components:**
   - `MaritimeMap`: Renders vessels using Leaflet with custom pulsing icons for critical delays.
   - `RiskWidget`: Calculates financial exposure (Units at Risk & Daily Demurrage).
   - `ExceptionList`: An animated feed (Framer Motion) of tactical exceptions.
   - `CongestionChart`: Visualizes 7-day congestion trends via Recharts.

## Core Logic
- **Stagnation Logic:** `If Vessel_Status == 'At Anchor' AND (Current_Time - Arrival_Time) >= Threshold THEN Status = 'Critical'`.
- **Financial Risk Calculation:**
  - `Units at Risk = Σ(units_carried)` for all critical vessels.
  - `Daily Loss = (Units at Risk / 10) * $150`. This approximates the demurrage and lost margin costs typical in inbound logistics.
- **Dynamic Thresholding:** Users can toggle between 24h and 48h thresholds, causing the map and sidebar to update instantly.

## Dependencies & Integrations
- `leaflet` & `react-leaflet`: Specialized geographic engine for maritime mapping.
- `framer-motion`: Orchestrates entry/exit animations for the exception feed.
- `recharts`: Provides the data visualization for historical congestion trends.
- `lucide-react`: Industry-standard iconography.
- `tailwindcss`: Utility-first styling with custom glassmorphism and blur effects.

## Update Log
- **2026-05-14:** 
  - Initial project scaffolding and layout.
  - Implemented `useVesselData` and `MaritimeMap`.
  - Added `RiskWidget`, `ExceptionList`, and `CongestionChart`.
  - Integrated dynamic thresholding and "Apple-style" UI polish.
