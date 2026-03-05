"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // CTA box scale in
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Grid columns fade up with stagger
      if (gridRef.current) {
        const columns = gridRef.current.querySelectorAll(":scope > div")
        gsap.from(columns, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Footer fade in
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="apply"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Join</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">ENCODE YOUR LEGACY</h2>
      </div>

      {/* Main CTA Box */}
      <div ref={ctaRef} className="mb-24 border border-accent/40 bg-accent/5 p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div>
            <h3 className="font-[var(--font-bebas)] text-3xl md:text-4xl tracking-tight mb-4">
              Ready to become <span className="text-accent">sovereign</span>?
            </h3>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-8">
              AAO is currently accepting applications from artists, athletes, and forward-thinking brands 
              who want to participate in the ownership economy.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:apply@aao.network"
                className="inline-flex items-center gap-3 border border-accent bg-accent text-accent-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-accent/90 transition-all duration-200"
              >
                Apply as Talent
              </a>
              <a
                href="mailto:partners@aao.network"
                className="inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
              >
                Partner With Us
              </a>
            </div>
          </div>
          <div className="space-y-6">
            <div className="border-l-2 border-accent/40 pl-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block mb-2">For Artists</span>
              <p className="font-mono text-xs text-muted-foreground">Musicians, visual artists, content creators looking to own their distribution and monetize directly.</p>
            </div>
            <div className="border-l-2 border-accent/40 pl-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block mb-2">For Athletes</span>
              <p className="font-mono text-xs text-muted-foreground">Professional and collegiate athletes seeking NIL opportunities and long-term financial sovereignty.</p>
            </div>
            <div className="border-l-2 border-accent/40 pl-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block mb-2">For Brands</span>
              <p className="font-mono text-xs text-muted-foreground">Forward-thinking companies who want verifiable engagement and authentic talent relationships.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-column layout */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
        {/* The Network */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Network</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">AAO Protocol</li>
            <li className="font-mono text-xs text-foreground/80">Sovereign Network</li>
          </ul>
        </div>

        {/* Platform */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Platform</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">Onchain</li>
            <li className="font-mono text-xs text-foreground/80">Global</li>
            <li className="font-mono text-xs text-foreground/80">24/7</li>
          </ul>
        </div>

        {/* Services */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Services</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">Media</li>
            <li className="font-mono text-xs text-foreground/80">Marketplace</li>
            <li className="font-mono text-xs text-foreground/80">Treasury</li>
          </ul>
        </div>

        {/* Location */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Location</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">Decentralized</li>
            <li className="font-mono text-xs text-foreground/80">Everywhere</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Contact</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:hello@aao.network"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                Twitter/X
              </a>
            </li>
          </ul>
        </div>

        {/* Year */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Year</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">2026</li>
            <li className="font-mono text-xs text-foreground/80">Genesis</li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div
        ref={footerRef}
        className="mt-24 pt-8 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          © 2026 AAO — Artists & Athletes Onchain. The Sovereign Network.
        </p>
        <p className="font-mono text-[10px] text-muted-foreground">From influencer to digital corporation. Own your legacy.</p>
      </div>
    </section>
  )
}
