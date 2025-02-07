// "use client";

// import { Card } from "@/components/ui/card";
// import { ArrowLeft } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// export default function Details() {
//   const projects = [
//     {
//       title: "Chefnero",
//       image: require("../../lib/projectAssets/Chefnero/display.png"),
//     },
//     {
//       title: "Event Buddy",
//       image: require("../../lib/projectAssets/EventBuddy/display.png"),
//     },
//     {
//       title: "Fluospeak",
//       image: require("../../lib/projectAssets/Fluospeak/display.png"),
//     },
//     {
//       title: "Geelink",
//       image: require("../../lib/projectAssets/Geelink/ss-1.png"),
//     },
//     {
//       title: "Group Homes",
//       image: require("../../lib/projectAssets/GroupHomes/mockup.png"),
//     },
//     {
//       title: "Muslim Me",
//       image: require("../../lib/projectAssets/MuslimMe/mockup.png"),
//     },
//     {
//       title: "Phonesheet",
//       image: require("../../lib/projectAssets/Phonesheet/mockup.png"),
//     },
//     {
//       title: "Pidj",
//       image: require("../../lib/projectAssets/Pidj/display.png"),
//     },
//     {
//       title: "Prox Equine",
//       image: require("../../lib/projectAssets/ProxEquine/ss-3.jpg"),
//     },
//     {
//       title: "Prox Vet",
//       image: require("../../lib/projectAssets/ProxVet/ss-1.png"),
//     },
//     {
//       title: "ShowOff",
//       image: require("../../lib/projectAssets/ShowOff/display.png"),
//     },
//     {
//       title: "Tapped-N",
//       image: require("../../lib/projectAssets/Tapped-N/ss-1.jpg"),
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-black text-white p-8">
//       <div className="max-w-6xl mx-auto">
//         <Link
//           href="/projects"
//           className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to Home
//         </Link>

//         <Card className="bg-zinc-900 p-8">
//           <h1 className="text-[120px] font-bold leading-tight mb-8">
//             PROJECT DETAILS
//           </h1>
//           <div className="prose prose-invert max-w-none">
//             <p className="text-gray-400 text-lg mb-6">
//               I provide end-to-end design and development services, transforming
//               business ideas into fully functional and market-ready digital
//               solutions. From conceptualization to deployment, I ensure a
//               seamless and innovative journey toward a successful launch.
//             </p>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Detail() {
  const projectDetails = {
    title: "Chefnero Chef",
    category: "Web Development",
    client: "Restaurant Chain",
    date: "2024",
    technologies: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS"],
    description:
      "A comprehensive restaurant management system designed to streamline operations and enhance customer experience.",
    challenge:
      "The client needed a modern, efficient system to manage multiple restaurant locations, handle online orders, and maintain inventory across their chain.",
    solution:
      "We developed a full-stack solution that integrates real-time order tracking, inventory management, and a customer-facing ordering system.",
    videoUrl:
      "https://tech-verticks-website-bucket.sfo3.cdn.digitaloceanspaces.com/fd111c0a-40b4-4930-9456-516150092eac_ChefneroInner.mp4",
    images: [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=800&q=80",
    ],
  };

  return (
    <div className=" bg-black text-white">
      <div className="w-full h-[100vh] object-contain relative overflow-hidden">
        <iframe
          src={`${projectDetails.videoUrl}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
          allow="autoplay; fullscreen; picture-in-picture"
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "none",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40" />
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-7xl font-bold text-center">
            {projectDetails.title}
          </h1>
        </div> */}
      </div>
      <div className="flex items-center pt-5 justify-center">
        <h1 className="text-7xl font-bold text-center">
          {projectDetails.title}
        </h1>
      </div>
      <div className="max-w-7xl mx-auto py-16">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>

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
                <h3 className="text-xl font-semibold mb-3">The Solution</h3>
                <p className="text-gray-400">{projectDetails.solution}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-zinc-900 p-6">
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
                  {projectDetails.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Project Images */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold mb-8">
            PROJECT
            <br />
            <span className="text-zinc-800">GALLERY</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectDetails.images.map((image, index) => (
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
  );
}
