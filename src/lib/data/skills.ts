export type Skill = {
  name: string;
  /** Self-assessed depth, 0–100. Drives the meter width. */
  level: number;
  years: number;
  note: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  caption: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "core",
    label: "Core Mobile",
    caption: "The stack I reach for by default, and the one I'm hired for.",
    skills: [
      { name: "React Native", level: 96, years: 5, note: "Five years exclusively. New Architecture, native modules, the lot." },
      { name: "TypeScript", level: 92, years: 4, note: "Strict mode by default; types as the contract between layers." },
      { name: "React", level: 90, years: 5, note: "Shared mental model with the web clients I build alongside." },
      { name: "JavaScript", level: 94, years: 5, note: "Where it started — still what everything compiles down to." },
      { name: "Mobile Architecture", level: 90, years: 4, note: "Module boundaries, navigation trees, and data flow that survive a team." },
      { name: "Performance Optimisation", level: 88, years: 4, note: "List virtualisation, render budgets, memory profiling, 60fps as a requirement." },
    ],
  },
  {
    id: "state",
    label: "State & Data",
    caption: "Keeping the client honest when the network isn't.",
    skills: [
      { name: "Redux", level: 88, years: 5, note: "Including the migration path off it when it stopped earning its weight." },
      { name: "React Query", level: 85, years: 3, note: "Server state as cache, not as global state." },
      { name: "REST APIs", level: 92, years: 5, note: "Contract design, pagination, idempotency, and graceful failure." },
      { name: "Firebase", level: 87, years: 4, note: "Auth, Firestore, Cloud Messaging, Crashlytics." },
      { name: "WebSockets / Socket.io", level: 86, years: 4, note: "Live chat and presence that survive the mobile lifecycle." },
      { name: "WebRTC", level: 82, years: 3, note: "Video consultations built for rural networks." },
    ],
  },
  {
    id: "native",
    label: "Native Platform",
    caption: "Where React Native stops, I keep going.",
    skills: [
      { name: "Native iOS", level: 80, years: 4, note: "Swift bridging, CocoaPods, signing, capabilities, App Store review." },
      { name: "Native Android", level: 80, years: 4, note: "Kotlin bridging, Gradle, permissions, Play Console." },
      { name: "Swift", level: 74, years: 3, note: "Native modules and platform APIs React Native doesn't expose." },
      { name: "Kotlin", level: 72, years: 3, note: "Same, on the Android side." },
      { name: "Device Sensors", level: 84, years: 3, note: "Magnetometer, accelerometer, camera — shipped in diagnostics and Qibla features." },
    ],
  },
  {
    id: "delivery",
    label: "Ship & Operate",
    caption: "Writing it is half the job. Getting it live is the other half.",
    skills: [
      { name: "App Store Deployment", level: 92, years: 5, note: "20+ submissions, including rejections argued and won." },
      { name: "Google Play Deployment", level: 92, years: 5, note: "Staged rollouts, signing, and pre-launch reports." },
      { name: "CI/CD", level: 82, years: 3, note: "Automated builds and distribution so releases aren't a person." },
      { name: "Git", level: 93, years: 5, note: "Trunk-based where it fits, review discipline everywhere." },
      { name: "Stripe & In-App Purchases", level: 88, years: 4, note: "Subscriptions, receipt validation, restore, and refund paths." },
      { name: "Testing & Debugging", level: 84, years: 4, note: "Jest, Flipper, React Native Debugger, and real-device profiling." },
    ],
  },
];

/** Flat marquee list for the technology band. */
export const techMarquee = [
  "React Native",
  "TypeScript",
  "React",
  "Redux",
  "React Query",
  "Firebase",
  "WebRTC",
  "Socket.io",
  "Swift",
  "Kotlin",
  "Xcode",
  "Android Studio",
  "Gradle",
  "CocoaPods",
  "Stripe",
  "Jest",
  "Node.js",
  "MongoDB",
  "AWS",
  "Git",
  "Next.js",
  "Tailwind CSS",
];

export const toolbelt = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Swift", "Kotlin", "SQL", "HTML/CSS"] },
  { group: "Frameworks", items: ["React Native", "React", "Next.js", "Redux", "React Query", "Nest.js"] },
  { group: "Mobile Tooling", items: ["Xcode", "Android Studio", "Gradle", "CocoaPods", "Fastlane", "Flipper"] },
  { group: "Backend & Cloud", items: ["Node.js", "Firebase", "MongoDB", "AWS", "REST", "WebSockets"] },
  { group: "Payments", items: ["Stripe", "Apple IAP", "Google Play Billing", "Social Login"] },
  { group: "Workflow", items: ["Git", "GitHub", "Bitbucket", "Postman", "Jest", "Cursor"] },
];
