const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri)

const todoDB = client.db('todos')

module.exports = {
  client,
  todoDB
}
