export const services = [
  {
    id: "01",
    title: "Cross-Platform App Development",
    body: "One React Native codebase that produces two apps nobody can tell were shared. Native gestures, platform-correct navigation, and the small details — haptics, safe areas, keyboard behaviour — that separate a real app from a wrapped website.",
    deliverables: ["iOS & Android from one codebase", "Native modules where needed", "Store-ready builds"],
  },
  {
    id: "02",
    title: "Mobile Architecture & Rescue",
    body: "For codebases that grew faster than their structure. I map what's there, isolate what's load-bearing, and migrate incrementally while the app stays shipping — the way I moved a legacy real-estate platform onto modern React Native without pausing releases.",
    deliverables: ["Architecture audit", "Incremental migration plan", "New Architecture readiness"],
  },
  {
    id: "03",
    title: "Performance Engineering",
    body: "Frame drops, memory leaks, and slow starts are diagnosable problems, not facts of life. I profile on real mid-range devices — not a top-end simulator — and fix the render budget, the list virtualisation, and the bridge traffic causing it.",
    deliverables: ["Real-device profiling", "60fps interaction budget", "Startup & memory tuning"],
  },
  {
    id: "04",
    title: "Payments & Monetisation",
    body: "Stripe, Apple In-App Purchases, and Google Play Billing, including the parts most integrations get wrong: receipt validation, restore flows, subscription state, and failures that resume cleanly instead of double-charging.",
    deliverables: ["Card & subscription billing", "IAP with receipt validation", "Idempotent payment flows"],
  },
  {
    id: "05",
    title: "Real-Time Features",
    body: "Chat, presence, and video that work on a train, not just on office wifi. Connection state machines tied to the app lifecycle, replay after backgrounding, and graceful degradation instead of a dead screen.",
    deliverables: ["WebRTC audio & video", "Socket messaging & presence", "Offline-tolerant sync"],
  },
  {
    id: "06",
    title: "Release & Store Strategy",
    body: "Getting to 'Ready for Sale' is its own discipline. Signing, provisioning, staged rollouts, privacy declarations, and the review rejections you argue your way through — I've done it 20+ times on both stores.",
    deliverables: ["App Store & Play submission", "CI/CD pipelines", "Staged rollout & monitoring"],
  },
];

/** The working method shown as a process timeline. */
export const process = [
  {
    step: "01",
    title: "Understand",
    body: "What the product is actually for, who it fails today, and which constraint is real versus assumed. Cheapest stage to change your mind.",
  },
  {
    step: "02",
    title: "Architect",
    body: "Module boundaries, data flow, and the failure modes. Decided on purpose up front, because these are the choices that are expensive to reverse later.",
  },
  {
    step: "03",
    title: "Build",
    body: "Vertical slices that run on a real device from week one. Reviewable increments, not a six-week silence followed by a demo.",
  },
  {
    step: "04",
    title: "Harden",
    body: "Profile on mid-range hardware, break the network on purpose, and fix what surfaces. This is where apps stop feeling like prototypes.",
  },
  {
    step: "05",
    title: "Ship & Hold",
    body: "Store submission, staged rollout, crash monitoring, and a fast first patch. Launch is the start of the work, not the end of it.",
  },
];
