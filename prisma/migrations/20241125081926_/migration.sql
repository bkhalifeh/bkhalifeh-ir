-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_educations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "aboutId" INTEGER NOT NULL,
    CONSTRAINT "educations_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "abouts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_educations" ("aboutId", "content", "end", "id", "start", "title") SELECT "aboutId", "content", "end", "id", "start", "title" FROM "educations";
DROP TABLE "educations";
ALTER TABLE "new_educations" RENAME TO "educations";
CREATE INDEX "educations_aboutId_idx" ON "educations"("aboutId");
CREATE TABLE "new_experiences" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "aboutId" INTEGER NOT NULL,
    CONSTRAINT "experiences_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "abouts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_experiences" ("aboutId", "content", "end", "id", "start", "title") SELECT "aboutId", "content", "end", "id", "start", "title" FROM "experiences";
DROP TABLE "experiences";
ALTER TABLE "new_experiences" RENAME TO "experiences";
CREATE INDEX "experiences_aboutId_idx" ON "experiences"("aboutId");
CREATE TABLE "new_portfolios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "portfolioTypeId" INTEGER NOT NULL,
    CONSTRAINT "portfolios_portfolioTypeId_fkey" FOREIGN KEY ("portfolioTypeId") REFERENCES "portfolio_types" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_portfolios" ("id", "image", "link", "name", "portfolioTypeId") SELECT "id", "image", "link", "name", "portfolioTypeId" FROM "portfolios";
DROP TABLE "portfolios";
ALTER TABLE "new_portfolios" RENAME TO "portfolios";
CREATE INDEX "portfolios_portfolioTypeId_idx" ON "portfolios"("portfolioTypeId");
CREATE TABLE "new_skill_topics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "aboutId" INTEGER NOT NULL,
    CONSTRAINT "skill_topics_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "abouts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_skill_topics" ("aboutId", "id", "title") SELECT "aboutId", "id", "title" FROM "skill_topics";
DROP TABLE "skill_topics";
ALTER TABLE "new_skill_topics" RENAME TO "skill_topics";
CREATE INDEX "skill_topics_aboutId_idx" ON "skill_topics"("aboutId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
