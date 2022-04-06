CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY CHECK (username = lower(username)),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  hashed_pass TEXT NOT NULL
);

CREATE TABLE bookmarks (
  id TEXT PRIMARY KEY,
  article_url TEXT NOT NULL,
  section_id TEXT NOT NULL,
  title TEXT NOT NULL,
  by_line TEXT NOT NULL,
  stand_first TEXT NOT NULL,
  main TEXT NOT NULL,
  body TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  wordcount TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users ON DELETE CASCADE
);

CREATE TABLE metrics (
  user_id TEXT PRIMARY KEY REFERENCES users ON DELETE CASCADE,
  goal TEXT NOT NULL,
  us_news INTEGER NOT NULL,
  world_news INTEGER NOT NULL,
  business INTEGER NOT NULL,
  opinion INTEGER NOT NULL,
  sport INTEGER NOT NULL,
  culture INTEGER NOT NULL,
  science INTEGER NOT NULL,
  lifestyle INTEGER NOT NULL
);
