"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { FileText } from "lucide-react"

import { type DataTableFeatures } from "@/utils/data-table-features"
import { cn } from "@/lib/utils"

import { StatusBadge, type DocumentStatus } from "./status-badge"
import { RowActions } from "./row-actios"
import { PriorityIndicator, type DocumentPriority } from "./priority-indicator"

export type Document = {
  id: string
  name: string
  category: string
  document_number: string
  document_type: string
  issue_date: string // ISO date
  deadline: string // ISO date
  priority: DocumentPriority
  status: DocumentStatus
  owner: { name: string; initials: string }
}

const columnHelper = createColumnHelper<DataTableFeatures, Document>()

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatDeadline(iso: string) {
  const due = new Date(iso)
  const now = new Date()
  const days = Math.round((due.getTime() - now.getTime()) / 86_400_000)

  if (days < 0) {
    return { label: `Overdue ${Math.abs(days)}d`, tone: "overdue" as const }
  }
  if (days === 0) {
    return { label: "Due today", tone: "soon" as const }
  }
  if (days <= 3) {
    return { label: `Due in ${days}d`, tone: "soon" as const }
  }
  return { label: formatDate(iso), tone: "normal" as const }
}

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    enableHiding: false,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-[#C9C4B6] accent-[#A8801E]"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        aria-label="Select all documents"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-[#C9C4B6] accent-[#A8801E]"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        aria-label={`Select ${row.original.name}`}
      />
    ),
  }),
  columnHelper.accessor("document_type", {
    id: "document_type",
    header: "Document",
  }),
  columnHelper.accessor("document_number", {
    id: "document_number",
    header: "Number",
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: "Status",
    filterFn: "includesString",
    cell: ({ getValue }) => <StatusBadge status={getValue()} />,
  }),
  columnHelper.accessor("priority", {
    id: "priority",
    header: "Priority",
    cell: ({ getValue }) => <PriorityIndicator priority={getValue()} />,
  }),
  columnHelper.accessor("issue_date", {
    id: "issue_date",
    header: "Issued",
    cell: ({ getValue }) => (
      <span className="text-sm text-[#4C4F55]">{formatDate(getValue())}</span>
    ),
  }),
  columnHelper.accessor("deadline", {
    id: "deadline",
    header: "Deadline",
    cell: ({ getValue }) => {
      const { label, tone } = formatDeadline(getValue())
      return (
        <span
          className={cn(
            "text-sm",
            tone === "overdue" && "font-medium text-[#B42318]",
            tone === "soon" && "font-medium text-[#92650B]",
            tone === "normal" && "text-[#4C4F55]"
          )}
        >
          {label}
        </span>
      )
    },
  }),
  columnHelper.accessor("owner", {
    id: "owner",
    header: "Owner",
    cell: ({ getValue }) => {
      const owner = getValue()
      return (
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1B1D22] text-[10px] font-medium text-[#FBF9F5]">
            {/* {owner.initials} */}
            Ruth UWAMAHORO
          </span>
          <span className="truncate text-sm text-[#4C4F55]">
          Ruth UWAMAHORO
          </span>
        </div>
      )
    },
  }),
  columnHelper.display({
    id: "actions",
    enableHiding: false,
    header: "",
    cell: ({ row }) => <RowActions document={row.original} />,
  }),
])