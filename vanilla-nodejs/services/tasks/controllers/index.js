const { findAll, findById, create, update, remove } = require('../models')
const { getPostData, jsonResponse } = require('../utils')
const { validation } = require('../validation')

// Gets All Tasks
// route: GET /api/tasks
function getTasks(res) {
  findAll().then((tasks) => {
    jsonResponse(res, 200, tasks)
  })
}

// Gets Single Task
// route: GET /api/tasks/:id
function getTask(res, id) {
  findById(id).then((task) => {
    if (!task) {
      jsonResponse(res, 404, 'Task not found')
      return
    }
    jsonResponse(res, 200, task)
  })
}

// Create a Task
// route: POST /api/tasks
function createTask(req, res) {
  getPostData(req).then((body) => {
    const bodyObj = JSON.parse(body)

    const { error, resCode, message } = validation(bodyObj);
    if (error) {
      jsonResponse(res, resCode, message)
      return
    }

    const { content } = bodyObj
    const taskData = {
      done: false,
      content
    }

    create(taskData).then((tasks) => {
      jsonResponse(res, 201, tasks)
    })
  })
}

// Update a Task
// route: PUT /api/tasks/:id
function updateTask(req, res, id) {
  findById(id).then((task) => {
    if (!task) {
      jsonResponse(res, 404, 'Task not found')
      return
    }

    getPostData(req).then((body) => {
      const bodyObj = JSON.parse(body)

      const { error, resCode, message } = validation(bodyObj);
      if (error) {
        jsonResponse(res, resCode, message)
        return
      }

      const { done, content } = bodyObj
      const taskData = {
        done,
        content
      }

      update(id, taskData).then((tasks) => {
        jsonResponse(res, 200, tasks)
      })
    })
  })
}

// Delete a Task
// route: DELETE /api/tasks/:id
function deleteTask(res, id) {
  findById(id).then((task) => {
    if (!task) {
      jsonResponse(res, 404, 'Task not found')
      return
    }

    remove(id).then((tasks) => {
      jsonResponse(res, 200, tasks)
    })
  })
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
}
