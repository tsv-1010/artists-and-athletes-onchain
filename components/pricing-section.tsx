"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight, Zap, Crown, Server } from "lucide-react"

const plans = [
  {
    name: "Lite",
    price: "$499",
    period: "one-time",
    icon: Zap,
    tagline: "Start Sovereign",
    description: "Entry-level sovereignty. Wearable integration with basic health data encryption and cloud-based storage.",
    features: [
      "1 Wearable Sensor Link",
      "Cloud-Encrypted Health Vault",
      "Basic BTC Yield (3.2% APR)",
      "Monthly Health Reports",
      "Community Support",
      "Hedera Verification (100 tx/mo)",
    ],
    cta: "Begin Ascent",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$2,499",
    period: "one-time",
    icon: Crown,
    tagline: "Most Popular",
    description: "Full sovereign stack with Pi 5 gateway. Local compute, on-chain verification, and enhanced BTC yield.",
    features: [
      "3 Wearable Sensor Links",
      "Pi 5 Local Gateway Node",
      "Enhanced BTC Yield (5.8% APR)",
      "Real-Time Sovereign Ledger",
      "Hedera Verification (Unlimited)",
      "ICP Canister (Shared)",
      "Priority Support",
      "Zero-Knowledge Health Proofs",
    ],
    cta: "Deploy Pro Node",
    highlighted: true,
  },
  {
    name: "Sovereign Node",
    price: "$5,999",
    period: "one-time",
    icon: Server,
    tagline: "Full Autonomy",
    description: "Complete vertical fortress. Dedicated ICP canister, maximum yield, and full autonomous treasury management.",
    features: [
      "Unlimited Wearable Links",
      "Pi 5 Hardened Gateway",
      "Maximum BTC Yield (6.5% APR)",
      "Dedicated ICP Treasury Canister",
      "Autonomous Cycle Management",
      "Full Sovereign Ledger Suite",
      "White-Glove Onboarding",
      "Hardware Security Module",
      "Governance Voting Rights",
    ],
    cta: "Claim Sovereignty",
    highlighted: false,
  },
]

export function PricingSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      id="pricing"
      className="relative py-32 px-6"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-4 mb-20"
        >
          <Badge
            variant="outline"
            className="border-[#00FFC2]/30 text-[#00FFC2] bg-[#00FFC2]/5 font-mono text-xs tracking-widest uppercase px-4 py-1.5"
          >
            Pricing
          </Badge>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Choose Your Sovereignty
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            One-time hardware investment. No subscriptions. No recurring fees.
            Your node, your data, your treasury — forever.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0">
          {plans.map((plan, i) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className={`relative flex flex-col border transition-all ${
                  plan.highlighted
                    ? "border-[#00FFC2]/40 bg-[#00FFC2]/[0.02] border-glow-mint lg:scale-105 lg:z-10 lg:-mx-1"
                    : "border-[#21262D] bg-[#161B22]/30 hover:border-[#21262D]/80"
                }`}
              >
                {/* Highlighted badge */}
                {plan.highlighted && (
                  <div className="absolute -top-px left-0 right-0 h-px bg-[#00FFC2]" />
                )}

                <div className="p-8 lg:p-10 flex flex-col gap-6 flex-1">
                  {/* Plan header */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center size-10 rounded border ${
                            plan.highlighted
                              ? "border-[#00FFC2]/40 bg-[#00FFC2]/10 text-[#00FFC2]"
                              : "border-[#21262D] bg-[#1C2333] text-muted-foreground"
                          }`}
                        >
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-lg">{plan.name}</p>
                        </div>
                      </div>
                      {plan.highlighted && (
                        <Badge className="bg-[#00FFC2] text-[#0D1117] font-mono text-[10px] tracking-widest uppercase border-none">
                          {plan.tagline}
                        </Badge>
                      )}
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {plan.description}
                    </p>

                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl lg:text-5xl font-bold text-foreground font-mono">
                        {plan.price}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-[#21262D]" />

                  {/* Features */}
                  <ul className="flex flex-col gap-3 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check
                          className={`size-4 flex-shrink-0 mt-0.5 ${
                            plan.highlighted ? "text-[#00FFC2]" : "text-muted-foreground"
                          }`}
                        />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    size="lg"
                    className={`w-full h-12 font-semibold text-base ${
                      plan.highlighted
                        ? "bg-[#00FFC2] text-[#0D1117] hover:bg-[#00FFC2]/90 glow-mint"
                        : "bg-[#1C2333] text-foreground hover:bg-[#1C2333]/80 border border-[#21262D]"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="size-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center font-mono text-xs text-muted-foreground mt-12"
        >
          All prices in USD. Hardware ships globally. 30-day sovereign guarantee. BTC yield rates are variable.
        </motion.p>
      </div>
    </section>
  )
}
