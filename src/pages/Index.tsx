import React, { useState, useEffect } from 'react';
import { 
  Linkedin, 
  Github, 
  Twitter, 
  Mail, 
  ExternalLink, 
  ArrowUpRight,
  Youtube, 
  Instagram, 
  Cloud, 
  Video, 
  Play, 
  Gamepad2,
  FileText,
  MapPin,
  Clock,
  Terminal,
  Cpu,
  Layers,
  Code2
} from 'lucide-react';
import CodeforcesRating from '../components/CodeforcesRating';
import LeetCodeRating from '../components/LeetCodeRating';
import { cn } from "@/lib/utils";

type ProjectCategory = 'all' | 'fullstack' | 'ai' | 'systems';

interface Project {
  title: string;
  category: 'fullstack' | 'ai' | 'systems';
  categoryLabel: string;
  tech: string[];
  description: string;
  href?: string;
  liveHref?: string;
  badge?: string;
  highlight?: boolean;
}

const PROJECTS_DATA: Project[] = [
  {
    title: "Uncharted Travel — Himalayan Expedition Platform",
    category: "fullstack",
    categoryLabel: "Full-Stack & Web",
    tech: [
      "Next.js 15",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "MapLibre GL",
      "Framer Motion",
      "GSAP",
      "NextAuth",
      "HLS.js",
      "Zod"
    ],
    description: "Production travel & adventure expedition platform for Himalayan treks and guided alpine journeys. Features interactive 3D Himalayan topographic terrain maps with MapLibre GL, real-time Supabase booking and community guide leaderboard infrastructure, Google OAuth authentication flow with automated trek inquiry autofill, fluid GSAP/Framer animations, and custom video streaming.",
    liveHref: "https://unchartedtravel.in",
    badge: "Production / Live",
    highlight: true,
  },
  {
    title: "CMHub — Campus Mobility Hub",
    category: "fullstack",
    categoryLabel: "Full-Stack & Web",
    tech: ["Next.js", "Node.js", "Express", "MongoDB", "JWT", "OAuth 2.0", "Resend"],
    description: "Production campus super-app unifying 7 modules (carpool, rentals, marketplace, food delivery, gigs, live radar, social feed) on a single verified platform. Built end-to-end auth with JWT, Google OAuth 2.0, and OTP email verification; implemented an admin approval pipeline requiring ID-card review.",
    liveHref: "https://cmhub.in",
    badge: "Production / Live",
    highlight: true,
  },
  {
    title: "AlgoArena — Real-Time 1v1 Competitive Coding",
    category: "systems",
    categoryLabel: "Systems & Real-Time",
    tech: ["React 19", "Vite", "Node.js", "Express 5", "Socket.io", "PostgreSQL", "Redis", "BullMQ", "Docker", "Monaco"],
    description: "Chess.com meets LeetCode — skill-based Elo matchmaking for real-time 1v1 DSA duels. Submissions run in isolated Docker containers (256MB RAM, --network none) with live verdict streaming over WebSockets. Features Monaco Editor, opponent telemetry, and multi-language support (JS, Python, C++, Java).",
    href: "https://github.com/ayushoncode/AlgoArena",
    badge: "Docker Sandbox",
  },
  {
    title: "Codebook — Developer Problem Tracker",
    category: "fullstack",
    categoryLabel: "Full-Stack & Web",
    tech: ["HTML5", "CSS3", "JavaScript", "Firebase", "Monaco Editor"],
    description: "A single-page application for tracking and organizing coding problems. Features an aesthetic calendar/time tracker, Firebase cloud synchronization, and an integrated Monaco Editor with multi-language code playground.",
    href: "https://github.com/letsjoyn/codebook" ,
    liveHref: "https://mycodebook.vercel.app/",
    badge: "Live App",
  },
  {
    title: "Disaster Response OpenEnv",
    category: "ai",
    categoryLabel: "AI / ML & Agents",
    tech: ["PyTorch", "HuggingFace", "Python", "Docker", "Qwen 72B", "LLM Agents"],
    description: "Emergency triage simulator built for the Meta PyTorch OpenEnv Hackathon. Hybrid agent with a heuristic router and Qwen 72B achieving 92% routing accuracy across 15 disaster scenarios. Deployed on HuggingFace Spaces with a live tactical dashboard.",
    href: "https://github.com/letsjoyn/meta-scalar-hack",
    badge: "Meta Finalist",
  },
  {
    title: "OmniQuery — Document Intelligence",
    category: "ai",
    categoryLabel: "AI / ML & Agents",
    tech: ["FastAPI", "Express", "MongoDB", "Vector DB", "Groq RAG", "Docker", "QStash"],
    description: "Document intelligence workspace indexing 50+ PDFs asynchronously with Vector Search retrieval and Groq-powered RAG answers in under 1.5 seconds. 3-service microservices architecture using QStash, reducing AI-job failures by 95%.",
    href: "https://github.com/letsjoyn/one-ai",
  },
  {
    title: "Just Do It — Low-Level Focus Suite",
    category: "systems",
    categoryLabel: "Systems & Real-Time",
    tech: ["C++", "Windows APIs", "Named Pipes", "Firebase Auth/Firestore"],
    description: "Windows focus suite with a native C++ engine via named pipes, blocking 150+ sites and applications with strict process termination. Firebase cloud sync across 500+ sessions with 99.9% sync reliability.",
    href: "https://github.com/letsjoyn/just-do-it",
    badge: "C++ Engine",
  },
  {
    title: "Donum — NGO Donation & Relief Platform",
    category: "fullstack",
    categoryLabel: "Full-Stack & Web",
    tech: ["Java", "Servlets", "JSP", "MVC Architecture", "MySQL"],
    description: "Enterprise MVC architecture with secure auth, automated tax receipts, and a dashboard tracking 5,000+ simulated donations. Weighted AI matching algorithm cutting distribution-planning time by 40% with automated MySQL triggers.",
    href: "https://github.com/letsjoyn/Donum",
  },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [projectCategory, setProjectCategory] = useState<ProjectCategory>('all');
  const [time, setTime] = useState('');
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Real live visitor counter with session deduplication
  useEffect(() => {
    const countKey = 'letsjoyn_portfolio_visitors_2026';
    const baseCount = 4621;

    const fetchVisitorCount = async () => {
      try {
        const hasCounted = sessionStorage.getItem('counted_visit');
        const endpoint = hasCounted
          ? `https://countapi.mileshilliard.com/api/v1/get/${countKey}`
          : `https://countapi.mileshilliard.com/api/v1/hit/${countKey}`;

        const res = await fetch(endpoint);
        const data = await res.json();
        if (data && data.value !== undefined) {
          const countVal = Number(data.value);
          setVisitorCount(baseCount + countVal);
          sessionStorage.setItem('counted_visit', 'true');
        } else {
          setVisitorCount(baseCount);
        }
      } catch {
        setVisitorCount(baseCount);
      }
    };

    fetchVisitorCount();
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'achievements', 'skills', 'education', 'volunteering'];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = projectCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === projectCategory);

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-300 font-sans selection:bg-cyan-500/20 selection:text-cyan-200 relative overflow-x-hidden">
      
      {/* ALWAYS VISIBLE FLOATING TOP NAVBAR */}
      <header className="fixed top-3 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
        <nav className="pointer-events-auto backdrop-blur-xl bg-zinc-950/95 border border-zinc-800 rounded-full px-3 py-1.5 flex items-center justify-between shadow-2xl shadow-black/90 max-w-2xl w-full">
          <button 
            onClick={() => scrollToSection('about')}
            className="flex items-center gap-2.5 pl-1 pr-2 py-0.5 rounded-full hover:bg-zinc-900/60 transition-colors group cursor-pointer text-left shrink-0"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-700/80 shrink-0">
              <img
                src="/lovable-uploads/a93029cc-2bbe-4a09-bb32-5c6bd97f5ab3.png"
                alt="Nayvedya Shrivastava"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-serif text-white tracking-wide leading-none">Nayvedya</span>
              <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
                online
              </span>
            </div>
          </button>

          {/* Nav links with NO scrollbar */}
          <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto no-scrollbar scrollbar-none py-0.5">
            {[
              { id: 'about', label: 'About' },
              { id: 'experience', label: 'Experience' },
              { id: 'projects', label: 'Projects' },
              { id: 'achievements', label: 'Awards' },
              { id: 'skills', label: 'Stack' },
              { id: 'education', label: 'Education' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-mono tracking-wider transition-all duration-200 shrink-0",
                  activeSection === item.id
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto min-h-screen bg-[#09090b] border-x border-zinc-800/80 px-5 sm:px-10 pt-20 pb-16 flex flex-col gap-12 relative shadow-2xl">

        {/* Hero Section */}
        <section id="about" className="flex flex-col gap-6 pt-4 scroll-mt-28">
          {/* Top Meta info */}
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Bengaluru, India</span>
              <span className="text-zinc-700">•</span>
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>{time || 'IST'}</span>
            </div>
          </div>

          {/* Large Hero Title */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-[1.08]">
              Hi, I'm <span className="italic font-normal text-zinc-100">Nayvedya Shrivastava</span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 font-urbanist font-medium tracking-wide">
              Full-Stack • AI/ML Research • Systems • Competitive Programmer
            </p>
          </div>

          {/* Editorial Bio */}
          <p className="text-base sm:text-lg leading-relaxed text-zinc-300 max-w-2xl font-light">
            19 y/o builder from India based in Bengaluru. I craft software that <span className="font-serif italic text-white text-xl">works good</span> and <span className="font-serif italic text-white text-xl">looks good</span> — combining high-performance systems engineering with modern, editorial design.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg text-xs font-mono font-medium bg-white text-black hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                Resume / CV
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href="https://github.com/letsjoyn"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-lg text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors flex items-center gap-2"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/letsjoyn/"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-lg text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors flex items-center gap-2"
              >
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>

              <a
                href="https://x.com/letsjoyn"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-lg text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors flex items-center gap-2"
              >
                <Twitter className="w-3.5 h-3.5" />
                Twitter
              </a>

              <a
                href="mailto:joynnayvedya@gmail.com"
                className="px-3.5 py-2 rounded-lg text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                Email
              </a>
            </div>
          </div>

          {/* Live Competitive Programming Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <CodeforcesRating />
            <LeetCodeRating />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="flex flex-col gap-6 scroll-mt-28">
          <SectionHeader title="Places I've Made an Impact" count="3 Roles" />
          <div className="flex flex-col gap-6">
            <ExperienceItem
              role="Summer Research Intern"
              company="Indian Institute of Technology, Roorkee"
              period="Jul 2026 – Present"
              description="Developing GeoFusion AI — fusing Sentinel-2 optical and Sentinel-1/NISAR SAR data across 119 agricultural fields to reconstruct crop-condition time series during up to 50-day cloud blackouts. Trained XGBoost & Extra Trees spatial-temporal models achieving RMSE 0.1386 across 11,100+ fused pixel records. Built a Flask dashboard integrated with Google Earth Engine, processing 78+ GB of NISAR GCOV HDF5 data with sub-second latency for real-time AOI queries."
              href="https://github.com/letsjoyn/NiSAR-research"
              tags={["Sentinel-2 & SAR", "RMSE 0.1386", "78+ GB NISAR HDF5", "Google Earth Engine"]}
              highlight
            />

            <ExperienceItem
              role="Founding Core Member"
              company="AWS Cloud Club – MSRIT"
              period="May 2025 – Present"
              description="Spearheaded community growth; delivered technical presentations on cloud infrastructure and AWS architecture (S3/EC2, shared responsibility model) to 500+ students across workshops and events."
              href="https://www.credly.com/badges/6d1a0241-aeab-4138-a72a-bf2ab89ad08b"
              tags={["AWS S3/EC2", "500+ Students Mentored", "Cloud Architecture"]}
            />

            <ExperienceItem
              role="Product Operations Intern"
              company="Mera Mentor"
              period="Oct 2023 – Mar 2024"
              description="Managed product delivery workflows and collaborated with engineering teams for bug identification and UX refinement."
              tags={["Product Operations", "QA & UX Refinement"]}
            />
          </div>
        </section>

        {/* Selected Projects with Tech Stack Domain Filtering */}
        <section id="projects" className="flex flex-col gap-5 scroll-mt-28">
          <SectionHeader title="Selected Works" count={`${filteredProjects.length} Projects`} />
          
          {/* Tech Stack Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-900/50 border border-zinc-800">
            {[
              { id: 'all', label: 'All Projects', count: PROJECTS_DATA.length },
              { id: 'fullstack', label: 'Full-Stack & Web', count: PROJECTS_DATA.filter(p => p.category === 'fullstack').length },
              { id: 'ai', label: 'AI / ML & Agents', count: PROJECTS_DATA.filter(p => p.category === 'ai').length },
              { id: 'systems', label: 'Systems & Real-Time', count: PROJECTS_DATA.filter(p => p.category === 'systems').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setProjectCategory(tab.id as ProjectCategory)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 flex items-center gap-1.5 cursor-pointer",
                  projectCategory === tab.id
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                )}
              >
                <span>{tab.label}</span>
                <span className={cn(
                  "text-[10px] px-1.5 py-0.2 rounded-full",
                  projectCategory === tab.id ? "bg-black/10 text-black font-bold" : "bg-zinc-800 text-zinc-500"
                )}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Project Cards List */}
          <div className="flex flex-col gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="flex flex-col gap-6 scroll-mt-28">
          <SectionHeader title="Milestones & Recognition" count="6 Awards" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <AchievementTile
              title="Meta PyTorch OpenEnv Hackathon"
              detail="Finalist — Top 2.5% of 31,000+ registrations · Grand Finale at SST Bangalore"
              gradient="from-violet-950/80 via-indigo-950/40 to-black"
              badge="Finalist"
              href="https://github.com/letsjoyn/meta-scalar-hack"
            />
            <AchievementTile
              title="Smart India Hackathon 2025"
              detail="Top 25 Teams — Internal Hackathon · MSRIT"
              videoSrc="https://www.youtube.com/embed/arliHSiZf7c?autoplay=1&mute=1&controls=0&loop=1&playlist=arliHSiZf7c&playsinline=1&rel=0"
              href="https://www.youtube.com/watch?v=arliHSiZf7c"
              badge="Watch Demo"
            />
            <AchievementTile
              title="AI Codefix 2025"
              detail="1st Place — Dept. of AIML, MSRIT"
              images={["/lovable-uploads/ai-codefix.jpg", "/lovable-uploads/ai-codefix-2.jpg"]}
              badge="1st Place"
            />
            <AchievementTile
              title="AI Hackathon IISc"
              detail="1st Place — IISc Bangalore · May 2025"
              bgImage="/lovable-uploads/iisc-hackathon.jpg"
              badge="1st Place"
            />
            <AchievementTile
              title="IISc Open Day CP Contest"
              detail="10th Rank — Bangalore · Mar 2026"
              gradient="from-zinc-900 via-zinc-950 to-black"
              badge="Rank 10"
            />
            <AchievementTile
              title="Finalist, Infotsav'25"
              detail="Grand Finale at IIITM Gwalior"
              bgImage="/lovable-uploads/infotsav-mail.jpg"
              badge="Finalist"
            />
          </div>
        </section>

        {/* Technical Stack Section */}
        <section id="skills" className="flex flex-col gap-6 scroll-mt-28">
          <SectionHeader title="Technical Arsenal" count="Core Stack" />
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 flex flex-col gap-4">
            <SkillRow 
              icon={<Code2 className="w-3.5 h-3.5 text-cyan-400" />}
              label="Languages" 
              skills={["C++ (DSA & Low-Level)", "Python", "TypeScript", "JavaScript", "Java", "SQL"]} 
            />
            <SkillRow 
              icon={<Cpu className="w-3.5 h-3.5 text-violet-400" />}
              label="AI / ML & Vision" 
              skills={["PyTorch", "HuggingFace", "RAG Systems", "Google Earth Engine (GEE)", "XGBoost", "Extra Trees", "Scikit-Learn"]} 
            />
            <SkillRow 
              icon={<Terminal className="w-3.5 h-3.5 text-amber-400" />}
              label="Systems & Backend" 
              skills={["Node.js / Express", "FastAPI", "Docker Sandboxes", "Redis", "BullMQ Queues", "Socket.io", "PostgreSQL", "MongoDB", "Named Pipes"]} 
            />
            <SkillRow 
              icon={<Layers className="w-3.5 h-3.5 text-sky-400" />}
              label="Web & Cloud" 
              skills={["Next.js 15", "React 19", "Supabase", "MapLibre GL", "Tailwind CSS", "AWS (S3 / EC2)", "Firebase", "Monaco Editor", "REST APIs"]} 
            />
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="flex flex-col gap-6 scroll-mt-28">
          <SectionHeader title="Academic Foundation" count="5 Institutions" />
          <div className="flex flex-col gap-4">
            <EducationItem
              degree="B.Tech — Information Science and Engineering"
              school="M.S. Ramaiah Institute of Technology"
              period="2024 – Present"
              details="Founding core member of AWS Cloud Club. Active in technical societies, research in remote sensing & AI, and competitive programming."
              score="9.36 CGPA"
              highlight
            />
            <EducationItem
              degree="Class XII (PCM)"
              school="Mahatma Hansraj Modern School"
              period="2024"
              details="Specialization in Mathematics, Computer Science, and Physics. Deep focus on problem solving and calculus."
              score="94.4%"
            />
            <EducationItem
              degree="Class X"
              school="Jai Academy Jhansi"
              period="2022"
              details="Academic Excellence, foundational sciences, mathematics, and high performance in regional competitions."
              score="94.8%"
            />
            <EducationItem
              degree="Secondary & Middle Schooling"
              school="No. 1 Air Force School, Gwalior"
              period="2016 – 2020"
              details="Comprehensive foundation in Science, Mathematics, and Computer Applications. Active participation in regional academic Olympiads and athletic meets in a disciplined environment."
            />
            <EducationItem
              degree="Primary Education & Foundational Schooling"
              school="Air Force School Viman Nagar, Pune"
              period="2012 – 2016"
              details="Early foundational learning, logic building, science exhibitions, and co-curricular development in a defense school environment."
            />
          </div>
        </section>

        {/* Volunteering Section */}
        <section id="volunteering" className="flex flex-col gap-6 scroll-mt-28">
          <SectionHeader title="Leadership & Volunteering" count="Community" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between gap-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif text-white">Core Member</h3>
                  <span className="text-[10px] font-mono text-zinc-500">2025 – 2026</span>
                </div>
                <div className="text-xs text-cyan-400 font-mono flex items-center gap-1.5">
                  <Gamepad2 className="w-3.5 h-3.5" />
                  ClutchRIT Esports, MSRIT
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-urbanist mt-1">
                  Served as primary public speaker and host, managing live engagement, streaming, and tournament operations for 400+ attendees.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between gap-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif text-white">Producer & Editor</h3>
                  <span className="text-[10px] font-mono text-zinc-500">Remote</span>
                </div>
                <div className="text-xs text-purple-400 font-mono flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5" />
                  Video Content Strategy
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-urbanist mt-1">
                  Directed and edited digital video content generating 10M+ views; managed technical production workflows and motion design.
                </p>
              </div>
              <a 
                href="https://www.linkedin.com/in/letsjoyn/details/volunteering-experiences/" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
              >
                <Play className="w-3 h-3 fill-current" />
                View Media Details
              </a>
            </div>
          </div>
        </section>

        {/* Minimalist Editorial Footer */}
        <footer className="pt-12 pb-6 border-t border-zinc-800 mt-6 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-serif text-white tracking-wide">
                Nayvedya Shrivastava
              </span>
              <p className="text-xs text-zinc-500 font-mono">
                Designed & built with precision • © {new Date().getFullYear()}
              </p>
            </div>

            {/* Other Channels */}
            <div className="flex items-center gap-2">
              <a 
                href="https://instagram.com/letsjoyn" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
                title="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://community.aws/@letsjoyn" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
                title="AWS Community"
              >
                <Cloud className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://youtube.com/@letsjoyn" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
                title="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-zinc-900 text-[11px] font-mono text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
              <span>
                Visitor Counter: <span className="text-zinc-200 font-bold">{visitorCount ? `#${visitorCount.toLocaleString()}` : '#4,621'}</span>
              </span>
            </div>
            <span>Bengaluru, India • {time}</span>
          </div>
        </footer>

      </div>
    </div>
  );
};

// Sub-components

const SectionHeader = ({ title, count }: { title: string; count?: string }) => (
  <div className="flex items-baseline justify-between border-b border-zinc-800 pb-3 mb-2">
    <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">{title}</h2>
    {count && (
      <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">{count}</span>
    )}
  </div>
);

const ExperienceItem = ({ 
  role, 
  company, 
  period, 
  description, 
  highlight, 
  href,
  tags 
}: { 
  role: string; 
  company: string; 
  period: string; 
  description: string; 
  highlight?: boolean; 
  href?: string;
  tags?: string[];
}) => (
  <div className="group p-5 rounded-xl bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-2">
      {href ? (
        <a 
          href={href} 
          target="_blank" 
          rel="noreferrer" 
          className="text-xl sm:text-2xl font-serif text-zinc-100 group-hover:text-white transition-colors inline-flex items-center gap-2"
        >
          {company}
          <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 transition-colors" />
        </a>
      ) : (
        <h3 className="text-xl sm:text-2xl font-serif text-zinc-100 group-hover:text-white transition-colors">{company}</h3>
      )}
      <span className="text-xs text-zinc-500 font-mono shrink-0">{period}</span>
    </div>

    <div className="text-xs text-zinc-400 mb-3 font-medium flex items-center gap-2">
      {highlight && <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.5)]" />}
      <span className="text-cyan-300 font-mono">{role}</span>
    </div>

    <p className="text-sm text-zinc-400 leading-relaxed font-urbanist mb-3">{description}</p>

    {tags && tags.length > 0 && (
      <div className="flex flex-wrap gap-1.5 pt-1">
        {tags.map(tag => (
          <span key={tag} className="text-[10px] font-mono text-zinc-400 bg-zinc-950/70 border border-zinc-800 px-2 py-0.5 rounded-md">
            {tag}
          </span>
        ))}
      </div>
    )}
  </div>
);

const ProjectCard = ({ 
  title, 
  categoryLabel,
  tech, 
  description, 
  href, 
  liveHref, 
  badge,
  highlight 
}: Project) => (
  <div className={cn(
    "group p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between gap-3",
    highlight 
      ? "bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800 hover:border-zinc-700" 
      : "bg-zinc-900/20 hover:bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
  )}>
    <div>
      <div className="flex justify-between items-start gap-3 mb-2">
        <h3 className="text-xl sm:text-2xl font-serif text-white group-hover:text-zinc-100 transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded-full">
            {categoryLabel}
          </span>
          {badge && (
            <span className={cn(
              "text-[10px] font-mono px-2.5 py-0.5 rounded-full border",
              highlight 
                ? "text-cyan-300 bg-cyan-500/10 border-cyan-500/20" 
                : "text-zinc-300 bg-zinc-900 border-zinc-750"
            )}>
              {badge}
            </span>
          )}
          {liveHref && (
            <a 
              href={liveHref} 
              target="_blank" 
              rel="noreferrer" 
              className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors"
              title="View Live App"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {href && (
            <a 
              href={href} 
              target="_blank" 
              rel="noreferrer" 
              className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors"
              title="View Source Code"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      <p className="text-sm text-zinc-400 leading-relaxed font-urbanist mb-3">{description}</p>
    </div>

    <div className="flex flex-wrap gap-1.5 pt-1 border-t border-zinc-800/80">
      {tech.map((t) => (
        <span key={t} className="text-[10px] font-mono text-zinc-500 bg-zinc-950/60 px-2 py-0.5 rounded border border-zinc-800/60">
          {t}
        </span>
      ))}
    </div>
  </div>
);

const EducationItem = ({ 
  degree, 
  school, 
  period, 
  details, 
  score,
  highlight 
}: { 
  degree: string; 
  school: string; 
  period: string; 
  details: string; 
  score?: string;
  highlight?: boolean;
}) => (
  <div className={cn(
    "p-5 rounded-xl border transition-all duration-300 flex flex-col gap-2",
    highlight 
      ? "bg-zinc-900/35 border-zinc-800" 
      : "bg-zinc-900/20 border-zinc-800"
  )}>
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
      <h3 className="text-lg sm:text-xl font-serif text-white">
        {school}
      </h3>
      <div className="flex items-center gap-2">
        {score && (
          <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
            {score}
          </span>
        )}
        <span className="text-xs font-mono text-zinc-500">{period}</span>
      </div>
    </div>

    <div className="text-xs font-mono text-zinc-300">
      {degree}
    </div>

    <p className="text-sm text-zinc-400 leading-relaxed font-urbanist">
      {details}
    </p>
  </div>
);

const SkillRow = ({ label, skills, icon }: { label: string; skills: string[]; icon?: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-2.5 pt-1">
    <div className="flex items-center gap-2 w-40 shrink-0 pt-0.5">
      {icon}
      <span className="text-xs font-mono text-zinc-400 tracking-wider uppercase">{label}</span>
    </div>
    <div className="flex flex-wrap gap-1.5 flex-1">
      {skills.map((s) => (
        <span 
          key={s} 
          className="text-xs font-mono text-zinc-300 bg-zinc-950/80 border border-zinc-800 px-2.5 py-1 rounded-md hover:border-zinc-700 hover:text-white transition-colors cursor-default"
        >
          {s}
        </span>
      ))}
    </div>
  </div>
);

const AchievementTile = ({ 
  title, 
  detail, 
  bgImage, 
  videoSrc, 
  images, 
  gradient, 
  className, 
  href, 
  badge 
}: { 
  title: string; 
  detail: string; 
  bgImage?: string; 
  videoSrc?: string; 
  images?: string[]; 
  gradient?: string; 
  className?: string; 
  href?: string; 
  badge?: string;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const displayImages = images || (bgImage ? [bgImage] : []);
  const Wrapper = href ? 'a' : 'div';

  React.useEffect(() => {
    if (displayImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [displayImages.length]);

  return (
    <Wrapper
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      className={cn(
        "group relative h-44 rounded-xl overflow-hidden bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 block",
        gradient ? `bg-gradient-to-br ${gradient}` : "",
        className
      )}
    >
      {videoSrc ? (
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50 group-hover:opacity-35 transition-opacity duration-300">
          <iframe
            src={videoSrc}
            className="w-full h-full object-cover scale-[1.35]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            tabIndex={-1}
          />
        </div>
      ) : (
        displayImages.map((img, index) => (
          <img
            key={img}
            src={img}
            alt={title}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105",
              index === currentImageIndex ? "opacity-50 group-hover:opacity-35" : "opacity-0"
            )}
          />
        ))
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      
      {badge && (
        <div className="absolute top-2.5 right-2.5 bg-zinc-900/90 backdrop-blur-md text-zinc-300 text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-zinc-700 shadow-sm z-10">
          {badge}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-lg font-serif text-white mb-1 leading-snug group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-xs text-zinc-400 font-urbanist leading-relaxed line-clamp-2">
          {detail}
        </p>
      </div>
    </Wrapper>
  );
};

export default Index;