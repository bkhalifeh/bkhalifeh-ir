/*
  Warnings:

  - Added the required column `image` to the `infos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_infos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "postition" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "resume" TEXT NOT NULL
);
INSERT INTO "new_infos" ("email", "id", "location", "name", "phone", "postition", "resume") SELECT "email", "id", "location", "name", "phone", "postition", "resume" FROM "infos";
DROP TABLE "infos";
ALTER TABLE "new_infos" RENAME TO "infos";
CREATE TABLE "new_posts" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL
);
INSERT INTO "new_posts" ("content", "created_at", "slug", "title") SELECT "content", "created_at", "slug", "title" FROM "posts";
DROP TABLE "posts";
ALTER TABLE "new_posts" RENAME TO "posts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
