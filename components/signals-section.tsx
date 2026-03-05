"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const valueProps = [
  {
    audience: "Artists & Athletes",
    subtitle: "The Sovereigns",
    title: "Own Your Legacy",
    points: [
      {
        label: "From Renting to Owning",
        description: "Transition from 'tenants' on social platforms to owning your social graph and distribution channels."
      },
      {
        label: "Automated Legacy",
        description: "Use code to automate royalty splits, vesting schedules, and long-term wealth management."
      },
      {
        label: "Mutualized Success",
        description: "A 'rising tide lifts all boats' model where the success of one talent programmatically supports the value of everyone."
      }
    ]
  },
  {
    audience: "Brands",
    subtitle: "The Partners",
    title: "Verifiable Impact",
    points: [
      {
        label: "Onchain Proof",
        description: "Direct access to talent with onchain proof of engagement—no more opaque vanity metrics or bot-filled follower counts."
      },
      {
        label: "Frictionless Collaboration",
        description: "Smart-contract-powered sponsorships (NIL) with instant payments, clear deliverables, and global scalability."
      },
      {
        label: "Deep Integration",
        description: "Don't just buy an ad—integrate into a talent's sovereign economy, creating higher loyalty and long-term alignment."
      }
    ]
  },
  {
    audience: "The Collective",
    subtitle: "The Network",
    title: "Anti-Fragility",
    points: [
      {
        label: "Diversified Model",
        description: "A blended economic model spanning media production, sponsorship cash flow, and venture upside."
      },
      {
        label: "Resilience",
        description: "Network designed to be resilient to market shifts and platform dependencies."
      },
      {
        label: "Shared Prosperity",
        description: "Value creation flows back to all participants in the ecosystem."
      }
    ]
  },
]

export function SignalsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !cursorRef.current) return

    const section = sectionRef.current
    const cursor = cursorRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    section.addEventListener("mousemove", handleMouseMove)
    section.addEventListener("mouseenter", handleMouseEnter)
    section.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      section.removeEventListener("mousemove", handleMouseMove)
      section.removeEventListener("mouseenter", handleMouseEnter)
      section.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in from left
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = cardsRef.current?.querySelectorAll("article")
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="value" ref={sectionRef} className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50",
          "w-12 h-12 rounded-full border-2 border-accent bg-accent",
          "transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / Value Proposition</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">WHO WE SERVE</h2>
        <p className="mt-4 max-w-2xl font-mono text-sm text-muted-foreground leading-relaxed">
          AAO creates value for three interconnected audiences, building an ecosystem where everyone wins.
        </p>
      </div>

      {/* Value proposition cards grid */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {valueProps.map((prop, index) => (
          <ValueCard key={index} prop={prop} index={index} />
        ))}
      </div>
    </section>
  )
}

function ValueCard({
  prop,
  index,
}: {
  prop: {
    audience: string
    subtitle: string
    title: string
    points: { label: string; description: string }[]
  }
  index: number
}) {
  return (
    <article
      className={cn(
        "group relative",
        "transition-transform duration-500 ease-out",
        "hover:-translate-y-2",
      )}
    >
      {/* Card */}
      <div className="relative bg-card border border-border/50 p-8 h-full">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-accent via-accent/40 to-transparent" />

        {/* Header */}
        <div className="flex items-baseline justify-between mb-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            0{index + 1}
          </span>
          <span className="font-mono text-[10px] text-accent/80 uppercase tracking-wider">
            {prop.subtitle}
          </span>
        </div>

        {/* Audience title */}
        <h3 className="font-[var(--font-bebas)] text-2xl tracking-tight mb-2 text-muted-foreground/60">
          {prop.audience}
        </h3>

        {/* Main title */}
        <h4 className="font-[var(--font-bebas)] text-4xl tracking-tight mb-6 group-hover:text-accent transition-colors duration-300">
          {prop.title}
        </h4>

        {/* Divider */}
        <div className="w-12 h-px bg-accent/60 mb-6 group-hover:w-full transition-all duration-500" />

        {/* Points list */}
        <ul className="space-y-4">
          {prop.points.map((point, i) => (
            <li key={i}>
              <span className="font-mono text-xs text-accent block mb-1">{point.label}</span>
              <p className="font-mono text-xs text-muted-foreground leading-relaxed">{point.description}</p>
            </li>
          ))}
        </ul>

        {/* Corner fold effect */}
        <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-background rotate-45 translate-x-4 translate-y-4 border-t border-l border-border/30" />
        </div>
      </div>

      {/* Shadow/depth layer */}
      <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  )
}
