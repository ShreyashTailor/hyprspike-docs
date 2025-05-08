"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Code, Home, Palette, Settings, Terminal } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { icon: Home, label: "Overview", href: "#overview" },
  { icon: Settings, label: "Installation", href: "#installation" },
  { icon: Terminal, label: "Arch Install", href: "#arch-install" },
  { icon: Palette, label: "Preview", href: "#preview" },
  { icon: Code, label: "Conclusion", href: "#conclusion" },
]

export function DocSidebar() {
  const [activeSection, setActiveSection] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")

      let currentActiveSection = ""
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        if (sectionTop < 100) {
          currentActiveSection = `#${section.id}`
        }
      })

      setActiveSection(currentActiveSection)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="sticky top-6">
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          className="w-full flex items-center justify-between bg-zinc-900 border-zinc-800 text-zinc-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          Navigation
          <ChevronDown className={cn("h-4 w-4 transition-transform", isMobileMenuOpen && "rotate-180")} />
        </Button>
      </div>

      <nav className={cn("space-y-1", !isMobileMenuOpen && "hidden lg:block")}>
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              activeSection === item.href
                ? "bg-violet-900/50 text-violet-300"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100",
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
