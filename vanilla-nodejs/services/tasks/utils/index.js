function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk.toString()
      })

      req.on('end', () => {
        resolve(body)
      })
    } catch (error) {
      reject(error)
    }
  })
}

function jsonResponse(res, resCode, message) {
  let body = message;
  if (typeof message === 'string') {
    body = { message }
  }
  res.writeHead(resCode, { 'Content-type': 'application/json' })
  res.end(JSON.stringify(body))
}

module.exports = {
  getPostData,
  jsonResponse
}
