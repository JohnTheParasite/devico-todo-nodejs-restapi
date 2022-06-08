const tasks = [ { id: 1, done: false, content: 'First task' }, { id: 2, done: false, content: 'Second task' } ]

export function findAll() {
  return tasks
}

export function findById(id) {
  return tasks.find(el => el.id === id)
}

export function create(content) {
  const taskData = {
    id: Math.max(0, ...tasks.map(el => el.id)) + 1,
    done: false,
    content
  }
  tasks.push(taskData)
  return tasks
}

export function update(id, task) {
  const updatedTask = tasks.find(el => el.id === id)
  Object.assign(updatedTask, task);
  return tasks
}

export function remove(id) {
  const index = tasks.findIndex(el => el.id === id)
  tasks.splice(index, 1)
  return tasks
}

export default {
  findAll,
  findById,
  create,
  update,
  remove
}
