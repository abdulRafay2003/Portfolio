"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  ExternalLink,
  Layers,
  User2,
  ArrowRight,
} from "lucide-react";
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

export default function Home() {
  const stats = [
    { number: "+12", label: "YEARS OF\nEXPERIENCE" },
    { number: "+46", label: "PROJECTS\nCOMPLETED" },
    { number: "+20", label: "WORLDWIDE\nCLIENTS" },
  ];

  const skills = [
    {
      title: "DYNAMIC ANIMATION, MOTION DESIGN",
      icon: <Layers className="w-6 h-6" />,
      color: "bg-[#ff5733]",
    },
    {
      title: "FRAMER, FIGMA, WORDPRESS, REACT.JS",
      icon: <Briefcase className="w-6 h-6" />,
      color: "bg-[#c8ff00]",
    },
  ];

  const projects = [
    {
      title: "Revo",
      description: "Free Framer Template",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&q=80",
    },
    {
      title: "NajmAI",
      description: "Saas Framer Template",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&q=80",
    },
    {
      title: "Nashra",
      description: "Saas Framer Template",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&q=80",
    },
  ];

  const experiences = [
    {
      company: "PixelForge Studios",
      period: "Jan 2020 - Present",
      description:
        "Led the design team in creating user-centric mobile and web applications, improving the user experience and increasing user engagement.",
    },
    {
      company: "BlueWave Innovators",
      period: "Jun 2017 - Dec 2019",
      description:
        "Developed and implemented design strategies for new product lines. Collaborated closely with engineers and product managers.",
    },
    {
      company: "TrendCraft Solutions",
      period: "Mar 2015 - May 2017",
      description:
        "Designed user interfaces for e-commerce platforms, focusing on enhancing usability and visual appeal.",
    },
  ];

  const premiumTools = [
    {
      name: "HTML",
      description: "Website Builder",
      icon: "https://images.unsplash.com/photo-1618609378039-b572f64c5b42?w=80&h=80&q=80",
    },
    {
      name: "CSS",
      description: "Design Tool",
      icon: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=80&h=80&q=80",
    },
    {
      name: "JS",
      description: "Payments Provider",
      icon: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=80&h=80&q=80",
    },
    {
      name: "TS",
      description: "React Framework",
      icon: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=80&h=80&q=80",
    },
    {
      name: "REACT",
      description: "AI Assistant",
      icon: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=80&h=80&q=80",
    },
    {
      name: "REACT NATIVE",
      description: "Productivity Tool",
      icon: "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=80&h=80&q=80",
    },
    {
      name: "XCODE",
      description: "React Framework",
      icon: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=80&h=80&q=80",
    },
    {
      name: "ANDROID STUDIO",
      description: "React Framework",
      icon: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=80&h=80&q=80",
    },
    {
      name: "KOTLIN",
      description: "React Framework",
      icon: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=80&h=80&q=80",
    },
    {
      name: "SWIFT",
      description: "React Framework",
      icon: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=80&h=80&q=80",
    },
    {
      name: "GIT",
      description: "React Framework",
      icon: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=80&h=80&q=80",
    },
  ];

  const blogPosts = [
    {
      title: "Starting and Growing a Career in Mobile App Development",
      excerpt:
        "As mobile technology continues to evolve rapidly, the demand for skilled app developers grows. From startups to enterprise-level companies, mobile apps play a crucial role in digital transformation, making React Native a valuable skill for modern developers.",
      date: "Apr 8, 2022",
      readTime: "6min read",
    },
    {
      title: "Create a Landing Page That Performs Great",
      excerpt:
        "Whether you work in marketing, sales, or product design, you understand the importance of a quality landing page.",
      date: "Mar 15, 2022",
      readTime: "6min read",
    },
    {
      title: "How Can Designers Prepare for the Future?",
      excerpt:
        "Whether you work in marketing, sales, or product design, you understand the importance of a quality landing page.",
      date: "Feb 28, 2022",
      readTime: "6min read",
    },
  ];

  return (
    <div className="min-h-screen bg-[#151312] text-white p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-24 mb-20 relative">
          {/* Profile Card - Now Sticky */}
          <div className="md:sticky md:top-8 md:h-fit">
            <Card className=" p-10 flex-1 w-[500px] h-[500px] md:max-w-xs bg-white">
              <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&q=80"
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h2 className="text-3xl font-bold text-black mb-2">
                Abdul Rafay
              </h2>
              <p className="text-sm text-gray-400 mb-4 mt-5">
                A Software Engineer who has developed countless innovative
                solutions.
              </p>
              <div className="flex gap-2">
                {["Twitter", "GitHub", "LinkedIn", "Instagram"].map(
                  (social) => (
                    <Button
                      key={social}
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
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
              Passionate about creating intuitive and engaging user experiences.
              Specialize in transforming ideas into beautifully crafted
              products.
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <Card
                    key={index}
                    className="bg-zinc-900 overflow-hidden group cursor-pointer"
                  >
                    <div className="relative h-48">
                      <Image
                        src={project.image}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <p className="text-gray-400">{project.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section className="mb-20">
              <h2 className="text-[80px] font-bold leading-none mb-9 mt-24">
                12 YEARS OF
                <br />
                <span className="text-zinc-800">EXPERIENCE</span>
              </h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <Card key={index} className="bg-zinc-900 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{exp.company}</h3>
                      <Badge variant="secondary">{exp.period}</Badge>
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
                    className="bg-zinc-900 p-3 flex items-center gap-4"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={tool.icon}
                        alt={tool.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-3xl">{tool.name}</h3>
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
              <Card className="bg-zinc-900 p-8">
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
                  <Button
                    onSubmit={() => {
                      alert("jbjnjn");
                    }}
                    className="w-full bg-[#ff5733] hover:bg-[#ff4519] text-white"
                  >
                    Submit
                  </Button>
                </form>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
