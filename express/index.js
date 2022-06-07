const express = require('express');
const app = express();
app.use(express.json());

const tasks = [
  { id: 1, done: false, content: "First task" },
];

function validateTasks(body) {
  let result = { error: false, message: ''};

  if (!body.content) {
    result = { error: true, message: 'Content is required'};
  }

  return result
}

app.get('/api/tasks', (req, res) => {
  res.send(tasks);
})

app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find((el) => el.id === parseInt(req.params.id))
  if (!task) return res.status(404).send('The task with the given ID was not found.');

  res.send(task);
})

app.post('/api/tasks', (req, res) => {
  const validation = validateTasks(req.body);
  if (validation.error) return res.status(400).send(validation.message);

  const task = {
    id: Math.max(...tasks.map((el) => el.id)) + 1,
    done: false,
    content: req.body.content
  };
  tasks.push(task);
  res.send(task)
})

app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find((el) => el.id === parseInt(req.params.id))
  if (!task) return res.status(404).send('The task with the given ID was not found.');

  const { error, message } = validateTasks(req.body);
  if (error) return res.status(400).send(message);

  const { done, content } = req.body
  task.done = done ? done : task.done;
  task.content = content;
  res.send(task);
})

app.delete('/api/tasks/:id', (req, res) => {

  const task = tasks.find((el) => el.id === parseInt(req.params.id))
  if (!task) return res.status(404).send('The task with the given ID was not found.');

  const index = tasks.indexOf(task)
  tasks.splice(index, 1);

  res.send(task);

})

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening on port ${port}...`))
