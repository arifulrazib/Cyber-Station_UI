/**
 * Homepage content. Every string is copied verbatim from the live site
 * (https://cyberstation.brainstation-23.com/). Do not add or reword copy here
 * without sign-off — see ../../CLAUDE.md.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface LiveEvent {
  text: string;
  tag: string;
}

export interface Problem {
  title: string;
  body: string;
}

export interface Step {
  num: string;
  key: string;
  title: string;
  body: string;
  tags: readonly string[];
}

export interface Stat {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  /** Render verbatim instead of counting (e.g. "24×7"). */
  literal?: string;
}

export interface SocMetric {
  value: string;
  label: string;
}

export interface SocEvent {
  title: string;
  meta: string;
  status: string;
}

export interface Threat {
  value: number;
  suffix: string;
  body: string;
  source: string;
}

export const nav: readonly NavItem[] = [
  { label: "Platform", href: "#platform" },
  { label: "Services", href: "#programmes" },
  { label: "Resources", href: "#insights" },
  { label: "Org Protect", href: "#org-protect" },
  { label: "DarkWatch", href: "#darkwatch" },
  { label: "ComplianceOS", href: "#complianceos" },
  { label: "CSIRT", href: "#csirt" },
];

export const hero = {
  eyebrow: "Brain Station 23 Cybersecurity",
  badge: "Live service view",
  title: "Security programmes that prove, price & improve your cyber posture.",
  body: "CyberStation turns assessment, hardening, managed SOC, compliance and training into a visible operating system for security leaders — with a live scope, a transparent estimate and board-ready proof.",
  cta: "Get a personalized demo",
  secondaryCta: "Schedule a call",
  trust: [
    "Loved on Clutch",
    "50+ security engagements",
    "Wazuh Gold Partner",
    "24×7 Wazuh-powered SOC",
    "Feature-level pricing",
    "ISO · SOC 2 · PCI readiness",
  ],
} as const;

export const liveEvents: readonly LiveEvent[] = [
  { text: "Credential-stuffing blocked", tag: "identity" },
  { text: "Anomalous S3 access flagged", tag: "cloud" },
  { text: "EDR signatures updated", tag: "endpoint" },
  { text: "Ransomware payload quarantined", tag: "mdr" },
  { text: "Privilege-escalation attempt triaged", tag: "iam" },
  { text: "Patch verified · CVE-2026-1182", tag: "vuln" },
  { text: "Phishing domain sinkholed", tag: "intel" },
  { text: "BOLA probe rejected", tag: "api" },
  { text: "Firewall policy synced", tag: "network" },
  { text: "Impossible-travel login challenged", tag: "identity" },
  { text: "ISO 27001 evidence archived", tag: "grc" },
  { text: "C2 callback severed", tag: "soc" },
];

export const clients = {
  label: "Trusted by fast-moving teams — from startups to enterprises",
  names: ["Syngenta", "Virtual Affairs", "Vallie", "Robi", "Tennant", "VEON", "Sanofi", "City Bank", "Shwapno", "Banglalink", "IIITK"],
  footnote: "ISO 9001 · ISO 27001 · CMMI DEV ML3 · Wazuh Gold Partner · serving 30+ countries",
} as const;

export const problem = {
  eyebrow: "The buyer problem",
  title: "Cybersecurity gets messy when every service is a separate PDF, tool and quote.",
  body: "Point tools, annual pentests and scattered evidence don't add up to a posture anyone can defend.",
  items: [
    { title: "Static annual reports", body: "Findings die in PDFs before engineering and leadership can act." },
    { title: "Disconnected tools", body: "Scanner, SOC, GRC and training data stay isolated instead of forming one security picture." },
    { title: "No priority language", body: "Security issues are listed technically, not ranked by business impact and remediation path." },
    { title: "Opaque pricing", body: "Buyers cannot tell what changes the estimate, what is included, or what to remove." },
    { title: "Evidence scramble", body: "Compliance proof is recreated each audit cycle instead of continuously maintained." },
  ] satisfies Problem[],
  noise: [
    "70+ new CVEs published every day",
    "Shadow APIs and forgotten subdomains",
    "Alert fatigue across isolated dashboards",
    "Auditors asking for proof you don't have",
    "Cloud misconfigs sitting for months",
    "Stolen credentials traded before you know",
    "Budgets approved without visible scope",
  ],
  resolve: "CyberStation turns that chaos into one programme — scoped, priced and monitored from a single console.",
} as const;

