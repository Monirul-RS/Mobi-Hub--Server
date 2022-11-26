const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.evtq0rz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const categoryCollection = client.db('resaleMobile').collection('categories');
        const bookingsCollection = client.db('resaleMobile').collection('bookings');


        app.get('/categories', async (req, res) => {
            const query = {};
            const categories = await categoryCollection.find(query).toArray();
            res.send(categories)
        })

        app.get('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const category = await categoryCollection.findOne(query);
            res.send(category)
        });

        app.get('/bookings', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const bookings = await bookingsCollection.find(query).toArray();
            res.send(bookings)
        })


        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookingsCollection.insertOne(booking);
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('Resale Server is running')
})
app.listen(port, () => {
    console.log(`running on: ${port}`)
})