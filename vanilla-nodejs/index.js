const http = require('http');
const TodoTasks = require('./services/tasks')

const server = http.createServer((req, res) => {

  if (req.url.startsWith('/api/tasks')) {
    TodoTasks.resolveRequest(req, res)
  } else {
    res.writeHead(404, { 'Content-type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route not found' }))
  }

})

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
