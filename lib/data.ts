export interface StatItem {
  id: string;
  value: string;
  label: string;
  description: string;
}

export interface ServiceCard {
  id: string;
  number: number;
  title: string;
  kicker: string;
  shortDesc: string;
  image: string;
  category: 'Strategic PMO' | 'Technology & AI' | 'Workforce & Operations' | 'Governance & Support';
  deliveryBy: string;
  pillar: 'Pillar I: Strategic PMO & Governance' | 'Pillar II: Technology & Enterprise AI' | 'Pillar III: Workforce & Operations' | 'Pillar IV: Language & Logistics';
}

export interface ClientPartner {
  name: string;
  category: 'International Donor' | 'Global Enterprise' | 'Government Agency' | 'Academic & NGO';
  logo: string;
  scope: string;
}

export interface DetailedProject {
  id: string;
  title: string;
  client: string;
  funder?: string;
  period: string;
  category: string;
  location: string;
  description: string;
  keyOutputs: string[];
  status: 'Completed' | 'Ongoing';
  badge?: string;
}

export interface PartnerCompany {
  name: string;
  location: string;
  role: string;
  description: string;
  established: string;
  link?: string;
  badge: string;
  logo: string;
  logoClassName?: string;
  capabilities: string[];
}

export const COMPANY_INFO = {
  name: "PUL Consulting Services",
  shortName: "PUL Consulting",
  motto: "Bridging the Gap",
  tagline: "Bridging the Gap Between Strategic Vision and Field Execution in Complex Environments",
  foundedYear: 2010,
  registration: {
    aisa: "License # D-34532",
    moci: "Ministry of Commerce & Industries Reg # 21679",
    tin: "TIN # 9000010281",
  },
  contacts: {
    kabulAddress: "Sayed Kaihan Street, Jai Rayees, Darulaman Road, Kabul, Afghanistan",
    kabulBranch: "Ansari Square, Shahr-e-Naw, Kabul, Afghanistan",
    usaAddress: "PUL Global Partners LLC, Stafford & Fairfax, Virginia, United States",
    phones: ["+93 (786) 19 96 96", "+93 (786) 600 597", "+93 (798) 888 555"],
    emails: ["info@pulconsulting.com", "amin@pulconsulting.com"],
    website: "https://pulconsulting.com",
    partnerWebsite: "https://pulglobal.com",
  },
};

export const KEY_STATS: StatItem[] = [
  {
    id: "years",
    value: "14+",
    label: "Years in Operation",
    description: "Delivering continuous management consulting and operational programs since 2010",
  },
  {
    id: "projects",
    value: "30+",
    label: "Cumulative Contracts",
    description: "16 featured program dossiers from 30+ cumulative donor and prime contracts executed since 2010",
  },
  {
    id: "personnel",
    value: "1,000+",
    label: "Workforce Deployed",
    description: "Specialized consultants, field personnel, and engineering cadres managed nationwide",
  },
  {
    id: "agents",
    value: "500+",
    label: "Call Center Personnel",
    description: "Trained, scheduled, and supervised for major telecom operators including Etisalat & Huawei",
  },
  {
    id: "provinces",
    value: "15+",
    label: "Provinces Reached",
    description: "Field deployment capability spanning central, northern, southern, and eastern Afghanistan",
  },
];

