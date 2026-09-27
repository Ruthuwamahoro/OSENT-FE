export type DocumentStatus =
  | "draft"
  | "pending"
  | "in_review"
  | "approved"
  | "rejected"

const STYLES: Record<DocumentStatus, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-[#EEF0F2] text-[#53575E]" },
  pending: { label: "Pending", className: "bg-[#FDF3DC] text-[#92650B]" },
  in_review: { label: "In review", className: "bg-[#E8EEFC] text-[#2D4A9E]" },
  approved: { label: "Approved", className: "bg-[#E7F5EC] text-[#1F7A43]" },
  rejected: { label: "Rejected", className: "bg-[#FBEAEA] text-[#B42318]" },
}

export function StatusBadge({ status }: { status: DocumentStatus }) {
  const style = STYLES[status]

  // Falls back instead of crashing when the API returns a status value
  // that isn't one of the five above — log it so you can add it to STYLES.
  if (!style) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`StatusBadge: unrecognized status "${status}"`)
    }
    return (
      <span className="inline-flex items-center rounded-full bg-[#EEF0F2] px-2 py-0.5 text-xs font-medium text-[#53575E]">
        {status || "Unknown"}
      </span>
    )
  }

  const { label, className } = style
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  )
}