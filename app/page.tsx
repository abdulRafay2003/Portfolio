"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import StackIcon from "tech-stack-icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: -90 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const slideIn = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const projects = [
  {
    id: "1",
    title: "Chefnero",
    image: require("../lib/projectAssets/Chefnero/display.png"),
    category: "Mobile App Development",
    client: "Restaurant Chain",
    date: "2021",
    technologies: ["Node.js", "React Native", "MongoDB"],
    shortDescription:
      "Chefnero the ultimate food discovery app, allows you to discover and savor local chef creation.",
    description:
      "Too busy to cook or miss freshly cooked meals? You can find food prepared the way you want by local certified chefs with our app. Browse menu of chefs around you or have a chat with chefs to request custom order You can view Chefs availability to help you plan your order Place order with peace of mind as payment is released only after order is delivered. Not available in your city? We’re working on it.",
    challenge:
      "One of the main challenges we faced was creating a seamless user experience that simplifies the process of discovering and ordering food. We worked hard to ensure that the app's interface is user friendly, allowing them to easily navigate through different menus and explore dishes from various chefs. Additionally, we focused on implementing reliable and secure features such as instant chat with chefs to provide users with essential information about the food and maintain a trustworthy environment.",
    goal: "The goal of Chefnero is to simplify the process of discovering and ordering food from local chefs. By providing a user-friendly platform, we aim to connect food enthusiasts with talented chefs in their neighborhood and enable them to conveniently access and enjoy a wide variety of delicious meals. Our objective is to bring together consumers and local culinary talent, creating a lively community that celebrates diverse flavors and food experiences.",
    audience:
      "Chefnero caters to food lovers of all ages who seek convenience and variety in their dining experiences. Whether you're a busy professional, a student, or simply someone who appreciates good food, Chefnero is designed to meet your craving needs. The app is made for everyone, no matter your age or what kind of food you love. It's all about making dining easy and enjoyable for everyone who wants quality and convenience.",
    videoUrl: "/videos/chefnero.mp4",
    images: [
      require("../lib/projectAssets/Chefnero/ss-1.png"),
      require("../lib/projectAssets/Chefnero/display.png"),
      require("../lib/projectAssets/Chefnero/display-2.webp"),
      require("../lib/projectAssets/Chefnero/ss-2.png"),
    ],
  },
  {
    id: "2",
    title: "Pidj",
    image: require("../lib/projectAssets/Pidj/display.png"),
    category: "Web Development & Mobile App Development",
    client: "Communication Company",
    date: "2023",
    technologies: ["React.js", "React Native", "Php", "SQL", "Tailwind CSS"],
    shortDescription:
      "Boost Your Business and Community Communication with Pidj Mobile.",
    description:
      "Efficiently manage your business and community communications with the Pid text messaging app. With 2-way communication and Textcast capabilities, you can easily stay connected with your team, customers, or community in real-time. Never miss a message and streamline your workflow with our user-friendly interface. Download now and take your business to the next level",
    challenge:
      "Our main challenge lies in differentiating Pidj Mobile in a saturated mobile communication market, where lots of other communication apps are already available. We need to show off Pidj Mobile's special features, especially its Textcast thing, so people will want to use it. Another big challenge is keeping everything safe and private. We know it's really important to make sure people trust us with their info, especially if they're running businesses and dealing with sensitive stuff. Additionally, encouraging user adoption of Pidj Mobile might need some explanation and showing them how much it can help them save time and work better.",
    goal: "Our primary objective in developing Pidj is to enhance communication efficiency for businesses and communities. We aim to empower them by providing a user-friendly platform that simplifies communication and improves workflow. With Pidj, users can enjoy the benefits of two-way texting and Textcast capabilities, enabling them to connect efficiently with their teams, customers, or community members in real-time.Pidj Mobile aims to bring all your communication in one place and ensure that no messages are missed. By doing so, it encourages collaboration and increases productivity, which is essential for businesses to achieve their goals. It also helps strengthen relationships, enhance customer satisfaction, and promote active engagement within communities. Its user-friendly features make communication easier and more efficient, allowing businesses to thrive and succeed",
    audience:
      "Pidj caters to a broad audience in search of efficient communication solutions. t's great for nonprofit groups, schools, and community organizations who need to send out lots of messages, organize events, or keep members engaged. And it's not just for them businesses of any size, from small startups to big companies, can use Pidj too. It helps teams stay in touch, share news, and work together easily. Even customer service teams can use Pidj to talk to customers and fix problems fast.",
    videoUrl: "/videos/pidj.mp4",
    images: [
      require("../lib/projectAssets/Pidj/display.png"),
      require("../lib/projectAssets/Pidj/mockup.png"),
    ],
  },
  {
    id: "6",
    title: "Group Homes",
    image: require("../lib/projectAssets/GroupHomes/mockup.png"),
    category: "Mobile App Development",
    date: "2020",
    technologies: ["React Native", "Javascript", "Node.js", "Mongodb", "AWS"],
    shortDescription:
      "Connecting You to Trusted Resources for Mental Wellness.",
    description:
      "Download the only Group Home app and join not only thousands of mental health specialists but many individuals who are link with mental health and substance abuse users in some for or fashion, in finding public records of 10s of thousands Government approved homes to assist this population that are throughout the United States along with other community resources.",
    challenge:
      "The project faces several challenges. The Group Home App is focused on providing accurate and up-to-date information about government-approved group homes and community resources for mental health and substance abuse support. It is important for us to regularly verify and update this information to ensure its accuracy. We also want to make sure that users stay engaged and find value in the app, so we plan to encourage active participation through rewards and incentives. To protect user privacy, especially when it comes to sensitive mental health information, we have implemented strong security measures. We want the app to be easy to use and accessible to everyone, so we have made sure it works well on different devices and platforms",
    goal: "The Group Home App is here to help people in the United States find mental health and substance abuse resources easily. It is designed to be simple and easy to use. You can search for government-approved group homes and other support services. We give you all the details you need, like what services they offer, who can use them, and how to get in touch. You can also read reviews from other users to help you decide. Plus, we have discussion forums and support groups where you can connect with others going through similar experiences. You can even send private messages and chat with peers. The app is focused to ensuring you get the help you need, which is why we have included tools like a treatment finder, symptom checker, and mental health assessment. And if you need professional, we have got a directory of mental health experts and organizations.",
    audience:
      "The target audience includes mental health specialists, individuals connected to mental health and substance abuse users, users themselves, and the general public. The app aims to increase access to resources, improve support networks, enhance user engagement, we want to make it easier for people to find help, connect with others, and get the support they need. It also seeks collaborations with various organizations to incorporate trusted resources and content into the platform.",
    videoUrl: "/videos/grouphomes.mp4",
    images: [
      require("../lib/projectAssets/GroupHomes/ss-1.png"),
      require("../lib/projectAssets/GroupHomes/ss-2.png"),
      require("../lib/projectAssets/GroupHomes/ss-3.png"),
    ],
  },
  {
    id: "8",
    title: "Geelink",
    image: require("../lib/projectAssets/Geelink/ss-1.png"),
    category: "Mobile App Development",
    date: "2023",
    technologies: ["Javascript", "React Native", "Node.js", "Mongodb", "AWS"],
    shortDescription:
      "The Ultimate Platform for Talent Discovery, connecting skilled individuals with opportunities to showcase their talent",
    description:
      "Developing an engaging and user-friendly interface for diverse talents, ensuring high-quality image and video upload and display, and fostering a supportive community, poses a significant challenge. Building a supportive community within the app is important but can be tricky. Meeting the needs of different types of talent and handling varying numbers of users is another challenge we face.",
    challenge:
      "Our main challenge lies in differentiating Pidj Mobile in a saturated mobile communication market, where lots of other communication apps are already available. We need to show off Pidj Mobile's special features, especially its Textcast thing, so people will want to use it. Another big challenge is keeping everything safe and private. We know it's really important to make sure people trust us with their info, especially if they're running businesses and dealing with sensitive stuff. Additionally, encouraging user adoption of Pidj Mobile might need some explanation and showing them how much it can help them save time and work better.",
    goal: "The main goal of Geelink is to empower individuals to express themselves and share their talents globally, connecting users worldwide to create an inspiring community of talent. The app will provide a user-friendly platform that encourages interaction and feedback, inspiring creativity and passion for the arts. By exploring inner stars, Geelink will open up talent showcase, fostering a supportive environment for artists to grow.",
    audience:
      "Geelink is designed for anyone with a talent to share and those who love discovering new talents. This includes musicians, dancers, visual artists, performers, and enthusiasts seeking a platform to showcase their skills. The app will appeal to creatives seeking global appreciation, fans eager to discover new talent, and art institutions looking for innovative ways to promote their artists.",
    videoUrl: "/videos/geelink.mp4",
    images: [
      require("../lib/projectAssets/Geelink/ss-1.png"),
      require("../lib/projectAssets/Geelink/ss-2.png"),
      require("../lib/projectAssets/Geelink/ss-3.png"),
    ],
  },
  {
    id: "9",
    title: "Muslim Me",
    image: require("../lib/projectAssets/MuslimMe/mockup.png"),
    category: "Mobile App Development",
    date: "2021",
    technologies: ["Javascript", "React Native", "Node.js", "Mongodb", "AWS"],
    shortDescription:
      "Empowering the Muslim Community in Sweden with Authentic Islamic Resources",
    description:
      "A completely unique, completely free app to facilitate the Muslim's everyday life. It reminds you of the prayers and other important Muslim events. Search for Qibla with your camera. See the Moonphase and get reminded when to fast the white days.",
    challenge:
      "Developing MuslimMe posed several challenges, particularly in adapting to the culture, making sure it was technically correct, choosing the right content, engaging users, and ensuring compatibility across platforms. A significant challenge was making sure the app respected the Swedish Muslim community's culture and beliefs. This meant doing a lot of research and talking to community members to understand what they wanted. Additionally, providing precise prayer times, Qibla direction, and Hijri Date calculations based on the user's location and the Islamic calendar demanded careful attention to detail and a strong technical setup. Another challenge was the continual updating and curation of Islamic and religious information to offer authentic and up-to-date content.",
    goal: "The main aim of MuslimMe is to help the Muslim community in Sweden practice their faith better. It offers useful tools like a reliable Qibla compass, accurate prayer times for more than 80 cities in Sweden, and showing both the Hijri and Western dates. The app also changes its display based on the time of day, and it can set alarms for prayer times. MuslimMe also provides ongoing guidance and inspiration. It updates users with reminders from imams and Islam students, and offers a wide range of Islamic and religious information, articles, and lectures. The app sends reminders for prayers, like when you're driving or leaving home, to encourage regular spiritual reflection.",
    audience:
      "MuslimMe is for everyone in the Muslim community in Sweden. It is for people who want to learn more about Islam, whether they are just starting to explore the religion or are already deeply involved, like students of Islam or imams. The app helps them connect with others, learn more about their faith, and access authentic Islamic resources. It is also for individuals who are interested in learning about Islam, no matter from which background they belong. MuslimMe provides a lot of information about Islam in an easy-to-understand way, making it a great resource for anyone curious about the religion.",
    videoUrl: "/videos/muslimme.mp4",
    images: [
      require("../lib/projectAssets/MuslimMe/ss-1.jpg"),
      require("../lib/projectAssets/MuslimMe/ss-2.jpg"),
      require("../lib/projectAssets/MuslimMe/22-3.jpg"),
    ],
  },
  {
    id: "12",
    title: "Tapped-N",
    image: require("../lib/projectAssets/Tapped-N/ss-1.jpg"),
    category: "Web Development & Mobile App Development",
    date: "2022",
    technologies: [
      "React.js",
      "React Native",
      "Javascript",
      "Node.js",
      "Mongodb",
      "AWS",
    ],
    shortDescription:
      "Connecting people with trusted local service providers, ensuring convenient access to reliable professionals for all their home and business needs.",
    description:
      "Tapped N is a platform to provide services to individuals. Using this platform users can view nearby services, make appointments as per their needs, and book the services. Not only that individuals can also grow or promote their businesses by taking suitable subscriptions.",
    challenge:
      "Building a strong user base among both consumers and service providers is crucial for Tapped-N's success. The app must attract and keep users on both sides to create an exciting marketplace. Maintaining data accuracy and user trust is also important, requiring proper review systems and verification processes to ensure accurate information and positive experiences.",
    goal: "Tapped-N aims to make it easy for people to find and book local services. Whether you need a plumber, electrician, hair stylist, or personal trainer, Tapped-N helps you discover nearby professionals and schedule appointments directly through the app. For service providers, Tapped-N provides a platform to promote their services, manage appointments, and grow their businesses with flexible subscription plans.",
    audience:
      "Tapped-N targets two main groups, consumers looking for local services and service providers offering them. Consumers benefit from a user-friendly interface that lets them browse service details and book appointments with ease. Service providers can use Tapped-N to reach a wider audience, manage their schedules, and expand their customer base.",
    videoUrl: "/videos/tappedn.mp4",
    images: [
      require("../lib/projectAssets/Tapped-N/ss-1.jpg"),
      require("../lib/projectAssets/Tapped-N/ss-2.jpg"),
      require("../lib/projectAssets/Tapped-N/ss-3.jpg"),
    ],
  },
];

