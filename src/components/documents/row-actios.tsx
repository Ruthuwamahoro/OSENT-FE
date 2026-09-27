"use client"

import { MoreHorizontal, Eye, Pencil, Download, Trash2 } from "lucide-react"
import type { Document } from "./columns"
import { Dropdown } from "../dropdown"

export function RowActions({ document }: { document: Document }) {
  return (
    <Dropdown
      align="end"
      trigger={
        <button
          className="flex h-7 w-7 items-center justify-center rounded-md text-[#6B6F76] transition-colors hover:bg-[#F1EDE3] hover:text-[#1B1D22]"
          aria-label={`Actions for ${document.name}`}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      }
    >
      <MenuItem icon={Eye} label="View" />
      <MenuItem icon={Pencil} label="Edit" />
      <MenuItem icon={Download} label="Download" />
      <div className="my-1 h-px bg-[#E3DFD5]" />
      <MenuItem icon={Trash2} label="Delete" tone="danger" />
    </Dropdown>
  )
}

function MenuItem({
  icon: Icon,
  label,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  tone?: "default" | "danger"
}) {
  return (
    <button
      className={`flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm transition-colors hover:bg-[#F1EDE3] ${
        tone === "danger" ? "text-[#B42318]" : "text-[#1B1D22]"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  )
}