export const SERVICE_CARDS_15: ServiceCard[] = [
  {
    id: "pmo-management",
    number: 1,
    title: "Project Management & PMO Support",
    kicker: "Strategic PMO & RBM",
    shortDesc: "End-to-end PMO governance, Result-Based Management (RBM), strategic roadmaps, and administrative execution.",
    image: "/assets/services/service-pmo.jpg",
    category: "Strategic PMO",
    deliveryBy: "PUL Consulting (Direct Core HQ)",
    pillar: "Pillar I: Strategic PMO & Governance",
  },
  {
    id: "ai-transformation",
    number: 2,
    title: "AI Implementation & Digital Transformation",
    kicker: "Enterprise AI & Modernization",
    shortDesc: "Enterprise AI adoption, automated document intelligence, workflow automation, and responsible LLM knowledge systems.",
    image: "/assets/services/service-ai.jpg",
    category: "Technology & AI",
    deliveryBy: "Synergy: Quantu Tech LLC (Virginia, USA)",
    pillar: "Pillar II: Technology & Enterprise AI",
  },
  {
    id: "training-capacity",
    number: 3,
    title: "Training & Institutional Capacity Building",
    kicker: "Workforce Upskilling",
    shortDesc: "Master Training of Trainers (MToT), certified engineering management, and large-scale public sector workforce training.",
    image: "/assets/services/service-training.jpg",
    category: "Strategic PMO",
    deliveryBy: "PUL Consulting (Direct Core HQ)",
    pillar: "Pillar I: Strategic PMO & Governance",
  },
  {
    id: "hr-workforce",
    number: 4,
    title: "Human Resources & Workforce Outsourcing",
    kicker: "Staffing & Payroll Governance",
    shortDesc: "Nationwide staffing, compliant payroll administration, regulatory permits, and multi-year employment agreements.",
    image: "/assets/services/service-hr.jpg",
    category: "Workforce & Operations",
    deliveryBy: "PUL Consulting (Direct Core HQ)",
    pillar: "Pillar III: Workforce & Operations",
  },
  {
    id: "monitoring-evaluation",
    number: 5,
    title: "Monitoring, Evaluation & Learning (M&E)",
    kicker: "Independent Field Audits",
    shortDesc: "Third-party independent monitoring, baseline/endline studies, data integrity verification, and donor reporting.",
    image: "/assets/services/service-me.jpg",
    category: "Strategic PMO",
    deliveryBy: "PUL Consulting (Direct Core HQ)",
    pillar: "Pillar I: Strategic PMO & Governance",
  },
  {
    id: "it-infrastructure",
    number: 6,
    title: "IT Infrastructure, Networks & Cloud",
    kicker: "Secure Networks & Peering",
    shortDesc: "Enterprise networking, structured cabling, cybersecurity architecture, and private cloud implementations.",
    image: "/assets/services/service-it.jpg",
    category: "Technology & AI",
    deliveryBy: "PUL Consulting & Quantu Tech Engineers",
    pillar: "Pillar II: Technology & Enterprise AI",
  },
  {
    id: "translation-interpretation",
    number: 7,
    title: "Translation & Simultaneous Interpretation",
    kicker: "ISO Certified Localization",
    shortDesc: "Official certified multi-pair translation, conference interpretation booths, and localization across 100+ languages.",
    image: "/assets/services/service-translation.jpg",
    category: "Governance & Support",
    deliveryBy: "Synergy: Linguist Point International",
    pillar: "Pillar IV: Language & Logistics",
  },
  {
    id: "events-management",
    number: 8,
    title: "High-Level Events & International Summits",
    kicker: "Protocol & Turnkey AV",
    shortDesc: "Protocol coordination, AV logistics, and delegate management for ministerial summits, conferences, and national Jirgas.",
    image: "/assets/services/service-events.jpg",
    category: "Workforce & Operations",
    deliveryBy: "PUL Consulting (Direct Core HQ)",
    pillar: "Pillar III: Workforce & Operations",
  },
  {
    id: "call-center-operations",
    number: 9,
    title: "Call Center & Customer Support Operations",
    kicker: "24/7 Trilingual Operations",
    shortDesc: "Turnkey contact center staffing, multi-shift workforce supervision, trilingual routing, and KPI management.",
    image: "/assets/services/service-callcenter.jpg",
    category: "Workforce & Operations",
    deliveryBy: "PUL Consulting (Direct Core HQ)",
    pillar: "Pillar III: Workforce & Operations",
  },
  {
    id: "business-registration",
    number: 10,
    title: "Business Registration & Market Entry",
    kicker: "Licensing & Legal Structuring",
    shortDesc: "Comprehensive foreign commercial entry, MoCI licensing, corporate structuring, and legal compliance.",
    image: "/assets/services/service-business-reg.jpg",
    category: "Governance & Support",
    deliveryBy: "PUL Consulting & PUL Global Partners LLC",
    pillar: "Pillar I: Strategic PMO & Governance",
  },
  {
    id: "financial-tax-compliance",
    number: 11,
    title: "Financial Management & Tax Compliance",
    kicker: "ERP Accounting & MoF Filings",
    shortDesc: "Standardized accounting systems, cloud ERP, financial audits, and Ministry of Finance taxation clearance.",
    image: "/assets/services/service-finance.jpg",
    category: "Governance & Support",
    deliveryBy: "PUL Consulting (Direct Core HQ)",
    pillar: "Pillar I: Strategic PMO & Governance",
  },
  {
    id: "supply-chain-logistics",
    number: 12,
    title: "Supply Chain, Fleet & Turnkey Procurement",
    kicker: "Austere Logistics & Fleet",
    shortDesc: "Secure transportation, specialized material procurement, warehouse distribution, and austere field logistics.",
    image: "/assets/services/service-logistics.jpg",
    category: "Workforce & Operations",
    deliveryBy: "PUL Consulting In-Country Network",
    pillar: "Pillar IV: Language & Logistics",
  },
  {
    id: "empowerment-initiatives",
    number: 13,
    title: "Youth & Women Economic Empowerment",
    kicker: "Inclusive Economic Growth",
    shortDesc: "Targeted vocational upskilling, mentorship, entrepreneurship facilitation, and inclusive private sector employment.",
    image: "/assets/services/service-empowerment.jpg",
    category: "Strategic PMO",
    deliveryBy: "PUL Consulting (Direct Core HQ)",
    pillar: "Pillar I: Strategic PMO & Governance",
  },
  {
    id: "media-communications",
    number: 14,
    title: "Media Production, Video & Public Outreach",
    kicker: "Broadcast & 3D Animation",
    shortDesc: "Strategic communications, civic outreach campaigns, professional 3D animation, and high-definition video production.",
    image: "/assets/services/service-media.jpg",
    category: "Technology & AI",
    deliveryBy: "PUL Media Production Division",
    pillar: "Pillar II: Technology & Enterprise AI",
  },
  {
    id: "secure-facilities",
    number: 15,
    title: "Secure Compound & Facility Operations",
    kicker: "Green Zone Hospitality",
    shortDesc: "Protected lodging coordination, compound maintenance, life support, and protocol services within secure zones.",
    image: "/assets/services/service-facilities.jpg",
    category: "Governance & Support",
    deliveryBy: "PUL Consulting Secure Services Cadre",
    pillar: "Pillar IV: Language & Logistics",
  },
];