export const approach = {
  eyebrow: "CyberStation approach",
  title: "Turn security services into a visible operating loop.",
  body: "We don't just sell pentests, hardening or SOC hours — we operate a measurable programme from scope to remediation.",
  steps: [
    { num: "01", key: "Scope", title: "Choose the right programme", body: "The guided advisor maps goals, assets and compliance pressure to a recommended scope.", tags: ["SOC", "GRC", "PENTEST"] },
    { num: "02", key: "Discover", title: "Find real exposure", body: "Combine offensive testing, posture checks, telemetry and dark-web signals.", tags: ["APPS", "CLOUD", "IDENTITY"] },
    { num: "03", key: "Remediate", title: "Move findings to owners", body: "Push prioritized work into engineering, IT, compliance and management rituals.", tags: ["JIRA", "SLACK", "EVIDENCE"] },
    { num: "04", key: "Prove", title: "Report posture continuously", body: "Show the board what changed, which risks remain and what next month funds.", tags: ["SCORE", "SLA", "AUDIT"] },
  ] satisfies Step[],
} as const;

export const stats: readonly Stat[] = [
  { value: 19, suffix: "+", label: "Years since 2006" },
  { value: 850, suffix: "+", label: "Tech professionals" },
  { value: 50, suffix: "+", label: "Security engagements" },
  { value: 30, suffix: "+", label: "Countries served" },
  { value: 24, suffix: "", label: "Managed SOC", literal: "24×7" },
  { value: 6, suffix: "", label: "Global offices" },
];

export const soc = {
  eyebrow: "Managed detection & response",
  title: "A 24×7 SOC — with the SLAs in writing.",
  console: "soc.cyberstation",
  live: "Live",
  events: [
    { title: "Credential-stuffing attempt blocked", meta: "identity · authentication", status: "Contained" },
    { title: "Anomalous S3 access flagged", meta: "cloud · AWS", status: "Triaged" },
    { title: "EDR signature set updated", meta: "endpoint · fleet", status: "Auto" },
  ] satisfies SocEvent[],
  metrics: [
    { value: "<30m", label: "MTTD" },
    { value: "<4h", label: "MTTR" },
    { value: "99%+", label: "ATT&CK" },
  ] satisfies SocMetric[],
  body: "Open-source XDR we contribute to as an official Wazuh Gold Partner — dedicated analysts watching your environment around the clock, with no licensing lock-in.",
  features: [
    { title: "24×7 monitoring & triage", body: "Continuous detection, alert triage and incident response." },
    { title: "MITRE ATT&CK coverage", body: "99%+ technique coverage, mapped and reported." },
    { title: "Dedicated analysts in Slack", body: "A named team that knows your stack and context." },
    { title: "Threat-intel & rule tuning", body: "Detections tuned continuously to your risk." },
    { title: "Monthly posture reporting", body: "Clear incidents, trends and board-ready metrics." },
    { title: "No licensing lock-in", body: "You own your stack and your data — always." },
  ],
} as const;

export const landscape = {
  eyebrow: "Why it matters",
  title: "The threat landscape, in numbers.",
  body: "Why a proactive, tested security programme pays for itself.",
  items: [
    { value: 277, suffix: " days", body: "Average breach lifecycle — fast root-cause response saves up to $1.76M per incident.", source: "IBM Cost of a Data Breach 2023" },
    { value: 42, suffix: "%", body: "Of breaches involve stolen credentials, enabling weeks of undetected lateral movement.", source: "Verizon DBIR 2024" },
    { value: 400, suffix: "%", body: "Increase in API attack traffic targeting business-logic and BOLA flaws.", source: "Salt Security 2024" },
    { value: 80, suffix: "%", body: "Of cloud breaches stem from IAM and S3 misconfigurations — and take longer to spot.", source: "Palo Alto Networks 2024" },
  ] satisfies Threat[],
} as const;

export const cta = {
  eyebrow: "Talk to our security team",
  title: "Let's make your business hard to breach.",
  body: "Talk to our security team about an assessment, a managed SOC, or a full programme — and see what we can secure together.",
  button: "Schedule a call",
} as const;

export const footer = {
  tagline: "One Partner. Complete Security. A 24×7 Wazuh-powered SOC and nine integrated security practices, delivered globally from Dhaka.",
  columns: [
    { heading: "Platform", links: ["Security practices", "Managed SOC"] },
    { heading: "Company", links: ["About Brain Station 23", "Case studies", "Cyber security", "Contact"] },
  ],
  contact: {
    heading: "Contact",
    email: "cyberstation@brainstation-23.com",
    phone: "+880 1404 055226",
    web: "cyberstation.brainstation-23.com",
  },
  legal: "© 2026 Brain Station 23 · Dhaka HQ + 6 global offices · Pricing is indicative for planning, not final commercial policy.",
  badges: ["ISO 9001", "ISO 27001", "CMMI DEV ML3", "Wazuh Gold Partner"],
} as const;
