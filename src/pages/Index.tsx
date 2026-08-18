
import React, { useState, useEffect } from 'react';
import { Linkedin, Github, Twitter, Mail, ExternalLink, Youtube, Instagram, Cloud, Video, Play, Gamepad2 } from 'lucide-react';
import CodeforcesRating from '../components/CodeforcesRating';
import LeetCodeRating from '../components/LeetCodeRating';
import { CodeforcesBrandIcon, LeetCodeBrandIcon } from '../components/Icons';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [time, setTime] = useState('');

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

  return (
    <div className="min-h-screen bg-zinc-950 overflow-x-hidden font-sans text-zinc-300 selection:bg-neon-green/20 selection:text-neon-green">

      {/* Main Content Container - centered with dashed side lines */}
      <div className="max-w-3xl mx-auto min-h-screen bg-black border-x border-zinc-800 px-6 md:px-10 pt-2 pb-6 flex flex-col gap-4">

        <nav className="flex items-center justify-between mb-2 mt-4 w-full z-50">
          <div className="w-10 h-10 shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
            <img
              src="/lovable-uploads/a93029cc-2bbe-4a09-bb32-5c6bd97f5ab3.png"
              alt="Nayvedya"
              className="w-full h-full rounded-full object-cover border border-zinc-800 shadow-lg transition-all duration-500"
            />
          </div>
          <div className="flex gap-1 overflow-x-auto scrollbar-minimal pb-2 flex-1 min-w-0 justify-start sm:justify-end whitespace-nowrap mask-gradient ml-4">
            {['About', 'Experience', 'Projects', 'Achievements', 'Volunteering', 'Education'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={cn(
                  "px-2 py-1 md:px-2 md:py-1 rounded-md text-xs md:text-sm tracking-wider transition-all duration-300 shrink-0 border border-dashed",
                  activeSection === item.toLowerCase()
                    ? "border-zinc-500 text-white bg-zinc-900/50"
                    : "border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900/30"
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        {/* Header / About Section */}
        <header id="about" className="flex flex-col gap-6 pt-2 scroll-mt-32">
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-3xl font-serif text-white mb-1 leading-none">
                Hi, I'm Nayvedya Shrivastava
              </h1>
              <p className="text-base text-zinc-400 font-urbanist">
                full-stack • ai/ml • research • competitive programmer
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-zinc-400 max-w-xl font-light">
            19 y/o kid from India. I build stuff that <span className="text-zinc-200 font-medium">works good</span> and <span className="text-zinc-200 font-medium">looks good</span>. Sometimes both at the same time.
          </p>

          <div className="flex flex-col gap-3">
            <p className="text-sm text-zinc-500">
              Open to research collabs & internships. Slide into my <SocialLinkInline href="https://x.com/letsjoyn" label="DMs" icon={<Twitter className="w-3 h-3" />} /> or <SocialLinkInline href="mailto:joynnayvedya@gmail.com" label="Email" icon={<Mail className="w-3 h-3" />} /> me.
            </p>

            {/* Consolidated Links */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <SocialPill href="https://github.com/letsjoyn" label="GitHub" icon={<Github className="w-3.5 h-3.5" />} />
              <SocialPill href="https://www.linkedin.com/in/letsjoyn/" label="LinkedIn" icon={<Linkedin className="w-3.5 h-3.5" />} />
              <SocialPill href="/resume.pdf" label="Resume" highlight />
              <span className="text-zinc-600 px-1 text-sm">?</span>
              <span className="text-zinc-500 text-sm italic">Yep, they're all unlocked if you're curious.</span>
            </div>

            {/* CP Stats - always visible cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              <CodeforcesRating />
              <LeetCodeRating />
            </div>
          </div>
        </header>

        {/* Experience Section */}
        <section id="experience" className="flex flex-col gap-6 scroll-mt-32 mt-8">
          <div className="bg-zinc-900/20 border border-zinc-800 rounded-sm p-6 flex flex-col gap-6">
            <SectionHeader title="Places I've Made an Impact" />
            <div className="flex flex-col gap-8 pl-1">
              <ExperienceItem
                role="Summer Research Intern"
                company="Indian Institute of Technology, Roorkee"
                period="Jul 2026 – Present"
                description="Developing GeoFusion AI — fusing Sentinel-2 optical and Sentinel-1/NISAR SAR data across 119 agricultural fields to reconstruct crop-condition time series during up to 50-day cloud blackouts. Trained XGBoost & Extra Trees spatial-temporal models achieving RMSE 0.1386 across 11,100+ fused pixel records. Built a Flask dashboard integrated with Google Earth Engine, processing 78+ GB of NISAR GCOV HDF5 data with sub-second latency for real-time AOI queries."
                href="https://github.com/letsjoyn/NiSAR-research"
                highlight
              />
              <ExperienceItem
                role="Founding Core Member"
                company="AWS Cloud Club – MSRIT"
                period="May 2025 – Present"
                description="Spearheaded community growth; delivered technical presentations on cloud infrastructure and AWS architecture (S3/EC2, shared responsibility model) to 500+ students across workshops and events."
              />
              <ExperienceItem
                role="Product Operations Intern"
                company="Mera Mentor"
                period="Oct 2023 – Mar 2024"
                description="Managed product delivery workflows and collaborated with engineering teams for bug identification and UX refinement."
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="flex flex-col gap-6 scroll-mt-32">
          <div className="bg-zinc-900/20 border border-zinc-800 rounded-sm p-6 flex flex-col gap-6">
            <SectionHeader title="Things I've Built" />
            <div className="grid grid-cols-1 gap-6">
              <ProjectCard
                title="Disaster Response OpenEnv"
                tech="HuggingFace, Python, Docker, LLM Agents"
                description="Emergency triage simulator for the Meta PyTorch OpenEnv Hackathon. Hybrid agent with a heuristic router and Qwen 72B achieving 92% routing accuracy across 15 disaster scenarios. Deployed on HuggingFace Spaces with a live tactical dashboard."
                href="https://github.com/letsjoyn/meta-scalar-hack"
              />
              <ProjectCard
                title="OmniQuery"
                tech="FastAPI, Express, MongoDB, Vector DB, RAG, Docker"
                description="Document intelligence workspace indexing 50+ PDFs asynchronously with Vector Search retrieval and Groq-powered RAG answers in under 1.5 seconds. 3-service microservices using QStash, reducing AI-job failures by 95%."
                href="https://github.com/letsjoyn/one-ai"
              />
              <ProjectCard
                title="Donum — NGO Donation & Relief Platform"
                tech="Java, Servlets, JSP, MVC, SQL"
                description="MVC architecture with secure auth, automated tax receipts, and a dashboard tracking 5,000+ simulated donations. Weighted AI matching algorithm cutting distribution-planning time by 40%; MySQL triggers for automated inventory management."
                href="https://github.com/letsjoyn/Donum"
              />
              <ProjectCard
                title="Just Do It — Focus App"
                tech="C++, Windows APIs, Named Pipes, Firebase"
                description="Windows focus suite with a native C++ engine via named pipes, blocking 150+ sites/apps with strict process termination. Firebase Auth/Firestore for cloud sync across 500+ sessions with 99.9% sync success."
                href="https://github.com/letsjoyn/just-do-it"
              />
            </div>
          </div>
        </section>


        {/* Education Section */}
        <section id="education" className="flex flex-col gap-6 scroll-mt-32">
          <div className="bg-zinc-900/20 border border-zinc-800 rounded-sm p-6 flex flex-col gap-6">
            <SectionHeader title="Education" />
            <div className="flex flex-col gap-6 pl-1">
              <EducationItem
                degree="B.Tech — Information Science and Engineering"
                school="M.S. Ramaiah Institute of Technology"
                period="2024 – Present"
                details="Founding core member of AWS Cloud Club. Active in technical societies and competitive programming."
                score="9.36 CGPA"
              />
              <EducationItem
                degree="Class XII (PCM)"
                school="Mahatma Hansraj Modern School"
                period="2024"
                details="Strong foundation in Mathematics and Computer Science."
                score="94.4%"
              />
              <EducationItem
                degree="Class X"
                school="Jai Academy Jhansi"
                period="2022"
                details="Academic Excellence."
                score="94.8%"
              />
              <EducationItem
                degree="Schooling"
                school="No. 1 Air Force School, Gwalior"
                period="Early Education"
                details="Early education foundation."
              />
              <EducationItem
                degree="Schooling"
                school="Air Force School Viman Nagar, Pune"
                period="Early Education"
                details="Early education foundation."
              />
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="flex flex-col gap-6 scroll-mt-32">
          <div className="bg-zinc-900/20 border border-zinc-800 rounded-sm p-6 flex flex-col gap-6">
            <SectionHeader title="Achievements" />
            <div className="grid grid-cols-2 gap-3">
              {/* Featured */}
              <AchievementTile
                title="Meta PyTorch OpenEnv Hackathon"
                detail="Finalist — Top 2.5% of 31,000+ registrations · Grand Finale, SST Bangalore"
                gradient="from-violet-900/70 via-blue-900/50 to-black"
                badge="Apr 2026"
                className="col-span-2"
                href="https://github.com/letsjoyn/meta-scalar-hack"
              />
              <AchievementTile
                title="AI Codefix 2025"
                detail="1st Place — Dept. of AIML, MSRIT"
                images={["/lovable-uploads/ai-codefix.jpg", "/lovable-uploads/ai-codefix-2.jpg"]}
              />
              <AchievementTile
                title="AI Hackathon"
                detail="1st Place — IISc Bangalore · May 2025"
                bgImage="/lovable-uploads/iisc-hackathon.jpg"
              />
              <AchievementTile
                title="IISc Open Day CP Contest"
                detail="10th Rank — Bangalore · Mar 2026"
                gradient="from-emerald-900/70 via-teal-900/40 to-black"
                badge="Mar 2026"
              />
              <AchievementTile
                title="Finalist, Infotsav'25"
                detail="Grand Finale at IIITM Gwalior"
                bgImage="/lovable-uploads/infotsav-mail.jpg"
              />
              <AchievementTile
                title="Top 25 Teams"
                detail="Smart India Hackathon (Internal) 2025 · MSRIT"
                videoSrc="https://www.youtube.com/embed/arliHSiZf7c?autoplay=1&mute=1&controls=0&loop=1&playlist=arliHSiZf7c&playsinline=1&rel=0"
                href="https://www.youtube.com/watch?v=arliHSiZf7c"
                badge="Watch Demo"
                className="col-span-2"
              />
            </div>
          </div>
        </section>

        {/* Volunteering Section */}
        <section id="volunteering" className="flex flex-col gap-6 scroll-mt-32">
          <div className="bg-zinc-900/20 border border-zinc-800 rounded-sm p-6 flex flex-col gap-6">
            <SectionHeader title="Volunteering" />
            <div className="flex flex-col gap-8 pl-1">
              <div className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-serif text-zinc-200 group-hover:text-neon-green transition-colors">Core Member</h3>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">Mar 2025 – Apr 2026</span>
                </div>
                <div className="text-xs text-zinc-400 mb-2 font-medium flex items-center gap-2">
                  <Gamepad2 className="w-3 h-3" /> ClutchRIT Esports, MSRIT
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-2xl">
                  Served as public speaker and host, managing live engagement and tournament operations for events with 400+ attendees.
                </p>
              </div>

              <div className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-serif text-zinc-200 group-hover:text-neon-green transition-colors">Producer & Editor</h3>
                  <span className="text-[10px] text-zinc-500 font-mono">Remote</span>
                </div>
                <div className="text-xs text-zinc-400 mb-2 font-medium flex items-center gap-2">
                  <Video className="w-3 h-3" /> Video Content Strategy
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-2xl mb-2">
                  Directed and edited digital content generating 10M+ views; managed technical production for organisation feeds.
                </p>
                <a href="https://www.linkedin.com/in/letsjoyn/details/volunteering-experiences/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 px-2 py-1 rounded transition-colors">
                  <Play className="w-2.5 h-2.5 fill-current" /> Watch Videos
                </a>
              </div>
            </div>
          </div>
        </section>



        {/* Footer */}
        {/* Footer */}
        <footer className="pt-20 pb-8 border-t border-zinc-900 mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-[10px] font-mono text-zinc-600">

            <div className="flex flex-col gap-4 w-full md:w-auto">
              <div className="flex flex-col gap-0.5">
                <span>
                  Designed & Developed by <span className="text-zinc-300 font-semibold">Nayvedya Shrivastava</span>
                </span>
                <span>©2026. All rights reserved.</span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">Other Links</span>
                <div className="flex flex-wrap gap-2">
                  <a href="https://instagram.com/letsjoyn" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900/50 hover:bg-zinc-800 rounded border border-zinc-800 hover:border-zinc-700 transition-colors text-zinc-400 hover:text-zinc-200">
                    <Instagram className="w-3 h-3" /> Instagram
                  </a>
                  <a href="https://community.aws/@letsjoyn" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900/50 hover:bg-zinc-800 rounded border border-zinc-800 hover:border-zinc-700 transition-colors text-zinc-400 hover:text-zinc-200">
                    <Cloud className="w-3 h-3" /> AWS
                  </a>
                  <a href="https://youtube.com/@letsjoyn" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900/50 hover:bg-zinc-800 rounded border border-zinc-800 hover:border-zinc-700 transition-colors text-zinc-400 hover:text-zinc-200">
                    <Youtube className="w-3 h-3" /> YouTube
                  </a>

                </div>
              </div>
            </div>

            <div className="flex flex-col gap-0.5 text-left md:text-right w-full md:w-auto mt-4 md:mt-0">
              <span>Visitors <span className="text-zinc-400 font-bold">#4621</span></span>
              <span className="text-zinc-500">Delhi, {time}</span>
            </div>
          </div>
        </footer>
      </div>
    </div >
  );
};

// Sub-components

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="text-sm font-serif text-zinc-100 border border-zinc-700/50 px-3 py-1.5 inline-block rounded-sm self-start bg-zinc-800/60 mb-2">
    {title}
  </h2>
);

const SocialLinkInline = ({ href, label, icon }: { href: string, label: string, icon?: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-2 py-1 bg-zinc-800 text-zinc-100 text-xs rounded hover:bg-zinc-700 transition-colors mx-0.5 align-middle">
    {icon}
    {label}
  </a>
)

const SocialPill = ({ href, label, highlight, icon }: { href: string; label: string, highlight?: boolean, icon?: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "px-3 py-1.5 rounded text-xs font-medium transition-all duration-300 border flex items-center gap-1.5",
      highlight
        ? "bg-zinc-100 text-black border-zinc-100 hover:bg-zinc-300"
        : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-600 hover:bg-zinc-800"
    )}
  >
    {icon}
    {label}
  </a>
);

const SocialIcon = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, { href?: string; icon: React.ReactNode; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ href, icon, className, ...props }, ref) => {
    const baseStyles = cn(
      "rounded-full transition-colors inline-block cursor-pointer flex items-center justify-center",
      className || "p-2 bg-zinc-900 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800"
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noreferrer"
          className={baseStyles}
          {...props}
        >
          {icon}
        </a>
      )
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={baseStyles}
        {...props}
      >
        {icon}
      </button>
    )
  }
)
SocialIcon.displayName = "SocialIcon"

