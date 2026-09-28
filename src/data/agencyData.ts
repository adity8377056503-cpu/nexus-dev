import type { 
  Project, 
  Service, 
  Benefit, 
  ProcessStep, 
  ClientReview, 
  PricingPlan, 
  FAQItem, 
  AgencyStats,
  TeamMember
} from '../types';

export const initialStats: AgencyStats = {
  projects: '20+',
  clients: '15+',
  satisfaction: '100%',
  support: '24/7',
};

export const featuredProjects: Project[] = [
  {
    id: 'business-website',
    number: '01',
    name: 'Business Website',
    category: 'Web Development · Branding',
    tagline: 'Modern Digital Experience',
    industry: 'Enterprise & Commercial',
    services: ['Web Development', 'Branding'],
    filterTags: ['Web', 'Branding'],
    description: 'A modern, responsive and high-performance flagship website built with clean architecture, sub-second page loads, and refined branding to elevate market presence and client acquisition.',
    metrics: '99/100 Lighthouse Performance • +140% Inbound Inquiries',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop',
    color: 'from-purple-600/30 to-indigo-600/10',
    featured: true,
    highlights: [
      'Modular component design system calibrated for rapid enterprise deployment.',
      'Optimized Core Web Vitals achieving sub-second global response times.',
      'Seamless lead capture flows with automated CRM integration.'
    ]
  },
  {
    id: 'social-media-campaign',
    number: '02',
    name: 'Social Media Campaign',
    category: 'Graphic Design · Video Production',
    tagline: 'Visual Storytelling & Growth',
    industry: 'Digital Marketing & Content',
    services: ['Graphic Design', 'Video Production'],
    filterTags: ['Design', 'Video'],
    description: 'High-engagement multimedia visual campaign featuring bespoke motion graphics, high-retention short-form reels, and cohesive graphic identity designed for digital scale.',
    metrics: '3.4M+ Video Impressions • +85% Follower Growth',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1400&auto=format&fit=crop',
    color: 'from-fuchsia-600/30 to-pink-600/10',
    featured: true,
    highlights: [
      'Engineered high-hook retention pacing for short-form Reels and Shorts.',
      'Created bespoke visual design systems for consistent multi-platform branding.',
      'Optimized visual pacing and sound design to maximize viewer completion rate.'
    ]
  },
  {
    id: 'ai-powered-dashboard',
    number: '03',
    name: 'AI-Powered Dashboard',
    category: 'Data Analytics · Generative AI',
    tagline: 'Intelligent Telemetry & Insights',
    industry: 'Data Analytics & AI',
    services: ['Data Analytics', 'Generative AI'],
    filterTags: ['Data', 'AI'],
    description: 'An intelligent real-time analytics suite combining live data telemetry, interactive KPI dashboards, and generative AI automated synthesis for executive decision-making.',
    metrics: 'Real-time Telemetry • 0.3s Query Speed • Automated Synthesis',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop',
    color: 'from-violet-600/30 to-cyan-500/10',
    featured: true,
    highlights: [
      'Interactive visual charting and automated anomaly detection algorithms.',
      'Generative AI executive summaries delivered directly from tabular telemetry.',
      'Scalable data architecture processing high-velocity event pipelines.'
    ]
  },
  {
    id: 'brand-identity',
    number: '04',
    name: 'Brand Identity',
    category: 'Branding · Graphic Design',
    tagline: 'Distinctive Visual Language',
    industry: 'Brand Strategy & Design',
    services: ['Branding', 'Graphic Design'],
    filterTags: ['Branding', 'Design'],
    description: 'A comprehensive, memorable digital brand identity system including logo design, color systems, distinctive typography pairings, and thorough digital brand guidelines.',
    metrics: 'Complete Brand Suite • Full Vector Guidelines & Assets',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1400&auto=format&fit=crop',
    color: 'from-purple-500/30 to-fuchsia-500/10',
    featured: true,
    highlights: [
      'Custom vector mark geometry crafted for clarity from favicon to billboard scale.',
      'Mathematically balanced color palettes tested for high-contrast digital accessibility.',
      'Comprehensive digital brand handbook defining usage rules across web and print.'
    ]
  },
  {
    id: 'digital-content-campaign',
    number: '05',
    name: 'Digital Content Campaign',
    category: 'Video Production · Photo Editing',
    tagline: 'Cinematic Media Production',
    industry: 'Creative Media & Production',
    services: ['Video Production', 'Photo Editing'],
    filterTags: ['Video', 'Design'],
    description: 'Transforming raw footage and visuals into polished, cinematic promotional videos and high-impact digital photo assets engineered to capture viewer attention.',
    metrics: 'Cinematic 4K Master • 92% Viewer Retention',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1400&auto=format&fit=crop',
    color: 'from-fuchsia-600/20 to-purple-800/20',
    featured: true,
    highlights: [
      'Dynamic multi-cam editing and custom sound engineering tailored for modern feeds.',
      'High-fidelity color correction and photo enhancement for product campaigns.',
      'Multi-aspect ratio exports optimized for TikTok, Instagram, and YouTube.'
    ]
  },
  {
    id: 'business-operations-solution',
    number: '06',
    name: 'Business Operations Solution',
    category: 'Data · Operations · Automation',
    tagline: 'Workflow & Process Automation',
    industry: 'Enterprise Operations',
    services: ['Data', 'Operations', 'Automation'],
    filterTags: ['Data', 'Operations'],
    description: 'Streamlining operational bottlenecks through structured digital processes, automated workflow routing, connected business toolings, and centralized KPI tracking.',
    metrics: '-65% Manual Effort • 3.8x Operational Velocity',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop',
    color: 'from-indigo-600/30 to-purple-600/15',
    featured: true,
    highlights: [
      'Automated routing of inbound requests and inter-departmental notifications.',
      'Unified operational dashboard tracking turnaround times and milestones.',
      'Fault-tolerant integration between records management, forms, and databases.'
    ]
  }
];

