-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('student', 'mentor', 'business');

-- CreateEnum
CREATE TYPE "StudentAccountType" AS ENUM ('individual', 'team');

-- CreateEnum
CREATE TYPE "BusinessAccountType" AS ENUM ('individual', 'organization');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN,
    "image" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'student',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "StudentAccountType" NOT NULL DEFAULT 'individual',
    "bio" TEXT,
    "mentorName" TEXT,
    "mentorEmail" TEXT,
    "teamName" TEXT,
    "teamMembers" TEXT,

    CONSTRAINT "student_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentor_profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hasTeams" BOOLEAN NOT NULL DEFAULT false,
    "managedTeams" TEXT,

    CONSTRAINT "mentor_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "BusinessAccountType" NOT NULL DEFAULT 'individual',
    "companyName" TEXT,

    CONSTRAINT "business_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "investment" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "victories" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competition" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "files" TEXT,
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "competition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "competitionId" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "githubUrl" TEXT,
    "docsUrl" TEXT,
    "subject" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "studentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investment" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'interested',
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "investment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "student_profile_userId_key" ON "student_profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "mentor_profile_userId_key" ON "mentor_profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "business_profile_userId_key" ON "business_profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- AddForeignKey
ALTER TABLE "student_profile" ADD CONSTRAINT "student_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_profile" ADD CONSTRAINT "mentor_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_profile" ADD CONSTRAINT "business_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "student_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competition" ADD CONSTRAINT "competition_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "mentor_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "competition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investment" ADD CONSTRAINT "investment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investment" ADD CONSTRAINT "investment_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "business_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
