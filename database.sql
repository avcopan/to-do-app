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
('Build front-end'),
('Each task should have an option to "Complete" or "Delete"'),
('Add a background color to the page'),
('Change the font family and size'),
('Change text or background color of tasks to show whether or not they have been completed');