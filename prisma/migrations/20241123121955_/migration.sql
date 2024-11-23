/*
  Warnings:

  - Added the required column `slug` to the `portfolio_types` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_portfolio_types" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);
INSERT INTO "new_portfolio_types" ("id", "title") SELECT "id", "title" FROM "portfolio_types";
DROP TABLE "portfolio_types";
ALTER TABLE "new_portfolio_types" RENAME TO "portfolio_types";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
