"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Cpu, Radio, Database, Landmark, ChevronRight } from "lucide-react"

const stackItems = [
  {
    id: "wearable",
    label: "Wearable Sensor Array",
    tag: "LAYER 0",
    icon: Radio,
    description:
      "Medical-grade biometric sensors capturing 47 health markers in real-time. AES-256 encrypted at the edge before transmission.",
    specs: ["Heart Rate Variability", "Blood Oxygen", "Cortisol Proxy", "Skin Temperature"],
    status: "STREAMING",
  },
  {
    id: "pi5",
    label: "Raspberry Pi 5 Gateway",
    tag: "LAYER 1",
    icon: Cpu,
    description:
      "Local compute node running sovereign firmware. Processes, validates, and signs health data packets before chain submission.",
    specs: ["ARM Cortex-A76", "8GB LPDDR4X", "NVMe Storage", "Sovereign OS"],
    status: "PROCESSING",
  },
  {
    id: "hedera",
    label: "Hedera Proof-of-Verification",
    tag: "LAYER 2",
    icon: Database,
    description:
      "Immutable consensus layer providing hashgraph-backed proof of your health data integrity. Sub-second finality.",
    specs: ["Hashgraph Consensus", "10k TPS", "Carbon Negative", "$0.0001 per Tx"],
    status: "VERIFIED",
  },
  {
    id: "icp",
    label: "ICP Treasury Canister",
    tag: "LAYER 3",
    icon: Landmark,
    description:
      "Fully on-chain smart contract treasury managing your sovereign wealth. Bitcoin-backed yield with autonomous cycle management.",
    specs: ["WebAssembly Runtime", "Chain-Key Crypto", "BTC Integration", "Auto-Compound"],
    status: "ACTIVE",
  },
]

export function StackSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section
      ref={ref}
      id="stack"
      className="relative py-32 px-6"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16"
        >
          <Badge
            variant="outline"
            className="w-fit border-[#00FFC2]/30 text-[#00FFC2] bg-[#00FFC2]/5 font-mono text-xs tracking-widest uppercase px-4 py-1.5"
          >
            The Stack
          </Badge>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Vertical Fortress Architecture
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Four layers of sovereign infrastructure. Each tier encrypts, validates,
            and compounds your health data into verifiable wealth.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Interactive List */}
          <div className="flex-1 flex flex-col gap-1">
            {stackItems.map((item, i) => {
              const isActive = activeIndex === i
              const Icon = item.icon

              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  onClick={() => setActiveIndex(i)}
                  className={`group relative flex items-center gap-5 px-6 py-5 text-left transition-all duration-300 border ${
                    isActive
                      ? "border-[#00FFC2]/30 bg-[#00FFC2]/5 border-glow-mint"
                      : "border-transparent hover:border-[#21262D] hover:bg-[#161B22]/50"
                  }`}
                >
                  {/* Vertical connector */}
                  {i < stackItems.length - 1 && (
                    <div className="absolute left-[2.85rem] top-full w-px h-1 bg-[#21262D] z-10" />
                  )}

                  <div
                    className={`flex items-center justify-center size-10 rounded border transition-colors ${
                      isActive
                        ? "border-[#00FFC2]/50 bg-[#00FFC2]/10 text-[#00FFC2]"
                        : "border-[#21262D] bg-[#161B22] text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-[10px] tracking-widest uppercase ${
                          isActive ? "text-[#00FFC2]" : "text-muted-foreground"
                        }`}
                      >
                        {item.tag}
                      </span>
                      <span
                        className={`font-mono text-[10px] px-2 py-0.5 rounded-sm ${
                          isActive
                            ? "bg-[#00FFC2]/10 text-[#00FFC2]"
                            : "bg-[#1C2333] text-muted-foreground"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <h3
                      className={`text-base font-semibold mt-1 transition-colors ${
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </h3>
                  </div>

                  <ChevronRight
                    className={`size-4 transition-all ${
                      isActive
                        ? "text-[#00FFC2] translate-x-0 opacity-100"
                        : "text-muted-foreground -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }`}
                  />
                </motion.button>
              )
            })}
          </div>

          {/* Detail panel */}
          <div className="flex-1 relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="border border-[#21262D] bg-[#161B22]/50 p-8 lg:p-10 flex flex-col gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-[#00FFC2] animate-pulse" />
                  <span className="font-mono text-xs text-[#00FFC2] tracking-widest uppercase">
                    {stackItems[activeIndex].tag} — {stackItems[activeIndex].status}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  {stackItems[activeIndex].label}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {stackItems[activeIndex].description}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  {stackItems[activeIndex].specs.map((spec) => (
                    <div
                      key={spec}
                      className="flex items-center gap-2 px-3 py-2 bg-[#0D1117] border border-[#21262D] font-mono text-xs text-muted-foreground"
                    >
                      <span className="size-1 bg-[#00FFC2]/60 rounded-full flex-shrink-0" />
                      {spec}
                    </div>
                  ))}
                </div>

                {/* Visual connection line to next layer */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#21262D]">
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                    {activeIndex < stackItems.length - 1
                      ? `Feeds into ${stackItems[activeIndex + 1].tag}`
                      : "Final Settlement Layer"}
                  </span>
                  <div className="flex-1 h-px bg-[#21262D]" />
                  <div className="size-2 border border-[#00FFC2]/30 rotate-45" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
