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
    shortDesc: 'Build modern, responsive and high-performance digital experiences.',
    fullDesc: 'We engineer blazing-fast, responsive and scalable digital platforms built with modern web architecture. From high-converting business hubs and landing pages to custom applications and digital storefronts, our code is modular, secure, and engineered to scale seamlessly.',
    deliverables: [
      'Business Websites',
      'Landing Pages',
      'E-commerce Websites',
      'Custom Web Applications'
    ],
    iconName: 'Code2'
  },
  {
    number: '02',
    title: 'Video Production & Editing',
    shortDesc: 'Transform ideas into engaging visual stories designed for digital platforms.',
    fullDesc: 'We craft high-retention short and long-form visual stories tailored for contemporary digital platforms. Combining cinematic pacing, dynamic motion graphics, sound design, and narrative flow to capture viewer attention and build lasting brand authority.',
    deliverables: [
      'Reels & Shorts',
      'Promotional Videos',
      'YouTube Videos',
      'Motion Graphics & Video Editing'
    ],
    iconName: 'Video'
  },
  {
    number: '03',
    title: 'Graphic Design',
    shortDesc: 'Create visually compelling designs that communicate clearly and strengthen digital presence.',
    fullDesc: 'From high-impact marketing creatives to digital banners and custom thumbnails, we design expressive visual assets that elevate your brand across digital touchpoints and communicate value with absolute clarity.',
    deliverables: [
      'Social Media Creatives',
      'Posters & Banners',
      'YouTube Thumbnails',
      'Digital & Visual Design'
    ],
    iconName: 'Palette'
  },
  {
    number: '04',
    title: 'Branding',
    shortDesc: 'Build memorable and consistent brand identities that stand out.',
    fullDesc: 'Stand out in competitive markets with a cohesive and recognizable digital brand. We design logos, color and typography systems, comprehensive brand style guidelines, and collateral that make your business instantly memorable.',
    deliverables: [
      'Logo Design',
      'Brand Identity',
      'Brand Guidelines',
      'Marketing Materials'
    ],
    iconName: 'Sparkles'
  },
  {
    number: '05',
    title: 'Data & Analytics',
    shortDesc: 'Turn business data into useful insights that support smarter decisions.',
    fullDesc: 'Transform complex business data into clear, actionable executive intelligence. We construct intuitive real-time dashboards, custom KPI telemetry systems, and visual reports that empower faster, data-driven decisions.',
    deliverables: [
      'Data Analysis',
      'Interactive Dashboards',
      'Reports & KPI Tracking',
      'Data Visualization'
    ],
    iconName: 'BarChart3'
  },
  {
    number: '06',
    title: 'Operations',
    shortDesc: 'Improve business processes through organized digital workflows and efficient operations.',
    fullDesc: 'Streamline operational bottlenecks and elevate team velocity through structured digital processes, workflow optimization, connected toolings, and smart process automation.',
    deliverables: [
      'Business Process Support',
      'Workflow Optimization',
      'Digital Operations',
      'Process Automation'
    ],
    iconName: 'Workflow'
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
    tagline: 'For individuals, creators and emerging startups.',
    priceINR: 'Starting from ₹24,999',
    priceUSD: 'Starting from $300',
    timeline: '2–3 weeks delivery',
    features: [
      'Bespoke 3–5 page modern website',
      'Fully responsive & mobile optimized',
      'Modern glassmorphism & subtle animations',
      'Contact form & lead capture integration',
      'Google Analytics & SEO fundamentals',
      '14 days post-launch support'
    ]
  },
  {
    id: 'growth',
    name: 'GROWTH',
    badge: 'MOST POPULAR',
    tagline: 'For high-growth businesses and scaling brands.',
    priceINR: 'Starting from ₹49,999',
    priceUSD: 'Starting from $600',
    timeline: '3–4 weeks delivery',
    highlighted: true,
    features: [
      'Up to 8–10 custom engineered pages',
      'Advanced interactive UI & micro-interactions',
      'CMS integration (easy content updates)',
      'Sub-second Core Web Vitals optimization',
      'Conversion rate optimization (CRO) structure',
      'Custom animations & floating UI graphics',
      '30 days post-launch priority support'
    ]
  },
  {
    id: 'custom',
    name: 'CUSTOM',
    tagline: 'For startups with advanced platform requirements.',
    priceINR: 'Custom Quote',
    priceUSD: 'Custom Quote',
    timeline: 'Timeline scoped to project',
    features: [
      'Full-stack web application / portal',
      'Custom database & user authentication',
      'Bespoke 3D / WebGL interactive experiences',
      'Complex third-party API integrations',
      'Comprehensive Figma design system handoff',
      'Dedicated project manager & Slack channel',
      'Ongoing retainer & continuous updates'
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
