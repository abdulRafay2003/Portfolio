export type Role = {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const roles: Role[] = [
  {
    company: "Digital Gravity",
    title: "Senior React Native Engineer",
    location: "Karachi, PK",
    start: "2025-06",
    end: "",
    period: "Jun 2025 — Present",
    current: true,
    summary:
      "Leading mobile engineering on a large real-estate platform, modernising a legacy codebase while it stays live in the stores.",
    highlights: [
      "Migrated a legacy real-estate app to the current React Native architecture — New Architecture readiness, modern navigation, and a typed data layer — without pausing feature delivery.",
      "Designed and shipped In-App Purchases alongside multiple regional payment methods, covering the receipt validation and restore paths most integrations skip.",
      "Set the mobile technical direction: module boundaries, review standards, and a release process the team can run without me.",
    ],
    stack: ["React Native", "TypeScript", "In-App Purchases", "Native Modules", "CI/CD"],
  },
  {
    company: "Koder360",
    title: "React Native Engineer",
    location: "Karachi, PK",
    start: "2023-09",
    end: "2025-05",
    period: "Sep 2023 — May 2025",
    summary:
      "Built consumer marketplace and hardware-facing products end to end, from first commit to store release.",
    highlights: [
      "Built a digital marketplace for buying and selling mobile devices, including business and personal profile management, listings, and the transaction flow.",
      "Integrated Facebook and Google social login, cutting sign-up to a single tap and removing the biggest drop-off in onboarding.",
      "Developed a device diagnostics app that exercises hardware sensors directly to verify handset condition — accelerometer, gyroscope, camera, touch, and audio paths.",
      "Owned App Store and Google Play submissions, including review responses and staged rollouts.",
    ],
    stack: ["React Native", "TypeScript", "Firebase", "Native Modules", "Google AdMob"],
  },
  {
    company: "Tech Verticks",
    title: "Associate React Native Engineer",
    location: "Karachi, PK",
    start: "2021-05",
    end: "2023-09",
    period: "May 2021 — Sep 2023",
    summary:
      "Cut my teeth across veterinary, hospitality, and marketplace products — and got early ownership of hard real-time features.",
    highlights: [
      "Developed the equine health platform covering horse, veterinary, and farm management across two synchronised apps.",
      "Built a restaurant table and booking management system with live availability.",
      "Created a services marketplace connecting customers with local and remote vendors.",
      "Implemented the real-time and commerce backbone used across these products: in-app purchases, Stripe payments, Socket.io chat, and WebRTC audio/video calling.",
    ],
    stack: ["React Native", "JavaScript", "WebRTC", "Socket.io", "Stripe", "Redux"],
  },
];

export const education = [
  {
    institution: "University of Karachi",
    credential: "Bachelor of Science, Computer Science",
    period: "Aug 2021 — Jan 2025",
    location: "Karachi, PK",
    note: "Completed the degree while working full time as a mobile engineer — four years of coursework running alongside production delivery.",
  },
];

export const certifications = [
  {
    title: "App Store & Google Play Release Management",
    issuer: "Practitioner experience",
    detail: "20+ production submissions across both stores, including review appeals and staged rollouts.",
  },
  {
    title: "Payments & Monetisation",
    issuer: "Stripe · Apple IAP · Google Play Billing",
    detail: "Card payments, subscriptions, in-app purchases, receipt validation, and restore flows shipped in live products.",
  },
  {
    title: "Real-Time Systems",
    issuer: "WebRTC · Socket.io",
    detail: "Video consultations, live chat, and presence built for unreliable mobile networks.",
  },
];

export const achievements = [
  {
    metric: "20+",
    title: "Products in production",
    body: "Shipped and maintained across the App Store and Google Play since 2021.",
  },
  {
    metric: "2",
    title: "Synchronised app ecosystem",
    body: "Designed the shared record and sync contract behind the Prox Vet / Prox Equine platform.",
  },
  {
    metric: "0→1",
    title: "Products taken from empty repo to store",
    body: "Architecture, delivery, and release ownership — not just feature work inside someone else's codebase.",
  },
  {
    metric: "5 yrs",
    title: "React Native, exclusively senior track",
    body: "Associate to Senior in four years, with mobile technical direction now part of the role.",
  },
];
