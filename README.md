# 🚢 Sentinel: Port Congestion Exception Tracker

### **The "Smoke Detector" for Global Supply Chains.**
Sentinel is a high-fidelity situational awareness dashboard designed to mitigate financial leakage by identifying vessel stagnation at major ports before they trigger massive demurrage penalties.

[![Tech Stack: React](https://img.shields.io/badge/Stack-React%20%2B%20TS-blue?style=flat-square)](https://reactjs.org/)
[![Styling: Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-38b2ac?style=flat-square)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

---

## 📸 Product Preview

![Sentinel Dashboard](/Users/prateekk/.gemini/antigravity/brain/81f046b7-5d18-4563-8b6c-71585cf2d417/final_dashboard_view_1778727565831.png)

> **[🚀 View Live Demo on GitHub Pages](https://prateekk.github.io/Port-Congestion-Exception-Tracker/)** *(Note: Replace with actual URL after deployment)*

---

## 🎯 The Business Problem: "The Black Hole of the Last Mile"

While modern GPS allows us to track ships across the ocean, the final few miles—entering the port—are often where the most money is lost. 

- **The Visibility Gap:** Logistics managers often remain "blind" to delays until a ship misses its docking window, leading to reactive firefighting.
- **Financial Leakage:** Delays trigger **Demurrage and Detention (D&D)** fees—penalty charges for keeping containers in the port longer than agreed—which can cost companies thousands of dollars per hour.
- **The Bullwhip Effect:** A simple 24-hour delay at a port like Savannah can cause a two-week delay at a warehouse in the Midwest, leading to empty shelves and lost sales.

**Sentinel transforms this reactive blindness into tactical awareness.**

---

## 🛠 Core Features & Domain Logic

### **1. Real-Time Exception Monitoring**
Tracks live AIS (Automatic Identification System) data for inbound vessels and flags only those breaking critical business rules.

### **2. Financial Risk Widget**
Calculates the "Total Units at Risk" and provides a "Daily Demurrage Estimate" based on current stagnation levels, allowing executives to prioritize high-value cargo.

### **3. Dynamic Stagnation Thresholds**
Enables tactical coordinators to toggle between 24h and 48h thresholds to identify bottlenecks at different levels of severity.

### **🧠 The Domain Logic (The "Secret Sauce")**
Unlike generic map trackers, Sentinel is built on industry-specific heuristics:
- **The 24-Hour Rule:** In maritime logistics, 24 hours "At Anchor" is the industry-standard threshold for declaring an "Inbound Exception."
- **Risk Attribution Formula:** 
  - `Units at Risk = Σ(units_carried)` per exception vessel.
  - `Daily Loss = (Units at Risk / 10) * $150`.
  This formula approximates the lost margin and penalty fees associated with Tier-1 supply chain disruptions.

---

## 💻 Tech Stack & Architecture

- **Frontend:** React 18, TypeScript (Strict Mode), Tailwind CSS.
- **Visualizations:** Leaflet (Maritime Mapping), Recharts (Congestion Trends), Framer Motion (State-aware animations).
- **Data Layer:** Custom `useVesselData` hook with AIS state simulation and stagnation logic.

### **How it Works**
1. **AIS Stream:** The system consumes vessel coordinates and status (At Anchor, Moored, Underway).
2. **Logic Engine:** A background calculation compares `CurrentTime - ArrivalTime` against the `DynamicThreshold`.
3. **Reactive UI:** Markers on the map transition to a **Rose Red Pulsing** state when an exception is detected, triggering an immediate update to the Risk Widget and Exception Feed.

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18+)
- **pnpm** (Recommended)

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/prateekk/Port-Congestion-Exception-Tracker.git
   cd Port-Congestion-Exception-Tracker
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm run dev
   ```

### **Environment Variables**
Create a `.env` file in the root directory (refer to `.env.example`):
```env
VITE_MARINETRAFFIC_KEY=your_api_key_here # Optional: Falls back to mock data
```

---

## 🗺 Future Roadmap

- [ ] **AI-Driven Forecasting:** Using historical AIS data to predict port congestion 7 days in advance.
- [ ] **ERP Integration:** Connect directly to SAP/Oracle to map specific Purchase Orders (POs) to at-risk vessels.
- [ ] **Automated Expediting:** Integration with air freight providers to automatically quote emergency shipments for at-risk Tier-1 cargo.

---

## 🎓 Built with the Domain School Framework

This project was developed as part of a mission to bridge the gap between technical execution and industry domain knowledge. We believe that **Syntax is a Commodity, but Domain Knowledge is Career Insurance.** 

We don't just build features; we build software that solves real-world business problems by understanding the "Why" behind every line of code.

**[Follow Domain School for more hands-on, industry-aligned projects →](https://linkedin.com/in/prateek-k)**

---
*Created by [Prateek](https://github.com/prateekk) - Strategic Logistics Solutions Architect.*
