import { Search } from "lucide-react"

interface ProjectFiltersProps {
    searchQuery: string
    onSearchChange: (query: string) => void
    category: string
    onCategoryChange: (category: string) => void
    sortBy: "newest" | "popular" | "rating"
    onSortChange: (sort: "newest" | "popular" | "rating") => void
}

export function ProjectFilters({
    searchQuery,
    onSearchChange,
    category,
    onCategoryChange,
    sortBy,
    onSortChange,
}: ProjectFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
                <input
                    type="text"
                    placeholder="Поиск проектов..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-surface-300 bg-white text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:border-brand-500 focus:ring-brand-500/20 transition-all"
                />
            </div>

            {/* Category Filter */}
            <div className="sm:w-48">
                <select
                    value={category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="w-full rounded-xl border border-surface-300 bg-white px-4 py-3 text-surface-900 focus:outline-none focus:ring-2 focus:border-brand-500 focus:ring-brand-500/20 transition-all"
                >
                    <option value="all">Все категории</option>
                    <option value="web">Веб-разработка</option>
                    <option value="mobile">Мобильные приложения</option>
                    <option value="ai">Искусственный интеллект</option>
                    <option value="robotics">Робототехника</option>
                    <option value="iot">IoT</option>
                </select>
            </div>

            {/* Sort */}
            <div className="sm:w-48">
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value as "newest" | "popular" | "rating")}
                    className="w-full rounded-xl border border-surface-300 bg-white px-4 py-3 text-surface-900 focus:outline-none focus:ring-2 focus:border-brand-500 focus:ring-brand-500/20 transition-all"
                >
                    <option value="newest">Новые</option>
                    <option value="popular">Популярные</option>
                    <option value="rating">По рейтингу</option>
                </select>
            </div>
        </div>
    )
}
