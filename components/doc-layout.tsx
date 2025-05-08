import type { ReactNode } from "react"

import { DocSidebar } from "./doc-sidebar"

interface DocLayoutProps {
  children: ReactNode
}

export function DocLayout({ children }: DocLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 py-12">
        <div className="lg:w-64 shrink-0">
          <DocSidebar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
