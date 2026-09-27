"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

// A small, dependency-free dropdown used for filters, column visibility,
// and row actions. Closes on outside click and on selection.
export function Dropdown({
  trigger,
  children,
  align = "start",
  className,
}: {
  trigger: ReactNode
  children: ReactNode
  align?: "start" | "end"
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div
          className={cn(
            "absolute z-20 mt-1.5 min-w-[180px] rounded-md border border-[#E3DFD5] bg-white p-1 shadow-[0_8px_24px_rgba(27,29,34,0.08)]",
            align === "end" ? "right-0" : "left-0",
            className
          )}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  )
}