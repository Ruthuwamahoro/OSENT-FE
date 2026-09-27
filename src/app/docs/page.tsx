"use client"
import { columns } from "@/components/documents/columns"
import { DataTable } from "@/components/documents/documentsTable"
import { useGetDocuments } from "@/hooks/useGetDoc"

export default function Documents() {
  const { data: response, isPending } = useGetDocuments()
  const documents = Array.isArray(response)
  ? response
  : (response as { data?: unknown[] })?.data ??
    (response as { documents?: unknown[] })?.documents ??
    []
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-xl font-semibold text-[#1B1D22]">
        Documents
      </h1>
      <DataTable columns={columns} data={documents} isLoading={isPending} />
    </div>
  )
}