export const teamMembersData: TeamMember[] = [
  {
    id: 'aditya-raj',
    name: 'Aditya Raj',
    role: 'Founder & CEO',
    bio: "Leads the company's vision, strategy and digital direction, combining data analytics, generative AI and AI-agent technologies to build intelligent solutions and create meaningful business outcomes.",
    skills: [
      'Data Analytics',
      'Dashboard Development',
      'Generative AI',
      'AI Agents',
      'Data Visualization',
      'Business Intelligence'
    ],
    isFounder: true,
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'krish-sharma',
    name: 'Krish Sharma',
    role: 'Co-Founder — Nexus Dev',
    bio: 'Builds modern, responsive and user-focused web experiences with a focus on functionality, performance and clean digital experiences.',
    skills: [
      'Web Development',
      'Responsive Websites',
      'Web Solutions'
    ],
    isFounder: false,
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'shruti-verma',
    name: 'Shruti Verma',
    role: 'Accounts & Records Executive',
    bio: 'Manages accounts and business records with a focus on accuracy, organization and smooth day-to-day documentation.',
    skills: [
      'Accounts',
      'Record Management',
      'Documentation'
    ],
    isFounder: false,
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'gaurav',
    name: 'Gaurav',
    role: 'Video & Photo Editor',
    bio: 'Transforms raw footage and visuals into polished, engaging content through creative video and photo editing.',
    skills: [
      'Video Editing',
      'Photo Editing',
      'Visual Content'
    ],
    isFounder: false,
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'neha-singh',
    name: 'Neha Singh',
    role: 'Frontend & Website Developer',
    bio: 'Develops responsive and practical websites that combine clean design, usability and reliable functionality.',
    skills: [
      'Frontend Development',
      'Website Development',
      'Responsive Design'
    ],
    isFounder: false,
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'vikas-kumar',
    name: 'Vikas Kumar',
    role: 'Graphic Designer',
    bio: 'Creates engaging visual designs that help brands communicate their ideas clearly and build a consistent digital presence.',
    skills: [
      'Graphic Design',
      'Visual Design',
      'Creative Content'
    ],
    isFounder: false,
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'isha',
    name: 'Isha',
    role: 'SEO Specialist',
    specialty: 'Advanced SEO & Search Optimization',
    bio: 'Isha helps optimize client websites for search engines through keyword research, on-page SEO, technical SEO, content optimization, and search performance analysis.',
    skills: [
      'Keyword Research',
      'On-Page SEO',
      'Technical SEO',
      'Content Optimization',
      'Search Performance Analysis'
    ],
    isFounder: false,
    linkedin: 'https://linkedin.com'
  }
];

