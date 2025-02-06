"use client";

import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function About() {
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
            ABOUT
            <br />
            <span className="text-zinc-800">ME</span>
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-400 text-lg mb-6">
              I am a passionate Software Engineer with over 4 years of
              experience in creating innovative solutions. My expertise spans
              across multiple technologies and frameworks, allowing me to tackle
              complex challenges and deliver exceptional results.
            </p>

            <h2 className="text-3xl font-bold mb-4">My Philosophy</h2>
            <p className="text-gray-400 text-lg mb-6">
              I believe in creating software that not only meets technical
              requirements but also delivers an exceptional user experience.
              Every line of code I write is crafted with attention to detail,
              performance, and scalability.
            </p>

            <h2 className="text-3xl font-bold mb-4">Technical Expertise</h2>
            <ul className="text-gray-400 text-lg space-y-2 mb-6">
              <li>
                • Frontend Development (React.js, Next.js, Vue.js, React Native,
                Flutter)
              </li>
              <li>• Backend Development (Node.js, Python, Php)</li>
              <li>• Database Design (SQL, NoSQL)</li>
              <li>• Cloud Services (AWS, Azure)</li>
              <li>• DevOps & CI/CD</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
