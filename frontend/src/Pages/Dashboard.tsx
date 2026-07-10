import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type NavIcon = {
  icon: string;
  label: string;
  filled?: boolean;
};

const navIcons: NavIcon[] = [
  { icon: "home", label: "Home", filled: true },
  { icon: "smart_toy", label: "Agents" },
  { icon: "database", label: "Data" },
  { icon: "query_stats", label: "Analytics" },
];

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const heroSection = heroRef.current;
    if (!heroSection) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = heroSection.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      heroSection.style.setProperty("--mouse-x", String(x));
      heroSection.style.setProperty("--mouse-y", String(y));
    };

    heroSection.addEventListener("mousemove", handleMouseMove);
    return () => heroSection.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="dashboard-bg text-on-surface font-body-md">
      {/* 1. SideNavBar: Floating Glass Dock */}
      <nav className="fixed left-6 top-8 bottom-8 w-sidebar-width rounded-xl bg-white/70 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] border-r border-white/20 flex flex-col items-center py-8 gap-y-8 z-50">
        <div className="flex flex-col items-center gap-1 mb-4">
          <Link
            to="/"
            className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-white shadow-lg"
          >
            <span
              className="material-symbols-outlined text-display-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shield
            </span>
          </Link>
          <span className="font-headline-md text-[10px] font-bold text-primary tracking-widest uppercase">
            Sentinal
          </span>
        </div>

        <div className="flex flex-col gap-y-6 flex-1">
          {navIcons.map((item, index) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(index)}
              className={`w-12 h-12 flex items-center justify-center transition-all duration-300 ${
                activeNav === index
                  ? "text-primary scale-[1.02] bg-white/40 rounded-full hover:scale-110"
                  : "text-secondary opacity-60 hover:opacity-100 hover:scale-110"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontVariationSettings: activeNav === index ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>
            </button>
          ))}
        </div>

        <button className="w-12 h-12 flex items-center justify-center transition-all duration-300 text-secondary opacity-60 hover:opacity-100 hover:scale-110 mt-auto">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </nav>

      {/* 2. Main Content Field */}
      <main className="ml-[120px] mr-[400px] pt-12 pb-12 px-container-padding min-h-screen space-y-10">
        {/* Header */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Central Control</h1>
            <p className="text-on-surface-variant font-body-md">Orchestrating autonomous multi-agent systems</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <img
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                alt="Engineer avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUP-bJWw-YdP3MZJVjezN_ZK2PaWMOJ65kzZ9o7ur3o9cu890FSb5dEQH5s18OmryTr40fdt5nflG7gOI3Zgcp2UIIyubnHvKArTmtj31k6wTSPYwkscZzgauMir55KL8OxWwMFvGKD2m5lODDYBwVgkgY78Di_ZxqJNOWu5mS6E_3X5hN20wu1vpLwLGatVXbxQ2WmVVKg7OM64KtW_KKfYT-cld7dbqHsM3pkFQTtYeeLNJ-z_PPjg"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                alt="Developer avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHwHZ6Be0aBaEkHL3Cn0wJQFcjxykbC82D3Z6fFtSC3r1TUFNdFCSPZ1PCms6tV1a6sauFMx75z3BTN7qANQ2GhS7IonhdxY6ukyIzTscIBO3AOdpMv6M8JtX3JucgLkcinzRIqFcTr_c0fgKX0fu_97HDiBygZoaJBVrPLlkwTyiT6qjrP0t-VZ6PqovAlDh3tyWuuCXeEIEPo9BLvIDUbL1xezUOI0QYiPpuToDlUcFsL9rlpifAHQ"
              />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">
                +4
              </div>
            </div>
            <button className="bg-primary text-white px-5 py-2.5 rounded-full font-label-md text-label-md shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95">
              Deploy Agent
            </button>
          </div>
        </header>

        {/* Hero Card: Repository Overview */}
        <section ref={heroRef} className="glass-panel rounded-3xl p-8 hover-lift">
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary-container">terminal</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">sentinal-os-runtime</h2>
              </div>
              <div className="flex items-center gap-4 text-on-surface-variant text-label-md">
                <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1 rounded-full border border-black/5">
                  <span className="material-symbols-outlined text-[14px]">account_tree</span>
                  <span>production-main</span>
                  <span className="material-symbols-outlined text-[14px]">expand_more</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-primary">cloud_done</span>
                  <span>Sync Complete</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">System Health</p>
              <div className="text-headline-md font-bold text-primary">99.8%</div>
            </div>
          </div>

          {/* Real-time Processing Metric */}
          <div className="relative h-48 w-full mt-4 overflow-hidden rounded-xl bg-black/5 flex items-end">
            <div className="relative w-full h-full p-4 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-label-sm text-primary font-bold">REAL-TIME TRAFFIC (tps)</span>
                <div className="flex gap-1">
                  <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
                  <div className="w-1 h-5 bg-primary rounded-full animate-pulse [animation-delay:0.2s]" />
                  <div className="w-1 h-2 bg-primary rounded-full animate-pulse [animation-delay:0.4s]" />
                </div>
              </div>
              <svg className="w-full h-32 text-primary" preserveAspectRatio="none" viewBox="0 0 1000 100">
                <defs>
                  <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "currentColor", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "currentColor", stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                <path
                  d="M0,80 Q100,20 200,60 T400,40 T600,70 T800,30 T1000,50"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
                <path
                  d="M0,80 Q100,20 200,60 T400,40 T600,70 T800,30 T1000,50 L1000,100 L0,100 Z"
                  fill="url(#grad1)"
                  opacity="0.1"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Agent Team Panel */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-md text-headline-md text-on-surface">Agent Team</h3>
            <button className="text-primary text-label-md font-semibold hover:underline">View All Clusters</button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Security Agent */}
            <div className="glass-panel rounded-2xl p-6 hover-lift">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-error-container/20 flex items-center justify-center text-error">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                </div>
                <div className="text-right">
                  <span className="text-label-sm text-on-surface-variant block">Rating</span>
                  <span className="font-bold text-on-surface">98%</span>
                </div>
              </div>
              <h4 className="font-bold text-body-lg">Security Agent</h4>
              <div className="flex items-center gap-2 mt-1 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#34C759] breathing-pulse" />
                <span className="text-label-md text-on-surface-variant">Monitoring</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                  <span className="text-label-md text-on-surface-variant">Memory Audit</span>
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    className="w-5 h-5 rounded-full"
                    alt="Security analyst"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuLxa1tm5Wz0gmjxgpxJNfAS4VaFCx92gH_mJyL1jGBrmQaISmOON0Sa0btbYNYnREW0iE5yASE0r2a_4y0ff7seJq0UNhNp9D7xguSBM4GSQFsrOsPAuQLYomgdoZIc7qNndgPRy0hAGbUptD2eNTaadftWwdRdmxdlTjUconu8heBSCAihRx4kY030XeleRFqkO9iMjyJkiv-RYmC-jXplzMuS7EyfGbmvyIwnX41KA5yvt0-86rsA"
                  />
                  <span className="text-[11px] text-on-surface-variant italic truncate">"No anomalies detected..."</span>
                </div>
              </div>
            </div>

            {/* Performance Agent */}
            <div className="glass-panel rounded-2xl p-6 hover-lift">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                </div>
                <div className="text-right">
                  <span className="text-label-sm text-on-surface-variant block">Rating</span>
                  <span className="font-bold text-on-surface">94%</span>
                </div>
              </div>
              <h4 className="font-bold text-body-lg">Performance Agent</h4>
              <div className="flex items-center gap-2 mt-1 mb-6">
                <div className="w-2 h-2 rounded-full bg-primary-container breathing-pulse" />
                <span className="text-label-md text-on-surface-variant">Optimizing</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                  <span className="text-label-md text-on-surface-variant">Analyzing PR #104</span>
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">2m left</span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    className="w-5 h-5 rounded-full"
                    alt="Systems architect"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDazbIXtdQYkOzBYLFY11xX6on87LWD5q7Dhs0eFp2O1XLO6tFOgpEn0oX_HSLwJysz_1_NtGyvFLEgvZsuh3z0KUthT4LrG_Pnb48iXUZXFxmFAPDicw6IUjoCwHzCrnmZuMZEqA90z9vWYJ73gM51KAKSMoXILKkz2bWHF26tegNhoVuxSwV3XLQof1pc2MJPx2A_Uv1esCllfZJuua3ERCuT2l6bigwowC-4fWCuwiD4QEVzEBDQUA"
                  />
                  <span className="text-[11px] text-on-surface-variant italic truncate">"Reducing latency by 12%..."</span>
                </div>
              </div>
            </div>

            {/* Logic Agent */}
            <div className="glass-panel rounded-2xl p-6 hover-lift opacity-80">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </div>
                <div className="text-right">
                  <span className="text-label-sm text-on-surface-variant block">Rating</span>
                  <span className="font-bold text-on-surface">99%</span>
                </div>
              </div>
              <h4 className="font-bold text-body-lg">Logic Agent</h4>
              <div className="flex items-center gap-2 mt-1 mb-6">
                <div className="w-2 h-2 rounded-full bg-secondary opacity-40" />
                <span className="text-label-md text-on-surface-variant">Idle</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low border border-dashed border-black/10">
                  <span className="text-label-md text-on-surface-variant">Ready for task</span>
                  <span className="material-symbols-outlined text-[14px]">more_horiz</span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    className="w-5 h-5 rounded-full"
                    alt="Data scientist"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_9aSIDnPXBCO84R7D_gNrceuNCyKa8m69KGsve-6w-hJVK2GZzBS-g2axd_PdZQtN-Z_vrrHyJ8uENs9-QS8N0Tlt6MkFMiVUsc9-Tr2PIcj1PJNtyc5KKOtA16Pptxm3FkHHYRB0JOBWGVX5scXgpaS_1SZj8s8o5v83bTflwO8rFWE2I7GIeHo_apYLZCoTc6sJVOPzWVRrf7URGyuMPCi3BqH4SOYRLSpDp8pXF_dI0K03GJd3NQ"
                  />
                  <span className="text-[11px] text-on-surface-variant italic truncate">"Awaiting instructions."</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 3. Right Side Panel: Contextual Stream */}
      <aside className="fixed right-0 top-0 bottom-0 w-[400px] glass-panel border-l border-black/5 p-8 overflow-y-auto z-40">
        <div className="space-y-12">
          {/* Metrics Section */}
          <section>
            <h3 className="text-label-sm text-on-surface-variant uppercase tracking-widest font-bold mb-6">Model Performance</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: "Precision", value: "0.92", pct: "92%" },
                { label: "Recall", value: "0.88", pct: "88%" },
                { label: "F1-Score", value: "0.90", pct: "90%" },
              ].map((metric) => (
                <div key={metric.label} className="flex items-center justify-between p-4 bg-white/40 rounded-2xl border border-white/50">
                  <div>
                    <p className="text-label-md text-on-surface-variant">{metric.label}</p>
                    <p className="text-headline-md font-bold">{metric.value}</p>
                  </div>
                  <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-primary-container" style={{ width: metric.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Live Events Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Live Events</h3>
              <span className="w-2 h-2 rounded-full bg-error breathing-pulse" />
            </div>
            <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-black/5">
              <div className="relative pl-10">
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-white" />
                <p className="text-body-md font-medium text-on-surface">Commit pushed to dev</p>
                <p className="text-label-sm text-on-surface-variant">2 minutes ago • sentinal-runtime</p>
                <div className="mt-2 p-3 bg-black/5 rounded-xl text-[12px] font-mono text-on-surface-variant">
                  feat: optimized vector embeddings for core logic agent...
                </div>
              </div>
              <div className="relative pl-10">
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#34C759] ring-4 ring-white" />
                <p className="text-body-md font-medium text-on-surface">Security scan complete</p>
                <p className="text-label-sm text-on-surface-variant">14 minutes ago • system-wide</p>
                <p className="text-label-md text-on-surface-variant mt-1">Found 0 vulnerabilities across 12 services.</p>
              </div>
              <div className="relative pl-10 opacity-70">
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-secondary-container ring-4 ring-white" />
                <p className="text-body-md font-medium text-on-surface">Logic Agent Recalibration</p>
                <p className="text-label-sm text-on-surface-variant">45 minutes ago • logic-service</p>
              </div>
              <div className="relative pl-10 opacity-60">
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-secondary-container ring-4 ring-white" />
                <p className="text-body-md font-medium text-on-surface">Deployment to staging</p>
                <p className="text-label-sm text-on-surface-variant">1 hour ago • master-branch</p>
              </div>
            </div>
          </section>

          {/* Bottom Action */}
          <section className="pt-10">
            <button className="w-full glass-panel py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all active:scale-95">
              <span className="material-symbols-outlined text-[20px]">download</span>
              <span>Download Audit Log</span>
            </button>
          </section>
        </div>
      </aside>
    </div>
  );
}
