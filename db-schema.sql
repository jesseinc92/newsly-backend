CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY CHECK (username = lower(username)),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  hashed_pass TEXT NOT NULL
);

CREATE TABLE bookmarks (
  id TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
  article_url TEXT ,
  section_id TEXT,
  section_name TEXT,
  title TEXT,
  by_line TEXT,
  stand_first TEXT,
  main TEXT,
  body TEXT,
  thumbnail TEXT,
  wordcount TEXT,
  PRIMARY KEY (id, user_id)
);

CREATE TABLE metrics (
  user_id TEXT PRIMARY KEY REFERENCES users ON DELETE CASCADE,
  goal TEXT DEFAULT 'all',
  us_news INTEGER DEFAULT 0,
  world_news INTEGER DEFAULT 0,
  business INTEGER DEFAULT 0,
  opinion INTEGER DEFAULT 0,
  sport INTEGER DEFAULT 0,
  culture INTEGER DEFAULT 0,
  science INTEGER DEFAULT 0,
  lifestyle INTEGER DEFAULT 0,
  metricsQueue TEXT DEFAULT NULL
);
