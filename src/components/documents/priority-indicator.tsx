export type DocumentPriority = "low" | "medium" | "high" | "urgent"

const STYLES: Record<DocumentPriority, { label: string; dot: string }> = {
  low: { label: "Low", dot: "bg-[#8B8F98]" },
  medium: { label: "Medium", dot: "bg-[#6C7BD1]" },
  high: { label: "High", dot: "bg-[#C97A2B]" },
  urgent: { label: "Urgent", dot: "bg-[#C4453D]" },
}

export function PriorityIndicator({
  priority,
}: {
  priority: DocumentPriority
}) {
  const style = STYLES[priority]

  // Falls back instead of crashing when the API returns a priority value
  // that isn't one of the four above — log it so you can add it to STYLES.
  if (!style) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`PriorityIndicator: unrecognized priority "${priority}"`)
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-[#4C4F55]">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#8B8F98]" />
        {priority || "Unknown"}
      </span>
    )
  }

  const { label, dot } = style
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-[#4C4F55]">
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
      {label}
    </span>
  )
}