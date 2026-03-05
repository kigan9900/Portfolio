'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Github, Twitter, Mail, Terminal as TerminalIcon, 
  Code2, Sparkles, ChevronDown, ArrowRight, Heart,
  Rocket, Globe, Send, X, Check,
  Moon, Sun, Menu, Copy, CheckCircle,
  Gamepad2, Brain, Timer, Trophy, Lightbulb,
  Volume2, VolumeX, ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

// ============================================================================
// DATA
// ============================================================================

const developerInfo = {
  name: "Kigan Patel",
  title: "Young Developer & Creative Coder",
  subtitle: "Turning crazy ideas into code, one line at a time.",
  bio: "I'm a 14-year-old developer who loves building interactive web experiences. When I'm not coding, I'm probably thinking about what to code next!",
  email: "Kiganpatel@icloud.com",
  location: "Learning from Home",
  funFacts: [
    "Started coding at age 11",
    "My first program was 'Hello World' - I thought it was magic",
    "I debug with the determination of a detective",
    "I run on curiosity, not coffee!"
  ]
}

const skills = [
  { name: "HTML & CSS", level: 85, icon: "🎨", gradient: "from-orange-500 to-amber-500" },
  { name: "JavaScript", level: 75, icon: "⚡", gradient: "from-yellow-500 to-amber-400" },
  { name: "React", level: 60, icon: "⚛️", gradient: "from-cyan-500 to-blue-500" },
  { name: "TypeScript", level: 55, icon: "📘", gradient: "from-blue-500 to-indigo-500" },
  { name: "Python", level: 70, icon: "🐍", gradient: "from-green-500 to-emerald-500" },
  { name: "Node.js", level: 50, icon: "🟢", gradient: "from-lime-500 to-green-500" },
  { name: "Game Dev", level: 45, icon: "🎮", gradient: "from-purple-500 to-pink-500" },
  { name: "UI/UX Design", level: 55, icon: "✨", gradient: "from-pink-500 to-rose-500" }
]

const projects = [
  { id: 1, title: "Portfolio Website", description: "A playground for learning Next.js and animations.", status: "building", progress: 85, tech: ["Next.js", "TypeScript", "Tailwind"], color: "#f97316" },
  { id: 2, title: "Browser Game", description: "Learning physics and collision detection.", status: "building", progress: 50, tech: ["JavaScript", "Canvas API"], color: "#22c55e" },
  { id: 3, title: "AI Assistant", description: "Exploring AI with a chatbot.", status: "learning", progress: 35, tech: ["Python", "OpenAI API"], color: "#06b6d4" },
  { id: 4, title: "Mobile App", description: "Planning my first mobile app.", status: "planning", progress: 15, tech: ["React Native"], color: "#a855f7" },
  { id: 5, title: "Discord Bot", description: "A fun bot for my friend's server.", status: "building", progress: 60, tech: ["Node.js", "Discord.js"], color: "#5865f2" }
]

const achievements = [
  { icon: "🚀", title: "First Website", desc: "Built my first website at 11", year: "2021" },
  { icon: "⚡", title: "JavaScript Journey", desc: "Started learning JS", year: "2022" },
  { icon: "⚛️", title: "React Explorer", desc: "Diving into React", year: "2023" },
  { icon: "🎯", title: "Portfolio v2.0", desc: "This portfolio!", year: "2024" }
]

const quotes = [
  { text: "The best way to predict the future is to create it.", author: "Lincoln" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Every expert was once a beginner.", author: "Helen Hayes" }
]

// ============================================================================
// SOUND ENGINE
// ============================================================================

class SoundEngine {
  private ctx: AudioContext | null = null
  private enabled: boolean = false
  
  init() {
    if (typeof window === 'undefined') return
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    this.enabled = true
  }
  
  disable() { this.enabled = false }
  isEnabled() { return this.enabled }
  
  type() {
    if (!this.enabled || !this.ctx) return
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 800 + Math.random() * 400
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.ctx.destination)
    osc.frequency.setValueAtTime(1200 + Math.random() * 300, this.ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.015)
    osc.type = 'square'
    gain.gain.setValueAtTime(0.04, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04)
    osc.start(this.ctx.currentTime)
    osc.stop(this.ctx.currentTime + 0.04)
  }
  
  click() {
    if (!this.enabled || !this.ctx) return
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.frequency.setValueAtTime(600, this.ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.05)
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08)
    osc.start(this.ctx.currentTime)
    osc.stop(this.ctx.currentTime + 0.08)
  }
  
  boot() {
    if (!this.enabled || !this.ctx) return
    [261.63, 329.63, 392.00, 523.25].forEach((freq, i) => {
      setTimeout(() => {
        if (!this.ctx) return
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.frequency.value = freq
        osc.type = 'sine'
        gain.gain.setValueAtTime(0.06, this.ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3)
        osc.start(this.ctx.currentTime)
        osc.stop(this.ctx.currentTime + 0.3)
      }, i * 120)
    })
  }
  
  success() {
    if (!this.enabled || !this.ctx) return
    [523.25, 659.25].forEach(freq => {
      const osc = this.ctx!.createOscillator()
      const gain = this.ctx!.createGain()
      osc.connect(gain)
      gain.connect(this.ctx!.destination)
      osc.frequency.value = freq
      osc.type = 'sine'
      gain.gain.setValueAtTime(0.05, this.ctx!.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 0.4)
      osc.start(this.ctx!.currentTime)
      osc.stop(this.ctx!.currentTime + 0.4)
    })
  }
  
  toggle() {
    if (!this.enabled || !this.ctx) return
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.frequency.setValueAtTime(440, this.ctx.currentTime)
    osc.frequency.setValueAtTime(550, this.ctx.currentTime + 0.05)
    osc.type = 'triangle'
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1)
    osc.start(this.ctx.currentTime)
    osc.stop(this.ctx.currentTime + 0.1)
  }
  
  hover() {
    if (!this.enabled || !this.ctx) return
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.frequency.value = 1000
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03)
    osc.start(this.ctx.currentTime)
    osc.stop(this.ctx.currentTime + 0.03)
  }
  
  error() {
    if (!this.enabled || !this.ctx) return
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.frequency.setValueAtTime(200, this.ctx.currentTime)
    osc.type = 'sawtooth'
    gain.gain.setValueAtTime(0.03, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15)
    osc.start(this.ctx.currentTime)
    osc.stop(this.ctx.currentTime + 0.15)
  }
}

const soundEngine = new SoundEngine()

// ============================================================================
// UTILITY
// ============================================================================

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max)

// ============================================================================
// HOOKS
// ============================================================================

function useIntersectionObserver(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  
  return { ref, isVisible }
}

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration, start])
  return count
}

// ============================================================================
// COMPONENTS
// ============================================================================

