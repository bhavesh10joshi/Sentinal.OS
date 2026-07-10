import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;
      if (window.scrollY > 50) {
        nav.classList.add("shadow-md", "bg-white/90");
        nav.classList.remove("bg-white/70");
      } else {
        nav.classList.remove("shadow-md", "bg-white/90");
        nav.classList.add("bg-white/70");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    document.querySelectorAll(".glass-card").forEach((card) => {
      const el = card as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* TopAppBar */}
      <nav
        ref={navRef}
        className="bg-white/70 backdrop-blur-xl border-b border-black/5 shadow-sm sticky top-0 z-50 transition-all duration-300"
      >
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <span
                className="material-symbols-outlined text-white text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                security
              </span>
            </div>
            <span className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">
              Sentinal.OS
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a className="font-body-md text-body-md text-primary font-bold hover:text-primary transition-colors duration-200" href="#">Solutions</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Platform</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Agents</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Security</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Docs</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden lg:block font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-200">
              Log In
            </button>
            <Link
              to="/dashboard"
              className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-body-md text-body-md font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-md shadow-primary/10"
            >
              Deploy Agent
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 px-container-padding">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed/30 text-on-primary-fixed-variant rounded-full mb-8 backdrop-blur-md border border-white/20">
              <span className="w-2 h-2 bg-primary rounded-full breathing-pulse" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider">
                v2.4 Core Orchestrator Live
              </span>
            </div>

            <h1 className="font-display-lg text-display-lg md:text-[64px] max-w-4xl mb-6 leading-tight tracking-tight text-on-surface">
              Orchestrate Autonomous <span className="text-primary italic">Intelligence</span>
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12 opacity-80">
              The multi-agent developer platform for high-scale enterprise systems. Build, deploy, and govern swarms of autonomous agents with deterministic control.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
              <button className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full font-headline-md text-headline-md font-semibold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                Deploy Your First Agent
              </button>
              <button className="w-full sm:w-auto glass-card px-8 py-4 rounded-full font-headline-md text-headline-md font-semibold hover:bg-white/90 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">play_circle</span>
                Watch Demo
              </button>
            </div>

            {/* Agent Node Visual */}
            <div className="relative w-full max-w-5xl aspect-[16/9] glass-card rounded-[2rem] overflow-hidden p-8 group">
              <div className="absolute inset-0 network-gradient" />
              <div className="relative w-full h-full border border-black/5 rounded-2xl flex items-center justify-center">
                <img
                  className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:scale-105 transition-transform duration-[2s]"
                  alt="Futuristic multi-agent neural network visualization"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG2PsnJ1fI7XZInGpS5MutNuUsLu5CGJxw74l19HCxfAHxwp6Y3yzCbVqg3Y5YQsD96SJwH2ObecP6kHgDOWO1L3dUZix8zIRODJaZRuSQtVK6ZIs0svEknikSsudFrsnJt8OeoD0a3Tf08ajGKHbp_1idgv86pYrZS2smEC-IK-n9SOS7y8YadC3nUEu6V77wqjX7MFpWZato43_nSwxsKe2l1qwvKqUHKk0rqo28xbU8dppg5hud7Q"
                />
                {/* Floating Glass Labels */}
                <div className="absolute top-12 left-12 glass-card p-4 rounded-xl flex items-center gap-3 animate-bounce [animation-duration:5s]">
                  <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">hub</span>
                  </div>
                  <div className="text-left">
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Core Engine</p>
                    <p className="font-headline-md text-headline-md text-on-surface">Active Swarm</p>
                  </div>
                </div>
                <div className="absolute bottom-12 right-12 glass-card p-4 rounded-xl flex items-center gap-3 animate-bounce [animation-duration:7s] [animation-delay:1s]">
                  <div className="text-right">
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Throughput</p>
                    <p className="font-headline-md text-headline-md text-on-surface">1.2M req/sec</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-600">bolt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 border-y border-black/5 bg-surface-container-low/30 overflow-hidden">
          <div className="max-w-7xl mx-auto px-container-padding">
            <p className="font-label-sm text-label-sm text-center text-on-surface-variant uppercase tracking-[0.2em] mb-12">
              Trusted by Infrastructure Leaders
            </p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2"><span className="material-symbols-outlined">cloud_done</span><span className="font-bold">STRATOS</span></div>
              <div className="flex items-center gap-2"><span className="material-symbols-outlined">data_object</span><span className="font-bold">LUMINA</span></div>
              <div className="flex items-center gap-2"><span className="material-symbols-outlined">precision_manufacturing</span><span className="font-bold">NEXUS</span></div>
              <div className="flex items-center gap-2"><span className="material-symbols-outlined">terminal</span><span className="font-bold">KORP</span></div>
              <div className="flex items-center gap-2"><span className="material-symbols-outlined">hive</span><span className="font-bold">SWARM_OS</span></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-container-padding bg-background relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-xl">
                <h2 className="font-headline-lg text-headline-lg mb-4 text-on-surface">The Agent Ecosystem</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  Deploy specialized agents designed for specific operational domains. Each node operates autonomously while staying synchronized with your core logic.
                </p>
              </div>
              <a className="text-primary font-body-md text-body-md flex items-center gap-2 hover:underline" href="#">
                Explore all agent types <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature Card 1 */}
              <div className="glass-card p-8 rounded-[2rem] flex flex-col h-full specular-highlight">
                <div className="w-14 h-14 bg-error-container text-on-error-container rounded-2xl flex items-center justify-center mb-8 shadow-inner shadow-error/10">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg mb-4">Security Agent</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-8 leading-relaxed">
                  Real-time vulnerability shielding and automated audits. Detects anomalies in milliseconds and applies patches before they affect the stack.
                </p>
                <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">04 Threads Active</span>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-surface flex items-center justify-center text-[10px] font-bold">SD</div>
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-surface flex items-center justify-center text-[10px] font-bold">TX</div>
                  </div>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="glass-card p-8 rounded-[2rem] flex flex-col h-full specular-highlight bg-white/80">
                <div className="w-14 h-14 bg-primary-fixed-dim text-on-primary-fixed-variant rounded-2xl flex items-center justify-center mb-8 shadow-inner shadow-primary/10">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg mb-4">Performance Agent</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-8 leading-relaxed">
                  Autonomous latency optimization and resource scaling. Monitors egress costs and scales cluster instances based on predictive load modeling.
                </p>
                <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Scalability: High</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="w-2 h-2 rounded-full bg-primary/40" />
                    <span className="w-2 h-2 rounded-full bg-primary/20" />
                  </div>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="glass-card p-8 rounded-[2rem] flex flex-col h-full specular-highlight">
                <div className="w-14 h-14 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-2xl flex items-center justify-center mb-8 shadow-inner shadow-tertiary/10">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_tree</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg mb-4">Logic Agent</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-8 leading-relaxed">
                  Complex reasoning and state management across multi-agent workflows. Ensures consistency in distributed environments and handles fallback routing.
                </p>
                <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Orchestration Ready</span>
                  <span className="material-symbols-outlined text-on-surface-variant">sync_alt</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Visualization */}
        <section className="py-32 px-container-padding overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
              <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-inverse-primary/20 rounded-full blur-[100px]" />
              <div className="relative glass-card rounded-[2.5rem] p-2 overflow-hidden aspect-square flex items-center justify-center">
                <img
                  className="w-full h-full object-cover rounded-[2.2rem]"
                  alt="Translucent silicon processor with blue logic paths"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGgxNlVkH_wxLzYJdg5ApD0af6aY70PNzhjegUUx2AKKcEoBG9PucaWpMPJbwUbrl9yp_KihC5qElQRViCBbsz1OnXQSFgM5kpe-cGC61hPSrLI9apyzFEQwzZh6efIqPYyHoeY8x-ODTZhYpKg5BpMNEZa2dOaEAu7clyDSjwyK3QViQl7QGXMykhSbbQrDJQsJZPF-cWUjSjE5v5NaOfkQ5dJe7sxfEVu_QfMSsTwPKAWvaW3rc_qw"
                />
                {/* Floating Data Stream */}
                <div className="absolute bottom-10 left-10 right-10 glass-card bg-white/40 p-4 rounded-2xl border-white/30">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full breathing-pulse" />
                    <span className="font-label-sm text-label-sm text-on-surface">STREAM_LOGS: AUTH_NODE_4</span>
                  </div>
                  <div className="space-y-1 opacity-60">
                    <p className="font-label-sm text-[10px] text-on-surface-variant font-mono">09:42:01.442 [INFO] Initializing handshake...</p>
                    <p className="font-label-sm text-[10px] text-on-surface-variant font-mono">09:42:01.890 [DEBUG] Validating security tokens...</p>
                    <p className="font-label-sm text-[10px] text-green-600 font-mono">09:42:02.122 [SUCCESS] Handshake verified.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="space-y-6">
                <h2 className="font-display-lg text-[40px] leading-tight text-on-surface">
                  Seamlessly switch between High-Level Vision and <span className="text-primary">Micro-Metrics</span>.
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  Our dashboard doesn't just show data; it reveals the intent of your autonomous swarm. Scale from a global overview of 10,000 agents down to the individual logic gates of a single reasoning loop.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 hover:bg-surface-container-low rounded-2xl transition-colors cursor-default group">
                  <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">monitoring</span>
                  <div>
                    <h4 className="font-headline-md text-headline-md font-semibold">Predictive Observability</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">Visualize failures before they happen with our neural simulation layer.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 hover:bg-surface-container-low rounded-2xl transition-colors cursor-default group">
                  <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">layers</span>
                  <div>
                    <h4 className="font-headline-md text-headline-md font-semibold">Deterministic State Layer</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">Total replayability. Debug agent actions with time-traveling logs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-container-padding bg-inverse-surface text-inverse-on-surface relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="font-display-lg text-display-lg mb-8">Ready to Scale Your Autonomous Workforce?</h2>
            <p className="font-body-lg text-body-lg text-surface-variant mb-12 opacity-80">
              Join 500+ engineering teams orchestrating the next generation of intelligent software.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="w-full sm:w-auto bg-primary-container text-on-primary-container px-10 py-5 rounded-full font-headline-md text-headline-md font-bold hover:scale-105 active:scale-95 transition-all">
                Start Deploying Now
              </button>
              <button className="w-full sm:w-auto border border-white/20 px-10 py-5 rounded-full font-headline-md text-headline-md font-bold hover:bg-white/5 transition-all">
                Talk to an Architect
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-black/5 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-container-padding max-w-7xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              </div>
              <span className="font-bold text-on-surface tracking-tight">Sentinal.OS</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              Empowering the next generation of autonomous enterprise software through high-fidelity agent orchestration.
            </p>
            <div className="flex gap-6">
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">hub</span></a>
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">code</span></a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h5 className="font-label-sm text-label-sm text-on-surface font-bold uppercase tracking-widest">Platform</h5>
              <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                <li><a className="hover:text-primary transition-colors" href="#">Agents</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Security</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">API</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-label-sm text-label-sm text-on-surface font-bold uppercase tracking-widest">Company</h5>
              <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                <li><a className="hover:text-primary transition-colors" href="#">About</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
              </ul>
            </div>
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h5 className="font-label-sm text-label-sm text-on-surface font-bold uppercase tracking-widest">Legal</h5>
              <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                <li><a className="hover:text-primary transition-colors" href="#">Privacy</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-container-padding mt-24 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label-sm text-label-sm text-secondary">© 2024 Sentinal.OS Orchestration. Built for autonomous scale.</p>
          <div className="flex gap-8">
            <a className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors" href="#">API Status: Operational</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
