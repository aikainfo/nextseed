"use client"

import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ProjectList } from '@/components/projects/project-list';
import { CompetitionCard } from '@/components/competitions/competition-card';
import { ExpertCard } from '@/components/experts/expert-card';
import { CompetitionDetailsModal } from '@/components/competitions/competition-modal';
import { OutreachModal } from '@/components/experts/outreach-modal';
import { MOCK_PROJECTS, MOCK_COMPETITIONS, MOCK_EXPERTS } from '@/lib/mock-data';
import { Search, Filter, Rocket, Trophy, Users, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function StudentDashboardPortal() {
    const [activeTab, setActiveTab] = useState('projects');
    const [user, setUser] = useState<any>(null);
    const [myProjects, setMyProjects] = useState<any[]>([]);
    const [loadingUser, setLoadingUser] = useState(true);

    // States for modals
    const [selectedComp, setSelectedComp] = useState<any>(null);
    const [isCompModalOpen, setIsCompModalOpen] = useState(false);
    const [selectedExpert, setSelectedExpert] = useState<any>(null);
    const [isOutreachModalOpen, setIsOutreachModalOpen] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const res = await fetch('/api/user/profile');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                    if (data.user?.studentProfile?.projects?.length > 0) {
                        setMyProjects(data.user.studentProfile.projects);
                    } else {
                        setMyProjects([]);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch user:", err);
            } finally {
                setLoadingUser(false);
            }
        }
        fetchUserData();
    }, []);

    const handleApplyCompetition = (compId: string) => {
        const comp = MOCK_COMPETITIONS.find(c => c.id === compId);
        setSelectedComp(comp);
        setIsCompModalOpen(true);
    };

    const handleContactExpert = (expertId: string) => {
        const expert = MOCK_EXPERTS.find(e => e.id === expertId);
        setSelectedExpert(expert);
        setIsOutreachModalOpen(true);
    };


    const submitApplication = async (data: any): Promise<void> => {
        const res = await fetch('/api/user/apply-competition', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
                competition: selectedComp
            })
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}))
            throw new Error(err.error || 'Failed to apply');
        }
    };

    const submitOutreach = async (data: any): Promise<void> => {
        const res = await fetch('/api/user/outreach', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
                expert: selectedExpert
            })
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}))
            throw new Error(err.error || 'Failed to send outreach');
        }
    };


    return (
        <div className="min-h-screen bg-surface-50/50 pb-20">
            {/* Header / Intro */}
            <div className="bg-white border-b border-surface-100 mb-8 sticky top-0 z-20">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-black text-surface-900 flex items-center gap-3">
                                <span className="bg-gradient-to-r from-brand-500 to-sky-500 bg-clip-text text-transparent">NextSeed</span> Student Hub
                            </h1>
                            <p className="text-surface-500 mt-1 font-medium">Исследуйте проекты, находите конкурсы и связывайтесь с экспертами</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-xl bg-surface-50 text-surface-600 hover:bg-surface-100">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                            </Button>
                            <div className="h-10 w-[1px] bg-surface-100 mx-2 hidden md:block"></div>
                            <div className="flex items-center gap-3 pl-2">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-surface-900">{user?.name || "Пользователь"}</p>
                                    <p className="text-[10px] text-brand-600 font-black uppercase tracking-tighter">{user?.email || "student@nextseed.local"}</p>
                                </div>
                                <div className="h-12 w-12 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 font-black border-2 border-white shadow-sm">
                                    {user?.name?.charAt(0) || "S"}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="container mx-auto px-4">
                    <div className="flex overflow-x-auto no-scrollbar gap-8">
                        {[
                            { id: 'projects', label: 'Проекты', icon: Rocket },
                            { id: 'competitions', label: 'Конкурсы', icon: Trophy },
                            { id: 'experts', label: 'Окружение', icon: Users }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 py-4 px-1 border-b-2 transition-all font-bold text-sm whitespace-nowrap ${activeTab === tab.id
                                    ? 'border-brand-500 text-brand-600'
                                    : 'border-transparent text-surface-400 hover:text-surface-600'
                                    }`}
                            >
                                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-brand-500' : ''}`} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {activeTab === 'projects' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-2xl font-black text-surface-900">Проекты учеников</h2>
                            <div className="hidden sm:flex items-center gap-2 text-surface-400 text-sm font-medium">
                                <Rocket className="w-4 h-4" />
                                <span>{MOCK_PROJECTS.length} активных проектов</span>
                            </div>
                        </div>
                        <ProjectList initialProjects={MOCK_PROJECTS} />
                    </div>
                )}

                {activeTab === 'competitions' && (
                    <div className="space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h2 className="text-2xl font-black text-surface-900">Конкурсы и Гранты</h2>
                            <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-surface-100 shadow-sm">
                                <button className="px-4 py-2 bg-brand-50 text-brand-600 rounded-lg font-bold text-sm">Все</button>
                                <button className="px-4 py-2 text-surface-500 hover:bg-surface-50 rounded-lg font-bold text-sm">Стартапы</button>
                                <button className="px-4 py-2 text-surface-500 hover:bg-surface-50 rounded-lg font-bold text-sm">Олимпиады</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {(MOCK_COMPETITIONS as any[]).map(comp => (
                                <CompetitionCard
                                    key={comp.id}
                                    competition={comp}
                                    onApply={handleApplyCompetition}
                                />
                            ))}
                        </div>

                    </div>
                )}

                {activeTab === 'experts' && (
                    <div className="space-y-8">
                        <div className="bg-gradient-to-br from-surface-900 to-brand-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative mb-8">
                            <div className="relative z-10 max-w-2xl">
                                <h2 className="text-3xl md:text-4xl font-black mb-4">Найдите своего наставника</h2>
                                <p className="text-brand-100 text-lg mb-8 opacity-90">
                                    Общайтесь с профессионалами из ведущих компаний. Получайте советы, инвестиции и экспертную оценку ваших идей.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 text-sm font-bold">
                                        <Users className="w-4 h-4 text-brand-400" />
                                        <span>150+ Менторов</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 text-sm font-bold">
                                        <Trophy className="w-4 h-4 text-amber-400" />
                                        <span>50+ Инвесторов</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
                                <Users className="w-96 h-96" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(MOCK_EXPERTS as any[]).map(expert => (
                                <ExpertCard
                                    key={expert.id}
                                    expert={expert}
                                    onContact={handleContactExpert}
                                />
                            ))}
                        </div>

                    </div>
                )}
            </div>

            {/* Modals */}
            <CompetitionDetailsModal
                isOpen={isCompModalOpen}
                onClose={() => setIsCompModalOpen(false)}
                competition={selectedComp}
                studentProjects={myProjects}
                onApply={submitApplication}
            />

            <OutreachModal
                isOpen={isOutreachModalOpen}
                onClose={() => setIsOutreachModalOpen(false)}
                expert={selectedExpert}
                studentProjects={myProjects}
                onSend={submitOutreach}
            />
        </div>
    );
}
