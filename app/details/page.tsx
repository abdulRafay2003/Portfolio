"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";

import { log } from "console";

export default function Detail() {
  const searchParams = useSearchParams();
  const dataString: any = searchParams.get("data");
  const projectDetails = JSON.parse(decodeURIComponent(dataString));

  console.log("projectDetails===>>>", projectDetails);
  // const projectDetails = {
  //   title: "Chefnero Chef",
  //   category: "Web Development",
  //   client: "Restaurant Chain",
  //   date: "2024",
  //   technologies: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS"],
  //   description:
  //     "A comprehensive restaurant management system designed to streamline operations and enhance customer experience.",
  //   challenge:
  //     "The client needed a modern, efficient system to manage multiple restaurant locations, handle online orders, and maintain inventory across their chain.",
  //   solution:
  //     "We developed a full-stack solution that integrates real-time order tracking, inventory management, and a customer-facing ordering system.",
  //   videoUrl:
  //     "https://tech-verticks-website-bucket.sfo3.cdn.digitaloceanspaces.com/fd111c0a-40b4-4930-9456-516150092eac_ChefneroInner.mp4",
  //   images: [
  //     require("../../lib/projectAssets/Chefnero/display-2.webp"),
  //     require("../../lib/projectAssets/Chefnero/display.png"),
  //   ],
  // };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video */}
      <div>
        <video
          autoPlay
          loop
          muted
          playsInline
          src={projectDetails.videoUrl}
          className="w-full h-full object-cover"
        >
          <source src={projectDetails.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="max-w-7xl mx-auto pb-16 ">
        {/* <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-0 transition-colors py-10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Link> */}
        <div className="flex py-7 items-center justify-center ">
          <h1 className="text-7xl font-bold text-center">
            {projectDetails.title}
          </h1>
          <h3></h3>
        </div>

        {/* Project Images */}
        <div className="space-y-8 pb-16">
          <h2 className="text-[80px] font-bold leading-none mb-9 mt-10">
            PROJECT
            <br />
            <span className="text-zinc-800">GALLERY</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectDetails.images.map((image: any, index: any) => (
              <div key={index} className="relative aspect-video">
                <Image
                  src={image}
                  alt={`Project image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Project Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-zinc-900 p-6 col-span-2">
            <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
            <p className="text-gray-400 text-lg mb-6">
              {projectDetails.description}
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">The Challenge</h3>
                <p className="text-gray-400">{projectDetails.challenge}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Project Goal</h3>
                <p className="text-gray-400">{projectDetails.goal}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Target Audience</h3>
                <p className="text-gray-400">{projectDetails.audience}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-zinc-900 p-6 h-[450px]">
            <h2 className="text-2xl font-bold mb-4">Project Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Category</h3>
                <p>{projectDetails.category}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Client</h3>
                <p>{projectDetails.client}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Date</h3>
                <p>{projectDetails.date}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {projectDetails.technologies.map((tech: any) => (
                    <Badge className="h-7" key={tech} variant="default">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
