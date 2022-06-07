const { getTasks, createTask, getTask, updateTask, deleteTask } = require('./controllers');
const { jsonResponse } = require('./utils')

function resolveRequest(req, res) {
  if (req.url === '/api/tasks') {
    switch(req.method) {
      case 'GET':
        getTasks(res)
        break
      case 'POST':
        createTask(req, res)
        break
      default:
        jsonResponse(res, 404, 'Route not found')
        break
    }
  } else if (req.url.match(/\/api\/tasks\/([0-9]+)/)) {
    const id = parseInt(req.url.split('/')[3]);
    switch(req.method) {
      case 'GET':
        getTask(res, id)
        break
      case 'PUT':
        updateTask(req, res, id)
        break
      case 'DELETE':
        deleteTask(res, id)
        break
      default:
        jsonResponse(res, 404, 'Route not found')
        break
    }
  } else {
    jsonResponse(res, 404, 'Route not found')
  }
}

module.exports = {
  resolveRequest
}
