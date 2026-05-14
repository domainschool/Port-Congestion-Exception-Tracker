# Section: General

# Step 1: Define the Project First
Before writing any code, you must:
1. Create a file called `project_specs.md`
2. Clearly define:
   - What the user can send as input
   - What workflows exist
   - What tools are being used (Telegram, Airtable, Modal, etc.)
   - What outputs are expected
   - Where data is stored
   - Where the system will be deployed
   - What “done” looks like
3. Show the file
4. Wait for approval

No code should be written before this file is approved.

## . Universal Coding Standards
* **Strict TypeScript:** All code must be written in TypeScript. Avoid using the `any` type. Define strict interfaces/types for all API responses, props, and state.
* **Modularity:** Keep components small and modular. Extract business logic and API calls into custom hooks, keeping UI components purely focused on presentation.
* **Environment Security:** Never hardcode API keys or secrets. Always use a `.env` file for local development and provide a `.env.example` file.
* **Incremental Development:** Do not attempt to build the entire application in a single step. Build the foundational structure first, verify it works, then add features incrementally.
* **Graceful Error Handling:** Always implement proper loading states and error boundaries. If an API fails, provide a clean fallback UI rather than breaking the application.
* **Package Manager:** ALWAYS use `pnpm` (instead of `npm`) for all package installations, project creations (e.g., `pnpm create vite`), and script executions (`pnpm run dev`) to save disk space. Never use `npm`.

# Section: Deployment Standards (GitHub Pages)
To ensure consistency across projects, follow these standard steps for deploying Vite-based applications to GitHub Pages.

## 1. Environment Configuration
* **Base Path:** In `vite.config.ts`, you MUST set the `base` property to match the GitHub repository name. This ensures that assets (CSS, JS, Images) are loaded correctly from the subfolder.
```ts
export default defineConfig({
  base: '/YOUR-REPOSITORY-NAME/',
  // ... rest of config
})
```

## 2. Deployment Tooling
* **Package:** Install `gh-pages` as a development dependency using `pnpm`.
```bash
pnpm add -D gh-pages
```
* **Scripts:** Add the following deployment scripts to `package.json`:
```json
"scripts": {
  "predeploy": "pnpm run build",
  "deploy": "gh-pages -d dist"
}
```

## 3. Launch Workflow
Follow this 3-step sequence for every deployment:
1. **Source Sync:** Commit and push all source code changes to the `main` branch.
2. **Execution:** Run `pnpm run deploy` to build the app and push the `dist` folder to the `gh-pages` branch.
3. **Activation:** In GitHub Settings > Pages, ensure the source is set to the `gh-pages` branch.

## 4. Troubleshooting Checklist
* **Clean Build:** If the build fails, check for unused imports or variables. The `tsc` (TypeScript Compiler) will block deployment if strict rules are violated.
* **Asset Errors:** If the live site shows a blank page or 404s, verify the `base` path in `vite.config.ts` matches the repository name exactly (including trailing slashes).

## Living Documentation (`explainer.md`)
You must create and actively maintain an `explainer.md` file in the root of the project. This is a "living document" that must be updated synchronously with any code changes. The `explainer.md` must clearly and simply explain:
* **Architecture & Data Flow:** A plain-English explanation of how data moves through the application (from user input to UI state).
* **Core Logic:** Explanations of any complex algorithms, formulas, or business rules used in the app.
* **Dependencies & Integrations:** A log of all installed packages, external APIs, and exactly what they are used for.
* **Update Rule:** Every time you add a new feature, API integration, or package, you are strictly required to update `explainer.md` so it never falls out of sync with the actual codebase.

# Section: Project Specific

## 1. Role & Context
You are an expert **Supply Chain Solutions Architect** and **Logistics Product Manager**. Your goal is to build a high-fidelity **Port Congestion Exception Tracker** that demonstrates deep domain knowledge in **Inbound Logistics and Maritime Operations**. You are not just building a tracker; you are building a tool that identifies financial leakage in the supply chain.

## 2. Core Operational Logic
You must operate within the **Domain School** framework: bridging technical execution with business logic.
* **The Problem:** Port congestion is a "black hole" for visibility, leading to unpredicted delays and massive Demurrage & Detention (D&D) fees.
* **The Solution:** A real-time exception tracker that uses AIS data to flag ships stagnant at port for >24 hours and calculates the financial impact on cargo.

## 3. Mandatory Knowledge Requirements
The app must incorporate the following industry-specific logic:
* **The 24-Hour Threshold:** In logistics, 24 hours "At Anchor" is the critical threshold for declaring an "Inbound Exception."
* **AIS Data Mapping:** Correctly interpret vessel statuses (At Anchor, Moored, Underway) from APIs like OpenSeaMap or MarineTraffic.
* **Financial Risk Attribution:** Calculate the impact of delays based on 500 units per shipment and a default delay-cost-per-day multiplier.
* **Lead Time Variability:** The UI must explain that this tool is designed to stabilize the "Lead Time" component of the supply chain.

## 4. The "Dashboard" Experience Requirements
The app must be a focused, **Situational Awareness Dashboard** with the following flow:
1. **The Map View:** A live map centered on the Port of Savannah using Leaflet. Vessels must be color-coded (Green for active, Red for Exceptions >24h).
2. **The Exception Feed:** A sidebar listing only vessels flagged as "Critical Delay" with a timestamp of their arrival at anchor.
3. **The Risk Widget:** A dynamic calculator showing "Total Units at Risk" and "Estimated Daily Loss" across all flagged vessels.
4. **Insights Overlay:** Tooltips or modals explaining the "Bullwhip Effect" and why these specific delays matter to the end customer.

## 5. Technical Constraints
* **Stack:** React, Tailwind CSS, Lucide-React for iconography.
* **Visualization:** Use **Leaflet** for maritime mapping and **Recharts** for tracking congestion trends over time.
* **Package Manager:** ALWAYS use `pnpm` (instead of `npm`) for all installations.
* **API Integration:** Connect to OpenSeaMap or MarineTraffic. Implement a fallback/mock dataset to ensure the UI remains functional if API limits are hit.
* **Deployment:** Ensure `base` path in `vite.config.ts` is configured for GitHub Pages deployment.
