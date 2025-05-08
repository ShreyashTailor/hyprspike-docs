
import { CodeBlock } from "./ui/code-block"

export function ArchInstallSection() {
  return (
    <section id="arch-install" className="p b-16">
      <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Arch Linux Installation</h2>

      <p className="text-zinc-300 mb-8">
        New to Arch Linux? This section provides essential scripts and commands to help you get started with a proper
        Arch installation before setting up HyprSpike. These scripts are designed to simplify the installation process
        for beginners.
      </p>

      <div className="space-y-12">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-4">Getting Started</h3>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">1. Connect to the Internet</h4>
            <p className="text-zinc-300 mb-4">
              First, you'll need to connect to the internet. Here are some common commands:
            </p>

            <h5 className="text-md font-semibold text-violet-400 mt-6 mb-2">For Wi-Fi:</h5>
            <CodeBlock
              code={`# List available network interfaces
ip link

# Bring up the wireless interface (usually wlan0)
ip link set wlan0 up

# Scan for available networks
iwctl station wlan0 scan
iwctl station wlan0 get-networks

# Connect to a network
iwctl station wlan0 connect "Your_Network_Name"
# You'll be prompted for the password

# Verify connection
ping -c 3 archlinux.org`}
              language="bash"
            />

            <h5 className="text-md font-semibold text-violet-400 mt-6 mb-2">For Ethernet:</h5>
            <CodeBlock
              code={`# Ethernet usually connects automatically
# Verify connection
ping -c 3 archlinux.org`}
              language="bash"
            />
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">2. Install Git and Clone HyprSpike</h4>
            <p className="text-zinc-300 mb-4">Next, install Git and clone the HyprSpike repository:</p>

            <CodeBlock
              code={`# Update package database
pacman -Syy

# Install git
pacman -S git

# Clone the HyprSpike repository
git clone https://github.com/HyprSpike/hyprspike.git

# Navigate to the installation scripts
cd HyprSpike/Scripts`}
              language="bash"
            />
          </div>
        </div>




        <div>
          <h3 className="text-2xl font-semibold text-white mb-4">BTRFS Partitioning Script</h3>

          <p className="text-zinc-300 mb-4">
            This script helps you set up a BTRFS filesystem with optimized subvolumes for your Arch Linux installation.
            Save this as <code className="bg-zinc-800 px-1 py-0.5 rounded">btrfs-partitioning.sh</code> and make it
            executable with <code className="bg-zinc-800 px-1 py-0.5 rounded">chmod +x btrfs-partitioning.sh</code>.
          </p>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h4 className="text-lg font-semibold text-white">btrfs-partitioning.sh</h4>
                <p className="text-zinc-400 mt-1">Sets up BTRFS with optimized subvolumes for Arch Linux</p>
              </div>
                
            </div>

            <CodeBlock
              code={`#!/usr/bin/env bash
set -euo pipefail

# Ensure script is run as root
if [[ $EUID -ne 0 ]]; then
  echo "This script must be run as root."
  exit 1
fi

BASE_DEV="/dev/nvme0n1"
# Detect partitions
parts=( $(ls \${BASE_DEV}p* 2>/dev/null) )
if [[ \${#parts[@]} -eq 0 ]]; then
  echo "No partitions detected on \${BASE_DEV}."
  exit 1
fi

echo "Available partitions on \${BASE_DEV}:"
for p in "\${parts[@]}"; do
  num=\${p##*p}
  echo "  $num -> $p"
done

# Prompt for root btrfs partition
read -rp "Enter partition number to format as Btrfs (e.g., 5 for nvme0n1p5): " sel
TARGET="\${BASE_DEV}p\${sel}"
if [[ ! -b \$TARGET ]]; then
  echo "Partition \$TARGET does not exist."
  exit 1
fi

echo "Formatting \$TARGET as Btrfs..."
mkfs.btrfs -f "\$TARGET"

echo "Mounting \$TARGET to /mnt..."
mount "\$TARGET" /mnt

# Create subvolumes
echo "Creating subvolumes..."
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
btrfs subvolume create /mnt/@log
btrfs subvolume create /mnt/@cache

# Unmount and remount with options
umount /mnt

MOUNT_OPTS="ssd,noatime,compress=zstd,space_cache=v2,discard=async"
echo "Mounting @ subvolume..."
mount -o \${MOUNT_OPTS},subvol=@ "\$TARGET" /mnt

# Create mount points
echo "Creating directories for subvolumes and EFI mount..."
mkdir -p /mnt/{boot/efi,home,var/log,var/cache}

# Mount other subvolumes
echo "Mounting @home subvolume..."
mount -o \${MOUNT_OPTS},subvol=@home "\$TARGET" /mnt/home

echo "Mounting @log subvolume..."
mount -o \${MOUNT_OPTS},subvol=@log "\$TARGET" /mnt/var/log

echo "Mounting @cache subvolume..."
mount -o \${MOUNT_OPTS},subvol=@cache "\$TARGET" /mnt/var/cache

# Mount EFI partition
echo
read -rp "Enter EFI partition (e.g., /dev/nvme0n1p1): " EFI_PART
if [[ ! -b \$EFI_PART ]]; then
  echo "EFI partition \$EFI_PART does not exist."
  exit 1
fi

echo "Mounting EFI partition to /mnt/boot/efi..."
mount "\$EFI_PART" /mnt/boot/efi

echo "All done! Subvolumes created and mounted under /mnt."`}
              language="bash"
            />
          </div>
          

          <div className="mt-8 space-y-4">
            <h4 className="text-lg font-semibold text-white">How to Use the BTRFS Script</h4>

            <ol className="list-decimal list-inside text-zinc-300 space-y-2 ml-4">
              <li>
                First, create your partitions using <code className="bg-zinc-800 px-1 py-0.5 rounded">fdisk</code>,{" "}
                <code className="bg-zinc-800 px-1 py-0.5 rounded">cfdisk</code>, or{" "}
                <code className="bg-zinc-800 px-1 py-0.5 rounded">gdisk</code>
              </li>
              <li>
                Make sure you have at least:
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>An EFI partition (usually 300-500MB, 512MB or 1GB recommended for multiple boot)</li>
                  <li>A root partition (16GB+ recommended)</li>
                </ul>
              </li>
              <li>
                Run the script: <code className="bg-zinc-800 px-1 py-0.5 rounded">./btrfs-partitioning.sh</code>
              </li>
              <li>Follow the prompts to select your root partition and EFI partition</li>
              <li>
                Once complete, you can proceed with the Arch installation using{" "}
                <code className="bg-zinc-800 px-1 py-0.5 rounded">pacstrap</code>
              </li>
            </ol>
          </div>

          <div className="mt-8 rounded-lg border border-amber-800/50 bg-amber-950/20 p-6">
            <h4 className="text-lg font-semibold text-amber-300 mb-2">Note for Beginners</h4>
            <p className="text-zinc-300">
              This script is designed to simplify the BTRFS setup process, but you should still familiarize yourself
              with the
              <a
                href="https://wiki.archlinux.org/title/Installation_guide"
                className="text-violet-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Arch Linux Installation Guide
              </a>
              . After running this script, you'll need to continue with the installation process (pacstrap, generating
              fstab, chroot, etc.).
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-white mb-4">Next Steps</h3>

          <p className="text-zinc-300 mb-4">
            After partitioning and setting up your filesystems, continue with the standard Arch installation (Assuming everything is correctly mounted at /mnt):
          </p>

          <p className="text-zinc-300 mt-4">
            Install base packages </p>
          <CodeBlock
            code={`
# pacstrap /mnt base base-devel linux linux-firmware vim
`}language="bash"
          />

<p className="text-zinc-300 mt-4">
  Generate fstab </p>

          <CodeBlock
          code={`
# genfstab -U /mnt >> /mnt/etc/fstab `}language="bash" />

<p className="text-zinc-300 mt-4">
  Chroot into new system </p>
<CodeBlock code={`arch-chroot /mnt`}language="bash"/>

<p className="text-zinc-300 mt-4">
Continue with system configuration (timezone, locale, etc.) </p>
<CodeBlock code={`ln -sf /usr/share/zoneinfo/Region/City /etc/localtime
# hwclock --systohc`}language="bash"/>

<p className="text-zinc-300 mt-4">
Localization </p>
<CodeBlock code={`locale-gen
# echo "LANG=en_US.UTF-8" | sudo tee /etc/locale.conf > /dev/null`}language="bash"/>

<p className="text-zinc-300 mt-4">
Optional) If you want the console keyboard layout, </p>
<CodeBlock code={`"# echo "KEYMAP=de-latin1" | sudo tee /etc/vconsole.conf > /dev/null`}language="bash"/>

