CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  task TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO todos
(task, completed)
VALUES
('Spend some time thinking about how to approach this problem', true),
('Create a new database with the name weekend-to-do-app', true),
('Include a database.sql text file in your repo that includes all of your CREATE TABLE queries', true),
('Create a front end experience that allows a user to create a task', true),
('When the task is created, it should be stored inside of a database', true),
('Whenever a task is created the front end should refresh to show all tasks that need to be completed', true),
('Each task should have an option to complete or delete', true),
('When a task is complete, its visual representation should change on the front end', true),
('Whether or not a task is complete should also be stored in the database', true),
('Deleting a task should remove it both from the front end as well as the database', true),
('Use CSS styling to change the background color of the page', true),
('Use CSS styling to change the font family and size', true),
('Use CSS styling to change the text color and/or background color of completed tasks', true);