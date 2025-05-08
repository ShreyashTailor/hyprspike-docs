import { DocLayout } from "@/components/doc-layout"
import { HeroSection } from "@/components/hero-section"
import { InstallationGuide } from "@/components/installation-guide"
import { ThemesSection } from "@/components/themes-section"
import { ArchInstallSection } from "@/components/arch-install-section"
import Conclusion from "@/components/conclusion"


export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <HeroSection />
      <DocLayout>
        <InstallationGuide />
        <ArchInstallSection />
        <ThemesSection />
        <Conclusion />
      
      </DocLayout>
    </main>
  )
}
