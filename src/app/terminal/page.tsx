'use client'

import { useState, useEffect, useRef } from 'react'
import { Terminal as TerminalIcon, X, ExternalLink } from 'lucide-react'

// ============================================================================
// DATA
// ============================================================================

const developerInfo = {
  name: "Kigan Patel",
  email: "Kiganpatel@icloud.com",
  location: "Learning from Home",
}

const skills = [
  { name: "HTML & CSS", level: 85, icon: "🎨" },
  { name: "JavaScript", level: 75, icon: "⚡" },
  { name: "React", level: 60, icon: "⚛️" },
  { name: "TypeScript", level: 55, icon: "📘" },
  { name: "Python", level: 70, icon: "🐍" },
  { name: "Node.js", level: 50, icon: "🟢" },
  { name: "Game Dev", level: 45, icon: "🎮" },
  { name: "UI/UX Design", level: 55, icon: "✨" }
]

const projects = [
  { id: 1, title: "Portfolio Website", description: "A playground for learning Next.js and animations.", status: "building", progress: 85, tech: ["Next.js", "TypeScript", "Tailwind"] },
  { id: 2, title: "Browser Game", description: "Learning physics and collision detection.", status: "building", progress: 50, tech: ["JavaScript", "Canvas API"] },
  { id: 3, title: "AI Assistant", description: "Exploring AI with a chatbot.", status: "learning", progress: 35, tech: ["Python", "OpenAI API"] },
  { id: 4, title: "Mobile App", description: "Planning my first mobile app.", status: "planning", progress: 15, tech: ["React Native"] },
  { id: 5, title: "Discord Bot", description: "A fun bot for my friend's server.", status: "building", progress: 60, tech: ["Node.js", "Discord.js"] }
]

const funFacts = [
  "Started coding at age 11",
  "My first program was 'Hello World' - I thought it was magic",
  "I debug with the determination of a detective",
  "I run on curiosity, not coffee!"
]

// ============================================================================
// SOUND ENGINE
// ============================================================================

class SoundEngine {
  private ctx: AudioContext | null = null
  private enabled: boolean = true
  
  init() {
    if (typeof window === 'undefined') return
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }
  
  type() {
    if (!this.enabled || !this.ctx) return
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.frequency.setValueAtTime(1200 + Math.random() * 200, this.ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.015)
    osc.type = 'square'
    gain.gain.setValueAtTime(0.03, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03)
    osc.start(this.ctx.currentTime)
    osc.stop(this.ctx.currentTime + 0.03)
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
        gain.gain.setValueAtTime(0.05, this.ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25)
        osc.start(this.ctx.currentTime)
        osc.stop(this.ctx.currentTime + 0.25)
      }, i * 100)
    })
  }
  
  error() {
    if (!this.enabled || !this.ctx) return
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.frequency.setValueAtTime(200, this.ctx.currentTime)
    osc.type = 'sawtooth'
    gain.gain.setValueAtTime(0.02, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1)
    osc.start(this.ctx.currentTime)
    osc.stop(this.ctx.currentTime + 0.1)
  }
}

const soundEngine = new SoundEngine()

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
// TYPES
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

// ============================================================================
// KIGAN OS COMPONENT
// ============================================================================

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
          title="Exit to Terminal"
        >
          ⏻
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// TERMINAL PAGE COMPONENT
// ============================================================================