export const servicesData: Service[] = [
  {
    number: '01',
    title: 'Web Development',
    shortDesc: 'High-performance, responsive websites and custom web applications engineered for speed, conversions, and scale.',
    fullDesc: 'Nexus Devs delivers full-stack web development services and modern website design for startups, growing companies, and ambitious brands. We engineer ultra-fast, mobile-first websites and web applications with clean TypeScript architecture, sub-second load times, and intuitive UI/UX. Whether you need a corporate business website, high-converting landing page, headless e-commerce store, or custom web portal, our performance-first engineering turns visitors into engaged customers while giving you a future-proof digital platform.',
    deliverables: [
      'Custom Business Websites',
      'High-Converting Landing Pages',
      'Headless E-commerce Solutions',
      'Full-Stack Web Applications'
    ],
    iconName: 'Code2'
  },
  {
    number: '02',
    title: 'Video Production & Editing',
    shortDesc: 'Engaging visual storytelling, cinematic motion graphics, and high-retention video editing built for modern digital platforms.',
    fullDesc: 'As a specialized video production agency and creative editing studio, Nexus Devs crafts scroll-stopping visual content for modern brands, creators, and marketers. We transform raw footage into cinematic promotional videos, YouTube long-form content, and high-retention Instagram Reels and TikTok shorts. By pairing purposeful narrative pacing with custom sound design and motion graphics, we solve audience retention drop-offs and amplify your brand’s digital reach across every social channel.',
    deliverables: [
      'Short-Form Reels & TikToks',
      'Cinematic Promotional Videos',
      'YouTube Video Production',
      'Motion Graphics & Visual FX'
    ],
    iconName: 'Video'
  },
  {
    number: '03',
    title: 'Graphic Design',
    shortDesc: 'High-impact visual communication, marketing creatives, and digital assets that captivate audiences and elevate brand authority.',
    fullDesc: 'Our graphic design agency services help modern businesses communicate value with clarity and visual prestige. We craft expressive digital design systems, campaign assets, social media creatives, ad graphics, banners, and high-CTR YouTube thumbnails that command attention in crowded digital feeds. By eliminating visual clutter and generic design patterns, we help ambitious brands establish consistent digital authority and higher conversion rates.',
    deliverables: [
      'High-CTR Social Media Creatives',
      'Display Ads & Campaign Banners',
      'Custom YouTube Thumbnails',
      'Digital Marketing & Presentation Collateral'
    ],
    iconName: 'Palette'
  },
  {
    number: '04',
    title: 'Branding',
    shortDesc: 'Distinctive brand identities, memorable vector marks, and comprehensive design systems that leave an indelible impression.',
    fullDesc: 'Nexus Devs is a branding agency dedicated to giving businesses a distinctive, memorable voice in competitive markets. We develop end-to-end brand identities—including bespoke logo marks, mathematically balanced color palettes, typography hierarchies, and complete digital brand guidelines. We solve brand fragmentation and inconsistency, ensuring your company looks credible, cohesive, and premium across all physical and digital touchpoints.',
    deliverables: [
      'Bespoke Logo Mark & Identity',
      'Comprehensive Brand Guidelines',
      'Typography & Color Systems',
      'Brand Collateral & Stationery'
    ],
    iconName: 'Sparkles'
  },
  {
    number: '05',
    title: 'Data & Operations',
    shortDesc: 'Interactive business dashboards, KPI telemetry systems, and automated operational workflows for data-driven decisions.',
    fullDesc: 'We provide specialized data analytics services and business dashboard development paired with workflow operations and automation. We eliminate data silos and manual reporting bottlenecks by connecting disparate business tools, APIs, and databases into centralized, real-time executive dashboards. Business leaders gain actionable KPI telemetry, live tracking, and streamlined automated pipelines that reduce manual overhead and accelerate daily operational velocity.',
    deliverables: [
      'Custom Business Dashboards',
      'Real-Time KPI Telemetry',
      'Data Analytics & Reporting',
      'Workflow Automation & Process Optimization'
    ],
    iconName: 'BarChart3'
  },
  {
    number: '06',
    title: 'SEO & Digital Growth',
    shortDesc: 'Technical SEO, keyword research, search performance analysis, and on-page optimization for sustainable organic discovery.',
    fullDesc: 'Led by our dedicated SEO team, Nexus Devs provides technical SEO services, comprehensive keyword research, on-page optimization, and digital growth strategies for businesses seeking sustainable search visibility. We resolve crawlability issues, enhance Core Web Vitals, implement structured schema markup, and optimize search intent alignment so high-intent customers can discover your brand on Google, driving qualified organic traffic and long-term business growth.',
    deliverables: [
      'Technical SEO & Site Audits',
      'Keyword Research & Search Intent Mapping',
      'On-Page SEO & Content Optimization',
      'Search Performance Telemetry & Analytics'
    ],
    iconName: 'TrendingUp'
  }
];

