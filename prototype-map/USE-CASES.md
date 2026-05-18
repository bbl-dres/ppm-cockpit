## Use Cases by Segment

Grouped into five natural clusters by where they sit in the early-design flow.

---

### A. Site & Portfolio Strategy
*Pre-design decisions about where and whether to build.*

| ID | Use Case | Description | Goal | Inputs | User Story |
|---|---|---|---|---|---|
| UC-01 | Site Feasibility & Yield Check | Test whether a site can carry a target program within zoning, financial, geometric constraints | Go/no-go decision; defensible pro forma | Site boundary, zoning rules, program brief, cost/rent assumptions, topography | As a portfolio manager, I want to test a site against a program in a day, so that I know whether to commission a full feasibility study |
| UC-13 | Portfolio Densification Screening | Screen a portfolio of sites for densification, addition, or replacement potential | Prioritise planning effort across portfolio | Parcels (GIS / EGID), current footprints & GFA, zoning envelopes, renovation benchmarks | As a portfolio strategist, I want a heat-map of densification potential across 200 federal sites, so that I can recommend the top 20 for detailed studies |

### B. Massing & Option Generation
*Creating and comparing geometric alternatives.*

| ID | Use Case | Description | Goal | Inputs | User Story |
|---|---|---|---|---|---|
| UC-02 | Massing Option Comparison | Generate or import 3–6 massings for the same site and compare across KPIs | Pick the most balanced design among competing criteria | Site context, massing geometries, KPI definitions (GFA, sun, wind, carbon, cost) | As an architect, I want to test five massings against one KPI dashboard, so that I can defend my recommendation to the client |
| UC-03 | Generative Design Exploration | Let the tool generate dozens of valid massing or layout alternatives within rule constraints | Expand option space beyond manual sketching | Site boundary, typology rules, program targets, performance objectives | As a designer, I want to generate 50 site layouts overnight, so that I have a filtered shortlist by morning |
| UC-12 | Floor Plan / Unit Mix Generation | Populate a chosen massing with code-compliant floor plans and unit mixes | Move from massing to SD floor plans in hours, not weeks | Massing volumes, unit-type library, circulation rules, egress / accessibility | As an architect on a multi-family project, I want auto-generated layouts respecting my unit mix and accessibility, so that I can present three viable schemes by Friday |

### C. Environmental & Climate Simulation
*Performance against external conditions — sun, wind, weather.*

| ID | Use Case | Description | Goal | Inputs | User Story |
|---|---|---|---|---|---|
| UC-04 | Sun-Hours & PV Potential | Direct sun on façades, ground, roofs over a year; estimate PV yield | Optimise passive gains, daylight, neighbour impact, PV revenue | Geolocated site, massing + context, EPW file, PV panel parameters | As an architect, I want to verify my courtyard gets 2 h sun on Dec 21 and my roof PV pays back in 12 years, so that I can hit Minergie / SNBS solar targets |
| UC-05 | Wind Comfort Analysis | Assess pedestrian-level wind comfort and identify high-velocity zones | Avoid uncomfortable or unsafe outdoor wind before geometry locks in | Massing + surroundings, local wind rose / EPW, ground-level usage zones | As an urban designer, I want a 2-hour wind screening across five massings, so that I can drop the obvious losers before commissioning detailed CFD |
| UC-06 | Microclimate / Outdoor Thermal Comfort | Combine sun, wind, humidity to compute UTCI / perceived temperature | Design comfortable outdoor spaces; mitigate heat island | Massing + context, vegetation, EPW, surface albedo | As a planner, I want to show my plaza stays under UTCI 32 °C in July, so that the municipality approves the open-space concept |
| UC-08 | Noise Exposure Screening | Estimate façade-level noise exposure from road and rail sources | Identify quiet vs. exposed façades early; inform façade & program placement | Massing + context, traffic/rail source data, terrain | As an architect, I want to know which side gets bedrooms and which gets kitchens, so that I meet LSV / SIA 181 without expensive façade treatment |

### D. Building Performance Simulation
*Indoor performance — daylight, energy, comfort.*

| ID | Use Case | Description | Goal | Inputs | User Story |
|---|---|---|---|---|---|
| UC-07 | Daylight Access (Interior) | Assess daylight autonomy, daylight factor, glare, view-out for interior spaces | Meet daylight standards (SIA 380/4, EN 17037, Minergie-Eco); reduce lighting demand | Massing + windows, room layouts, material reflectances, EPW | As a sustainability consultant, I want to check daylight autonomy on every floor of three façade variants, so that I can recommend the one meeting EN 17037 without oversized windows |
| UC-10 | Operational Energy at Concept | Estimate heating, cooling, lighting demand from massing + envelope + program | Compare envelope, orientation, glazing against SIA 380/1, Minergie | Massing, U-values, WWR, internal loads / schedules, EPW | As a building physicist, I want a quick EUI estimate per option, so that I can flag overheating risk before the façade locks in |

### E. Sustainability, Cost & Decision Support
*Quantifying the option space against money, carbon, and stakeholders.*

| ID | Use Case | Description | Goal | Inputs | User Story |
|---|---|---|---|---|---|
| UC-09 | Embodied Carbon at Concept | Estimate upfront embodied carbon (A1–A5) of structural and envelope options | Compare structural systems when changes are still cheap | Massing volumes, structural assumptions, material datasets (KBOB, EPDs, EC3) | As a sustainability lead, I want a 30-minute carbon comparison of three structural concepts, so that I can steer the workshop toward the lower-carbon option |
| UC-11 | Conceptual Cost Estimation | High-level cost estimate from massing geometry + per-element unit rates | Test whether a design pencils out before SIA Phase 31 | Massing GFA / element quantities, unit-rate library (eBKP-H, BKI), regional cost factors | As a project manager, I want a ±20% cost estimate per option mapped to eBKP-H, so that the steering committee can approve a budget envelope |
| UC-14 | Competition Entry Evaluation | Quantitatively compare architectural competition submissions on common KPIs | Support jury deliberation with comparable, transparent metrics | Submitted geometries (IFC / Rhino / Revit), standardised KPI set (GFA, daylight, carbon, cost, SNBS) | As a competition organiser, I want every entry scored on the same 15 KPIs, so that the jury can focus on qualitative judgment rather than guessing at quantities |

---

The five segments map roughly onto a typical workflow: **A** (where?) → **B** (what shape?) → **C / D** (how does it perform outside / inside?) → **E** (what does it cost in money, carbon, and stakeholder consent?).

Want me to add a sixth column with **typical KPI outputs** (e.g., kWh/m²·a, UTCI °C, kgCO₂e/m², CHF/m² SIA 416), so it slots directly into an Anforderungskatalog?