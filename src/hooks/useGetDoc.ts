'use client';
import getDoc from "@/services/readDoc"
import { useQuery } from "@tanstack/react-query"

export const useGetDocuments = () =>{
    const {data, isPending,error} = useQuery({
        queryKey: ["Documents"],
        queryFn: getDoc
    })

    return {
        data, isPending,error
    }
}