export const benefitsData: Benefit[] = [
  {
    title: 'Business-focused thinking',
    description: 'We prioritize outcomes over decorative vanity. Every interface, button, and interaction is engineered to accelerate conversions, revenue, and client trust.',
    iconName: 'TrendingUp',
    tag: 'ROI DRIVEN'
  },
  {
    title: 'Modern technology',
    description: 'Built on React 19, TypeScript, serverless infrastructure, and edge deployment. No bloatware, no slow legacy templates.',
    iconName: 'Zap',
    tag: 'FUTURE-PROOF'
  },
  {
    title: 'Premium design',
    description: 'Apple-level polish with cinematic lighting, subtle glassmorphism, balanced whitespace, and purposeful micro-interactions.',
    iconName: 'Layers',
    tag: 'CRAFT'
  },
  {
    title: 'Fast communication',
    description: 'Direct Slack/Discord access to senior engineers and designers. Rapid iterations with transparent milestones and zero agency bureaucracy.',
    iconName: 'MessageSquare',
    tag: 'AGILE'
  },
  {
    title: 'Performance-first development',
    description: 'Guaranteed 90+ Google PageSpeed benchmarks, instant interaction feedback, lightweight bundle payloads, and rock-solid SEO.',
    iconName: 'Gauge',
    tag: 'SPEED'
  },
  {
    title: 'Long-term support',
    description: 'We stay by your side post-launch with ongoing security updates, conversion rate optimization experiments, and scalable feature rollouts.',
    iconName: 'ShieldCheck',
    tag: 'PARTNERSHIP'
  }
];

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'DISCOVER',
    tagline: 'Understand the business, audience and goals.',
    description: 'We dive deep into your market positioning, customer friction points, competitors, and growth objectives to establish clear quantitative success metrics.',
    deliverables: ['Competitive matrix analysis', 'Audience persona mapping', 'Product scope & sprint roadmap'],
    timeline: 'Week 1'
  },
  {
    number: '02',
    title: 'DEFINE',
    tagline: 'Plan the structure, strategy and user journey.',
    description: 'We blueprint the information architecture, conversion funnels, and technical specifications before writing a single line of code or finalizing pixels.',
    deliverables: ['Information architecture diagrams', 'Low-fidelity wireframe prototypes', 'Conversion strategy document'],
    timeline: 'Week 1 - 2'
  },
  {
    number: '03',
    title: 'DESIGN',
    tagline: 'Create the visual experience and interface.',
    description: 'We sculpt a bespoke aesthetic language featuring custom typography, lighting, interactive states, and responsive component libraries in Figma.',
    deliverables: ['Full interactive Figma prototype', 'Design system token library', 'Motion choreography specifications'],
    timeline: 'Week 2 - 3'
  },
  {
    number: '04',
    title: 'DEVELOP',
    tagline: 'Turn the design into a fast working product.',
    description: 'We translate designs into pixel-perfect, clean, fully typed code. We integrate CMS, APIs, databases, animations, and responsive breakpoints.',
    deliverables: ['Clean TypeScript / React codebase', 'Cross-browser responsive testing', 'API & database integration'],
    timeline: 'Week 3 - 5'
  },
  {
    number: '05',
    title: 'LAUNCH',
    tagline: 'Test, optimize and launch.',
    description: 'Rigorous QA testing across 20+ device viewports, Core Web Vitals performance tuning, domain deployment, and analytics verification.',
    deliverables: ['Global CDN deployment', 'Analytics & telemetry tracking', '30-day post-launch warranty'],
    timeline: 'Week 5 - 6'
  }
];

