import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type IconName =
  | "home"
  | "projects"
  | "play"
  | "settings"
  | "arrow"
  | "plus"
  | "spark"
  | "terminal"
  | "template"
  | "link"
  | "chevron"
  | "check"
  | "book"
  | "memory"
  | "search"
  | "tool"
  | "shield"
  | "route"
  | "activity"
  | "copy"
  | "send"
  | "star"
  | "code"
  | "deploy"
  | "refresh"
  | "key"
  | "flask"
  | "blocks"
  | "menu"
  | "close";

const iconPaths: Record<IconName, ReactNode> = {
  home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-7h6v7" /></>,
  projects: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 4v5" /></>,
  play: <><path d="m8 5 11 7-11 7V5Z" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H3v-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V3h4v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
  arrow: <path d="m9 18 6-6-6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  spark: <><path d="m12 3 1.2 4.2a5 5 0 0 0 3.5 3.5L21 12l-4.2 1.2a5 5 0 0 0-3.5 3.5L12 21l-1.2-4.2a5 5 0 0 0-3.5-3.5L3 12l4.2-1.2a5 5 0 0 0 3.5-3.5L12 3Z" /></>,
  terminal: <><path d="m6 8 4 4-4 4M13 16h5" /></>,
  template: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.1 1" /><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  check: <path d="m5 12 4 4L19 6" />,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22V5.5ZM20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22V5.5Z" /></>,
  memory: <><rect x="5" y="5" width="14" height="14" rx="2" /><path d="M9 9h6v6H9zM9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M19 9h3M2 15h3M19 15h3" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  tool: <><path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 8.6 7 6.3 4.7a4 4 0 0 0 5 5L20 18.4 18.4 20l-8.7-8.7" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  route: <><circle cx="6" cy="5" r="2" /><circle cx="18" cy="19" r="2" /><path d="M6 7v4a2 2 0 0 0 2 2h8a2 2 0 0 1 2 2v2M18 5h.01" /></>,
  activity: <path d="M3 12h4l2-7 4 14 2-7h6" />,
  copy: <><rect x="8" y="8" width="11" height="11" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
  send: <><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" /></>,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
  code: <><path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" /></>,
  deploy: <><path d="m12 3 8 4-8 4-8-4 8-4Z" /><path d="m4 12 8 4 8-4M4 17l8 4 8-4" /></>,
  refresh: <><path d="M20 7h-5V2" /><path d="M19 7a8 8 0 1 0 1 8" /></>,
  key: <><circle cx="8" cy="15" r="4" /><path d="m11 12 9-9M16 7l3 3M14 9l3 3" /></>,
  flask: <><path d="M9 3h6M10 3v6l-5.5 9.2A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.8L14 9V3" /><path d="M7.5 15h9" /><circle cx="10" cy="18" r=".5" /></>,
  blocks: <><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="8" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /><path d="M17 14v6M14 17h6" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

function RuntimeIllustration() {
  return (
    <svg className="hero-illustration hero-signal-illustration" viewBox="0 0 1000 340" preserveAspectRatio="none" role="img" aria-label="Abstract runtime signal">
      <path className="signal-arc signal-arc-one" d="M-40 270C160 28 315 40 500 170S830 305 1040 68" />
      <path className="signal-arc signal-arc-two" d="M-60 230C180 88 310 72 500 170S825 240 1060 105" />
      <path className="signal-arc signal-arc-three" d="M-30 305C190 132 325 115 500 170S790 205 1030 145" />
      <ellipse className="signal-ring ring-one" cx="500" cy="170" rx="112" ry="82" />
      <ellipse className="signal-ring ring-two" cx="500" cy="170" rx="64" ry="47" />
      <circle className="signal-core" cx="500" cy="170" r="18" />
      <path className="signal-mark" d="m491 159 9 21 9-21M491 180h18" />
      <path className="signal-ticks" d="M80 88h70M97 101h35M850 247h70M870 234h34M182 280h46M772 58h46" />
    </svg>
  );
}

type Page = "home" | "projects" | "playground" | "templates" | "integrations" | "integration-detail" | "docs" | "settings" | "project" | "runtime" | "create" | "assign-project" | "create-project" | "auth-signin" | "auth-signup" | "auth-forgot" | "auth-verify";

const projects = [
  { name: "Customer Support", plan: "Studio", runtimes: 2, status: "Healthy" },
  { name: "Study Assistant", plan: "Free", runtimes: 1, status: "Healthy" },
  { name: "Internal Knowledge", plan: "Studio", runtimes: 3, status: "Attention needed" },
];

const recentActions: { icon: IconName; title: string; detail: string; time: string; tone: string }[] = [
  { icon: "deploy", title: "Runtime deployed", detail: "Customer Support · Production", time: "12m ago", tone: "green" },
  { icon: "refresh", title: "Knowledge synchronized", detail: "Help center docs · 842 documents", time: "1h ago", tone: "blue" },
  { icon: "key", title: "API token used", detail: "Customer Support · Production token", time: "2h ago", tone: "violet" },
  { icon: "tool", title: "Tool connected", detail: "Zendesk · Customer Support", time: "Yesterday", tone: "amber" },
];

const requestChartData = [
  { day: "Mon", requests: 820 }, { day: "Tue", requests: 1120 }, { day: "Wed", requests: 1380 },
  { day: "Thu", requests: 1620 }, { day: "Fri", requests: 1840 }, { day: "Sat", requests: 2010 }, { day: "Sun", requests: 2280 },
];
const modelChartData = [
  { day: "Mon", gpt: 980, gemini: 530 }, { day: "Tue", gpt: 800, gemini: 650 }, { day: "Wed", gpt: 1120, gemini: 430 },
  { day: "Thu", gpt: 700, gemini: 820 }, { day: "Fri", gpt: 550, gemini: 960 }, { day: "Sat", gpt: 720, gemini: 880 }, { day: "Sun", gpt: 400, gemini: 1180 },
];
const latencyChartData = [120,260,480,820,1100,980,720,460,270,150,90,45].map((requests, index) => ({ bucket: `${index * 200}`, requests }));
const tokenChartData = [
  { day: "Mon", input: 820, cached: 280, output: 200 }, { day: "Tue", input: 960, cached: 340, output: 240 }, { day: "Wed", input: 750, cached: 250, output: 180 },
  { day: "Thu", input: 1100, cached: 380, output: 280 }, { day: "Fri", input: 880, cached: 310, output: 220 }, { day: "Sat", input: 1180, cached: 400, output: 300 }, { day: "Sun", input: 1010, cached: 350, output: 250 },
];
const spendChartData = [
  [5.8,1.8,1.2],[7.2,2.4,1.6],[4.8,1.6,1],[8.8,2.8,1.8],[6.4,2.1,1.3],[9.8,3.3,2.2],
  [8.2,2.7,1.7],[10.5,3.7,2.4],[9.1,3.1,2],[11.2,4.1,2.5],[9.6,3.4,2.1],[11.8,4.2,2.4],
].map(([inference, tools, search], index) => ({ day: `${index + 1}`, inference, tools, search }));
const percentileChartData = [
  { day: "Mon", p50: 420, p95: 980 }, { day: "Tue", p50: 460, p95: 1120 }, { day: "Wed", p50: 500, p95: 1080 },
  { day: "Thu", p50: 570, p95: 1380 }, { day: "Fri", p50: 550, p95: 1260 }, { day: "Sat", p50: 640, p95: 1580 }, { day: "Sun", p50: 610, p95: 1460 },
];

const actions: { icon: IconName; title: string; copy: string; disabled?: boolean }[] = [
  { icon: "projects", title: "Create a project", copy: "Create a home for your application, runtimes, usage, and team." },
  { icon: "flask", title: "Open Playground", copy: "Experiment with models, prompts and runtime behavior." },
  { icon: "blocks", title: "Start from a template", copy: "Start with a preconfigured runtime pattern." },
  { icon: "link", title: "Connect existing application", copy: "Bring an existing AI application onto Zyntry.", disabled: true },
];

function Sidebar({ page, navigate, projectTab, setProjectTab, developerPage, setDeveloperPage, openAccount }: { page: Page; navigate: (page: Page) => void; projectTab: string; setProjectTab: (tab: string) => void; developerPage: string; setDeveloperPage: (page: string) => void; openAccount: (section: string) => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const [developerOpen, setDeveloperOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const inProject = page === "project" || page === "runtime";

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "/" && !inProject) {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        setCollapsed((value) => !value);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [inProject]);

  useEffect(() => {
    setMobileOpen(false);
  }, [page]);

  const openProjectTab = (tab: string) => {
    setProjectTab(tab);
    setMobileOpen(false);
    navigate("project");
  };
  const openDeveloperPage = (item: string) => {
    setDeveloperPage(item);
    setProjectTab("Developer");
    setMobileOpen(false);
    navigate("project");
  };
  const go = (destination: Page) => {
    setMobileOpen(false);
    navigate(destination);
  };

  return (
    <>
    <header className="mobile-header">
      <button onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Icon name="menu" size={20} /></button>
      <button className="mobile-brand" onClick={() => go("home")}><span className="brand-mark"><span /></span><strong>Zyntry</strong></button>
      <button className="mobile-avatar" onClick={() => openAccount("Profile")}>SA</button>
    </header>
    <button className={`mobile-drawer-mask ${mobileOpen ? "visible" : ""}`} onClick={() => setMobileOpen(false)} aria-label="Close navigation" />
    <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
      <button className="brand" onClick={() => go("home")} aria-label="Zyntry home">
        <span className="brand-mark"><span /></span>
        <span>Zyntry</span>
      </button>
      <button className="mobile-drawer-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><Icon name="close" size={18} /></button>
      <button className="collapse-control" onClick={() => setCollapsed((value) => !value)} title={`${collapsed ? "Expand" : "Collapse"} sidebar (⌘B)`}>
        <Icon name="chevron" size={14} />
      </button>
      {inProject ? (
        <nav className="context-nav" aria-label="Project navigation">
          <button className="all-projects" onClick={() => go("projects")} title="All projects"><span>←</span><span>All projects</span></button>
          <div className="project-switcher-wrap">
            <button className="project-switcher" onClick={() => setSwitcherOpen((value) => !value)} title="Switch project">
              <span className="project-switcher-glyph">CS</span>
              <span className="project-switcher-copy"><strong>Customer Support</strong><small>Studio</small></span>
              <Icon name="chevron" size={14} />
            </button>
            {switcherOpen && !collapsed && <div className="switcher-menu">
              <span className="menu-label">Switch project</span>
              <div className="switcher-search"><Icon name="search" size={14} /><input placeholder="Search projects" /></div>
              {projects.map((project, index) => <button key={project.name} onClick={() => setSwitcherOpen(false)}><span>{project.name}</span>{index === 0 && <Icon name="check" size={14} />}</button>)}
              <div className="menu-separator" />
              <button onClick={() => go("create-project")}><Icon name="plus" size={14} /> New project</button>
              <button onClick={() => go("projects")}><Icon name="projects" size={14} /> All projects</button>
            </div>}
          </div>
          <div className="project-nav-items">
            {[
              ["Overview", "home"],
              ["Runtimes", "activity"],
              ["Playground", "flask"],
              ["Integrations", "link"],
              ["Usage", "route"],
            ].map(([label, icon]) => <button key={label} title={label} className={(page === "runtime" && label === "Runtimes") || (page === "project" && projectTab === label) ? "nav-item active" : "nav-item"} onClick={() => openProjectTab(label)}><Icon name={icon as IconName} /><span>{label}</span></button>)}
            <button title="Developer" className={projectTab === "Developer" ? "nav-item active" : "nav-item"} onClick={() => setDeveloperOpen((value) => !value)}><Icon name="code" /><span>Developer</span><Icon name="chevron" size={13} /></button>
            {developerOpen && !collapsed && <div className="developer-subnav">
              {["API Tokens", "Runtime Contracts", "Webhooks", "SDKs"].map((item) => <button className={developerPage === item && projectTab === "Developer" ? "active" : ""} key={item} onClick={() => openDeveloperPage(item)}><span />{item}</button>)}
            </div>}
          </div>
        </nav>
      ) : (
        <nav className="global-nav" aria-label="Global navigation">
          <div className="sidebar-search"><Icon name="search" size={15} /><input ref={searchRef} placeholder="Search" /><kbd>/</kbd></div>
          <button title="Home" className={page === "home" ? "nav-item active" : "nav-item"} onClick={() => go("home")}><Icon name="home" /><span>Home</span></button>
          <span className="nav-label">Recent activity</span>
          {recentActions.slice(0, 3).map((action) => <button title={`${action.title} · ${action.detail}`} className="nav-item recent-action-item" key={action.title} onClick={() => go("project")}><span className={`sidebar-action-icon ${action.tone}`}><Icon name={action.icon} size={14} /></span><span className="sidebar-action-copy"><strong>{action.title}</strong><small>{action.time}</small></span></button>)}
          <button title="Projects" className={page === "projects" ? "nav-item active" : "nav-item"} onClick={() => go("projects")}><Icon name="projects" /><span>Projects</span></button>
          <span className="nav-label">Build</span>
          <button title="Playground" className={page === "playground" ? "nav-item active" : "nav-item"} onClick={() => go("playground")}><Icon name="flask" /><span>Playground</span></button>
          <button title="Templates" className={page === "templates" ? "nav-item active" : "nav-item"} onClick={() => go("templates")}><Icon name="blocks" /><span>Templates</span></button>
          <button title="Integrations" className={page === "integrations" ? "nav-item active" : "nav-item"} onClick={() => go("integrations")}><Icon name="link" /><span>Integrations</span></button>
        </nav>
      )}
      <nav className="sidebar-footer-nav">
        {!inProject && <button className={page === "docs" ? "nav-item active" : "nav-item"} title="Documentation" onClick={() => go("docs")}><Icon name="book" /><span>Docs</span><small>↗</small></button>}
        <button className={page === "settings" || (inProject && projectTab === "Settings") ? "nav-item active" : "nav-item"} title="Settings" onClick={() => inProject ? openProjectTab("Settings") : go("settings")}><Icon name="settings" /><span>Settings</span></button>
      </nav>
      <div className="account-control">
        <button className={`account-chip ${profileOpen ? "open" : ""}`} onClick={() => setProfileOpen((value) => !value)}>
          <span className="avatar">SA</span>
          <span className="account-identity"><strong>Sulayman</strong><small>sulayman@zyntry.com</small></span>
          <Icon name="chevron" size={14} />
        </button>
        {profileOpen && !collapsed && <div className="account-menu">
          <div className="account-menu-head"><span className="avatar">SA</span><span><strong>Sulayman Alabi</strong><small>Personal account</small></span></div>
          <div className="menu-separator" />
          {[["Profile","home"],["Security","shield"],["Appearance","spark"],["Notifications","activity"],["Users","projects"]].map(([label, icon]) => <button key={label} onClick={() => { setProfileOpen(false); setMobileOpen(false); openAccount(label); }}><Icon name={icon as IconName} size={15} />{label}<Icon name="arrow" size={12} /></button>)}
          <div className="menu-separator" />
          <button className="signout-link" onClick={() => { setProfileOpen(false); setSignOutOpen(true); }}><Icon name="arrow" size={15} />Sign out</button>
        </div>}
      </div>
      {signOutOpen && <div className="modal-mask" onMouseDown={() => setSignOutOpen(false)}><div className="confirm-modal" onMouseDown={(event) => event.stopPropagation()}><span className="modal-icon"><Icon name="arrow" /></span><h2>Sign out of Zyntry?</h2><p>You’ll need to sign in again to access your projects and runtimes.</p><div><button className="secondary-button" onClick={() => setSignOutOpen(false)}>Cancel</button><button className="primary-button" onClick={() => { setSignOutOpen(false); go("auth-signin"); }}>Sign out</button></div></div></div>}
      {toast && <div className="custom-toast"><span><Icon name="check" size={14} /></span><div><strong>Preview action complete</strong><small>The sign-out flow is ready to connect.</small></div><button onClick={() => setToast(false)}><Icon name="close" size={13} /></button></div>}
    </aside>
    </>
  );
}

function Home({ navigate, startCreate }: { navigate: (page: Page) => void; startCreate: (prompt?: string) => void }) {
  const [prompt, setPrompt] = useState("");
  return (
    <main className="main home-main">
      <div className="home-shell">
        <section className="hero-stage">
          <RuntimeIllustration />
          <div className="hero-copy">
            <div className="eyebrow">Good morning, Sulayman</div>
            <h1>What do you want to build today?</h1>
            <p>Describe your application and Zyntry will configure the infrastructure behind it.</p>
          </div>
          <div className="composer">
            <span className="composer-spark"><Icon name="spark" size={18} /></span>
            <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Describe what you want Zyntry to run…" rows={1} />
            <button className="composer-action" onClick={() => startCreate(prompt)} aria-label="Start building"><Icon name="send" size={17} /></button>
          </div>
          <p className="composer-example">Try “Build a support runtime that answers from our docs and creates tickets”</p>
        </section>

        <section className="quick-actions" aria-label="Quick actions">
          {actions.map((action, index) => (
            <button key={action.title} className={`action-card ${action.disabled ? "disabled" : ""}`} onClick={() => !action.disabled && (index === 0 ? navigate("create-project") : index === 1 ? navigate("playground") : startCreate())}>
              <span className="action-icon"><Icon name={action.icon} /></span>
              <span className="action-title">{action.title}{action.disabled && <span className="coming-badge">Coming soon</span>}</span>
              <span className="action-copy">{action.copy}</span>
              {!action.disabled && <span className="action-arrow"><Icon name="arrow" size={15} /></span>}
            </button>
          ))}
        </section>

        <section className="projects-section">
          <div className="section-heading">
            <div><h2>Recent activity</h2><p>What’s happening across your projects</p></div>
            <button className="quiet-button pill-button">View all activity <Icon name="arrow" size={14} /></button>
          </div>
          <div className="recent-activity-list">
            {recentActions.map((action) => (
              <button className="recent-activity-row" key={action.title} onClick={() => navigate("project")}>
                <span className={`activity-icon ${action.tone}`}><Icon name={action.icon} size={17} /></span>
                <span className="activity-copy"><strong>{action.title}</strong><small>{action.detail}</small></span>
                <time>{action.time}</time>
                <Icon name="arrow" size={15} />
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function ProjectPage({ navigate, tab, developerPage, setDeveloperPage }: { navigate: (page: Page) => void; tab: string; developerPage: string; setDeveloperPage: (page: string) => void }) {
  return (
    <main className="main inner-main project-page">
      <header className="project-header">
        <div><div className="project-kicker"><span className="project-glyph">CS</span><span>Project</span></div><div className="project-title-row"><h1>Customer Support</h1><span className="health"><i />Operational</span></div><p>AI support infrastructure for customer-facing applications</p></div>
        <div className="project-header-actions"><span className="plan-chip">Studio</span><button className="quiet-button icon-only-action" aria-label="Project settings" title="Project settings"><Icon name="settings" size={15} /></button><button className="primary-button icon-only-action" aria-label="Create runtime" title="Create runtime" onClick={() => navigate("create")}><Icon name="plus" size={15} /></button></div>
      </header>
      {tab === "Overview" ? <ProjectOverview navigate={navigate} /> : tab === "Runtimes" ? <Runtimes navigate={navigate} /> : tab === "Usage" ? <ProjectUsage /> : tab === "Developer" ? <DeveloperPage section={developerPage} setSection={setDeveloperPage} /> : tab === "Settings" ? <ProjectSettings /> : <EmptyPanel name={tab} />}
    </main>
  );
}

function ProjectOverview({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <div className="content-panel">
      <div className="status-banner"><span className="status-check"><Icon name="check" size={14} /></span><div><strong>Everything operational</strong><span>All systems are working as expected</span></div><small>Checked just now</small></div>
      <div className="stat-line">
        {[["Runtimes", "2"], ["Integrations", "3"], ["Requests", "1,281"], ["Usage this month", "$2.61"]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
      </div>
      <div className="split-grid">
        <section className="list-section">
          <div className="subheading"><h2>Runtimes</h2><button onClick={() => navigate("runtime")}>View all <Icon name="arrow" size={14} /></button></div>
          {[["Production", "1,103 requests", "Automatic routing"], ["Development", "178 requests", "Gemini 2.0 Flash"]].map(([name, requests, mode]) => (
            <button className="runtime-row" key={name} onClick={() => navigate("runtime")}><span className="runtime-symbol"><Icon name="activity" size={16} /></span><span><strong>{name}</strong><small>{mode}</small></span><span className="runtime-meta"><span className="health"><i />Healthy</span><small>{requests}</small></span><Icon name="arrow" size={15} /></button>
          ))}
        </section>
        <section className="list-section">
          <div className="subheading"><h2>Recent activity</h2><button>View activity <Icon name="arrow" size={14} /></button></div>
          {[["Runtime deployed", "Production", "12m"], ["Knowledge synchronized", "Help center docs", "1h"], ["API token used", "Production token", "2h"]].map(([event, detail, time]) => (
            <div className="activity-row" key={event}><span className="activity-dot" /><span><strong>{event}</strong><small>{detail}</small></span><time>{time}</time></div>
          ))}
        </section>
      </div>
    </div>
  );
}

function Runtimes({ navigate }: { navigate: (page: Page) => void }) {
  return <div className="content-panel"><div className="page-actions"><div><h2>Runtimes</h2><p>Configure and operate the AI systems in this project.</p></div><button className="primary-button" onClick={() => navigate("create")}><Icon name="plus" size={16} /> Create runtime</button></div><div className="filter-pills"><button className="active">All</button><button>Active</button><button>Paused</button></div><div className="runtime-list">{[["Production", "Automatic routing", "Updated 14m ago", "Healthy"], ["Development", "Gemini 2.0 Flash", "Updated 1h ago", "Healthy"], ["Evaluation", "Automatic routing", "Updated yesterday", "Paused"]].map(([name, mode, time, status]) => <button className="runtime-full-row" onClick={() => navigate("runtime")} key={name}><span className="runtime-symbol"><Icon name="activity" size={16} /></span><span><strong>{name}</strong><small>{mode}</small></span><span className={`health ${status === "Paused" ? "muted" : ""}`}><i />{status}</span><time>{time}</time><Icon name="arrow" size={16} /></button>)}</div></div>;
}

function ProjectUsage() {
  const [view, setView] = useState("Ledger");
  return <div className="content-panel project-usage page-enter">
    <div className="page-actions"><div><h2>Usage</h2><p>Understand requests, spend, and infrastructure consumption.</p></div><div className="analytics-range"><button>7d</button><button className="active">30d</button><button>90d</button></div></div>
    <nav className="analytics-subtabs">{["Ledger","Metrics","Logs"].map((item) => <button className={view === item ? "active" : ""} onClick={() => setView(item)} key={item}>{item}</button>)}</nav>
    {view === "Ledger" ? <><div className="usage-summary">{[["Current period","$42.86"],["Requests","28,491"],["Model inference","$34.12"],["Tools & search","$8.74"]].map(([label,value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="usage-ledger"><div className="usage-ledger-head"><span>Date</span><span>Runtime</span><span>Category</span><span>Requests</span><span>Tokens</span><span>Cost</span></div>{[["Today","Production","Model inference","1,842","2.8M","$3.42"],["Yesterday","Production","Knowledge retrieval","1,604","2.4M","$2.91"],["May 18","Development","Tool executions","486","682K","$0.84"],["May 17","Production","External search","1,532","2.2M","$3.06"],["May 16","Evaluation","Model inference","924","1.4M","$1.72"]].map((row) => <button className="usage-ledger-row" key={row.join("-")}>{row.map((cell,index) => index === 5 ? <strong key={cell}>{cell}</strong> : <span key={`${cell}-${index}`}>{cell}</span>)}</button>)}</div></> : view === "Metrics" ? <div className="analytics-grid"><section className="chart-card chart-wide"><div className="chart-head"><div><h3>Daily project spend</h3><p>Inference, tools, and retrieval</p></div><strong>$42.86 total</strong></div><div className="rechart-wrap"><ResponsiveContainer width="100%" height="100%"><BarChart data={spendChartData}><CartesianGrid vertical={false} stroke="#30302d" /><XAxis dataKey="day" axisLine={false} tickLine={false} /><YAxis hide /><Tooltip cursor={{ fill: "rgba(255,255,255,.025)" }} /><Bar dataKey="inference" stackId="spend" fill="#34d399" radius={[0,0,3,3]} /><Bar dataKey="tools" stackId="spend" fill="#8d9b91" /><Bar dataKey="search" stackId="spend" fill="#555c56" radius={[3,3,0,0]} /></BarChart></ResponsiveContainer></div><div className="bar-legend"><span><i className="stack-inference-key" />Inference</span><span><i className="stack-tools-key" />Tools</span><span><i className="stack-search-key" />Search</span></div></section><section className="chart-card"><div className="chart-head"><div><h3>Usage by runtime</h3><p>Share of project spend</p></div></div><div className="horizontal-bars">{[["Production","76%","$32.57"],["Development","16%","$6.86"],["Evaluation","8%","$3.43"]].map(([name,width,value]) => <div key={name}><span><b>{name}</b><small>{value}</small></span><div><i className={`width-${width.replace("%","")}`} /></div></div>)}</div></section><section className="chart-card"><div className="chart-head"><div><h3>Cost categories</h3><p>Current billing period</p></div></div><div className="metric-gauges">{[["Model inference","$34.12","80%"],["External search","$4.92","12%"],["Tool execution","$3.82","9%"]].map(([name,value,width]) => <div key={name}><span><b>{name}</b><small>{value}</small></span><div><i className={`width-${width.replace("%","")}`} /></div></div>)}</div></section></div> : <div className="usage-log-list">{[["Budget threshold reached 50%","Project budget","2h ago"],["Usage export generated","May ledger · CSV","Yesterday"],["Request limit increased","Studio defaults → Custom","2d ago"],["Billing period started","May 1 – May 31","18d ago"]].map(([title,copy,time]) => <div key={title}><span className="timeline-icon"><Icon name="activity" size={14} /></span><span><strong>{title}</strong><small>{copy}</small></span><time>{time}</time></div>)}</div>}
  </div>;
}

function DeveloperPage({ section, setSection }: { section: string; setSection: (section: string) => void }) {
  const [action, setAction] = useState<"token" | "webhook" | null>(null);
  const sections = ["API Tokens", "Runtime Contracts", "Webhooks", "SDKs"];
  if (action) return <DeveloperCreatePage type={action} back={() => setAction(null)} />;
  return <div className="content-panel developer-page page-enter">
    <div className="developer-page-head"><div><span className="eyebrow">Developer</span><h2>{section}</h2><p>{section === "API Tokens" ? "Authenticate applications and services with project-scoped credentials." : section === "Runtime Contracts" ? "Define stable interfaces between your application and runtimes." : section === "Webhooks" ? "Deliver signed runtime events to your application." : "Install official libraries and start building with Zyntry."}</p></div>{section === "API Tokens" && <button className="primary-button" onClick={() => setAction("token")}><Icon name="plus" size={14} /> Create API token</button>}{section === "Webhooks" && <button className="primary-button" onClick={() => setAction("webhook")}><Icon name="plus" size={14} /> Add endpoint</button>}</div>
    <nav className="developer-page-tabs">{sections.map((item) => <button className={section === item ? "active" : ""} onClick={() => setSection(item)} key={item}>{item}</button>)}</nav>
    {section === "API Tokens" ? <div className="developer-stack">
      <div className="developer-callout"><Icon name="shield" size={16} /><div><strong>Tokens are project-scoped</strong><p>They can only access Customer Support resources and inherit the permissions you assign.</p></div></div>
      <div className="developer-table"><div className="developer-table-head"><span>Name</span><span>Prefix</span><span>Permissions</span><span>Last used</span><span /></div>{[["Production server","zyn_live_••••7x29","Runtime invoke · Usage read","12m ago"],["Local development","zyn_test_••••4k18","Runtime invoke","2d ago"]].map(([name,prefix,permission,last]) => <div className="developer-table-row" key={name}><span><i className="token-icon"><Icon name="key" size={14} /></i><strong>{name}</strong></span><code>{prefix}</code><small>{permission}</small><time>{last}</time><button>•••</button></div>)}</div>
    </div> : section === "Runtime Contracts" ? <div className="developer-stack"><div className="page-actions"><div><h3>Published contracts</h3><p>Typed input and output schemas for your runtimes.</p></div><button className="quiet-button"><Icon name="plus" size={14} /> New contract</button></div>{[["support.request","Production","v3","Updated 2h ago"],["support.response","Production","v2","Updated yesterday"],["ticket.create","Production","v1","Updated 4d ago"]].map(([name,env,version,time]) => <button className="contract-row" key={name}><span className="contract-icon"><Icon name="code" size={15} /></span><span><strong>{name}</strong><small>{env} environment</small></span><code>{version}</code><time>{time}</time><Icon name="arrow" size={14} /></button>)}</div> : section === "Webhooks" ? <div className="developer-stack"><div className="developer-callout"><Icon name="shield" size={16} /><div><strong>Signed event delivery</strong><p>Every request includes a signature you can verify with your endpoint secret.</p></div></div><div className="webhook-card"><div><span className="webhook-status"><i />Active</span><h3>Production events</h3><code>https://api.example.com/webhooks/zyntry</code></div><div className="webhook-events"><span>request.failed</span><span>runtime.deployed</span><span>tool.executed</span></div><footer><span>Last delivery 8m ago · 200 OK</span><button>Manage <Icon name="arrow" size={13} /></button></footer></div></div> : <div className="sdk-grid">{[["JS","JavaScript / TypeScript","npm install @zyntry/sdk","Node.js 18+"],["PY","Python","pip install zyntry","Python 3.9+"],["GO","Go","go get github.com/zyntry/zyntry-go","Go 1.21+"],["RS","REST API","https://api.zyntry.com/v1","Any platform"]].map(([mark,name,command,platform]) => <article className="sdk-card" key={name}><span>{mark}</span><h3>{name}</h3><p>{platform}</p><code>{command}</code><button>View quickstart <Icon name="arrow" size={13} /></button></article>)}</div>}
  </div>;
}

function DeveloperCreatePage({ type, back }: { type: "token" | "webhook"; back: () => void }) {
  const [created, setCreated] = useState(false);
  if (created) return <div className="content-panel developer-create-page page-enter"><button className="back-link" onClick={back}><span>←</span> Back to {type === "token" ? "API tokens" : "webhooks"}</button><section className="developer-success-page"><span className="token-success"><Icon name="check" size={19} /></span><span className="eyebrow">{type === "token" ? "Credential ready" : "Endpoint ready"}</span><h2>{type === "token" ? "API token created" : "Webhook endpoint created"}</h2><p>{type === "token" ? "Copy this token now. For security, it won’t be shown again." : "Zyntry sent a test event and received a successful response."}</p>{type === "token" ? <div className="created-token"><code>zyn_live_csp_7x29k4m8p2q1</code><button><Icon name="copy" size={14} /></button></div> : <div className="created-webhook-summary"><span><small>Endpoint</small><code>https://api.example.com/webhooks/zyntry</code></span><span><small>Status</small><strong>200 OK</strong></span></div>}<button className="primary-button" onClick={back}>Done</button></section></div>;
  return <div className="content-panel developer-create-page page-enter">
    <button className="back-link" onClick={back}><span>←</span> Back to {type === "token" ? "API tokens" : "webhooks"}</button>
    <div className="developer-create-head"><div><span className="eyebrow">Developer</span><h2>{type === "token" ? "Create API token" : "Add webhook endpoint"}</h2><p>{type === "token" ? "Create a project-scoped credential with only the permissions your application needs." : "Choose which runtime events Zyntry should deliver to your application."}</p></div></div>
    <div className="developer-create-layout">
      <section className="developer-create-form">
        {type === "token" ? <><label>Token name<input placeholder="e.g. Production server" /></label><div className="form-grid"><label>Environment<button className="settings-select">Production <Icon name="chevron" size={13} /></button></label><label>Expiration<button className="settings-select">90 days <Icon name="chevron" size={13} /></button></label></div><fieldset><legend>Permissions</legend>{[["Runtime invoke","Send requests to project runtimes"],["Usage read","Read usage, cost, and request data"],["Runtime manage","Create, update, and deploy runtimes"],["Knowledge manage","Add and synchronize knowledge sources"]].map(([name,copy],index) => <label key={name}><input type="checkbox" defaultChecked={index < 2} /><span><strong>{name}</strong><small>{copy}</small></span></label>)}</fieldset></> : <><label>Endpoint name<input placeholder="e.g. Production events" /></label><label>Endpoint URL<input type="url" placeholder="https://api.example.com/webhooks/zyntry" /></label><label>Signing secret<button className="settings-select">Generate a secure secret <Icon name="refresh" size={13} /></button></label><fieldset><legend>Events</legend>{[["request.failed","A runtime request fails permanently"],["runtime.deployed","A new runtime version is deployed"],["tool.executed","A connected tool completes execution"],["usage.threshold","Project usage reaches a configured threshold"]].map(([name,copy],index) => <label key={name}><input type="checkbox" defaultChecked={index < 3} /><span><strong>{name}</strong><small>{copy}</small></span></label>)}</fieldset></>}
        <footer><button className="secondary-button" onClick={back}>Cancel</button><button className="primary-button" onClick={() => setCreated(true)}>{type === "token" ? "Create token" : "Create endpoint"} <Icon name="arrow" size={14} /></button></footer>
      </section>
      <aside className="developer-create-aside"><Icon name="shield" size={17} /><h3>{type === "token" ? "Keep credentials secure" : "Signed delivery"}</h3><p>{type === "token" ? "Never place API tokens in client-side code or commit them to source control." : "Every request includes a timestamp and HMAC signature for verification."}</p><div>{type === "token" ? <><span><Icon name="check" size={12} />Project-scoped access</span><span><Icon name="check" size={12} />Configurable expiration</span><span><Icon name="check" size={12} />Revocable at any time</span></> : <><span><Icon name="check" size={12} />Automatic retries</span><span><Icon name="check" size={12} />Delivery history</span><span><Icon name="check" size={12} />Secret rotation</span></>}</div></aside>
    </div>
  </div>;
}

function RuntimePage({ navigate }: { navigate: (page: Page) => void }) {
  const [tab, setTab] = useState("Overview");
  const configs: [IconName, string, string][] = [["route", "Models & Routing", "Automatic · Balanced"], ["book", "Knowledge", "3 sources"], ["memory", "Memory", "Session"], ["search", "External Search", "Enabled"], ["tool", "Tools", "4 connected"], ["shield", "Security", "Standard"]];
  return (
    <main className="main inner-main">
      <div className="runtime-breadcrumb"><button onClick={() => navigate("project")}>Customer Support</button><span>/</span><button onClick={() => navigate("project")}>Runtimes</button><span>/</span><strong>Production</strong></div>
      <header className="project-header"><div><div className="runtime-title-line"><h1>Production Runtime</h1><span className="health"><i />Healthy</span></div><p className="header-subtitle">rtm_prod_7x29</p></div><button className="quiet-button"><Icon name="copy" size={15} /> Copy endpoint</button></header>
      <nav className="tabs">{["Overview", "Analytics", "Configure", "Activity", "Developer"].map((item) => <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}>{item}</button>)}</nav>
      {tab === "Overview" ? <div className="content-panel runtime-overview">
        <div className="detail-strip">{[["Environment", "Production"], ["Region", "Automatic"], ["Routing", "Automatic · Balanced"]].map(([a,b]) => <div key={a}><span>{a}</span><strong>{b}</strong></div>)}</div>
        <div className="stat-line runtime-stats">{[["Requests", "12.4K"], ["Current cost", "$18.42"], ["Latency", "721ms"], ["Success", "99.4%"]].map(([a,b]) => <div key={a}><span>{a}</span><strong>{b}</strong></div>)}</div>
        <section className="config-section"><div className="subheading"><div><h2>Runtime configuration</h2><p>Core capabilities and behavior</p></div><button onClick={() => setTab("Configure")}>Configure <Icon name="arrow" size={14} /></button></div><div className="config-grid">{configs.map(([icon, title, value]) => <button key={title} onClick={() => setTab("Configure")}><span className="config-icon"><Icon name={icon} size={17} /></span><span><strong>{title}</strong><small>{value}</small></span><Icon name="arrow" size={15} /></button>)}</div></section>
      </div> : tab === "Analytics" ? <Analytics /> : tab === "Configure" ? <Configure /> : tab === "Activity" ? <Activity /> : <EmptyPanel name="Developer" />}
    </main>
  );
}

function Configure() {
  const [selected, setSelected] = useState<string | null>(null);
  const groups = [
    ["Intelligence", [["Models & Routing", "Automatic · Balanced"], ["Prompt", "System prompt configured"], ["Memory", "Session"]]],
    ["Context", [["Knowledge", "3 sources"], ["External Search", "Enabled"]]],
    ["Actions", [["Tools", "4 connected"], ["MCP", "Not configured"], ["Integrations", "3 connected"]]],
    ["Safety", [["Policies", "2 active"], ["Permissions", "Project defaults"], ["Guardrails", "Standard"]]],
    ["Runtime", [["Environment", "Production"], ["Region", "Automatic"], ["Limits", "Studio defaults"]]],
  ] as const;
  if (selected) return <ConfigurationDetail name={selected} back={() => setSelected(null)} />;
  return <div className="content-panel configure-page page-enter"><div className="page-actions"><div><h2>Configure runtime</h2><p>Complexity stays tucked away until you need it.</p></div><span className="configuration-health"><i />All changes deployed</span></div>{groups.map(([group, items]) => <section className="configure-group" key={group}><h3>{group}</h3><div>{items.map(([name, value]) => <button key={name} onClick={() => setSelected(name)}><span><strong>{name}</strong><small>{value}</small></span><Icon name="arrow" size={15} /></button>)}</div></section>)}</div>;
}

function ConfigurationDetail({ name, back }: { name: string; back: () => void }) {
  const details: Record<string, { description: string; mode: string; options: string[]; note: string }> = {
    "Models & Routing": { description: "Choose how requests are distributed across models and providers.", mode: "Automatic · Balanced", options: ["GPT-4.1 mini", "Gemini 2.0 Flash", "Claude 3.5 Haiku"], note: "Fallback activates when the primary model is unavailable or exceeds latency limits." },
    Prompt: { description: "Define the system behavior and instructions for this runtime.", mode: "Production prompt", options: ["Helpful and concise", "Use connected knowledge first", "Ask before creating tickets"], note: "Prompt changes create a new runtime version when deployed." },
    Memory: { description: "Control what the runtime remembers across requests and sessions.", mode: "Session memory", options: ["Conversation context", "User preferences", "Tool results"], note: "Session memory expires after 24 hours of inactivity." },
    Knowledge: { description: "Connect private information that grounds runtime responses.", mode: "3 active sources", options: ["Help center documentation", "Product handbook", "Support playbooks"], note: "Sources are synchronized and indexed automatically." },
    "External Search": { description: "Allow the runtime to retrieve current public information.", mode: "Enabled", options: ["Search only when needed", "Cite source links", "Block unsafe domains"], note: "External results are filtered through project security policies." },
    Tools: { description: "Configure actions this runtime can execute on behalf of users.", mode: "4 connected tools", options: ["Create Zendesk ticket", "Look up customer", "Escalate conversation"], note: "Sensitive tools require confirmation by default." },
    MCP: { description: "Connect Model Context Protocol servers and capabilities.", mode: "Not configured", options: ["Remote MCP server", "Project credentials", "Tool discovery"], note: "MCP is available on Studio plans and above." },
    Integrations: { description: "Manage services connected to this runtime.", mode: "3 connected", options: ["Zendesk", "Slack", "Notion"], note: "Integration credentials are securely stored at project level." },
    Policies: { description: "Define rules that control runtime decisions and responses.", mode: "2 active policies", options: ["Support scope policy", "Escalation policy", "Data handling policy"], note: "Policies run before tools and final responses." },
    Permissions: { description: "Control which project resources this runtime can access.", mode: "Project defaults", options: ["Read knowledge", "Execute approved tools", "Write session memory"], note: "Least-privilege access is applied automatically." },
    Guardrails: { description: "Set content, safety, and behavior boundaries.", mode: "Standard protection", options: ["Prompt injection protection", "Sensitive data filtering", "Response validation"], note: "Blocked requests appear in runtime activity." },
    Environment: { description: "Configure the deployment environment and release behavior.", mode: "Production", options: ["Production endpoint", "Protected deployments", "Version rollback"], note: "Production changes require an explicit deployment." },
    Region: { description: "Choose where runtime requests and data are processed.", mode: "Automatic", options: ["Automatic placement", "Prefer Europe", "Prefer United States"], note: "Automatic selects the healthiest available region." },
    Limits: { description: "Protect the runtime with request, cost, and concurrency limits.", mode: "Studio defaults", options: ["1,000 requests per minute", "$100 monthly budget", "50 concurrent requests"], note: "Alerts are sent before a hard limit is reached." },
  };
  const detail = details[name];
  return <div className="content-panel configuration-detail page-enter">
    <button className="back-link" onClick={back}><span>←</span> All configuration</button>
    <div className="configuration-detail-head"><div><span className="eyebrow">Runtime configuration</span><h2>{name}</h2><p>{detail.description}</p></div><button className="primary-button">Save and deploy</button></div>
    <div className="configuration-detail-grid">
      <section className="settings-card config-primary-card"><div className="settings-card-head"><h3>Current configuration</h3><p>Changes apply only to Production Runtime.</p></div><label>Mode<button className="settings-select">{detail.mode}<Icon name="chevron" size={14} /></button></label><div className="option-list">{detail.options.map((option, index) => <button className={index === 0 ? "selected" : ""} key={option}><span className="option-check">{index === 0 && <Icon name="check" size={12} />}</span><span><strong>{option}</strong><small>{index === 0 ? "Active" : "Available"}</small></span><Icon name="chevron" size={13} /></button>)}</div></section>
      <aside><div className="settings-card"><h3>Behavior</h3><p>{detail.note}</p><div className="config-toggle-row"><span><strong>Use recommended defaults</strong><small>Zyntry adjusts this safely.</small></span><button className="toggle on"><i /></button></div><div className="config-toggle-row"><span><strong>Activity logging</strong><small>Record configuration events.</small></span><button className="toggle on"><i /></button></div></div><div className="configuration-tip"><Icon name="spark" size={15} /><p><strong>Configured for production</strong><br />These settings follow the project’s Studio entitlements.</p></div></aside>
    </div>
  </div>;
}

function Activity() {
  return <div className="content-panel"><div className="page-actions"><div><h2>Recent activity</h2><p>Requests, deployments, tool calls, and runtime changes.</p></div><button className="quiet-button">Filter activity <Icon name="chevron" size={14} /></button></div><div className="timeline">{[["Request completed", "GPT-4.1 mini · 684ms", "Just now"], ["Tool executed", "Zendesk · create_ticket", "8m ago"], ["Runtime deployed", "Version 24 published to Production", "12m ago"], ["Knowledge synchronized", "Help center · 842 documents", "1h ago"], ["Routing updated", "Balanced strategy enabled", "Yesterday"]].map(([title, copy, time], i) => <div className="timeline-row" key={title}><span className={`timeline-icon ${i === 0 ? "success" : ""}`}><Icon name={i === 1 ? "tool" : i === 2 ? "terminal" : "activity"} size={15} /></span><span><strong>{title}</strong><small>{copy}</small></span><time>{time}</time></div>)}</div></div>;
}

function RequestVolumeChart() {
  return <div className="rechart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={requestChartData}><defs><linearGradient id="requestsFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#34d399" stopOpacity=".28" /><stop offset="100%" stopColor="#34d399" stopOpacity="0" /></linearGradient></defs><CartesianGrid vertical={false} stroke="#30302d" /><XAxis dataKey="day" axisLine={false} tickLine={false} /><YAxis hide /><Tooltip cursor={{ stroke: "#41413d" }} /><Area type="monotone" dataKey="requests" stroke="#34d399" strokeWidth={2} fill="url(#requestsFill)" activeDot={{ r: 4, fill: "#34d399" }} /></AreaChart></ResponsiveContainer></div>;
}

function OutcomeDonutChart() {
  const data = [{ name: "Completed", value: 12410 }, { name: "Failed", value: 72 }];
  return <div className="donut-rechart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data} dataKey="value" innerRadius={45} outerRadius={58} paddingAngle={2} startAngle={90} endAngle={-270}>{data.map((entry,index) => <Cell key={entry.name} fill={index === 0 ? "#34d399" : "#44443f"} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer><div><strong>99.4%</strong><small>successful</small></div></div>;
}

function ModelRequestsChart() {
  return <div className="rechart-wrap compact"><ResponsiveContainer width="100%" height="100%"><BarChart data={modelChartData}><CartesianGrid vertical={false} stroke="#30302d" /><XAxis dataKey="day" axisLine={false} tickLine={false} /><YAxis hide /><Tooltip cursor={{ fill: "rgba(255,255,255,.025)" }} /><Bar dataKey="gpt" fill="#34d399" radius={[4,4,0,0]} /><Bar dataKey="gemini" fill="#73766f" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></div>;
}

function LatencyDistributionChart() {
  return <div className="rechart-wrap compact"><ResponsiveContainer width="100%" height="100%"><BarChart data={latencyChartData}><CartesianGrid vertical={false} stroke="#30302d" /><XAxis dataKey="bucket" axisLine={false} tickLine={false} interval={2} /><YAxis hide /><Tooltip cursor={{ fill: "rgba(255,255,255,.025)" }} /><Bar dataKey="requests" fill="#34d399" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></div>;
}

function TokenVolumeChart() {
  return <div className="rechart-wrap compact"><ResponsiveContainer width="100%" height="100%"><BarChart data={tokenChartData}><CartesianGrid vertical={false} stroke="#30302d" /><XAxis dataKey="day" axisLine={false} tickLine={false} /><YAxis hide /><Tooltip cursor={{ fill: "rgba(255,255,255,.025)" }} /><Bar dataKey="input" stackId="tokens" fill="#34d399" /><Bar dataKey="cached" stackId="tokens" fill="#8d9b91" /><Bar dataKey="output" stackId="tokens" fill="#555c56" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></div>;
}

function PercentileChart() {
  return <div className="rechart-wrap"><ResponsiveContainer width="100%" height="100%"><LineChart data={percentileChartData}><CartesianGrid vertical={false} stroke="#30302d" /><XAxis dataKey="day" axisLine={false} tickLine={false} /><YAxis hide /><Tooltip cursor={{ stroke: "#41413d" }} /><Line type="monotone" dataKey="p95" stroke="#34d399" strokeWidth={2} dot={false} activeDot={{ r: 4 }} /><Line type="monotone" dataKey="p50" stroke="#8d9b91" strokeWidth={2} strokeDasharray="5 5" dot={false} /></LineChart></ResponsiveContainer></div>;
}

function TokenThroughputChart() {
  return <div className="rechart-wrap compact"><ResponsiveContainer width="100%" height="100%"><BarChart data={tokenChartData}><CartesianGrid vertical={false} stroke="#30302d" /><XAxis dataKey="day" axisLine={false} tickLine={false} /><YAxis hide /><Tooltip cursor={{ fill: "rgba(255,255,255,.025)" }} /><Bar dataKey="input" fill="#34d399" radius={[4,4,0,0]} /><Bar dataKey="output" fill="#73766f" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></div>;
}

function Analytics() {
  const [view, setView] = useState("Analytics");
  return (
    <div className="content-panel analytics-page">
      <div className="page-actions">
        <div><h2>Runtime analytics</h2><p>Requests, performance, model usage, and reliability.</p></div>
        <div className="analytics-range"><button>24h</button><button className="active">7d</button><button>30d</button><button>Custom</button></div>
      </div>
      <nav className="analytics-subtabs">{["Analytics", "Metrics", "Logs"].map((item) => <button className={view === item ? "active" : ""} onClick={() => setView(item)} key={item}>{item}</button>)}</nav>
      {view === "Analytics" ? <>
      <div className="analytics-stats">
        {[["Total requests", "12,482", "+12.4%"], ["Success rate", "99.42%", "+0.18%"], ["Median latency", "721ms", "−8.2%"], ["Estimated cost", "$18.42", "+$2.16"]].map(([label, value, change], index) => <div key={label}><span>{label}</span><strong>{value}</strong><small className={index === 3 ? "neutral" : ""}>{change} <em>vs previous</em></small></div>)}
      </div>
      <div className="analytics-grid">
        <section className="chart-card chart-wide">
          <div className="chart-head"><div><h3>Request volume</h3><p>Requests across all routes</p></div><span><i />Requests</span></div>
          <RequestVolumeChart />
        </section>
        <section className="chart-card">
          <div className="chart-head"><div><h3>Request outcome</h3><p>Completion status</p></div></div>
          <div className="donut-wrap">
            <OutcomeDonutChart />
            <div className="donut-legend"><span><i className="success" />Completed <b>12,410</b></span><span><i className="failed" />Failed <b>72</b></span></div>
          </div>
        </section>
        <section className="chart-card">
          <div className="chart-head"><div><h3>Requests by model</h3><p>Daily model distribution</p></div></div>
          <ModelRequestsChart />
          <div className="bar-legend"><span><i className="primary" />GPT-4.1 mini · 64%</span><span><i className="secondary" />Gemini Flash · 36%</span></div>
        </section>
        <section className="chart-card">
          <div className="chart-head"><div><h3>Latency distribution</h3><p>End-to-end response time</p></div><strong>p95 1.8s</strong></div>
          <LatencyDistributionChart />
        </section>
        <section className="chart-card">
          <div className="chart-head"><div><h3>Tool executions</h3><p>Calls by connected tool</p></div><strong>1,842 total</strong></div>
          <div className="horizontal-bars">
            {[["Zendesk", "72%", "1,326"], ["Knowledge search", "18%", "332"], ["Customer lookup", "7%", "129"], ["Escalation", "3%", "55"]].map(([name, width, value]) => <div key={name}><span><b>{name}</b><small>{value}</small></span><div><i className={`width-${width.replace("%","")}`} /></div></div>)}
          </div>
        </section>
        <section className="chart-card">
          <div className="chart-head"><div><h3>Token volume</h3><p>Input, cached, and output tokens</p></div><strong>18.6M total</strong></div>
          <TokenVolumeChart />
          <div className="bar-legend"><span><i className="stack-inference-key" />Input</span><span><i className="stack-tools-key" />Cached</span><span><i className="stack-search-key" />Output</span></div>
        </section>
      </div>
      </> : view === "Metrics" ? <MetricsView /> : <LogsView />}
    </div>
  );
}

function MetricsView() {
  return <div className="metrics-view">
    <div className="analytics-stats">{[["CPU time", "184ms", "p50"], ["Memory", "128MB", "average"], ["Tokens / request", "1,842", "+4.2%"], ["Cache hit rate", "71.8%", "+8.1%"]].map(([label,value,detail]) => <div key={label}><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>)}</div>
    <div className="analytics-grid">
      <section className="chart-card chart-wide"><div className="chart-head"><div><h3>Latency percentiles</h3><p>Response performance by percentile</p></div><span><i />p50 · p95</span></div><PercentileChart /><div className="bar-legend"><span><i className="metric-p95" />p95 latency</span><span><i className="metric-p50" />p50 latency</span></div></section>
      <section className="chart-card"><div className="chart-head"><div><h3>Token throughput</h3><p>Input and output tokens</p></div><strong>2.4M total</strong></div><TokenThroughputChart /></section>
      <section className="chart-card"><div className="chart-head"><div><h3>Runtime health</h3><p>Infrastructure saturation</p></div></div><div className="metric-gauges">{[["Concurrency","42 / 50","84%"],["Cache capacity","7.1 / 10 GB","71%"],["Rate limit","612 / 1K rpm","61%"]].map(([name,value,width]) => <div key={name}><span><b>{name}</b><small>{value}</small></span><div><i className={`width-${width.replace("%","")}`} /></div></div>)}</div></section>
    </div>
  </div>;
}

function LogsView() {
  const logs = [
    ["info","14:42:18.293","Request completed","req_7x29a","684ms"],
    ["info","14:42:16.082","Tool executed · zendesk.create_ticket","req_7x28f","1.2s"],
    ["warn","14:41:58.441","Provider fallback activated","req_7x27c","2.8s"],
    ["info","14:41:32.107","Knowledge retrieval completed","req_7x26b","214ms"],
    ["error","14:40:54.882","Tool permission denied","req_7x25a","92ms"],
    ["info","14:40:21.309","Request completed","req_7x249","721ms"],
  ];
  return <div className="logs-view"><div className="logs-toolbar"><div className="log-search"><Icon name="search" size={14} /><input placeholder="Search logs, request IDs, or events" /></div><button>All levels <Icon name="chevron" size={13} /></button><button>All events <Icon name="chevron" size={13} /></button><button className="live-button"><i />Live</button></div><div className="logs-table"><div className="log-table-head"><span>Level</span><span>Time</span><span>Event</span><span>Request</span><span>Duration</span></div>{logs.map(([level,time,event,request,duration]) => <button className="log-row" key={`${time}-${event}`}><span className={`log-level ${level}`}>{level}</span><code>{time}</code><span>{event}</span><code>{request}</code><small>{duration}</small></button>)}</div><footer className="logs-footer"><span>Showing the latest 100 events</span><button>Open detailed activity <Icon name="arrow" size={13} /></button></footer></div>;
}

function ProjectSettings() {
  const [section, setSection] = useState("General");
  const sections = ["General", "AI Providers", "Members", "Plan & Billing", "Security", "Advanced Features"];
  return <div className="content-panel settings-page">
    <aside className="settings-subnav"><span>Project settings</span>{sections.map((item) => <button className={section === item ? "active" : ""} onClick={() => setSection(item)} key={item}>{item}</button>)}</aside>
    <section className="settings-content">
      <div className="settings-title"><div><h2>{section}</h2><p>{section === "Members" ? "Manage the people who can access this project." : `Manage ${section.toLowerCase()} for Customer Support.`}</p></div>{section === "Members" && <button className="primary-button"><Icon name="plus" size={14} /> Invite member</button>}</div>
      {section === "Members" ? <div className="members-card">
        {[["SA","Sulayman Alabi","sulayman@zyntry.com","Owner"],["MK","Maya Khan","maya@example.com","Developer"],["JL","Jon Lee","jon@example.com","Viewer"]].map(([initials,name,email,role]) => <div className="member-row" key={email}><span className="avatar">{initials}</span><span><strong>{name}</strong><small>{email}</small></span><button>{role}<Icon name="chevron" size={13} /></button><button className="more-button">•••</button></div>)}
      </div> : section === "Advanced Features" ? <div className="settings-card feature-toggles">{["Detailed traces","Runtime versions","Snapshots","Advanced routing","Audit log","MCP management"].map((item,index) => <div key={item}><span><strong>{item}</strong><small>{index < 2 ? "Add deeper runtime visibility and control." : "Enable this module across the project."}</small></span><button className={index < 2 ? "toggle on" : "toggle"}><i /></button></div>)}</div> : <div className="settings-stack">
        <div className="settings-card"><div className="settings-card-head"><div><h3>Project details</h3><p>Information shown throughout the Zyntry Console.</p></div></div><label>Project name<input defaultValue="Customer Support" /></label><label>Project ID<div className="copy-field"><code>prj_customer_support_7x29</code><button><Icon name="copy" size={14} /></button></div></label><div className="settings-card-footer"><button className="primary-button">Save changes</button></div></div>
        <div className="settings-card danger-card"><div><h3>Delete project</h3><p>Permanently remove this project and all runtime data.</p></div><button>Delete project</button></div>
      </div>}
    </section>
  </div>;
}

function AccountSettings({ section, setSection }: { section: string; setSection: (section: string) => void }) {
  return <main className="main inner-main account-settings-main">
    <header><span className="eyebrow">Your account</span><h1>Account settings</h1><p>Manage your identity, security, and personal preferences.</p></header>
    <div className="account-settings-layout">
      <aside className="settings-subnav"><span>Personal</span>{["Profile","Security","Appearance","Notifications"].map((item) => <button className={section === item ? "active" : ""} onClick={() => setSection(item)} key={item}>{item}</button>)}<span>Workspace</span>{["Workspace profile","Users"].map((item) => <button className={section === item ? "active" : ""} onClick={() => setSection(item)} key={item}>{item}</button>)}</aside>
      <section className="settings-content">
        <div className="settings-title"><div><h2>{section}</h2><p>Manage your {section.toLowerCase()} settings.</p></div>{section === "Users" && <button className="primary-button"><Icon name="plus" size={14} /> Add user</button>}</div>
        {section === "Users" ? <div className="members-card">{[["SA","Sulayman Alabi","sulayman@zyntry.com","Admin"],["MK","Maya Khan","maya@example.com","Member"]].map(([initials,name,email,role]) => <div className="member-row" key={email}><span className="avatar">{initials}</span><span><strong>{name}</strong><small>{email}</small></span><button>{role}<Icon name="chevron" size={13} /></button><button className="more-button">•••</button></div>)}</div> : section === "Security" ? <div className="settings-stack">
          <div className="settings-card"><div className="settings-card-head"><h3>Password</h3><p>Last changed 42 days ago.</p></div><label>Current password<input type="password" defaultValue="zyntrypass" /></label><label>New password<input type="password" placeholder="Enter a secure password" /></label><div className="settings-card-footer"><button className="primary-button">Update password</button></div></div>
          <div className="settings-card security-row"><span><strong>Two-factor authentication</strong><small>Add an extra layer of protection to your account.</small></span><button className="primary-button">Enable 2FA</button></div>
        </div> : section === "Appearance" ? <div className="settings-stack"><div className="settings-card"><div className="settings-card-head"><h3>Interface theme</h3><p>Choose how Zyntry looks for your account.</p></div><div className="theme-options"><button className="selected"><span className="theme-preview dark" /><strong>Dark</strong><small>Current</small></button><button><span className="theme-preview light" /><strong>Light</strong><small>Bright surfaces</small></button><button><span className="theme-preview system" /><strong>System</strong><small>Match device</small></button></div></div><div className="settings-card density-setting"><span><strong>Compact navigation</strong><small>Use smaller rows and controls throughout the console.</small></span><button className="toggle on"><i /></button></div></div> : section === "Notifications" ? <div className="settings-card feature-toggles">{[["Runtime failures","Immediate alerts when production requests fail."],["Usage and budgets","Warnings when projects approach a limit."],["Deployments","Confirmation when runtime versions deploy."],["Product updates","Occasional updates about new Zyntry features."]].map(([title,copy],index) => <div key={title}><span><strong>{title}</strong><small>{copy}</small></span><button className={index < 3 ? "toggle on" : "toggle"}><i /></button></div>)}</div> : section === "Workspace profile" ? <div className="settings-stack"><div className="settings-card"><div className="settings-card-head"><h3>Workspace identity</h3><p>Shared details visible to everyone in this workspace.</p></div><label>Workspace name<input defaultValue="Sulayman’s Workspace" /></label><label>Workspace URL<input defaultValue="zyntry.com/s/sulayman" /></label><div className="settings-card-footer"><button className="primary-button">Save workspace</button></div></div></div> : <div className="settings-stack">
          <div className="settings-card profile-card"><div className="profile-avatar-large">SA</div><div><h3>Sulayman Alabi</h3><p>Update your photo and personal details.</p></div><button className="quiet-button">Change photo</button></div>
          <div className="settings-card"><label>Display name<input defaultValue="Sulayman Alabi" /></label><label>Email address<input defaultValue="sulayman@zyntry.com" /></label><label>Time zone<button className="settings-select">West Africa Time (GMT+1)<Icon name="chevron" size={14} /></button></label><div className="settings-card-footer"><button className="primary-button">Save changes</button></div></div>
        </div>}
      </section>
    </div>
  </main>;
}

function PlaygroundPage() {
  const [running, setRunning] = useState(false);
  const [prompt, setPrompt] = useState("Answer the customer using the connected help center. If the issue requires account access, ask for confirmation before creating a Zendesk ticket.");
  const runPrompt = () => { setRunning(true); window.setTimeout(() => setRunning(false), 900); };
  return <main className="main playground-page">
    <header className="product-page-header"><div><span className="eyebrow">Build workspace</span><h1>Playground</h1><p>Test prompts, models, and runtime behavior before you deploy.</p></div><div><button className="quiet-button"><Icon name="activity" size={14} /> History</button><button className="primary-button" onClick={runPrompt}><Icon name="flask" size={15} /> Run experiment</button></div></header>
    <div className="playground-toolbar"><button><span className="mini-glyph">CS</span><span><small>Project</small><strong>Customer Support</strong></span><Icon name="chevron" size={13} /></button><button><Icon name="activity" size={15} /><span><small>Runtime</small><strong>Production</strong></span><Icon name="chevron" size={13} /></button><div className="playground-status"><i />Changes stay in Playground</div></div>
    <div className="playground-workspace">
      <section className="prompt-editor">
        <div className="workspace-panel-head"><div><Icon name="terminal" size={15} /><span><strong>Prompt</strong><small>System instructions</small></span></div><button>Reset</button></div>
        <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} />
        <div className="prompt-variables"><span>Variables</span><button>{"{{customer_name}"}</button><button>{"{{issue}"}</button><button><Icon name="plus" size={12} /> Add</button></div>
        <div className="test-message"><label>Test message</label><div><textarea defaultValue="I was charged twice for my subscription. Can you help?" rows={2} /><button onClick={runPrompt} aria-label="Run prompt"><Icon name="send" size={15} /></button></div></div>
      </section>
      <section className="playground-output">
        <div className="workspace-panel-head"><div><Icon name="spark" size={15} /><span><strong>Response</strong><small>GPT-4.1 mini · 684ms</small></span></div><div className="output-actions"><button><Icon name="copy" size={13} /></button><button>•••</button></div></div>
        <div className={`output-body ${running ? "running" : ""}`}><span className="output-avatar"><Icon name="spark" size={14} /></span><div><strong>Assistant</strong><p>I’m sorry about the duplicate charge. I can help investigate this for you. Before I access your billing details and create a support ticket, please confirm that you’d like me to proceed.</p><div className="tool-preview"><Icon name="tool" size={14} /><span><strong>Zendesk · create_ticket</strong><small>Waiting for user confirmation</small></span><span>Pending</span></div></div></div>
        <footer className="output-metrics"><span>1,284 tokens</span><span>$0.0024</span><span>684ms</span><span className="success">Valid response</span></footer>
      </section>
      <aside className="playground-controls">
        <div className="workspace-panel-head"><div><Icon name="settings" size={15} /><span><strong>Parameters</strong><small>Experiment settings</small></span></div></div>
        <label>Model<button>GPT-4.1 mini <Icon name="chevron" size={13} /></button></label>
        <label>Routing<button>Use selected model <Icon name="chevron" size={13} /></button></label>
        <label>Temperature <span>0.4</span><input type="range" min="0" max="10" defaultValue="4" /></label>
        <label>Max output <button>2,048 tokens <Icon name="chevron" size={13} /></button></label>
        <div className="control-toggle"><span><strong>Knowledge</strong><small>3 sources</small></span><button className="toggle on"><i /></button></div>
        <div className="control-toggle"><span><strong>Tools</strong><small>4 available</small></span><button className="toggle on"><i /></button></div>
        <div className="control-toggle"><span><strong>Memory</strong><small>Session</small></span><button className="toggle"><i /></button></div>
      </aside>
    </div>
  </main>;
}

function TemplatesPage({ startCreate }: { startCreate: (prompt?: string) => void }) {
  const templates = [
    ["book","Knowledge assistant","Answer questions accurately from private documentation.","Knowledge · RAG","Popular"],
    ["tool","Support automation","Resolve customer questions and create support tickets.","Tools · Memory","Production"],
    ["search","Research agent","Search, synthesize, and cite current public information.","Search · Citations","New"],
    ["memory","Personal study coach","Create adaptive study plans with learner memory.","Memory · Knowledge","Education"],
    ["route","Model router","Route each request by quality, speed, and cost.","Routing · Fallbacks","Advanced"],
    ["code","Developer copilot","Answer technical questions from code and product docs.","MCP · Tools","Developer"],
  ] as [IconName,string,string,string,string][];
  return <main className="main templates-page">
    <header className="product-page-header"><div><span className="eyebrow">Runtime library</span><h1>Templates</h1><p>Start with a proven pattern, then make every part your own.</p></div><button className="primary-button" onClick={() => startCreate()}><Icon name="plus" size={15} /> Blank runtime</button></header>
    <section className="featured-template">
      <div className="featured-visual"><span><Icon name="spark" size={22} /></span><div className="visual-route one" /><div className="visual-route two" /><i className="visual-node a"><Icon name="book" size={14} /></i><i className="visual-node b"><Icon name="tool" size={14} /></i><i className="visual-node c"><Icon name="memory" size={14} /></i></div>
      <div className="featured-copy"><span className="template-label">Featured template</span><h2>Production support agent</h2><p>A complete support runtime with private knowledge, session memory, safe tool execution, and automatic ticket escalation.</p><div className="template-tags"><span>Automatic routing</span><span>Knowledge</span><span>Zendesk</span><span>Guardrails</span></div><button className="primary-button" onClick={() => startCreate("Build a production support agent that answers from our docs and safely creates Zendesk tickets.")}>Use this template <Icon name="arrow" size={14} /></button></div>
    </section>
    <div className="template-browser-head"><div className="template-search"><Icon name="search" size={15} /><input placeholder="Search templates" /></div><nav>{["All","Support","Knowledge","Agents","Developer"].map((item,index) => <button className={index === 0 ? "active" : ""} key={item}>{item}</button>)}</nav></div>
    <section className="template-grid">{templates.map(([icon,name,copy,features,badge]) => <button className="template-card" onClick={() => startCreate(`Build a ${name.toLowerCase()} for my application.`)} key={name}><div className="template-card-top"><span><Icon name={icon} size={18} /></span><small>{badge}</small></div><h3>{name}</h3><p>{copy}</p><footer><span>{features}</span><Icon name="arrow" size={14} /></footer></button>)}</section>
  </main>;
}

function IntegrationIcon({ code }: { code: string }) {
  const marks: Record<string, ReactNode> = {
    ZE: <><path d="M5 5h8L5 13V5ZM19 19h-8l8-8v8Z" /><path d="M5 16h8l-4 4-4-4ZM19 8h-8l4-4 4 4Z" /></>,
    SL: <><path d="M9 3v7a2 2 0 0 1-4 0V7a4 4 0 0 1 4-4ZM15 21v-7a2 2 0 0 1 4 0v3a4 4 0 0 1-4 4Z" /><path d="M21 9h-7a2 2 0 0 1 0-4h3a4 4 0 0 1 4 4ZM3 15h7a2 2 0 0 1 0 4H7a4 4 0 0 1-4-4Z" /></>,
    NO: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 17V8l8 9V8" /></>,
    GH: <><circle cx="12" cy="12" r="9" /><path d="M8 18v-2.2c-2 .2-2.5-.9-3-1.8M16 18v-3.1c0-1 .4-1.6.8-2.1 2.7-.3 5.5-1.3 5.5-5.5 0-1.2-.4-2.2-1.1-3 .1-.3.5-1.5-.1-3-1 0-2.2.7-3 1.3a10 10 0 0 0-5.5 0C11.8 2 10.6 1.3 9.6 1.3c-.6 1.5-.2 2.7-.1 3-.7.8-1.1 1.8-1.1 3 0 4.2 2.8 5.2 5.5 5.5.4.4.8 1.1.8 2.1V18" /></>,
    GD: <><path d="m9 3-6 10 3 5h6l6-10-3-5H9Z" /><path d="m9 3 6 10M3 13h12M12 18l6-10" /></>,
    LI: <><circle cx="12" cy="12" r="9" /><path d="m5.7 15.7 8.6-8.6M7.8 18l8.5-8.6M5 12.4 11.4 6" /></>,
    HS: <><circle cx="12" cy="12" r="3" /><circle cx="19" cy="5" r="2" /><circle cx="5" cy="8" r="2" /><circle cx="17" cy="19" r="2" /><path d="m14 10 3.5-3.5M9 11 6.8 9M14 14l2 3" /></>,
    WH: <><path d="M8 8a4 4 0 1 1 4 4H8a4 4 0 1 0 4 4M16 16a4 4 0 1 1-4-4h4a4 4 0 1 0-4-4" /></>,
    SF: <path d="M8 18H6a4 4 0 0 1-.6-8A5 5 0 0 1 15 7a4 4 0 1 1 2 11H8Z" />,
    DS: <><path d="M7 7c3-1 7-1 10 0l2 9c-2 2-4 3-6 3l-1-2-1 2c-2 0-4-1-6-3l2-9Z" /><circle cx="9.5" cy="12" r="1" /><circle cx="14.5" cy="12" r="1" /></>,
    ST: <><path d="M17 7c-1-2-9-3-9 1 0 4 9 2 9 7 0 4-8 4-10 1" /><path d="M12 3v18" /></>,
    SN: <><path d="M5 17a7 7 0 0 1 12-5M8 20a10 10 0 0 1 12-12" /><path d="m4 12 8-8 8 16H4" /></>,
    PG: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v11c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 11c0 1.7 3.1 3 7 3s7-1.3 7-3" /></>,
    AW: <><path d="M5 16c4 2 10 2 14 0M7 14l3-8h4l3 8M9 11h6" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{marks[code]}</svg>;
}

function IntegrationsPage({ navigate, openIntegration }: { navigate: (page: Page) => void; openIntegration: (code: string, name: string) => void }) {
  const integrations = [
    ["ZE","Zendesk","Create tickets, look up customers, and automate support workflows.","Support","Connected","Customer Support"],
    ["SL","Slack","Send notifications and let runtimes collaborate in Slack channels.","Communication","Connected","Internal Knowledge"],
    ["NO","Notion","Synchronize pages and databases as private knowledge sources.","Knowledge","Connected","Study Assistant"],
    ["GH","GitHub","Connect repositories, issues, pull requests, and technical documentation.","Developer","Available",""],
    ["GD","Google Drive","Index documents, folders, and shared drives for retrieval.","Knowledge","Available",""],
    ["LI","Linear","Create, update, and search issues from runtime tools.","Developer","Available",""],
    ["HS","HubSpot","Access customer records and automate CRM workflows.","CRM","Available",""],
    ["WH","Webhooks","Send signed runtime events to any HTTPS endpoint.","Developer","Available",""],
    ["SF","Salesforce","Read customer records and trigger sales or support workflows.","CRM","Available",""],
    ["DS","Discord","Build community assistants and deliver runtime notifications.","Communication","Available",""],
    ["ST","Stripe","Look up customers, subscriptions, invoices, and payment events.","Payments","Available",""],
    ["SN","Sentry","Inspect application errors and connect runtime failures to incidents.","Observability","Available",""],
    ["PG","PostgreSQL","Query approved tables and use structured data as runtime context.","Database","Available",""],
    ["AW","AWS","Connect approved cloud resources, storage, and event services.","Infrastructure","Available",""],
  ];
  return <main className="main integrations-page">
    <header className="product-page-header"><div><span className="eyebrow">Connected services</span><h1>Integrations</h1><p>Browse services that runtimes can use for knowledge, actions, and events.</p></div><button className="primary-button"><Icon name="plus" size={14} /> Request integration</button></header>
    <section className="integration-summary"><div><span>Connected</span><strong>3</strong><small>Across 3 projects</small></div><div><span>Available</span><strong>8</strong><small>Ready to configure</small></div><div><span>Tool executions</span><strong>1,842</strong><small>This month</small></div></section>
    <div className="integration-browser"><div className="template-search"><Icon name="search" size={15} /><input placeholder="Search integrations" /></div><nav>{["All","Connected","Knowledge","Support","Developer","CRM"].map((item,index) => <button className={index === 0 ? "active" : ""} key={item}>{item}</button>)}</nav></div>
    <section className="integration-grid">{integrations.map(([initials,name,copy,category,status,project]) => <article className="integration-card" key={name}>
      <div className="integration-card-head"><span className={`integration-logo integration-${initials.toLowerCase()}`}><IntegrationIcon code={initials} /></span><span className={status === "Connected" ? "integration-status connected" : "integration-status"}>{status === "Connected" && <i />}{status}</span></div>
      <h2>{name}</h2><p>{copy}</p>
      <div className="integration-meta"><span>{category}</span>{project && <span>{project}</span>}</div>
      <footer><button onClick={() => openIntegration(initials, name)}>{status === "Connected" ? "Manage connection" : "View integration"} <Icon name="arrow" size={13} /></button></footer>
    </article>)}</section>
    <section className="integration-note"><Icon name="shield" size={17} /><div><strong>Connections stay project-scoped</strong><p>Credentials, permissions, and usage are isolated to the project where an integration is connected.</p></div><button onClick={() => navigate("projects")}>View projects <Icon name="arrow" size={13} /></button></section>
  </main>;
}

function IntegrationDetailPage({ code, name, navigate }: { code: string; name: string; navigate: (page: Page) => void }) {
  const connected = ["ZE","SL","NO"].includes(code);
  const capabilities = code === "ZE" ? [["Create tickets","Create and update Zendesk tickets safely."],["Customer lookup","Retrieve customer and organization context."],["Ticket search","Ground responses in previous support history."]] : code === "NO" ? [["Page sync","Index selected pages and databases."],["Incremental updates","Synchronize only content that changed."],["Permission mapping","Respect source access boundaries."]] : [["Runtime actions",`Allow runtimes to securely call approved ${name} actions.`],["Knowledge sync","Use selected content as grounded context."],["Event delivery","Receive service events inside Zyntry."]];
  return <main className="main integration-detail-page page-enter">
    <button className="back-link" onClick={() => navigate("integrations")}><span>←</span> All integrations</button>
    <header className="integration-detail-head"><div className="integration-detail-identity"><span className={`integration-logo integration-${code.toLowerCase()}`}><IntegrationIcon code={code} /></span><div><span className="eyebrow">Integration</span><h1>{name}</h1><p>Connect {name} to project runtimes for secure knowledge and actions.</p></div></div><div><span className={connected ? "integration-status connected" : "integration-status"}>{connected && <i />}{connected ? "Connected" : "Available"}</span><button className="primary-button">{connected ? "Manage connection" : `Connect ${name}`} <Icon name="arrow" size={14} /></button></div></header>
    <div className="integration-detail-layout">
      <section>
        <div className="integration-detail-section"><span className="eyebrow">Capabilities</span><h2>What this integration enables</h2><div className="capability-list">{capabilities.map(([title,copy],index) => <div key={title}><span><Icon name={index === 0 ? "tool" : index === 1 ? "book" : "activity"} size={16} /></span><div><strong>{title}</strong><p>{copy}</p></div></div>)}</div></div>
        <div className="integration-detail-section"><span className="eyebrow">Setup</span><h2>How connection works</h2><div className="setup-steps">{[["1","Choose a project","Connections and credentials stay isolated to one project."],["2","Authorize access",`Grant Zyntry only the required ${name} permissions.`],["3","Select capabilities","Choose the knowledge, tools, and events runtimes may use."]].map(([number,title,copy]) => <div key={number}><span>{number}</span><div><strong>{title}</strong><p>{copy}</p></div></div>)}</div></div>
      </section>
      <aside>
        <div className="integration-side-card"><h3>Connection details</h3><span><small>Authentication</small><strong>OAuth 2.0</strong></span><span><small>Scope</small><strong>Project</strong></span><span><small>Data handling</small><strong>Encrypted</strong></span><span><small>Availability</small><strong>Pro and above</strong></span></div>
        {connected && <div className="integration-side-card"><h3>Connected projects</h3><button onClick={() => navigate("project")}><span className="mini-glyph">CS</span><span><strong>Customer Support</strong><small>3 capabilities enabled</small></span><Icon name="arrow" size={13} /></button></div>}
        <div className="developer-callout"><Icon name="shield" size={15} /><div><strong>Project-level security</strong><p>Credentials are never shared with other projects.</p></div></div>
      </aside>
    </div>
  </main>;
}

function ProjectsPage({ navigate }: { navigate: (page: Page) => void }) {
  return <main className="main projects-directory">
    <header className="projects-directory-head"><div><span className="eyebrow">Workspace</span><h1>Projects</h1><p>Independent AI applications running on Zyntry.</p></div><button className="primary-button" onClick={() => navigate("create-project")}><Icon name="plus" size={14} /> New project</button></header>
    <div className="projects-directory-tools"><div className="template-search"><Icon name="search" size={14} /><input placeholder="Search projects" /></div><div className="filter-pills"><button className="active">All projects</button><button>Healthy</button><button>Needs attention</button></div><button className="sort-control">Last updated <Icon name="chevron" size={13} /></button></div>
    <section className="project-directory-list">
      {[
        ["CS","Customer Support","AI support infrastructure for customer-facing applications","Studio","2 runtimes","3 integrations","Healthy","Updated 12m ago","SA","Sulayman"],
        ["ST","Study Assistant","Personalized learning and knowledge retrieval","Free","1 runtime","1 integration","Healthy","Updated 1h ago","SA","Sulayman"],
        ["IK","Internal Knowledge","Private company knowledge and employee assistance","Studio","3 runtimes","4 integrations","Attention needed","Updated yesterday","MK","Maya"],
      ].map(([initials,name,description,plan,runtimes,integrations,status,updated,ownerInitials,owner]) => <button className="project-directory-row" onClick={() => navigate("project")} key={name}>
        <span className="project-profile"><span className="project-profile-mark">{initials}</span><span><strong>{name}</strong><small>{description}</small></span></span>
        <span className="project-directory-details"><span><small>Plan</small><strong>{plan}</strong></span><span><small>Infrastructure</small><strong>{runtimes} · {integrations}</strong></span></span>
        <span className={`health ${status !== "Healthy" ? "warning" : ""}`}><i />{status}</span>
        <span className="project-owner"><span className="avatar">{ownerInitials}</span><span><small>{updated}</small><strong>{owner}</strong></span></span>
        <Icon name="arrow" size={15} />
      </button>)}
    </section>
  </main>;
}

function EmptyPanel({ name }: { name: string }) {
  return <div className="content-panel empty-panel"><span className="empty-icon"><Icon name={name === "Playground" ? "play" : "settings"} /></span><h2>{name}</h2><p>This area is ready for your project configuration.</p><button className="quiet-button">Explore {name.toLowerCase()} <Icon name="arrow" size={14} /></button></div>;
}

function CreateRuntimePage({ initialPrompt, navigate }: { initialPrompt: string; navigate: (page: Page) => void }) {
  const [stage, setStage] = useState(initialPrompt ? 1 : 0);
  const [reply, setReply] = useState("");
  const [messages, setMessages] = useState<{ from: "user" | "zyntry"; text: string }[]>(initialPrompt ? [
    { from: "user", text: initialPrompt },
    { from: "zyntry", text: "I can build that. Should this runtime create support tickets automatically, or ask for confirmation first?" },
  ] : [
    { from: "zyntry", text: "What should this runtime do? Describe the users it helps, the knowledge it needs, and any actions it should take." },
  ]);

  const sendReply = () => {
    if (!reply.trim()) return;
    const answer = reply.trim();
    setReply("");
    if (stage === 0) {
      setMessages((current) => [...current, { from: "user", text: answer }, { from: "zyntry", text: "Understood. Should actions happen automatically, or should the user confirm before tools run?" }]);
      setStage(1);
    } else {
      setMessages((current) => [...current, { from: "user", text: answer }, { from: "zyntry", text: "Perfect. I’ve applied that behavior and finished the runtime draft. Choose where it should live and the project plan on the right." }]);
      setStage(2);
    }
  };

  return (
    <main className="main create-runtime-page">
      <header className="builder-topbar">
        <button className="back-link" onClick={() => navigate("home")}><span>←</span> Back home</button>
        <div><span className="eyebrow">Runtime builder</span><h1>Create a runtime</h1></div>
        <span className="builder-status"><i />Draft saved</span>
      </header>
      <div className="builder-layout">
        <section className="chat-pane">
          <div className="chat-heading"><div className="zyntry-avatar"><Icon name="spark" size={17} /></div><div><h2>Build with Zyntry</h2><p>Describe the outcome. We’ll handle the infrastructure.</p></div></div>
          <div className="chat-thread">
            {messages.map((message, index) => <div className={`chat-message ${message.from}`} key={`${message.from}-${index}`}>
              {message.from === "zyntry" && <span className="message-avatar"><Icon name="spark" size={13} /></span>}
              <div><span>{message.from === "zyntry" ? "Zyntry" : "You"}</span><p>{message.text}</p>{message.from === "zyntry" && <div className="chat-response-metrics"><span><Icon name="activity" size={11} />684ms</span><span>1.2K tokens</span><span className="valid"><Icon name="check" size={11} />Validated</span></div>}</div>
            </div>)}
            {stage === 2 && <div className="understood chat-complete"><span><Icon name="check" size={15} /></span><p><strong>Draft complete</strong><br />Project and plan selection are now available.</p></div>}
          </div>
          {stage < 2 && <div className="chat-input">
            <textarea value={reply} onChange={(event) => setReply(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendReply(); } }} placeholder={stage === 0 ? "Describe your runtime…" : "Type your answer…"} rows={1} />
            <button onClick={sendReply} aria-label="Send answer"><Icon name="send" size={16} /></button>
          </div>}
        </section>
        <aside className="build-panel">
          <div className="build-panel-head"><div><span className="eyebrow">Live draft</span><h2>Customer Support Runtime</h2></div><span className={stage === 2 ? "draft-ready ready" : "draft-ready"}>{stage === 2 ? "Ready" : "Configuring"}</span></div>
          <div className="draft-summary">
            {[["Purpose", "Answer questions and create tickets"], ["Routing", "Automatic · Balanced"], ["Knowledge", "Private documentation"], ["Memory", "Session"], ["Tools", "Zendesk"], ["Security", "Standard"]].map(([label, value]) => <button key={label}><span>{label}</span><strong>{value}</strong><Icon name="arrow" size={14} /></button>)}
          </div>
          <div className="draft-footer-note"><Icon name="shield" size={15} /><span><strong>Safe defaults applied</strong><small>You can change every setting after creation.</small></span></div>
          <button className="primary-button create-runtime-action" disabled={stage < 2} onClick={() => navigate("assign-project")}>{stage < 2 ? "Answer the question to continue" : "Continue to project"} <Icon name="arrow" size={16} /></button>
        </aside>
      </div>
    </main>
  );
}

function ProjectAssignmentPage({ navigate }: { navigate: (page: Page) => void }) {
  const [project, setProject] = useState("Customer Support");
  return (
    <main className="main plan-page">
      <header className="plan-page-header">
        <button className="back-link" onClick={() => navigate("create")}><span>←</span> Back to runtime draft</button>
        <div className="creation-steps"><span className="done"><i><Icon name="check" size={11} /></i>Describe</span><b /><span className="active"><i>2</i>Choose project</span></div>
        <span />
      </header>
      <section className="plan-intro">
        <span className="eyebrow">One last step</span>
        <h1>Choose where this runtime lives</h1>
        <p>The runtime will inherit its project’s existing settings, access, and limits.</p>
      </section>
      <section className="assignment-card">
        <div className="assignment-card-head"><div><h2>Existing projects</h2><p>Select the application this runtime belongs to.</p></div><button onClick={() => navigate("create-project")}><Icon name="plus" size={14} /> New project</button></div>
        {projects.map((item) => <button className={project === item.name ? "project-choice selected" : "project-choice"} onClick={() => setProject(item.name)} key={item.name}><span className="project-glyph">{item.name.slice(0,2).toUpperCase()}</span><span><strong>{item.name}</strong><small>{item.runtimes} runtimes · {item.status}</small></span><span className="choice-check">{project === item.name && <Icon name="check" size={13} />}</span></button>)}
      </section>
      <footer className="plan-footer">
        <div><span>Save runtime to</span><strong>{project}</strong></div>
        <button className="primary-button" onClick={() => navigate("runtime")}>Create runtime <Icon name="arrow" size={16} /></button>
      </footer>
    </main>
  );
}

function CreateProjectPage({ navigate }: { navigate: (page: Page) => void }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("Customer application");
  const [plan, setPlan] = useState("Pro");
  return <main className="main create-project-page">
    <header className="plan-page-header">
      <button className="back-link" onClick={() => navigate("projects")}><span>←</span> Back to projects</button>
      <div className="creation-steps"><span className={step > 1 ? "done" : "active"}><i>{step > 1 ? <Icon name="check" size={11} /> : "1"}</i>Project details</span><b /><span className={step > 2 ? "done" : step === 2 ? "active" : ""}><i>{step > 2 ? <Icon name="check" size={11} /> : "2"}</i>Review</span><b /><span className={step === 3 ? "active" : ""}><i>3</i>Choose plan</span></div><span />
    </header>
    <section className={`project-create-shell ${step === 3 ? "plan-step" : ""}`}>
      <div className="project-create-intro"><span className="eyebrow">New project</span><h1>{step === 1 ? "Create a home for your application" : step === 2 ? "Review your project" : "Choose a plan"}</h1><p>{step === 1 ? "Projects keep runtimes, integrations, usage, and team access together." : step === 2 ? "Confirm the project details before choosing its plan." : "Every runtime in this project will inherit these features and limits."}</p></div>
      {step === 1 ? <div className="project-details-card">
        <label>Project name<input autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Customer Support" /><small>This is visible to everyone in the project.</small></label>
        <label>What are you building?</label>
        <div className="purpose-options">{["Customer application","Internal tool","Prototype","Research"].map((item) => <button className={purpose === item ? "selected" : ""} onClick={() => setPurpose(item)} key={item}><span className="choice-check">{purpose === item && <Icon name="check" size={12} />}</span>{item}</button>)}</div>
        <label>Description <span>Optional</span><textarea placeholder="A short description of this application…" rows={3} /></label>
        <div className="project-create-footer"><span>You’ll choose the project plan in the final step.</span><button className="primary-button" disabled={!name.trim()} onClick={() => setStep(2)}>Continue <Icon name="arrow" size={14} /></button></div>
      </div> : step === 2 ? <div className="project-review-card">
        <div className="review-project-title"><span className="large-glyph">{name.slice(0,2).toUpperCase()}</span><span><strong>{name}</strong><small>{purpose}</small></span><button onClick={() => setStep(1)}>Edit</button></div>
        <div className="review-includes"><h3>Your project starts empty</h3><p>Create a runtime, open Playground, or invite teammates whenever you’re ready.</p><div>{[["activity","Runtimes","AI systems for this application"],["link","Integrations","Connected services and providers"],["projects","Members","People with project access"]].map(([icon,title,copy]) => <span key={title}><Icon name={icon as IconName} size={15} /><span><strong>{title}</strong><small>{copy}</small></span></span>)}</div></div>
        <div className="project-create-footer"><button className="secondary-button" onClick={() => setStep(1)}>Back</button><button className="primary-button" onClick={() => setStep(3)}>Continue to plan <Icon name="arrow" size={14} /></button></div>
      </div> : <div className="project-plan-card full-plan-selection">
        <div className="pricing-grid">{[
          { name: "Free", price: "$0", suffix: "/project", best: "Explore Zyntry and validate an idea", features: ["1 active runtime", "1 project member", "Zyntry free-capacity model", "1,000 requests per month", "Up to 10 connected documents", "Basic Playground access", "Community support"] },
          { name: "Pro", price: "$9", suffix: "/project/month", best: "Build seriously as an individual", features: ["3 active runtimes", "2 project members", "Multiple models and manual selection", "Knowledge, RAG, and memory", "Basic automatic routing", "API tokens and SDK access", "7-day logs and usage ledger"], recommended: true },
          { name: "Studio", price: "$19", suffix: "/project/month", best: "Run a production AI application", features: ["More runtimes and team members", "Advanced routing and fallbacks", "External Search, tools, and MCP", "Custom integrations and webhooks", "Detailed traces and cost analytics", "Snapshots and runtime history", "30-day activity retention"] },
          { name: "Enterprise", price: "Custom", suffix: "", best: "Operate AI infrastructure at company scale", features: ["Custom limits and retention", "Regional deployment controls", "Failover and private infrastructure", "Organization security policies", "Audit and governance controls", "Custom deployment requirements", "SLA and dedicated support"] },
        ].map((item) => <button className={`pricing-card ${plan === item.name ? "selected" : ""}`} onClick={() => setPlan(item.name)} key={item.name}>
          {item.recommended && <span className="recommended-label">Recommended</span>}
          <span className="pricing-radio"><i /></span>
          <span className="plan-name">{item.name}</span>
          <span className="plan-price">{item.price}<small>{item.suffix}</small></span>
          <span className="plan-best">{item.best}</span>
          <span className="plan-divider" />
          <span className="feature-list">{item.features.map((feature) => <span key={feature}><Icon name="check" size={13} />{feature}</span>)}</span>
        </button>)}</div>
        <div className="project-create-footer"><button className="secondary-button" onClick={() => setStep(2)}>Back</button><span className="selected-plan-summary"><small>Selected plan</small><strong>{plan}</strong></span><button className="primary-button" onClick={() => navigate("project")}>{plan === "Enterprise" ? "Contact sales" : "Create project"} <Icon name="arrow" size={14} /></button></div>
      </div>}
    </section>
  </main>;
}

function CreateDrawer({ close, navigate }: { close: () => void; navigate: (page: Page) => void }) {
  const [step, setStep] = useState(1);
  return <div className="overlay" onMouseDown={close}><aside className="create-drawer" onMouseDown={(e) => e.stopPropagation()}>
    <div className="drawer-head"><div><span className="eyebrow">New runtime</span><h2>{step === 1 ? "Runtime draft" : "Save runtime to a project"}</h2></div><button className="icon-button" onClick={close} aria-label="Close"><Icon name="close" /></button></div>
    {step === 1 ? <>
      <div className="understood"><span><Icon name="spark" size={16} /></span><p><strong>I’ve mapped your runtime.</strong><br />You can refine anything later.</p></div>
      <div className="draft-title"><span>CS</span><div><strong>Customer Support Runtime</strong><small>Ready to create</small></div></div>
      <div className="draft-list">{[["Purpose", "Answer questions and create support tickets"], ["Routing", "Automatic · Balanced"], ["Knowledge", "Private documentation"], ["Memory", "Session"], ["External Search", "Off"], ["Tools", "Zendesk"], ["Security", "Standard"]].map(([name, value]) => <button key={name}><span>{name}</span><strong>{value}</strong><Icon name="arrow" size={15} /></button>)}</div>
      <button className="advanced-row">Advanced settings <span>6 configured automatically</span><Icon name="chevron" size={15} /></button>
      <div className="drawer-footer"><button className="primary-button wide" onClick={() => setStep(2)}>Continue <Icon name="arrow" size={16} /></button></div>
    </> : <>
      <label className="field-label">Save runtime to</label>
      <button className="select-control"><span><span className="mini-glyph">CS</span><strong>Customer Support</strong></span><Icon name="chevron" size={15} /></button>
      <div className="or-divider"><span>or</span></div>
      <button className="new-project-row"><Icon name="plus" size={16} /> Create new project</button>
      <div className="plan-note"><Icon name="check" size={16} /><span><strong>Studio plan active</strong><small>This runtime inherits the project’s features and limits.</small></span></div>
      <div className="drawer-footer"><button className="secondary-button" onClick={() => setStep(1)}>Back</button><button className="primary-button grow" onClick={() => { close(); navigate("runtime"); }}>Create runtime <Icon name="arrow" size={16} /></button></div>
    </>}
  </aside></div>;
}

function AuthPage({ mode, navigate }: { mode: "signin" | "signup" | "forgot" | "verify"; navigate: (page: Page) => void }) {
  const content = {
    signin: { eyebrow: "Welcome back", title: "Sign in to Zyntry", copy: "Continue operating your AI infrastructure." },
    signup: { eyebrow: "Get started", title: "Create your account", copy: "Build and operate your first AI application." },
    forgot: { eyebrow: "Account recovery", title: "Reset your password", copy: "We’ll send a verification code to your email." },
    verify: { eyebrow: "Check your inbox", title: "Enter verification code", copy: "We sent a six-digit code to sulayman@example.com." },
  }[mode];
  return <main className="auth-shell">
    <section className="auth-visual">
      <button className="auth-brand" onClick={() => navigate("auth-signin")}><span className="brand-mark"><span /></span><strong>Zyntry</strong></button>
      <div className="auth-visual-content"><span className="eyebrow">Production AI infrastructure</span><h1>Simple by default.<br />Deep when needed.</h1><p>Models, knowledge, tools, routing, and observability—operated as one calm runtime.</p><div className="auth-runtime-map"><span className="auth-runtime-core"><Icon name="spark" size={19} /></span><span className="auth-map-node node-a"><Icon name="route" size={14} />Routing</span><span className="auth-map-node node-b"><Icon name="book" size={14} />Knowledge</span><span className="auth-map-node node-c"><Icon name="tool" size={14} />Tools</span><span className="auth-map-node node-d"><Icon name="shield" size={14} />Policies</span><i className="auth-map-line line-a" /><i className="auth-map-line line-b" /><i className="auth-map-line line-c" /><i className="auth-map-line line-d" /></div></div>
      <footer><span>AI runtime infrastructure for production applications</span><span>zyntry.com</span></footer>
    </section>
    <section className="auth-form-side">
      <div className="auth-mobile-brand"><span className="brand-mark"><span /></span><strong>Zyntry</strong></div>
      <div className="auth-form-card">
        <header><span className="eyebrow">{content.eyebrow}</span><h2>{content.title}</h2><p>{content.copy}</p></header>
        {mode === "signin" && <div className="auth-fields">
          <button className="oauth-button"><span>G</span>Continue with Google</button>
          <div className="auth-divider"><span>or continue with email</span></div>
          <label>Email address<input type="email" placeholder="you@company.com" /></label>
          <label><span>Password<button onClick={() => navigate("auth-forgot")}>Forgot password?</button></span><input type="password" placeholder="Enter your password" /></label>
          <label className="remember-row"><input type="checkbox" />Keep me signed in on this device</label>
          <button className="primary-button auth-submit" onClick={() => navigate("home")}>Sign in <Icon name="arrow" size={15} /></button>
          <p className="auth-switch">New to Zyntry? <button onClick={() => navigate("auth-signup")}>Create an account</button></p>
        </div>}
        {mode === "signup" && <div className="auth-fields">
          <button className="oauth-button"><span>G</span>Sign up with Google</button>
          <div className="auth-divider"><span>or use your work email</span></div>
          <label>Full name<input placeholder="Your name" /></label>
          <label>Work email<input type="email" placeholder="you@company.com" /></label>
          <label>Password<input type="password" placeholder="At least 8 characters" /><small>Use 8+ characters with a number and symbol.</small></label>
          <label className="remember-row"><input type="checkbox" />I agree to the Terms and Privacy Policy</label>
          <button className="primary-button auth-submit" onClick={() => navigate("auth-verify")}>Create account <Icon name="arrow" size={15} /></button>
          <p className="auth-switch">Already have an account? <button onClick={() => navigate("auth-signin")}>Sign in</button></p>
        </div>}
        {mode === "forgot" && <div className="auth-fields auth-recovery">
          <span className="auth-state-icon"><Icon name="key" size={19} /></span>
          <label>Email address<input type="email" placeholder="you@company.com" /></label>
          <button className="primary-button auth-submit" onClick={() => navigate("auth-verify")}>Send verification code <Icon name="arrow" size={15} /></button>
          <button className="auth-back" onClick={() => navigate("auth-signin")}>← Back to sign in</button>
        </div>}
        {mode === "verify" && <div className="auth-fields auth-recovery">
          <span className="auth-state-icon"><Icon name="shield" size={19} /></span>
          <div className="verification-code">{[0,1,2,3,4,5].map((index) => <input key={index} inputMode="numeric" maxLength={1} aria-label={`Digit ${index + 1}`} />)}</div>
          <button className="primary-button auth-submit" onClick={() => navigate("home")}>Verify and continue <Icon name="arrow" size={15} /></button>
          <p className="auth-switch">Didn’t receive it? <button>Send another code</button></p>
          <button className="auth-back" onClick={() => navigate("auth-forgot")}>← Change email address</button>
        </div>}
      </div>
      <footer className="auth-legal"><button>Privacy</button><button>Terms</button><button>Support</button></footer>
    </section>
  </main>;
}

export default function App({ initialPage = "home" }: { initialPage?: Page }) {
  const routerNavigate = useNavigate();
  const [page, setPage] = useState<Page>(initialPage);
  const [runtimePrompt, setRuntimePrompt] = useState("");
  const [projectTab, setProjectTab] = useState("Overview");
  const [developerPage, setDeveloperPage] = useState("API Tokens");
  const [accountSection, setAccountSection] = useState("Profile");
  const [integrationDetail, setIntegrationDetail] = useState({ code: "ZE", name: "Zendesk" });
  const navigate = (next: Page) => {
    const authPaths: Partial<Record<Page, string>> = { "auth-signin": "/sign-in", "auth-signup": "/create-account", "auth-forgot": "/forgot-password", "auth-verify": "/verify" };
    if (authPaths[next]) {
      routerNavigate(authPaths[next]!, { viewTransition: true });
      return;
    }
    if (page.startsWith("auth-")) {
      routerNavigate("/", { viewTransition: true });
      return;
    }
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const startCreate = (prompt = "") => { setRuntimePrompt(prompt); navigate("create"); };
  const utilityPage = page === "playground" ? ["Playground", "Experiment with models, prompts and runtime behavior."] : page === "templates" ? ["Templates", "Start from a proven AI runtime pattern."] : page === "docs" ? ["Documentation", "Guides and references for building with Zyntry."] : ["Account settings", "Manage your profile, security, appearance, and notifications."];
  const openAccount = (section: string) => { setAccountSection(section); navigate("settings"); };
  const openIntegration = (code: string, name: string) => { setIntegrationDetail({ code, name }); navigate("integration-detail"); };
  if (page === "auth-signin") return <AuthPage mode="signin" navigate={navigate} />;
  if (page === "auth-signup") return <AuthPage mode="signup" navigate={navigate} />;
  if (page === "auth-forgot") return <AuthPage mode="forgot" navigate={navigate} />;
  if (page === "auth-verify") return <AuthPage mode="verify" navigate={navigate} />;
  return <div className="app-shell"><Sidebar page={page} navigate={navigate} projectTab={projectTab} setProjectTab={setProjectTab} developerPage={developerPage} setDeveloperPage={setDeveloperPage} openAccount={openAccount} />{page === "home" ? <Home navigate={navigate} startCreate={startCreate} /> : page === "create" ? <CreateRuntimePage initialPrompt={runtimePrompt} navigate={navigate} /> : page === "assign-project" ? <ProjectAssignmentPage navigate={navigate} /> : page === "create-project" ? <CreateProjectPage navigate={navigate} /> : page === "project" ? <ProjectPage navigate={navigate} tab={projectTab} developerPage={developerPage} setDeveloperPage={setDeveloperPage} /> : page === "runtime" ? <RuntimePage navigate={navigate} /> : page === "playground" ? <PlaygroundPage /> : page === "templates" ? <TemplatesPage startCreate={startCreate} /> : page === "integrations" ? <IntegrationsPage navigate={navigate} openIntegration={openIntegration} /> : page === "integration-detail" ? <IntegrationDetailPage code={integrationDetail.code} name={integrationDetail.name} navigate={navigate} /> : page === "settings" ? <AccountSettings section={accountSection} setSection={setAccountSection} /> : page === "projects" ? <ProjectsPage navigate={navigate} /> : <main className="main inner-main standalone"><header><span className="eyebrow">Zyntry Console</span><h1>{utilityPage[0]}</h1><p>{utilityPage[1]}</p></header><EmptyPanel name={utilityPage[0]} /></main>}</div>;
}
