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
  sourceEntry: number;
  sourcePage: number;
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
    value: "16+",
    label: "Years in Operation",
    description: "Delivering continuous management consulting and operational programs since 2010",
  },
  {
    id: "projects",
    value: "34",
    label: "Project Register Entries",
    description: "Individual historical assignments in the 29 October 2026 company profile",
  },
  {
    id: "personnel",
    value: "300",
    label: "Engineering Graduates",
    description: "200 trained in Kabul, 50 in Nangarhar, and 50 in Kandahar",
  },
  {
    id: "agents",
    value: "200",
    label: "Call Center Team (Approx.)",
    description: "About 200 Etisalat personnel under the September 2013–September 2015 agreement",
  },
  {
    id: "provinces",
    value: "15",
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
    shortDesc: "Project planning, PMO setup, results-based management, and hands-on delivery coordination.",
    image: "/assets/services/service-pmo.jpg",
    category: "Strategic PMO",
    deliveryBy: "PUL Consulting",
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
    deliveryBy: "With Quantu Tech LLC · Virginia, USA",
    pillar: "Pillar II: Technology & Enterprise AI",
  },
  {
    id: "training-capacity",
    number: 3,
    title: "Training & Institutional Capacity Building",
    kicker: "Workforce Upskilling",
    shortDesc: "Training of trainers, engineering management courses, and workforce development for public and private organizations.",
    image: "/assets/services/service-training.jpg",
    category: "Strategic PMO",
    deliveryBy: "PUL Consulting",
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
    deliveryBy: "PUL Consulting",
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
    deliveryBy: "PUL Consulting",
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
    kicker: "Translation & Localization",
    shortDesc: "Official certified multi-pair translation, conference interpretation booths, and localization across 100+ languages.",
    image: "/assets/services/service-translation.jpg",
    category: "Governance & Support",
    deliveryBy: "With Linguist Point International",
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
    deliveryBy: "PUL Consulting",
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
    deliveryBy: "PUL Consulting",
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
    deliveryBy: "PUL Consulting",
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
    deliveryBy: "PUL Consulting",
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
    scope: "Separate GIZ soft skills training assignments: 1,800 police officers in six provinces and a 15-province assignment with catering for more than 5,000 people",
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
    scope: "Workforce administration and call center services: more than 180 personnel in 2012–2013 and about 200 in 2013–2015; separate contract scopes",
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
    scope: "English-to-Dari and Pashto translation under the British Council Tawanmandi long-term agreement",
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
    scope: "Separate AWDP assignments for master trainer development and training and placement services for 400 people",
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

// Reconciled to all 34 entries in the 29 October 2026 Company Profile.
// Missing dates and locations are deliberately not inferred. Status is historical.
// Reconciled to all 34 entries in the 29 October 2026 Company Profile.
// Missing dates and locations are deliberately not inferred. Status is historical.
export const COMPREHENSIVE_PROJECT_DATABASE: DetailedProject[] = [
  {
    "id": "huawei-master-agreement",
    "title": "Huawei HR and Payroll Administration",
    "client": "Huawei Technologies Afghanistan",
    "period": "From October 2020; end date not stated",
    "category": "Human Resources & Telecom Operations",
    "location": "Not specified in source",
    "description": "Human resources, payroll management and administrative support under an employment cooperation agreement.",
    "keyOutputs": [
      "Human resources and payroll management",
      "Administrative support under an employment cooperation agreement"
    ],
    "status": "Completed",
    "badge": "Human Resources & Telecom Operations",
    "sourceEntry": 1,
    "sourcePage": 13
  },
  {
    "id": "giz-15-provinces-2019",
    "title": "GIZ Soft Skills Training Across 15 Provinces",
    "client": "GIZ",
    "period": "July–December 2019",
    "category": "Capacity Building & Logistics",
    "location": "15 provinces in Afghanistan",
    "description": "Communication, conflict management and resolution, team building and time management training. Catering for more than 5,000 people across the provinces was also provided.",
    "keyOutputs": [
      "Communication, conflict management, team building and time management training",
      "Catering for more than 5,000 people"
    ],
    "status": "Completed",
    "badge": "Capacity Building & Logistics",
    "sourceEntry": 2,
    "sourcePage": 13
  },
  {
    "id": "giz-police-training-2018",
    "title": "GIZ Training for 1800 Police Officers",
    "client": "GIZ",
    "period": "September 2018–February 2019",
    "category": "Capacity Building & Logistics",
    "location": "Samangan, Mazar-e-Sharif, Jawzjan, Kunduz, Takhar & Badakhshan",
    "description": "Soft skills training in Samangan, Mazar-e-Sharif, Jawzjan, Kunduz, Takhar and Badakhshan, with catering for more than 1,800 people.",
    "keyOutputs": [
      "Soft skills training for 1,800 police officers",
      "Catering for more than 1,800 people"
    ],
    "status": "Completed",
    "badge": "Capacity Building & Logistics",
    "sourceEntry": 3,
    "sourcePage": 13
  },
  {
    "id": "huawei-2018-2020",
    "title": "Huawei HR and Payroll Administration",
    "client": "Huawei Technologies Afghanistan",
    "period": "October 2018–September 2020",
    "category": "Human Resources & Telecom Operations",
    "location": "Not specified in source",
    "description": "Human resources, payroll management and administrative support under an employment cooperation agreement.",
    "keyOutputs": [
      "Human resources and payroll management",
      "Administrative support under an employment cooperation agreement"
    ],
    "status": "Completed",
    "badge": "Human Resources & Telecom Operations",
    "sourceEntry": 4,
    "sourcePage": 13
  },
  {
    "id": "national-export-strategy",
    "title": "National Export Strategy Implementation",
    "client": "Export Promotion Agency of Afghanistan",
    "period": "15 September–15 December 2018",
    "category": "Trade Strategy & Governance",
    "location": "Afghanistan",
    "description": "Project management and implementation support for the National Export Strategy through the Advancing Afghan Trade project.",
    "keyOutputs": [
      "Project management for Advancing Afghan Trade",
      "National Export Strategy implementation support"
    ],
    "status": "Completed",
    "badge": "Trade Strategy & Governance",
    "sourceEntry": 5,
    "sourcePage": 13
  },
  {
    "id": "awdp-master-trainers",
    "title": "Master Training of Trainers",
    "client": "AWDP / Creative Associates / USAID",
    "period": "10 December 2017–10 April 2018",
    "category": "Capacity Building & Training",
    "location": "Afghanistan",
    "description": "Master training of trainers for instructors in private and semi-public training institutions. The assignment also included catering support.",
    "keyOutputs": [
      "Master training of trainers for private and semi-public training institutions",
      "Catering support"
    ],
    "status": "Completed",
    "badge": "Capacity Building & Training",
    "sourceEntry": 6,
    "sourcePage": 13
  },
  {
    "id": "awdp-creative-usaid",
    "title": "Demand Driven Training and Job Placement",
    "client": "AWDP / Creative Associates / USAID",
    "period": "21 December 2016–21 September 2017",
    "category": "Workforce Development & Training",
    "location": "Not specified in source",
    "description": "Project management training and placement services for 400 mid-career employees and job seekers; employer needs assessments for competency-based learning; catering support.",
    "keyOutputs": [
      "Project management training and placement services for 400 people",
      "Employer needs assessments and catering support"
    ],
    "status": "Completed",
    "badge": "Workforce Development & Training",
    "sourceEntry": 7,
    "sourcePage": 14
  },
  {
    "id": "tetra-tech-isla-translation",
    "title": "ISLA Project Translation Services",
    "client": "Tetra Tech / USAID ISLA",
    "period": "June 2017–2018",
    "category": "Translation & Linguistic Services",
    "location": "Not specified in source",
    "description": "Translation of project materials from English into Dari and Pashto.",
    "keyOutputs": [
      "Translation of ISLA project materials from English into Dari",
      "Translation of ISLA project materials from English into Pashto"
    ],
    "status": "Completed",
    "badge": "Translation & Linguistic Services",
    "sourceEntry": 8,
    "sourcePage": 14
  },
  {
    "id": "taf-annual-survey-2016",
    "title": "Annual Survey Publication Translation",
    "client": "The Asia Foundation",
    "period": "2016 survey publication",
    "category": "Translation & Linguistic Services",
    "location": "Not specified in source",
    "description": "Translation of The Asia Foundation’s annual survey book from English into Dari and Pashto.",
    "keyOutputs": [
      "Translation of The Asia Foundation’s 2016 annual survey publication",
      "English into Dari and Pashto"
    ],
    "status": "Completed",
    "badge": "Translation & Linguistic Services",
    "sourceEntry": 9,
    "sourcePage": 14
  },
  {
    "id": "huawei-2016-2018",
    "title": "Huawei HR and Payroll Administration",
    "client": "Huawei Technologies Afghanistan",
    "period": "October 2016–September 2018",
    "category": "Human Resources & Telecom Operations",
    "location": "Not specified in source",
    "description": "Human resources, payroll management and administrative support under an employment cooperation agreement.",
    "keyOutputs": [
      "Human resources and payroll management",
      "Administrative support under an employment cooperation agreement"
    ],
    "status": "Completed",
    "badge": "Human Resources & Telecom Operations",
    "sourceEntry": 10,
    "sourcePage": 14
  },
  {
    "id": "national-assembly-project-management",
    "title": "Project Management Training",
    "client": "DAI ALBA",
    "period": "Not stated in source",
    "category": "Governance & Legislative Capacity",
    "location": "Afghanistan National Assembly",
    "description": "Project management training for National Assembly staff.",
    "keyOutputs": [
      "Project management training",
      "Training for National Assembly staff"
    ],
    "status": "Completed",
    "badge": "Governance & Legislative Capacity",
    "sourceEntry": 11,
    "sourcePage": 14
  },
  {
    "id": "wolesi-jirga-public-policy",
    "title": "Public Policy and Administration Training",
    "client": "DAI ALBA",
    "period": "Not stated in source",
    "category": "Governance & Legislative Capacity",
    "location": "Wolesi Jirga",
    "description": "Public policy and public administration training for Wolesi Jirga staff.",
    "keyOutputs": [
      "Public policy training",
      "Public administration training for Wolesi Jirga staff"
    ],
    "status": "Completed",
    "badge": "Governance & Legislative Capacity",
    "sourceEntry": 12,
    "sourcePage": 14
  },
  {
    "id": "wolesi-jirga-office-management",
    "title": "Effective Office Management Training",
    "client": "DAI ALBA",
    "period": "Not stated in source",
    "category": "Governance & Legislative Capacity",
    "location": "Wolesi Jirga",
    "description": "Effective office management training for Wolesi Jirga staff.",
    "keyOutputs": [
      "Effective office management training",
      "Training for Wolesi Jirga staff"
    ],
    "status": "Completed",
    "badge": "Governance & Legislative Capacity",
    "sourceEntry": 13,
    "sourcePage": 15
  },
  {
    "id": "worldbank-aaip-business-english",
    "title": "Academic and Business English Training",
    "client": "MAIL / AAIP / World Bank funding",
    "period": "20 December 2014–20 April 2015",
    "category": "Institutional Capacity Building",
    "location": "MAIL senior provincial staff",
    "description": "Academic and business English language training for senior provincial staff of the Ministry of Agriculture, Irrigation and Livestock.",
    "keyOutputs": [
      "Academic English language training",
      "Business English language training"
    ],
    "status": "Completed",
    "badge": "Institutional Capacity Building",
    "sourceEntry": 14,
    "sourcePage": 15
  },
  {
    "id": "huawei-2014-2016",
    "title": "Huawei HR and Payroll Administration",
    "client": "Huawei Technologies Afghanistan",
    "period": "October 2014–September 2016",
    "category": "Human Resources & Telecom Operations",
    "location": "Not specified in source",
    "description": "Human resources, payroll management and administrative support under an employment cooperation agreement.",
    "keyOutputs": [
      "Human resources and payroll management",
      "Administrative support under an employment cooperation agreement"
    ],
    "status": "Completed",
    "badge": "Human Resources & Telecom Operations",
    "sourceEntry": 15,
    "sourcePage": 15
  },
  {
    "id": "etisalat-callcenter-deployment",
    "title": "Etisalat Workforce and Call Center Services",
    "client": "Etisalat Afghanistan",
    "period": "September 2013–September 2015",
    "category": "Human Resources & Telecom Operations",
    "location": "Not specified in source",
    "description": "Recruitment, payroll administration, daily supervision and management of about 200 call center agents, project managers, HR coordinators and team leaders.",
    "keyOutputs": [
      "Recruitment and payroll administration",
      "Daily supervision and management of about 200 call center and related personnel"
    ],
    "status": "Completed",
    "badge": "Human Resources & Telecom Operations",
    "sourceEntry": 16,
    "sourcePage": 15
  },
  {
    "id": "kabul-skyscraper-financial-systems",
    "title": "Accounting and Financial Management Systems",
    "client": "Kabul Skyscraper Services",
    "period": "December 2014",
    "category": "Financial Management & Governance",
    "location": "Head office and project staff",
    "description": "Development of accounting and financial management systems, with training for head office and project staff.",
    "keyOutputs": [
      "Accounting and financial management system development",
      "Training for head office and project staff"
    ],
    "status": "Completed",
    "badge": "Financial Management & Governance",
    "sourceEntry": 17,
    "sourcePage": 15
  },
  {
    "id": "worldbank-aaip-postgraduate-english",
    "title": "English Training for Senior Government Officials",
    "client": "MAIL / AAIP / World Bank funding",
    "period": "May 2013–July 2014",
    "category": "Institutional Capacity Building",
    "location": "Not specified in source",
    "description": "English language training to prepare senior government officials for postgraduate study overseas.",
    "keyOutputs": [
      "English language training for senior government officials",
      "Preparation for postgraduate study overseas"
    ],
    "status": "Completed",
    "badge": "Institutional Capacity Building",
    "sourceEntry": 18,
    "sourcePage": 15
  },
  {
    "id": "etisalat-workforce-language-training",
    "title": "Etisalat Workforce and Language Training",
    "client": "Etisalat Afghanistan",
    "period": "September 2012–August 2013",
    "category": "Human Resources & Telecom Operations",
    "location": "Not specified in source",
    "description": "Recruitment, payroll administration, supervision and management for more than 180 call center personnel and related staff. English, Dari, Pashto and customer care training.",
    "keyOutputs": [
      "Recruitment, payroll, supervision and management for more than 180 personnel",
      "English, Dari, Pashto and customer care training"
    ],
    "status": "Completed",
    "badge": "Human Resources & Telecom Operations",
    "sourceEntry": 19,
    "sourcePage": 16
  },
  {
    "id": "etisalat-translation",
    "title": "Etisalat Translation Services",
    "client": "Etisalat Afghanistan",
    "period": "Not stated in source",
    "category": "Translation & Linguistic Services",
    "location": "Not specified in source",
    "description": "Translation services from English into Dari and Pashto.",
    "keyOutputs": [
      "Translation from English into Dari",
      "Translation from English into Pashto"
    ],
    "status": "Completed",
    "badge": "Translation & Linguistic Services",
    "sourceEntry": 20,
    "sourcePage": 16
  },
  {
    "id": "british-council-tawanmandi",
    "title": "Tawanmandi Translation Agreement",
    "client": "British Council Tawanmandi",
    "period": "Not stated in source",
    "category": "Translation & Linguistic Services",
    "location": "Not specified in source",
    "description": "Translation from English into Dari and Pashto under a long-term agreement.",
    "keyOutputs": [
      "Long-term translation agreement for Tawanmandi",
      "English into Dari and Pashto"
    ],
    "status": "Completed",
    "badge": "Translation & Linguistic Services",
    "sourceEntry": 21,
    "sourcePage": 16
  },
  {
    "id": "taf-professional-translation",
    "title": "Professional Translation Agreement",
    "client": "The Asia Foundation",
    "period": "Not stated in source",
    "category": "Translation & Linguistic Services",
    "location": "Not specified in source",
    "description": "Professional translation from English into Dari and Pashto, and from Dari and Pashto into English, under a long-term agreement.",
    "keyOutputs": [
      "Professional translation under a long-term agreement",
      "English into Dari and Pashto, and Dari and Pashto into English"
    ],
    "status": "Completed",
    "badge": "Translation & Linguistic Services",
    "sourceEntry": 22,
    "sourcePage": 16
  },
  {
    "id": "asmed-kabul-construction",
    "title": "Construction Management Training in Kabul",
    "client": "ASMED / DAI / USAID",
    "period": "Not stated in source",
    "category": "Engineering Management & Training",
    "location": "Kabul Province",
    "description": "Business English, project management, construction safety, cost and quality management, contracts, planning and scheduling, and AutoCAD.",
    "keyOutputs": [
      "Construction management training for 200 university graduates",
      "Business English, safety, cost, quality, contracts, planning, scheduling and AutoCAD"
    ],
    "status": "Completed",
    "badge": "Engineering Management & Training",
    "sourceEntry": 23,
    "sourcePage": 16
  },
  {
    "id": "asmed-nangarhar-construction",
    "title": "Construction Management Training in Nangarhar",
    "client": "ASMED / DAI / USAID",
    "period": "Not stated in source",
    "category": "Engineering Management & Training",
    "location": "Nangarhar Province",
    "description": "Construction project management training covering business English, safety, cost and quality management, contracts, scheduling and AutoCAD.",
    "keyOutputs": [
      "Construction management training for 50 university graduates",
      "Business English, safety, cost, quality, contracts, scheduling and AutoCAD"
    ],
    "status": "Completed",
    "badge": "Engineering Management & Training",
    "sourceEntry": 24,
    "sourcePage": 16
  },
  {
    "id": "asmed-kandahar-construction",
    "title": "Construction Management Training in Kandahar",
    "client": "ASMED / DAI / USAID",
    "period": "Not stated in source",
    "category": "Engineering Management & Training",
    "location": "Kandahar Province",
    "description": "Construction project management training covering business English, safety, cost and quality management, contracts, scheduling and AutoCAD.",
    "keyOutputs": [
      "Construction management training for 50 university graduates",
      "Business English, safety, cost, quality, contracts, scheduling and AutoCAD"
    ],
    "status": "Completed",
    "badge": "Engineering Management & Training",
    "sourceEntry": 25,
    "sourcePage": 17
  },
  {
    "id": "air-kandahar-assessment",
    "title": "Kandahar Municipality Field Assessment",
    "client": "AIR Consulting",
    "period": "Not stated in source",
    "category": "Research & Monitoring and Evaluation",
    "location": "Kandahar Municipality",
    "description": "Field survey, assessment and translation of focus group material from Pashto into English, with a recorded scope of 180,000 words.",
    "keyOutputs": [
      "Field survey and assessment",
      "Pashto-to-English translation of focus group material, with a recorded scope of 180,000 words"
    ],
    "status": "Completed",
    "badge": "Research & Monitoring and Evaluation",
    "sourceEntry": 26,
    "sourcePage": 17
  },
  {
    "id": "avipa-plus-weekly-reporting",
    "title": "AVIPA Plus Weekly Reporting",
    "client": "Aouj (subcontract for IRD AVIPA Plus)",
    "period": "Not stated in source",
    "category": "Reporting & Program Support",
    "location": "Not specified in source",
    "description": "Weekly report work recorded in the portfolio as subcontracted through Aouj for the IRD AVIPA Plus program.",
    "keyOutputs": [
      "Weekly reporting work for IRD AVIPA Plus",
      "Subcontracted through Aouj"
    ],
    "status": "Completed",
    "badge": "Reporting & Program Support",
    "sourceEntry": 27,
    "sourcePage": 17
  },
  {
    "id": "auaf-simultaneous-translation",
    "title": "Simultaneous Interpretation Services",
    "client": "American University of Afghanistan",
    "period": "Not stated in source",
    "category": "Linguistic & Interpretation Services",
    "location": "American University of Afghanistan",
    "description": "Simultaneous translation and interpretation, including provision of interpretation equipment.",
    "keyOutputs": [
      "Simultaneous translation and interpretation",
      "Provision of interpretation equipment"
    ],
    "status": "Completed",
    "badge": "Linguistic & Interpretation Services",
    "sourceEntry": 28,
    "sourcePage": 17
  },
  {
    "id": "midfield-policy-translation",
    "title": "Policy and Code of Conduct Translation",
    "client": "Midfield International",
    "period": "Not stated in source",
    "category": "Translation & Linguistic Services",
    "location": "Not specified in source",
    "description": "Translation of policies and codes of conduct.",
    "keyOutputs": [
      "Policy translation",
      "Code of conduct translation"
    ],
    "status": "Completed",
    "badge": "Translation & Linguistic Services",
    "sourceEntry": 29,
    "sourcePage": 17
  },
  {
    "id": "adb-strategy-translation",
    "title": "ADB Strategy Translation",
    "client": "Aouj (subcontract for Asian Development Bank strategy)",
    "period": "Not stated in source",
    "category": "Translation & Linguistic Services",
    "location": "Not specified in source",
    "description": "Translation of an Asian Development Bank strategy, recorded as subcontracted through Aouj.",
    "keyOutputs": [
      "Translation of an Asian Development Bank strategy",
      "Subcontracted through Aouj"
    ],
    "status": "Completed",
    "badge": "Translation & Linguistic Services",
    "sourceEntry": 30,
    "sourcePage": 17
  },
  {
    "id": "building-afghan-markets-assessment",
    "title": "Afghan Products Market Assessment",
    "client": "Building Afghan Markets",
    "period": "Not stated in source",
    "category": "Research & Monitoring and Evaluation",
    "location": "Kabul and five other regions",
    "description": "Market assessment and survey to support promotion of Afghan products in Kabul and five other regions.",
    "keyOutputs": [
      "Market assessment and survey",
      "Support for the promotion of Afghan products"
    ],
    "status": "Completed",
    "badge": "Research & Monitoring and Evaluation",
    "sourceEntry": 31,
    "sourcePage": 18
  },
  {
    "id": "etisalat-hr-manual-translation",
    "title": "Human Resources Manual Translation",
    "client": "Etisalat Afghanistan",
    "period": "Not stated in source",
    "category": "Translation & Linguistic Services",
    "location": "Not specified in source",
    "description": "Translation of the company’s human resources manual.",
    "keyOutputs": [
      "Translation of the company’s human resources manual"
    ],
    "status": "Completed",
    "badge": "Translation & Linguistic Services",
    "sourceEntry": 32,
    "sourcePage": 18
  },
  {
    "id": "kabul-conference-peace-jirga",
    "title": "Kabul Conference Events Consultancy",
    "client": "Office of the Coordinator of the Kabul Conference",
    "period": "Not stated in source",
    "category": "Events & Governance",
    "location": "Office of the Coordinator of the Kabul Conference",
    "description": "Provision of an events management consultant to the Office of the Coordinator.",
    "keyOutputs": [
      "Provision of an events management consultant",
      "Consultancy support to the Office of the Coordinator"
    ],
    "status": "Completed",
    "badge": "Events & Governance",
    "sourceEntry": 33,
    "sourcePage": 18
  },
  {
    "id": "taf-gmic-it-networking",
    "title": "Internet Networking and Cabling",
    "client": "Government Media and Information Center / The Asia Foundation",
    "period": "Not stated in source",
    "category": "IT Infrastructure & Networking",
    "location": "Government Media and Information Center",
    "description": "Internet networking and cabling services.",
    "keyOutputs": [
      "Internet networking services",
      "Cabling services"
    ],
    "status": "Completed",
    "badge": "IT Infrastructure & Networking",
    "sourceEntry": 34,
    "sourcePage": 18
  }
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
      "100+ languages supported by specialist native linguists",
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
    title: "Proven Operational Continuity Since 2010",
    description: "Founded in 2010, PUL Consulting has maintained uninterrupted professional delivery through changing regimes, shifting regulations, and complex environments across Afghanistan.",
    icon: "Clock",
  },
  {
    title: "Project Management & Digital Enablement",
    description: "We apply PMI-informed planning, Agile and Scrum practices, and results-based management to clarify milestones, manage risks, and track progress. Specialist partners support appropriate uses of AI and workflow automation.",
    icon: "Award",
  },
  {
    title: "Multidisciplinary Leadership Experience",
    description: "Our leadership team brings academic and executive credentials from the American University of Afghanistan (AUAf), Fairleigh Dickinson University (USA), and Indian Institute of Management Studies, combined with former directorship over €50M+ donor-funded international portfolios.",
    icon: "GraduationCap",
  },
  {
    title: "Financial & Contractual Accountability",
    description: "Audited financial and contractual performance through donor and partner engagements including USAID, The World Bank, GIZ, and the Ministry of Finance, supported by active corporate registration, TIN 9000010281, and AISA license.",
    icon: "ShieldCheck",
  },
  {
    title: "Project Experience Across 15 Provinces",
    description: "Local relationships and logistics networks support the mobilization of teams, facilities, and technical resources. Mobilization plans are tailored to the scope, location, and operating conditions of each assignment.",
    icon: "MapPin",
  },
  {
    title: "International Partner Coordination",
    description: "Collaboration with PUL Global Partners LLC and Quantu Tech LLC in Virginia connects local delivery with international advisory, contracting support, and technology expertise.",
    icon: "Globe2",
  },
];
