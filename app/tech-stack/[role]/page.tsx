"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Brain,
  Rocket,
  Layers,
  ExternalLink,
  ArrowLeft,
  Check,
} from "lucide-react";
import { FiGithub } from "react-icons/fi";
import Link from "next/link";

interface Project {
  name: string;
  description: string;
  link?: string;
  github?: string;
  highlight?: string;
  metrics?: string[];
}

interface RoleData {
  id: string;
  name: string;
  tagline: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  gradient: string;
  overview: string;
  categories: {
    name: string;
    items: string[];
  }[];
  projects: Project[];
  highlights: string[];
}

const roleData: Record<string, RoleData> = {
  "ai-ml": {
    id: "ai-ml",
    name: "AI/ML Engineer",
    tagline: "Building intelligent systems with RAG, LLMs, and vector search",
    Icon: Brain,
    gradient: "from-purple-500 to-pink-500",
    overview:
      "Specializing in production-ready AI systems with focus on Retrieval-Augmented Generation (RAG), large language models, and semantic search. Experience building scalable AI pipelines serving real-time queries with sub-200ms latency.",
    categories: [
      {
        name: "AI/ML Stack",
        items: [
          "RAG Systems",
          "OpenAI API (GPT-4, o1)",
          "Anthropic Claude",
          "Prompt Engineering",
          "LangChain",
          "LlamaIndex",
        ],
      },
      {
        name: "Vector & Search",
        items: ["pgvector", "Weaviate", "Semantic Search", "Embeddings"],
      },
      {
        name: "ML & Data Science",
        items: ["NVIDIA CUDA", "Scikit-Learn", "Python", "FastAPI"],
      },
    ],
    projects: [
      {
        name: "Production RAG System @ Kalasar",
        description:
          "Built and deployed a production RAG system serving 100+ products with pgvector and semantic search. Optimized query performance to achieve <200ms p95 latency with intelligent caching and query optimization.",
        highlight: "Production · 100+ products · <200ms queries",
        metrics: [
          "Sub-200ms p95 latency",
          "100+ products indexed",
          "Real-time updates",
          "Semantic search with pgvector",
        ],
      },
      {
        name: "Wikipedia Knowledge Explorer",
        description:
          "AI-powered article clustering and visualization system using machine learning and D3.js. Implements semantic search, topic modeling, and interactive network graphs for knowledge discovery.",
        github: "https://github.com/straightchlorine/wikipedia-knowledge-explorer",
        highlight: "ML clustering · Interactive visualization",
        metrics: [
          "Scikit-Learn clustering",
          "D3.js visualization",
          "FastAPI backend",
          "Real-time analysis",
        ],
      },
    ],
    highlights: [
      "Production RAG systems with <200ms latency",
      "Experience with GPT-4, o1, and Claude APIs",
      "Vector search optimization with pgvector",
      "Semantic search and embeddings",
      "CUDA acceleration for ML workloads",
    ],
  },
  fullstack: {
    id: "fullstack",
    name: "Full-Stack Engineer",
    tagline: "End-to-end web applications with modern React and Python",
    Icon: Layers,
    gradient: "from-cyan-500 to-blue-500",
    overview:
      "Building modern web applications with React 19, Next.js, and Python backends. Expertise in creating responsive, performant UIs with FastAPI microservices, PostgreSQL databases, and real-time features.",
    categories: [
      {
        name: "Frontend",
        items: [
          "React 19",
          "Next.js 15",
          "TypeScript",
          "TanStack Query",
          "shadcn/ui",
          "Tailwind CSS",
          "Radix UI",
        ],
      },
      {
        name: "Backend",
        items: [
          "Python",
          "FastAPI",
          "Django",
          "Flask",
          "REST APIs",
          "GraphQL",
          "WebSocket",
        ],
      },
      {
        name: "Database & State",
        items: ["PostgreSQL", "SQLAlchemy", "Redis", "MongoDB", "Zod Validation"],
      },
    ],
    projects: [
      {
        name: "Production Web Apps @ Kalasar",
        description:
          "Full-stack applications built with React 19, FastAPI, and PostgreSQL. Implements real-time product data updates, advanced search, and responsive UI with TanStack Query for state management.",
        highlight: "React 19 · FastAPI · PostgreSQL · Production",
        metrics: [
          "React 19 with Server Components",
          "FastAPI microservices",
          "PostgreSQL with SQLAlchemy",
          "Real-time updates via WebSocket",
        ],
      },
      {
        name: "Portfolio Site (This Site)",
        description:
          "Built with Next.js 15, featuring live Kubernetes metrics, responsive design, and deployed on self-hosted Hetzner K3s cluster. Implements server-side rendering and real-time cluster monitoring.",
        github: "https://github.com/straightchlorine/portfolio",
        highlight: "Next.js 15 · K8s metrics · Self-hosted",
        metrics: [
          "Next.js 15 App Router",
          "Live K8s metrics API",
          "Tailwind CSS + shadcn/ui",
          "Self-hosted on K3s",
        ],
      },
    ],
    highlights: [
      "React 19 with modern patterns and hooks",
      "Next.js 15 with App Router and SSR",
      "FastAPI microservices architecture",
      "PostgreSQL with advanced queries",
      "Real-time features with WebSocket",
    ],
  },
  "platform-devops": {
    id: "platform-devops",
    name: "Platform/DevOps Engineer",
    tagline: "Production Kubernetes, CI/CD, and cloud infrastructure",
    Icon: Rocket,
    gradient: "from-yellow-500 to-orange-500",
    overview:
      "Experienced in building and maintaining production Kubernetes clusters across AWS, Azure, and GCP. Expertise in CI/CD automation, Infrastructure as Code, and container orchestration with focus on reliability and cost optimization.",
    categories: [
      {
        name: "Container & Orchestration",
        items: ["Kubernetes", "Helm", "Docker", "K3s", "Container Security"],
      },
      {
        name: "CI/CD & Automation",
        items: ["GitHub Actions", "GitLab CI", "Terraform", "Ansible", "GitOps"],
      },
      {
        name: "Cloud Platforms",
        items: [
          "AWS (EKS, S3, Lambda, RDS)",
          "Azure (AKS, AI Foundry)",
          "GCP (GKE)",
          "Hetzner",
        ],
      },
      {
        name: "Monitoring & Observability",
        items: ["Grafana", "Prometheus", "Elasticsearch", "Kibana", "Tempo"],
      },
    ],
    projects: [
      {
        name: "Quantum Computing Pipeline",
        description:
          "Distributed quantum simulation framework with cuQuantum GPU acceleration, Apache Kafka streaming, and Airflow orchestration. Containerized and published to Docker Hub with 1.4K+ pulls. Achieved 10x faster simulation speeds in production.",
        github: "https://github.com/straightchlorine/quantum-pipeline",
        highlight: "1.4K+ Docker pulls · Production-ready",
        metrics: [
          "1.4K+ Docker Hub pulls",
          "Kafka + Airflow orchestration",
          "CUDA GPU acceleration",
          "Multi-stage Docker builds",
        ],
      },
      {
        name: "Self-Hosted Cloud Infrastructure",
        description:
          "Raspberry Pi cluster automated with Ansible, Docker, and K3s. Implements GitOps workflows, automated backups, and monitoring with Grafana/Prometheus.",
        github: "https://github.com/straightchlorine/cloud",
        highlight: "K3s · Ansible · GitOps",
        metrics: [
          "K3s on ARM architecture",
          "Ansible playbooks for automation",
          "Prometheus monitoring",
          "GitOps with Flux",
        ],
      },
      {
        name: "Multi-Cloud K8s Deployments",
        description:
          "Production workloads deployed across AWS EKS, Azure AKS, and GCP GKE using Terraform and GitOps. Implements multi-cluster service mesh, centralized monitoring, and automated failover.",
        highlight: "Multi-cloud · GitOps · High availability",
        metrics: [
          "Terraform IaC across 3 clouds",
          "GitOps deployment workflows",
          "Cross-cluster service mesh",
          "Centralized Grafana dashboards",
        ],
      },
    ],
    highlights: [
      "Multi-cloud Kubernetes (AWS EKS, Azure AKS, GCP GKE)",
      "GitOps workflows with ArgoCD/Flux",
      "Infrastructure as Code with Terraform",
      "CI/CD pipelines with GitHub Actions",
      "Production monitoring with Grafana/Prometheus",
    ],
  },
};