const ExperienceItem = ({ role, company, period, description, highlight, href }: { role: string; company: string; period: string; description: string; highlight?: boolean; href?: string }) => (
  <div className="group">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className={cn("text-base font-serif transition-colors duration-300 inline-flex items-center gap-1.5", highlight ? "text-zinc-100 hover:text-white" : "text-zinc-200 group-hover:text-neon-green")}>
          {company}
          <Github className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
        </a>
      ) : (
        <h3 className={cn("text-base font-serif transition-colors duration-300", highlight ? "text-zinc-100 group-hover:text-white" : "text-zinc-200 group-hover:text-neon-green")}>{company}</h3>
      )}
      <span className="text-[10px] text-zinc-500 font-mono">{period}</span>
    </div>
    <div className="text-xs text-zinc-400 mb-2 font-medium flex items-center gap-2">
      {highlight && <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
      {role}
    </div>
    <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl font-urbanist">{description}</p>
  </div>
);


const EducationItem = ({ degree, school, period, details, score }: { degree: string; school: string; period: string; details: string; score?: string }) => (
  <div className="group relative transition-colors duration-300">
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-serif text-zinc-200 group-hover:text-zinc-50 transition-colors flex items-center gap-2">
          {school}
        </h3>
        <span className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-500 transition-colors">{period}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-400">{degree}</span>
        {score && (
          <span className="text-xs text-zinc-300">| {score}</span>
        )}
      </div>

      <p className="text-sm text-zinc-500 leading-relaxed max-w-xl group-hover:text-zinc-400 transition-colors font-urbanist">
        {details}
      </p>
    </div>
  </div>
);

