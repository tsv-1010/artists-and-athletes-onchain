"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"
import { HardwareNode } from "@/components/hardware-node"

export function AscendHero() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="grid-bg absolute inset-0 opacity-20" aria-hidden="true" />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,194,0.06)_0%,_transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Left: Copy */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="outline"
              className="border-[#00FFC2]/30 text-[#00FFC2] bg-[#00FFC2]/5 font-mono text-xs tracking-widest uppercase px-4 py-1.5"
            >
              <Shield className="size-3 mr-1.5" />
              Sovereign Infrastructure
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95] text-balance text-foreground"
          >
            Sovereign Health.{" "}
            <span className="text-[#00FFC2] text-glow-mint">
              Backed by Bitcoin.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-xl"
          >
            Your body generates data. Your node secures it. Your treasury grows
            from it. End-to-end sovereign health infrastructure, from wearable
            to blockchain.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-[#00FFC2] text-[#0D1117] hover:bg-[#00FFC2]/90 font-semibold px-8 h-12 text-base glow-mint"
            >
              Deploy Your Node
              <ArrowRight className="size-4 ml-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#21262D] text-foreground hover:border-[#00FFC2]/40 hover:text-[#00FFC2] h-12 px-8 text-base bg-transparent"
            >
              Read the Whitepaper
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-6 font-mono text-xs text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#00FFC2] animate-pulse" />
              256-bit AES Encrypted
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#00FFC2] animate-pulse" />
              Zero-Knowledge Proofs
            </span>
          </motion.div>
        </div>

        {/* Right: 3D Node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 flex items-center justify-center"
        >
          <HardwareNode />
        </motion.div>
      </div>
    </section>
  )
}
