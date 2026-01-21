
import React, { useState, useEffect } from 'react';
import { Linkedin, Github, Twitter, Mail, FileText, ExternalLink, Youtube, Instagram, Swords, Puzzle, Cloud, Video, Play, Gamepad2, Trophy, Medal } from 'lucide-react';
import LetterGlitch from '../components/LetterGlitch';
import CodeforcesRating from '../components/CodeforcesRating';
import LeetCodeRating from '../components/LeetCodeRating';
import { CodeforcesBrandIcon, LeetCodeBrandIcon } from '../components/Icons';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
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
    <div className="min-h-screen bg-black relative overflow-visible font-sans text-zinc-300 selection:bg-neon-green/20 selection:text-neon-green">
      {/* Background Glitch - Visible on Sides */}
      <div className="fixed inset-0 z-0">
        <LetterGlitch
          glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={true}
          smooth={true}
        />
      </div>

      {/* Main Content Container - Solid Black Box */}
      <div className="relative z-10 max-w-3xl mx-auto min-h-screen bg-black border-x border-zinc-800 shadow-2xl px-6 md:px-10 py-6 flex flex-col gap-8">

        <nav className="flex justify-center mb-6 mt-4 w-full z-50">
          <div className="flex gap-2 overflow-x-auto scrollbar-minimal pb-2 max-w-full mx-4 sm:mx-0 whitespace-nowrap mask-gradient">
            {['About', 'Experience', 'Projects', 'Achievements', 'Volunteering', 'Education'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={cn(
                  "px-4 py-2.5 md:px-4 md:py-2 rounded-md text-sm md:text-sm tracking-wider transition-all duration-300 shrink-0 border border-dashed",
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
            <div className="relative w-16 h-16 shrink-0">
              <img
                src="/lovable-uploads/a93029cc-2bbe-4a09-bb32-5c6bd97f5ab3.png"
                alt="Nayvedya"
                className="w-full h-full rounded-full object-cover border border-zinc-800 shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-white mb-1.5">
                Hi, I'm Nayvedya Shrivastava
              </h1>
              <p className="text-xs text-zinc-500 font-mono">
                frontend • backend • devops • competitive programmer
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-zinc-400 max-w-xl font-light">
            I am a <span className="text-zinc-200 font-medium">2nd-year student</span> expanding my knowledge into Data Structures, Computer Concepts, and Full Stack Development while building real-world projects.
          </p>

          <div className="flex flex-col gap-3">
            <p className="text-xs text-zinc-500">
              Available for freelance or full-time roles. Slide into my <SocialLinkInline href="https://x.com/letsjoyn" label="DMs" icon={<Twitter className="w-3 h-3" />} /> or <SocialLinkInline href="mailto:joynnayvedya@gmail.com" label="Email" icon={<Mail className="w-3 h-3" />} /> me.
            </p>

            {/* Consolidated Links */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <SocialPill href="https://github.com/letsjoyn" label="GitHub" icon={<Github className="w-3.5 h-3.5" />} />
              <SocialPill href="https://www.linkedin.com/in/letsjoyn/" label="LinkedIn" icon={<Linkedin className="w-3.5 h-3.5" />} />
              <SocialPill href="/resume.pdf" label="Resume" highlight />
              <span className="text-zinc-600 px-1 text-xs">?</span>
              <span className="text-zinc-500 text-[10px] italic">Yep, they're all unlocked if you're curious.</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-2 opacity-100">
              <Popover>
                <PopoverTrigger asChild>
                  <SocialIcon
                    icon={
                      <div className="flex items-center gap-2.5">
                        <CodeforcesBrandIcon className="w-5 h-5" />
                        <span className="font-medium text-sm">Codeforces</span>
                      </div>
                    }
                    className="px-5 py-2.5 w-auto bg-[#1f2024] hover:bg-[#2d2e32] border border-transparent hover:border-blue-500/30 text-zinc-300 hover:text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                  />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none" side="bottom" align="start" sideOffset={5} collisionPadding={10}>
                  <CodeforcesRating />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <SocialIcon
                    icon={
                      <div className="flex items-center gap-2.5">
                        <LeetCodeBrandIcon className="w-5 h-5" />
                        <span className="font-medium text-sm">LeetCode</span>
                      </div>
                    }
                    className="px-5 py-2.5 w-auto bg-[#1f2024] hover:bg-[#2d2e32] border border-transparent hover:border-orange-500/30 text-zinc-300 hover:text-white transition-all duration-300 shadow-lg hover:shadow-orange-500/20"
                  />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none" side="bottom" align="start" sideOffset={5} collisionPadding={10}>
                  <LeetCodeRating />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </header>

        {/* Experience Section */}
        <section id="experience" className="flex flex-col gap-6 scroll-mt-32">
          <SectionHeader title="Places I've Made an Impact" />
          <div className="flex flex-col gap-8 pl-1">
            <ExperienceItem
              role="Founding Core Member"
              company="AWS Cloud Club - MSRIT"
              period="May 2024 – Present"
              description="Building a technical community and organizing workshops for 200+ students in cloud computing. Leading initiatives to foster cloud literacy."
            />
            <ExperienceItem
              role="Product Operations Intern"
              company="Mera Mentor"
              period="Oct 2023 – Mar 2024"
              description="Managed product delivery workflows and collaborated with engineering teams for bug identification and UX refinement."
            />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="flex flex-col gap-6 scroll-mt-32">
          <SectionHeader title="Things I've Built" />
          <div className="grid grid-cols-1 gap-6">
            <ProjectCard
              title="LinkedIn for Gamers"
              tech="MERN Stack, Socket.io"
              description="A specialized networking platform for esports professionals and recruitment."
            />
            <ProjectCard
              title="Faculty Attendance Automation"
              tech="Python, Selenium, OCR"
              description="Automated solution digitizing physical attendance registers and streamlining data entry."
            />
            <ProjectCard
              title="Book-Once"
              tech="Full Stack Aggregator"
              description="Comprehensive travel booking platform aggregating flights and hotels."
            />
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="flex flex-col gap-6 scroll-mt-32">
          <SectionHeader title="Achievements" />
          <div className="flex flex-col gap-4 pl-1">
            <AchievementItem
              title="1st Place, AI Codefix 2025"
              detail="Organized by Dept. of AIML, MSRIT."
            />
            <AchievementItem
              title="1st Place, AI Hackathon"
              detail="Won first prize at IISc Bangalore (May 2025)."
            />
            <AchievementItem
              title="Top 25 Teams (Internal)"
              detail="Selected internally at MSRIT for Smart India Hackathon 2025."
            />
            <AchievementItem
              title="Finalist, Infotsav'25"
              detail="Selected for Grand Finale at IIITM Gwalior."
            />
            <AchievementItem
              title="Global Rank 1669"
              detail="COMEDK 2025 (Top 1.5% of applicants)."
            />
          </div>
        </section>

        {/* Volunteering Section */}
        <section id="volunteering" className="flex flex-col gap-6 scroll-mt-32">
          <SectionHeader title="Volunteering" />
          <div className="flex flex-col gap-8 pl-1">
            <div className="group">
              <div className="flex justify-between items-baseline mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-serif text-zinc-200 group-hover:text-neon-green transition-colors">Core Member</h3>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">Mar 2025 - Present</span>
              </div>
              <div className="text-xs text-zinc-400 mb-2 font-medium flex items-center gap-2">
                <Gamepad2 className="w-3 h-3" /> ClutchRIT Esports
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-2xl">
                Organized competitive gaming events for 500+ students, managed logistics, and handled public relations for the club.
              </p>
            </div>

            <div className="group">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-serif text-zinc-200 group-hover:text-neon-green transition-colors">Video Editor</h3>
                <span className="text-[10px] text-zinc-500 font-mono">Aug 2024 - Sep 2024</span>
              </div>
              <div className="text-xs text-zinc-400 mb-2 font-medium flex items-center gap-2">
                <Video className="w-3 h-3" /> The LNM Institute of Information Technology
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-2xl mb-2">
                Learnt and applied content creation skills to produce videos for various organizations, including content that achieved viral reach.
              </p>
              <a href="https://www.linkedin.com/in/letsjoyn/details/volunteering-experiences/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 px-2 py-1 rounded transition-colors">
                <Play className="w-2.5 h-2.5 fill-current" /> Watch Videos
              </a>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="flex flex-col gap-6 scroll-mt-32">
          <SectionHeader title="Education" />
          <div className="flex flex-col gap-6 pl-1">
            <EducationItem
              degree="B.E. in Information Science and Engineering"
              school="M.S. Ramaiah Institute of Technology"
              period="Expected 2028"
              details="Active member of technical societies. Secured 1st Place in AI Codefin 2024."
              status="in-progress"
              score="9.47 CGPA (till 2nd sem)"
            />
            <EducationItem
              degree="Class XII (PCM)"
              school="Mahatma Hansraj Modern School"
              period="Completed"
              details="Strong foundation in Mathematics and Computer Science."
              status="completed"
              score="93.4%"
            />
            <EducationItem
              degree="Class X"
              school="Jai Academy Jhansi"
              period="Completed"
              details="Academic Excellence."
              status="completed"
              score="94.8%"
            />
            <EducationItem
              degree="Schooling"
              school="No. 1 Air Force School, Gwalior"
              period="Completed"
              details="Early education foundation."
              status="completed"
            />
            <EducationItem
              degree="Schooling"
              school="Air Force School Viman Nagar, Pune"
              period="Completed"
              details="Early education foundation."
              status="completed"
            />
          </div>
        </section>

        {/* Footer */}
        {/* Footer */}
        <footer className="pt-20 pb-8 border-t border-dashed border-zinc-900 mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-[10px] font-mono text-zinc-600">

            <div className="flex flex-col gap-4 w-full md:w-auto">
              <div className="flex flex-col gap-0.5">
                <span>
                  Designed & Developed by <span className="text-zinc-300 font-semibold">Nayvedya Shrivastava</span>
                </span>
                <span>©2025. All rights reserved.</span>
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
  <h2 className="text-sm font-serif text-zinc-100 border-dashed border border-zinc-700/50 px-3 py-1.5 inline-block rounded-sm self-start bg-zinc-900/30 mb-2">
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

const ExperienceItem = ({ role, company, period, description }: { role: string; company: string; period: string; description: string }) => (
  <div className="group">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
      <h3 className="text-base font-serif text-zinc-200 group-hover:text-neon-green transition-colors duration-300">{company}</h3>
      <span className="text-[10px] text-zinc-500 font-mono">{period}</span>
    </div>
    <div className="text-xs text-zinc-400 mb-2 font-medium">{role}</div>
    <p className="text-xs text-zinc-500 leading-relaxed max-w-2xl">{description}</p>
  </div>
);

const EducationItem = ({ degree, school, period, details, status, score }: { degree: string; school: string; period: string; details: string; status?: 'completed' | 'in-progress'; score?: string }) => (
  <div className="group relative transition-colors duration-300">
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-serif text-zinc-200 group-hover:text-zinc-50 transition-colors flex items-center gap-2">
          {school}
        </h3>
        {status === 'in-progress' ? (
          <div className="relative">
            <span className="border border-yellow-500/20 bg-yellow-500/10 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-mono text-yellow-500/90 animate-pulse">
              LOADING...
            </span>
            <span className="absolute inset-0 border border-yellow-500/40 rounded animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20"></span>
          </div>
        ) : status === 'completed' ? (
          <span className="border border-green-500/20 bg-green-500/10 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-mono text-green-500/80">
            Completed
          </span>
        ) : (
          <span className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-500 transition-colors">{period}</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-400">{degree}</span>
        {score && (
          <span className="inline-block bg-[#facc15] text-black text-[10px] font-bold px-1.5 py-0.5 -rotate-1 rounded-sm cursor-default hover:rotate-0 transition-transform duration-200">
            {score}
          </span>
        )}
      </div>

      <p className="text-[10px] text-zinc-500 leading-relaxed max-w-xl group-hover:text-zinc-400 transition-colors">
        {details}
      </p>
    </div>
  </div>
);

const ProjectCard = ({ title, tech, description }: { title: string; tech: string; description: string }) => (
  <div className="group cursor-pointer">
    <div className="flex justify-between items-start mb-1">
      <h3 className="text-base font-serif text-zinc-200 group-hover:underline decoration-zinc-700 underline-offset-4 decoration-1">{title}</h3>
      <ExternalLink className="w-3 h-3 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
    </div>
    <div className="flex gap-1.5 mb-2">
      {tech.split(',').map((t) => (
        <span key={t} className="text-[10px] text-zinc-500 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-800/30">
          {t.trim()}
        </span>
      ))}
    </div>
    <p className="text-xs text-zinc-500 leading-relaxed max-w-xl">{description}</p>
  </div>
);

const AchievementItem = ({ title, detail }: { title: string; detail: string }) => (
  <div className="group flex flex-col gap-1 mb-2">
    <h3 className="text-base font-serif text-zinc-200 group-hover:text-neon-green transition-colors">{title}</h3>
    <p className="text-xs text-zinc-500 font-urbanist leading-relaxed">{detail}</p>
  </div>
);

export default Index;