const ProjectCard = ({ title, tech, description, href, badge }: { title: string; tech: string; description: string; href?: string; badge?: string }) => (
  <div className="group">
    <div className="flex justify-between items-start mb-1">
      <h3 className="text-base font-serif text-zinc-200 group-hover:underline decoration-zinc-700 underline-offset-4 decoration-1">{title}</h3>
      <div className="flex items-center gap-2 shrink-0 ml-2">
        {badge && <span className="text-[9px] text-zinc-600 font-mono bg-zinc-900/60 border border-zinc-800/50 px-1.5 py-0.5 rounded">{badge}</span>}
        {href && (
          <a href={href} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-200 transition-colors" onClick={e => e.stopPropagation()}>
            <Github className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
    <div className="flex flex-wrap gap-1.5 mb-2">
      {tech.split(',').map((t) => (
        <span key={t} className="text-[10px] text-zinc-500 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-800/30">
          {t.trim()}
        </span>
      ))}
    </div>
    <p className="text-sm text-zinc-500 leading-relaxed max-w-xl font-urbanist">{description}</p>
  </div>
);

const SkillRow = ({ label, skills }: { label: string; skills: string[] }) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-2">
    <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest pt-0.5 w-28 shrink-0">{label}</span>
    <div className="flex flex-wrap gap-1.5">
      {skills.map((s) => (
        <span key={s} className="text-xs text-zinc-400 bg-zinc-900/50 border border-zinc-800/50 px-2 py-0.5 rounded hover:border-zinc-700 hover:text-zinc-200 transition-colors cursor-default">
          {s}
        </span>
      ))}
    </div>
  </div>
);

const AchievementTile = ({ title, detail, bgImage, videoSrc, images, gradient, className, href, badge }: { title: string; detail: string; bgImage?: string; videoSrc?: string; images?: string[]; gradient?: string; className?: string; href?: string; badge?: string }) => {
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
        "group relative h-40 rounded-sm overflow-hidden bg-zinc-900/50 border border-zinc-800/50 transition-all duration-300 hover:border-zinc-700 block",
        gradient ? `bg-gradient-to-br ${gradient}` : "",
        className
      )}
    >
      {videoSrc ? (
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-300">
          <iframe
            src={videoSrc}
            className="w-full h-full object-cover scale-[1.35]" // Scaling slightly to cover letterboxing if any
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
              "absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110",
              index === currentImageIndex ? "opacity-60 group-hover:opacity-40" : "opacity-0"
            )}
          />
        ))
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      {badge && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 -rotate-2 rounded-sm shadow-md z-10 border border-yellow-600/20 shadow-black/20">
          {badge}
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-sm font-bold text-white mb-0.5 leading-tight group-hover:text-neon-green transition-colors">{title}</h3>
        <p className="text-[10px] text-zinc-400 font-urbanist leading-tight line-clamp-2">{detail}</p>
      </div>
    </Wrapper>
  );
};

export default Index;
