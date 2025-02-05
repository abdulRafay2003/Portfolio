"use client";

import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Projects() {
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
      </div>
    </div>
  );
}
