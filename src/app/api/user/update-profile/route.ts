import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();
        const {
            name,
            accountType,
            teamName,
            teamMembers,
            mentorName,
            mentorEmail,
            participatedWhere,
            bio,
        } = data;

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name,
                studentProfile: {
                    upsert: {
                        create: {
                            type: accountType === 'team' ? 'team' : 'individual',
                            teamName: accountType === 'team' ? teamName : null,
                            teamMembers: accountType === 'team' ? teamMembers || null : null,
                            mentorName: mentorName || null,
                            mentorEmail: mentorEmail || null,
                            participatedWhere,
                            bio
                        },
                        update: {
                            type: accountType === 'team' ? 'team' : 'individual',
                            teamName: accountType === 'team' ? teamName : null,
                            teamMembers: accountType === 'team' ? teamMembers || null : null,
                            mentorName: mentorName || null,
                            mentorEmail: mentorEmail || null,
                            participatedWhere,
                            bio
                        }
                    }
                }
            },
            include: {
                studentProfile: {
                    include: {
                        projects: true
                    }
                }
            }
        });

        return NextResponse.json({ user: updatedUser });
    } catch (error) {
        console.error('Update profile error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
