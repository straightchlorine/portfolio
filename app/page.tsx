import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { LiveMetrics } from "@/components/LiveMetrics";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-x-hidden">
      <div className="relative z-10 min-h-screen flex flex-col overflow-x-hidden">
        {/* Navigation */}
        <nav className="w-full px-6 py-6 border-b border-gray-800/50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="font-mono text-lg font-bold text-white">
              <span className="text-purple-400">/</span>codex<span className="text-gray-600">.technologies</span>
            </div>
            <div className="flex gap-6 font-mono text-sm">
              <Link
                href="/experience"
                className="text-gray-400 hover:text-white transition-colors"
              >
                /experience
              </Link>
              <Link
                href="https://github.com/straightchlorine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                /github
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-1 px-6 py-16">
          <div className="max-w-7xl mx-auto">
            {/* Intro */}
            <div className="mb-12 animate-in fade-in duration-1000">
              <div className="mb-6">
                <span className="font-mono text-green-400 text-sm">piotr@wroclaw:~$</span>
                <span className="font-mono text-gray-400 text-sm ml-2">whoami</span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Full-Stack Engineer<br />
                <span className="text-gray-500">Building AI systems & production infrastructure</span>
              </h1>

              <div className="space-y-3 font-mono text-lg text-gray-300 max-w-3xl">
                <p>
                  <span className="text-purple-400">→</span> Full-Stack Engineer @ Kalasar · RAG systems & Voice AI platforms
                </p>
                <p>
                  <span className="text-green-400">→</span> DSW University · 5.0/5.0 GPA · 4x scholarship recipient
                </p>
                <p>
                  <span className="text-orange-400">→</span> 10 years coding experience · Certified IT Professional (EE.08, EE.09)
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="https://github.com/straightchlorine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-mono font-semibold rounded-lg hover:bg-gray-200 transition-all"
                  aria-label="Visit my GitHub profile"
                >
                  <Github className="w-5 h-5" aria-hidden="true" />
                  GitHub
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/straightchlorine/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-mono font-semibold rounded-lg border border-gray-700 hover:bg-gray-700 transition-all"
                  aria-label="Visit my LinkedIn profile"
                >
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                  LinkedIn
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="mailto:engineering@codextechnologies.org"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-mono font-semibold rounded-lg border border-gray-700 hover:bg-gray-700 transition-all"
                  aria-label="Send me an email"
                >
                  <Mail className="w-5 h-5" aria-hidden="true" />
                  Contact
                </Link>
              </div>
            </div>

            {/* Live Cluster Status */}
            <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              <div className="mb-4 font-mono text-sm text-gray-400">
                <span className="text-green-400">piotr@wroclaw:~$</span>
                <span className="ml-2">kubectl get pods -n portfolio</span>
              </div>
              <ErrorBoundary>
                <LiveMetrics />
              </ErrorBoundary>
            </div>

            {/* Featured Project: Quantum Pipeline */}
            <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <h2 className="text-2xl font-bold text-white mb-6 font-mono">
                <span className="text-purple-400">#</span> Featured Project
              </h2>

              <Link
                href="https://github.com/straightchlorine/quantum-pipeline"
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-purple-500/50 transition-all"
                aria-label="View Quantum Computing Pipeline project on GitHub"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      Quantum Computing Pipeline
                    </h3>
                    <div className="flex items-center gap-3 font-mono text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full" aria-hidden="true" />
                        Production
                      </span>
                      <span aria-hidden="true">•</span>
                      {/* PyPI Package Badge */}
                      <img
                        src="https://badge.fury.io/py/quantum-pipeline.svg"
                        alt="PyPI version"
                        className="h-4 transition-all duration-300 hover:scale-110 hover:brightness-110"
                      />
                      <span aria-hidden="true">•</span>
                      {/* PyPI Downloads Badge */}
                      <img
                        src="https://static.pepy.tech/badge/quantum-pipeline"
                        alt="Total Downloads"
                        className="h-4 transition-all duration-300 hover:scale-110 hover:brightness-110"
                      />
                      <span aria-hidden="true">•</span>
                      {/* Docker Pulls Badge */}
                      <img
                        src="https://img.shields.io/docker/pulls/straightchlorine/quantum-pipeline.svg"
                        alt="Docker Pulls"
                        className="h-4 transition-all duration-300 hover:scale-110 hover:brightness-110"
                      />
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors" aria-hidden="true" />
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  Extensible framework for quantum algorithm execution on IBM Quantum hardware and
                  accelerated classical simulation via Qiskit Aer. Integrated into a production-grade
                  data streaming platform processing 50,000+ quantum experiments monthly across 15
                  containerized microservices. Apache Kafka with Schema Registry, Apache Spark,
                  and Apache Iceberg data lake, orchestrated with Airflow and complete CI/CD automation.
                  Multi-variant Docker builds (CPU/GPU) with CUDA achieving 2-5x GPU acceleration over CPU baselines.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {["Kafka", "Spark", "Iceberg", "IBM Cloud", "Airflow", "Docker", "CUDA", "Prometheus", "Grafana", "S3", "MinIO"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs font-mono text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-800">
                  <div className="group/stat opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                    <div className="text-2xl font-bold text-blue-400 transition-all duration-300 group-hover/stat:scale-110">50K+</div>
                    <div className="text-xs text-gray-500 font-mono transition-colors group-hover/stat:text-gray-400">Monthly Experiments</div>
                  </div>
                  <div className="group/stat opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                    <div className="text-2xl font-bold text-purple-400 transition-all duration-300 group-hover/stat:scale-110">9</div>
                    <div className="text-xs text-gray-500 font-mono transition-colors group-hover/stat:text-gray-400">ML Feature Tables</div>
                  </div>
                  <div className="group/stat opacity-0 animate-fade-in-up" style={{ animationDelay: '700ms' }}>
                    <div className="text-2xl font-bold text-orange-400 transition-all duration-300 group-hover/stat:scale-110">15</div>
                    <div className="text-xs text-gray-500 font-mono transition-colors group-hover/stat:text-gray-400">Microservices</div>
                  </div>
                  <div className="group/stat opacity-0 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                    <div className="text-2xl font-bold text-green-400 transition-all duration-300 group-hover/stat:scale-110">2-5x</div>
                    <div className="text-xs text-gray-500 font-mono transition-colors group-hover/stat:text-gray-400">GPU Performance</div>
                  </div>
                </div>
              </Link>
            </div>

            {/* More Projects */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              <h2 className="text-2xl font-bold text-white mb-6 font-mono">
                <span className="text-purple-400">#</span> Other Projects
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Link
                  href="https://github.com/straightchlorine/wikipedia-knowledge-explorer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all"
                  aria-label="View Wikipedia Knowledge Explorer project on GitHub"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      Wikipedia Knowledge Explorer
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-400 mb-4">
                    Full-stack ML application with K-Means clustering and semantic embeddings.
                    Containerized microservices with multi-variant Docker builds (GPU + CPU), comprehensive CI/CD with GitHub Actions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["FastAPI", "React 19", "D3.js", "Docker", "GitHub Actions"].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>

                <Link
                  href="https://github.com/straightchlorine/cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all"
                  aria-label="View Self-Hosted Cloud Infrastructure project on GitHub"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                      Self-Hosted Cloud Infrastructure
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-green-400 transition-colors" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-400 mb-4">
                    Complete datacenter infrastructure with monitoring stack (Grafana/Prometheus),
                    network storage with RAID and btrfs, VPN services, and automated VM provisioning with QEMU/Proxmox.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Kubernetes", "QEMU", "Proxmox", "Grafana", "Prometheus", "Ansible"].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full px-6 py-8 border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span>Wrocław, Poland</span>
                <span>•</span>
                <span>Open to opportunities</span>
              </div>
              <div className="flex gap-6">
                <Link
                  href="https://github.com/straightchlorine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </Link>
                <Link
                  href="https://www.linkedin.com/in/straightchlorine/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </Link>
                <Link
                  href="https://hub.docker.com/u/straightchlorine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Docker Hub
                </Link>
                <Link
                  href="https://pypi.org/user/straightchlorine/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  PyPI
                </Link>
              </div>
            </div>
            <div className="mt-4 text-center text-xs text-gray-600 font-mono">
              Infrastructure: K3s on Hetzner · CI/CD: GitHub Actions · Cost: €6/mo
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
