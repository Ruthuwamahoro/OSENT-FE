"use client";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export function Provider({children}: {children: ReactNode}){
    const [queryClient] = useState(() => new QueryClient);
    return(
        // <SessionProvider>
            <QueryClientProvider client = {queryClient}>
                {children}
            </QueryClientProvider>
        // </SessionProvider>
    )
}