export const CLIENTS_LIST: ClientPartner[] = [
  {
    name: "USAID",
    category: "International Donor",
    logo: "/assets/clients/client-usaid.png",
    scope: "AWDP & ASMED Construction Management Training across Kabul, Kandahar & Nangarhar",
  },
  {
    name: "The World Bank",
    category: "International Donor",
    logo: "/assets/clients/client-world-bank.png",
    scope: "Academic and Business English Capacity Building for Ministry of Agriculture (AAIP)",
  },
  {
    name: "GIZ Afghanistan",
    category: "International Donor",
    logo: "/assets/clients/GIZ.jpg",
    scope: "Soft Skills Training & Catering for 6,800+ participants across 15 northern provinces",
  },
  {
    name: "Huawei Technologies Ltd",
    category: "Global Enterprise",
    logo: "/assets/clients/Huawei Logo.png",
    scope: "Multi-year Human Resources, Payroll & Manpower Administration Agreement",
  },
  {
    name: "Etisalat Afghanistan",
    category: "Global Enterprise",
    logo: "/assets/clients/client-etisalat.png",
    scope: "Call Center Operations Management, 500+ Agents Staffing & Multilingual Training",
  },
  {
    name: "The Asia Foundation (TAF)",
    category: "Academic & NGO",
    logo: "/assets/clients/The Asia Foundation.png",
    scope: "Annual Survey Book Translation & GMIC IT Infrastructure Networking Services",
  },
  {
    name: "British Council",
    category: "International Donor",
    logo: "/assets/clients/British Council Logo.png",
    scope: "Professional Translation, Localization & Educational Materials Development",
  },
  {
    name: "DAI (Development Alternatives Inc.)",
    category: "International Donor",
    logo: "/assets/clients/client-dai.jpg",
    scope: "ASMED Construction Management & ALBA Parliament Capacity Building Programs",
  },
  {
    name: "Tetra Tech (USAID ISLA)",
    category: "International Donor",
    logo: "/assets/clients/client-tetra-tech.png",
    scope: "Governance translation and institutional capacity building documentation",
  },
  {
    name: "Creative Associates International",
    category: "International Donor",
    logo: "/assets/clients/Creative Associate Logo.png",
    scope: "AWDP Master Training of Trainers (MToT) & Private Sector Job Placement",
  },
  {
    name: "Afghanistan National Assembly",
    category: "Government Agency",
    logo: "/assets/clients/Wolesi Jirga Logo.jpg",
    scope: "Project Management & Public Policy Training for Wolesi Jirga & Meshrano Jirga staff",
  },
  {
    name: "Ministry of Agriculture (MAIL)",
    category: "Government Agency",
    logo: "/assets/clients/MAIL Logo.png",
    scope: "Capacity Building for Senior Provincial Staff in AAIP Program",
  },
];

