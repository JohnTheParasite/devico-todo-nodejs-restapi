const { todoDB } = require('../../mongo')
const todoTasks = todoDB.collection('tasks')

function findAll() {
  return new Promise((resolve) => {
    todoTasks.find().toArray((err, items) => {
      const tasksList = items.map((e) => ({ id: e.id, done: e.done, content: e.content }))
      resolve(tasksList)
    })
  })
}

function findById(id) {
  return new Promise((resolve) => {
    todoTasks.findOne({ id }).then((task) => {
      if (task === null) {
        resolve(undefined)
        return
      }
      resolve({ id: id, done: task.done, content: task.done })
    })
  })
}

function create(task) {
  return new Promise(async (resolve) => {
    const query = todoTasks.find().sort({ id: -1 }).limit(1);
    let id = 1;
    if (await query.hasNext()) {
      const lastItem = await query.next()
      id = lastItem.id + 1
    }

    const newTask = { id, ...task }
    await todoTasks.insertOne(newTask)

    resolve(findAll())
  })
}

function update(id, task) {
  return new Promise((resolve) => {
    todoTasks.updateOne({ id }, { $set: task }).then(() => {
      resolve(findAll())
    })
  })
}

function remove(id) {
  return new Promise((resolve) => {
    todoTasks.deleteOne({ id }).then(() => {
      resolve(findAll())
    })
  })
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
}
