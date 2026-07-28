export const site = {
  name: "Abdul Rafay",
  firstName: "Abdul",
  lastName: "Rafay",
  role: "Senior React Native Engineer",
  /** Rotates through the hero headline. Ordered longest-lived identity first. */
  titles: [
    "Senior React Native Engineer",
    "Mobile Architect",
    "Product Builder",
    "Creative Developer",
  ],
  tagline:
    "I build mobile products that feel native, ship on time, and survive contact with real users.",
  location: "Karachi, Pakistan",
  timezone: "PKT",
  utcOffset: 5,
  email: "abdurafay119@gmail.com",
  phone: "+92 336 3766006",
  resume: "/Abdul-Rafay-Resume.pdf",
  url: "https://abdulrafay.dev",
  availability: "Open to senior mobile roles & select contract work",
  socials: {
    github: "https://github.com/abdulRafay2003",
    linkedin: "https://www.linkedin.com/in/abdul-rafay-27b544233/",
    whatsapp: "https://wa.me/923363766006",
    mail: "mailto:abdurafay119@gmail.com",
  },
  githubUser: "abdulRafay2003",
} as const;

export const nav = [
  { label: "Work", href: "#work", index: "01" },
  { label: "About", href: "#about", index: "02" },
  { label: "Experience", href: "#experience", index: "03" },
  { label: "Skills", href: "#skills", index: "04" },
  { label: "Services", href: "#services", index: "05" },
  { label: "Contact", href: "#contact", index: "06" },
] as const;

/** Headline numbers used by the hero and the statistics band. */
export const stats = [
  { value: 5, suffix: "+", label: "Years shipping mobile", detail: "Since 2021" },
  { value: 20, suffix: "+", label: "Products delivered", detail: "iOS & Android" },
  { value: 15, suffix: "+", label: "Clients worldwide", detail: "Remote-first" },
  { value: 2, suffix: "", label: "App stores mastered", detail: "Review to release" },
] as const;
