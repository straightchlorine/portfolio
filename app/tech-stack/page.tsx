"use client";

import { useState } from "react";
import {
  Brain,
  Rocket,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface Role {
  id: string;
  name: string;
  shortTitle: string;
  tagline: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  gradient: string;
  keySkills: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

const roles: Role[] = [
  {
    id: "ai-ml",
    name: "AI/ML Engineer",
    shortTitle: "AI/ML",
    tagline: "Building intelligent systems with RAG, LLMs, and vector search",
    Icon: Brain,
    gradient: "from-purple-500 to-pink-500",
    keySkills: ["RAG Systems", "OpenAI API", "pgvector", "LangChain"],
    stats: [
      { label: "Production RAG", value: "100+ products" },
      { label: "Query Speed", value: "<200ms p95" },
    ],
  },
  {
    id: "fullstack",
    name: "Full-Stack Engineer",
    shortTitle: "Full-Stack",
    tagline: "End-to-end web applications with modern React and Python",
    Icon: Layers,
    gradient: "from-cyan-500 to-blue-500",
    keySkills: ["React 19", "Next.js", "FastAPI", "PostgreSQL"],
    stats: [
      { label: "Frontend", value: "React 19" },
      { label: "Backend", value: "FastAPI" },
    ],
  },
  {
    id: "platform-devops",
    name: "Platform/DevOps Engineer",
    shortTitle: "Platform/DevOps",
    tagline: "Production Kubernetes, CI/CD, and cloud infrastructure",
    Icon: Rocket,
    gradient: "from-yellow-500 to-orange-500",
    keySkills: ["Kubernetes", "Docker", "GitHub Actions", "Terraform"],
    stats: [
      { label: "Docker Pulls", value: "1.4K+" },
      { label: "Multi-Cloud", value: "AWS/Azure/GCP" },
    ],
  },
];

export default function TechStack() {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6 font-mono"
          >
            ← Back
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-purple-400" />
            <h1 className="text-5xl sm:text-7xl font-bold text-white">
              Tech Stack
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl font-mono">
            Select a role to explore the full tech stack and featured projects
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {roles.map((role, index) => {
            const IconComponent = role.Icon;
            const isHovered = hoveredRole === role.id;

            return (
              <Link
                key={role.id}
                href={`/tech-stack/${role.id}`}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
                className={`group relative bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-gray-700 transition-all duration-500 ${
                  index === 0 ? '' : index === 1 ? 'animation-delay-100' : 'animation-delay-200'
                }`}
              >
                {/* Animated Gradient Background */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500 blur-2xl`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${role.gradient} transition-transform duration-500 ${
                        isHovered ? "scale-110 rotate-6" : ""
                      }`}
                    >
                      <IconComponent className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    {role.name}
                  </h2>

                  {/* Tagline */}
                  <p className="text-gray-400 text-sm mb-6 font-mono leading-relaxed">
                    {role.tagline}
                  </p>

                  {/* Key Skills */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {role.keySkills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-800/50 text-gray-400 rounded-lg text-xs font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                      <span className="px-3 py-1 bg-gray-800/50 text-gray-500 rounded-lg text-xs font-mono">
                        +{role.keySkills.length - 3} more
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {role.stats.map((stat, idx) => (
                      <div key={idx}>
                        <div className="text-xs text-gray-500 font-mono mb-1">
                          {stat.label}
                        </div>
                        <div className="text-sm font-bold text-white font-mono">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-purple-400 font-mono text-sm group-hover:gap-4 transition-all duration-300">
                    <span>View Details</span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isHovered ? "translate-x-1" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Corner Accent */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${role.gradient} opacity-5 rounded-3xl transform rotate-45 translate-x-16 -translate-y-16 transition-all duration-500 ${
                    isHovered ? "scale-150 opacity-10" : ""
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-mono">
              3
            </div>
            <div className="text-xs text-gray-500 mt-1">Specializations</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-mono">
              50+
            </div>
            <div className="text-xs text-gray-500 mt-1">Technologies</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-mono">
              5+
            </div>
            <div className="text-xs text-gray-500 mt-1">Years Experience</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-mono">
              1.4K+
            </div>
            <div className="text-xs text-gray-500 mt-1">Docker Pulls</div>
          </div>
        </div>
      </div>
    </div>
  );
}
