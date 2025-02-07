"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Navigation } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StackIcon from "tech-stack-icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Linkedin } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const stats = [
    { number: "+4", label: "YEARS OF\nEXPERIENCE" },
    { number: "+20", label: "PROJECTS\nCOMPLETED" },
    { number: "+15", label: "WORLDWIDE\nCLIENTS" },
  ];

  const projects = [
    {
      title: "Chefnero",
      description: "Free Framer Template",
      image: require("../lib/projectAssets/Chefnero/display.png"),
    },
    {
      title: "Pidj",
      description: "Saas Framer Template",
      image: require("../lib/projectAssets/Pidj/display.png"),
    },
    {
      title: "Event Buddy",
      description: "Saas Framer Template",
      image: require("../lib/projectAssets/EventBuddy/display.png"),
    },
    {
      title: "Phonesheet",
      description: "Free Framer Template",
      image: require("../lib/projectAssets/Phonesheet/mockup.png"),
    },
    {
      title: "ShowOff",
      description: "Saas Framer Template",
      image: require("../lib/projectAssets/ShowOff/display.png"),
    },
    {
      title: "Group Homes",
      description: "Saas Framer Template",
      image: require("../lib/projectAssets/GroupHomes/display.png"),
    },
  ];

  const experiences = [
    {
      company: "Wizard Innovations US",
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

  const premiumTools = [
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
    // {
    //   title: "Home",
    //   navigateTo: "/",
    // },
    {
      title: "Projects",
      navigateTo: "/projects",
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
    // {
    //   id: "3",
    //   title: "Email",
    //   icon: require("../lib/icons/github.webp"),
    //   link: "mailto:abdurafay119@gmail.com?subject=Let's%20Connect&body=Hello%2C%20I%20wanted%20to%20discuss%20something%20with%20you.",
    // },
  ];

  return (
    <div className="min-h-screen bg-[#151312] text-white p-8 pt-16">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <nav className="flex justify-center mb-[70px] space-x-4">
          <div className="rounded-lg border-2 border-white flex p-1">
            {navOptions?.map((item: { title: string; navigateTo: string }) => {
              return (
                <Link
                  href={item?.navigateTo}
                  className="text-gray-400 text-[14px] hover:text-white transition-colors inline-flex items-center mx-1 my-1 px-3"
                >
                  {item?.title}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-24 mb-10 relative">
          {/* Profile Card - Now Sticky */}
          <div className="md:sticky md:top-8 md:h-fit">
            <Card className="rounded-3xl p-5 flex-1 w-[500px] md:max-w-xs bg-white items-center justify-center text-center">
              <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                <Image
                  src={require("../lib/profile.png")}
                  alt="Profile"
                  layout="full"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
              <h2 className="text-3xl font-bold text-black mb-2">
                Abdul Rafay
              </h2>
              <p className="text-sm text-gray-600 mb-4 mt-5">
                A Software Engineer who has developed countless innovative
                solutions.
              </p>
              <h2 className="text-1xl font-bold mb-2 text-black">
                Personal Info
              </h2>
              <ul className="text-gray-600 text-sm space-y-2 mb-6">
                <li>Contact : +923363766006</li>
                <li>Email : abdurafay119@gmail.com</li>
              </ul>
              <div className="flex gap-3 items-center justify-center">
                {socialIcons?.map((social) =>
                  social?.id == "3" ? (
                    <a href="https://mailto:abdurafay119@gmail.com">
                      <Button
                        key={social.title}
                        size="icon"
                        className="rounded-full"
                      >
                        <Image
                          src={social?.icon}
                          alt={social.title}
                          layout="full"
                          objectFit="contain"
                          className="rounded-full"
                        />
                      </Button>
                    </a>
                  ) : (
                    <Link href={social?.link}>
                      <Button
                        key={social.title}
                        // variant="outline"
                        size="icon"
                        className="rounded-full"
                      >
                        <Image
                          src={social?.icon}
                          alt={social.title}
                          layout="full"
                          objectFit="contain"
                          className="rounded-full"
                        />
                      </Button>
                    </Link>
                  )
                )}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-[2] md:max-w-l">
            <h1 className="text-[120px] font-bold leading-none mb-4">
              SOFTWARE
              <br />
              <span className="text-zinc-800">ENGINEER</span>
            </h1>
            <p className="text-gray-400 mb-8 md:max-w-[480px]">
              Specializes in mobile application development, crafting
              high-performance, scalable, and user-friendly apps. With extensive
              experience in React Native and modern technologies, we bring ideas
              to life with seamless, innovative, and impactful mobile solutions
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 md:max-w-[480px]">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="md:text-[70px] font-bold">{stat.number}</div>
                  <div className="text-[16px] text-gray-400 whitespace-pre-line">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Projects */}
            <section className="mb-20">
              <h2 className="text-[80px] font-bold leading-none mb-9 mt-24">
                RECENT
                <br />
                <span className="text-zinc-800">PROJECTS</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                  <Link
                    href="/details"
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
                        {/* <p className="text-gray-400 text-[14px]">
                          {project.description}
                        </p> */}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
              <Link href="/projects">
                <Button
                  onSubmit={() => {
                    alert("jbjnjn");
                    router.push("./projects");
                  }}
                  className="w-full bg-white  text-black mt-9"
                >
                  View All
                </Button>
              </Link>
            </section>

            {/* Experience */}
            <section className="mb-20">
              <h2 className="text-[80px] font-bold leading-none mb-9 mt-24">
                4 YEARS OF
                <br />
                <span className="text-zinc-800">EXPERIENCE</span>
              </h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <Card key={index} className="bg-zinc-900 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{exp.company}</h3>
                      <Badge variant="default">{exp.period}</Badge>
                    </div>
                    <p className="text-gray-400">{exp.description}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Premium Tools */}
            <section className="mb-20">
              <h2 className="text-[80px] font-bold leading-none mb-9 mt-24">
                TECHNOLOGY
                <br />
                <span className="text-zinc-800">STACK</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                {premiumTools.map((tool, index) => (
                  <Card
                    key={index}
                    className="bg-zinc-900 text-white p-3 flex items-center gap-4  hover:bg-white transition-all hover:text-black"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      {tool?.id == "6" || tool?.id == "7" ? (
                        <Image
                          src={tool.icon}
                          alt={tool.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      ) : (
                        <StackIcon name={tool.icon} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-3xl hover:text-black">
                        {tool.name}
                      </h3>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Design Thoughts */}
            {/* <section className="mb-20">
              <h2 className="text-[80px] font-bold leading-none mb-9 mt-24">
                DEVELOPMENT
                <br />
                <span className="text-zinc-800">INSIGHTS</span>
              </h2>
              <div className="space-y-6">
                {blogPosts.map((post, index) => (
                  <Card
                    key={index}
                    className="bg-zinc-900 p-6 group cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-gray-400 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </section> */}

            {/* Let's Work Together */}
            <section className="mb-20">
              <h2 className="text-[80px] font-bold leading-none mb-9 mt-24">
                LET'S WORK
                <br />
                <span className="text-zinc-800">TOGETHER</span>
              </h2>
              {/* <Card className="bg-zinc-900 p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Name</label>
                      <Input
                        placeholder="Your Name"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Email</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Budget</label>
                    <Select>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Select a budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Less than $5,000</SelectItem>
                        <SelectItem value="medium">$5,000 - $10,000</SelectItem>
                        <SelectItem value="large">$10,000 - $20,000</SelectItem>
                        <SelectItem value="enterprise">$20,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Message</label>
                    <Textarea
                      placeholder="Tell me about your project..."
                      className="bg-zinc-800 border-zinc-700 min-h-[150px]"
                    />
                  </div>
                  
                </form>
              </Card> */}
              <Button
                onClick={() =>
                  window.open("https://wa.me/923363766006", "_blank")
                }
                className="w-full h-12 bg-white text-lg  text-black"
              >
                Let's Connect
              </Button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
