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
        const db = client.db('clients-database')
        const clientCollection = db.collection('clients')

        //============
        // Middlewares
        //============
        app.set('view engine', 'ejs')
        app.use(express.static('public'))
        app.use(bodyParser.urlencoded({ extend: true }))
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
            clientCollection.insertOne({name: req.body.clientName, phone: req.body.clientPhone})
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.put('/editClient', (req, res) => {
            console.log('editing...');
            db.collection('clients').updateOne({name: req.body.name},     
            {   
                sort: {_id: -1},
                upsert: false
            })
            .then(result => {
                res.json('Success')
                console.log('Client Deleted')
            })
            .catch(error => console.error(error))
        })
        
        app.delete('/deleteClient', (req, res) => {
            db.collection('clients').deleteOne({name: req.body.name})
                .then(result => {
                    console.log('Client Deleted')
                    res.json('Deleted Client')
                })
                .catch(error => console.error(error))
        })

    })
    .catch(console.error)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})