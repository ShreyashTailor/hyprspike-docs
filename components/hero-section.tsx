import { Github } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-violet-950/70 to-zinc-950 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            <span className="text-violet-400">Hypr</span>Spike
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-300">
            Elevate your Arch Linux experience with beautiful Hyprland setups that are both stunning and functional. No
            coding expertise required.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button className="bg-violet-600 hover:bg-violet-500">Get Started</Button>
            <Link
              href="https://github.com/randomboi404/HyprSpike" target="_blank"
              className="flex items-center gap-2 text-sm font-semibold leading-6 text-white"
            >
              <Github className="h-5 w-5" />
              GitHub <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
