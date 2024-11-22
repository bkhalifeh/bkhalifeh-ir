-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "posts" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "comments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT false,
    "postSlug" TEXT NOT NULL,
    CONSTRAINT "comments_postSlug_fkey" FOREIGN KEY ("postSlug") REFERENCES "posts" ("slug") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "portfolio_types" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "portfolios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "portfolioTypeId" INTEGER NOT NULL,
    CONSTRAINT "portfolios_portfolioTypeId_fkey" FOREIGN KEY ("portfolioTypeId") REFERENCES "portfolio_types" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "educations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "aboutId" INTEGER NOT NULL,
    CONSTRAINT "educations_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "abouts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "experiences" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "aboutId" INTEGER NOT NULL,
    CONSTRAINT "experiences_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "abouts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "skills" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "skillTopicId" INTEGER NOT NULL,
    CONSTRAINT "skills_skillTopicId_fkey" FOREIGN KEY ("skillTopicId") REFERENCES "skill_topics" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "skill_topics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "aboutId" INTEGER NOT NULL,
    CONSTRAINT "skill_topics_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "abouts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "abouts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "links" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "infoId" INTEGER NOT NULL,
    CONSTRAINT "links_infoId_fkey" FOREIGN KEY ("infoId") REFERENCES "infos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "infos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "postition" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "resume" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "comments_visible_postSlug_idx" ON "comments"("visible", "postSlug");

-- CreateIndex
CREATE INDEX "portfolios_portfolioTypeId_idx" ON "portfolios"("portfolioTypeId");

-- CreateIndex
CREATE INDEX "educations_aboutId_idx" ON "educations"("aboutId");

-- CreateIndex
CREATE INDEX "experiences_aboutId_idx" ON "experiences"("aboutId");

-- CreateIndex
CREATE INDEX "skills_skillTopicId_idx" ON "skills"("skillTopicId");

-- CreateIndex
CREATE INDEX "skill_topics_aboutId_idx" ON "skill_topics"("aboutId");

-- CreateIndex
CREATE INDEX "links_infoId_idx" ON "links"("infoId");
