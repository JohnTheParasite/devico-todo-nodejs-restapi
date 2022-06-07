const tasks = [ { id: 1, done: false, content: 'First task' }, { id: 2, done: false, content: 'Second task' }  ]

function findAll() {
  return new Promise((resolve) => {
    resolve(tasks)
  })
}

function findById(id) {
  return new Promise((resolve) => {
    const task = tasks.find((el) => el.id === id)
    resolve(task)
  })
}

function create(task) {
  return new Promise((resolve) => {
    const newTask = { id: Math.max(...tasks.map((el) => el.id)) + 1, ...task }
    tasks.push(newTask);
    resolve(newTask)
  })
}

function update(id, task) {
  return new Promise((resolve) => {
    const updatedTask = tasks.find((el) => el.id === id)
    Object.assign(updatedTask, task);
    resolve(updatedTask)
  })
}

function remove(id) {
  return new Promise((resolve) => {
    const index = tasks.findIndex((el) => el.id === id)
    tasks.splice(index, 1);
    resolve()
  })
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
}
