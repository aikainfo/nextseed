"use client"

import { useState } from "react"
import { cn } from "@/lib/utils/cn"

export interface Tab {
    id: string
    label: string
    content: React.ReactNode
}

export interface TabsProps {
    tabs: Tab[]
    defaultTab?: string
    className?: string
}

/**
 * Tabs Component
 * Modern tab navigation with smooth animations
 */
export function Tabs({ tabs, defaultTab, className }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

    const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content

    return (
        <div className={cn("w-full", className)}>
            {/* Tab Headers */}
            <div className="flex gap-1 border-b border-surface-200 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "relative px-6 py-3 font-semibold text-sm transition-all duration-200",
                            activeTab === tab.id
                                ? "text-brand-600"
                                : "text-surface-600 hover:text-surface-900"
                        )}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500 to-accent-sky rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="animate-[fadeIn_0.3s_ease-out]">
                {activeTabContent}
            </div>
        </div>
    )
}