export default function TerminalPage() {
  const [lines, setLines] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [bootComplete, setBootComplete] = useState(false)
  const [bootLines, setBootLines] = useState<string[]>([])
  const [bootProgress, setBootProgress] = useState(0)
  const [showKiganOS, setShowKiganOS] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Boot sequence
  useEffect(() => {
    soundEngine.init()
    
    const bootSequence = [
      '[    0.000000] Linux version 5.15.0-kigan (kigan@portfolio) (gcc version 11.2.0) #1 SMP',
      '[    0.000001] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-kigan',
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
      '╔══════════════════════════════════════════════════════════════╗',
      '║                                                              ║',
      '║   ██╗  ██╗██╗██████╗ ███████╗ ██████╗ ███╗   ██╗             ║',
      '║   ██║ ██╔╝██║██╔══██╗██╔════╝██╔═══██╗████╗  ██║             ║',
      '║   █████╔╝ ██║██║  ██║█████╗  ██║   ██║██╔██╗ ██║             ║',
      '║   ██╔═██╗ ██║██║  ██║██╔══╝  ██║   ██║██║╚██╗██║             ║',
      '║   ██║  ██╗██║██████╔╝███████╗╚██████╔╝██║ ╚████║             ║',
      '║   ╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝             ║',
      '║                                                              ║',
      '║              Welcome to KiganOS Terminal v2.0                ║',
      '║                                                              ║',
      '╚══════════════════════════════════════════════════════════════╝',
      '',
      '  Welcome to Kigan Patel\'s interactive terminal!',
      '  Type "help" to see available commands.',
      '  Type "open KiganOS" to launch the graphical interface.',
      '  Type "exit" or "home" to go back to the portfolio.',
      '',
    ]
    
    let lineIndex = 0
    const totalChars = bootSequence.reduce((acc, line) => acc + line.length, 0)
    let typedChars = 0
    
    const typeInterval = setInterval(() => {
      if (lineIndex >= bootSequence.length) {
        clearInterval(typeInterval)
        soundEngine.boot()
        setBootComplete(true)
        return
      }
      
      const currentLine = bootSequence[lineIndex]
      setBootLines(prev => [...prev, currentLine])
      soundEngine.type()
      typedChars += currentLine.length
      setBootProgress((typedChars / totalChars) * 100)
      lineIndex++
    }, 30)
    
    return () => clearInterval(typeInterval)
  }, [])
  
  // Scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines, bootLines])
  
  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()
    setLines(prev => [...prev, `<span class="text-amber-400">$ ${cmd}</span>`])
    
    // Check for KiganOS command
    if (command === 'open kiganos' || command === 'kiganos' || command === 'startx') {
      setLines(prev => [...prev, '', '  Launching KiganOS...', ''])
      setTimeout(() => {
        setShowKiganOS(true)
      }, 500)
      setInput('')
      return
    }
    
    // Check for exit/home command
    if (command === 'exit' || command === 'home' || command === 'cd ~') {
      setLines(prev => [...prev, '', '  Redirecting to portfolio...', ''])
      setTimeout(() => {
        window.location.href = '/'
      }, 500)
      setInput('')
      return
    }
    
    const responses: Record<string, string[]> = {
      help: [
        '',
        '┌──────────────────────────────────────────────────────────────┐',
        '│  AVAILABLE COMMANDS                                          │',
        '├──────────────────────────────────────────────────────────────┤',
        '│  about        - About me                                     │',
        '│  skills       - Technical skills                             │',
        '│  projects     - Current projects                             │',
        '│  funfact      - Random fact about me                         │',
        '│  joke         - Developer joke                               │',
        '│  neofetch     - System info                                  │',
        '│  ls           - List directories                             │',
        '│  pwd          - Current directory                            │',
        '│  date         - Current date/time                            │',
        '│  whoami       - Who am I                                     │',
        '│  clear        - Clear terminal                               │',
        '│  open KiganOS - Launch graphical interface                   │',
        '│  exit / home  - Go back to portfolio                         │',
        '└──────────────────────────────────────────────────────────────┘',
        '',
      ],
      about: [
        '',
        `  Name:    ${developerInfo.name}`,
        `  Age:     14 years old`,
        `  Email:   ${developerInfo.email}`,
        `  Focus:   Web Development & Game Dev`,
        '',
        '  "I\'m a 14-year-old developer who loves building interactive',
        '   web experiences. When I\'m not coding, I\'m probably thinking',
        '   about what to code next!"',
        '',
      ],
      skills: [
        '',
        '  Technical Skills:',
        '',
        ...skills.map(s => `  ${s.icon} ${s.name.padEnd(15)} ${'█'.repeat(Math.floor(s.level / 10))}${'░'.repeat(10 - Math.floor(s.level / 10))} ${s.level}%`),
        '',
      ],
      projects: [
        '',
        '  Current Projects:',
        '',
        ...projects.map(p => `  ${p.status === 'building' ? '🔧' : p.status === 'learning' ? '📖' : '💡'} ${p.title.padEnd(20)} [${p.progress}%]`),
        '',
        '  Type "project [name]" for more details.',
        '',
      ],
      funfact: ['', `  ${funFacts[Math.floor(Math.random() * funFacts.length)]}`, ''],
      joke: [
        '',
        ...[
          ['  Why do programmers prefer dark mode?', '  Because light attracts bugs!'],
          ['  Why do Java developers wear glasses?', '  Because they can\'t C#!'],
          ['  There are 10 types of people...', '  Those who understand binary and those who don\'t.'],
          ['  A SQL query walks into a bar...', '  walks up to two tables and asks, "Can I join you?"'],
        ][Math.floor(Math.random() * 4)],
        '',
      ],
      neofetch: [
        '',
        '       .---.        kigan@portfolio',
        '      /     \\       ---------------',
        '      \\.@-@./       OS: KiganOS 2.0',
        '      /`\\_/`\\       Host: Next.js 16',
        '     //  _  \\\\      Kernel: React 18',
        '    | \\     | |     Uptime: Always',
        '    \\_|    \\_|      Shell: KiganShell',
        '                    Skills: 8 loaded',
        '                    Age: 14 years',
        '',
      ],
      ls: [
        '',
        '  drwxr-xr-x  documents/',
        '  drwxr-xr-x  projects/',
        '  drwxr-xr-x  skills/',
        '  -rw-r--r--  contact.txt',
        '  -rw-r--r--  about.md',
        '',
      ],
      pwd: ['', '  /home/kigan/portfolio', ''],
      date: ['', `  ${new Date().toLocaleString()}`, ''],
      whoami: ['', '  kigan - A 14-year-old developer', ''],
      clear: [],
    }
    
    // Handle project command
    if (command.startsWith('project ')) {
      const projectName = command.replace('project ', '')
      const project = projects.find(p => p.title.toLowerCase().includes(projectName))
      if (project) {
        setTimeout(() => {
          setLines(prev => [...prev,
            '',
            `  Project: ${project.title}`,
            `  Status: ${project.status}`,
            `  Progress: ${project.progress}%`,
            `  Description: ${project.description}`,
            `  Technologies: ${project.tech.join(', ')}`,
            '',
          ])
          setInput('')
        }, 100)
        return
      } else {
        setTimeout(() => {
          setLines(prev => [...prev, `  Project "${projectName}" not found.`, ''])
          soundEngine.error()
          setInput('')
        }, 100)
        return
      }
    }
    
    setTimeout(() => {
      if (command === 'clear') {
        setLines([])
      } else if (responses[command]) {
        responses[command].forEach((line, i) => {
          setTimeout(() => {
            setLines(prev => [...prev, line])
            soundEngine.type()
          }, i * 20)
        })
      } else if (command === '') {
        // Do nothing for empty command
      } else {
        soundEngine.error()
        setLines(prev => [...prev, `  Command not found: ${cmd}`, '  Type "help" for available commands.', ''])
      }
    }, 50)
    
    setInput('')
  }
  
  return (
    <div className="min-h-screen bg-zinc-950 text-emerald-400 font-mono">
      {showKiganOS && <KiganOS onClose={() => setShowKiganOS(false)} />}
      
      {/* Boot Screen */}
      {!bootComplete && (
        <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-3xl">
            <div className="min-h-[60vh] max-h-[70vh] overflow-hidden text-xs sm:text-sm">
              {bootLines.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap break-all leading-relaxed">
                  {line.startsWith('[') ? (
                    <>
                      <span className="text-emerald-500">{line.slice(0, 14)}</span>
                      <span className="text-emerald-400">{line.slice(14)}</span>
                    </>
                  ) : line.includes('╔') || line.includes('║') || line.includes('╚') ? (
                    <span className="text-amber-400">{line}</span>
                  ) : line.includes('Welcome') ? (
                    <span className="text-white">{line}</span>
                  ) : (
                    line
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 h-1 rounded-full overflow-hidden bg-zinc-800">
              <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${bootProgress}%` }} />
            </div>
          </div>
        </div>
      )}
      
      {/* Terminal */}
      {bootComplete && (
        <div 
          className="min-h-screen flex flex-col cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title Bar */}
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border-b border-zinc-800">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="flex-1 text-center text-sm text-zinc-400">kigan@portfolio: ~</span>
            <TerminalIcon className="w-4 h-4 text-zinc-400" />
            <a href="/" className="p-1 rounded hover:bg-zinc-800 text-zinc-400 ml-2" title="Back to Portfolio">
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          
          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="flex-1 p-4 overflow-y-auto text-sm leading-relaxed"
          >
            {lines.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap break-words mb-0.5" dangerouslySetInnerHTML={{ __html: line }} />
            ))}
            <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />
          </div>
          
          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/50 border-t-2 border-emerald-500/30">
            <span className="text-emerald-400 font-bold">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleCommand(input)
                }
              }}
              autoFocus
              placeholder='Type "help" for commands...'
              className="flex-1 bg-transparent outline-none text-emerald-300 placeholder-emerald-400/40"
            />
            <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">Enter</span>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.3); border-radius: 4px; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  )
}
