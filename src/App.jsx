import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Calendar,
  ArrowRight,
  Zap,
  Clock,
  ShieldCheck,
  Users,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";

// --- Components ---

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
    <div className="border border-zinc-200 rounded-lg bg-white overflow-hidden">
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

// --- Main Page ---

export default function App() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail) return;

  try {
    const res = await fetch("https://formspree.io/f/mojnljpz", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email: cleanEmail,
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


  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tight">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white">
              <Zap size={18} fill="currentColor" />
            </div>
            Vortir
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <a
              href="#how-it-works"
              className="hover:text-zinc-900 transition-colors"
            >
              How it works
            </a>
            <a
              href="#benefits"
              className="hover:text-zinc-900 transition-colors"
            >
              Benefits
            </a>
            <a href="#faq" className="hover:text-zinc-900 transition-colors">
              FAQ
            </a>
            <Button
              variant="primary"
              onClick={scrollToWaitlist}
              className="py-2 px-4 text-sm"
            >
              Join Waitlist
            </Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-zinc-100 p-6 flex flex-col gap-4 shadow-xl">
            <a
              href="#how-it-works"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-medium"
            >
              How it works
            </a>
            <a
              href="#benefits"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-medium"
            >
              Benefits
            </a>
            <a
              href="#faq"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-medium"
            >
              FAQ
            </a>
            <Button
              onClick={() => {
                setIsMenuOpen(false);
                scrollToWaitlist();
              }}
              className="w-full"
            >
              Join Waitlist
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 max-w-5xl mx-auto text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            Accepting early access users
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-zinc-900">
            Turn new leads into <br className="hidden md:block" />
            <span className="text-zinc-400">booked appointments.</span> <br />
            <span className="text-blue-600">Automatically.</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Stop chasing leads manually. Vortir sends personalized emails instantly
            and follows up until they book a time.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
            {[
              "Instant personalized emails",
              "Auto follow-ups",
              "Book directly on calendar",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2 text-zinc-700 font-medium">
                <CheckCircle2 className="text-blue-600" size={20} />
                <span>{t}</span>
              </div>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg border border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="whitespace-nowrap">
                    Join Waitlist
                  </Button>
                </div>
                <p className="text-xs text-zinc-400">
                  No spam. Early users get priority access + founder pricing.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 text-green-800 p-4 rounded-lg border border-green-100 flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={20} />
                <span className="font-medium">
                  You're on the list! We'll be in touch soon.
                </span>
              </motion.div>
            )}
          </div>
        </FadeIn>
      </div>

      {/* Dashboard Preview */}
      <div className="px-4 md:px-8 max-w-6xl mx-auto mb-32">
        <FadeIn delay={0.2}>
          <div className="relative rounded-2xl border border-zinc-200 bg-zinc-50/50 p-2 md:p-4 shadow-2xl shadow-zinc-200/50 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden min-h-[400px] md:min-h-[600px] flex">
              {/* Sidebar */}
              <div className="w-64 border-r border-zinc-100 hidden md:flex flex-col bg-zinc-50/30">
                <div className="p-4 border-b border-zinc-100 font-semibold text-sm text-zinc-500">
                  Leads
                </div>
                <div className="p-2 space-y-1">
                  {[
                    { name: "Sarah Miller", status: "New", time: "2m ago" },
                    { name: "Tech Corp Inc", status: "Replied", time: "1h ago" },
                    { name: "David Chen", status: "Booked", time: "3h ago" },
                    { name: "Studio Design", status: "Contacted", time: "5h ago" },
                  ].map((lead, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg flex items-center justify-between text-sm ${
                        i === 0
                          ? "bg-white shadow-sm border border-zinc-100"
                          : "hover:bg-zinc-100/50"
                      }`}
                    >
                      <div>
                        <div className="font-medium text-zinc-900">{lead.name}</div>
                        <div className="text-xs text-zinc-400">{lead.time}</div>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          lead.status === "New"
                            ? "bg-blue-100 text-blue-700"
                            : lead.status === "Booked"
                            ? "bg-green-100 text-green-700"
                            : lead.status === "Replied"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-zinc-100 text-zinc-600"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main */}
              <div className="flex-1 flex flex-col">
                <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-white">
                  <div>
                    <h3 className="font-semibold text-lg">Sarah Miller</h3>
                    <p className="text-sm text-zinc-500">
                      Inquiry: \"Interested in your enterprise plan...\"
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm font-medium text-zinc-600 hover:bg-zinc-50 rounded-md border border-zinc-200">
                      Edit
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm flex items-center gap-1">
                      <Zap size={14} /> Approve & Send
                    </button>
                  </div>
                </div>

                <div className="p-8 bg-zinc-50/30 flex-1">
                  <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6 max-w-2xl mx-auto">
                    <div className="flex items-center gap-3 mb-4 border-b border-zinc-50 pb-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                        AI
                      </div>
                      <div>
                        <div className="text-sm font-medium text-zinc-900">
                          Draft to Sarah
                        </div>
                        <div className="text-xs text-zinc-400">
                          Generated instantly based on inquiry
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 text-zinc-600 text-sm leading-relaxed">
                      <p>Hi Sarah,</p>
                      <p>
                        Thanks for reaching out about the enterprise plan. I'd love
                        to show you how we can help your team scale efficiently.
                      </p>
                      <p>
                        Are you free for a quick 15-min chat this Tuesday or
                        Wednesday?
                      </p>
                      <p>
                        Best,<br />
                        Alex
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* end */} 
            </div>
          </div>
        </FadeIn>
      </div>

      {/* How it Works */}
      <Section id="how-it-works" className="bg-zinc-50 rounded-3xl my-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How it works</h2>
          <p className="text-lg text-zinc-500">
            Three simple steps to automate your sales follow-up.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: <Users className="text-blue-600" size={32} />,
              title: "1. Import leads",
              desc: "Connect your forms or upload a CSV. Vortir detects new leads instantly.",
            },
            {
              icon: <Zap className="text-blue-600" size={32} />,
              title: "2. AI writes & sends",
              desc: "Vortir crafts personalized emails and sends them within seconds of the lead arriving.",
            },
            {
              icon: <Calendar className="text-blue-600" size={32} />,
              title: "3. You get booked",
              desc: "Leads reply or book directly on your calendar. Vortir handles the follow-up.",
            },
          ].map((step, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{step.desc}</p>
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
        <div className="space-y-4">
          {[
            {
              q: "Will this sound like a robot?",
              a: "No. Vortir uses your tone rules and examples to write natural emails.",
            },
            {
              q: "Do I need a CRM?",
              a: "No. Start with CSV or form integrations. Add a CRM later if needed.",
            },
            {
              q: "Can I review emails before they send?",
              a: "Yes. Use approve-first, or automate follow-ups once you’re confident.",
            },
            {
              q: "Will this hurt my deliverability?",
              a: "We prioritize inbox health with pacing, stop-on-reply, and clean unsubscribe handling.",
            },
            {
              q: "How long does setup take?",
              a: "About 5–10 minutes for most users.",
            },
            {
              q: "When do I get access?",
              a: "We’re rolling out access in batches. Join the waitlist for priority access.",
            },
          ].map((item, i) => (
            <FAQItem key={i} question={item.q} answer={item.a} />
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <div
        id="waitlist"
        className="py-32 px-6 bg-zinc-50 border-t border-zinc-100 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Get early access + <br />
            <span className="text-blue-600">founder pricing.</span>
          </h2>
          <p className="text-xl text-zinc-500 mb-10">
            Join the waitlist to secure your spot.
          </p>

          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto flex flex-col gap-3"
            >
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition-all bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="whitespace-nowrap w-full md:w-auto"
                >
                  Join Waitlist
                </Button>
              </div>
              <p className="text-xs text-zinc-400">
                We’ll only email product updates. No spam.
              </p>
            </form>
          ) : (
            <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-100 inline-flex items-center gap-3">
              <CheckCircle2 size={24} />
              <span className="font-medium text-lg">
                You're on the list! Talk soon.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-100 text-center text-zinc-400 text-sm">
        <div className="flex items-center justify-center gap-2 font-bold text-zinc-900 mb-4">
          <Zap size={16} fill="currentColor" />
          Vortir
        </div>
        <p>&copy; {new Date().getFullYear()} Vortir. All rights reserved.</p>
      </footer>
    </div>
  );
}
