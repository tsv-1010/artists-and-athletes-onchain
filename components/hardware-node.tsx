"use client"

import { useEffect, useRef, useState } from "react"

export function HardwareNode() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const size = 400
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    let time = 0

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, size, size)

      const cx = size / 2
      const cy = size / 2
      const baseRadius = 100

      // Outer glow ring
      const outerGlow = ctx.createRadialGradient(cx, cy, baseRadius * 1.2, cx, cy, baseRadius * 2.5)
      outerGlow.addColorStop(0, "rgba(0, 255, 194, 0.08)")
      outerGlow.addColorStop(1, "rgba(0, 255, 194, 0)")
      ctx.beginPath()
      ctx.arc(cx, cy, baseRadius * 2.5, 0, Math.PI * 2)
      ctx.fillStyle = outerGlow
      ctx.fill()

      // Rotating orbit rings
      for (let i = 0; i < 3; i++) {
        const orbitRadius = baseRadius + 30 + i * 22
        const rotation = time * (0.3 + i * 0.15) + (i * Math.PI) / 3

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(rotation)

        ctx.beginPath()
        ctx.ellipse(0, 0, orbitRadius, orbitRadius * 0.35, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0, 255, 194, ${0.12 - i * 0.03})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Orbiting particle
        const particleAngle = time * (1 + i * 0.5)
        const px = Math.cos(particleAngle) * orbitRadius
        const py = Math.sin(particleAngle) * orbitRadius * 0.35

        ctx.beginPath()
        ctx.arc(px, py, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 194, ${0.7 + Math.sin(time * 2 + i) * 0.3})`
        ctx.fill()

        // Particle glow
        const particleGlow = ctx.createRadialGradient(px, py, 0, px, py, 12)
        particleGlow.addColorStop(0, "rgba(0, 255, 194, 0.4)")
        particleGlow.addColorStop(1, "rgba(0, 255, 194, 0)")
        ctx.beginPath()
        ctx.arc(px, py, 12, 0, Math.PI * 2)
        ctx.fillStyle = particleGlow
        ctx.fill()

        ctx.restore()
      }

      // Main cube body (isometric)
      const cubeSize = 70
      const angle = Math.PI / 6

      // Calculate isometric points
      const topCenter = { x: cx, y: cy - cubeSize * 0.8 }
      const topLeft = { x: cx - cubeSize * Math.cos(angle), y: cy - cubeSize * 0.8 + cubeSize * Math.sin(angle) }
      const topRight = { x: cx + cubeSize * Math.cos(angle), y: cy - cubeSize * 0.8 + cubeSize * Math.sin(angle) }
      const midCenter = { x: cx, y: cy - cubeSize * 0.8 + cubeSize * Math.sin(angle) * 2 }
      const bottomLeft = { x: cx - cubeSize * Math.cos(angle), y: topLeft.y + cubeSize }
      const bottomRight = { x: cx + cubeSize * Math.cos(angle), y: topRight.y + cubeSize }
      const bottomCenter = { x: cx, y: midCenter.y + cubeSize }

      // Top face
      ctx.beginPath()
      ctx.moveTo(topCenter.x, topCenter.y)
      ctx.lineTo(topRight.x, topRight.y)
      ctx.lineTo(midCenter.x, midCenter.y)
      ctx.lineTo(topLeft.x, topLeft.y)
      ctx.closePath()
      ctx.fillStyle = "rgba(0, 255, 194, 0.12)"
      ctx.fill()
      ctx.strokeStyle = "rgba(0, 255, 194, 0.5)"
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Left face
      ctx.beginPath()
      ctx.moveTo(topLeft.x, topLeft.y)
      ctx.lineTo(midCenter.x, midCenter.y)
      ctx.lineTo(bottomCenter.x, bottomCenter.y)
      ctx.lineTo(bottomLeft.x, bottomLeft.y)
      ctx.closePath()
      ctx.fillStyle = "rgba(0, 255, 194, 0.06)"
      ctx.fill()
      ctx.strokeStyle = "rgba(0, 255, 194, 0.35)"
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Right face
      ctx.beginPath()
      ctx.moveTo(midCenter.x, midCenter.y)
      ctx.lineTo(topRight.x, topRight.y)
      ctx.lineTo(bottomRight.x, bottomRight.y)
      ctx.lineTo(bottomCenter.x, bottomCenter.y)
      ctx.closePath()
      ctx.fillStyle = "rgba(0, 255, 194, 0.08)"
      ctx.fill()
      ctx.strokeStyle = "rgba(0, 255, 194, 0.4)"
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Center glowing dot
      const pulseRadius = 6 + Math.sin(time * 3) * 2
      const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulseRadius * 4)
      centerGlow.addColorStop(0, "rgba(0, 255, 194, 0.6)")
      centerGlow.addColorStop(0.5, "rgba(0, 255, 194, 0.1)")
      centerGlow.addColorStop(1, "rgba(0, 255, 194, 0)")
      ctx.beginPath()
      ctx.arc(cx, cy, pulseRadius * 4, 0, Math.PI * 2)
      ctx.fillStyle = centerGlow
      ctx.fill()

      ctx.beginPath()
      ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2)
      ctx.fillStyle = "#00FFC2"
      ctx.fill()

      // Data lines emanating
      for (let i = 0; i < 8; i++) {
        const lineAngle = (Math.PI * 2 * i) / 8 + time * 0.2
        const lineStartR = baseRadius * 1.6
        const lineEndR = baseRadius * 1.6 + 15 + Math.sin(time * 2 + i) * 10
        const lx1 = cx + Math.cos(lineAngle) * lineStartR
        const ly1 = cy + Math.sin(lineAngle) * lineStartR
        const lx2 = cx + Math.cos(lineAngle) * lineEndR
        const ly2 = cy + Math.sin(lineAngle) * lineEndR

        ctx.beginPath()
        ctx.moveTo(lx1, ly1)
        ctx.lineTo(lx2, ly2)
        ctx.strokeStyle = `rgba(0, 255, 194, ${0.2 + Math.sin(time + i) * 0.15})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      time += 0.012
      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className={`transition-transform duration-700 ${isHovered ? "scale-105" : "scale-100"}`}
        aria-label="Animated 3D hardware node visualization with glowing orbits"
        role="img"
      />
      {/* Label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest uppercase text-[#00FFC2]/50">
        ASCEND NODE v3.2
      </div>
    </div>
  )
}
