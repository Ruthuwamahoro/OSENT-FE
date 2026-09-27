"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutGrid,
  FileText,
  CheckSquare,
  Users,
  Settings,
  Search,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  ListTodo,
  UsersRound,
  Truck,
  ShoppingCart,
  ShoppingBag,
  Package,
  ClipboardList,
  Wallet,
  Store,
  Network,
  MessageSquare,
  Activity
} from "lucide-react"

import { cn } from "@/lib/utils"

// Swap this config for real routes/data once wired to your app.
type NavItem = {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
    count?: number
  }
  
  type NavGroup = {
    label: string
    items: NavItem[]
  }
  
  const NAV_GROUPS: NavGroup[] = [
    {
      label: "Workspace",
      items: [
        {
          label: "Overview",
          href: "/",
          icon: LayoutGrid,
        },
        {
          label: "Tasks",
          href: "/tasks",
          icon: ListTodo,
          count: 8,
        },
        {
          label: "Approvals",
          href: "/approvals",
          icon: CheckSquare,
          count: 3,
        },
        {
          label: "Team",
          href: "/team",
          icon: Users,
        },
      ],
    },
  
    {
      label: "Business",
      items: [
        {
          label: "Customers",
          href: "/business/customers",
          icon: UsersRound,
        },
        {
          label: "Suppliers",
          href: "/business/suppliers",
          icon: Truck,
        },
        {
          label: "Sales",
          href: "/sales",
          icon: ShoppingCart,
        },
        {
          label: "Purchases",
          href: "/purchases",
          icon: ShoppingBag,
        },
        {
          label: "Activity",
          href: "/business/activity",
          icon: Activity
        }
      ],
    },
  
    {
      label: "Operations",
      items: [
        {
          label: "Inventory",
          href: "/inventory",
          icon: Package,
        },
        {
          label: "Procurement",
          href: "/procurement",
          icon: ClipboardList,
        },
        {
          label: "Documents",
          href: "/documents",
          icon: FileText,
          count: 12,
        },
        {
          label: "Finance",
          href: "/finance",
          icon: Wallet,
        },
      ],
    },
  
    {
      label: "Network",
      items: [
        {
          label: "Business",
          href: "/business",
          icon: Store,
        },
        {
          label: "Marketplace",
          href: "/marketplace/products",
          icon: Store,
        },
        {
          label: "Business Network",
          href: "/business/connections",
          icon: Network,
        },
        {
          label: "Messages",
          href: "/business/messages",
          icon: MessageSquare,
          count: 5,
        },
      ],
    },
  
    {
      label: "General",
      items: [
        {
          label: "Settings",
          href: "/settings",
          icon: Settings,
        },
      ],
    },
  ]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "flex h-screen shrink-0 flex-col border-r border-[#E3DFD5] bg-[#FBF9F5] transition-[width] duration-200 ease-out",
        collapsed ? "w-[72px]" : "w-[264px]"
      )}
    >
      {/* Brand */}
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && (
          <span className="font-serif text-lg tracking-tight text-[#1B1D22]">
            Osent
          </span>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-md text-[#6B6F76] transition-colors hover:bg-[#F1EDE3] hover:text-[#1B1D22]",
            collapsed && "mx-auto"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <ChevronsLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="h-px bg-[#E3DFD5]" />

      {/* Search */}
      {!collapsed && (
        <div className="px-4 pt-4">
          <div className="flex items-center gap-2 rounded-md border border-[#E3DFD5] bg-white px-2.5 py-1.5 text-sm text-[#6B6F76] transition-colors focus-within:border-[#A8801E]/60">
            <Search className="h-3.5 w-3.5 shrink-0" />
            <input
              type="text"
              placeholder="Search documents"
              className="w-full bg-transparent text-[#1B1D22] placeholder:text-[#6B6F76] focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pt-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-5">
            {!collapsed && (
              <p className="px-2 pb-1.5 text-xs text-[#6B6F76]">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "group relative flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors",
                        collapsed && "justify-center",
                        active
                          ? "bg-[#F1EDE3] text-[#1B1D22]"
                          : "text-[#4C4F55] hover:bg-[#F1EDE3] hover:text-[#1B1D22]"
                      )}
                    >
                      {active && !collapsed && (
                        <span className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full bg-[#A8801E]" />
                      )}
                      <Icon className="h-4 w-4 shrink-0" />
                      {!collapsed && (
                        <span className="flex-1 truncate">{item.label}</span>
                      )}
                      {!collapsed && item.count ? (
                        <span className="text-xs text-[#6B6F76]">
                          {item.count}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="h-px bg-[#E3DFD5]" />

      {/* User */}
      <div className="p-3">
        <button
          className={cn(
            "flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left transition-colors hover:bg-[#F1EDE3]",
            collapsed && "justify-center"
          )}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1B1D22] text-xs font-medium text-[#FBF9F5]">
            JC
          </span>
          {!collapsed && (
            <>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm text-[#1B1D22]">
                  Jane Cole
                </span>
                <span className="block truncate text-xs text-[#6B6F76]">
                  Admin
                </span>
              </span>
              <MoreHorizontal className="h-4 w-4 shrink-0 text-[#6B6F76]" />
            </>
          )}
        </button>
      </div>
    </aside>
  )
}