// "use client"

// import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table"
// import {
//   ChevronLeft,
//   ChevronRight,
//   Filter,
//   Plus,
//   SlidersHorizontal,
// } from "lucide-react"

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// import { features, type DataTableFeatures } from "@/utils/data-table-features"
// import { cn } from "@/lib/utils"
// import { Dropdown } from "../dropdown"

// interface DataTableProps<TData extends RowData> {
//   columns: ColumnDef<DataTableFeatures, TData>[]
//   data: TData[]
//   isLoading?: boolean
//   onNewDocument?: () => void
// }

// const STATUS_OPTIONS = [
//   { value: "draft", label: "Draft" },
//   { value: "pending", label: "Pending" },
//   { value: "in_review", label: "In review" },
//   { value: "approved", label: "Approved" },
//   { value: "rejected", label: "Rejected" },
// ]

// export function DataTable<TData extends RowData>({
//   columns,
//   data,
//   isLoading = false,
//   onNewDocument,
// }: DataTableProps<TData>) {
//   const table = useTable({
//     features,
//     data: data ?? [],
//     columns,
//   })

//   const rows = table.getRowModel().rows
//   const selectedCount = table.getSelectedRowModel().rows.length
//   const totalRows = table.getFilteredRowModel().rows.length
//   const pageIndex = table.state.pagination.pageIndex  
//   const pageCount = Math.max(table.getPageCount(), 1)

//   return (
//     <div className="rounded-lg border border-[#E3DFD5] bg-white">
//       {/* Toolbar */}
//       <div className="flex flex-wrap items-center gap-2 border-b border-[#E3DFD5] px-4 py-3">
//         <div className="flex items-center gap-2 rounded-md border border-[#E3DFD5] px-2.5 py-1.5 text-sm text-[#6B6F76] focus-within:border-[#A8801E]/60">
//           <input
//             type="text"
//             placeholder="Search documents"
//             onChange={(e) =>
//               table.getColumn("name")?.setFilterValue(e.target.value)
//             }
//             className="w-48 bg-transparent text-[#1B1D22] placeholder:text-[#6B6F76] focus:outline-none"
//           />
//         </div>

//         <Dropdown
//           trigger={
//             <button className="flex items-center gap-1.5 rounded-md border border-[#E3DFD5] px-2.5 py-1.5 text-sm text-[#4C4F55] transition-colors hover:bg-[#F8F6F1]">
//               <Filter className="h-3.5 w-3.5" />
//               Status
//             </button>
//           }
//         >
//           {STATUS_OPTIONS.map((opt) => (
//             <button
//               key={opt.value}
//               onClick={() =>
//                 table.getColumn("status")?.setFilterValue(opt.value)
//               }
//               className="flex w-full items-center rounded-sm px-2 py-1.5 text-left text-sm text-[#1B1D22] hover:bg-[#F1EDE3]"
//             >
//               {opt.label}
//             </button>
//           ))}
//           <div className="my-1 h-px bg-[#E3DFD5]" />
//           <button
//             onClick={() => table.getColumn("status")?.setFilterValue("")}
//             className="flex w-full items-center rounded-sm px-2 py-1.5 text-left text-sm text-[#6B6F76] hover:bg-[#F1EDE3]"
//           >
//             Clear filter
//           </button>
//         </Dropdown>

//         <Dropdown
//           trigger={
//             <button className="flex items-center gap-1.5 rounded-md border border-[#E3DFD5] px-2.5 py-1.5 text-sm text-[#4C4F55] transition-colors hover:bg-[#F8F6F1]">
//               <SlidersHorizontal className="h-3.5 w-3.5" />
//               Columns
//             </button>
//           }
//         >
//           {table
//             .getAllColumns()
//             .filter((column) => column.getCanHide())
//             .map((column) => (
//               <label
//                 key={column.id}
//                 className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm capitalize text-[#1B1D22] hover:bg-[#F1EDE3]"
//               >
//                 <input
//                   type="checkbox"
//                   className="h-3.5 w-3.5 accent-[#A8801E]"
//                   checked={column.getIsVisible()}
//                   onChange={column.getToggleVisibilityHandler()}
//                 />
//                 {column.id}
//               </label>
//             ))}
//         </Dropdown>

