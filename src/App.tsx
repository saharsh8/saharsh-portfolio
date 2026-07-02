import { useState, useEffect, useRef } from "react";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Briefcase,
  GraduationCap,
  Mail,
  Linkedin,
  FileText,
  ChevronDown,
  ChevronUp,
  Moon,
  Sun,
  Download,
  Sparkles,
  MapPin,
  ExternalLink,
  Award,
  BookOpen,
  Cpu,
  Layers,
  ArrowDown,
  Printer,
  X,
  Smartphone,
  Layout,
  Terminal,
  Zap,
  Send,
  CheckCircle,
  Code,
  Github,
  Database,
  Search,
} from "lucide-react";
import AnimatedBackground from "./components/AnimatedBackground";
import { TopProgressBar } from "./components/TopProgressBar";
import { CustomCursor } from "./components/CustomCursor";
import { TerminalWindow } from "./components/TerminalWindow";
import { TiltCard } from "./components/TiltCard";
import { MagneticButton } from "./components/MagneticButton";
import { ChatWidget } from "./components/ChatWidget";
import { ProjectModal } from "./components/ProjectModal";
import { CommandMenu } from "./components/CommandMenu";
import { SkillOrbit } from "./components/SkillOrbit";
import { NoiseOverlay } from "./components/NoiseOverlay";

