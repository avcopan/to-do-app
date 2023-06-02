CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO tasks
(content)
VALUES
('Set up database'),
('Set up queries'),
('Set up server-side requests'),
('Build front-end');