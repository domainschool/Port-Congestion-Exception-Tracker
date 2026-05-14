# Port Congestion Exception Tracker: Modular Build Prompts

This document contains a series of sequential prompts designed to build the application incrementally using "Vibe Coding." Follow these steps one by one, verifying the output after each prompt.

---

## Phase 1: Foundation & Scaffolding

### Prompt 1: Project Initialization
**Intent:** Set up the environment and base UI shell.
> "Initialize a new Vite project using React and TypeScript. Use `pnpm` for all package management. Install Tailwind CSS and Lucide-React. Create a basic high-fidelity layout with a dark-themed sidebar on the left and a large main content area for a map. The UI should look like a premium SaaS dashboard (use 'Inter' font and slate/zinc colors)."

### Prompt 2: The Map Canvas (Leaflet)
**Intent:** Establish the spatial context.
> "Install `leaflet` and `react-leaflet`. Implement a Map component in the main content area. Center the map on the Port of Savannah (approx. 32.12, -81.13). Ensure the map container takes up 100% of the available space. Add a professional map tile layer (e.g., CartoDB Dark Matter). Add a single static marker with a custom 'Cargo Ship' icon from Lucide-React at the center."

---

## Phase 2: Data & Domain Logic

### Prompt 3: Data Layer & Mock Generator
**Intent:** Create the vessel data structure without needing an immediate API key.
> "Create a custom hook `useVesselData`. Define a TypeScript interface for a `Vessel` including: `id`, `name`, `status` (At Anchor, Moored, Underway), `arrival_timestamp`, `lat`, `lng`, and `units_carried` (default 500). Write a function to generate 15 mock vessels clustered around Savannah. Ensure 5 of these vessels have an `arrival_timestamp` greater than 24 hours ago and status 'At Anchor'."

### Prompt 4: The Exception Engine
**Intent:** Implement the core "Domain School" logic.
> "Update the Map component to render the mock vessels. Implement the 'Stagnation Logic': 
> 1. If a vessel is 'At Anchor' for > 24 hours, its icon must be Red and Pulsing.
> 2. Otherwise, vessels should be Slate/Gray.
> Add a popup to each marker showing the ship's name and how long it has been stagnant."

---

## Phase 3: The "Impressive" UI Components

### Prompt 5: The Exception Sidebar
**Intent:** Tactical list for the logistics manager.
> "Build an 'Active Exceptions' list in the left sidebar. This list should automatically filter and show only the vessels flagged by the 24-hour logic. Each card in the list should display the ship name, the delay duration (e.g., '32h 15m'), and a 'Critical' badge. Use Framer Motion for smooth entry animations when vessels enter the exception state."

### Prompt 6: The Financial Risk Widget
**Intent:** Monetize the data for executives.
> "Create a 'Risk Impact' widget at the top of the sidebar. It should calculate:
> 1. Total Units at Risk: Sum of units on all 'Exception' vessels.
> 2. Daily Demurrage Estimate: (Total Units / 10) * $150.
> Style this as a high-contrast 'Glassmorphism' card with a subtle glow effect to highlight the financial importance."

---

## Phase 4: Advanced Visualization & Polish

### Prompt 7: Congestion Trend Chart
**Intent:** Historical context using Recharts.
> "Install `recharts`. Create a small area chart component at the bottom of the sidebar showing a '7-Day Congestion Trend.' Use mock data to show the number of ships at anchor increasing over the week. The chart should use a primary accent color (e.g., Emerald or Sky Blue) with a soft gradient fill."

### Prompt 8: API Integration (The 'Real' Step)
**Intent:** Switch from mock to live data.
> **Note:** Requires a MarineTraffic API Key or similar.
> "Refactor `useVesselData` to fetch live data from the OpenSeaMap API or MarineTraffic API (use an environment variable `VITE_MARINETRAFFIC_KEY`). If the API call fails or the key is missing, gracefully fall back to the mock data generator with a small notification toast saying 'Using Simulated Data'."

---

## Phase 5: Final Polish & Deployment

### Prompt 9: Apple-Style UX Polish
**Intent:** Make it look elite.
> "Apply a final 'Ogilvy/Apple-style' design pass. Add a blur-effect (backdrop-filter) to the sidebar. Use 'Lucide-React' icons for navigation. Add a 'Control Center' button that toggles the 24-hour threshold (e.g., change it to 48 hours and see the map update in real-time). Ensure all numbers are formatted with commas and currency symbols."

### Prompt 10: Deployment Prep
**Intent:** Finalize for GitHub Pages.
> "Configure the project for GitHub Pages deployment. Ensure the `base` path in `vite.config.ts` matches the repository name. Add the `gh-pages` package and set up the 'deploy' scripts in `package.json` as per the Deployment Standards in the instructions."