export default function Home() {
  const router = useRouter();
  const stats = [
    { number: "+4", label: "YEARS OF\nEXPERIENCE" },
    { number: "+20", label: "PROJECTS\nCOMPLETED" },
    { number: "+15", label: "WORLDWIDE\nCLIENTS" },
  ];

  const experiences = [
    {
      company: "Wizard Innovations U.S",
      period: "Sept 2023 - Present",
      description:
        "Led the development team in creating user-centric mobile and web applications, improving the user experience and increasing user engagement.",
    },
    {
      company: "Ethos Engine AI",
      period: "June 2024 - Dec 2024",
      description:
        "Developed and implemented development strategies for new projects. Collaborated closely with development team and product managers.",
    },
    {
      company: "Tech Verticks",
      period: "May 2021 - Sept 2023",
      description:
        "Designed user interfaces for e-commerce and different service providing platforms, focusing on enhancing usability and visual appeal.",
    },
  ];

  const technologyStack = [
    {
      id: "1",
      name: "HTML",
      icon: "html5",
    },
    { id: "2", name: "CSS", icon: "css3" },
    { id: "3", name: "Javascript", icon: "js" },
    { id: "4", name: "Typescript", icon: "typescript" },
    { id: "5", name: "React", icon: "reactjs" },
    {
      id: "6",
      name: "React Native",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKZfF6a5sM19EW71iIlrzRBuuLJMCMxQ7vTQ&s",
    },
    {
      id: "7",
      name: "Xcode",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUoXub-hKgUAwqJGd1gItb6oABpSGU7JOhjg&s",
    },
    { id: "8", name: "Android Studio", icon: "android" },
    { id: "9", name: "Kotlin", icon: "kotlin" },
    { id: "10", name: "Swift", icon: "swift" },
    { id: "11", name: "Git", icon: "git" },
  ];

  const navOptions = [
    {
      title: "Projects",
      navigateTo: "/Listing",
    },
    {
      title: "About",
      navigateTo: "/about",
    },
  ];

  const socialIcons = [
    {
      id: "1",
      title: "LinkedIn",
      icon: require("../lib/icons/linkedin.webp"),
      link: "https://linkedin.com/in/abdul-rafay-27b544233",
    },
    {
      id: "2",
      title: "Github",
      icon: require("../lib/icons/github.webp"),
      link: "https://github.com/abdulRafay2003",
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-[#151312] text-white py-8 pt-4"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Sticky Download Resume Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black font-semibold rounded-sm py-2 px-4 shadow-lg flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
          >
            My Resume
          </a>
        </motion.div>
        <motion.div
          className="mt-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <a
            className="bg-white text-black font-semibold rounded-sm py-2 px-4 shadow-lg flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
            href="/about"
          >
            About Me
          </a>
        </motion.div>
      </motion.div>

      <div className="min-h-screen bg-[#151312] text-white p-8 pt-4">
        <div className="max-w-6xl mx-auto ">
          {/* Navigation */}

          <nav className="flex justify-center mb-[70px] space-x-4 mt-5 "></nav>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-24 mb-10 relative">
            {/* Profile Card - Now Sticky */}
            <motion.div
              variants={fadeIn}
              className="md:sticky md:top-8 md:h-fit flex justify-center"
            >
              <Card className="rounded-2xl p-5 w-full max-w-[500px] sm:max-w-[400px] md:max-w-xs bg-white items-center justify-center text-center shadow-lg">
                {/* Profile Image */}
                <div className="relative w-full sm:w-full md:w-full aspect-square mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={require("../lib/profile.png")}
                    alt="Profile"
                    layout="responsive"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>

                {/* Name */}
                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                  Abdul Rafay
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-800 mt-3">
                  A Software Engineer who has developed countless innovative
                  solutions.
                </p>

                {/* Personal Info */}
                <h2 className="text-lg font-bold mb-2 text-black">
                  Personal Info
                </h2>
                <ul className="text-gray-800 text-sm sm:text-base space-y-2 mb-6">
                  <li>
                    <span className="font-semibold">Contact:</span>{" "}
                    +923363766006
                  </li>
                  <li>
                    <span className="font-semibold">Email:</span>{" "}
                    abdurafay119@gmail.com
                  </li>
                </ul>

                {/* Social Icons */}
                <div className="flex gap-3 items-center justify-center flex-wrap">
                  {socialIcons?.map((social) =>
                    social?.id == "3" ? (
                      <a
                        key={social.title}
                        href="mailto:abdurafay119@gmail.com"
                      >
                        <Button size="icon" className="rounded-full">
                          <Image
                            src={social?.icon}
                            alt={social.title}
                            className="rounded-full"
                          />
                        </Button>
                      </a>
                    ) : (
                      <Link key={social.title} href={social?.link}>
                        <Button size="icon" className="rounded-full">
                          <Image
                            src={social?.icon}
                            alt={social.title}
                            // width={24}
                            // height={24}
                            className="rounded-full"
                          />
                        </Button>
                      </Link>
                    )
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Main Content */}
            <div className="flex-[2] md:max-w-l">
              <motion.h1
                variants={slideIn}
                className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[120px] font-bold leading-none mb-4"
              >
                SOFTWARE <br />
                <span className="text-zinc-600">ENGINEER</span>
              </motion.h1>

              <motion.p
                variants={slideIn}
                className="text-gray-400 mb-8 md:max-w-[650px]"
              >
                Specializes in mobile application development, crafting
                high-performance, scalable, and user-friendly apps. With
                extensive experience in React Native and modern technologies, we
                bring ideas to life with seamless, innovative, and impactful
                mobile solutions
              </motion.p>

              {/* Stats */}
              <motion.div
                variants={slideIn}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 max-w-full md:max-w-[480px] text-center"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="space-y-1 sm:space-y-2">
                    <div className="text-[40px] sm:text-[50px] md:text-[70px] font-bold">
                      {stat.number}
                    </div>
                    <div className="text-[14px] sm:text-[16px] text-gray-400 whitespace-pre-line">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Experience */}
              <motion.section
                variants={slideIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // Adjust viewport trigger
                className="mb-20"
              >
                <motion.h2
                  variants={slideIn}
                  className="text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px] xl:text-[80px] font-bold leading-none mb-9 mt-24"
                >
                  4 YEARS OF
                  <br />
                  <span className="text-zinc-600">EXPERIENCE</span>
                </motion.h2>

                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      variants={slideIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                    >
                      <Card className="bg-zinc-900 p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b border-gray-700 pb-3">
                          <h3 className="text-2xl sm:text-3xl font-semibold">
                            {exp.company}
                          </h3>
                          <Badge
                            variant="default"
                            className="h-7 rounded-sm mt-2 sm:mt-0"
                          >
                            {exp.period}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                          {exp.description}
                        </p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Recent Projects */}
              <section className="mb-20">
                <motion.h2
                  variants={slideIn}
                  className="text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px] xl:text-[80px] font-bold leading-none mb-9 mt-24"
                >
                  RECENT
                  <br />
                  <span className="text-zinc-600">PROJECTS</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {projects?.map((project, index) => (
                    <Link
                      href={{
                        pathname: "/details",
                        query: {
                          data: encodeURIComponent(JSON.stringify(project)),
                        },
                      }}
                      className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                    >
                      <Card
                        key={index}
                        className="bg-zinc-900 overflow-hidden group cursor-pointer w-full"
                      >
                        <div className="relative h-48">
                          <Image
                            src={project.image}
                            alt={project.title}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div className="p-4 text-center">
                          <h3 className="text-[22px] font-semibold">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 text-[14px] line-clamp-3">
                            {project.shortDescription}
                          </p>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
                <Link href="/Listing">
                  <Button className="w-full h-12 sm:h-14 md:h-12 bg-white text-base sm:text-lg md:text-xl text-black font-medium rounded-lg transition-all duration-300 hover:bg-zinc-200 hover:scale-105 mt-9">
                    View All
                  </Button>
                </Link>
              </section>

              {/* Development Tools */}
              <motion.section
                variants={slideIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // Adjust viewport trigger
                className="mb-20"
              >
                <motion.h2
                  variants={slideIn}
                  className="text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px] xl:text-[80px] font-bold leading-none mb-9 mt-24"
                >
                  TECHNOLOGY
                  <br />
                  <span className="text-zinc-600">STACK</span>
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                  {technologyStack.map((tool, index) => (
                    <Card
                      key={index}
                      className="bg-zinc-900 text-white p-3 flex items-center gap-4 "
                    >
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-lg overflow-hidden">
                        {tool?.id == "6" || tool?.id == "7" ? (
                          <Image
                            src={tool.icon}
                            alt={tool.name}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg"
                          />
                        ) : (
                          <StackIcon name={tool.icon} />
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                          {tool.name}
                        </h3>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.section>

              {/* Let's Work Together */}
              <motion.section
                variants={slideIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // Adjust viewport trigger
                className="mb-[50px]"
              >
                <motion.h2
                  variants={slideIn}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold leading-tight sm:leading-none mb-6 sm:mb-9 mt-12 sm:mt-24"
                >
                  LET'S WORK
                  <br />
                  <span className="text-zinc-600">TOGETHER</span>
                </motion.h2>

                <Button
                  onClick={() =>
                    window.open("https://wa.me/923363766006", "_blank")
                  }
                  className="w-full h-12 sm:h-14 md:h-16 bg-white text-base sm:text-lg md:text-xl text-black font-medium rounded-lg transition-all duration-300 hover:bg-zinc-200 hover:scale-105"
                >
                  Let's Connect
                </Button>
              </motion.section>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
