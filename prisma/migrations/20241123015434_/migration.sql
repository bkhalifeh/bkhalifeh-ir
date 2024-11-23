-- CreateTable
CREATE TABLE "post_links" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "postSlug" TEXT NOT NULL,
    CONSTRAINT "post_links_postSlug_fkey" FOREIGN KEY ("postSlug") REFERENCES "posts" ("slug") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "post_links_postSlug_idx" ON "post_links"("postSlug");
