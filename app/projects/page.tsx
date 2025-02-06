"use client";

import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  const projects = [
    {
      title: "Chefnero",
      image: require("../../lib/projectAssets/Chefnero/display.png"),
    },
    {
      title: "Event Buddy",
      image: require("../../lib/projectAssets/EventBuddy/display.png"),
    },
    {
      title: "Fluospeak",
      image: require("../../lib/projectAssets/Fluospeak/display.png"),
    },
    {
      title: "Geelink",
      image: require("../../lib/projectAssets/Geelink/ss-1.png"),
    },
    {
      title: "Group Homes",
      image: require("../../lib/projectAssets/GroupHomes/mockup.png"),
    },
    {
      title: "Muslim Me",
      image: require("../../lib/projectAssets/MuslimMe/mockup.png"),
    },
    {
      title: "Phonesheet",
      image: require("../../lib/projectAssets/Phonesheet/mockup.png"),
    },
    {
      title: "Pidj",
      image: require("../../lib/projectAssets/Pidj/display.png"),
    },
    {
      title: "Prox Equine",
      image: require("../../lib/projectAssets/ProxEquine/ss-3.jpg"),
    },
    {
      title: "Prox Vet",
      image: require("../../lib/projectAssets/ProxVet/ss-1.png"),
    },
    {
      title: "ShowOff",
      image: require("../../lib/projectAssets/ShowOff/display.png"),
    },
    {
      title: "Tapped-N",
      image: require("../../lib/projectAssets/Tapped-N/ss-1.jpg"),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="bg-zinc-900 p-8">
          <h1 className="text-[120px] font-bold leading-tight mb-8">
            PROJECTS
          </h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-400 text-lg mb-6">
              I provide end-to-end design and development services, transforming
              business ideas into fully functional and market-ready digital
              solutions. From conceptualization to deployment, I ensure a
              seamless and innovative journey toward a successful launch.
            </p>
          </div>
        </Card>

        <section className="mb-20">
          <h2 className="text-[70px] font-bold leading-none mb-9 mt-10">
            SUCCESSFUL PROJECTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[70px]">
            {projects.map((project, index) => (
              <Link
                href="/details"
                className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
              >
                <Card
                  key={index}
                  className="bg-zinc-900 overflow-hidden group cursor-pointer w-full h-50"
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
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