export const COMPREHENSIVE_PROJECT_DATABASE: DetailedProject[] = [
  {
    id: "huawei-master-agreement",
    title: "Master Human Resources, Payroll & Manpower Administration Agreement",
    client: "Huawei Technologies Ltd – Afghanistan",
    period: "2014 – 2022+",
    category: "Human Resources & Telecom Operations",
    location: "Kabul, Mazar, Herat, Kandahar & Jalalabad",
    description: "Long-term master service agreement providing turnkey recruitment, monthly payroll processing, Ministry of Finance tax clearance, and day-to-day HR administrative supervision for Huawei's telecommunications infrastructure contracts across Afghanistan.",
    keyOutputs: [
      "Nationwide staff recruitment across field engineers, technicians, and administrative teams",
      "End-to-end monthly payroll disbursement and MoF tax withholding compliance with zero audit findings",
      "Full compliance with Afghan Labor Law, work authorizations, and expatriate residency clearances",
      "Continuous contract renewals spanning nearly a decade of institutional cooperation",
    ],
    status: "Completed",
    badge: "Flagship Telecom Partnership",
  },
  {
    id: "giz-multiprovince-training",
    title: "Multi-Province Soft Skills Training & Turnkey Catering for 6,800+ Personnel",
    client: "Gesellschaft für Internationale Zusammenarbeit (GIZ)",
    period: "2018 – 2019",
    category: "Capacity Building & Logistics",
    location: "15 Provinces (Samangan, Mazar, Jawzjan, Kunduz, Takhar, Badakhshan, etc.)",
    description: "Nationwide capacity initiative providing soft skill training (communication, conflict management, team building, time management) to 1,800 police officers and 5,000 public sector personnel across 15 provinces, accompanied by complete daily catering services.",
    keyOutputs: [
      "Trained 1,800 Afghan police officers across 6 northern provinces in conflict resolution",
      "Expanded training to over 5,000 community leaders, civil servants, and women advocates across 15 provinces",
      "Delivered turnkey daily catering and venue logistics in austere provincial environments",
      "Standardized training manuals and post-training impact assessments verified by GIZ monitors",
    ],
    status: "Completed",
    badge: "Nationwide Capacity Initiative",
  },
  {
    id: "etisalat-callcenter-deployment",
    title: "Outsourced Call Center Operations, Staffing & Multilingual Training (500+ Agents)",
    client: "Etisalat Afghanistan",
    period: "2012 – 2016",
    category: "Contact Center Operations & HR",
    location: "Kabul, Afghanistan",
    description: "Pioneered turnkey call center operations for Etisalat Afghanistan. Recruited, trained, and managed over 500 trilingual customer care agents, shift supervisors, and HR coordinators across multi-shift 24/7 schedules.",
    keyOutputs: [
      "Hired, onboarded, and managed 500+ customer service agents over multi-year contract cycles",
      "Conducted specialized training modules in customer care, conflict de-escalation, Dari, Pashto, and English",
      "Supervised shift management, attendance tracking, and quality assurance call scoring",
      "Established core operational foundation that powered Etisalat's customer growth across Afghanistan",
    ],
    status: "Completed",
    badge: "Pioneer Telecom Operations",
  },
  {
    id: "national-export-strategy",
    title: "Project Management Support for National Export Strategy of Afghanistan",
    client: "Export Promotion Agency of Afghanistan (EPAA) / Advancing Afghan Trade",
    period: "2018",
    category: "Trade Strategy & PMO",
    location: "Kabul & Regional Commercial Hubs",
    description: "Provided senior project management, research, and stakeholder consultation support to develop Afghanistan's National Export Strategy, focusing on saffron, carpets, dried fruit, and gemstones for global markets.",
    keyOutputs: [
      "Consultative roadmaps formulated with Afghan trade associations and export chambers",
      "Comprehensive market barrier assessments and regulatory reform recommendations",
      "Direct foundation for the subsequent launch of international trade initiatives",
    ],
    status: "Completed",
    badge: "National Economic Impact",
  },
  {
    id: "awdp-creative-usaid",
    title: "Workforce Development & Master Training of Trainers (MToT)",
    client: "Afghanistan Work Force Development Program (AWDP) – Creative Associates / USAID",
    period: "2016 – 2018",
    category: "Workforce Development & M&E",
    location: "Kabul & Key Economic Corridors",
    description: "Demand-driven project management training and verified job placement services for 400 mid-career professionals and job seekers, along with MToT for private sector training institutes.",
    keyOutputs: [
      "Private and semi-private sector needs assessments across 6 commercial industries",
      "400 mid-career employees trained with audited post-training salary increases or job placements",
      "Certified MToT curriculum handed over to Afghan vocational institutions",
    ],
    status: "Completed",
    badge: "USAID Workforce Placement",
  },
  {
    id: "asmed-dai-usaid-engineering",
    title: "Construction Management Training for 300 University Graduates",
    client: "ASMED / DAI – USAID",
    period: "2011 – 2013",
    category: "Engineering Management & Training",
    location: "Kabul, Nangarhar & Kandahar Provinces",
    description: "Delivered intensive vocational engineering training in partnership with EPRSO covering construction safety, cost estimation, QA/QC, FIDIC contract management, planning, and AutoCAD for university engineering graduates.",
    keyOutputs: [
      "300 university civil engineering graduates trained and certified",
      "High rate of immediate employment placement with major infrastructure contractors",
      "Formal curricula endorsed by university engineering faculties",
    ],
    status: "Completed",
    badge: "USAID Engineering Certified",
  },
  {
    id: "worldbank-aaip-capacity",
    title: "Academic & Business English Language Program for Senior Government Officials",
    client: "Ministry of Agriculture (MAIL) – AAIP / The World Bank Group",
    period: "2013 – 2015",
    category: "Institutional Capacity Building",
    location: "Kabul, Afghanistan",
    description: "Tailored academic and business English training program for senior provincial and central directors of the Ministry of Agriculture, preparing them for overseas postgraduate studies and international negotiations.",
    keyOutputs: [
      "Comprehensive language diagnostics and cohort-based progression testing",
      "Senior government directors qualified for international academic fellowships",
      "Curriculum focused on agricultural economics, policy drafting, and international negotiation",
    ],
    status: "Completed",
    badge: "World Bank Institutional Grant",
  },
  {
    id: "national-assembly-dai-alba",
    title: "Public Policy, Administration & PMO Training for National Assembly Staff",
    client: "DAI – ALBA Project (USAID funded)",
    period: "2015 – 2017",
    category: "Governance & Legislative Capacity",
    location: "Kabul, Afghanistan",
    description: "Structured institutional development programs for parliamentary staff of the Wolesi Jirga (House of Representatives) and Meshrano Jirga (Senate), covering public policy formulation, effective office management, and project controls.",
    keyOutputs: [
      "Over 120 legislative research and administrative officers certified",
      "Formulation of standard operating procedures for committee management",
      "Enhanced committee reporting and inter-ministerial hearing protocols",
    ],
    status: "Completed",
    badge: "Parliamentary Strengthening",
  },
  {
    id: "taf-gmic-it-networking",
    title: "IT Networking, Structured Cabling & Systems Infrastructure",
    client: "Government Media & Information Center (GMIC) / The Asia Foundation (TAF)",
    period: "2011 – 2012",
    category: "IT Infrastructure & Networking",
    location: "Kabul, Afghanistan",
    description: "Turnkey enterprise network installation, high-density structured cabling, and server connectivity for the Government Media and Information Center in Kabul.",
    keyOutputs: [
      "Complete deployment of enterprise structured cabling, patch panels, and switching fabric",
      "High-speed fiber and wireless integration across government media briefing halls",
      "Provision of ongoing tier-2 network administration support",
    ],
    status: "Completed",
    badge: "Enterprise IT Deployment",
  },
  {
    id: "tetra-tech-isla-translation",
    title: "Governance Document Translation & Technical Localization",
    client: "Tetra Tech – USAID ISLA Project",
    period: "2017 – 2018",
    category: "Linguistic & Translation Services",
    location: "Kabul, Afghanistan",
    description: "Comprehensive translation of provincial governance guidelines, policy documentation, and municipal management frameworks from English into Dari and Pashto.",
    keyOutputs: [
      "Accredited bilingual translation of over 500,000 words of technical governance content",
      "Standardized terminology glossaries approved by provincial development directorates",
      "100% on-time delivery meeting USAID rigorous editorial standards",
    ],
    status: "Completed",
    badge: "USAID Governance Localization",
  },
  {
    id: "auaf-simultaneous-translation",
    title: "Simultaneous Interpretation Equipment & Certified Linguists",
    client: "American University of Afghanistan (AUAf)",
    period: "2012 – 2016",
    category: "Linguistic & Audio Engineering",
    location: "Kabul, Afghanistan",
    description: "Provision of digital simultaneous translation booths, multi-channel wireless audio receivers, and accredited conference interpreters for high-level diplomatic symposiums and academic conferences.",
    keyOutputs: [
      "Turnkey AV and booth deployment for international academic summits",
      "Certified trilingual interpretation (English, Dari, Pashto) with zero technical interruptions",
      "Long-term master equipment rental and technician support agreement",
    ],
    status: "Completed",
    badge: "Academic Summit Delivery",
  },
  {
    id: "kabul-conference-peace-jirga",
    title: "Event Management Consultancy for Kabul International Conference & Peace Jirga",
    client: "Office of the Administrative Affairs (OAA) & Coordinator Dr. Ashraf Ghani's Office",
    period: "2010 – 2011",
    category: "High-Level Events & Diplomacy",
    location: "Kabul (Loya Jirga Tent & Ministry of Foreign Affairs)",
    description: "Senior management consultancy, finance administration, and protocol logistics for the historic Kabul International Conference and the National Consultative Peace Jirga.",
    keyOutputs: [
      "Financial management and procurement coordination for international conference hosting",
      "Protocol reception, VIP logistics, and accreditation support for foreign delegations",
      "Direct recognition from the Conference Coordination Office for logistical excellence",
    ],
    status: "Completed",
    badge: "Historic Diplomatic Gathering",
  },
  {
    id: "finland-embassy-support",
    title: "Diplomatic Mission Facility Support, Logistics & Technical Translation",
    client: "Embassy of Finland in Kabul",
    period: "2013 – 2017",
    category: "Diplomatic & Governance",
    location: "Kabul, Afghanistan",
    description: "Multi-year turnkey administrative support, secure compound facility maintenance coordination, expatriate protocol logistics, and official diplomatic document translation for the Embassy of Finland in Kabul.",
    keyOutputs: [
      "Diplomatic compound maintenance and protocol life-support coordination",
      "Certified English-to-Dari/Pashto translation of bilateral diplomatic correspondence",
      "Full adherence to European Union mission security and confidentiality standards",
    ],
    status: "Completed",
    badge: "Diplomatic Mission Delivery",
  },
  {
    id: "harakat-investment-climate",
    title: "Private Sector Regulatory Reform & Commercial Feasibility Studies",
    client: "Harakat – Afghanistan Investment Climate Facility",
    period: "2015 – 2018",
    category: "Diplomatic & Governance",
    location: "Kabul, Herat & Mazar-e-Sharif",
    description: "Delivered comprehensive research, regulatory barrier analysis, and public-private dialogue workshops to streamline commercial licensing and remove operational bottlenecks for Afghan enterprises.",
    keyOutputs: [
      "Conducted nationwide commercial surveys analyzing municipal licensing hurdles",
      "Facilitated multi-stakeholder workshops with Ministry of Commerce and ACCI",
      "Produced actionable policy recommendations for private sector investment reform",
    ],
    status: "Completed",
    badge: "Economic Growth Initiative",
  },
  {
    id: "mofa-diplomatic-training",
    title: "Diplomatic Academy Pre-Service Training & Administrative Capacity Building",
    client: "Ministry of Foreign Affairs (MoFA) – Institute of Diplomacy",
    period: "2011 – 2013",
    category: "Capacity Building",
    location: "Kabul, Afghanistan",
    description: "Designed and facilitated intensive pre-service diplomatic administration, international protocol, and professional English courses for newly inducted civil servants entering the Afghan foreign service.",
    keyOutputs: [
      "Trained 120+ foreign service officers in international protocol and diplomatic correspondence",
      "Curriculum design covering public policy, treaty administration, and bilateral negotiation",
      "Pre- and post-competency examinations showing a 42% average gain in core competencies",
    ],
    status: "Completed",
    badge: "Sovereign Ministry Support",
  },
  {
    id: "british-council-curriculum",
    title: "Nationwide Educational Materials Localization & Quality Assurance",
    client: "British Council Afghanistan",
    period: "2014 – 2017",
    category: "Linguistics & IT",
    location: "Kabul, Jalalabad & Herat",
    description: "Turnkey translation, cultural localization, and proofreading of primary and secondary educational curricula, teacher training guides, and assessment rubrics.",
    keyOutputs: [
      "Localized over 850,000 words across educational modules into standard Dari and Pashto",
      "Strict multi-tier editorial QA workflow ensuring zero terminology inconsistency",
      "Supported nationwide rollout across regional educational development centers",
    ],
    status: "Completed",
    badge: "Multilateral Education Delivery",
  },
  {
    id: "isaf-media-monitoring",
    title: "Provincial Civic Outreach & Media Monitoring Impact Assessment",
    client: "ISAF / Regional Media Coordination Office",
    period: "2011 – 2012",
    category: "Diplomatic & Governance",
    location: "Kabul, Kandahar & Eastern Provinces",
    description: "Daily broadcast media tracking, sentiment analysis, and community perception reporting across radio, print, and regional television networks.",
    keyOutputs: [
      "Daily 24-hour media briefs tracking broadcast sentiment across Dari and Pashto channels",
      "Quarterly qualitative public perception reports from provincial community leaders",
      "Strict data integrity protocols and rapid reporting turnaround times",
    ],
    status: "Completed",
    badge: "Civic Media Monitoring",
  },
];

