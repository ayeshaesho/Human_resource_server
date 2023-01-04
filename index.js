const express = require('express')
const app = express()
const port = process.env.port || 5000
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId

app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://ayesha:4iNrZqjSwhHvNQ4Z@cluster0.zcpr7cf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
  
    const EmployeeCollection = client.db('nxgit').collection('emoplyees')

    const doc = {
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    }
    // const result = await EmployeeCollection.insertOne(doc);
    // console.log(result);

    app.get('/employee', async (req, res) => {
      const query = {}
      const cursor = EmployeeCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })
    app.post('/employee', async (req, res) => {
      const employee = req.body
      console.log(employee)
      const result = await EmployeeCollection.insertOne(employee)
      res.send(result)
    })
    app.delete('/user/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })
  } finally {

  }
}
run()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})