// ==========================================
// 1) EXTRACTED & STRUCTURED RESUME JSON
// ==========================================
const RESUME_DATA = {
  basics: {
    name: "Saharsh Srivastava",
    title: "Transforming complex data into actionable insights and engineering scalable solutions. Passionate about AI ethics, predictive modeling, and building impactful products.",
    location: "India",
    email: "saharsh.sriva08@gmail.com",
    links: {
      linkedin: "https://linkedin.com/in/saharsh-srivastava",
      github: "https://github.com/saharsh8",
    },
    summary: "Computer Science undergraduate with internship experience spanning front-end engineering and Artificial Intelligence. Proficient in Python, Java, and modern web frameworks for building scalable applications, automating workflows, and deploying data-driven solutions. Solid foundation in Data Structures and Algorithms, cloud computing, and technical project leadership."
  },
  experience: [
    {
      id: "exp-ibm",
      company: "IBM SkillsBuild Internship Program",
      role: "AI/ML Intern",
      dates: "Jan 2026",
      location: "Remote",
      subTitles: [
        "AI/ML Intern",
        "IBM SkillsBuild Internship Program"
      ],
      bullets: [
        "Selected for a competitive 6-week internship facilitated by IBM and Edunet Foundation.",
        "Gained structured exposure to Artificial Intelligence and Machine Learning concepts and methodologies.",
        "Leveraged Python libraries (NumPy, Pandas, Scikit-Learn) to develop predictive models and solve complex data problems, improving baseline model accuracy by [X]%.",
        "Collaborated with cross-functional teams nationwide to deliver data-driven projects via the IBM SkillsBuild platform, reducing data processing overhead by [X]%."
      ],
      metrics: [
        { label: "Duration", value: "6 Weeks" },
        { label: "Focus", value: "AI/ML" },
        { label: "Tools", value: "Python Data Stack" }
      ],
      tags: ["Python", "NumPy", "Pandas", "Scikit-Learn", "Machine Learning"]
    },
    {
      id: "exp-candour",
      company: "Candour Software Pvt. Ltd.",
      role: "Web Development Intern",
      dates: "Dec 2025",
      location: "India",
      subTitles: [
        "Web Development Intern",
        "Candour Software Pvt. Ltd."
      ],
      bullets: [
        "Engineered responsive and accessible user interfaces utilizing HTML, CSS, JavaScript, and React.",
        "Developed and integrated front-end modules within an agile team, ensuring cross-browser compatibility and accelerating feature delivery by [X]%.",
        "Optimized UI performance and accessibility, significantly enhancing the end-user experience across client deliverables and reducing average load times by [X]%.",
        "Actively participated in agile ceremonies and collaborative software development lifecycles."
      ],
      metrics: [
        { label: "Core Tech", value: "React JS" },
        { label: "Output", value: "Responsive UI" },
        { label: "Workflow", value: "Agile" }
      ],
      tags: ["React", "JavaScript", "HTML/CSS", "Agile", "Frontend Development"]
    }
  ],
  highlights: [
    {
      title: "AI & RAG Engineering",
      description: "Engineered robust Retrieval-Augmented Generation (RAG) pipelines using LangChain and Google Gemini, grounding Large Language Models (LLMs) in proprietary datasets for highly accurate, domain-specific outputs.",
      icon: Cpu,
      tags: ["LangChain", "Gemini 1.5", "FAISS"]
    },
    {
      title: "Full-Stack Development",
      description: "Developed end-to-end applications utilizing Next.js, React, and FastAPI. Architected decoupled CRM systems featuring real-time analytics and optimized SQL data pipelines.",
      icon: Layers,
      tags: ["Next.js", "React", "FastAPI", "PostgreSQL"]
    },
    {
      title: "Predictive Modeling & XAI",
      description: "Designed Explainable AI (XAI) frameworks leveraging LightGBM and XGBoost to automate evaluations, streamline risk assessments, and ensure model fairness and transparency.",
      icon: Zap,
      tags: ["XGBoost", "LightGBM", "SHAP", "LIME"]
    }
  ],
  projects: [
    {
      title: "AI-Native Campaign Management CRM",
      dates: "Jun 2026 – Jun 2026",
      bullets: [
        "Frictionless Data Ingestion: Reduced time-to-value for new users by engineering a high-performance CSV ingestion engine that instantly structures and paginates raw customer data.",
        "Operational Efficiency (AI Copilot): Accelerated campaign creation time by enabling non-technical marketing teams to generate complex audience segments in seconds using natural language, entirely eliminating SQL dependency.",
        "Data Accuracy & ROI Measurement: Enabled 100% accurate, user-level delivery tracking by implementing strict relational SQL joins, replacing lazy aggregate counters and allowing for precise campaign ROI calculations.",
        "System Reliability & Throughput: Ensured high-availability (zero API blocking) during massive campaign dispatches by offloading heavy payloads to an asynchronous event loop and webhook architecture.",
        "Interactive Dashboard: Created a real-time analytics module integrating webhook data to visualize exact delivery statuses (Sent, Delivered, Opened) per customer within a dynamic 360-degree profile view."
      ],
      stack: ["Next.js", "React", "Tailwind CSS", "Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Vercel", "Render"],
      links: [
        { label: "Live Demo", url: "https://xeno-crm-sprint.vercel.app" },
        { label: "GitHub", url: "https://github.com/saharsh8" }
      ]
    },
    {
      title: "EquiScore: Explainable AI-Driven Inclusive Credit Scoring",
      dates: "Mar 2026 – May 2026",
      bullets: [
        "Core Framework: Developed an Explainable AI (XAI) system utilizing LightGBM and XGBoost to automate creditworthiness evaluations and streamline financial risk assessments.",
        "Team Collaboration: Collaborated effectively within a research team at SRMIST to design, test, and implement the system architecture through iterative development stages.",
        "Data Optimization: Integrated ADASYN oversampling to resolve severe class imbalance, significantly boosting minority class recall by [X]% and ensuring fairer predictive accuracy.",
        "Explainability & Compliance: Implemented SHAP and LIME to deliver real-time, feature-level transparency, eliminating \"black-box\" limitations for regulatory compliance.",
        "Scalability & Performance: Engineered a modular, microservices-inspired architecture capable of high-performance processing on large-scale datasets exceeding 150,000 records, reducing evaluation times by [X]%.",
        "Interactive Dashboard: Built a dynamic, stakeholder-facing frontend using Streamlit to display live credit scorecards and interactive visual risk breakdowns."
      ],
      stack: ["Python", "LightGBM", "XGBoost", "ADASYN", "SHAP", "LIME", "Scikit-Learn", "Streamlit", "Docker"],
      links: []
    },
    {
      title: "AI Study Buddy",
      dates: "Jan 2026 – Feb 2026",
      bullets: [
        "Radical Time-to-Insight Optimization: Engineered an automated RAG pipeline that processes 100-page technical manuals and generates academic summaries, targeted MCQs, and flashcards in under 15 seconds—a >95% reduction in manual data synthesis time.",
        "Core Framework: Architected the RAG pipeline using LangChain, orchestrating the extraction, segmentation, and semantic analysis of multi-format documents (PDF, DOCX, PPTX) to ensure context-grounded AI responses.",
        "Data Optimization: Implemented advanced recursive text splitting and indexed high-density semantic embeddings via an in-memory FAISS vector database, enabling ultra-fast, low-latency search retrieval.",
        "Reliability & Hallucination Mitigation: Restricted model hallucination by enforcing strict boundary conditions via context windowing, guaranteeing reliable outputs derived exclusively from verified facts.",
        "Interactive Dashboard: Designed a clean, professional frontend using Streamlit, featuring distinct workspace modules such as an Executive Summary Hub, a fact-extracting Quiz Engine, and a dedicated Flashcard Lab."
      ],
      stack: ["Python 3.10", "Google Gemini 1.5 Flash", "LangChain", "FAISS Vector DB", "Streamlit", "RAG"],
      links: [
        { label: "Live Demo", url: "https://ai-study-buddyy.streamlit.app/" }
      ]
    }
  ],
  skills: {
    languages: {
      handsOn: ["Java", "Python", "Google Gemini", "Retrieval-Augmented Generation (RAG)", "LangChain"],
      familiar: ["C", "C++", "JavaScript", "SQL"]
    },
    web: [
      { name: "React", category: "Web Development" },
      { name: "HTML/CSS", category: "Web Development" },
      { name: "Tailwind CSS", category: "Web Development" },
      { name: "Streamlit", category: "Dashboards" },
      { name: "FAISS Vector Search", category: "Data Science" },
      { name: "Recursive Character Text Splitting", category: "Data Science" },
      { name: "Pandas", category: "Data Science" },
      { name: "NumPy", category: "Data Science" },
      { name: "Scikit-Learn", category: "Data Science" },
      { name: "Matplotlib", category: "Data Science" }
    ],
    interpersonal: [
      { name: "Problem Solving", category: "Methodology" },
      { name: "Debugging & QA", category: "Methodology" },
      { name: "Professional Communication", category: "Methodology" },
      { name: "Cross-Functional Collaboration", category: "Methodology" },
      { name: "End-to-End Project Workflow", category: "Methodology" }
    ],
    tools: [
      { name: "VS Code", category: "IDE" },
      { name: "IntelliJ IDEA", category: "IDE" },
      { name: "PyCharm", category: "IDE" },
      { name: "WebStorm", category: "IDE" },
      { name: "GitHub", category: "Version Control" },
      { name: "Google Colab", category: "Cloud Tools" }
    ]
  },
  certifications: [
    { title: "PYTHON Basic Certificate" },
    { title: "Python 101 for Data Science" },
    { title: "AI For Everyone" },
    { title: "JAVA Basic Certificate" },
    { title: "Machine Learning with Python" }
  ],
  education: [
    {
      institution: "SRM Institute of Science and Technology (SRMIST)",
      degree: "Bachelor of Technology - BTech, Computer Science",
      dates: "July 2023 - July 2027",
      status: "Final Year"
    },
    {
      institution: "Sant Gyaneshwar Model School",
      degree: "Senior Secondary (XII)",
      dates: "April 2021 - April 2022"
    },
    {
      institution: "Bal Bharati Public School, Noida",
      degree: "Secondary (X)",
      dates: "April 2019 - April 2020"
    }
  ]
};

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isSplash, setIsSplash] = useState(true);
  const [progress, setProgress] = useState(0);
  const [expandedExps, setExpandedExps] = useState<Record<string, boolean>>({
    "exp-ibm": true, // Default open the primary role
  });
  const [activeSection, setActiveSection] = useState("hero");
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // References for sections to implement scroll-spy
  const sections = ["hero", "impact", "experience", "projects", "skills", "education-certs", "contact"];
  const heroRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const eduCertsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Splash Screen Timer + Progress Simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsSplash(false), 200);
          return 100;
        }
        return oldProgress + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Theme Toggler effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  // ScrollSpy listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      if (contactRef.current && scrollPos >= contactRef.current.offsetTop) {
        setActiveSection("contact");
      } else if (eduCertsRef.current && scrollPos >= eduCertsRef.current.offsetTop) {
        setActiveSection("education-certs");
      } else if (skillsRef.current && scrollPos >= skillsRef.current.offsetTop) {
        setActiveSection("skills");
      } else if (projectsRef.current && scrollPos >= projectsRef.current.offsetTop) {
        setActiveSection("projects");
      } else if (experienceRef.current && scrollPos >= experienceRef.current.offsetTop) {
        setActiveSection("experience");
      } else if (impactRef.current && scrollPos >= impactRef.current.offsetTop) {
        setActiveSection("impact");
      } else {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleExp = (id: string) => {
    setExpandedExps((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const scrollToSection = (id: string) => {
    let targetRef;
    if (id === "hero") targetRef = heroRef;
    if (id === "impact") targetRef = impactRef;
    if (id === "experience") targetRef = experienceRef;
    if (id === "projects") targetRef = projectsRef;
    if (id === "skills") targetRef = skillsRef;
    if (id === "education-certs") targetRef = eduCertsRef;
    if (id === "contact") targetRef = contactRef;

    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  // Pre-formatted email content helper
  const mailToLink = `mailto:${RESUME_DATA.basics.email}?subject=Inquiry%20from%20Portfolio&body=Hello%20Saharsh,%0A%0AI%20viewed%20your%20portfolio%20and%20would%20love%20to%20connect.%0A%0A`;

  // SPLASH INTRO SCREEN
  return (
    <AnimatePresence mode="wait">
      {isSplash ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cyber-dark text-white font-sans"
        >
          <div className="text-center space-y-6 max-w-xs w-full px-4">
            {/* Animated Monogram */}
            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full border border-neon-secondary/30 bg-cyber-dark/80 glow-secondary animate-pulse">
              <span className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-primary to-neon-secondary font-sans">
                SS
              </span>
              {/* Ambient revolving glow ring */}
              <div className="absolute inset-0 rounded-full border-t border-r border-neon-primary/40 animate-spin" style={{ animationDuration: "2s" }}></div>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-mono tracking-[0.25em] text-neon-primary/80 uppercase">
                Initializing Core
              </h2>
              <p className="text-xs font-mono text-gray-500">Saharsh Srivastava Portfolio</p>
            </div>

            {/* Loading Bar Container */}
            <div className="w-full bg-white/5 h-[4px] rounded-full overflow-hidden border border-white/5">
              <div
                className="bg-gradient-to-r from-neon-primary via-violet-500 to-neon-secondary h-full rounded-full transition-all duration-150 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            
            <div className="text-right">
              <span className="text-xs font-mono text-neon-secondary">{Math.min(progress, 100)}%</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`min-h-screen ${isDark ? "bg-cyber-dark text-white" : "bg-cyber-light text-gray-900"} transition-colors duration-500 font-sans selection:bg-neon-secondary/30 selection:text-white relative`}
        >
          {/* Global Enhancements */}
          <NoiseOverlay />
          <TopProgressBar />
          <CustomCursor />
          <CommandMenu />
          <ChatWidget />
          <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />

          {/* 2) Canvas-based animated premium background */}
          <AnimatedBackground isDark={isDark} />

      {/* ==========================================
          HEADER / TOP NAVIGATION (Desktop Only)
          ========================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-8"></div> {/* Spacer for alignment */}

          {/* Nav links */}
          <nav className="flex items-center space-x-1 p-1 rounded-full border border-white/5 bg-cyber-dark/40 backdrop-blur-md">
            {sections.map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  activeSection === sec
                    ? "bg-gradient-to-r from-neon-primary/20 to-neon-secondary/20 border border-neon-primary/30 text-neon-primary"
                    : "text-gray-400 hover:text-white border border-transparent"
                }`}
              >
                {sec === "education-certs" ? "Credentials" : sec.charAt(0).toUpperCase() + sec.slice(1)}
              </button>
            ))}
          </nav>

          {/* Theme Toggler & PDF CTA */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowPrintModal(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs font-medium hover:border-neon-primary/40 hover:text-neon-primary transition-all cursor-pointer"
              title="Download/Print resume layout"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full CV</span>
            </button>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-violet-400" />}
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          MOBILE NAVIGATION (Bottom Bar)
          ========================================== */}
      <nav className={`fixed bottom-0 left-0 right-0 z-40 md:hidden border-t ${
        isDark ? "border-white/10 bg-cyber-dark/85" : "border-gray-200 bg-cyber-light/90"
      } backdrop-blur-lg px-6 py-3 flex items-center justify-between`}>
        <button
          onClick={() => scrollToSection("hero")}
          className={`flex flex-col items-center space-y-1 ${
            activeSection === "hero" ? "text-neon-primary" : "text-gray-400"
          }`}
        >
          <Smartphone className="w-5 h-5" />
          <span className="text-[10px] font-medium font-mono hidden sm:block">Home</span>
        </button>

        <button
          onClick={() => scrollToSection("impact")}
          className={`flex flex-col items-center space-y-1 ${
            activeSection === "impact" ? "text-neon-primary" : "text-gray-400"
          }`}
        >
          <Zap className="w-5 h-5" />
          <span className="text-[10px] font-medium font-mono hidden sm:block">Impact</span>
        </button>

        <button
          onClick={() => scrollToSection("experience")}
          className={`flex flex-col items-center space-y-1 ${
            activeSection === "experience" ? "text-neon-primary" : "text-gray-400"
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px] font-medium font-mono hidden sm:block">Work</span>
        </button>

        <button
          onClick={() => scrollToSection("projects")}
          className={`flex flex-col items-center space-y-1 ${
            activeSection === "projects" ? "text-neon-primary" : "text-gray-400"
          }`}
        >
          <Code className="w-5 h-5" />
          <span className="text-[10px] font-medium font-mono hidden sm:block">Projects</span>
        </button>

        <button
          onClick={() => scrollToSection("skills")}
          className={`flex flex-col items-center space-y-1 ${
            activeSection === "skills" ? "text-neon-primary" : "text-gray-400"
          }`}
        >
          <Cpu className="w-5 h-5" />
          <span className="text-[10px] font-medium font-mono hidden sm:block">Skills</span>
        </button>

        <button
          onClick={() => scrollToSection("education-certs")}
          className={`flex flex-col items-center space-y-1 ${
            activeSection === "education-certs" ? "text-neon-primary" : "text-gray-400"
          }`}
        >
          <GraduationCap className="w-5 h-5" />
          <span className="text-[10px] font-medium font-mono hidden sm:block">Specs</span>
        </button>

        {/* Quick actions for mobile */}
        <div className="w-[1px] h-6 bg-white/10 mx-1"></div>

        <button
          onClick={() => setShowPrintModal(true)}
          className="p-2 rounded-full bg-neon-secondary/20 text-neon-secondary border border-neon-secondary/30"
          title="Print CV"
        >
          <FileText className="w-4 h-4" />
        </button>
      </nav>

      {/* ==========================================
          MAIN LAYOUT CONTAINER
          ========================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-20 md:pt-32 pb-24 md:pb-16 space-y-24 md:space-y-40">
        
        {/* ==========================================
            1) HERO SECTION
            ========================================== */}
        <motion.section 
          id="hero" 
          ref={heroRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="min-h-[75vh] md:min-h-[80vh] flex flex-col justify-center relative py-12"
        >
          <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-12">
            <div className="space-y-8 max-w-3xl flex-1">
              {/* Top Badge: Role indicator */}
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-neon-primary/30 bg-neon-primary/10 text-xs font-mono font-bold text-neon-primary tracking-wide glow-primary animate-pulse-slow">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open to Collaborations & New Opportunities</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none font-sans">
                  I'm{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-primary via-violet-400 to-neon-secondary">
                    {RESUME_DATA.basics.name}
                  </span>
                </h1>
                
                <h2 className="text-lg sm:text-2xl font-mono text-gray-400 max-w-3xl leading-relaxed">
                  {RESUME_DATA.basics.title}
                </h2>
              </div>

              <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-sans font-light">
                {RESUME_DATA.basics.summary}
              </p>

              {/* Quick Contact info strip in Hero */}
              <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-gray-400">
                <span className="flex items-center space-x-1 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">
                  <MapPin className="w-3.5 h-3.5 text-neon-primary" />
                  <span>{RESUME_DATA.basics.location}</span>
                </span>
                <a 
                  href={mailToLink}
                  className="flex items-center space-x-1 bg-white/5 border border-white/5 hover:border-neon-primary/30 px-2.5 py-1 rounded-md hover:text-white transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-neon-primary" />
                  <span>{RESUME_DATA.basics.email}</span>
                </a>
                <a 
                  href={RESUME_DATA.basics.links.linkedin} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center space-x-1 bg-white/5 border border-white/5 hover:border-neon-secondary/30 px-2.5 py-1 rounded-md hover:text-white transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5 text-neon-secondary" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <a 
                  href={RESUME_DATA.basics.links.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center space-x-1 bg-white/5 border border-white/5 hover:border-neon-primary/30 px-2.5 py-1 rounded-md hover:text-white transition-all"
                >
                  <Github className="w-3.5 h-3.5 text-neon-primary" />
                  <span>GitHub</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              {/* ACTION CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 items-center">
                <MagneticButton
                  onClick={() => scrollToSection("experience")}
                  className="group flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-neon-primary to-neon-secondary hover:from-neon-primary hover:to-neon-secondary text-white font-semibold text-sm shadow-[0_0_15px_rgba(0,255,136,0.4)] hover:shadow-[0_0_25px_rgba(0,255,136,0.6)] transition-all cursor-pointer w-full sm:w-auto"
                >
                  <span>Explore Journey</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </MagneticButton>

                <MagneticButton
                  onClick={() => window.open('/resume.pdf', '_blank')}
                  className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl border border-white/10 hover:border-neon-secondary/50 bg-cyber-dark/60 text-white hover:text-neon-secondary font-medium text-sm transition-all cursor-pointer w-full sm:w-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </MagneticButton>

                <div className="hidden sm:flex items-center space-x-2 px-4 py-2 ml-4 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-400 font-mono select-none">
                  <Search className="w-3.5 h-3.5 opacity-50" />
                  <span>Press <kbd className="font-sans px-1.5 py-0.5 rounded-md bg-black/50 border border-white/10 mx-1">⌘</kbd> <kbd className="font-sans px-1.5 py-0.5 rounded-md bg-black/50 border border-white/10">K</kbd> to explore</span>
                </div>
              </div>

              {/* Terminal Window (Interactive Skill typing effect) */}
              <TerminalWindow />
            </div>

            {/* AVATAR IMAGE */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 shrink-0 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-primary to-neon-secondary rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse-slow"></div>
              <div className="absolute inset-0 rounded-full border-2 border-white/10 overflow-hidden glass-card shadow-2xl relative z-10">
                <img 
                  src="/avatar.jpg" 
                  alt="Avatar" 
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1531297172867-4d4ce2e266f8?q=80&w=600&auto=format&fit=crop";
                  }}
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* ==========================================
            INFINITE MARQUEE STRIP
            ========================================== */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-6 border-y border-white/5 bg-white/[0.02] backdrop-blur-md z-10 flex my-16">
          <div className="flex w-max animate-marquee space-x-12 px-12 items-center">
            {/* Repeat list twice for seamless loop */}
            {[...RESUME_DATA.skills.languages.handsOn, ...RESUME_DATA.skills.web.map(s => s.name), ...RESUME_DATA.skills.languages.handsOn, ...RESUME_DATA.skills.web.map(s => s.name)].map((skill, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="text-gray-400 font-mono text-lg tracking-wider uppercase">{skill}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-neon-secondary/50" />
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            2) THE TOP IMPACT STRIP (Visually Dominant Metrics)
            ========================================== */}
        <motion.section 
          id="impact" 
          ref={impactRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="scroll-mt-24 space-y-10"
        >
          <div className="border-l-4 border-neon-primary pl-4 space-y-2">
            <h2 className="text-xs font-mono tracking-widest text-neon-primary uppercase">Areas of Expertise</h2>
            <p className="text-3xl font-extrabold font-sans">Domain Highlights</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESUME_DATA.highlights.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="relative group p-6 rounded-2xl glass-card transition-all duration-300 hover:border-neon-primary/30 hover:glow-primary flex flex-col h-full"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-neon-primary/5 rounded-bl-full group-hover:bg-neon-primary/10 transition-colors"></div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-neon-primary w-fit mb-6">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <div className="flex-1 space-y-3">
                    <h3 className="font-bold text-xl font-sans tracking-tight text-white group-hover:text-neon-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                       <span key={tag} className="text-[10px] font-mono bg-white/5 border border-white/5 px-2 py-1 rounded text-gray-300">
                         {tag}
                       </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* ==========================================
            3) EXPERIENCE SECTION
            ========================================== */}
        <motion.section 
          id="experience" 
          ref={experienceRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="scroll-mt-24 space-y-12"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="border-l-4 border-neon-secondary pl-4 space-y-2">
              <h2 className="text-xs font-mono tracking-widest text-neon-secondary uppercase">Professional Path</h2>
              <p className="text-3xl font-extrabold font-sans">Engineering Journey</p>
            </div>
            
            <p className="text-xs font-mono text-gray-500 uppercase max-w-xs text-left md:text-right">
              Tap experience card headers to expand/collapse details and access technology tags.
            </p>
          </div>

          {/* Futuristic Timeline/Accordion */}
          <div className="space-y-6">
            {RESUME_DATA.experience.map((exp) => {
              const isOpen = expandedExps[exp.id];
              return (
                <TiltCard
                  key={exp.id}
                  className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? "border-neon-secondary/40 bg-white/3 backdrop-blur-md glow-secondary" 
                      : "border-white/5 bg-white/1 hover:border-white/20"
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => toggleExp(exp.id)}
                    className="w-full text-left p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 select-none cursor-pointer"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold font-sans tracking-tight text-white group-hover:text-neon-secondary transition-colors">
                          {exp.company}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-gray-400">
                          {exp.dates}
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-gray-300 font-mono">
                        <span className="text-neon-primary font-bold">{exp.role}</span>
                        <span className="hidden sm:inline text-gray-600">•</span>
                        <span className="flex items-center text-gray-400">
                          <MapPin className="w-3.5 h-3.5 mr-1" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 self-end md:self-center">
                      {/* Metric Badges Strip on Header */}
                      <div className="hidden sm:flex items-center space-x-2">
                        {exp.metrics.map((met, mIdx) => (
                          <div key={mIdx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-right">
                            <span className="text-gray-500 mr-1">{met.label}:</span>
                            <span className="text-neon-primary font-bold">{met.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Expand/Collapse Chevron */}
                      <div className={`p-2 rounded-lg bg-white/5 border border-white/10 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                        <ChevronDown className="w-4 h-4 text-neon-secondary" />
                      </div>
                    </div>
                  </button>

                  {/* Accordion Content Block */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[800px] opacity-100 border-t border-white/5" : "max-h-0 opacity-0 pointer-events-none"
                    } overflow-hidden`}
                  >
                    <div className="p-6 space-y-6">
                      
                      {/* Subtitles / Program Affiliation Details */}
                      {exp.subTitles.length > 0 && (
                        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-gray-400 space-y-1">
                          <span className="text-neon-secondary font-bold block uppercase tracking-wider text-[10px]">Affiliation Context:</span>
                          {exp.subTitles.map((sub, sIdx) => (
                            <p key={sIdx} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-neon-secondary rounded-full mr-2"></span>
                              {sub}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Line-by-Line Complete Bullets */}
                      <div className="space-y-4">
                        <span className="text-neon-primary font-bold font-mono text-[10px] uppercase tracking-widest block">Detailed Contributions:</span>
                        <ul className="space-y-3">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start text-sm text-gray-300 font-sans leading-relaxed">
                              <span className="text-neon-primary mr-3 mt-1.5 font-bold text-lg select-none">•</span>
                              <span className="flex-1">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Mobile Metric Strip */}
                      <div className="sm:hidden grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                        {exp.metrics.map((met, mIdx) => (
                          <div key={mIdx} className="p-2 rounded-lg bg-white/5 border border-white/5 text-center">
                            <p className="text-[9px] font-mono text-gray-500 uppercase">{met.label}</p>
                            <p className="text-xs font-mono text-neon-primary font-bold mt-0.5">{met.value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Technology Used Tags inside role */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full border border-white/5 bg-white/5 hover:border-neon-secondary/30 hover:text-white transition-all text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </motion.section>

        {/* ==========================================
            3.5) PROJECTS SECTION
            ========================================== */}
        <motion.section 
          id="projects" 
          ref={projectsRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="scroll-mt-24 space-y-12"
        >
          <div className="border-l-4 border-neon-primary pl-4 space-y-2">
            <h2 className="text-xs font-mono tracking-widest text-neon-primary uppercase">Selected Work</h2>
            <p className="text-3xl font-extrabold font-sans">Featured Projects</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {RESUME_DATA.projects.map((proj, idx) => (
              <TiltCard
                key={idx}
                className="group p-6 rounded-2xl glass-card border border-white/5 hover:border-neon-primary/30 transition-all duration-300 hover:glow-primary flex flex-col h-full relative overflow-hidden"
              >
                {/* Background glow decoration */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-primary/5 rounded-full blur-2xl group-hover:bg-neon-primary/10 transition-all pointer-events-none"></div>
                
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-neon-primary/10 text-neon-primary">
                      <Code className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-white group-hover:text-neon-primary transition-colors relative z-10 font-sans">
                        {proj.title}
                      </h3>
                      <p className="text-xs font-mono text-gray-500">{proj.dates}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {proj.links && proj.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target={link.url.startsWith("http") ? "_blank" : undefined}
                        rel={link.url.startsWith("http") ? "noreferrer" : undefined}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title={link.label}
                      >
                        {link.label.includes("LinkedIn") ? <Linkedin className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="text-sm text-gray-400 mb-6 flex-grow leading-relaxed font-sans font-light relative z-10 space-y-3">
                  {proj.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start">
                      <span className="text-neon-primary mr-3 mt-1 font-bold select-none">•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-auto relative z-10 border-t border-white/5 pt-4">
                  {proj.stack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono text-gray-300 px-2 py-1 rounded border border-white/10 bg-white/5 group-hover:border-neon-primary/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="pt-4 mt-2 relative z-10">
                  <button 
                    onClick={() => setSelectedProject(proj)}
                    className="w-full py-2.5 rounded-xl bg-neon-primary/10 text-neon-primary border border-neon-primary/20 hover:bg-neon-primary hover:text-white transition-all font-semibold text-sm"
                  >
                    View Details
                  </button>
                </div>
              </TiltCard>
            ))}
          </div>
        </motion.section>

        {/* ==========================================
            4) SKILLS MATRIX SECTION
            ========================================== */}
        <motion.section 
          id="skills" 
          ref={skillsRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="scroll-mt-24 space-y-12 relative"
        >
          {/* Background Orbit Animation */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none overflow-hidden z-0 scale-[1.5] md:scale-[2]">
            <SkillOrbit />
          </div>

          <div className="border-l-4 border-neon-primary pl-4 space-y-2 relative z-10">
            <h2 className="text-xs font-mono tracking-widest text-neon-primary uppercase">Core Competencies</h2>
            <p className="text-3xl font-extrabold font-sans">Skills Inventory</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start relative z-10">
            
            {/* Web Technologies Card */}
            <div className="p-6 rounded-2xl glass-card border border-white/5 hover:border-white/20 transition-all space-y-6 bg-cyber-dark/60 backdrop-blur-md">
              <div className="flex items-center space-x-3 border-b border-white/5 pb-4">
                <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg font-sans">Frontend & Data</h3>
                  <p className="text-xs font-mono text-gray-500">Stack & Dashboards</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {RESUME_DATA.skills.web.map((sk) => (
                  <span
                    key={sk.name}
                    className="text-xs px-3 py-1.5 rounded-xl border border-white/5 bg-white/5 text-gray-300 font-mono hover:border-neon-secondary/30 hover:text-white transition-all cursor-default"
                  >
                    {sk.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Methodologies and Interpersonal */}
            <div className="p-6 rounded-2xl glass-card border border-white/5 hover:border-white/20 transition-all space-y-6 bg-cyber-dark/60 backdrop-blur-md">
              <div className="flex items-center space-x-3 border-b border-white/5 pb-4">
                <div className="p-2 rounded-lg bg-neon-secondary/10 border border-neon-secondary/20 text-neon-secondary">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg font-sans">Methodologies</h3>
                  <p className="text-xs font-mono text-gray-500">Solving & Collaborating</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {RESUME_DATA.skills.interpersonal.map((sk) => (
                  <span
                    key={sk.name}
                    className="text-xs px-3 py-1.5 rounded-xl border border-white/5 bg-white/5 text-gray-300 font-mono hover:border-neon-primary/30 hover:text-white transition-all cursor-default"
                  >
                    {sk.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Developer Tools */}
            <div className="p-6 rounded-2xl glass-card border border-white/5 hover:border-white/20 transition-all space-y-6 bg-cyber-dark/60 backdrop-blur-md">
              <div className="flex items-center space-x-3 border-b border-white/5 pb-4">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg font-sans">Developer Tools</h3>
                  <p className="text-xs font-mono text-gray-500">IDEs & Version Control</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {RESUME_DATA.skills.tools.map((sk) => (
                  <span
                    key={sk.name}
                    className="text-xs px-3 py-1.5 rounded-xl border border-white/5 bg-white/5 text-gray-300 font-mono hover:border-emerald-500/30 hover:text-white transition-all cursor-default"
                  >
                    {sk.name}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.section>

        {/* ==========================================
            5) EDUCATION & CERTIFICATIONS SECTION
            ========================================== */}
        <motion.section 
          id="education-certs" 
          ref={eduCertsRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="scroll-mt-24 space-y-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Education timeline cards (8 columns of width on big screens) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="border-l-4 border-neon-secondary pl-4 space-y-2">
                <h2 className="text-xs font-mono tracking-widest text-neon-secondary uppercase">Academic History</h2>
                <p className="text-3xl font-extrabold font-sans">Education</p>
              </div>

              <div className="space-y-6 relative border-l border-white/10 pl-6 ml-2">
                {RESUME_DATA.education.map((edu, idx) => (
                  <div key={idx} className="relative group space-y-2">
                    
                    {/* Timeline Node Icon/Dot */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border border-neon-secondary bg-cyber-dark z-10 group-hover:bg-neon-secondary transition-all glow-secondary"></div>

                    <div className="p-5 rounded-xl border border-white/5 bg-white/2 hover:border-neon-secondary/20 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h3 className="font-extrabold text-base font-sans text-white group-hover:text-neon-secondary transition-colors">
                          {edu.institution}
                        </h3>
                        <span className="text-[11px] font-mono text-gray-500 font-semibold bg-white/5 px-2 py-0.5 rounded-md self-start sm:self-center">
                          {edu.dates}
                        </span>
                      </div>

                      <p className="text-sm font-mono text-gray-300 mt-1 flex items-center">
                        <BookOpen className="w-3.5 h-3.5 text-neon-primary mr-1.5" />
                        {edu.degree}
                      </p>

                      {"status" in edu && (
                        <span className="inline-block mt-3 text-[10px] font-mono uppercase bg-neon-primary/10 border border-neon-primary/20 text-neon-primary px-2.5 py-0.5 rounded-full font-bold">
                          {edu.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications stacked list (5 columns of width on big screens) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="border-l-4 border-neon-primary pl-4 space-y-2">
                <h2 className="text-xs font-mono tracking-widest text-neon-primary uppercase">Verified Skills</h2>
                <p className="text-3xl font-extrabold font-sans">Certifications</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {RESUME_DATA.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="group p-4 rounded-xl border border-white/5 bg-white/1 hover:border-neon-primary/30 hover:bg-white/3 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="p-2 rounded-lg bg-neon-primary/10 border border-neon-primary/20 text-neon-primary">
                        <Award className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold font-sans text-gray-200 group-hover:text-white transition-colors">
                        {cert.title}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-semibold bg-white/5 px-2 py-1 rounded-md">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.section>

        {/* ==========================================
            6) CONNECT SECTION
            ========================================== */}
        <motion.section 
          id="contact" 
          ref={contactRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="scroll-mt-24 space-y-12"
        >
          <div className="border-l-4 border-neon-secondary pl-4 space-y-2">
            <h2 className="text-xs font-mono tracking-widest text-neon-secondary uppercase">Let's Work Together</h2>
            <p className="text-3xl font-extrabold font-sans">Connect With Me</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-6 mb-6">
                <div className="relative w-24 h-24 shrink-0 group">
                  <div className="absolute inset-0 bg-neon-secondary/20 rounded-full blur-md group-hover:bg-neon-secondary/40 transition-colors"></div>
                  <img 
                    src="/profile.jpg" 
                    alt="Profile" 
                    className="relative w-full h-full object-cover rounded-full border border-white/10"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop";
                    }}
                  />
                </div>
                <p className="text-gray-300 font-sans leading-relaxed text-lg text-center sm:text-left">
                  I'm currently available for internships, co-op roles, and new opportunities. 
                  Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
                </p>
              </div>
              
              <div className="space-y-4 pt-4">
                <a 
                  href={mailToLink}
                  className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-white/5 hover:border-neon-primary/30 transition-all group"
                >
                  <div className="p-3 rounded-lg bg-neon-primary/10 text-neon-primary group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-neon-primary transition-colors">Email</h3>
                    <p className="text-sm font-mono text-gray-400">{RESUME_DATA.basics.email}</p>
                  </div>
                </a>

                <a 
                  href={RESUME_DATA.basics.links.linkedin} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-white/5 hover:border-neon-secondary/30 transition-all group"
                >
                  <div className="p-3 rounded-lg bg-neon-secondary/10 text-neon-secondary group-hover:scale-110 transition-transform">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-neon-secondary transition-colors">LinkedIn</h3>
                    <p className="text-sm font-mono text-gray-400">Connect professionally</p>
                  </div>
                </a>

                <a 
                  href={RESUME_DATA.basics.links.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-white/5 hover:border-neon-primary/30 transition-all group"
                >
                  <div className="p-3 rounded-lg bg-neon-primary/10 text-neon-primary group-hover:scale-110 transition-transform">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-neon-primary transition-colors">GitHub</h3>
                    <p className="text-sm font-mono text-gray-400">View source code & projects</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-2xl glass-card border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-secondary/5 rounded-bl-full pointer-events-none"></div>
              
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="text-gray-400 text-sm max-w-xs">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 px-6 py-2 rounded-full border border-white/10 hover:border-white/30 text-xs font-mono text-white transition-all cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5 relative z-10">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-mono text-gray-400 uppercase tracking-wider ml-1">Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 focus:border-neon-secondary/50 focus:ring-1 focus:ring-neon-secondary/50 text-white placeholder-gray-600 outline-none transition-all font-sans"
                      placeholder="Jane Doe"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-mono text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 focus:border-neon-secondary/50 focus:ring-1 focus:ring-neon-secondary/50 text-white placeholder-gray-600 outline-none transition-all font-sans"
                      placeholder="jane@example.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-mono text-gray-400 uppercase tracking-wider ml-1">Message</label>
                    <textarea 
                      id="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 focus:border-neon-secondary/50 focus:ring-1 focus:ring-neon-secondary/50 text-white placeholder-gray-600 outline-none transition-all font-sans resize-none"
                      placeholder="How can I help you?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer w-full group flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-neon-secondary to-neon-primary hover:from-violet-600 hover:to-neon-primary text-white font-semibold text-sm shadow-lg hover:shadow-neon-secondary/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.section>

        {/* ==========================================
            7) COMPREHENSIVE FOOTER
            ========================================== */}
        <footer className="pt-12 border-t border-white/5 text-center space-y-6">
          <div className="max-w-md mx-auto space-y-3">
            <p className="text-xl font-extrabold font-sans text-transparent bg-clip-text bg-gradient-to-r from-neon-primary to-neon-secondary">
              {RESUME_DATA.basics.name}
            </p>
            <p className="text-sm text-gray-400 font-sans font-light">
              {RESUME_DATA.basics.title}
            </p>
          </div>

          <div className="flex justify-center space-x-4 text-xs font-mono">
            <span className="text-gray-600">{RESUME_DATA.basics.name} © {new Date().getFullYear()}</span>
          </div>
        </footer>

      </main>

      {/* ==========================================
          7) COMPREHENSIVE DOWNLOAD/PRINT RESUME MODAL
          ========================================== */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center items-start py-8 px-4 font-sans print:p-0 print:bg-white print:backdrop-filter-none">
          
          <div className="relative w-full max-w-4xl bg-cyber-dark border border-white/10 rounded-2xl p-6 md:p-8 space-y-8 print:border-none print:bg-white print:text-black print:rounded-none shadow-2xl overflow-hidden">
            
            {/* Background mesh element in preview */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-primary via-violet-500 to-neon-secondary print:hidden"></div>

            {/* Modal Controls (Hidden in actual print) */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 print:hidden">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-neon-secondary" />
                <span className="font-extrabold text-sm tracking-wide font-sans">PRINT-READY RESUME PREVIEW</span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePrint}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-neon-secondary text-white hover:bg-violet-600 text-xs font-semibold cursor-pointer transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>

                <button
                  onClick={() => setShowPrintModal(false)}
                  className="p-2 rounded-xl border border-white/5 bg-white/5 text-gray-400 hover:text-white cursor-pointer transition-all"
                  title="Close resume"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Print Help Tip */}
            <p className="text-[11px] font-mono text-gray-400 bg-white/5 p-3 rounded-lg print:hidden">
              💡 <strong>Tip:</strong> Clicking "Print / Save PDF" opens your browser's print dialog. Choose <strong>"Save as PDF"</strong> as your destination, enable <strong>"Background graphics"</strong>, and set margins to <strong>"Default"</strong> or <strong>"None"</strong> to download a beautiful PDF file of Saharsh's resume.
            </p>

            {/* =======================================================
                ACTUAL PRINT CONTAINER (Optimized for standard A4 layout)
                ======================================================= */}
            <div className="text-white space-y-6 print:text-black print:space-y-5 print:font-sans font-sans">
              
              {/* Header Box */}
              <div className="border-b-2 border-white/10 pb-4 print:border-black/20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
                  <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white print:text-black font-sans">
                      {RESUME_DATA.basics.name}
                    </h1>
                    <p className="text-xs font-mono text-neon-primary print:text-sky-800 font-bold max-w-2xl">
                      {RESUME_DATA.basics.title}
                    </p>
                  </div>

                  {/* Print contact specs */}
                  <div className="text-left md:text-right text-xs font-mono text-gray-400 print:text-black space-y-1">
                    <p className="flex md:justify-end items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-neon-primary print:text-black" />
                      <span>{RESUME_DATA.basics.location}</span>
                    </p>
                    <p className="flex md:justify-end items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-neon-primary print:text-black" />
                      <span>{RESUME_DATA.basics.email}</span>
                    </p>
                    <p className="flex md:justify-end items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-neon-secondary print:text-black" />
                      <span>{RESUME_DATA.basics.links.linkedin}</span>
                    </p>
                    <p className="flex md:justify-end items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-neon-primary print:text-black" />
                      <span>{RESUME_DATA.basics.links.github}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Summary Block */}
              <div className="space-y-1.5">
                <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-neon-primary print:text-black font-extrabold">
                  Professional Summary
                </h2>
                <p className="text-sm text-gray-300 print:text-black/85 leading-relaxed font-sans font-light">
                  {RESUME_DATA.basics.summary}
                </p>
              </div>

              {/* Skills block */}
              <div className="space-y-2">
                <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-neon-primary print:text-black font-extrabold">
                  Skills Profile
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
                  <div className="md:col-span-3 font-bold font-mono text-gray-400 print:text-black">Top Core Skills:</div>
                  <div className="md:col-span-9 text-gray-300 print:text-black flex flex-wrap gap-1.5">
                    {RESUME_DATA.skills.languages.handsOn.join(", ")}, {RESUME_DATA.skills.languages.familiar.join(", ")}
                  </div>
                  
                  <div className="md:col-span-3 font-bold font-mono text-gray-400 print:text-black">Web & Data:</div>
                  <div className="md:col-span-9 text-gray-300 print:text-black flex flex-wrap gap-1.5">
                    {RESUME_DATA.skills.web.map(w => w.name).join(", ")}
                  </div>

                  <div className="md:col-span-3 font-bold font-mono text-gray-400 print:text-black">Interpersonal & Process:</div>
                  <div className="md:col-span-9 text-gray-300 print:text-black flex flex-wrap gap-1.5">
                    {RESUME_DATA.skills.interpersonal.map(i => i.name).join(", ")}
                  </div>
                </div>
              </div>

              {/* Experience layout */}
              <div className="space-y-4">
                <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-neon-primary print:text-black font-extrabold">
                  Professional Experience
                </h2>

                <div className="space-y-5">
                  {RESUME_DATA.experience.map((exp, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-start font-sans">
                        <div>
                          <h3 className="font-bold text-base text-white print:text-black leading-tight">
                            {exp.company}
                          </h3>
                          <p className="text-xs font-mono text-neon-secondary print:text-violet-900 font-semibold mt-0.5">
                            {exp.role}
                          </p>
                        </div>
                        <div className="text-right text-xs font-mono text-gray-400 print:text-black">
                          <p>{exp.dates}</p>
                          <p className="text-[11px]">{exp.location}</p>
                        </div>
                      </div>

                      {/* Display sub titles / affiliations context */}
                      {exp.subTitles.length > 0 && (
                        <div className="text-[11px] font-mono text-gray-400 print:text-black/70 pl-2 border-l border-white/15 print:border-black/20">
                          {exp.subTitles.map((sub, sIdx) => <p key={sIdx}>{sub}</p>)}
                        </div>
                      )}

                      {/* Bullets */}
                      <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-gray-300 print:text-black/90">
                        {exp.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education section */}
              <div className="space-y-3">
                <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-neon-primary print:text-black font-extrabold">
                  Education Background
                </h2>
                
                <div className="space-y-3">
                  {RESUME_DATA.education.map((edu, idx) => (
                    <div key={idx} className="flex justify-between items-start text-xs font-sans">
                      <div>
                        <h3 className="font-bold text-white print:text-black">{edu.institution}</h3>
                        <p className="text-gray-300 print:text-black/80">{edu.degree}</p>
                      </div>
                      <span className="font-mono text-gray-400 print:text-black">{edu.dates}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications and top skills section */}
              <div className="space-y-2">
                <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-neon-primary print:text-black font-extrabold">
                  Certifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300 print:text-black">
                  {RESUME_DATA.certifications.map((c, idx) => (
                    <p key={idx} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-neon-primary print:bg-black rounded-full mr-2"></span>
                      <span>{c.title}</span>
                    </p>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer Controls (Hidden on print) */}
            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs font-mono text-gray-500 print:hidden">
              <span>Saharsh Srivastava CV Layout</span>
              <button
                onClick={handlePrint}
                className="flex items-center justify-center space-x-1 px-4 py-2 rounded-xl bg-neon-primary/20 hover:bg-neon-primary/30 text-neon-primary border border-neon-primary/30 cursor-pointer transition-all self-start sm:self-auto"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Open printer dialog</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </motion.div>
    )}
    </AnimatePresence>
  );
}
