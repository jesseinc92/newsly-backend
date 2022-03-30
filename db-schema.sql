CREATE TABLE "users" (
  "username" TEXT PRIMARY KEY,
  "first_name" TEXT,
  "last_name" TEXT,
  "hashed_pass" TEXT
);

CREATE TABLE "bookmarks" (
  "id" TEXT PRIMARY KEY,
  "article_url" TEXT,
  "section_id" TEXT,
  "title" TEXT,
  "by_line" TEXT,
  "stand_first" TEXT,
  "main" TEXT,
  "body" TEXT,
  "thumbnail" TEXT,
  "wordcount" TEXT,
  "user" TEXT
);

CREATE TABLE "metrics" (
  "user" TEXT PRIMARY KEY,
  "goal" TEXT,
  "news" INTEGER,
  "opinion" INTEGER,
  "sport" INTEGER,
  "culture" INTEGER,
  "lifestyle" INTEGER
);

ALTER TABLE "bookmarks" ADD FOREIGN KEY ("user") REFERENCES "users" ("username");

ALTER TABLE "metrics" ADD FOREIGN KEY ("user") REFERENCES "users" ("username");
