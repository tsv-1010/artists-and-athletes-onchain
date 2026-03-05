"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Flame, Activity, Lock } from "lucide-react"

function AnimatedNumber({ target, decimals = 1, duration = 2000, suffix = "", prefix = "" }: {
  target: number
  decimals?: number
  duration?: number
  suffix?: string
  prefix?: string
}) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(eased * target)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, target, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  )
}

function MiniSparkline({ data, color = "#00FFC2" }: { data: number[]; color?: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 120
  const height = 32
  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * height,
  }))

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ")

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${pathD} L ${width} ${height} L 0 ${height} Z`}
        fill="url(#sparklineGrad)"
      />
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="2.5" fill={color} />
    </svg>
  )
}

const btcYieldData = [5.2, 5.8, 5.5, 6.1, 5.9, 6.3, 6.0, 6.4, 6.2, 6.5]
const cyclesData = [1200, 1350, 1100, 1500, 1400, 1650, 1550, 1700, 1800, 1920]

export function DashboardSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      id="dashboard"
      className="relative py-32 px-6"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,255,194,0.03)_0%,_transparent_50%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
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
            Sovereign Ledger
          </Badge>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Your Wealth Dashboard
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Real-time treasury metrics. Every heartbeat generates yield.
            Every cycle burned compounds your sovereignty.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="border border-[#21262D] bg-[#161B22]/30 overflow-hidden"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[#21262D] bg-[#0D1117]/50">
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-[#00FFC2] animate-pulse" />
              <span className="font-mono text-xs text-[#00FFC2] tracking-widest uppercase">
                Live — Sovereign Ledger
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="size-3 text-muted-foreground" />
              <span className="font-mono text-[10px] text-muted-foreground uppercase">
                E2E Encrypted
              </span>
            </div>
          </div>

          {/* Main metrics row */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#21262D]">
            {/* BTC Yield */}
            <div className="p-8 lg:p-10 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded border border-[#00FFC2]/20 bg-[#00FFC2]/5">
                    <TrendingUp className="size-5 text-[#00FFC2]" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                      BTC Yield (APR)
                    </p>
                    <p className="text-3xl lg:text-4xl font-bold text-foreground font-mono">
                      <AnimatedNumber target={6.5} suffix="%" />
                    </p>
                  </div>
                </div>
                <MiniSparkline data={btcYieldData} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-[#0D1117] border border-[#21262D]">
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">30d Change</p>
                  <p className="font-mono text-sm text-[#00FFC2] font-semibold mt-1">+0.8%</p>
                </div>
                <div className="p-3 bg-[#0D1117] border border-[#21262D]">
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Total Earned</p>
                  <p className="font-mono text-sm text-foreground font-semibold mt-1">0.0847 BTC</p>
                </div>
              </div>

              {/* Simulated transaction log */}
              <div className="flex flex-col gap-2">
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Recent Yield Events</p>
                {[
                  { time: "14:32:07", amount: "+0.00012 BTC", block: "#832,441" },
                  { time: "14:28:53", amount: "+0.00009 BTC", block: "#832,440" },
                  { time: "14:25:19", amount: "+0.00015 BTC", block: "#832,439" },
                ].map((tx) => (
                  <div
                    key={tx.block}
                    className="flex items-center justify-between px-3 py-2 bg-[#0D1117]/50 border border-[#21262D]/50 font-mono text-xs"
                  >
                    <span className="text-muted-foreground">{tx.time}</span>
                    <span className="text-[#00FFC2]">{tx.amount}</span>
                    <span className="text-muted-foreground">{tx.block}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ICP Cycles Burned */}
            <div className="p-8 lg:p-10 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded border border-[#00FFC2]/20 bg-[#00FFC2]/5">
                    <Flame className="size-5 text-[#00FFC2]" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                      ICP Cycles Burned
                    </p>
                    <p className="text-3xl lg:text-4xl font-bold text-foreground font-mono">
                      <AnimatedNumber target={1.92} suffix="T" decimals={2} />
                    </p>
                  </div>
                </div>
                <MiniSparkline data={cyclesData} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-[#0D1117] border border-[#21262D]">
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Burn Rate</p>
                  <p className="font-mono text-sm text-[#00FFC2] font-semibold mt-1">4.2B/day</p>
                </div>
                <div className="p-3 bg-[#0D1117] border border-[#21262D]">
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Canister Uptime</p>
                  <p className="font-mono text-sm text-foreground font-semibold mt-1">99.97%</p>
                </div>
              </div>

              {/* System health */}
              <div className="flex flex-col gap-3">
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">System Health</p>
                {[
                  { label: "Canister Memory", value: 67, unit: "% used" },
                  { label: "Cycle Reserve", value: 84, unit: "% funded" },
                  { label: "Network Sync", value: 99, unit: "% synced" },
                ].map((metric) => (
                  <div key={metric.label} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-muted-foreground">{metric.label}</span>
                      <span className="text-foreground">
                        {metric.value}{metric.unit}
                      </span>
                    </div>
                    <div className="h-1 bg-[#21262D] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${metric.value}%` } : {}}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-[#00FFC2]/60 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom status bar */}
          <div className="flex flex-wrap items-center gap-6 px-6 py-3 border-t border-[#21262D] bg-[#0D1117]/50">
            {[
              { icon: Activity, label: "Heartbeats Recorded", value: "2,847,391" },
              { icon: Lock, label: "Zero-Knowledge Proofs", value: "12,034" },
              { icon: TrendingUp, label: "Sovereign Score", value: "94.7" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 font-mono text-xs">
                <stat.icon className="size-3 text-[#00FFC2]/60" />
                <span className="text-muted-foreground">{stat.label}:</span>
                <span className="text-foreground">{stat.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
