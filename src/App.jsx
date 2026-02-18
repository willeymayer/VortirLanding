import React, { useState } from "react";
import { motion } from "framer-motion"; // Make sure to npm install framer-motion
import {
  MapPin,
  Zap,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
  Sun,
  Home,
  MessageSquare,
  CheckCircle2,
  Layers,
  Cpu,
  Search,
  Menu,
  X,
} from "lucide-react";

// --- UI Components (From your snippet) ---

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 text-base font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-zinc-900 text-white hover:bg-zinc-800 focus:ring-zinc-900 shadow-lg hover:shadow-xl",
    secondary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600 shadow-md hover:shadow-lg",
    outline:
      "border-2 border-zinc-200 text-zinc-900 hover:border-zinc-900 hover:bg-zinc-50 focus:ring-zinc-900",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Section = ({ children, className = "", id = "" }) => (
  <section
    id={id}
    className={`py-20 md:py-32 px-6 md:px-8 max-w-7xl mx-auto ${className}`}
  >
    {children}
  </section>
);

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-200 rounded-lg bg-white overflow-hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between font-medium hover:bg-zinc-50 transition-colors"
      >
        {question}
        {isOpen ? (
          <ChevronUp size={18} className="text-zinc-400" />
        ) : (
          <ChevronDown size={18} className="text-zinc-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-zinc-500 text-sm leading-relaxed border-t border-zinc-100 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
};

// --- Main Application ---

export default function App() {
  const [industry, setIndustry] = useState("solar");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return;

    try {
      const res = await fetch("https://formspree.io/f/mojnljpz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          industry_interest: industry, // Sending the selected industry too
          source: "vortir.com",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setIsSubmitted(true);
      setEmail("");
    } catch (err) {
      alert("Could not submit. Please try again.");
    }
  };

  // Content Switching Logic
  const activeContent = {
    solar: {
      heroTitle: "Start Scanning Your Own.",
      heroSub:
        "Vortir identifies homeowners with high solar potential, verifies electric bills, and books appointments.",
      cardTitle: "4102 Bennett Ave",
      cardBadge: "HIGH SUN SCORE",
      cardDetail: "Detected: South-Facing Roof • >$200/mo Bill",
      aiMessage:
        "Hi Sarah, our satellite scan shows your roof is perfect for the 2026 Tax Credit. Open to seeing the report?",
      step1Title: "Scan Rooftops",
      step1Desc:
        "Enter a Zip Code. We analyze roof azimuth, shading, and local utility rates to find qualified homes.",
      color: "blue",
    },
    realEstate: {
      heroTitle: "Find The Sellers Zillow Missed.",
      heroSub:
        "Vortir monitors divorce filings, probate, and tax liens to find motivated off-market sellers before they list.",
      cardTitle: "1805 West 35th St",
      cardBadge: "DISTRESSED OWNER",
      cardDetail: "Detected: Out-of-State Owner • Divorce Filing",
      aiMessage:
        "Hi John, I saw the property at 1805 West is off-market. I have a buyer looking in that specific area. Are you the owner?",
      step1Title: "Track Life Events",
      step1Desc:
        "Enter a Zip Code. We scan county records for the '4 Ds': Divorce, Debt, Death, and Departure.",
      color: "indigo",
    },
  }[industry];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-blue-100">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/VORTIR.png"
              alt="Vortir Technologies"
              className="h-10 lg:h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-600 items-center">
            <button onClick={() => document.getElementById('data-engine').scrollIntoView({behavior:'smooth'})} className="hover:text-black transition-colors">
              The Engine
            </button>
            <button onClick={() => document.getElementById('how-it-works').scrollIntoView({behavior:'smooth'})} className="hover:text-black transition-colors">
              How it works
            </button>
            <button onClick={() => document.getElementById('faq').scrollIntoView({behavior:'smooth'})} className="hover:text-black transition-colors">
              FAQ
            </button>
          </div>

          {/* CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Button variant="primary" onClick={scrollToWaitlist} className="hidden md:inline-flex py-2 px-4 text-sm">
              Get Access
            </Button>
            <button
              className="md:hidden text-zinc-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-white border-b border-zinc-100 p-4 flex flex-col gap-4 shadow-xl">
            <button onClick={() => {document.getElementById('data-engine').scrollIntoView(); setIsMenuOpen(false)}} className="text-left font-medium">The Engine</button>
            <button onClick={() => {document.getElementById('how-it-works').scrollIntoView(); setIsMenuOpen(false)}} className="text-left font-medium">How it works</button>
            <Button onClick={scrollToWaitlist} className="w-full">Get Access</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <Section className="text-center pt-20 pb-12">
        <FadeIn>
          <div className="inline-flex items-center gap-2 bg-zinc-50 text-zinc-600 px-3 py-1 rounded-full text-xs font-semibold mb-8 border border-zinc-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Vortir Intelligence Engine v2.0
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Property Intelligence for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Automated Growth.
            </span>
          </h1>

          {/* Industry Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-zinc-100 p-1 rounded-lg inline-flex relative">
              <button
                onClick={() => setIndustry("solar")}
                className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
                  industry === "solar"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                Solar Installers
              </button>
              <button
                onClick={() => setIndustry("realEstate")}
                className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
                  industry === "realEstate"
                    ? "bg-white shadow-sm text-indigo-600"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                Real Estate Agents
              </button>
            </div>
          </div>

          <p className="text-xl text-zinc-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop buying shared leads.{" "}
            <strong className="text-zinc-900">
              {activeContent.heroTitle}
            </strong>{" "}
            {activeContent.heroSub}
          </p>

          <div className="flex justify-center gap-4">
            <Button onClick={scrollToWaitlist} variant="secondary" className="w-full sm:w-auto">
              Start Free Scan
            </Button>
            <Button onClick={() => document.getElementById('how-it-works').scrollIntoView({behavior:'smooth'})} variant="outline" className="hidden sm:inline-flex">
              How it works
            </Button>
          </div>
        </FadeIn>
      </Section>

      {/* Dashboard Visual */}
      <div className="px-4 mb-32">
        <FadeIn delay={0.2}>
          <div className="max-w-5xl mx-auto bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden relative border border-zinc-800 ring-4 ring-zinc-900/5">
            {/* Mock Header */}
            <div className="bg-zinc-800/50 px-4 py-3 flex items-center gap-2 border-b border-zinc-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="ml-auto text-xs text-zinc-500 font-mono">
                dashboard.vortir.com
              </div>
            </div>

            <div className="flex flex-col md:flex-row h-[500px]">
              {/* Sidebar */}
              <div className="hidden md:flex w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex-col gap-8">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3 block">
                    Active Target
                  </label>
                  <div className="bg-zinc-800 rounded p-3 flex items-center gap-3 border border-zinc-700">
                    <MapPin size={16} className="text-blue-400" />
                    <span className="text-zinc-200 text-sm font-medium">
                      78701 (Austin)
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3 block">
                    Filters
                  </label>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-zinc-400">
                      <span>Score</span>
                      <span className="text-green-400 font-mono">98/100</span>
                    </div>
                    <div className="flex justify-between text-sm text-zinc-400">
                      <span>Status</span>
                      <span className="text-blue-400 font-mono">Verified</span>
                    </div>
                    <div className="h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Map Area */}
              <div className="flex-1 bg-zinc-950 relative overflow-hidden flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(#4b5563 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                ></div>

                {/* Dynamic Floating Card */}
                <div className="relative z-10 w-full max-w-md mx-6">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl shadow-2xl text-white">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-lg ${
                            industry === "solar"
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-indigo-500/20 text-indigo-300"
                          }`}
                        >
                          {industry === "solar" ? (
                            <Sun size={24} />
                          ) : (
                            <Home size={24} />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">
                            {activeContent.cardTitle}
                          </h3>
                          <p className="text-sm text-zinc-400">
                            {activeContent.cardDetail}
                          </p>
                        </div>
                      </div>
                      <span className="bg-green-500/20 text-green-300 text-[10px] font-bold px-2 py-1 rounded border border-green-500/30">
                        {activeContent.cardBadge}
                      </span>
                    </div>

                    <div className="bg-black/40 rounded-lg p-4 border border-white/5 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-zinc-400">
                          Vortir Agent (AI)
                        </span>
                      </div>
                      <p className="text-sm text-zinc-300 italic font-light">
                        "{activeContent.aiMessage}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* The Data Engine */}
      <Section id="data-engine" className="bg-zinc-50 border-y border-zinc-200">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Data Engine
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            We don't just "find leads." We stack three layers of proprietary
            data to identify <strong>intent</strong>.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Layers,
              title: "Physical Intelligence",
              desc: "Satellite imagery & computer vision analyze roof size, shading, and condition.",
              color: "text-blue-600",
              bg: "bg-blue-100",
            },
            {
              icon: Cpu,
              title: "Financial Situational",
              desc: "We cross-reference properties with utility rates, tax liens, and equity data.",
              color: "text-indigo-600",
              bg: "bg-indigo-100",
            },
            {
              icon: Search,
              title: "Identity Resolution",
              desc: "Waterfall skip-tracing to find verified mobile numbers with 85%+ connectivity.",
              color: "text-purple-600",
              bg: "bg-purple-100",
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm h-full">
                <div
                  className={`w-12 h-12 ${item.bg} rounded-lg flex items-center justify-center mb-6 ${item.color}`}
                >
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Workflow Automation
            </h2>
            <p className="text-zinc-500">
              How Vortir puts your outreach on autopilot.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-zinc-100 -z-10"></div>

          {[
            {
              step: 1,
              title: activeContent.step1Title,
              desc: activeContent.step1Desc,
            },
            {
              step: 2,
              title: "AI Engagement",
              desc: "Vortir's AI Agent reaches out instantly via SMS or Voice. It sounds human and qualifies the homeowner.",
            },
            {
              step: 3,
              title: "Verified Handoff",
              desc: "You don't chase leads. You only receive notifications when a homeowner says 'Yes' or books a time.",
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.2}>
              <div className="bg-white p-6 relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg mb-6 shadow-lg ${
                    industry === "solar" ? "bg-blue-600" : "bg-indigo-600"
                  }`}
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="max-w-3xl">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          <FAQItem
            question="Where does the data come from?"
            answer="We aggregate data from Project Sunroof (Google), county tax records, and premium skip-tracing APIs to ensure you only target qualified homeowners."
          />
          <FAQItem
            question="Is the AI compliant with TCPA?"
            answer="Yes. Vortir includes built-in DNC (Do Not Call) scrubbing and follows strict litigator scrub protocols to keep your outreach safe."
          />
          <FAQItem
            question="Can I customize the script?"
            answer="Absolutely. You can adjust the AI's personality, offer, and qualifying questions to match your specific sales process."
          />
        </div>
      </Section>

      {/* Waitlist / Form Section */}
      <Section id="waitlist" className="bg-zinc-900 text-white text-center rounded-3xl my-12 mx-4 md:mx-8">
        <div className="max-w-4xl mx-auto py-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Stop guessing. <br /> Start{" "}
            <span className="text-blue-500">knowing.</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
            Join the only platform that combines satellite data, financial
            records, and AI outreach into one engine.
          </p>

          <div className="max-w-md mx-auto">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 text-green-300 p-6 rounded-xl flex flex-col items-center gap-2 border border-green-500/30"
              >
                <CheckCircle2 size={32} />
                <span className="font-bold text-lg">You're on the list!</span>
                <p className="text-sm opacity-80">We'll be in touch shortly.</p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center gap-3"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full sm:w-auto whitespace-nowrap"
                >
                  Join Waitlist
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-zinc-100 text-center text-zinc-400 text-sm">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-70 hover:opacity-100 transition-opacity">
          <img
            src="/VORTIR_ORB.png"
            alt="Vortir"
            className="h-6 w-auto grayscale"
          />
        </div>
        <p>&copy; 2026 Vortir Technologies Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};