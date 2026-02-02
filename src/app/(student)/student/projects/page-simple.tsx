"use client"

export default function StudentProjectsPage() {
    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Проекты студентов</h1>
            <p className="text-gray-600 mb-8">
                Исследуйте инновационные проекты от студентов и команд
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Project 1 */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">EduTech Platform</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Платформа для онлайн обучения с AI-ассистентом
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                            MVP
                        </span>
                        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                            Подробнее →
                        </button>
                    </div>
                </div>

                {/* Project 2 */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">GreenCity App</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Мобильное приложение для экологичного образа жизни
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                            Идея
                        </span>
                        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                            Подробнее →
                        </button>
                    </div>
                </div>

                {/* Project 3 */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">FinTrack</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Умный финансовый трекер для студентов
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                            Масштабирование
                        </span>
                        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                            Подробнее →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
