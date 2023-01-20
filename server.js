const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000

let dbName = 'clients'

const dbConnectionStr = `mongodb+srv://dami:dami444@cluster0.hstkn5y.mongodb.net/?retryWrites=true&w=majority`

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        const db = client.db('clients')
        const clientCollection = db.collection('clients')

        //============
        // Middlewares
        //============
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extend: true }))
        app.use(express.static('public'))
        app.use(express.json())

        //=======
        // Routes
        //=======

        app.get('/', (req, res) => {
            db.collection('clients').find().toArray()
                .then(clients => {
                    res.render('index.ejs', { clients: clients})
                })
                .catch(error => console.error(error))
        })
        
        app.post('/addClient', (req, res) => {
            clientCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
        })

        app.put('/addClient', (req, res) => {
            clientCollection.findOneAndUpdate(
                // { name: 'Yoda' },
                {
                  $set: {
                    clients: req.body.clients
                  }
                },
                {
                  upsert: true
                }
            )
            .then(result => res.json('Success'))
            .catch(error => console.error(error))
        })
        //app.delete()

    })
    .catch(console.error)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})