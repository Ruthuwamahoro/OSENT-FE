"use client";
import "./globals.css";
import { Provider } from "../utils/Provider";
import { ReactNode } from "react";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/Sidebar";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children }: {children: ReactNode}) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", geist.variable)}
    >
      <body className="min-h-full flex">
        <Provider>
          <Sidebar />
          <main className="flex-1 min-w-0 px-6">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
