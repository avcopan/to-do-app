CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  task TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO todos
(task)
VALUES
('Set up database'),
('Set up queries'),
('Set up server-side requests'),
('Build front-end');