function SmoothCursor({ theme }: { theme: 'dark' | 'light' }) {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [targetPosition, setTargetPosition] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    if ('ontouchstart' in window) return
    
    const timer = setTimeout(() => setIsVisible(true), 100)
    
    const handleMouseMove = (e: MouseEvent) => setTargetPosition({ x: e.clientX, y: e.clientY })
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsPointer(target.tagName === 'A' || target.tagName === 'BUTTON' || !!target.closest('a') || !!target.closest('button'))
    }
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])
  
  useEffect(() => {
    let animationFrame: number
    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (targetPosition.x - prev.x) * 0.18,
        y: prev.y + (targetPosition.y - prev.y) * 0.18
      }))
      animationFrame = requestAnimationFrame(animate)
    }
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [targetPosition])
  
  if (!isVisible) return null
  const isDark = theme === 'dark'
  
  return (
    <>
      <div className="fixed pointer-events-none z-[99999]" style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)', mixBlendMode: isDark ? 'difference' : 'normal' }}>
        <div className={`rounded-full transition-all duration-150 ${isDark ? 'bg-white' : 'bg-zinc-900'}`} style={{ width: isClicking ? 6 : isPointer ? 40 : 10, height: isClicking ? 6 : isPointer ? 40 : 10, opacity: isPointer ? 0.6 : 1 }} />
      </div>
      <div className="fixed pointer-events-none z-[99998]" style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)', mixBlendMode: isDark ? 'difference' : 'normal' }}>
        <div className={`rounded-full border-2 transition-all duration-300 ${isDark ? 'border-white' : 'border-zinc-900'}`} style={{ width: isPointer ? 52 : 32, height: isPointer ? 52 : 32, opacity: isClicking ? 0.3 : 0.2 }} />
      </div>
    </>
  )
}

function Typewriter({ text, speed = 50 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])
  
  return <span>{displayText}<span className="animate-pulse">|</span></span>
}

function InteractiveCard({ children, className, onClick, isDark }: { children: React.ReactNode; className?: string; onClick?: () => void; isDark: boolean }) {
  const [transform, setTransform] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTransform(`perspective(1000px) rotateX(${(y - 0.5) * -8}deg) rotateY(${(x - 0.5) * 8}deg) scale3d(1.02, 1.02, 1.02)`)
  }
  
  return (
    <div ref={ref} className={`${className} cursor-pointer`} onMouseMove={handleMouseMove} onMouseLeave={() => setTransform('')} onClick={onClick} style={{ transform, transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  )
}

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const { ref, isVisible } = useIntersectionObserver()
  const count = useCountUp(value, 1500, isVisible)
  return <div ref={ref}>{count}{suffix}</div>
}

// ============================================================================
// BOOT SCREEN COMPONENT
// ============================================================================

function BootScreen({ onComplete, isDark }: { onComplete: () => void; isDark: boolean }) {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showWelcome, setShowWelcome] = useState(false)
  
  const bootLines = [
    '[    0.000000] Linux version 5.15.0-kigan (kigan@portfolio) (gcc version 11.2.0) #1 SMP',
    '[    0.000001] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0',
    '[    0.012453] Initializing cgroup subsys cpuset',
    '[    0.025891] Initializing cgroup subsys cpu',
    '[    0.038234] Initializing cgroup subsys cpuacct',
    '[    0.051876] CPU: Intel(R) Core(TM) i7-14yr-old Developer CPU @ 3.2GHz',
    '[    0.078234] Memory: 16384MB RAM available',
    '[    0.102456] Loading developer profile...',
    '[    0.145678] Mounting virtual filesystems...',
    '[    0.178234] Starting network services...',
    '[    0.201456] Loading interactive features...',
    '[    0.234567] Sound engine initialized',
    '[    0.267890] Portfolio data loaded successfully',
    '[    0.301234] All systems ready!',
    '',
    'Welcome to KiganOS 2.0!',
    ''
  ]
  
  useEffect(() => {
    soundEngine.init()
    
    const totalChars = bootLines.reduce((acc, line) => acc + line.length, 0)
    let totalTyped = 0
    
    const typeInterval = setInterval(() => {
      if (currentLine >= bootLines.length) {
        clearInterval(typeInterval)
        setShowWelcome(true)
        soundEngine.boot()
        setTimeout(onComplete, 600)
        return
      }
      
      const currentText = bootLines[currentLine]
      
      if (charIndex < currentText.length) {
        setLines(prev => {
          const newLines = [...prev]
          newLines[currentLine] = currentText.slice(0, charIndex + 1)
          return newLines
        })
        soundEngine.type()
        setCharIndex(prev => prev + 1)
        totalTyped++
        setProgress((totalTyped / totalChars) * 100)
      } else {
        setLines(prev => [...prev, ''])
        setCurrentLine(prev => prev + 1)
        setCharIndex(0)
      }
    }, 20)
    
    return () => clearInterval(typeInterval)
  }, [currentLine, charIndex, onComplete])
  
  return (
    <div className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center ${isDark ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
      <div className={`w-full max-w-2xl px-4 font-mono text-xs sm:text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
        <div className="min-h-[60vh] max-h-[70vh] overflow-hidden">
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-all leading-relaxed">
              {line.startsWith('[') ? (
                <>
                  <span className={isDark ? 'text-emerald-500' : 'text-emerald-600'}>{line.slice(0, 14)}</span>
                  <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>{line.slice(14)}</span>
                </>
              ) : line.startsWith('Welcome') ? (
                <span className={`text-lg font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>{line}</span>
              ) : (
                line
              )}
            </div>
          ))}
        </div>
        
        <div className={`mt-4 h-1 rounded-full overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
          <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
        
        {showWelcome && (
          <div className={`mt-6 text-center animate-pulse ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
            <div className="text-xl font-bold">Starting portfolio...</div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// KIGAN OS TERMINAL APP
// ============================================================================

function KiganOSTerminal() {
  const [lines, setLines] = useState<string[]>([
    'Welcome to KiganOS Terminal',
    'Type "help" for available commands',
    ''
  ])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])
  
  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()
    setCommandHistory(prev => [...prev, cmd])
    setHistoryIndex(-1)
    setLines(prev => [...prev, `<span class="text-amber-400">$ ${cmd}</span>`])
    
    const responses: Record<string, string[]> = {
      help: [
        '',
        'Available commands:',
        '  about     - About me',
        '  skills    - My skills',
        '  projects  - My projects',
        '  neofetch  - System info',
        '  date      - Current date/time',
        '  clear     - Clear terminal',
        '  exit      - Close terminal',
        ''
      ],
      about: [
        '',
        `  Name:    ${developerInfo.name}`,
        `  Age:     14 years old`,
        `  Email:   ${developerInfo.email}`,
        ''
      ],
      skills: ['', '  Skills:', ...skills.map(s => `  ${s.icon} ${s.name}: ${s.level}%`), ''],
      projects: ['', '  Projects:', ...projects.map(p => `  • ${p.title} (${p.status})`), ''],
      neofetch: [
        '',
        '   ██╗  ██╗██╗██████╗ ███████╗',
        '   ██║ ██╔╝██║██╔══██╗██╔════╝',
        '   █████╔╝ ██║██║  ██║█████╗  ',
        '   ██╔═██╗ ██║██║  ██║██╔══╝  ',
        '   ██║  ██╗██║██████╔╝███████╗',
        '   ╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝',
        '',
        '  OS: KiganOS 2.0',
        '  Host: Next.js 16',
        '  Kernel: React 18',
        '  Shell: KiganShell',
        ''
      ],
      date: ['', `  ${new Date().toLocaleString()}`, ''],
      clear: [],
      exit: ['Closing terminal...', '']
    }
    
    setTimeout(() => {
      if (command === 'clear') {
        setLines([''])
      } else if (command === 'exit') {
        setLines(prev => [...prev, 'Terminal closed. Click the X button to close this window.'])
      } else if (responses[command]) {
        setLines(prev => [...prev, ...responses[command]])
      } else if (command === '') {
        // Empty command
      } else {
        setLines(prev => [...prev, `Command not found: ${cmd}`, 'Type "help" for commands.', ''])
      }
    }, 50)
    
    setInput('')
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }
  
  return (
    <div className="h-full bg-zinc-950 flex flex-col cursor-text" onClick={() => inputRef.current?.focus()}>
      <div ref={terminalRef} className="flex-1 p-3 font-mono text-xs text-emerald-400 overflow-y-auto">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{ __html: line }} />
        ))}
      </div>
      <div className="flex items-center gap-2 p-2 border-t border-zinc-800">
        <span className="text-emerald-400 font-mono text-xs">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent font-mono text-xs text-emerald-300 outline-none"
        />
      </div>
    </div>
  )
}

