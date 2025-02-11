"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";

export default function Detail() {
  const searchParams = useSearchParams();
  const dataString: any = searchParams.get("data");
  const projectDetails = JSON.parse(decodeURIComponent(dataString));

  // console.log("projectDetails===>>>", projectDetails);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video */}
      <div>
        {projectDetails.videoUrl?.length > 0 ? (
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
        ) : (
          <Image
            src={projectDetails?.images?.[1]}
            alt={`Project image`}
            layout="full"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="px-5 lg:px-0">
        <div className="max-w-7xl mx-auto pb-16 ">
          <div className="flex py-7 items-center justify-center ">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center">
              {projectDetails.title}
            </h1>
          </div>

          {/* Project Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-zinc-900 p-6 col-span-3">
              <h2 className="text-2xl font-bold mb-4">Project Details</h2>
              <div className="space-y-4 my-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Category
                  </h3>
                  <p className="text-gray-400">{projectDetails.category}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {projectDetails.technologies.map((tech: any) => (
                      <Badge
                        className="h-8 rounded-sm"
                        key={tech}
                        variant="default"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
              <p className="text-gray-400 text-lg mb-6">
                {projectDetails.description}
              </p>
              <div className="space-y-6">
                {projectDetails.challenge && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      The Challenge
                    </h3>
                    <p className="text-gray-400">{projectDetails.challenge}</p>
                  </div>
                )}
                {projectDetails.goal && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Project Goal</h3>
                    <p className="text-gray-400">{projectDetails.goal}</p>
                  </div>
                )}
                {projectDetails.audience && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Target Audience
                    </h3>
                    <p className="text-gray-400">{projectDetails.audience}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Project Images */}
          <div className="space-y-8 pb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none mb-9 mt-10">
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
        </div>
      </div>
    </div>
  );
}