export const PARTNER_COMPANIES: PartnerCompany[] = [
  {
    name: "PUL Global Partners LLC",
    location: "Stafford & Fairfax, Virginia, United States",
    role: "U.S. Partner & Federal Contracting Bridge",
    description: "U.S.-incorporated sister company established in 2018 to facilitate international partnerships, U.S. Federal government contracting, global advisory, trade and investment facilitation, and worldwide mission support.",
    established: "2018",
    badge: "U.S. Partner Company",
    link: "https://pulglobal.com",
    logo: "/assets/brand/pul-global-partners.png",
    logoClassName: "h-8 sm:h-9 w-auto",
    capabilities: [
      "U.S. Federal Contracting & Compliance (CAGE: 08P09, UEI: UZHKYJLD5YK9)",
      "Management Consulting & Prime Contractor Subcontracting Support",
      "International Trade, Investment & Overseas Mission Coordination",
      "Virginia Registered Corporate Oversight & Governance",
    ],
  },
  {
    name: "Linguist Point International",
    location: "Global & Regional Operations",
    role: "Comprehensive Language & Interpretation Division",
    description: "Dedicated linguistic services company providing certified document translation, conference interpretation systems, and localization across 100+ global and regional languages for international organizations.",
    established: "2015",
    badge: "Language Solutions Division",
    link: "https://linguistpoint.com",
    logo: "/assets/brand/linguist-point-logo.png",
    logoClassName: "h-10 sm:h-11 w-auto",
    capabilities: [
      "Over 100+ Languages with certified and accredited native linguists",
      "Simultaneous Interpretation Booths & Digital Audio Equipment",
      "Legal, Technical, Engineering, and International Development Localization",
      "Trusted linguistic provider to AUAF, ADB, TAF, and British Council",
    ],
  },
  {
    name: "Quantu Tech LLC",
    location: "Virginia, United States",
    role: "Technology, AI Solutions & Enterprise Systems",
    description: "U.S.-registered technology solutions partner specializing in enterprise AI implementation, cloud systems architecture, custom software engineering, and digital modernization for businesses and organizations.",
    established: "2024",
    badge: "Technology & AI Partner",
    link: "https://quantutech.com",
    logo: "/assets/brand/quantu-tech-logo.svg",
    logoClassName: "h-9 sm:h-10 w-auto",
    capabilities: [
      "Responsible Enterprise AI Enablement & LLM Knowledge Workflows",
      "Cloud Architecture, Migrations & Distributed Infrastructure",
      "Modern Web Applications & Secure Database Platforms",
      "Digital Workflow Automation & Systems Integration",
    ],
  },
];

