import { Button } from "@/components/ui/button"
import { CodeBlock } from "./ui/code-block"

export function ThemesSection() {
  return (
    <section id="preview" className="pb-16">
      <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Preview</h2>

      <p className="text-zinc-300 mb-8">
        Here is the preview of the HyprSpike with some OP wallpapers ;)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        
        {themes.map((theme) => (
          <div key={theme.name} className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <div className="aspect-video relative">
             
             <img
  src={theme.image}
  alt={`${theme.name} preview`}
  className="absolute inset-0 w-full h-full object-cover"
/>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white">{theme.name}</h3>
              <p className="text-zinc-400 mt-1">{theme.description}</p>
              <div className="mt-4 flex gap-2">
     
              </div>
            </div>
          </div>
        ))}
      </div>

     
    </section>
  )
}

const themes = [
  {
    name: "Preview #1",
    description: "Fastfetch, Cava and Pipes.sh",
    image: "/themes/1.png"
  },
  {
    name: "Preview #2",
    description: "LibreWolf and Mtab",
    image: "/themes/2.png"
  },
  {
    name: "Preview #3",
    description: "Asciiquarium and Cmatrix",
    image: "/themes/3.png"
  },
  {
    name: "Preview #4",
    description: "Cowsay, lolcat, Cmatrix and toilet",
    image: "/themes/4.png"
  },
]
