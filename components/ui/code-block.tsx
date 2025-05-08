"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface CodeBlockProps {
  code: string
  language: string
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    try {
      // Create a temporary textarea element
      const textarea = document.createElement('textarea')
      textarea.value = code
      textarea.style.position = 'fixed'  // Prevent scrolling to bottom
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      
      // Execute copy command
      const successful = document.execCommand('copy')
      
      // Clean up
      document.body.removeChild(textarea)
      
      if (successful) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="absolute right-2 top-2">
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-md bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-400 hover:text-zinc-300 transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <pre className="p-4 bg-zinc-950 rounded-lg overflow-x-auto text-sm">
        <code className={`language-${language} text-zinc-300`}>{code}</code>
      </pre>
    </div>
  )
}
