# Market Screening: Architectural Simulation & Design Tools for Early Design Stages

## TL;DR
- The early-design and project-delivery tooling market spans **~22 segments** along two axes: (a) **stage/scale of design, delivery, and stewardship** (existing-stock screening / urban mining → site/urban → massing → unit layouts → performance simulation → cost/carbon → compliance/handoff → certification/ecology → portfolio/PMO), and (b) **buyer** (architects, real-estate developers, planners, sustainability consultants, civil engineers, QS / cost planners, code consultants, lenders/insurers, certification assessors, ecologists, portfolio/asset-owner PMOs, renovation strategists). The most consolidated battleground is the "BIM 2.0 / browser-native concept design" cluster (Autodesk Forma, Snaptrude, Arcol, Motif, Qonic) where Autodesk's Spacemaker → Forma move has set the integration bar. But the **buyers who block or kill projects** sit outside that cluster — planners, civil engineers, insurers, QS, code consultants, certification assessors, portfolio PMOs, renovation strategists — and they buy from different vendors. **pm-cockpit itself sits in Segment 21 (Enterprise Project Portfolio Management)**, downstream of every other segment, with a natural extension surface into **Segment 22 (refurbishment / urban-mining portfolio screening)** — directly relevant for the federal Sanierungsstrategie workload.
- No single product covers the full functional brief (generative options + per-storey program + solar/wind/microclimate/daylight/noise + embodied carbon + early-stage cost + civil/infrastructure + climate risk + code compliance + circularity + GIS + BIM export). The realistic operating model for BBL is a **stack of 5–8 tools** organised around three decision gates: (i) **can we build here?** (Luucy or Giraffe or ArcGIS Urban + InfraWorks / OpenSite+ + a climate-risk screen) — (ii) **what's the right shape and performance envelope?** (Forma + Rhino/Grasshopper + One Click LCA + Preoptima) — (iii) **does it pencil, comply, and circulate?** (CostX or CostOS + UpCodes/Solibri + Madaster).
- The clearest white spaces are: (1) **regionally-aligned cost taxonomies** (eBKP-H, BKI, DIN 276) — none of the major early-design tools support them out of the box; (2) **integrated multi-KPI dashboards** that combine embodied carbon, operational energy, daylight, cost, and **physical climate risk** against Swiss benchmarks (KBOB, SNBS 2.1, BAFU Gefahrenkarten); (3) **data residency in Swiss-sovereign cloud** — almost every vendor is hosted on US hyperscalers, an ISG / Public Clouds Bund question that should be raised early; (4) **Swiss code/zoning compliance automation** beyond BZO ingestion. **Luucy (Swiss SaaS, swisstopo / ÖREB / BZO integration)** is the only reviewed player that natively addresses (3) and partially closes the zoning gap.
- Regulatory tailwind to keep in view: the **revised EU EPBD** introduces life-cycle Global Warming Potential (GWP) disclosure for **larger new buildings from 2028** and **all new buildings from 2030**. Switzerland is not bound, but EU-aligned procurement (and BBL's own SNBS / KBOB direction) makes this the de-facto baseline. **IFC 4.3** is now published as **ISO 16739-1:2024** and should be the floor for any interoperability requirement. The **RICS Whole Life Carbon Assessment (WLCA) Software Validation Programme (2nd edition, July 2025)** is becoming the credibility test for LCA tools — **One Click LCA** is the first validated platform.

## Key Findings

**Twenty-two market segments identified.** They overlap on functional dimensions but have distinct value propositions, buyers, and competitive sets. Segments 1–12 are the **design-and-performance core**; segments 13–18 are the **adjacent buyer gates** (planning, civil, risk, cost, compliance, circularity, delivery model, mobility) that determine whether a design ever gets built; segments 19–20 are the **outcome / ecology layers** (formal building-label certification, biodiversity / ecological analysis) that increasingly drive procurement requirements; segment 21 is the **portfolio / PMO layer** — the system of record under which all the others are reported, prioritised, and steered; segment 22 is the **existing-stock / refurbishment / urban-mining layer** that operates upstream of new project scoping, on what BBL already owns. **pm-cockpit is a Segment-21 prototype with a natural extension into Segment 22.**

1. Integrated AI early-design / site planning platforms
2. Browser-native concept BIM ("BIM 2.0")
3. Real-estate feasibility & developer-facing tools
4. Generative floor-plan / unit-layout AI
5. Urban / site-scale collaborative planning platforms
6. Parametric urban massing & zoning tools
7. Rhino-Grasshopper environmental simulation ecosystem
8. Specialist wind / CFD / microclimate tools
9. Specialist daylight / energy early-stage tools
10. Early-stage cost & embodied-carbon estimators — split into **10a Cost** (DACH commercial cost-data: BKI, DBD-BIM, Keevalue + global: CostX, CostOS, DESTINI) and **10b Carbon** (One Click LCA, Preoptima, EC3, 2050 Materials)
11. Programmable / developer-platform plays
12. Generative AI rendering / text-to-image for concept
13. **Climate-risk & resilience analytics** (asset-level physical risk)
14. **Civil / infrastructure concept design** (site civil, roads, grading, utilities)
15. **Circularity & material passports**
16. **Code compliance & model checking**
17. **Industrialized / modular housing configurators**
18. **Mobility & pedestrian analytics**

Segments 1 and 2 are converging — Autodesk's announcement of **Forma Building Design** at AU 2025 is a direct response to the BIM 2.0 startups (Arcol, Snaptrude, Motif, Qonic), as covered by Engineering.com and AEC Magazine.

**Major consolidations / shifts:**
- **Spacemaker → Autodesk Forma** (acquired November 2020 for $240M; Spacemaker retired May 2023; existing subscribers migrated to Forma Site Design).
- **Sefaira → Trimble** (acquired February 8, 2016 per Trimble's PRNewswire press release; "Trimble announced today the acquisition of London/New York based Sefaira Ltd., a leading developer of cloud-based software for the design of sustainable and high-performance buildings"; now bundled with SketchUp & Revit plugins).
- **DIVA-for-Rhino → ClimateStudio** (Solemma; DIVA retired, ClimateStudio is the successor for daylight/energy on Rhino 6/7/8).
- **cove.tool → cove** (rebranded January 2025 from software vendor to AI-powered architectural services firm; IP later acquired by ROOST and continued as open source per a July 2025 LinkedIn post by Cove Software).
- **Delve (Sidewalk Labs) → Google** (Sidewalk Labs folded into Google in 2022; Delve was disabled May 2026 with select features integrated into Google Earth per the Sidewalk Labs Wikipedia article).
- **EvolveLAB → Chaos ecosystem** (Veras integrated under Chaos branding).
- **Tally (whole-building Revit LCA) → C.Scale** (April 2026 acquisition per Building Transparency).
- **2050 Materials → Once For All Group** (acquired November 2025 per CEO David Hornsby's statement on onceforall.com: "The acquisition of 2050 Materials marks an important milestone in Once For All's mission to empower the construction industry with data-driven sustainability insights at every stage of a project").
- **JLL ↔ Jupiter Intelligence** strategic expansion (2025) — JLL embedded Jupiter physical climate-risk analytics in CRE workflows, mainstreaming asset-level climate risk in transactions.

**Cloud-first is the dominant trajectory.** Every new entrant since 2020 (Forma, Snaptrude, Arcol, Hypar, Giraffe, TestFit, ARCHITEChTURES, Maket, Finch, DBF, Pollination, **Luucy**, **VU.CITY**, **Preoptima**, **Modulous TESSA**, **Climate X**, **Verifi3D**) launched as SaaS/web. Desktop/plugin holdouts are concentrated in segments 7–9 and 14 (Ladybug, ClimateStudio, ENVI-met, InfraWorks, OpenRoads ConceptStation) where simulation depth, civil-engineering data weight, or host-application integration outweigh cloud convenience.

**Generative AI is fragmented into three families:** (a) **constraint-based generative design** producing valid BIM/geometry (Forma, TestFit, Finch, ARCHITEChTURES, Hypar, Maket, DBF, Modulous TESSA); (b) **diffusion-model image generation** for concept renders (Veras, ARK, ArkoAI, LookX, Midjourney workflows); (c) **text-to-BIM / Copilot** experiments still nascent (Hypar's recent moves, Snaptrude's Copilot, UpCodes Copilot for code research, Preoptima's structural-option Copilot). Only family (a) is decision-ready for federal feasibility studies.

## Details

### Segment 1 — Integrated AI Early-Design / Site Planning Platforms

**Definition.** Cloud platforms that ingest GIS/site context, allow massing creation/import, run a suite of environmental analyses (sun, wind, noise, daylight, embodied carbon, operational energy), and feed a downstream BIM workflow. Differentiator: breadth of integrated analyses + Autodesk-class BIM handoff.

**Persona.** Architects in pre-design / SD; urban developers; municipal planners running competitions.

| Product | Hosting | Pricing | Integrations | Notable |
|---|---|---|---|---|
| **Autodesk Forma Site Design** | Cloud SaaS | $185/mo or $1,445/yr standalone; included in AEC Collection | Revit, Rhino, Dynamo, ACC, IFC/OBJ import | Sun-hours, rapid wind/noise (AI), microclimate, embodied carbon, operational energy |
| **Forma Building Design** (closed beta) | Cloud | TBD | Same Forma cloud layer | Schematic LOD 200–300; facade & interior layouts; GA expected 2026 |

**Maturity.** Mature/consolidating. Forma is the de-facto enterprise default for firms inside the Autodesk ecosystem.

**Competitive dynamics.** Forma's bundle with AEC Collection is a hard price-anchor for competitors. The 2026 March-quarter update of CreativeToolsAI reports **sun hours was the most-used Forma analysis in 2025**, reflecting where the practical adoption sits.

### Segment 2 — Browser-Native Concept BIM ("BIM 2.0")

**Definition.** Multiplayer, browser-based design tools that aim to replace SketchUp + Revit in early phases with a single collaborative model carrying BIM data. Differentiator: real-time co-editing (Figma-like) + native BIM export.

**Persona.** Schematic-design teams, multidisciplinary studios doing client-facing iteration.

| Product | Hosting | Pricing | BIM/Export | Notes |
|---|---|---|---|---|
| **Snaptrude** | Cloud (browser) | Free; Pro $499/yr; Org $1,199/yr; Enterprise quote | Bidirectional Revit, Rhino, IFC, DWG | Real-time BOQ/FAR/GFA; "AI Copilot" |
| **Arcol** | Cloud (browser) | Free solo (no Revit export); Team $100/user/mo | Revit export; presentation Boards | Raised approximately $20M per Arcol's own press page (arcol.io/press): "We have raised approximately $20 million from an incredible roster including Cowboy Ventures, Craft Ventures, Procore CEO Tooey Courtemanche, Figma CEO Dylan Field, and former Mozilla CEO John Lilly." |
| **Motif** | Cloud (browser) | Quote/early access | Connects to Revit/Rhino | Founded by ex-Autodesk co-CEO Amar Hanspal |
| **Qonic** | Cloud (browser) | Quote | IFC, Revit | Belgian, ex-Bricsys team |
| **Autodesk FormIt** | Desktop + Web | Free Pro tier with AEC Collection | Revit Add-in | Older SketchUp competitor; some features now in Forma |

**Maturity.** Emerging. AEC Magazine consistently flags this as an "overheated and over-serviced" segment.

**Competitive dynamics.** All five compete for the same persona; differentiators are depth of BIM data (Snaptrude leads on Revit roundtrip), collaboration UX (Arcol leads), and ecosystem hooks (Motif's leadership pedigree).

### Segment 3 — Real-Estate Feasibility & Developer-Facing Tools

**Definition.** Tools that optimise a parametric site for **yield** (units, GFA, NRSF, parking, pro forma) before architecture begins. Differentiator: financial KPIs (yield-on-cost, NRSF) baked into geometry.

**Persona.** Developers, GCs, architects acting as developer-pitch consultants.

| Product | Hosting | Pricing | Key feature |
|---|---|---|---|
| **TestFit** | Cloud | Site Solver paid (quote); Urban Planner has free tier | Pro forma + automatic parking/earthwork takeoffs; Revit + SketchUp + AutoCAD push |
| **Spacio (spacio.ai)** | Cloud SaaS | Free, Personal, Pro (no public USD) | Norway-centric, Norkart import; IFC/Rhino/SketchUp interop |
| **Giraffe** | Cloud (browser) | Free tier; Core $1,000/yr/user; Portfolio $3,000/yr/user; Enterprise | GIS-first; live pro-forma metrics; IFC export |
| **Archistar** | Cloud | Quote (~$299/mo+ tier reported) | Site-level feasibility; zoning-rule database (AU/NZ/UK) |
| **Zenerate** | Cloud | Enterprise quote | Multi-family yield; Korean origin |

**TestFit also includes conceptual cost estimation** (TestFit 5.4 release: "You can now utilize the geometry created in TestFit to track your costs throughout feasibility and preconstruction quickly… As your model gets updated, the costs will update in real-time"). This is pro-forma-grade, not 5D-estimator-grade.

**Maturity.** Consolidating. TestFit is dominant in US multi-family; Giraffe owns master-planning + GIS niche.

### Segment 4 — Generative Floor-Plan / Unit-Layout AI

**Definition.** AI engines that take a massing or boundary + program brief and emit valid floor plans (units, circulation, code compliance).

**Persona.** Architects in early SD for multi-family / mixed-use; developer-architects.

| Product | Hosting | Pricing | Output |
|---|---|---|---|
| **Finch 3D** | Cloud (browser + Rhino/Revit/GH plugins) | Free; Basic €49/mo; Enterprise €12,000/yr for 3 seats | Graph-rule based; Revit/Rhino/GH; AI floor-plan generation gated to Enterprise/AI tier |
| **ARCHITEChTURES** | Cloud (browser) | 7-day trial; quote-based | Real-time BIM model, parking layout, IFC + DXF; cost takeoff with user-input unit cost |
| **Maket.ai** | Cloud | Free 50 credits; Pro $20/mo (300 credits) — v2 released 2025 per illustrarch | Residential 1–4 stories; DWG/DXF export "coming soon" |
| **PlanFinder** | Cloud | Quote | Apartment layout AI, Rhino plugin |
| **ArkDesign.ai** | Cloud | $30–$150/mo individual | Residential layouts |

**Maturity.** Emerging. Output quality varies; per illustrarch's 2026 review, "spatial logic errors are common" — manual review remains required.

### Segment 5 — Urban / Site-Scale Collaborative Planning Platforms

**Definition.** Web platforms that fuse GIS + design + scenario analytics for urban-scale projects, often used by municipalities and master-planners. This segment is where the **planner / municipality buyer** lives, and is the gate at which schemes are approved or refused before architecture begins.

| Product | Hosting | Pricing | Notable |
|---|---|---|---|
| **Giraffe** | Cloud | $1,000–$3,000/user/yr | GIS-first; live metrics; IFC export |
| **Luucy** | Cloud SaaS (Swiss-based vendor, Zug/CH) | Free trial "ohne Kreditkarte oder Vertrag"; commercial tiers via quote | **Swiss-native.** Parametric massing + Baupotential analysis; ingests ÖREB (cadastral restrictions), BZO (zoning), swisstopo terrain and survey layers as first-class data; auto-calculated GFA / density / volumes; variant comparison; 2D + 3D layer composition. Reported user base: 150 clients / 6,000 users / 15,000 projects. Partnership with swisstopo. **No BIM (IFC/Revit) roundtrip and no embodied-carbon / cost-taxonomy (eBKP-H/KBOB) modelling advertised today** — verify at procurement. |
| **Esri ArcGIS Urban** | Cloud (Esri) | ArcGIS quote-based | Formal zoning / parcel / land-use / public-engagement workflows; the most planner-grade product on the list; companion to CityEngine |
| **Esri CityEngine** | Desktop (Win/Linux) + ArcGIS Pro | $2,200/yr (Pro subscription) or $4,200/yr (Pro Plus) per CG Channel — perpetual licenses discontinued June 2025 | Procedural CGA shape grammars; no environmental sim; FBX/USD/Datasmith exports |
| **VU.CITY** | Cloud (browser + apps) | Quote (city-coverage-based) | 3D city-context twin for planning communication; SiteSolve module for site feasibility within accurate city models. Coverage is **city-by-city** — verify Swiss city coverage before relying on it. |
| **UrbanFootprint** | Cloud | Quote-only | US-focused parcel/scenario analytics for utilities, planners, real estate |
| **Cityzenith SmartWorldOS** | SaaS + on-prem | Quote | Digital-twin platform; **status uncertain** — investor commentary suggests an asset transfer to "TwinUp" entity; verify before procurement |
| **Delve (ex-Sidewalk Labs)** | — | — | **Discontinued** — disabled May 2026; features partially folded into Google Earth |
| **Cityform Lab (MIT) — UNA toolbox** | Free Rhino + ArcGIS plugin | Free / open-source | Pedestrian-route, accessibility, street-network analysis; research tool |

**Swiss-context note.** **Luucy** is the only segment-5 player with native, productised integration of Swiss federal/cantonal geodata (swisstopo, ÖREB-Kataster, BZO). **ArcGIS Urban** is the global benchmark for formal planning workflows but is buyer-configured for Swiss data. Giraffe accepts arbitrary GIS layers and can be made to consume swisstopo WMS/WFS, but the alignment is buyer-side. **VU.CITY** is mainly relevant if a city has been modelled — its Swiss footprint must be confirmed.

### Segment 6 — Parametric Urban Massing & Zoning Tools

**Definition.** Plugin-based or lightweight tools that drive zoning-compliant massing in a host modeller (SketchUp, Rhino).

| Product | Host | Pricing | Notable |
|---|---|---|---|
| **Modelur** | SketchUp + Rhino plugin | Subscription, USD-based, not publicly listed | Excel LiveSync; CSV/DXF/IFC/KMZ exports; AgiliCity (Ljubljana) |
| **Urbano** | Rhino/Grasshopper | Quote/educational | Network/flow analysis for urban design |
| **Digital Blue Foam (DBF)** | Cloud + DBF Hub desktop | "Custom-made" enterprise pricing | DBF Hub syncs to Revit, Archicad, Rhino; multi-source GIS; AI generative design |

> **Note.** Luucy overlaps with this segment functionally (parametric massing + zoning rule application) but is positioned as a standalone web platform, not a plugin — see Segment 5.

### Segment 7 — Rhino-Grasshopper Environmental Simulation Ecosystem

**Definition.** Open-source / freemium tools running inside Rhino + Grasshopper that bring climate, daylight, energy, CFD into a parametric workflow. The de-facto standard in academic and high-performance consulting practice.

| Product | Pricing | Engine | Coverage |
|---|---|---|---|
| **Ladybug** | Free / open-source | Custom | Weather, sun, radiation, comfort |
| **Honeybee** | Free / open-source | Radiance + OpenStudio/EnergyPlus | Daylight, energy |
| **Butterfly** | Free / open-source | OpenFOAM | CFD/wind |
| **Dragonfly** | Free / open-source | URBANopt | Urban energy |
| **Pollination Cloud** | Subscription (publicly listed on pollination.solutions) | Cloud + Rhino + Revit + GH plugins | Native export to EnergyPlus/eQuest/OpenStudio/IES-VE/DesignBuilder/IDA-ICE; gbXML/IFC |
| **ClimateStudio (Solemma)** | Subscription, free trial; commercial + educational tiers | RADIANCE + EnergyPlus | Daylight, glare, energy, comfort; LEED/BREEAM/EN 17037 compliance; Revit-to-Rhino exporter |
| **DIVA-for-Rhino** | Retired (no new sales) | — | Predecessor to ClimateStudio |

**Maturity.** Mature. This is the most credible analytical stack for a federal real-estate organisation that prioritises method transparency and standards alignment.

### Segment 8 — Specialist Wind / CFD / Microclimate Tools

| Product | Hosting | Pricing | Notable |
|---|---|---|---|
| **Orbital Stack** | Cloud | Credit-based subscriptions (6-month minimum); AI sims + Rapid CFD credits | RWDI-backed; designed for early design |
| **SimScale** | Cloud (browser) | Subscription tiers (publicly listed on simscale.com) | General CFD + structural; AEC pricing tier |
| **ENVI-met** | Desktop | Subscription tiers (publicly listed on envi-met.com) | Microclimate / urban heat / vegetation |
| **Autodesk CFD** | Desktop | $1,915/yr (per current Autodesk pricing surveys) | General-purpose CFD; building & MEP |

### Segment 9 — Specialist Daylight / Energy Early-Stage Tools

| Product | Hosting | Pricing | Notable |
|---|---|---|---|
| **ClimateStudio** | Rhino plugin | Subscription | Best-in-class daylight/glare speed; LEED/EN 17037 |
| **Sefaira (Trimble)** | Cloud + SketchUp + Revit plugins | Subscription via Trimble (publicly listed on trimble.com) | Annual energy + daylight; HVAC sizing |
| **Autodesk Insight** | Revit-native + cloud | Included with AEC Collection | Revit-integrated performance and total-carbon analysis; the "in-Revit" alternative to Forma for firms whose authoring lives in Revit |
| **IES VE early-stage** | Desktop/cloud | Quote | Full TM52/TM54 compliance |
| **VELUX Daylight Visualizer** | Desktop | Free | Daylight factor; quick studies |

### Segment 10 — Early-Stage Cost & Embodied-Carbon Estimators

**Definition.** Tools that convert early geometry into **cost** estimates or **embodied-carbon** estimates. These were originally bundled as one segment, but they sell to **different buyers** (QS / project controls / Bauherrenvertretung vs. sustainability consultants / Nachhaltigkeitskoordinatoren), use **different data taxonomies** (DIN 276 / eBKP-H / BKI Kennwerte vs. EN 15978 / ISO 14040 / KBOB), and consolidate at **different speeds**. This subsection is therefore split into **10a — Cost** and **10b — Embodied Carbon**. Both are exposed to the **EU EPBD 2028 / 2030 GWP disclosure regime** at the carbon end and to procurement-level cost transparency rules at the cost end. The Swiss **eBKP-H / SIA 416 / KBOB gap** lives across both halves.

#### Segment 10a — Early-Stage Cost Estimators

**Persona.** Quantity surveyors, cost consultants, Bauherrenvertretung, federal/canton project managers, architects in SD-stage cost-checks. In DACH the buyer is often the **Architektenkammer-affiliated cost-data buyer** (BKI subscriber) or the **BIM-coordinator-driven cost-modelling buyer** (DBD-BIM, CostX).

| Product | Type | Origin / Coverage | Hosting | Pricing | Notes |
|---|---|---|---|---|---|
| **TestFit** | Pro forma + takeoffs | US | Cloud | Subscription | See Segment 3; pro-forma-grade, not 5D-estimator-grade |
| **Beck Technology DESTINI Estimator** | 2D/3D takeoff + estimating | US | Cloud (SOC 2) + legacy desktop | Quote-only ("Call us for a license quote") | GC/preconstruction focus; **DESTINI Profiler** is the conceptual 5D companion ("combining 3D modeling with pricing… allows the clients to visualize in 5D", constructiontechreview.com) |
| **RIB CostX (iTWO)** | 5D BIM takeoff/estimating | Global (RIB / Schneider) | On-prem + SaaS | Quote-only (no free version per TrustRadius) | IFC + RVT; "world-leading 6D BIM solution… also supports the EC3 carbon rate library from Building Transparency" (rib-software.com) |
| **Nomitech CostOS** | Feasibility → detailed estimating | Global | Cloud + desktop | Quote | GIS / 2D / BIM estimating continuum; **classification-flexible engine** — the most likely commercial product to be re-configurable to eBKP-H |
| **BKI Baukosteninformationszentrum** | Cost-data publisher + planning software | Germany (architect-chamber affiliated, Stuttgart) | Desktop + emerging web (KoRa, launching June 2026) | Tiered: free test versions; publications €92–€1,247+ (7–19% VAT) | **BKI Kostenplaner** is the de-facto Architektenkammer cost-planning tool in DE; **BKI Objektdaten** is the canonical building-cost reference database; uses **DIN 276**. Companion tools: **BKI Energieplaner** (GEG), **BKI Honorarermittler** (HOAI), **BKI IFC-Mengenermittler** (BIM takeoff). Austrian regional factors available; not natively Swiss but DIN 276 → eBKP-H mapping is well-trodden in DACH practice. |
| **DBD-BIM (Dynamische BauDaten)** | BIM-based cost-data platform | Germany (Dr. Schiller & Partner / DBD) | Online + offline variants | Free 7-day test; commercial tiers via quote | "Bauteile suchen, detailliert beschreiben und mit dem Modell verknüpfen" — searches building components, configures them with technical attributes, links to the BIM model with **DIN 276** cost structure, **STLB-Bau** VOB-compliant specifications, and **DIN BIM Cloud** attribute standards. Real-time cost recalculation as properties change. Integrates with 24+ AEC applications. |
| **Keevalue** | Baukostenschätzung / Baukostenberechnung | **Switzerland** | Cloud SaaS (CH vendor) | Not publicly listed | Marketed as cost estimation and cost calculation **"Für Architekten, Bauherren & Co."** Swiss-domiciled vendor, which makes it a natural counter-party to Luucy on the cost layer — verify eBKP-H / SIA 416 alignment, hosting region, and BIM intake at procurement. |

**Non-exhaustive.** The DACH cost-data market has many smaller specialised vendors (NPK / CRB element catalogues, pom+ services, cantonal building-cost portals, in-house Excel-based Kennwert databases at the larger Generalplaner) that are not productised as platforms. A Swiss-specific cost-tooling diligence pass should be expected to surface 5–10 additional candidates beyond this list.

**Critical Swiss-cost gap for BBL.** None of the above are **natively** eBKP-H-aware out of the box. The four most realistic paths to a Swiss-aligned cost stack today are: (a) **BKI** for DIN 276 cost references + an internal DIN 276 → eBKP-H mapping table (DACH-practice standard); (b) **DBD-BIM** if the BIM model is mature enough to drive component-level costs; (c) **CostOS** because its classification engine is flexible enough to host a custom eBKP-H structure; (d) **Keevalue** as a Swiss-native candidate to be evaluated first for any new SD-stage cost workflow. **CostX** is the safer choice when BIM-takeoff fidelity matters more than Swiss-classification fluency.

#### Segment 10b — Embodied-Carbon Estimators & Optioneering

**Persona.** Sustainability consultants, Nachhaltigkeitskoordinatoren, architects with sustainability responsibility, ESG-driven owner reps. The buyer is increasingly the **owner** under EPBD 2028 / 2030.

| Product | Type | Hosting | Pricing | Notes |
|---|---|---|---|---|
| **One Click LCA** | Whole-building LCA + Carbon Designer 3D | Cloud SaaS + plugins | Subscription, quote-based (Carbon Designer 3D bundled with Designer tier+) | Revit, Rhino+GH, Tekla, IES-VE, DesignBuilder, IFC, Forma extension; EN 15978/15804, ISO 14040/14067, **RICS WLCA validated** (1st in world, July 2025), EU Level(s), DGNB |
| **Preoptima** | Concept-stage carbon optioneering | Cloud SaaS | Subscription / quote | **Decision-centric** carbon comparison of structural / envelope options at concept stage (timber vs. hybrid vs. concrete) with real-time feedback; complements One Click LCA rather than replacing it |
| **Building Transparency EC3** | Upfront A1–A3 embodied-carbon (EPD-based) | Cloud (free) | Free + open access ("the only free and open-access global embodied carbon accounting tool" — buildingtransparency.org) | tallyCAT Revit plug-in (free); integrates with ACC, Procore, cove.tool, One Click LCA |
| **2050 Materials** | Materials sustainability data + API | Cloud + REST API | Free web + commercial API | 150,000+ products, 100,000+ EPDs; acquired by Once For All Group in November 2025 |
| **cove (ex-cove.tool)** | AI services + IP | Cloud | Service fees | IP acquired by ROOST and continued as open source per Cove Software's July 2025 LinkedIn post |

**Materials / Reference-Data Layer (not estimators, but feed both 10a and 10b).** A handful of catalogues sit alongside the estimator tools as authoritative **product / material reference databases**. They are *data layers*, not cost or carbon engines:

| Source | Origin | What it is | Use in BBL stack |
|---|---|---|---|
| **werk-material.online** | Switzerland | Swiss building-materials database (product catalogue, not a cost estimator) | Reference layer for materials selection, specification, and downstream LCA/cost work; cross-link with 2050 Materials, KBOB, and Madaster |
| **KBOB Ökobilanzdaten** | Switzerland (federal) | Authoritative Swiss LCA dataset (Ökobilanzdaten im Baubereich) | The reference dataset One Click LCA / Preoptima / Bauteilkatalog must speak to be defensibly "Swiss" |
| **Bauteilkatalog / Lesosai** | Switzerland (BFE / academic-industrial) | KBOB-aligned building-element LCA datasets | The de-facto fallback when an international LCA tool can't natively load KBOB |

**Critical Swiss-carbon gap for BBL.** **One Click LCA + a custom KBOB dataset** is the closest plug-and-play candidate; the KBOB alignment is the buyer's responsibility. **Preoptima** accelerates structural option-comparison upstream but is not KBOB-native. For circular / residual-value tracking, the answer is **Madaster Switzerland** (Segment 15), not a Segment-10b product. **Luucy does not currently advertise embodied-carbon output**, so it does not close this gap even though it owns the upstream Swiss geometry/zoning layer.

### Segment 11 — Programmable / Developer-Platform Plays

**Definition.** Cloud platforms that expose a generative-design API/SDK so firms can encode their own logic.

| Product | Hosting | Pricing | Notable |
|---|---|---|---|
| **Hypar** | Cloud | Free / Pro / Enterprise tiers (publicly listed on hypar.io) | C#/Python functions; Revit/Rhino/IFC/DWG export; $8.28M total raised across 4 rounds; the most recent was a $5.5M Series A on June 22, 2023, led by Brick & Mortar Ventures with participation from Building Ventures (per PR Newswire and Tracxn/PitchBook funding records); bundled "workplace planner" sector app |
| **Speckle** | Cloud + self-host (open source) | Free / Workspaces (paid) | Data hub / connectors across BIM apps; Speckle Automate beta |
| **ShapeDiver** | Cloud | Subscription tiers (publicly listed on shapediver.com) | Grasshopper-as-a-service web embedding |

### Segment 12 — Generative AI Rendering / Text-to-Image

**Definition.** Diffusion-model image generators producing concept renderings from massing geometry or text prompts. Not analytically rigorous; presentation/ideation only.

| Product | Hosting | Pricing | Hosts |
|---|---|---|---|
| **Veras (EvolveLAB, now Chaos)** | Plugin + web | $149/yr student tier listed; commercial subscription | Revit (2021–2026), SketchUp (2021–2025), Rhino 7/8, Forma (Web), Archicad 28, Vectorworks 2024/25 |
| **ARK / ArkoAI** | Plugin | Subscription tiers (publicly listed on arko.ai) | Revit, SketchUp |
| **LookX, ArchiVinci** | Web | Freemium | Web-based |
| **Midjourney / Stable Diffusion / DALL·E** | Web | Various | Generic; widely used as workaround |

### Segment 13 — Climate-Risk & Resilience Analytics

**Definition.** Asset-level physical climate-risk analytics — flood, wind, heat, wildfire, subsidence — used to underwrite, insure, finance, and disclose. A scheme can be financeable in form but unfinanceable in insurance/risk terms; this segment is now an entry-stage diligence gate, not a post-design afterthought.

**Persona.** Real-estate investors, lenders, insurers, ESG / portfolio teams. Increasingly architects and project managers as resilience features are required by clients or by EU/Swiss disclosure rules.

| Product | Hosting | Pricing | Notable |
|---|---|---|---|
| **Climate X** | Cloud SaaS | Quote | CRE-oriented asset-level physical-risk analytics |
| **Jupiter Intelligence** | Cloud SaaS | Quote (enterprise) | Portfolio + compliance workflows; strategic relationship with JLL expanded in 2025 |
| **First Street** | Cloud + API | Quote; some asset-level freemium lookup | Property-level risk and financial-impact screening; deepest US data, increasing global coverage |

**Swiss-context note.** Authoritative Swiss climate-hazard data lives in **BAFU Gefahrenkarten** (cantonal hazard maps), **CH2018 scenarios**, and the cantonal Naturgefahren-Portale. Vendors above typically rely on global hazard models; for federal-portfolio diligence they should be cross-referenced against BAFU and cantonal sources rather than treated as ground-truth. **No vendor reviewed makes BAFU data first-class.**

### Segment 14 — Civil / Infrastructure Concept Design

**Definition.** Conceptual modelling of site civil works — access, grading, earthworks, stormwater, utilities, road corridors — that often determine site feasibility before architecture begins.

**Persona.** Civil engineers, land-development engineers, public-infrastructure owners. Increasingly invoked by federal PMs and architects on constrained sites (steep terrain, brownfields, dense utility right-of-ways).

| Product | Hosting | Pricing | Notable |
|---|---|---|---|
| **Autodesk InfraWorks** | Desktop + cloud | Included in AEC Collection | Concept-stage civil + transportation + utility context modelling; Revit and Civil 3D handoff |
| **Bentley OpenSite+** | Desktop + cloud | Quote | AI-assisted land-development site design; grading and stormwater focus |
| **Bentley OpenRoads ConceptStation** | Desktop | Quote | Early roadway / bridge concepting with traffic-aware logic |

**Why it matters for BBL.** Federal sites with difficult access, steep grading, or constrained utilities can be ruled out — or have their cost envelope blown — before any architectural concept matters. None of the design-stack tools (Forma, Giraffe, Luucy) replace civil concept modelling.

### Segment 15 — Circularity & Material Passports

**Definition.** Platforms that catalogue and value the material composition of buildings to enable reuse, residual-value calculation, and circularity reporting.

**Persona.** Public owners (esp. federal / cantonal), ESG-driven private owners, circular-construction consultancies. Complements but does not replace LCA tools (Segment 10).

| Product | Hosting | Pricing | Notable |
|---|---|---|---|
| **Madaster** | Cloud, multi-region incl. **Madaster Switzerland** | Subscription / quote | Material passports, circularity index, environmental impact, residual-value; IFC + Excel intake; Swiss platform operated locally |

**Why it matters for BBL.** Swiss federal direction on circular economy (Bundesrat Aktionsplan Kreislaufwirtschaft) is pushing public owners toward building-level material accounting. Madaster is the only mature productised player with an explicit Swiss platform; the alternative is a custom Speckle / Rhino / KBOB workflow.

> **Cross-reference.** Segment 15 covers material passports **per project, during and after construction**. The **portfolio-scale "should we refurbish, deep-retrofit, or demolish?" screening question** — including upstream urban-mining estimation on existing stock — is a different buyer journey and is handled in **Segment 22 (Refurbishment / Renovation Portfolio Screening & Urban Mining)**.

### Segment 16 — Code Compliance & Model Checking

**Definition.** Tools that automate code research (text → applicable rules) and model checking (geometry → rule violations).

**Persona.** Architects (code research), BIM coordinators (model validation), specialist code consultants.

| Product | Hosting | Pricing | Notable |
|---|---|---|---|
| **UpCodes / UpCodes Copilot** | Cloud (browser) | Subscription tiers | Jurisdiction-specific AI code research; US-centric coverage today |
| **Verifi3D** | Cloud (browser) | Quote | BIM model validation; rule-based IFC checking |
| **Solibri** | Desktop + cloud | Subscription | Mature rule-based model checking; widely used in EU; supports custom rulesets |

**Swiss gap.** None of the international code tools natively cover **SIA norms** or cantonal building regulations (BZO/BNO). Solibri's strength is its configurability — Swiss rulesets are theoretically achievable but a buyer-side build. **Luucy** partially handles BZO at the zoning envelope layer only, not at the building-code layer.

### Segment 17 — Industrialized / Modular Housing Configurators

**Definition.** Generative platforms producing code-compliant multifamily schemes built around an industrialized kit-of-parts, with cost, carbon, and BIM outputs in a single run.

**Persona.** Multifamily developers, public-housing programmes, modular-construction firms. For BBL specifically, relevant only for repeatable typologies (asylum reception, border-guard housing, federal staff housing) — not for heritage / specialist federal buildings.

| Product | Hosting | Pricing | Notable |
|---|---|---|---|
| **Modulous TESSA** | Cloud | Quote | Generates optimized multifamily schemes with cost plans, A1–A3 carbon metrics, Revit / IFC exports |

### Segment 18 — Mobility & Pedestrian Analytics

**Definition.** Transport-demand modelling and pedestrian/crowd capacity simulation at area, campus, or facility scale.

**Persona.** Transport planners, urban designers, large public-facility owners (stations, museums, campuses).

| Product | Hosting | Pricing | Notable |
|---|---|---|---|
| **PTV Visum** | Desktop | Subscription | Macroscopic transport-demand modelling; public-sector standard in Switzerland and EU |
| **Bentley LEGION** | Desktop / cloud | Quote | Pedestrian / crowd simulation for stations and dense nodes |

**Relevance for BBL.** Specialist; invoked for federal projects with significant public flow (e.g. SBB station-adjacent buildings, large administrative campuses). Not a default in the early-design stack.

### Segment 19 — Building Sustainability Certifications & Labels

**Definition.** Tooling that supports formal building-label certification — workflow management, criteria evidence, scorecard tracking, and assessor-facing submissions. Distinct from Segment 10b (carbon estimators) and Segment 9 (energy tools), which **feed** certifications but do not themselves certify. The buyer is the certification assessor, the Nachhaltigkeitskoordinator, or the owner under EU EPBD / federal sustainability requirements.

**Persona.** Sustainability consultants pursuing certification credits, certification assessors, owner sustainability leads, project teams targeting Minergie / SNBS / DGNB / LEED / BREEAM.

| Label / System | Operator | Tooling shape | Notes |
|---|---|---|---|
| **SNBS Hochbau 2023.1** | **NNBS** (Netzwerk Nachhaltiges Bauen Schweiz), supported by BAFU, ASTRA, BAG, BFE, armasuisse, KBOB | Document-based criteria scorecard; registration and information via **snbs-hochbau.ch** (Anmeldung); no advertised end-to-end digital certification platform | The de-facto federal Swiss sustainability standard. **Already in use by KBOB / armasuisse** — directly relevant for BBL. Verify whether NNBS publishes a 2026 or 2027 digital platform update. |
| **Minergie / Minergie-Eco / Minergie-A / Minergie-P** | Verein Minergie | Online certification portal via **minergie.ch**; module-based application workflow; SIA 380/1 alignment | Swiss energy + (for Eco) ecology + materials anchor; federal buildings routinely Minergie-certified at minimum. |
| **DGNB System** | Deutsche Gesellschaft für Nachhaltiges Bauen | DGNB criteria matrix (Excel-based historically; web tooling expanding); independent assessor model | German federal benchmark; DGNB criteria fed by **One Click LCA** for life-cycle parts. Used in DACH cross-border procurement. |
| **LEED v4 / v4.1** | USGBC + GBCI | **LEED Online** web platform — full submission, review, scorecard, certification workflow | Global benchmark; mostly used for international-corporate or US-aligned procurement. Not Swiss-federal default. |
| **BREEAM** | BRE Global (UK) + national operating partners | **BREEAM Projects** / BREEAM In-Use platforms; assessor-driven submissions | EU-common; UK-dominant. Less common in Swiss federal procurement. |
| **WELL Building Standard** | International WELL Building Institute (IWBI) | **WELL Online** portal; v2 scorecard + post-occupancy verification | Health/wellness focus; complements (not replaces) LEED/DGNB. |
| **EDGE** | IFC / World Bank Group | Browser-based EDGE App (free) for emerging-market efficiency certification | Mostly used outside DACH. Listed for completeness. |
| **GRESB** | GRESB BV | Annual portfolio-level ESG benchmarking platform | **Portfolio-scale**, not project-scale. Relevant if BBL benchmarks its real-estate ESG performance externally. |
| **EU Level(s)** | EU Commission (DG ENV) | Framework + indicator set (not a software product); fed by One Click LCA, Madaster, others | The EU's common sustainability-reporting framework feeding national codes; reference, not a buyable tool. |

**Cross-references.** **One Click LCA**, **EC3**, **Sefaira**, **ClimateStudio**, **Madaster**, and **2050 Materials** all *feed* certifications — they are tools the certification platforms accept as evidence sources. **No general-purpose "certification meta-platform" exists** that aggregates submissions across SNBS + DGNB + LEED + Minergie; each label is its own ecosystem.

**Swiss-context note.** For BBL the relevant labels are, in approximate order of federal weight: **Minergie / Minergie-Eco**, **SNBS Hochbau 2023.1**, and **DGNB** for cross-border / DACH-procurement projects. **LEED and BREEAM** are mostly relevant when BBL participates in international competitions or hosts an international tenant. SNBS tooling is currently document-based; a 2026+ digital platform should be tracked as a watch-list item.

### Segment 20 — Biodiversity & Ecological Analysis

**Definition.** Tools that quantify and improve biodiversity / ecological outcomes at the site or portfolio level. Genuinely **emerging** — most biodiversity work in AEC is still **consultant-led ecology** with internal spreadsheets, not productised tooling. The most-codified piece is the UK statutory **Biodiversity Net Gain (BNG)** regime (Environment Act 2021, statutory from 2024) which has spawned the first generation of commercial calculators.

**Persona.** Ecologists, landscape architects, sustainability consultants, public-realm planners. For BBL, mostly relevant via **SNBS / Minergie-Eco ecology criteria** and federal **NHG (Natur- und Heimatschutzgesetz)** obligations.

| Tool / Resource | Origin | Type | Notes |
|---|---|---|---|
| **Defra Statutory Biodiversity Metric** | UK government (Defra) | Free downloadable Excel calculator | The official UK BNG calculation tool, statutory since 2024. Cited globally as the reference metric. |
| **Cundall BNG Tool** (and similar from Buro Happold, WSP, Arup) | UK consultancies | Proprietary calculators built on Defra metric | Used by consultants delivering BNG-bound projects; not generally licensed externally. |
| **ENVISION** | ISI (Institute for Sustainable Infrastructure) | Sustainability rating framework for infrastructure incl. ecology criteria | Project-rating framework; mostly used in North-American civil/infra. |
| **IUCN STAR metric** | IUCN | Species-Threat-Abatement-and-Restoration metric | Scientific reference for biodiversity-loss / restoration scoring; consumed by some corporate ESG tooling, not a productised AEC tool. |
| **iNaturalist / GBIF / InfoSpecies (CH)** | Public / CC ecology data | Species occurrence databases | Reference data layers, not tools; **InfoSpecies** is the Swiss federal data clearing house. |
| **BAFU Biotoptypen / ÖREB-Naturwerte layers** | Switzerland (federal) | GIS data layers (via swisstopo / cantonal portals) | Authoritative Swiss biodiversity baselines for site-level assessments. |
| **TNFD-aligned platforms (emerging)** — e.g. NatureAlpha, ESG Book, S&P Nature & Biodiversity Risk | Multiple | Portfolio-/corporate-level nature-risk analytics | Aimed at investor disclosure (TNFD framework), not project design. |

**Maturity.** Emerging. The AEC market lacks a Forma-grade productised biodiversity tool today. Consultant-led ecology assessment remains the norm in Switzerland, supported by GIS overlays from **BAFU**, **InfoSpecies**, and cantonal Naturschutz portals. Productisation is likely to follow if/when Switzerland adopts a statutory BNG-equivalent or as TNFD disclosure becomes a federal-procurement requirement.

**Swiss-context note.** For BBL today, **biodiversity sits inside SNBS / Minergie-Eco criteria and NHG-compliance assessment**, not in a dedicated tool. The realistic two-year posture is (a) commission consultant-led ecology assessments per project, (b) layer **InfoSpecies / BAFU biotope** data on top of Luucy or Giraffe / ArcGIS Urban as a GIS overlay for screening, (c) track TNFD and the EU Nature Restoration Law for emerging procurement-disclosure requirements.

### Segment 21 — Enterprise Project Portfolio Management (EPPM) for Real Estate

**Definition.** Portfolio- and PMO-grade systems of record that track projects across an entire owner portfolio: status, SIA phase, milestones, risks, cost, schedule, resources, KPIs, and reporting up to executive / political stakeholders. Distinct from segments 1–20 (project-level tools) — this is the **system of record above them**.

**Persona.** Owner Bauherrenvertretung, public-sector PMOs, real-estate portfolio managers, Generalplaner managing many simultaneous projects, federal political-reporting users.

| Product | Hosting | Pricing | Notable |
|---|---|---|---|
| **Oracle Primavera P6 + Unifier + Aconex** | Cloud + on-prem | Enterprise quote | Global enterprise / government default for capital-projects portfolio management; deep schedule + risk + cost + contract administration. The benchmark for public-sector capital programmes. |
| **Microsoft Project / Project for the Web / Project Online** | Cloud (M365) + on-prem | M365 licensing tiers | Default in any Microsoft-shop organisation; lower ceiling than Primavera but adequate for mid-sized portfolios. |
| **Procore Capital Projects + Portfolio Financials** | Cloud SaaS | Enterprise quote | Construction-native PMO; strong on schedule/cost/issue tracking; weaker on early-design and KPI dashboards. |
| **Autodesk Construction Cloud (ACC) — Cost / Build / BIM Collaborate** | Cloud SaaS | Subscription | Autodesk's portfolio play; tightly integrated with Revit + Forma; portfolio dashboards expanding. |
| **InEight** | Cloud SaaS | Enterprise quote | Capital-project portfolio management; strong on cost-and-schedule integration; large infrastructure-owner footprint. |
| **Planview / Sciforma / Cora PPM** | Cloud SaaS | Enterprise quote | Generic enterprise PPM platforms; Cora PPM has notable UK/EU public-sector adoption (e.g. defence, infrastructure). |
| **Asta Powerproject (Elecosoft)** | Desktop + cloud | Quote | UK construction-PMO favorite; schedule-strong. |
| **PMWeb** | Cloud + on-prem | Enterprise quote | Capital-projects PMO with cost + risk + portfolio; common in Middle-East / public-sector procurement. |
| **Smartsheet / Monday.com / Wrike / ClickUp** | Cloud SaaS | Per-user subscriptions | Lightweight PPM; widely used at smaller scale but not capital-project-grade for federal portfolios. |
| **OpenProject** | Cloud + on-prem (open source) | Free / Enterprise tiers | Open-source PPM; the EU-region self-hostable option (German vendor) for sovereignty-sensitive deployments. |
| **Custom / federal "Cockpit" tools** — incl. **pm-cockpit (this project)** | Varies | n/a | Many public administrations build their own thin portfolio dashboards on top of SAP / Excel / GIS data when commercial PPM is over-spec. This prototype is in that pattern. |

**Cross-references.** Segment 21 is the **downstream consumer** of every other segment's outputs:
- Segment 5 (Urban / Luucy / ArcGIS Urban) — feeds **site / parcel / portfolio geometry**.
- Segment 10a (Cost — Keevalue / BKI / DBD-BIM / CostX / CostOS) — feeds **portfolio cost / investment KPIs** (Anzahl Projekte, Investition CHF).
- Segment 10b (Carbon — One Click LCA / Preoptima) — feeds **portfolio embodied-carbon KPI** (relevant for EPBD 2030).
- Segment 13 (Climate risk — Climate X / Jupiter) — feeds **portfolio resilience / CapEx-reserve scoring**.
- Segment 15 (Madaster) — feeds **portfolio residual-value / material-passport KPIs**.
- Segment 19 (Certifications) — feeds **portfolio SNBS / Minergie / DGNB coverage KPIs**.

**Swiss-context note.** Swiss federal real-estate (BBL, armasuisse Immobilien, ETH-Rat) has a mix of (a) **SAP-based controlling** at the financial-system layer, (b) historically **bespoke cantonal / federal tools** at the project-portfolio layer, and (c) emerging **Cockpit-style dashboards** (like this prototype) that surface project KPIs to political stakeholders. Commercial EPPM vendors (Primavera, Planview, Procore, InEight) are competitively positioned for federal procurement but face the same **data-residency / Public Clouds Bund** scrutiny as any other SaaS. **OpenProject** is the most defensible EU-region self-hostable option if sovereign hosting becomes a procurement gate.

**Critical insight for pm-cockpit specifically.** A custom Cockpit only earns its position against a commercial EPPM platform if it (a) integrates Swiss-specific data layers the commercial tools don't speak (swisstopo, ÖREB, KBOB, eBKP-H, SNBS), and (b) presents a leaner, federal-political-stakeholder-grade view than the commercial tools' generic dashboards. The current prototype's strong points (German-language UI, BBL-specific KPIs, SIA-phase awareness, Bauprojekte vocabulary, embedded MapLibre map) are exactly the differentiation pattern.

### Segment 22 — Refurbishment / Renovation Portfolio Screening & Urban Mining

**Definition.** Tooling that answers two adjacent owner questions **upstream of any project**: (a) *across our portfolio, which buildings should we refurbish, deep-retrofit, or demolish — and in what order?* and (b) *if we do demolish or strip back, what materials can be recovered (urban mining), at what value, with what CO₂ avoidance?* This is distinct from Segment 15 (per-project material passports during construction) and Segment 10b (per-project embodied carbon) — it operates **before** projects are scoped, at portfolio scale, on the **existing built stock**.

**Persona.** Owner Bauherrenvertretung managing renovation portfolios (a major BBL workload), federal/cantonal real-estate strategists, circular-construction consultancies, demolition-and-recovery contractors, urban-planning sustainability leads.

**Maturity.** Genuinely emerging. The honest baseline today is **consultant-led portfolio assessment** with internal Excel + GEAK / cantonal energy data + GIS overlays. The first productised tools — both academic and commercial — are appearing now but no Forma-grade incumbent exists.

| Tool / Resource | Origin | Type | Notes |
|---|---|---|---|
| **Madaster — Portfolio Performance + Circularity Insights** | NL / Madaster Switzerland | Portfolio-scale material passport + circularity scoring | The closest commercial offering. Madaster does **not** currently market a dedicated "Urban Mining Screener" product line under that name — the circularity-screening capability is delivered via Portfolio Performance, Circularity Insights, and material-passport asset valuation. Confirm scope at procurement if a pre-design pre-demolition screener is the requirement. |
| **Revitalyze Urban Mining Screener (UMS)** | **TU Graz + revitalyze FlexCo** (Austria), under the EU **Circular DigiBuild / Danube Region** initiative | Web app: FastAPI + React + PostgreSQL + Docker | Estimates material quantities in existing buildings by combining a user-entered address + archetype data + OSM building metrics (ground area, perimeter, height). Inputs: address + three CSVs (product_list, components_list, building_list). Outputs: material quantities by element type, exportable CSV. **License: proprietary research-only ("public for scientific community and project partners… cannot be commercially exploited or distributed")** — not open source despite the public GitHub repo. **No Swiss-specific data sources** (no KBOB / swisstopo / cadastral integration today). Useful as a methodology reference and as a forkable starting point if a Swiss equivalent is to be built. |
| **Concular** | Germany | Marketplace + audit platform for urban mining: pre-demolition material audits, reuse marketplace, B2B brokerage | One of the leading German urban-mining productisations; complements (does not replace) portfolio screening. |
| **Restado** | Germany | Marketplace for reused construction materials | Adjacent to Concular; transaction layer rather than assessment layer. |
| **GEAK / GEAK Plus** | Switzerland (EnDK — Konferenz Kantonaler Energiedirektoren) | Cantonal energy certificate system; portfolio aggregation possible via GEAK administrative tools | The official Swiss energy-certificate baseline. Portfolio-scale aggregation of GEAK class distributions is the *de facto* federal renovation-prioritisation signal today. Does not output material recovery or circularity scores. |
| **HotMaps** | EU (Horizon 2020) | Open-source web platform for heating/cooling demand + retrofit potential at NUTS3 / building level | Urban-scale, not building-level; useful for district-heating-network feasibility around federal sites. |
| **One Click LCA — renovation/retrofit scenarios** | EU | Per-project retrofit-vs-demolish LCA comparison | Partial coverage — analyses renovation scenarios but does not screen portfolios. |
| **Bundesamt für Energie / KBOB — Sanierungskatalog and Bauteilkatalog** | Switzerland (federal) | Reference catalogues for renovation components + KBOB-aligned LCA data | Reference data layer, not a tool; feeds renovation-cost and renovation-LCA work. |
| **Custom consultant + Excel + GIS workflows** | Various | The honest baseline | What most large public owners actually do today: a portfolio of GEAK ratings + building-age data + cantonal energy-renovation incentives, scored in Excel with GIS overlay. |

**Critical Swiss-context note.** For BBL specifically this segment maps directly onto the **federal Sanierungsstrategie** workload — prioritising deep retrofits across the federal real-estate portfolio against energy targets (Energiestrategie 2050, Bundesrat climate targets) and circularity targets (Aktionsplan Kreislaufwirtschaft). The realistic 12–24-month posture is:

- (a) Use **Madaster Switzerland** for the portfolio-circularity layer if a productised path is wanted today;
- (b) Use **GEAK** portfolio aggregation as the energy-prioritisation signal;
- (c) Watch / pilot **Revitalyze UMS** as a methodology template (cannot be deployed commercially under its current research-only licence — but the OSM-+-archetype approach is forkable);
- (d) Plan for a **custom internal bridge** that fuses GEAK classes + KBOB Sanierungskatalog + swisstopo / GWR / EGID identifiers into a portfolio-screening dashboard — this is the only path today to a defensibly Swiss, federal-grade refurbishment + urban-mining screener.

**Cross-references.**
- Segment 15 (Madaster) — material passports *during* and *after* a project; this segment is *before*.
- Segment 10b (One Click LCA, Preoptima) — feeds per-project retrofit-vs-demolish carbon comparisons once a project enters scope.
- Segment 13 (Climate risk) — feeds portfolio prioritisation when adaptation drives renovation.
- Segment 21 (EPPM, including pm-cockpit) — the natural surface for refurbishment-portfolio KPIs once they exist.

### Cross-Segment Capability Matrix

Legend: ●  full coverage · ◐ partial · ○ none

| Segment | Gen options | Massing | Per-storey use | Solar/PV | Wind/CFD | Microclim | Daylight | Noise | Embod. carbon | Op. energy | Cost | Climate risk | Code/compl. | Civil/infra | Compare | GIS | BIM export |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1. Integrated AI (Forma) | ● | ● | ● | ● | ◐ | ◐ | ● | ● | ● | ● | ○ | ○ | ○ | ○ | ● | ● | ● |
| 2. BIM 2.0 (Snaptrude/Arcol) | ◐ | ● | ● | ◐ | ○ | ○ | ◐ | ○ | ○ | ○ | ◐ | ○ | ○ | ○ | ● | ◐ | ● |
| 3. Feasibility (TestFit) | ● | ● | ● | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ◐ | ○ | ○ | ○ | ● | ● | ● |
| 4. Floor-plan AI (Finch/ARCHITEChTURES) | ● | ● | ● | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ◐ | ○ | ○ | ○ | ● | ◐ | ● |
| 5. Urban platforms (Giraffe / ArcGIS Urban / VU.CITY) | ◐ | ● | ◐ | ◐ | ○ | ○ | ○ | ○ | ○ | ○ | ◐ | ○ | ◐ | ○ | ● | ● | ◐ |
| 5b. Urban (Luucy — CH) | ◐ | ● | ◐ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ◐ (BZO only) | ○ | ● | ● (swisstopo / ÖREB / BZO native) | ◐ |
| 6. Parametric massing (Modelur / DBF) | ◐ | ● | ● | ◐ | ○ | ○ | ○ | ○ | ◐ | ○ | ◐ | ○ | ○ | ○ | ● | ● | ● |
| 7. Rhino-GH sim (Ladybug / Pollination / CS) | ◐ | ● | ● | ● | ● | ● | ● | ○ | ◐ | ● | ○ | ○ | ○ | ○ | ● | ● | ● |
| 8. Wind/CFD (Orbital Stack / SimScale) | ○ | ● | ○ | ○ | ● | ● | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ◐ | ◐ | ◐ |
| 9. Daylight/energy (Sefaira / Insight / IES VE) | ○ | ● | ● | ● | ○ | ◐ | ● | ○ | ◐ | ● | ◐ | ○ | ○ | ○ | ◐ | ◐ | ● |
| 10a. Cost (DESTINI / CostX / CostOS / **BKI** / **DBD-BIM** / **Keevalue**) | ○ | ◐ | ◐ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ● | ○ | ○ | ○ | ● | ● | ● |
| 10b. Carbon (One Click LCA / Preoptima / EC3 / 2050 Materials) | ○ | ◐ | ◐ | ○ | ○ | ○ | ○ | ○ | ● | ◐ | ◐ | ○ | ○ | ○ | ● | ● | ● |
| 11. Programmable (Hypar) | ● | ● | ● | ◐ | ○ | ○ | ◐ | ○ | ◐ | ◐ | ◐ | ○ | ○ | ○ | ● | ● | ● |
| 12. AI renders (Veras) | ◐ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ |
| 13. Climate risk (Climate X / Jupiter / First Street) | ○ | ○ | ○ | ○ | ○ | ◐ | ○ | ○ | ○ | ○ | ◐ (CapEx) | ● | ○ | ○ | ● | ● | ○ |
| 14. Civil/infra (InfraWorks / OpenSite+) | ◐ | ◐ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ◐ | ○ | ◐ | ● | ● | ● | ● |
| 15. Circularity (Madaster) | ○ | ○ | ◐ | ○ | ○ | ○ | ○ | ○ | ● | ○ | ◐ (residual) | ○ | ○ | ○ | ● | ◐ | ● (IFC in) |
| 16. Code / model checking (UpCodes / Verifi3D / Solibri) | ○ | ○ | ◐ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ● | ○ | ◐ | ○ | ● |
| 17. Modular housing (Modulous TESSA) | ● | ● | ● | ○ | ○ | ○ | ○ | ○ | ● | ◐ | ● | ○ | ◐ | ○ | ● | ◐ | ● |
| 18. Mobility (PTV Visum / LEGION) | ○ | ○ | ◐ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ◐ (op-cost) | ○ | ○ | ◐ | ● | ● | ◐ |
| 19. Certifications (SNBS / Minergie / DGNB / LEED / BREEAM) | ○ | ○ | ○ | ◐ | ○ | ○ | ◐ | ○ | ● | ● | ◐ | ○ | ● | ○ | ● | ◐ | ◐ |
| 20. Biodiversity (Defra BNG / InfoSpecies / BAFU layers) | ○ | ○ | ○ | ○ | ○ | ◐ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ◐ | ● | ○ |
| 21. EPPM (Primavera / ACC / Procore / Cockpits) | ○ | ○ | ◐ | ○ | ○ | ○ | ○ | ○ | ◐ (KPI) | ◐ (KPI) | ● (KPI) | ◐ (KPI) | ○ | ◐ | ● | ◐ | ◐ |
| 22. Refurbishment / urban mining (Madaster Portfolio / Revitalyze UMS / GEAK / Concular) | ◐ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ● (recovered mass) | ◐ (retrofit) | ◐ (residual / recovery value) | ○ | ○ | ○ | ● | ● | ◐ |

### White Spaces / Underserved Areas

1. **Regional cost taxonomies.** No international early-design tool supports **eBKP-H** out of the box. The DACH ecosystem has matured around **DIN 276** (covered by **BKI** publications + BKI Kostenplaner + the new KoRa web tool launching June 2026, and by **DBD-BIM** for BIM-driven cost recalculation including STLB-Bau / DIN BIM Cloud), with German practice converting DIN 276 ↔ eBKP-H through internal mapping tables. **Keevalue** is the only Swiss-domiciled productised cost-estimation candidate visible at this review; its eBKP-H / SIA 416 fluency and hosting must be verified at procurement. **CostOS** is the most classification-flexible global product. TestFit and ARCHITEChTURES allow user-defined unit-rate libraries. All paths still require buyer-side configuration to speak eBKP-H natively.
2. **Integrated multi-KPI dashboards** that combine LCA + LCC + daylight + energy + comfort **+ physical climate risk** against **Swiss benchmarks (SNBS 2.1, KBOB Ökobilanzdaten, SIA 380/1, SIA 2040, BAFU Gefahrenkarten)**. Forma and Giraffe come closest at the design-stack dashboard layer; no tool reviewed integrates climate-risk inputs (Segment 13) into design KPIs.
3. **Sovereign / Swiss-resident cloud hosting.** Forma (AWS US/EU), Snaptrude (AWS), Arcol (US), Giraffe (AU/US), TestFit (US), Pollination (US), Finch (EU/Sweden), One Click LCA (Finland/EU) — **One Click LCA, Finch, and Pollination's EU regions are the most ISG-friendly**. **Luucy** and **Madaster Switzerland** are the only Swiss-domiciled products reviewed; verify both vendors' hosting region and contractual residency clauses at procurement. None advertise Public Clouds Bund hosting today.
4. **End-to-end roundtrip from concept to KBOB-aligned LCA inside one tool.** Currently requires a 2–3 hop bridge (Rhino / Forma → IFC → One Click LCA / KBOB workflow). Preoptima accelerates the option-comparison side but is not KBOB-native. Luucy does not bridge this either — it is upstream of LCA.
5. **GIS roundtrip with swisstopo / GWR.** Forma uses OSM + commercial datasets; Giraffe and ArcGIS Urban accept custom layers; Snaptrude/Arcol have weaker GIS. **None of the international segment leaders natively consume swisstopo WMS or GWR identifiers** — usually requires WMS/WFS import and EGID tagging. **Luucy partially closes this gap**: it productises swisstopo data and ÖREB layers, with documented swisstopo partnership. GWR/EGID-keyed asset records are not visible as a marketed feature — verify at evaluation.
6. **Code-compliance for Swiss building rules** (SIA norms, BZO/BNO, BAB, Mehrwertabgabe, fire/access regulations). The international code-compliance segment (UpCodes, Verifi3D, Solibri) covers US/EU rulesets but not Swiss-specific norms out-of-box. **Luucy is the only platform reviewed with native BZO ingestion**, but only at the zoning envelope; building-code compliance remains a manual or Solibri-rule-authoring job.
7. **Climate-risk-into-design integration.** Climate X, Jupiter, and First Street are stand-alone diligence tools. **No reviewed product feeds asset-level climate risk back into Forma / Giraffe / Luucy as a design input.** This is a real bridge to build internally, especially for BAFU Gefahrenkarten alignment.
8. **Civil-feasibility for architect-led screening.** InfraWorks and OpenSite+ are mature, but they sit in civil-engineering hands. Architects and federal PMs typically lack a lightweight civil-screening tool to identify access/grading killers before commissioning a full civil study.

### Trends & Outlook

- **Regulatory pressure on embodied carbon is now timetabled.** The **revised EU EPBD** requires life-cycle GWP disclosure for **larger new buildings from 2028** and **all new buildings from 2030**. Federal Swiss real-estate is not bound, but EU-aligned procurement (and BBL's own SNBS / KBOB direction) makes 2028–2030 the de-facto target. Tools without credible whole-life-carbon output will be pushed out of public procurement first.
- **WLCA validation is becoming the credibility test.** **One Click LCA** is the first software validated under the **RICS Whole Life Carbon Assessment (WLCA) Software Validation Programme (2nd edition, July 2025)**. Expect more vendors to seek validation — and procurement leads to require it — within 24 months.
- **IFC 4.3 / ISO 16739-1:2024** is now the contemporary interoperability floor. Any segment-1, 2, 5, or 14 procurement should require IFC 4.3 export at minimum; tools still locked to IFC 2x3 are losing ground.
- **AI depth** is moving from image-generation to constraint-satisfaction. Forma's "rapid wind/noise" surrogates and Finch's "Graph Rules" are the credible direction; pure diffusion-model floor plans (Maket free tier) still produce spatial-logic errors per the 2026 illustrarch review. **Preoptima** and **Modulous TESSA** show the same direction in carbon and modular housing respectively.
- **Cloud-first is non-negotiable** for new entrants; the holdouts (Ladybug stack, ClimateStudio, ENVI-met, InfraWorks, OpenRoads ConceptStation) survive on simulation depth, civil-data weight, or Rhino/Revit ecosystem lock-in.
- **BIM integration is converging on IFC 4.3 + Revit roundtrip + Rhino plug-ins.** Speckle's data-hub model and the OpenBIM movement are the most credible neutral interchange layer. Swiss-native platforms (Luucy) currently lag here — adopters should expect to bridge to BIM via IFC export and a separate downstream tool.
- **Climate risk is moving upstream from diligence into design.** Insurer / lender requirements (driven by EU CSRD, SFDR, US SEC climate filings, and Swiss SBTi-aligned commitments) are pushing climate-risk screens to the feasibility stage — but no design-stack vendor has integrated this natively yet.
- **Generative AI's role** in the next 24 months will be (a) Copilot-style assistants inside existing tools (Snaptrude, Forma Building Design, Speckle Automate, UpCodes Copilot), (b) text-to-BIM experiments (Hypar), and (c) deeper rule-based generators (Finch, ARCHITEChTURES, Preoptima, Modulous) — not autonomous design.

### Swiss Public-Sector Mapping (Brief)

Four flags for BBL:

- **Data residency / ISG / Public Clouds Bund.** The vast majority of segment leaders are US-hosted or US-controlled (Forma, Snaptrude, Arcol, Hypar, TestFit, Giraffe, Pollination US, Veras, Climate X, Jupiter, First Street, Modulous TESSA, UpCodes, Verifi3D). EU-hosted options (One Click LCA — Finland, Finch — Sweden, Pollination EU region, on-prem ENVI-met, InfraWorks on-prem, Solibri, Rhino+Grasshopper local stacks) are easier to defend against ISG-classified information. **Swiss-domiciled options (Luucy, Madaster Switzerland) are the strongest candidates for ISG-sensitive site, zoning, and material data**, though actual hosting region (CH vs. EU hyperscaler) must be confirmed contractually. CityEngine via ArcGIS Enterprise on-prem is also defensible.
- **eBKP-H / KBOB / SNBS alignment.** No segment leader is natively eBKP-H-aware (including Luucy). The pragmatic stack for BBL: (a) **Luucy** or Forma or Giraffe / ArcGIS Urban for site/massing + Swiss zoning + sun-hours/wind, (b) **InfraWorks / OpenSite+** for civil feasibility on constrained sites, (c) **One Click LCA Carbon Designer 3D** with custom KBOB dataset for embodied carbon + **Preoptima** for early structural carbon option comparison, (d) **Lesosai or Sefaira** for SIA 380/1 operational energy alignment, (e) **for cost**: pilot **Keevalue** as the Swiss-native candidate, **BKI Kostenplaner / KoRa** as the DACH DIN 276 anchor (with DIN 276 ↔ eBKP-H mapping), **DBD-BIM** when the BIM model is mature enough to drive component cost, or **CostOS / CostX** as classification-flexible global alternatives, (f) **werk-material.online** + **KBOB Ökobilanzdaten** + **Bauteilkatalog / Lesosai** as Swiss reference data layers feeding both cost and carbon, (g) **Madaster Switzerland** for material passports / circularity, (h) Swiss climate / hazard data manually integrated from BAFU.
- **Swiss geodata interoperability.** swisstopo (LV95, WMS/WMTS), ÖREB, and GWR/EGID are not first-class citizens in any international tool reviewed. **Luucy is the exception** — swisstopo and ÖREB are productised. ArcGIS Urban can be configured with swisstopo via OGC services. Giraffe's "import any GIS layer" model and Pollination's open weather/site data inputs offer the next-best ingestion path for the non-Swiss stack. Federal use cases requiring EGID-keyed asset records will need confirmation with Luucy or a custom data-layer integration on the international tools.
- **Swiss climate / hazard data.** BAFU Gefahrenkarten and CH2018 scenarios are the authoritative federal sources. No segment-13 vendor uses them as primary inputs today. For federal-portfolio physical climate-risk diligence, expect a buyer-side integration of BAFU layers alongside a global vendor (Climate X / Jupiter) for forward-looking scenarios.

## Recommendations

**Stage 1 — Define the operating stack (0–3 months).** Pilot a minimum-viable concept stack:
- **Forma Site Design** (already in AEC Collection if you license it) for site/massing/sun-hours/wind/noise + Revit handoff;
- **One Click LCA + Carbon Designer 3D** for KBOB-extensible embodied-carbon at concept stage.

In parallel, run two focused screens:
- **Luucy PoC on one BBL site** — validate swisstopo / ÖREB / BZO ingestion against a real federal property, hosting region and ISG-classified-data handling, and IFC export quality. Luucy is the only candidate that can short-circuit Swiss geodata setup; its position vs. Forma + Giraffe / ArcGIS Urban should be settled before the stack is frozen.
- **One climate-risk screen** with Climate X **or** Jupiter on 10 candidate sites, cross-referenced against BAFU Gefahrenkarten — answers whether commercial physical-risk analytics add anything beyond BAFU for federal diligence.

Trigger to expand: more than 2 of 3 federal pilot projects need wind/microclimate beyond Forma's surrogates → add **Orbital Stack** or commission **Pollination + Butterfly** through an external consultant.

**Stage 2 — Add specialist depth (3–9 months).** When projects routinely require:
- daylight credits (Minergie-Eco, SNBS comfort) or detailed energy modelling → deploy **ClimateStudio** (Rhino users), **Sefaira** (SketchUp/Revit users), or **Autodesk Insight** (Revit-native firms). Pollination Cloud if a centralised cloud workflow is preferred.
- difficult sites with civil/access constraints → deploy **Autodesk InfraWorks** (Autodesk-shop firms) or **Bentley OpenSite+** for grading and stormwater concepts.
- structural option-comparison conversations early in design → add **Preoptima** alongside One Click LCA.

Threshold: ≥ 5 simultaneous projects needing daylight/energy SD-stage analysis, or ≥ 3 with significant civil constraints.

**Stage 3 — Decide on a feasibility/yield layer (6–12 months).** For larger federal portfolios (renovation prioritisation, site densification studies), evaluate the credible options against each other:
- **Luucy** — best Swiss-geodata fit, weakest BIM/yield modelling; ideal if the primary use case is zoning-bounded Baupotential studies on swisstopo / ÖREB data.
- **ArcGIS Urban** — best fit if the BBL is already an Esri shop or requires formal planner-grade zoning workflows.
- **Giraffe** — strongest neutral GIS + live pro-forma metrics; best for mixed Swiss/international portfolios.
- **TestFit** — only justifiable if multi-family unit-mix / parking optimisation becomes a recurring use case.

**Stage 4 — Adjacent buyer gates (6–18 months).** When the volume of work or external pressure justifies:
- **Cost planning** → run a three-way Swiss / DACH / global pilot: **Keevalue** (Swiss-native, evaluate first), **BKI Kostenplaner or KoRa** (DACH DIN 276 anchor; KoRa launches June 2026 if waiting is acceptable) or **DBD-BIM** (BIM-driven, STLB-Bau + DIN BIM Cloud), and **CostOS** (classification-flexible) or **CostX** (BIM-takeoff strength). Require eBKP-H mapping as acceptance criterion across all three.
- **Circularity / material passports** → pilot **Madaster Switzerland** on one renovation; align with Bundesrat Aktionsplan Kreislaufwirtschaft timelines.
- **Code compliance** → if BIM model-checking becomes a routine SIA-Phase 41–53 task, pilot **Solibri** with Swiss-norm rulesets. UpCodes / Verifi3D not yet Swiss-ready.
- **Modular housing** → only if BBL plans repeatable typologies at portfolio scale, evaluate **Modulous TESSA** on one project.

**Stage 5 — Watch list, do not buy yet.** Track:
- **Forma Building Design** (GA 2026), **Snaptrude** and **Arcol** (BIM 2.0 maturity) — revisit once each has IFC 4.3 roundtrip with Revit and clear data-residency options.
- **One Click LCA's KBOB dataset integration** and the **RIB CostX 6D / EC3 carbon library** combination as the most credible commercial cost-+-carbon early-stage answer.
- **Luucy's BIM / eBKP-H / KBOB roadmap** — closing any of those gaps would materially change its position in the stack.
- **EPBD 2028 / 2030** implementation guidance from EU Commission and CEN; align Swiss procurement clauses accordingly.
- **VU.CITY Swiss city coverage** — useful only if/when Zurich, Geneva, Bern, or Basel are modelled.

**Stage 6 — Build internally what no vendor delivers.** A small **Grasshopper / Speckle layer** mapping massing → eBKP-H elements → KBOB dataset, sitting between Forma / Luucy / Rhino and One Click LCA, is realistic in 4–6 months of internal dev and is the only path today to native Swiss-aligned KPIs. A second internal bridge — **BAFU Gefahrenkarten → climate-risk dashboard** — is similarly the only realistic path to Swiss-context physical-risk diligence in design.

**Procurement guard-rails.**
- Require **IFC 4.3 export** + named integration with Revit before any segment-1, -2, -5, or -14 purchase. (For Luucy specifically: confirm IFC export fidelity and whether a Revit roundtrip exists.)
- Require **EU-region (preferably Swiss-region) cloud hosting** and a documented data-classification stance for any SaaS handling project-level information.
- Reject any tool that cannot export its source geometry and analysis inputs (vendor lock-in risk on conceptual data).
- Require a **published API** for any platform on which BBL workflows will be built.
- For LCA tools, prefer **RICS WLCA validation** as a quality floor.

## Caveats

- **Pricing decay.** Vendor pricing in this segment changes 1–3 times per year; the figures above are as of early/mid 2026 and should be re-verified at procurement time.
- **Forma Building Design** is in closed beta with GA "expected 2026" per AU 2025 announcements — treat all coverage claims as forward-looking.
- **Cove / cove.tool** is in a transitional state — the **ROOST acquisition of Cove's IP with continued open-source development** announced in a July 2025 LinkedIn post means firms relying on cove.tool's analysis APIs should validate continuity before committing.
- **Cityzenith** status is the weakest signal in this report — investor commentary suggests an asset transfer to a successor entity ("TwinUp") but no recent product press confirms it; verify directly before considering procurement.
- **Generative AI floor-plan output quality** (Maket, ARCHITEChTURES, Finch's lower tiers, Modulous TESSA's automation) remains uneven; outputs require professional review for code, accessibility, and program logic before client or regulatory submission.
- **CFD/wind surrogates** (Forma "rapid wind", Orbital Stack AI sim) are early-design qualitative tools; final wind comfort sign-off still requires RANS-CFD or wind-tunnel testing per typical municipal review requirements.
- **Climate-risk vendors** (Climate X, Jupiter, First Street) rely on global hazard models; their accuracy in Swiss alpine, lake, and urban-flooding contexts must be cross-validated against BAFU Gefahrenkarten and CH2018 before use in federal underwriting.
- **VU.CITY** value depends entirely on whether the target city is modelled — Swiss city coverage must be confirmed before procurement.
- **Code-compliance tools** (UpCodes, Verifi3D) are non-Swiss in default rule coverage; Solibri's customisability is the only realistic path to Swiss-norm checking today.
- **Madaster** has a Swiss platform, but integration with eBKP-H and KBOB data flows must be confirmed at pilot.
- **Swiss-context recommendations** are framed at the segment level; specific KBOB/eBKP-H/SNBS workflows need a Swiss sustainability consultant in the loop. ISG classification of project data should be confirmed with BBL ISBO before SaaS adoption.
- **Luucy coverage in this document is based on a single review of luucy.ch (May 2026)** and a high-level vendor-marketing summary (150 clients / 6,000 users / 15,000 projects; swisstopo partnership; ÖREB / BZO ingestion; "ohne Kreditkarte oder Vertrag" trial). BIM (IFC/Revit) roundtrip, embodied-carbon, eBKP-H/KBOB alignment, GWR/EGID handling, hosting region, and enterprise pricing are **not confirmed** and must be verified directly with the vendor before procurement decisions.

---

**Plan completion check:**

| Plan item | Covered? |
|---|---|
| 22 market segments named & defined (12 design-core + 6 adjacent-buyer-gate + 2 outcome/ecology + 1 portfolio/PMO + 1 refurbishment/urban-mining) | ✅ |
| Per-product mini-profiles (pricing/hosting/integrations) | ✅ |
| Cross-segment capability matrix (extended with climate risk, code compliance, civil/infra columns) | ✅ |
| White spaces / underserved areas (incl. climate-risk-into-design, civil screening, code-compliance for Swiss norms) | ✅ |
| Trends & outlook (EPBD 2028/2030, IFC 4.3 / ISO 16739-1:2024, RICS WLCA validation, AI, cloud, BIM, KPI, GenAI) | ✅ |
| Brief Swiss public-sector mapping (four flags: residency, eBKP-H/KBOB/SNBS, geodata, climate/hazard) | ✅ |
| Forma, Snaptrude, Arcol, TestFit, Spacio, Giraffe, Modelur, DBF, Finch, ARCHITEChTURES, Maket, Ladybug, Pollination, ClimateStudio, DIVA, Sefaira, Autodesk Insight, IES VE, Orbital Stack, SimScale, ENVI-met, Autodesk CFD, cove.tool, DESTINI, CostX, **CostOS**, **BKI / KoRa**, **DBD-BIM**, **Keevalue**, **werk-material.online**, **Preoptima**, **One Click LCA**, Hypar, CityEngine, **ArcGIS Urban**, **VU.CITY**, UrbanFootprint, Delve, Veras, ARK, **Luucy**, **Climate X**, **Jupiter**, **First Street**, **InfraWorks**, **OpenSite+**, **OpenRoads ConceptStation**, **Madaster**, **UpCodes**, **Verifi3D**, **Solibri**, **Modulous TESSA**, **PTV Visum**, **LEGION**, **SNBS Hochbau 2023.1**, **Minergie**, **DGNB**, **LEED Online**, **BREEAM**, **WELL**, **EDGE**, **GRESB**, **Defra BNG metric**, **InfoSpecies / BAFU biotope layers**, **Primavera P6**, **Microsoft Project**, **Procore Capital Projects**, **Autodesk Construction Cloud**, **InEight**, **Planview / Sciforma / Cora PPM**, **OpenProject**, **Madaster Portfolio Performance / Circularity Insights**, **Revitalyze Urban Mining Screener (TU Graz / Circular DigiBuild)**, **Concular**, **Restado**, **GEAK / GEAK Plus**, **HotMaps**, **KBOB Sanierungskatalog / Bauteilkatalog** | ✅ |
| Recent M&A: Spacemaker→Forma, Sefaira→Trimble, cove→ROOST, DIVA→ClimateStudio, Sidewalk→Google, EvolveLAB→Chaos, Tally→C.Scale, 2050 Materials→Once For All, JLL↔Jupiter | ✅ |
| Recommendations with staged thresholds (6 stages + procurement guard-rails) | ✅ |
| Caveats with verified-status flags | ✅ |
