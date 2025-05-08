import { CodeBlock } from "./ui/code-block"

export function InstallationGuide() {
  return (
    <section id="installation" className="pb-16">
      <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Quick Installation (Dotfiles)</h2>
      
      <div className="space-y-8">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Dot files</h3>
          <p className="text-zinc-300 mb-4">Below is the link to dot files if you know the drill...</p>
          <ul className="list-disc list-inside text-zinc-30r0 space-y-2">
            <li><a href="https://github.com/randomboi404/HyprSpike" target="_blank">Click here</a></li>
          </ul>
        </div>
        </div><br></br>

        <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Installation for Beginners</h2>
      <div className="space-y-8">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Prerequisites</h3>
          <p className="text-zinc-300 mb-4">Before installing HyprSpike, ensure you have the following:</p>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li>Arch Linux (or Arch-based distribution)</li>
            <li>Hyprland installed and working</li>
            <li>Internet Access</li>
            <li>Hates Windows</li>
            <li>Have Brain and Common Sense</li>
         </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Installation</h3>
          <p className="text-zinc-300 mb-4">Just clone the repository and then paste the .config and .local into your directory and restart. It should work.</p>

        </div>

       {/* <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Install</h3>
          <p className="text-zinc-300 mb-4">Run the following command to install HyprSpike:</p>
          <CodeBlock code="curl -sSL https://github.com/randomboi404/HyprSpike | bash" language="bash" />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Manual Installation</h3>
          <p className="text-zinc-300 mb-4">If you prefer to install manually:</p>
          <CodeBlock
            code={`# Clone the repository
git clone https://github.com/randomboi404/HyprSpike/hyprspike.git
cd HyprSpike

# Run the installation script
./install.sh`}
            language="bash"
          />
        </div>*/}

        <div className="rounded-lg border border-amber-800/50 bg-amber-950/20 p-6">
          <h3 className="text-xl font-semibold text-amber-300 mb-2">Note</h3>
          <p className="text-zinc-300">
            The installation script will (COME VERY SOON) and will create a backup of your existing Hyprland configuration. You can revert to your
            original setup at any time using the restore script.
          </p>
        </div>
      </div>
    </section>
  )
}