// ============================================================================
// KIGAN OS COMPONENT
// ============================================================================

interface WindowState {
  id: string
  title: string
  x: number
  y: number
  width: number
  height: number
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
}

function KiganOS({ onClose }: { onClose: () => void }) {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [highestZ, setHighestZ] = useState(10)
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [showShutdown, setShowShutdown] = useState(false)
  
  const apps = [
    { id: 'about', name: 'About Me', icon: '👤', width: 450, height: 350 },
    { id: 'projects', name: 'Projects', icon: '📁', width: 500, height: 400 },
    { id: 'skills', name: 'Skills', icon: '⚡', width: 450, height: 400 },
    { id: 'terminal', name: 'Terminal', icon: '💻', width: 600, height: 400 },
    { id: 'documents', name: 'Documents', icon: '📄', width: 400, height: 350 },
    { id: 'photos', name: 'Photos', icon: '🖼️', width: 400, height: 350 },
    { id: 'settings', name: 'Settings', icon: '⚙️', width: 400, height: 350 },
  ]
  
  const openApp = (appId: string) => {
    const app = apps.find(a => a.id === appId)
    if (!app) return
    
    const existing = windows.find(w => w.id === appId)
    if (existing) {
      bringToFront(appId)
      return
    }
    
    const newWindow: WindowState = {
      id: appId,
      title: app.name,
      x: 80 + (windows.length * 40) % 300,
      y: 50 + (windows.length * 40) % 200,
      width: app.width,
      height: app.height,
      isMinimized: false,
      isMaximized: false,
      zIndex: highestZ + 1,
    }
    
    setHighestZ(prev => prev + 1)
    setWindows(prev => [...prev, newWindow])
    setActiveWindow(appId)
  }
  
  const bringToFront = (windowId: string) => {
    setHighestZ(prev => prev + 1)
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, zIndex: highestZ + 1, isMinimized: false } : w
    ))
    setActiveWindow(windowId)
  }
  
  const closeWindow = (windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId))
    if (activeWindow === windowId) setActiveWindow(null)
  }
  
  const minimizeWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMinimized: true } : w
    ))
  }
  
  const maximizeWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
    ))
  }
  
  const getAppContent = (appId: string) => {
    switch (appId) {
      case 'about':
        return (
          <div className="p-6 text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-4xl font-bold">
                K
              </div>
              <div>
                <h2 className="text-2xl font-bold">{developerInfo.name}</h2>
                <p className="text-zinc-400">Young Developer & Creative Coder</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-zinc-300">I&apos;m a 14-year-old developer who loves building interactive web experiences. When I&apos;m not coding, I&apos;m probably thinking about what to code next!</p>
              <div className="pt-4 border-t border-zinc-700">
                <p><span className="text-zinc-500">Email:</span> {developerInfo.email}</p>
                <p><span className="text-zinc-500">Location:</span> {developerInfo.location}</p>
                <p><span className="text-zinc-500">Age:</span> 14 years old</p>
              </div>
            </div>
          </div>
        )
      case 'projects':
        return (
          <div className="p-4 text-white overflow-y-auto h-full">
            <h3 className="text-lg font-bold mb-4">My Projects</h3>
            <div className="space-y-3">
              {projects.map(p => (
                <div key={p.id} className="p-3 bg-zinc-800/50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{p.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      p.status === 'building' ? 'bg-emerald-500/20 text-emerald-400' :
                      p.status === 'learning' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>{p.status}</span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-2">{p.description}</p>
                  <div className="flex gap-1 flex-wrap">
                    {p.tech.map(t => (
                      <span key={t} className="text-xs bg-zinc-700 px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'skills':
        return (
          <div className="p-4 text-white overflow-y-auto h-full">
            <h3 className="text-lg font-bold mb-4">Technical Skills</h3>
            <div className="space-y-3">
              {skills.map(s => (
                <div key={s.name} className="flex items-center gap-3">
                  <span className="text-xl w-8">{s.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{s.name}</span>
                      <span className="text-zinc-400">{s.level}%</span>
                    </div>
                    <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'terminal':
        return <KiganOSTerminal />
      case 'documents':
        return (
          <div className="p-4 text-white h-full">
            <h3 className="text-lg font-bold mb-4">Documents</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Resume.pdf', 'Portfolio.pdf', 'Learning-Notes.txt', 'Project-Ideas.md'].map(doc => (
                <div key={doc} className="p-3 bg-zinc-800/50 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-zinc-700/50 transition-colors">
                  <span className="text-2xl">📄</span>
                  <span className="text-sm">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        )
      case 'photos':
        return (
          <div className="p-4 text-white h-full">
            <h3 className="text-lg font-bold mb-4">Photos</h3>
            <div className="grid grid-cols-3 gap-2">
              {['🌅', '🏔️', '🌊', '🌳', '🌌', '🎨'].map((emoji, i) => (
                <div key={i} className="aspect-square bg-zinc-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-zinc-700 transition-colors">
                  <span className="text-3xl">{emoji}</span>
                </div>
              ))}
            </div>
          </div>
        )
      case 'settings':
        return (
          <div className="p-4 text-white h-full">
            <h3 className="text-lg font-bold mb-4">System Settings</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg">
                <span>Dark Mode</span>
                <div className="w-12 h-6 bg-amber-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg">
                <span>Sound Effects</span>
                <div className="w-12 h-6 bg-amber-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg">
                <span>Animations</span>
                <div className="w-12 h-6 bg-amber-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return <div className="p-4 text-white">App content</div>
    }
  }
  
  const [currentTime, setCurrentTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  
  const handleWindowDrag = (windowId: string, e: React.MouseEvent) => {
    e.preventDefault()
    const win = windows.find(w => w.id === windowId)
    if (!win || win.isMaximized) return
    
    bringToFront(windowId)
    
    const startX = e.clientX - win.x
    const startY = e.clientY - win.y
    
    const handleMouseMove = (e: MouseEvent) => {
      setWindows(prev => prev.map(w => 
        w.id === windowId 
          ? { ...w, x: Math.max(0, e.clientX - startX), y: Math.max(28, e.clientY - startY) }
          : w
      ))
    }
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  
  const handleShutdown = () => {
    setShowShutdown(true)
    setTimeout(() => {
      onClose()
    }, 800)
  }
  
  return (
    <div className="fixed inset-0 z-[99999] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 select-none">
      {/* Shutdown overlay */}
      {showShutdown && (
        <div className="absolute inset-0 z-[9999] bg-black flex items-center justify-center animate-pulse">
          <div className="text-white text-xl">Shutting down...</div>
        </div>
      )}
      
      {/* Menu Bar */}
      <div className="h-7 bg-zinc-800/80 backdrop-blur-xl flex items-center justify-between px-4 text-white text-xs">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose} 
            className="font-bold hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            <span className="text-amber-400">⌘</span> KiganOS
          </button>
          <span className="text-zinc-400 cursor-pointer hover:text-white">File</span>
          <span className="text-zinc-400 cursor-pointer hover:text-white">Edit</span>
          <span className="text-zinc-400 cursor-pointer hover:text-white">View</span>
          <span className="text-zinc-400 cursor-pointer hover:text-white">Window</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-zinc-400">🔋 100%</span>
          <span className="text-zinc-400">📶</span>
          <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
      
      {/* Desktop */}
      <div className="relative h-[calc(100vh-7rem)]">
        {/* Desktop Icons */}
        <div className="absolute top-4 left-4 grid gap-4">
          {apps.map(app => (
            <button
              key={app.id}
              onDoubleClick={() => openApp(app.id)}
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors w-20"
            >
              <span className="text-4xl">{app.icon}</span>
              <span className="text-xs text-white text-center">{app.name}</span>
            </button>
          ))}
        </div>
        
        {/* Windows */}
        {windows.map(win => (
          <div
            key={win.id}
            className={`absolute bg-zinc-900/95 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl border border-zinc-700/50 transition-all ${
              win.isMinimized ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
            }`}
            style={{
              left: win.isMaximized ? 0 : win.x,
              top: win.isMaximized ? 28 : win.y,
              width: win.isMaximized ? '100%' : win.width,
              height: win.isMaximized ? 'calc(100vh - 100px)' : win.height,
              zIndex: win.zIndex,
            }}
            onClick={() => bringToFront(win.id)}
          >
            {/* Title Bar */}
            <div
              className="h-8 bg-zinc-800 flex items-center justify-between px-3 cursor-move shrink-0"
              onMouseDown={(e) => handleWindowDrag(win.id, e)}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id); }}
                  className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
                />
              </div>
              <span className="text-xs text-zinc-400">{win.title}</span>
              <div className="w-14" />
            </div>
            {/* Content */}
            <div className="h-[calc(100%-32px)] overflow-auto">
              {getAppContent(win.id)}
            </div>
          </div>
        ))}
      </div>
      
      {/* Dock */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-zinc-800/80 backdrop-blur-xl flex items-center justify-center gap-2 px-4">
        {apps.map(app => (
          <button
            key={app.id}
            onClick={() => openApp(app.id)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all hover:scale-110 ${
              windows.find(w => w.id === app.id) && !windows.find(w => w.id === app.id)?.isMinimized
                ? 'bg-white/20 ring-2 ring-amber-500/50'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            {app.icon}
          </button>
        ))}
        <div className="w-px h-10 bg-zinc-600 mx-2" />
        <button
          onClick={handleShutdown}
          className="w-12 h-12 rounded-xl bg-red-500/20 hover:bg-red-500/40 flex items-center justify-center text-2xl transition-all hover:scale-110"
          title="Exit to Portfolio"
        >
          ⏻
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Portfolio() {
  // State
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [isNavHidden, setIsNavHidden] = useState(false)
  const [scrollPromptOpacity, setScrollPromptOpacity] = useState(1)
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [terminalInput, setTerminalInput] = useState('')
  const [hasBooted, setHasBooted] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [activeQuote, setActiveQuote] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showKiganOS, setShowKiganOS] = useState(false)
  
  // Light switch
  const chainRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const hasTriggered = useRef(false)
  const lastScrollY = useRef(0)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [chainAngle, setChainAngle] = useState(0)
  const [cordHeight, setCordHeight] = useState(0)
  
  const isDark = theme === 'dark'
  
  // Effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0)
      setIsNavHidden(currentScrollY > lastScrollY.current && currentScrollY > 150)
      setScrollPromptOpacity(currentScrollY > 10 ? 0 : 1)
      setShowBackToTop(currentScrollY > 500)
      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set(prev).add(entry.target.id))
        }
      })
    }, { threshold: 0.15 })
    document.querySelectorAll('section[id]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  
  useEffect(() => {
    const interval = setInterval(() => setActiveQuote(prev => (prev + 1) % quotes.length), 5000)
    return () => clearInterval(interval)
  }, [])
  
  // Light switch
  useEffect(() => {
    const chain = chainRef.current
    if (!chain) return
    
    const RESTING = 90
    const MAX = 200
    const TRIGGER = 160
    
    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true
      hasTriggered.current = false
      chain.setPointerCapture(e.pointerId)
      e.preventDefault()
    }
    
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return
      
      const rect = chain.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - rect.top
      
      const angle = clamp(-Math.atan2(dx, dy) * (180 / Math.PI), -30, 30)
      setChainAngle(angle)
      
      const stretch = clamp(Math.hypot(dx, dy) * 0.8, RESTING, MAX)
      setCordHeight(stretch)
      
      if (stretch >= TRIGGER && !hasTriggered.current) {
        hasTriggered.current = true
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
        if (soundEnabled) soundEngine.toggle()
        if (navigator.vibrate) navigator.vibrate(50)
      }
    }
    
    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging.current) return
      isDragging.current = false
      chain.releasePointerCapture(e.pointerId)
      setChainAngle(0)
      setCordHeight(0)
    }
    
    chain.addEventListener('pointerdown', onPointerDown)
    chain.addEventListener('pointermove', onPointerMove)
    chain.addEventListener('pointerup', onPointerUp)
    chain.addEventListener('pointercancel', onPointerUp)
    chain.addEventListener('pointerleave', onPointerUp)
    
    return () => {
      chain.removeEventListener('pointerdown', onPointerDown)
      chain.removeEventListener('pointermove', onPointerMove)
      chain.removeEventListener('pointerup', onPointerUp)
      chain.removeEventListener('pointercancel', onPointerUp)
      chain.removeEventListener('pointerleave', onPointerUp)
    }
  }, [soundEnabled])
  
  // Terminal command handler
  const handleTerminalCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()
    setTerminalLines(prev => [...prev, `<span class="${isDark ? 'text-amber-400' : 'text-amber-600'}">$ ${cmd}</span>`])
    
    // Check for KiganOS command
    if (command === 'open kiganos' || command === 'kiganos' || command === 'startx') {
      setTerminalLines(prev => [...prev, '', '  Launching KiganOS...', ''])
      setTimeout(() => {
        setShowKiganOS(true)
      }, 500)
      setTerminalInput('')
      return
    }
    
    const responses: Record<string, string[]> = {
      help: [
        '',
        '┌─────────────────────────────────────────┐',
        '│  AVAILABLE COMMANDS                     │',
        '├─────────────────────────────────────────┤',
        '│  about     - About me                   │',
        '│  skills    - Technical skills           │',
        '│  projects  - Current projects           │',
        '│  funfact   - Random fact                │',
        '│  joke      - Developer joke             │',
        '│  neofetch  - System info                │',
        '│  ls        - List directories           │',
        '│  pwd       - Current directory          │',
        '│  date      - Current date/time          │',
        '│  clear     - Clear terminal             │',
        '│  open KiganOS - Launch GUI              │',
        '└─────────────────────────────────────────┘',
        ''
      ],
      about: [
        '',
        `  Name:    ${developerInfo.name}`,
        `  Age:     14 years old`,
        `  Email:   ${developerInfo.email}`,
        `  Focus:   Web Development & Game Dev`,
        ''
      ],
      skills: ['', '  Skills:', '', ...skills.map(s => `  ${s.icon} ${s.name.padEnd(12)} ${'█'.repeat(Math.floor(s.level / 10))}${'░'.repeat(10 - Math.floor(s.level / 10))} ${s.level}%`), ''],
      projects: ['', '  Projects:', '', ...projects.map(p => `  ${p.status === 'building' ? '🔧' : p.status === 'learning' ? '📖' : '💡'} ${p.title} (${p.progress}%)`), ''],
      funfact: ['', `  ${developerInfo.funFacts[Math.floor(Math.random() * developerInfo.funFacts.length)]}`, ''],
      joke: ['', ...[
        ['  Why do programmers prefer dark mode?', '  Because light attracts bugs!'],
        ['  Why do Java developers wear glasses?', '  Because they can\'t C#!'],
        ['  There are 10 types of people...', '  Those who understand binary and those who don\'t.']
      ][Math.floor(Math.random() * 3)], ''],
      neofetch: [
        '',
        '       .---.        kigan@portfolio',
        '      /     \\       ---------------',
        '      \\.@-@./       OS: KiganOS 2.0',
        '      /`\\_/`\\       Host: Next.js 16',
        '     //  _  \\\\      Kernel: React 18',
        '    | \\     | |     Uptime: Always',
        '    \\_|    \\_|      Skills: 8 loaded',
        ''
      ],
      ls: ['  documents/  projects/  skills/  contact.txt', ''],
      pwd: ['  /home/kigan/portfolio', ''],
      date: ['', `  ${new Date().toLocaleString()}`, ''],
      clear: []
    }
    
    setTimeout(() => {
      if (command === 'clear') {
        setTerminalLines([])
      } else if (responses[command]) {
        responses[command].forEach((line, i) => {
          setTimeout(() => {
            setTerminalLines(prev => [...prev, line])
            if (soundEnabled) soundEngine.type()
            if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight
          }, i * 30)
        })
      } else {
        if (soundEnabled) soundEngine.error()
        setTerminalLines(prev => [...prev, `  Command not found: ${cmd}`, '  Type "help" for commands.', ''])
      }
    }, 50)
    
    setTerminalInput('')
  }
  
  const copyEmail = async () => {
    await navigator.clipboard.writeText(developerInfo.email)
    setCopiedEmail(true)
    if (soundEnabled) soundEngine.success()
    setTimeout(() => setCopiedEmail(false), 2000)
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitting(true)
    try {
      // Formspree endpoint - replace with your own from https://formspree.io
      const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'
      const response = await fetch(formspreeEndpoint, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, 
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message
        }) 
      })
      if (response.ok) {
        setFormSubmitted(true)
        if (soundEnabled) soundEngine.success()
        setShowConfetti(true)
        setTimeout(() => { setFormSubmitted(false); setShowConfetti(false) }, 3000)
        setFormState({ name: '', email: '', message: '' })
      } else {
        if (soundEnabled) soundEngine.error()
        alert('Something went wrong. Please try emailing me directly at ' + developerInfo.email)
      }
    } catch {
      if (soundEnabled) soundEngine.error()
      alert('Something went wrong. Please try emailing me directly at ' + developerInfo.email)
    } finally { setFormSubmitting(false) }
  }
  
  const toggleSound = () => {
    if (soundEnabled) { soundEngine.disable(); setSoundEnabled(false) }
    else { soundEngine.init(); setSoundEnabled(true) }
  }
  
  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
      {/* Boot Screen */}
      {!hasBooted && <BootScreen onComplete={() => setHasBooted(true)} isDark={isDark} />}
      
      {/* KiganOS */}
      {showKiganOS && <KiganOS onClose={() => setShowKiganOS(false)} />}
      
      <SmoothCursor theme={theme} />
      
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[99999]">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="absolute rounded-sm" style={{
              left: `${Math.random() * 100}%`, top: '-20px', width: '8px', height: '8px',
              background: ['#f97316', '#eab308', '#22c55e', '#06b6d4', '#a855f7'][Math.floor(Math.random() * 5)],
              animation: `confetti ${Math.random() * 2 + 2}s ease-out forwards`, animationDelay: `${Math.random() * 0.5}s`
            }} />
          ))}
        </div>
      )}
      
      <div className="fixed top-0 left-0 h-1 z-[10001]" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #f97316, #eab308)' }} />
      
      <div className={`fixed top-0 left-0 w-full h-screen pointer-events-none z-[1] transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'radial-gradient(ellipse at 50% 15%, rgba(251, 191, 36, 0.04) 0%, transparent 45%)' }} />
      
      {/* Ceiling Light */}
      <div className={`fixed top-0 left-1/2 z-[9998] pointer-events-none transition-all duration-500 ${isDark ? '-translate-x-1/2' : '-translate-x-1/2 -translate-y-full opacity-60'}`}>
        <div className="flex flex-col items-center origin-top" style={{ animation: isDark ? 'light-sway 6s infinite ease-in-out' : 'none' }}>
          <div className="w-[3px]" style={{ height: 'clamp(45px, 8vh, 80px)', background: 'repeating-linear-gradient(45deg, #5c4e3c, #5c4e3c 3px, #4a3f2f 3px, #4a3f2f 6px)' }} />
          <div className="rounded-t" style={{ width: 'clamp(12px, 1.5vw, 20px)', height: 'clamp(12px, 1.2vw, 16px)', background: 'linear-gradient(to right, #333, #555, #333)' }} />
          <div className="rounded-[50%_50%_40%_40%/60%_60%_40%_40%] transition-all duration-500 -mt-1"
            style={{ width: 'clamp(26px, 3vw, 40px)', height: 'clamp(36px, 4vw, 55px)', background: isDark ? '#fffce0' : '#c0c0c0', boxShadow: isDark ? '0 0 30px 15px rgba(251, 191, 36, 0.15)' : 'inset 0 0 8px rgba(0,0,0,0.1)' }} />
        </div>
      </div>
      
      {/* Pull Chain */}
      <div ref={chainRef} className="fixed top-0 right-[3%] sm:right-[4%] flex flex-col items-center cursor-grab active:cursor-grabbing z-[9998] touch-none select-none"
        style={{ transform: `rotate(${chainAngle}deg)`, transformOrigin: 'top center', transition: isDragging.current ? 'none' : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
        <div className="w-[3px]" style={{ height: `${cordHeight || 90}px`, background: 'linear-gradient(90deg, #444 0%, #777 50%, #444 100%)', transition: isDragging.current ? 'none' : 'height 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />
        <div className="rounded-[10px_10px_50%_50%] transition-all duration-200" style={{ width: 'clamp(14px, 2vw, 20px)', height: 'clamp(26px, 3.5vw, 36px)', background: 'linear-gradient(to bottom, #d4af37, #b8962d)', boxShadow: '0 0 12px rgba(212, 175, 55, 0.4)' }} />
      </div>
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full h-14 sm:h-16 flex justify-between items-center px-4 sm:px-6 md:px-[5%] z-[10000] border-b transition-all duration-300 ${isNavHidden ? '-translate-y-full' : ''} ${isDark ? 'bg-zinc-950/90 backdrop-blur-xl border-zinc-800/50' : 'bg-white/90 backdrop-blur-xl border-zinc-200'}`}>
        <div className={`font-bold text-lg ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`} onMouseEnter={() => soundEnabled && soundEngine.hover()}>{developerInfo.name}</div>
        <ul className="hidden md:flex gap-6 lg:gap-8 list-none">
          {['About', 'Journey', 'Learning', 'Contact'].map(item => (
            <li key={item}><a href={`#${item.toLowerCase()}`} onClick={() => soundEnabled && soundEngine.click()} onMouseEnter={() => soundEnabled && soundEngine.hover()} className={`text-sm font-medium transition-all hover:text-amber-500 relative group ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>{item}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full" /></a></li>
          ))}
        </ul>
        <div className="flex items-center gap-1 sm:gap-2">
          <a href="/terminal" onClick={() => soundEnabled && soundEngine.click()} onMouseEnter={() => soundEnabled && soundEngine.hover()} className={`p-2 rounded-lg ${isDark ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'}`} title="Full Terminal">
            <TerminalIcon className="w-5 h-5" />
          </a>
          <button onClick={toggleSound} onMouseEnter={() => soundEnabled && soundEngine.hover()} className={`p-2 rounded-lg ${isDark ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'}`}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
          <button onClick={() => { setTheme(prev => prev === 'dark' ? 'light' : 'dark'); if (soundEnabled) soundEngine.toggle(); }} onMouseEnter={() => soundEnabled && soundEngine.hover()} className={`p-2 rounded-lg ${isDark ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'}`}>{isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className={`md:hidden p-2 rounded-lg ${isDark ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'}`}>{showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
      </nav>
      
      {showMobileMenu && (
        <div className={`fixed inset-0 z-[9999] pt-16 ${isDark ? 'bg-zinc-950' : 'bg-zinc-50'} backdrop-blur-xl md:hidden`}>
          <div className="flex flex-col items-center gap-6 p-8">
            {['About', 'Journey', 'Learning', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setShowMobileMenu(false)} className={`text-2xl font-medium hover:text-amber-500 ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>{item}</a>
            ))}
            <a href="/terminal" onClick={() => setShowMobileMenu(false)} className={`text-2xl font-medium hover:text-amber-500 flex items-center gap-2 ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
              <TerminalIcon className="w-6 h-6" /> Full Terminal
            </a>
          </div>
        </div>
      )}
      
      {/* Hero */}
      <section id="hero" className="relative z-[1]" style={{ height: '200vh' }}>
        <div className="sticky top-0 h-screen flex justify-center items-center overflow-hidden">
          <div className="text-center z-10 px-4 max-w-4xl">
            <Badge className={`mb-4 px-4 py-1.5 ${isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-500/30 text-amber-600'}`}><Sparkles className="w-3.5 h-3.5 mr-2" />Young Developer</Badge>
            <p className={`text-base sm:text-lg font-medium mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Hey there! I&apos;m</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">{developerInfo.name}</span>
            </h1>
            <p className={`text-lg sm:text-xl md:text-2xl font-medium mb-6 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}><Typewriter text={developerInfo.title} speed={60} /></p>
            <p className={`text-base sm:text-lg max-w-xl mx-auto mb-8 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{developerInfo.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => document.getElementById('learning')?.scrollIntoView({ behavior: 'smooth' })} onMouseEnter={() => soundEnabled && soundEngine.hover()} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-zinc-900 font-semibold rounded-xl shadow-lg shadow-amber-500/25">See What I&apos;m Building<ArrowRight className="w-4 h-4 ml-2" /></Button>
              <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} onMouseEnter={() => soundEnabled && soundEngine.hover()} className={`px-8 py-4 font-semibold rounded-xl ${isDark ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100' : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-900'}`}><Mail className="w-4 h-4 mr-2" />Get in Touch</Button>
            </div>
            <div className={`mt-12 h-16 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              <p className="text-sm sm:text-base italic">&ldquo;{quotes[activeQuote].text}&rdquo;</p>
              <p className="text-xs sm:text-sm mt-1 opacity-70">— {quotes[activeQuote].author}</p>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: scrollPromptOpacity }}>
            <span className={`text-xs tracking-[2px] uppercase font-semibold ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Scroll Down</span>
            <ChevronDown className={`w-5 h-5 animate-bounce ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} />
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* About */}
        <section id="about" className={`min-h-screen flex flex-col justify-center py-20 px-4 transition-all duration-700 ${visibleSections.has('about') ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl w-full mx-auto">
            <div className="text-center mb-12">
              <Badge className={`mb-4 ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}><Code2 className="w-3 h-3 mr-2" />About Me</Badge>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>A Young Developer&apos;s <span className="text-amber-500">Story</span></h2>
              <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{developerInfo.bio}</p>
            </div>
            
            {/* Terminal */}
            <div onClick={() => inputRef.current?.focus()} className={`w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl mb-12 cursor-pointer ${isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-zinc-100 border border-zinc-200'}`}>
              <div className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className={`flex-1 text-center text-sm font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>kigan@portfolio:~</span>
                <TerminalIcon className={`w-4 h-4 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`} />
                <a href="/terminal" onClick={(e) => e.stopPropagation()} className={`p-1 rounded hover:bg-zinc-700/50 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`} title="Open Full Terminal">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div ref={terminalRef} className={`p-4 font-mono text-sm leading-relaxed min-h-[200px] max-h-[45vh] overflow-y-auto ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                {terminalLines.map((line, i) => <div key={i} className="whitespace-pre-wrap break-words mb-0.5" dangerouslySetInnerHTML={{ __html: line }} />)}
                <span className={`inline-block w-2 h-4 ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'} animate-pulse ml-1`} />
              </div>
              <div className={`flex items-center gap-2 px-4 py-3 border-t-2 ${isDark ? 'bg-zinc-800/50 border-emerald-500/30' : 'bg-zinc-200/50 border-emerald-500'}`}>
                <span className={`font-mono text-sm font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>$</span>
                <input ref={inputRef} type="text" value={terminalInput} onChange={e => setTerminalInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && terminalInput.trim() && handleTerminalCommand(terminalInput)} placeholder='Type "help" for commands...' className={`flex-1 bg-transparent font-mono text-sm outline-none ${isDark ? 'text-zinc-100 placeholder-emerald-400/40' : 'text-zinc-900 placeholder-emerald-600/40'}`} />
                <Badge className={`text-xs ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-500/30 text-emerald-700'}`}>Enter</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {developerInfo.funFacts.map((fact, i) => (
                <InteractiveCard key={i} onClick={() => soundEnabled && soundEngine.click()} isDark={isDark} className={`p-4 rounded-xl ${isDark ? 'bg-zinc-800/50' : 'bg-zinc-100'}`}>
                  <p className={`text-sm ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>{fact}</p>
                </InteractiveCard>
              ))}
            </div>
          </div>
        </section>
        
        {/* Journey */}
        <section id="journey" className={`min-h-screen flex flex-col justify-center py-20 px-4 transition-all duration-700 ${visibleSections.has('journey') ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl w-full mx-auto">
            <div className="text-center mb-12">
              <Badge className={`mb-4 ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}><Rocket className="w-3 h-3 mr-2" />My Journey</Badge>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>Coding <span className="text-amber-500">Milestones</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {achievements.map((a, i) => (
                <InteractiveCard key={i} onClick={() => soundEnabled && soundEngine.click()} isDark={isDark} className={`p-6 rounded-xl ${isDark ? 'bg-zinc-800/50' : 'bg-zinc-100'}`}>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{a.icon}</div>
                    <div><p className={`font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>{a.title}</p><p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{a.desc}</p><p className="text-xs text-amber-500 mt-1 font-medium">{a.year}</p></div>
                  </div>
                </InteractiveCard>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[{ icon: <Timer className="w-5 h-5" />, value: 500, suffix: '+', label: 'Hours Coding' }, { icon: <Code2 className="w-5 h-5" />, value: 50, suffix: 'K+', label: 'Lines Written' }, { icon: <Sparkles className="w-5 h-5" />, value: 200, suffix: '+', label: 'Bugs Fixed' }, { icon: <Trophy className="w-5 h-5" />, value: 3, suffix: '+', label: 'Years Learning' }].map((s, i) => (
                <InteractiveCard key={i} onClick={() => soundEnabled && soundEngine.click()} isDark={isDark} className={`p-4 rounded-xl text-center ${isDark ? 'bg-zinc-800/50' : 'bg-zinc-100'}`}>
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-500 text-white`}>{s.icon}</div>
                  <div className={`font-bold text-xl ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}><AnimatedCounter value={s.value} suffix={s.suffix} /></div>
                  <div className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{s.label}</div>
                </InteractiveCard>
              ))}
            </div>
          </div>
        </section>
        
        {/* Learning */}
        <section id="learning" className={`min-h-screen flex flex-col py-20 px-4 transition-all duration-700 ${visibleSections.has('learning') ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-6xl w-full mx-auto">
            <div className="text-center mb-12">
              <Badge className={`mb-4 ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}><Brain className="w-3 h-3 mr-2" />Learning</Badge>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>Skills & <span className="text-amber-500">Projects</span></h2>
            </div>
            <div className="mb-12">
              <h3 className={`text-xl font-bold mb-6 text-center ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>What I&apos;m Learning</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {skills.map((s, i) => (
                  <div key={s.name} onClick={() => soundEnabled && soundEngine.click()} onMouseEnter={() => soundEnabled && soundEngine.hover()} className={`p-4 rounded-xl transition-all cursor-pointer ${isDark ? 'bg-zinc-800/50 hover:bg-zinc-800' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                    <div className="flex items-center gap-2 mb-2"><span className="text-lg">{s.icon}</span><span className={`font-medium text-sm ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>{s.name}</span></div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`}><div className={`h-full rounded-full bg-gradient-to-r ${s.gradient} transition-all duration-1000`} style={{ width: visibleSections.has('learning') ? `${s.level}%` : '0%' }} /></div>
                    <p className={`text-xs mt-1 text-right ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{s.level}%</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className={`text-xl font-bold mb-6 text-center ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>What I&apos;m Building</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map(p => (
                  <InteractiveCard key={p.id} onClick={() => soundEnabled && soundEngine.click()} isDark={isDark} className={`p-5 rounded-xl ${isDark ? 'bg-zinc-800/50' : 'bg-zinc-100'}`}>
                    <div className="flex items-start justify-between mb-2"><h4 className={`font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>{p.title}</h4><div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} /></div>
                    <p className={`text-sm mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{p.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">{p.tech.map(t => <Badge key={t} className={`text-xs ${isDark ? 'bg-zinc-700' : 'bg-zinc-200'}`}>{t}</Badge>)}</div>
                    <div className="flex items-center gap-2 mb-2"><Progress value={p.progress} className={`flex-1 h-1.5 ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`} /><span className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{p.progress}%</span></div>
                    <Badge className={`text-xs ${p.status === 'building' ? 'bg-emerald-500/20 text-emerald-400' : p.status === 'learning' ? 'bg-amber-500/20 text-amber-400' : 'bg-purple-500/20 text-purple-400'}`}>{p.status === 'building' ? '🔧 Building' : p.status === 'learning' ? '📖 Learning' : '💡 Planning'}</Badge>
                  </InteractiveCard>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact */}
        <section id="contact" className={`min-h-screen flex flex-col justify-center py-20 px-4 transition-all duration-700 ${visibleSections.has('contact') ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl w-full mx-auto">
            <div className="text-center mb-12">
              <Badge className={`mb-4 ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}><Mail className="w-3 h-3 mr-2" />Contact</Badge>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>Let&apos;s <span className="text-amber-500">Connect</span></h2>
              <p className={`text-base sm:text-lg ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Got a cool idea? I&apos;d love to hear from you!</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className={`p-6 rounded-xl ${isDark ? 'bg-zinc-800/50 border-zinc-700' : 'bg-white border-zinc-200 shadow-lg'}`}>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input value={formState.name} onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))} onClick={() => soundEnabled && soundEngine.click()} placeholder="Your Name" className={`rounded-xl ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-zinc-50 border-zinc-300'}`} />
                  <Input type="email" value={formState.email} onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))} onClick={() => soundEnabled && soundEngine.click()} placeholder="Your Email" className={`rounded-xl ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-zinc-50 border-zinc-300'}`} />
                  <Textarea value={formState.message} onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))} onClick={() => soundEnabled && soundEngine.click()} placeholder="Your Message" rows={4} className={`resize-none rounded-xl ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-zinc-50 border-zinc-300'}`} />
                  <Button type="submit" disabled={formSubmitting} onMouseEnter={() => soundEnabled && soundEngine.hover()} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-zinc-900 font-semibold py-6 rounded-xl shadow-lg shadow-amber-500/25">
                    {formSubmitted ? <><CheckCircle className="w-5 h-5 mr-2" />Sent!</> : formSubmitting ? 'Sending...' : <><Send className="w-4 h-4 mr-2" />Send Message</>}
                  </Button>
                </form>
              </Card>
              <div className="space-y-4">
                <InteractiveCard onClick={() => {}} isDark={isDark} className={`p-6 rounded-xl ${isDark ? 'bg-zinc-800/50 border-zinc-700' : 'bg-white border-zinc-200 shadow-lg'}`}>
                  <h3 className={`font-bold mb-4 ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>Quick Contact</h3>
                  <button onClick={copyEmail} onMouseEnter={() => soundEnabled && soundEngine.hover()} className={`flex items-center gap-3 w-full p-3 rounded-xl ${isDark ? 'hover:bg-zinc-700' : 'hover:bg-zinc-100'}`}><Mail className="w-5 h-5 text-amber-500" /><span className={`text-sm ${isDark ? 'text-zinc-200' : 'text-zinc-700'}`}>{developerInfo.email}</span>{copiedEmail ? <Check className="w-4 h-4 text-emerald-500 ml-auto" /> : <Copy className="w-4 h-4 opacity-50 ml-auto" />}</button>
                  <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'text-zinc-200' : 'text-zinc-700'}`}><Globe className="w-5 h-5 text-amber-500" /><span className="text-sm">{developerInfo.location}</span></div>
                </InteractiveCard>
                <InteractiveCard onClick={() => {}} isDark={isDark} className={`p-6 rounded-xl ${isDark ? 'bg-zinc-800/50 border-zinc-700' : 'bg-white border-zinc-200 shadow-lg'}`}>
                  <h3 className={`font-bold mb-4 ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>Online</h3>
                  <div className="flex flex-wrap gap-3">
                    {[{ icon: <Github className="w-5 h-5" />, label: 'GitHub' }, { icon: <Twitter className="w-5 h-5" />, label: 'Twitter' }, { icon: <Gamepad2 className="w-5 h-5" />, label: 'Discord' }].map(s => (
                      <button key={s.label} onClick={() => soundEnabled && soundEngine.click()} onMouseEnter={() => soundEnabled && soundEngine.hover()} className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110 ${isDark ? 'bg-zinc-700 text-zinc-200 hover:bg-amber-500 hover:text-zinc-900' : 'bg-zinc-100 text-zinc-600 hover:bg-amber-500 hover:text-zinc-900'}`}>{s.icon}</button>
                    ))}
                  </div>
                </InteractiveCard>
                <InteractiveCard onClick={() => soundEnabled && soundEngine.click()} isDark={isDark} className={`p-5 rounded-xl ${isDark ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10' : 'bg-gradient-to-br from-amber-100 to-orange-100'}`}>
                  <div className="text-center"><Lightbulb className="w-7 h-7 mx-auto mb-2 text-amber-500" /><p className={`text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>I wrote my first &quot;Hello World&quot; at 11 - it felt like magic!</p></div>
                </InteractiveCard>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className={`relative z-10 py-8 px-4 border-t ${isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white/50 border-zinc-200'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Made with <Heart className="w-3.5 h-3.5 inline text-red-500 fill-red-500" /> by {developerInfo.name}</p>
          <p className={`text-xs mt-2 ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>Type &quot;open KiganOS&quot; in the terminal to explore!</p>
        </div>
      </footer>
      
      <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); if (soundEnabled) soundEngine.click(); }} onMouseEnter={() => soundEnabled && soundEngine.hover()} className={`fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-900 flex items-center justify-center shadow-lg transition-all hover:scale-110 shadow-amber-500/30 ${showBackToTop ? '' : 'opacity-0 translate-y-10 pointer-events-none'}`}><ChevronDown className="w-6 h-6 rotate-180" /></button>
      
      <style jsx global>{`
        @keyframes light-sway { 0%, 100% { transform: rotate(3deg); } 50% { transform: rotate(-3deg); } }
        @keyframes confetti { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
        ::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(245, 158, 11, 0.4); border-radius: 4px; }
        @media (max-width: 640px) { ::-webkit-scrollbar { width: 4px; } }
        html { scroll-behavior: smooth; } body { overflow-x: hidden; }
        @media (min-width: 769px) { body { cursor: none; } }
      `}</style>
    </div>
  )
}