export default function RolePage() {
  const params = useParams();
  const roleId = params.role as string;
  const role = roleData[roleId];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!role) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Role Not Found</h1>
          <Link href="/tech-stack" className="text-purple-400 hover:text-purple-300">
            ← Back to Tech Stack
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = role.Icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/tech-stack"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8 font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Roles
        </Link>

        {/* Hero Section */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-start gap-6 mb-6">
            <div
              className={`p-6 rounded-3xl bg-gradient-to-br ${role.gradient} transition-transform duration-500 hover:scale-110 hover:rotate-6`}
            >
              <IconComponent className="w-12 h-12 text-white" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
                {role.name}
              </h1>
              <p className="text-2xl text-gray-400 font-mono mb-6">{role.tagline}</p>
              <p className="text-lg text-gray-400 leading-relaxed max-w-3xl">
                {role.overview}
              </p>
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        <div
          className={`mb-16 transition-all duration-1000 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-2xl font-bold text-white mb-6 font-mono">
            Key Highlights
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {role.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-all"
              >
                <div className="mt-0.5">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-gray-300 text-sm font-mono">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div
          className={`mb-16 transition-all duration-1000 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-2xl font-bold text-white mb-6 font-mono">
            Technology Stack
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {role.categories.map((category, idx) => (
              <div
                key={idx}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all"
              >
                <h3 className="text-lg font-bold text-white mb-4 font-mono">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      className="px-3 py-1.5 bg-gray-800/50 text-gray-300 rounded-lg text-sm font-mono hover:bg-gray-800 hover:text-white transition-all cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-2xl font-bold text-white mb-6 font-mono">
            Featured Projects
          </h2>
          <div className="space-y-6">
            {role.projects.map((project, idx) => (
              <div
                key={idx}
                className="group bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                    {project.name}
                  </h3>
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <FiGithub className="w-6 h-6" aria-hidden="true" />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {project.highlight && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg mb-6">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-sm font-mono text-gray-300">
                      {project.highlight}
                    </span>
                  </div>
                )}

                {project.metrics && project.metrics.length > 0 && (
                  <div>
                    <h4 className="text-sm font-mono text-gray-400 mb-3 uppercase tracking-wide">
                      Key Metrics
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {project.metrics.map((metric, metricIdx) => (
                        <div
                          key={metricIdx}
                          className="flex items-center gap-2 text-sm font-mono text-gray-400"
                        >
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                          {metric}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
