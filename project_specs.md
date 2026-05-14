# Project Specifications: Port Congestion Exception Tracker

## 1. Project Overview
The **Port Congestion Exception Tracker** is a situational awareness dashboard designed for logistics professionals to monitor vessel stagnation at the Port of Savannah. It identifies "Inbound Exceptions" (ships at anchor for >24 hours) and calculates the associated financial risk (demurrage and lost margin).

## 2. User Inputs & Workflows
- **Map Interaction:** Users can view real-time vessel positions and click on markers for details.
- **Threshold Control:** A "Control Center" allows users to toggle the stagnation threshold (e.g., 24h vs 48h).
- **Exception Monitoring:** A dedicated sidebar lists all vessels currently in a "Critical Delay" state.
- **Financial Analysis:** A risk widget automatically calculates "Total Units at Risk" and "Estimated Daily Loss" based on the current exceptions.

## 3. Technology Stack & Tools
- **Framework:** React with TypeScript.
- **Build Tool:** Vite.
- **Styling:** Tailwind CSS (Vanilla CSS where needed for premium aesthetics).
- **Icons:** Lucide-React.
- **Mapping:** Leaflet with React-Leaflet (CartoDB Dark Matter tiles).
- **Data Visualization:** Recharts (for congestion trends).
- **Package Manager:** `pnpm`.
- **Deployment:** GitHub Pages (via `gh-pages` package).

## 4. Data Strategy
- **Initial Phase:** Custom hook `useVesselData` generating high-fidelity mock vessels clustered around Savannah.
- **Mock Logic:** 15 vessels total, with 5 flagged as "Exceptions" (At Anchor > 24h).
- **API Integration:** Integration with OpenSeaMap or MarineTraffic API as a secondary phase, with graceful fallback to mock data.

## 5. Core Operational Logic
- **Stagnation Trigger:** `If Status == 'At Anchor' AND Duration > 24hrs THEN Status = 'Critical'`.
- **Iconography:** Red Pulsing (Critical), Slate/Gray (Normal).
- **Financial Multiplier:** 500 units per vessel. Daily Loss = `(Total Units / 10) * $150`.

## 6. Expected Outputs
- **Situational Map:** Full-screen interactive map centered on Savannah.
- **Exception Sidebar:** Animated list of critical vessels.
- **Risk Widget:** Glassmorphism-styled financial impact card.
- **Trend Chart:** 7-day congestion trend visualization.

## 7. Deployment & "Done" Criteria
- **Repository:** Configured with `base` path for GitHub Pages.
- **Deployment:** Live URL on GitHub Pages.
- **Explainer:** Synchronized `explainer.md` documenting architecture and logic.
- **Quality:** Strict TypeScript (no `any`), modular components, and premium "Apple-style" UX.