// Client reviews are strictly real and dynamically fetched from Firestore once submitted and approved
export const initialReviews: ClientReview[] = [];

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'STARTER',
    tagline: 'Essential high-performance website package for individuals, creators, and new ventures.',
    priceINR: '₹14,999',
    priceUSD: '$199',
    timeline: '1–2 weeks delivery',
    features: [
      'Professional custom website',
      'Modern responsive UI',
      'Mobile + desktop optimization',
      'Basic AI-assisted features',
      'Basic WhatsApp integration',
      'Lead/enquiry collection',
      'Contact form',
      'Basic SEO setup',
      'Performance optimization',
      'Deployment/setup support',
      'Project consultation'
    ]
  },
  {
    id: 'growth',
    name: 'GROWTH',
    badge: 'FEATURED PACKAGE',
    tagline: 'Complete digital growth suite for ambitious brands and scaling businesses.',
    priceINR: '₹29,999',
    priceUSD: '$375',
    timeline: '2–3 weeks delivery',
    highlighted: true,
    features: [
      'Premium custom website',
      'Advanced UI/UX',
      'Modern animations and interactions',
      'Mobile + desktop optimization',
      'AI automation',
      'WhatsApp service integration',
      'Lead collection system',
      'Appointment/booking system where required',
      'Advanced contact/enquiry workflow',
      'SEO setup',
      'Performance optimization',
      'Portfolio/project showcase',
      'Deployment and technical setup',
      'Project management',
      'Post-launch support for agreed project changes'
    ]
  },
  {
    id: 'custom-project',
    name: 'CUSTOM PROJECT',
    badge: 'TAILORED SOLUTION',
    tagline: 'Bespoke systems, web applications, and enterprise digital solutions.',
    priceINR: "Custom Pricing / Let's Discuss",
    priceUSD: "Custom Pricing / Let's Discuss",
    timeline: 'Scoped to requirements',
    description: 'For projects with unique requirements, advanced systems, larger scope, or custom integrations, we create a tailored solution based on your specific needs.',
    features: [
      'Custom website/app requirements',
      'Advanced integrations',
      'Custom AI automation',
      'Custom WhatsApp workflows',
      'Complex booking or lead systems',
      'Enterprise/project-specific requirements',
      'Custom scope and pricing'
    ]
  }
];

export const faqData: FAQItem[] = [
  {
    category: 'Timeline',
    question: 'How long does a website take?',
    answer: 'Typical high-performance landing pages and standard agency websites take between 2 to 4 weeks from kickoff to launch. More complex full-stack web applications and custom platforms usually range from 5 to 8 weeks depending on specifications.'
  },
  {
    category: 'Cost',
    question: 'How much does a website cost?',
    answer: 'Our projects generally start from ₹24,999 for curated starter packages, and ₹49,999 for comprehensive growth platforms. Every project is scoped transparently with no hidden fees or surprise billings.'
  },
  {
    category: 'Redesign',
    question: 'Can you redesign my existing website?',
    answer: 'Absolutely. We regularly audit existing websites to identify bottlenecks in UX, mobile responsiveness, and conversion rates, rebuilding them with our high-speed modern stack while preserving your SEO authority and domain equity.'
  },
  {
    category: 'Design',
    question: 'Do you provide UI/UX design?',
    answer: 'Yes! Every project begins with strategic UI/UX design in Figma. You get interactive clickable prototypes, design system components, and full visual approvals before any development begins.'
  },
  {
    category: 'E-commerce',
    question: 'Can you build e-commerce websites?',
    answer: 'Yes. We engineer headless and modern e-commerce storefronts (Shopify, Stripe, customized checkouts) optimized for blazing-fast cart flows, high mobile conversion rates, and automated inventory sync.'
  },
  {
    category: 'Maintenance',
    question: 'Do you provide maintenance?',
    answer: 'All projects include 14 to 30 days of post-launch warranty and bug-fixing. After that, we offer flexible monthly maintenance retainers covering cloud hosting management, speed monitoring, security patches, and ongoing design updates.'
  },
  {
    category: 'Kickoff',
    question: 'How do we start a project?',
    answer: 'Simply fill out our project request form below or click "START A PROJECT". We will review your requirements and schedule a 20-minute discovery call within 24 hours to discuss strategy, timeline, and exact deliverables.'
  }
];
