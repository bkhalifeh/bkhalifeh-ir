-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_infos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "postition" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "resume" TEXT
);
INSERT INTO "new_infos" ("email", "id", "image", "location", "name", "phone", "postition", "resume") SELECT "email", "id", "image", "location", "name", "phone", "postition", "resume" FROM "infos";
DROP TABLE "infos";
ALTER TABLE "new_infos" RENAME TO "infos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