<p className="text-zinc-300 mt-4">
Network Configuration, </p>
<h5 className="text-zinc-300 mt-4"> Replace 'arch' with your hostname</h5>
<CodeBlock code={`# echo "arch" | sudo tee /etc/hostname > /dev/null`}language="bash"/>

<p className="text-zinc-300 mt-4">
Not really required but recommended to create a new initramfs </p>
<CodeBlock code={`# mkinitcpio -P`}language="bash"/>

<p className="text-zinc-300 mt-4">
Set root password </p>
<CodeBlock code={`# passwd`}language="bash"/>


<p className="text-zinc-300 mt-4">
Install an AUR Helper of your choice (We'll use paru for now) (Optional but required for pkgs like btrfs-assistant</p>
<CodeBlock code={`# pacman -Syu --needed git base base-devel
# git clone https://aur.archlinux.org/paru.git
# cd paru
# makepkg -si --noconfirm`}language="bash"/>

<p className="text-zinc-300 mt-4">
Install sudo </p>
<CodeBlock code={`# pacman -S sudo"`}language="bash"/>

<p className="text-zinc-300 mt-4">
Create a new user with sudo access</p>

<CodeBlock
code={`
# sudo useradd -m -G wheel -s /bin/bash username
# passwd username
`}
language="bash" />

<p className="text-zinc-300 mt-4">Allow user to use sudo</p>

<CodeBlock
code={`
  # sudo EDITOR=vim visudo
  `}
language="bash" />

<p className="text-zinc-300 mt-4">Now scroll down and uncomment the line: </p>

<CodeBlock
code={`
  %wheel ALL=(ALL:ALL) ALL
  `}
language="bash" />

<p className="text-zinc-300 mt-4">Install various BTRFS packages (Only required if you chose BTRFS filesystem)</p>

<CodeBlock
code={`
# su username
$ paru -Syu --needed btrfs-assistant snapper snap-pac
`}
language="bash" />

<p className="text-zinc-300 mt-4">Install additional packages as per your need, an example is listed below</p>

<CodeBlock
code={`
# pacman -Syu sof-firmware networkmanager auto-cpufreq amd-ucode pipewire bluez bluez-utils blueman --needed
`}
language="bash" />

<p className="text-zinc-300 mt-4">Install NVIDIA Drivers if you have Nvidia (PRO Tip: Nvidia really hates Linux :D)</p>

<CodeBlock
code={`
# pacman -S nvidia-open
`}
language="bash"/>

<p className="text-zinc-300 mt-4">For detailed instructions, refer to <u><a href="https://wiki.archlinux.org/title/NVIDIA" target="_blank">Arch Wiki</a></u>.</p>

<p className="text-zinc-300 mt-4">Enable important systemd services, an example is given below</p>

<CodeBlock
code={`
  # systemctl enable NetworkManager.service
  # systemctl enable bluetooth.service
  # systemctl enable snapper-timeline.timer
  # systemctl enable snapper-cleanup.timer
  `}
language="bash" />

<p className="text-zinc-300 mt-4">Install a bootloader of your choice. For detailed instructions, refer to <u><a href="https://wiki.archlinux.org/title/Category:Boot_loaders" target="_blank">Arch Wiki</a></u>.</p><br></br>

<h3 className="text-2xl font-semibold text-white mb-4">Alternatively, you can install arch via:</h3>

<CodeBlock
            code={`archinstall`}
            language="bash"
          />
<p className="text-zinc-300 mt-4">For instructions, refer the <u><a href="https://wiki.archlinux.org/title/Archinstall" target="_blank">Arch Wiki</a></u>.</p>

          <p className="text-zinc-300 mt-4">
            After completing your base Arch installation, return to the{" "}
            <a href="#installation" className="text-violet-400 hover:underline">
              HyprSpike Installation
            </a>{" "}
            section to set up your customized Hyprland environment.
            
          </p><br></br>
        </div>
      </div>
    </section>
  )
}