//         <div className="ml-auto flex items-center gap-3">
//           {selectedCount > 0 && (
//             <span className="text-sm text-[#6B6F76]">
//               {selectedCount} selected
//             </span>
//           )}
//           <button
//             onClick={onNewDocument}
//             className="flex items-center gap-1.5 rounded-md bg-[#1B1D22] px-3 py-1.5 text-sm font-medium text-[#FBF9F5] transition-colors hover:bg-[#2A2D33]"
//           >
//             <Plus className="h-3.5 w-3.5" />
//             New document
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead
//                     key={header.id}
//                     onClick={header.column.getToggleSortingHandler()}
//                     className={cn(
//                       "text-xs font-medium text-[#6B6F76]",
//                       header.column.getCanSort() &&
//                         "cursor-pointer select-none hover:text-[#1B1D22]"
//                     )}
//                   >
//                     <div className="flex items-center gap-1">
//                       {header.isPlaceholder ? null : (
//                         <table.FlexRender header={header} />
//                       )}
//                       {header.column.getIsSorted() === "asc" && (
//                         <span>↑</span>
//                       )}
//                       {header.column.getIsSorted() === "desc" && (
//                         <span>↓</span>
//                       )}
//                     </div>
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {isLoading ? (
//               Array.from({ length: 6 }).map((_, i) => (
//                 <TableRow key={i}>
//                   {columns.map((_, j) => (
//                     <TableCell key={j}>
//                       <div className="h-4 w-full max-w-[140px] animate-pulse rounded bg-[#F1EDE3]" />
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : rows.length ? (
//               rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                   className="hover:bg-[#FBF9F5]"
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       <table.FlexRender cell={cell} />
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-40 text-center"
//                 >
//                   <div className="flex flex-col items-center gap-1 text-sm">
//                     <span className="font-medium text-[#1B1D22]">
//                       No documents found
//                     </span>
//                     <span className="text-[#6B6F76]">
//                       Try adjusting your search or filters.
//                     </span>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Footer / pagination */}
//       <div className="flex items-center justify-between border-t border-[#E3DFD5] px-4 py-3 text-sm text-[#6B6F76]">
//         <span>
//           {totalRows} document{totalRows === 1 ? "" : "s"}
//         </span>
//         <div className="flex items-center gap-1">
//           <button
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//             className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-[#F1EDE3] disabled:opacity-40"
//             aria-label="Previous page"
//           >
//             <ChevronLeft className="h-4 w-4" />
//           </button>
//           <span className="px-1 text-xs">
//             Page {pageIndex + 1} of {pageCount}
//           </span>
//           <button
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//             className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-[#F1EDE3] disabled:opacity-40"
//             aria-label="Next page"
//           >
//             <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table"
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  FileSearch,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { features, type DataTableFeatures } from "@/utils/data-table-features"
import { cn } from "@/lib/utils"
import { Dropdown } from "../dropdown"

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
  isLoading?: boolean
  onNewDocument?: () => void
}

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "pending", label: "Pending" },
  { value: "in_review", label: "In review" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
]

// Realistic skeleton widths per column position, so the loading state
// reads like a table rather than a row of identical gray bars.
const SKELETON_WIDTHS = ["16px", "70%", "50%", "40%", "60%", "60%", "50%", "16px"]

export function DataTable<TData extends RowData>({
  columns,
  data,
  isLoading = false,
  onNewDocument,
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    data: data ?? [],
    columns,
  })

  const rows = table.getRowModel().rows
  const selectedCount = table.getSelectedRowModel().rows.length
  const totalRows = table.getFilteredRowModel().rows.length
  const pageIndex = table.state.pagination.pageIndex
  const pageSize = table.state.pagination.pageSize
  const pageCount = Math.max(table.getPageCount(), 1)

  const columnFilters = table.state.columnFilters ?? []
  const searchValue = (table.getColumn("name")?.getFilterValue() as string) ?? ""
  const statusFilter = columnFilters.find((f) => f.id === "status")?.value as
    | string
    | undefined
  const hasActiveFilters = columnFilters.length > 0

  function clearAllFilters() {
    table.getColumn("name")?.setFilterValue("")
    table.getColumn("status")?.setFilterValue("")
  }

  return (
    <div className="rounded-xl border border-[#E3DFD5] bg-white shadow-[0_1px_2px_rgba(27,29,34,0.04)]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E3DFD5] px-4 py-3">
        <div className="flex items-center gap-2 rounded-md border border-[#E3DFD5] px-2.5 py-1.5 text-sm text-[#6B6F76] transition-colors focus-within:border-[#A8801E]/60 focus-within:ring-2 focus-within:ring-[#A8801E]/10">
          <Search className="h-3.5 w-3.5 shrink-0" />
          <input
            type="text"
            value={searchValue}
            placeholder="Search documents"
            onChange={(e) =>
              table.getColumn("name")?.setFilterValue(e.target.value)
            }
            className="w-48 bg-transparent text-[#1B1D22] placeholder:text-[#6B6F76] focus:outline-none"
          />
        </div>

        <Dropdown
          trigger={
            <button
              className={cn(
                "flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm transition-colors",
                statusFilter
                  ? "border-[#A8801E]/40 bg-[#FBF3E3] text-[#8A6414]"
                  : "border-[#E3DFD5] text-[#4C4F55] hover:bg-[#F8F6F1]"
              )}
            >
              <Filter className="h-3.5 w-3.5" />
              Status
              {statusFilter && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#A8801E]" />
              )}
            </button>
          }
        >
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() =>
                table.getColumn("status")?.setFilterValue(opt.value)
              }
              className={cn(
                "flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm hover:bg-[#F1EDE3]",
                statusFilter === opt.value
                  ? "font-medium text-[#1B1D22]"
                  : "text-[#1B1D22]"
              )}
            >
              {opt.label}
              {statusFilter === opt.value && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#A8801E]" />
              )}
            </button>
          ))}
          <div className="my-1 h-px bg-[#E3DFD5]" />
          <button
            onClick={() => table.getColumn("status")?.setFilterValue("")}
            className="flex w-full items-center rounded-sm px-2 py-1.5 text-left text-sm text-[#6B6F76] hover:bg-[#F1EDE3]"
          >
            Clear status
          </button>
        </Dropdown>

        <Dropdown
          trigger={
            <button className="flex items-center gap-1.5 rounded-md border border-[#E3DFD5] px-2.5 py-1.5 text-sm text-[#4C4F55] transition-colors hover:bg-[#F8F6F1]">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Columns
            </button>
          }
        >
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => (
              <label
                key={column.id}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm capitalize text-[#1B1D22] hover:bg-[#F1EDE3]"
              >
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 accent-[#A8801E]"
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                />
                {column.id}
              </label>
            ))}
        </Dropdown>

        <div className="ml-auto flex items-center gap-3">
          {selectedCount > 0 && (
            <span className="text-sm text-[#6B6F76]">
              {selectedCount} selected
            </span>
          )}
          <button
            onClick={onNewDocument}
            className="flex items-center gap-1.5 rounded-md bg-[#1B1D22] px-3 py-1.5 text-sm font-medium text-[#FBF9F5] transition-colors hover:bg-[#2A2D33]"
          >
            <Plus className="h-3.5 w-3.5" />
            New document
          </button>
        </div>
      </div>

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E3DFD5] bg-[#FBF9F5] px-4 py-2">
          {searchValue && (
            <FilterChip
              label={`"${searchValue}"`}
              onRemove={() => table.getColumn("name")?.setFilterValue("")}
            />
          )}
          {statusFilter && (
            <FilterChip
              label={
                STATUS_OPTIONS.find((o) => o.value === statusFilter)?.label ??
                statusFilter
              }
              onRemove={() => table.getColumn("status")?.setFilterValue("")}
            />
          )}
          <button
            onClick={clearAllFilters}
            className="text-xs text-[#6B6F76] underline-offset-2 hover:text-[#1B1D22] hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Table */}
      <div className="max-h-[640px] overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={cn(
                      "text-xs font-medium text-[#6B6F76]",
                      header.column.getCanSort() &&
                        "cursor-pointer select-none hover:text-[#1B1D22]"
                    )}
                  >
                    <div className="flex items-center gap-1">
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                      {header.column.getCanSort() &&
                        (header.column.getIsSorted() === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ArrowDown className="h-3 w-3" />
                        ) : (
                          <ChevronsUpDown className="h-3 w-3 opacity-40" />
                        ))}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((_, j) => (
                    <TableCell key={j}>
                      <div
                        className="h-4 animate-pulse rounded bg-[#F1EDE3]"
                        style={{
                          width:
                            SKELETON_WIDTHS[j % SKELETON_WIDTHS.length],
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : rows.length ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "transition-colors hover:bg-[#FBF9F5]",
                    row.getIsSelected() && "bg-[#FBF3E3] hover:bg-[#FBF3E3]"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-56 text-center"
                >
                  <div className="flex flex-col items-center gap-2 text-sm">
                    <FileSearch className="h-8 w-8 text-[#C9C4B6]" />
                    <span className="font-medium text-[#1B1D22]">
                      {hasActiveFilters
                        ? "No documents match your filters"
                        : "No documents yet"}
                    </span>
                    <span className="text-[#6B6F76]">
                      {hasActiveFilters
                        ? "Try a different search term or status."
                        : "Documents you create will show up here."}
                    </span>
                    {hasActiveFilters && (
                      <button
                        onClick={clearAllFilters}
                        className="mt-1 text-sm font-medium text-[#A8801E] hover:underline"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer / pagination */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E3DFD5] px-4 py-3 text-sm text-[#6B6F76]">
        <span>
          {totalRows} document{totalRows === 1 ? "" : "s"}
        </span>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1.5 text-xs">
            Rows per page
            <select
              value={pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="rounded-md border border-[#E3DFD5] bg-white px-1.5 py-1 text-xs text-[#1B1D22] focus:outline-none focus:ring-2 focus:ring-[#A8801E]/10"
            >
              {[10, 25, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-center gap-1">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-[#F1EDE3] disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-1 text-xs">
              Page {pageIndex + 1} of {pageCount}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-[#F1EDE3] disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string
  onRemove: () => void
}) {
  return (
    <span className="flex items-center gap-1 rounded-full border border-[#E3DFD5] bg-white py-0.5 pl-2.5 pr-1 text-xs text-[#4C4F55]">
      {label}
      <button
        onClick={onRemove}
        className="flex h-4 w-4 items-center justify-center rounded-full text-[#6B6F76] transition-colors hover:bg-[#F1EDE3] hover:text-[#1B1D22]"
        aria-label={`Remove filter ${label}`}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  )
}