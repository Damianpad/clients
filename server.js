const express = require('express')
const app = express()
const connectDB = require('./config/databse')
const homeRoutes = require('./routes/home')

require('dotenv').config({path: './config/.env'})

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extend: true }))
app.use(express.json())

app.use('/', homeRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})

// const password = process.env.db_password

// let dbName = 'clients'

// const dbConnectionStr = `mongodb+srv://dami:${password}@cluster0.hstkn5y.mongodb.net/?retryWrites=true&w=majority`

// MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
//     .then(client => {
//         console.log(`Connected to ${dbName} Database`)
//         const db = client.db('clients-database')
//         const clientCollection = db.collection('clients')



//         //=======
//         // Routes
//         //=======

//         app.get('/', (req, res) => {
//             db.collection('clients').find().toArray()
//                 .then(clients => {
//                     res.render('index.ejs', { clients: clients})
//                 })
//                 .catch(error => console.error(error))
//         })
        
//         app.post('/addClient', (req, res) => {
//             clientCollection.insertOne({name: req.body.clientName, phone: req.body.clientPhone})
//                 .then(result => {
//                     res.redirect('/')
//                 })
//                 .catch(error => console.error(error))
//         })

//         app.put('/editClient', (req, res) => {
//             console.log('editing...');
//             db.collection('clients').updateOne({name: req.body.name},     
//             {   
//                 sort: {_id: -1},
//                 upsert: true
//             })
//             .then(result => {
//                 res.json('Success')
//                 console.log('Client Deleted')
//             })
//             .catch(error => console.error(error))
//         })
        
//         app.delete('/deleteClient', (req, res) => {
//             db.collection('clients').deleteOne({name: req.body.name})
//                 .then(result => {
//                     console.log('Client Deleted')
//                     res.json('Deleted Client')
//                 })
//                 .catch(error => console.error(error))
//         })

//     })
//     .catch(console.error)