import Link from "next/link";
import { ArrowLeft, Briefcase, GraduationCap, Award, Calendar, MapPin } from "lucide-react";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="relative z-10 min-h-screen">
        {/* Navigation */}
        <nav className="w-full px-6 py-6 border-b border-gray-800/50">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="font-mono text-lg font-bold text-white">
              <span className="text-purple-400">/</span>experience
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="px-6 py-16">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Professional Experience
              </h1>
              <p className="text-xl text-gray-400 font-mono">
                Building production systems & AI infrastructure
              </p>
            </div>

            {/* Experience Timeline */}
            <section className="mb-20">
              <div className="flex items-center gap-3 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <Briefcase className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white font-mono">Work Experience</h2>
              </div>

              <div className="space-y-8">
                {/* Kalasar */}
                <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-purple-500/50 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          Full-Stack Software Engineer
                        </h3>
                        <div className="text-lg text-purple-400 font-semibold mb-3">Kalasar</div>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-2 text-sm font-mono text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          May 2025 - Present
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Munich, Bavaria, Germany
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-3 text-gray-300 mb-6">
                      <li className="flex gap-3">
                        <span className="text-rose-400 mt-1.5">→</span>
                        <span>
                          <strong className="text-white">RAG System Architecture: </strong>
                          Engineered a production-grade Retrieval-Augmented Generation pipeline that processes 100+ products and generates 1,000+ contextual embeddings using pgvector for semantic search capabilities
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-indigo-400 mt-1.5">→</span>
                        <span>
                          <strong className="text-white">Localization at Scale: </strong>
                          Implemented multilingual support using Azure OpenAI structured outputs for intelligent, dynamic translation generation across multiple languages with integrated glossary management for contextual accuracy
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-cyan-400 mt-1.5">→</span>
                        <span>
                          <strong className="text-white">Conversational AI Agents: </strong>
                          Built a real-time voice AI platform using the Pipecat framework enabling conversational AI systems for requirement engineering interviews and live meeting transcription with high accuracy
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-emerald-400 mt-1.5">→</span>
                        <span>
                          <strong className="text-white">Analytics Infrastructure: </strong>
                          Designed and implemented a comprehensive analytics platform with interactive dashboards, data aggregation pipelines, and scheduled temporal workflows for automated processing and insights generation
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-amber-400 mt-1.5">→</span>
                        <span>
                          <strong className="text-white">Modern Frontend Development: </strong>
                          Architected type-safe React 19 applications leveraging TanStack Router for advanced routing and TanStack Query for sophisticated server state management and data synchronization
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-orange-400 mt-1.5">→</span>
                        <span>
                          <strong className="text-white">Scalable Microservices: </strong>
                          Architected FastAPI microservices with enterprise-grade authentication (Keycloak and Clerk), Redis caching layers, and PostgreSQL persistence for robust, scalable backend systems
                        </span>
                      </li>
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {["Python", "FastAPI", "React", "TypeScript", "Azure", "Hetzner", "S3", "OpenAI", "Gemini", "Anthropic", "RAG", "pgvector", "PostgreSQL", "Redis", "Docker"].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs font-mono text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Flightbox */}
                <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          Python Backend Developer
                        </h3>
                        <div className="text-lg text-blue-400 font-semibold mb-3">Flightbox sp. z o. o.</div>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-2 text-sm font-mono text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Oct 2024 - Mar 2025
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Wrocław, Poland
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-3 text-gray-300 mb-6">
                      <li className="flex gap-3">
                        <span className="text-sky-400 mt-1.5">→</span>
                        <span>
                          <strong className="text-white">Enterprise ETL Infrastructure:</strong> Developed and maintained containerized ETL pipelines using Docker and orchestration tools for complex data processing workflows in production environments
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-lime-400 mt-1.5">→</span>
                        <span>
                          <strong className="text-white">Production System Integration:</strong> Seamlessly integrated data processing solutions into existing production infrastructure with comprehensive error handling, retry logic, and monitoring capabilities
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-fuchsia-400 mt-1.5">→</span>
                        <span>
                          <strong className="text-white">High-Performance Async Systems:</strong> Engineered asynchronous data processing systems using the Twisted framework to handle high-throughput operations with reliability and optimal resource utilization
                        </span>
                      </li>
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {["Python", "Twisted", "Selenium", "Docker", "ETL", "Linux"].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs font-mono text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Codex */}
                <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-green-500/50 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          Founder & Infrastructure Engineer
                        </h3>
                        <div className="text-lg text-green-400 font-semibold mb-3">Piotr Krzysztof Lis Codex</div>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-2 text-sm font-mono text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Jun 2024 - Present
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Wrocław, Poland
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-3 text-gray-300 mb-6">
                      <li className="flex gap-3">
                        <span className="text-teal-400 mt-1.5">→</span>
                        <span>
                          <strong className="text-white">Enterprise Infrastructure Operations:</strong> Architected and operate production datacenter infrastructure spanning Kubernetes clusters, virtualized environments (Proxmox/QEMU), and distributed NAS storage systems for optimal uptime and reliability
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-violet-400 mt-1.5">→</span>
                        <span>
                          <strong className="text-white">Advanced Observability Platforms:</strong> Deployed comprehensive Prometheus and Grafana infrastructure for real-time metrics collection, visualization, alerting, and performance analytics
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-cyan-400 mt-1.5">→</span>
                        <span>
                          <strong className="text-white">Secure Network Architecture:</strong> Engineered enterprise-grade network infrastructure with VPN services (WireGuard and Tailscale), zero-trust remote access patterns, and automated SSL/TLS certificate lifecycle management
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-yellow-400 mt-1.5">→</span>
                        <span>
                          <strong className="text-white">GPU-Accelerated AI/ML Platform:</strong> Operating large language model inference stack with Llama, Qwen, and Mistral models leveraging NVIDIA CUDA for high-performance GPU-accelerated computations and optimized throughput
                        </span>
                      </li>
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {["Kubernetes", "Docker", "Proxmox", "QEMU", "Grafana", "Prometheus", "WireGuard", "CUDA", "Ansible", "Linux"].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs font-mono text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <div className="flex items-center gap-3 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <GraduationCap className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white font-mono">Education & Certifications</h2>
              </div>

              <div className="space-y-6">
                {/* University */}
                <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '700ms' }}>
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          Bachelor of Engineering in Information Systems Design and Data Analysis
                        </h3>
                        <div className="text-blue-400 font-semibold mb-2">DSW University of Lower Silesia, Wrocław</div>
                        <div className="flex items-center gap-4 text-sm font-mono text-gray-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Oct 2022 - Mar 2026 (Expected)
                          </div>
                          <div className="text-green-400 font-semibold">GPA: 5.00/5.00 (Top of Class)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* High School */}
                <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '750ms' }}>
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          Diploma of IT Technician
                        </h3>
                        <div className="text-blue-400 font-semibold mb-2">School Complex No.1 in Szczytno</div>
                        <div className="flex items-center gap-4 text-sm font-mono text-gray-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Graduated May 2022
                          </div>
                          <div className="text-green-400 font-semibold">GPA: 5.62/6.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scholarships & Awards */}
                <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-lg font-bold text-white">Scholarships & Awards</h3>
                    </div>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex gap-3">
                        <span className="text-amber-400 mt-1">•</span>
                        <span>
                          <strong className="text-white">Rector's Scientific Scholarship</strong> for Best Students (2023, 2024, 2025) — Three-Time Recipient
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>
                          <strong className="text-white">Prime Minister's Scholarship</strong> (2020, 2021) — Two-Time Recipient
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Certifications */}
                <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '850ms' }}>
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Professional Certifications</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex gap-3">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>
                          <strong className="text-white">EE.09 Certificate:</strong> Website and Database Programming, Creation and Administration (Mar 2022)
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>
                          <strong className="text-white">EE.08 Certificate:</strong> Assembly and Operation of Computer Systems, Peripheral Devices and Networks (Sep 2021)
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>
                          <strong className="text-white">PCAP:</strong> Programming Essentials in Python, Cisco Networking Academy (Jan 2023)
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