export const INSTITUTIONAL_STRENGTHS = [
  {
    title: "14+ Years of Proven Operational Continuity",
    description: "Founded in 2010, PUL Consulting has maintained uninterrupted professional delivery through changing regimes, shifting regulations, and complex environments across Afghanistan.",
    icon: "Clock",
  },
  {
    title: "PMP® & Scrum Master Certified Practice Leadership",
    description: "Our core PMO methodology is built upon PMI standards, Result-Based Management (RBM), and agile sprint governance, ensuring rigorous control from initiation to contract closeout.",
    icon: "Award",
  },
  {
    title: "Multi-Disciplinary Executive Seniority",
    description: "Our leadership cadre brings alumni of the American University of Afghanistan (AUAf), Fairleigh Dickinson University, Indian Institute of Management Studies, and former directors from Agence Française de Développement (€50M+ portfolio).",
    icon: "GraduationCap",
  },
  {
    title: "Clean Fiduciary & Audit Compliance Record",
    description: "Unblemished compliance record through rigorous third-party audits by USAID, The World Bank, GIZ, and the Ministry of Finance, supported by active licenses, TIN 9000010281, and AISA registration.",
    icon: "ShieldCheck",
  },
  {
    title: "Field Deployment Reach Across 15+ Provinces",
    description: "Deep in-country relationships and robust logistical networks enabling rapid mobilization of local teams, facilities, and technical resources within 72 hours of project award.",
    icon: "MapPin",
  },
  {
    title: "Cross-Border Synergy with U.S. Partner Entities",
    description: "Seamless coordination with PUL Global Partners LLC (Virginia, USA) and Quantu Tech LLC, providing dual-continent reach, federal compliance standards, and cutting-edge technical capabilities.",
    icon: "Globe2",
  },
];
