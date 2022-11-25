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
        })
    }
    finally {

    }
}
run().catch(err => console.error(err));

// const categories = require('./data/categories.json')
// const products = require('./data/products.json')



// app.get('/categories', (req, res) => {
//     res.send(categories)
// })

// app.get('/category/:id', (req, res) =>{
//     const id = req.params.id;
//     const category_products = products.filter(n => n.category_id === id)
//     res.send(category_products)
// })
// app.get('/products/:id', (req, res) =>{
//     const id = req.params.id;
//     const selectedProducts = products.find( n => n._id === id);
//     res.send(selectedProducts)
// })

app.get('/', (req, res) => {
    res.send('Resale Server is running')
})
app.listen(port, () => {
    console.log(`running on: ${port}`)
})