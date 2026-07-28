export type Project = {
  slug: string;
  title: string;
  /** One-line hook shown on cards. */
  tagline: string;
  year: string;
  /** Domain label, not a job title. */
  domain: string;
  role: string;
  platforms: string[];
  /** Brand colour sampled from the product's own UI; drives per-project theming. */
  accent: string;
  featured: boolean;
  /** Files live in /public/work/<slug>/. */
  images: string[];
  video?: string;
  poster?: string;
  stack: string[];
  overview: string;
  problem: string;
  solution: string;
  contribution: string[];
  achievements: string[];
  challenges: { title: string; body: string }[];
};

const asset = (slug: string, file: string) => `/work/${slug}/${file}`;

export const projects: Project[] = [
  {
    slug: "prox-vet",
    title: "Prox Vet",
    tagline: "A mobile practice for equine veterinarians — records, video calls, and invoicing in one app.",
    year: "2022",
    domain: "Veterinary Health",
    role: "React Native Engineer",
    platforms: ["iOS", "Android"],
    accent: "#2E8BC4",
    featured: true,
    images: ["1.webp", "2.webp", "3.webp"].map((f) => asset("prox-vet", f)),
    video: asset("prox-vet", "preview.mp4"),
    poster: asset("prox-vet", "poster.webp"),
    stack: ["React Native", "JavaScript", "WebRTC", "Socket.io", "Node.js", "SQL", "AWS"],
    overview:
      "Prox Vet is the practitioner half of a two-app equine health platform. Vets run their entire mobile practice from it — the day's appointments, each horse's medical history, emergency video consults, and the invoice at the end of the visit.",
    problem:
      "Equine vets work out of a truck, not a clinic. They drive between farms with patchy rural signal, take notes on paper, and reconcile billing days later — by which point details are lost and invoices go out late. Existing veterinary software assumed a desk, a landline, and a stable connection. None of that exists on a farm at 6am.",
    solution:
      "We built a field-first app that assumes the network will fail. Records are captured locally and reconciled when signal returns, appointments sync bidirectionally with the horse owner's companion app (Prox Equine), and a two-way WebRTC channel lets a vet triage an emergency by video before deciding whether to drive out. Invoicing sits at the end of the same flow, so the visit closes out before the vet leaves the property.",
    contribution: [
      "Owned the React Native client end to end across iOS and Android, from architecture through store release.",
      "Implemented the WebRTC video consultation layer, including signalling over Socket.io, permission handling, and reconnection when a call drops mid-consult.",
      "Designed the digital medical record schema on the client and the sync contract that keeps a horse's record consistent between the vet and owner apps.",
      "Built the invoicing and payment-capture flow so a visit can be billed on-site without leaving the app.",
    ],
    achievements: [
      "Shipped a synchronised two-app ecosystem where a vet's chart update lands in the owner's app without either side pressing refresh.",
      "Emergency video consults hold up on rural mobile networks, with automatic recovery instead of a dead call.",
      "Collapsed a multi-day paper-to-invoice cycle into a single on-site flow.",
    ],
    challenges: [
      {
        title: "Video calls over rural networks",
        body: "Farm connectivity swings between LTE and nothing. I tuned the WebRTC pipeline to degrade to audio rather than drop, and added session recovery so a reconnect resumes the consult instead of restarting it.",
      },
      {
        title: "Two apps, one source of truth",
        body: "Vet and owner edit overlapping records from different apps. I moved to a server-authoritative model with client-side optimistic updates, so both sides feel instant while the backend settles conflicts deterministically.",
      },
      {
        title: "Medical data, real consequences",
        body: "Health records demanded tighter handling than a typical consumer app — scoped access per animal, encrypted local storage, and an audit trail on every chart change.",
      },
    ],
  },
  {
    slug: "phonesheet",
    title: "PhoneSheet",
    tagline: "Call logging for professionals who live on the phone — mobile and web, perfectly in sync.",
    year: "2023",
    domain: "Productivity",
    role: "React Native Engineer",
    platforms: ["iOS", "Android", "Web"],
    accent: "#3B87E9",
    featured: true,
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"].map((f) => asset("phonesheet", f)),
    video: asset("phonesheet", "preview.mp4"),
    poster: asset("phonesheet", "poster.webp"),
    stack: ["React Native", "TypeScript", "Next.js", "Nest.js", "Firebase", "MongoDB", "AWS"],
    overview:
      "PhoneSheet turns the call log into a working document. Every incoming and outgoing call carries context — who, why, what was agreed, what happens next — across a mobile app and a companion web dashboard.",
    problem:
      "Agents, recruiters, and account managers make dozens of calls a day and remember almost none of them. The native call log gives a number and a timestamp and nothing else, so the actual work — the reason for the call and the commitment made on it — ends up scattered across sticky notes, a CRM nobody updates, and memory.",
    solution:
      "A structured call sheet that attaches notes, status, and follow-up intent to each call, then keeps it identical on phone and desktop. Logging a call takes one screen and a few taps, because anything slower simply doesn't get done between calls.",
    contribution: [
      "Built the React Native app in TypeScript for both platforms, including the call-entry flow the whole product depends on.",
      "Designed the offline-capable data layer so a call logged with no signal is never lost and reconciles cleanly on reconnect.",
      "Aligned the mobile client with the Next.js web dashboard so a record looks and behaves the same in both surfaces.",
      "Handled the full release pipeline — signing, provisioning, staged rollout, and store review for App Store and Google Play.",
    ],
    achievements: [
      "Reduced logging a call to a single screen, which is the difference between a tool that gets used and one that doesn't.",
      "Shipped genuine mobile/web parity — a call logged on the phone is editable on the desktop seconds later.",
      "Delivered a typed, strict-mode TypeScript codebase that a second engineer could pick up without a handover doc.",
    ],
    challenges: [
      {
        title: "Speed of capture",
        body: "The first build had a sensible multi-step form that nobody used, because you cannot fill a form while dialling. I collapsed it into a single sheet with smart defaults and made every optional field genuinely optional.",
      },
      {
        title: "Offline as the default assumption",
        body: "Calls happen in car parks and lifts. I treated offline as the normal case rather than an error state, with a local write-ahead queue and idempotent sync so retries can't duplicate entries.",
      },
      {
        title: "Two clients, one mental model",
        body: "Mobile and web were built by different people at different times. I defined a shared type contract for the record so both surfaces agreed on what a call is before either shipped.",
      },
    ],
  },
  {
    slug: "pidj",
    title: "Pidj",
    tagline: "Two-way business messaging with broadcast — real conversations at community scale.",
    year: "2023",
    domain: "Communications",
    role: "React Native Engineer",
    platforms: ["iOS", "Android", "Web"],
    accent: "#8B5A9E",
    featured: true,
    images: ["1.webp", "2.webp"].map((f) => asset("pidj", f)),
    video: asset("pidj", "preview.mp4"),
    poster: asset("pidj", "poster.webp"),
    stack: ["React Native", "React.js", "Firebase", "Socket.io", "WebSockets", "PHP", "SQL"],
    overview:
      "Pidj gives organisations one number their whole community can text. Teams hold real two-way conversations, and Textcast pushes a single message to thousands of recipients whose replies land back in the same shared inbox.",
    problem:
      "Broadcast tools talk at people; messaging apps don't scale past a handful of threads. Schools, nonprofits, and support teams needed both at once — the reach of a mass text and the intimacy of a real reply — without handing every staff member a personal phone number.",
    solution:
      "A shared team inbox built on a persistent socket layer, with message templates for the repetitive 80% and Textcast for one-to-many sends. Replies to a broadcast collapse back into individual threads, so the recipient experiences a conversation while the organisation experiences a queue.",
    contribution: [
      "Built the React Native client for iOS and Android, including the real-time inbox and the Textcast composer.",
      "Implemented the WebSocket messaging layer with optimistic sends, delivery state, and reconnect-and-replay after backgrounding.",
      "Built the template system that lets teams answer routine questions in one tap.",
      "Kept the mobile client and the React web console behaviourally consistent so staff could move between them mid-shift.",
    ],
    achievements: [
      "Delivered a shared inbox that stays responsive with high thread volume, where naive list rendering falls over.",
      "Broadcast replies thread correctly back to individual senders — the feature that made Textcast usable rather than a spam cannon.",
      "Messages survive backgrounding, network loss, and cold start without duplicating or disappearing.",
    ],
    challenges: [
      {
        title: "Keeping a busy inbox at 60fps",
        body: "Thread lists with thousands of live-updating rows drop frames fast. I moved to virtualised lists with stable keys, memoised row components, and batched socket updates so a burst of inbound messages triggers one render, not two hundred.",
      },
      {
        title: "Sockets versus the mobile lifecycle",
        body: "iOS and Android suspend connections aggressively. I built an explicit connection state machine tied to app lifecycle, with exponential backoff and a replay window so nothing is silently missed while backgrounded.",
      },
      {
        title: "Trust in a saturated market",
        body: "Organisations handle sensitive contact data, so the app had to earn trust visibly — clear delivery states, no ambiguous 'sent?' moments, and honest error surfacing instead of silent failures.",
      },
    ],
  },
  {
    slug: "tapped-n",
    title: "Tapped-N",
    tagline: "A local services marketplace where discovery, booking, and payment never leave the app.",
    year: "2022",
    domain: "Marketplace",
    role: "React Native Engineer",
    platforms: ["iOS", "Android", "Web"],
    accent: "#F27127",
    featured: true,
    images: ["1.webp", "2.webp", "3.webp"].map((f) => asset("tapped-n", f)),
    video: asset("tapped-n", "preview.mp4"),
    poster: asset("tapped-n", "poster.webp"),
    stack: ["React Native", "React.js", "JavaScript", "Stripe", "Socket.io", "Node.js", "MongoDB", "AWS"],
    overview:
      "Tapped-N connects people to vetted local professionals — barbers, cleaners, handymen, trainers — with location-aware discovery, in-app chat, real scheduling, and card payment. Providers get a storefront and a subscription tier to grow into.",
    problem:
      "Booking a local service still meant three disconnected steps: find someone online, phone them to check availability, then pay in cash. Every handoff lost people. Providers, meanwhile, had no way to be discovered beyond word of mouth and no tools to manage a calendar.",
    solution:
      "A two-sided marketplace that keeps the entire transaction in one place. Consumers browse by proximity and category, message the provider directly, book against live availability, and pay by card. Providers manage their calendar and profile in the same app and can subscribe for better placement.",
    contribution: [
      "Built both sides of the React Native app — the consumer discovery and booking flow, and the provider dashboard.",
      "Integrated Stripe for card payments and subscription billing, including the edge cases around failed charges and cancellations.",
      "Implemented real-time chat over Socket.io so consumers and providers negotiate details before committing to a slot.",
      "Built location-aware search and category browsing against the maps and geocoding layer.",
    ],
    achievements: [
      "Shipped a complete two-sided marketplace — discovery, chat, scheduling, and payment — as one continuous flow with no drop-off to phone or cash.",
      "Delivered subscription billing that gave providers a real upgrade path and the business a recurring revenue line.",
      "Built a review and verification loop that made trust visible on both sides of the transaction.",
    ],
    challenges: [
      {
        title: "One codebase, two very different users",
        body: "A consumer browsing and a provider managing a business need different navigation, not the same screens with fields hidden. I split the app into role-scoped navigation trees over a shared component and data layer, keeping one codebase without one compromised experience.",
      },
      {
        title: "Double-booking is unforgivable",
        body: "Two people booking the same slot destroys provider trust immediately. Availability had to be server-authoritative with the client optimistic but always correctable, and slots held briefly during checkout.",
      },
      {
        title: "Payments that fail gracefully",
        body: "Stripe failures happen mid-booking. I made every payment path resumable and idempotent, so a declined card never leaves a phantom appointment or a double charge.",
      },
    ],
  },
  {
    slug: "chefnero",
    title: "Chefnero",
    tagline: "Order from certified home chefs nearby — with custom requests and escrow-protected payment.",
    year: "2021",
    domain: "Food & Delivery",
    role: "React Native Engineer",
    platforms: ["iOS", "Android"],
    accent: "#C22458",
    featured: true,
    images: ["1.webp", "2.webp", "3.webp", "4.webp"].map((f) => asset("chefnero", f)),
    video: asset("chefnero", "preview.mp4"),
    poster: asset("chefnero", "poster.webp"),
    stack: ["React Native", "Node.js", "MongoDB", "Socket.io", "Stripe"],
    overview:
      "Chefnero is food discovery built around people rather than restaurants. Browse certified local chefs, chat to request a custom order, and pay into escrow that only releases once the food arrives.",
    problem:
      "Delivery apps optimise for chains and speed, which leaves independent chefs invisible and diners stuck with the same menus. Ordering something genuinely custom meant a phone call and trusting a stranger with your money up front.",
    solution:
      "A marketplace where the chef is the product. Real-time chat replaces the rigid menu for custom orders, published availability lets diners plan instead of guess, and escrow payment protects both sides — the diner isn't paying blind, and the chef isn't cooking on a promise.",
    contribution: [
      "Built the React Native app for iOS and Android, including chef discovery, the menu browser, and the ordering flow.",
      "Implemented real-time chef–diner chat over Socket.io for negotiating custom orders.",
      "Integrated escrow-style payment so funds are captured at order time but released only on delivery.",
      "Built the chef availability and scheduling model that lets diners order ahead against real capacity.",
    ],
    achievements: [
      "Turned an unstructured 'call the chef' process into a bookable, payable flow without losing the personal negotiation that made it appealing.",
      "Escrow payment removed the trust barrier that blocks peer-to-peer food marketplaces.",
      "Chat-driven custom ordering shipped as a first-class path, not a bolt-on support channel.",
    ],
    challenges: [
      {
        title: "Custom orders resist structure",
        body: "The whole appeal was ordering something not on a menu, which is exactly what an e-commerce data model can't represent. I made the chat thread part of the order record, so a free-form conversation still resolves into a priced, trackable order.",
      },
      {
        title: "Money held in the middle",
        body: "Escrow means the app is holding funds through a delivery window. Every state transition — captured, held, released, refunded — had to be explicit and visible to both parties, with no ambiguous middle state.",
      },
      {
        title: "Discovery without a catalogue",
        body: "With chefs rather than restaurants, inventory changes daily and by person. Search had to weight proximity, live availability, and cuisine together rather than sorting a fixed catalogue.",
      },
    ],
  },
  {
    slug: "geelink",
    title: "Geelink",
    tagline: "A global stage for undiscovered talent — video-first, community-driven.",
    year: "2023",
    domain: "Social & Media",
    role: "React Native Engineer",
    platforms: ["iOS", "Android"],
    accent: "#B32DE2",
    featured: true,
    images: ["1.webp", "2.webp", "3.webp"].map((f) => asset("geelink", f)),
    video: asset("geelink", "preview.mp4"),
    poster: asset("geelink", "poster.webp"),
    stack: ["React Native", "JavaScript", "Node.js", "MongoDB", "AWS S3"],
    overview:
      "Geelink is a talent showcase where musicians, dancers, designers, and performers publish video work and build an audience — with category-based discovery and a feedback loop designed to encourage rather than rank.",
    problem:
      "General social platforms bury emerging creators under established accounts and optimise for outrage over craft. A dancer and a designer need to be discoverable in completely different ways, and neither is served by one undifferentiated feed.",
    solution:
      "Category-first discovery with a weekly spotlight, built on a media pipeline that keeps upload fast and playback smooth on mid-range Android hardware — where most of the audience actually is.",
    contribution: [
      "Built the React Native app for iOS and Android, including the discovery feed and creator profiles.",
      "Implemented the media upload pipeline with client-side compression, resumable multipart uploads to S3, and progress that survives backgrounding.",
      "Tuned feed playback — view recycling, preloading, and single-active-player management — so scrolling stays smooth.",
      "Built the category and spotlight system that gives every discipline its own surface.",
    ],
    achievements: [
      "Video feed holds a steady frame rate on low-end Android devices, which is where most talent-discovery traffic comes from.",
      "Large uploads complete reliably on unstable connections instead of failing at 90%.",
      "Category-based discovery gave niche disciplines visibility that a single ranked feed would have erased.",
    ],
    challenges: [
      {
        title: "Video feeds destroy memory",
        body: "Naive video lists leak players and crash mid-range devices within a minute of scrolling. I enforced a single active player, aggressive view recycling, and explicit teardown on unmount, with preloading limited to one item ahead.",
      },
      {
        title: "Uploads that don't survive a phone call",
        body: "A 200MB upload dying at 90% because someone got a call is the fastest way to lose a creator. Resumable chunked uploads with client-side compression made completion the normal outcome.",
      },
      {
        title: "Serving genuinely different creators",
        body: "A musician's profile and a visual artist's profile need different shapes. I built the profile as a composition of discipline-specific modules rather than one form with unused fields.",
      },
    ],
  },
  {
    slug: "prox-equine",
    title: "Prox Equine",
    tagline: "The horse owner's companion — health records, vet access, and care reminders.",
    year: "2022",
    domain: "Animal Health",
    role: "React Native Engineer",
    platforms: ["iOS", "Android"],
    accent: "#4E9FD1",
    featured: false,
    images: ["1.webp", "2.webp", "3.webp"].map((f) => asset("prox-equine", f)),
    video: asset("prox-equine", "preview.mp4"),
    poster: asset("prox-equine", "poster.webp"),
    stack: ["React Native", "JavaScript", "WebRTC", "Node.js", "SQL", "AWS"],
    overview:
      "The owner-facing half of the Prox platform. Every horse gets a dashboard, a digital medical record that updates when the vet updates it, breeding history, appointment booking, and reminders for medication, treatment, and vaccination schedules.",
    problem:
      "Horse owners keep care records in a folder in the barn — if at all. Vaccination and medication schedules get missed, history is lost when a horse changes hands, and reaching a vet about a possible emergency means a phone call and a guess.",
    solution:
      "A per-animal dashboard that stays current because the vet's app writes to the same record. Reminders handle the schedule, video chat handles the 'is this urgent?' question, and the Away Care programme keeps records intact when a horse is boarded elsewhere.",
    contribution: [
      "Built the owner-facing React Native app for iOS and Android.",
      "Implemented the bidirectional sync with Prox Vet so vet-side chart updates land in the owner's record automatically.",
      "Built the reminder scheduling system for medication, treatment, and vaccination timelines.",
      "Integrated the shared WebRTC layer for owner-initiated emergency vet consultations.",
    ],
    achievements: [
      "Owners and vets finally read from one record instead of two diverging ones.",
      "Scheduled care reminders turned a paper calendar into something that actually fires on time.",
      "Records survive a change of ownership or boarding facility, which paper never did.",
    ],
    challenges: [
      {
        title: "Sync without a merge conflict UI",
        body: "Consumers won't resolve merge conflicts. I made the vet's record authoritative for clinical fields and the owner's authoritative for husbandry fields, which removed most conflicts by design rather than by dialog.",
      },
      {
        title: "Reminders that survive the OS",
        body: "Both platforms aggressively kill background schedulers. I moved the schedule server-side with push delivery and local notifications as a redundant path.",
      },
    ],
  },
  {
    slug: "muslim-me",
    title: "MuslimMe",
    tagline: "Prayer times, Qibla, and Hijri dates for the Swedish Muslim community.",
    year: "2021",
    domain: "Lifestyle & Faith",
    role: "React Native Engineer",
    platforms: ["iOS", "Android"],
    accent: "#17A06F",
    featured: false,
    images: ["1.webp", "2.webp", "3.webp", "4.webp"].map((f) => asset("muslim-me", f)),
    video: asset("muslim-me", "preview.mp4"),
    poster: asset("muslim-me", "poster.webp"),
    stack: ["React Native", "JavaScript", "Node.js", "MongoDB", "Device Sensors"],
    overview:
      "A free daily companion app for Muslims in Sweden — accurate prayer times for 80+ cities, a camera-assisted Qibla compass, moon phases and white-day fasting reminders, and a theme that follows the time of day.",
    problem:
      "Sweden's latitude breaks the standard prayer-time calculation: in high summer the sun barely sets, so conventional formulas return times that are wrong or undefined. Generic international apps simply produced bad data for this community, and content wasn't localised.",
    solution:
      "Location-aware prayer calculation using the conventions Swedish communities actually follow at high latitude, a magnetometer-driven Qibla compass with camera overlay, and dual Hijri/Gregorian dating throughout — with content curated with community input rather than translated in bulk.",
    contribution: [
      "Built the React Native app for both platforms.",
      "Implemented prayer-time calculation with high-latitude handling and per-city configuration for 80+ locations.",
      "Built the Qibla compass on the device magnetometer and accelerometer, with a camera passthrough overlay and calibration guidance.",
      "Implemented context-aware notifications and a UI theme that shifts with the time of day.",
    ],
    achievements: [
      "Correct prayer times through the Swedish summer, where most international apps produce nonsense.",
      "Camera-overlay Qibla direction working reliably against real-world magnetic interference.",
      "Built with community consultation, so the content read as authentic rather than machine-translated.",
    ],
    challenges: [
      {
        title: "The midnight sun problem",
        body: "Above roughly 55°N the standard sun-angle method degenerates. I implemented the high-latitude conventions used by Swedish communities and made the method configurable rather than hard-coding one school's answer.",
      },
      {
        title: "Compasses lie indoors",
        body: "Phone magnetometers drift badly near metal and electronics. I added sensor fusion with the accelerometer, live accuracy reporting, and an explicit calibration prompt instead of silently pointing the wrong way.",
      },
    ],
  },
  {
    slug: "group-homes",
    title: "Group Homes",
    tagline: "Finding verified mental-health and recovery housing across the United States.",
    year: "2020",
    domain: "Healthcare & Social",
    role: "React Native Engineer",
    platforms: ["iOS", "Android"],
    accent: "#2A8E8D",
    featured: false,
    images: ["1.webp", "2.webp", "3.webp", "4.webp"].map((f) => asset("group-homes", f)),
    video: asset("group-homes", "preview.mp4"),
    poster: asset("group-homes", "poster.webp"),
    stack: ["React Native", "JavaScript", "Node.js", "MongoDB", "AWS"],
    overview:
      "A searchable directory of tens of thousands of government-approved group homes and community resources for mental health and substance-abuse support, with peer forums, private messaging, and a practitioner directory.",
    problem:
      "Public records of approved facilities exist, but they're spread across state agencies in incompatible formats. Someone in crisis — or a caseworker helping them — has no realistic way to search them, and the wrong information at that moment has serious consequences.",
    solution:
      "One searchable index over fragmented public records, with the details that actually matter surfaced up front: services offered, eligibility, and how to make contact. Peer forums and private messaging sit alongside it so people can get context from others who've been through it.",
    contribution: [
      "Built the React Native app for iOS and Android.",
      "Implemented search and filtering over a large facility dataset with location-based results.",
      "Built the community forum and private messaging features.",
      "Implemented privacy safeguards appropriate to sensitive mental-health context.",
    ],
    achievements: [
      "Made a national, fragmented public dataset searchable from a phone in a few taps.",
      "Paired directory data with peer support, so users got both the facility and the context around it.",
      "Handled sensitive personal data with restraint — minimal collection, explicit consent.",
    ],
    challenges: [
      {
        title: "Data accuracy has real stakes",
        body: "A stale listing sends someone in crisis to a facility that closed. I built verification state and last-reviewed dates into the client so users could see how current a record was rather than assuming.",
      },
      {
        title: "Privacy in a stigmatised domain",
        body: "Users are disclosing mental-health and substance-use context. The app collects the minimum needed, keeps forum identity separable from account identity, and never surfaces one from the other.",
      },
    ],
  },
  {
    slug: "showoff",
    title: "ShowOff",
    tagline: "A social network for premium car culture, with a community-voted 'King of the Road'.",
    year: "2023",
    domain: "Social & Community",
    role: "React Native Engineer",
    platforms: ["iOS", "Android", "Web"],
    accent: "#D6362E",
    featured: false,
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp"].map((f) =>
      asset("showoff", f),
    ),
    video: asset("showoff", "preview.mp4"),
    poster: asset("showoff", "poster.webp"),
    stack: ["React Native", "React.js", "TypeScript", "Node.js", "MongoDB", "AWS"],
    overview:
      "A high-gloss social platform for car enthusiasts to publish their builds, follow other owners, and compete for a recurring community-voted 'King of the Road' title.",
    problem:
      "Car communities were scattered across forums and general social feeds where a meticulously photographed build gets the same treatment as any other post. Enthusiasts wanted a space where the presentation matched the subject and where recognition was earned by the community rather than an algorithm.",
    solution:
      "An image-first feed built to make cars look good — full-bleed media, minimal chrome — plus a structured competition cycle that gives the community a reason to return on a schedule rather than at random.",
    contribution: [
      "Built the React Native app across iOS and Android, and contributed to the React web client.",
      "Implemented the image-first feed with progressive loading and full-resolution viewing.",
      "Built the nomination and voting mechanics behind the 'King of the Road' cycle.",
      "Implemented social graph features — following, notifications, and profile galleries.",
    ],
    achievements: [
      "Delivered a feed where high-resolution photography loads fast without looking compressed.",
      "The competition cycle created a recurring engagement rhythm instead of a one-off launch spike.",
    ],
    challenges: [
      {
        title: "Quality photos, fast feeds",
        body: "Enthusiasts upload very large images and notice compression artefacts immediately. I used progressive resolution — a fast low-res placeholder, then full quality on demand — so the feed is quick but the detail view is uncompromised.",
      },
      {
        title: "Voting that can't be gamed",
        body: "A public competition invites manipulation. Voting was rate-limited, tied to verified accounts, and validated server-side rather than trusted from the client.",
      },
    ],
  },
  {
    slug: "fluospeak",
    title: "Fluospeak",
    tagline: "Speak English with native speakers — live voice practice with instant feedback.",
    year: "2023",
    domain: "EdTech",
    role: "React Native Engineer",
    platforms: ["iOS", "Android"],
    accent: "#5B4BD6",
    featured: false,
    images: ["1.webp", "2.webp"].map((f) => asset("fluospeak", f)),
    stack: ["React Native", "TypeScript", "Firebase", "WebRTC", "Node.js"],
    overview:
      "A language-learning app built around the part most learners avoid: actually speaking. Fluospeak pairs learners with native speakers for live voice practice, with structured lessons and immediate pronunciation feedback.",
    problem:
      "Most language apps drill vocabulary because it's easy to gamify, and learners end up able to read but unable to hold a conversation. Real speaking practice requires another person, scheduling, and the confidence to be bad in front of them.",
    solution:
      "Low-friction live voice sessions with native speakers, wrapped in enough structure that a learner always knows what to say next. Lessons adapt to level, and feedback arrives during the session rather than as a score afterwards.",
    contribution: [
      "Built the React Native client in TypeScript for iOS and Android.",
      "Implemented the real-time voice layer, including audio session handling and interruption recovery.",
      "Built the lesson flow and personalised progression.",
      "Integrated Firebase for auth, presence, and session state.",
    ],
    achievements: [
      "Live voice sessions that connect quickly enough that learners don't lose their nerve while waiting.",
      "Structured prompts that reduce the intimidation of speaking to a stranger in a second language.",
    ],
    challenges: [
      {
        title: "Audio sessions are hostile",
        body: "Incoming calls, Bluetooth switches, and silent mode all break real-time audio in different ways per platform. I handled the audio session lifecycle explicitly on both platforms rather than relying on defaults.",
      },
      {
        title: "Latency kills conversation",
        body: "Even modest delay makes natural back-and-forth impossible. Connection setup and codec selection were tuned for latency over fidelity, because a conversation tolerates lower quality far better than lag.",
      },
    ],
  },
  {
    slug: "event-buddy",
    title: "Event Buddy",
    tagline: "Find people to go with — location-based social events.",
    year: "2021",
    domain: "Social",
    role: "React Native Engineer",
    platforms: ["iOS", "Android"],
    accent: "#E99048",
    featured: false,
    images: ["1.webp", "2.webp"].map((f) => asset("event-buddy", f)),
    stack: ["React Native", "JavaScript", "Node.js", "MongoDB", "Google Places"],
    overview:
      "A social network for spontaneous plans: create an event, discover what's happening nearby, and invite people based on proximity and shared interest.",
    problem:
      "Plenty of apps tell you what events exist. Almost none solve the actual blocker — not having anyone to go with. Existing tools assumed you already had the group.",
    solution:
      "Invitation-first rather than listing-first. Events are lightweight and location-scoped, and the primary action is finding a companion rather than buying a ticket.",
    contribution: [
      "Built the React Native app for iOS and Android.",
      "Implemented location-based event discovery using Google Places.",
      "Built the invitation and social connection flows.",
    ],
    achievements: [
      "Reframed event discovery around companionship, which is the part people actually get stuck on.",
      "Kept event creation to a few seconds, so spontaneous plans stayed spontaneous.",
    ],
    challenges: [
      {
        title: "Location without surveillance",
        body: "Proximity discovery needs location, but broadcasting a precise position to strangers is unacceptable. I used coarse geohashing so users match by area rather than exposing exact coordinates.",
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const archiveProjects = projects.filter((p) => !p.featured);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
