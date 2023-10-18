const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

//middleware
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
//access post body and convert into json format
app.use(express.json());


//connect to the mongodb
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.es62grd.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {

    //create a database and database collection
    const productCollection = client.db('productDB').collection('products');

    //using get method to read the data what i stored in database
    app.get('/product', async(req, res)=>{
        const cursor = productCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    //using post method to store product in the database
    app.post('/product', async(req, res) => {
        const newProduct = req.body;
        console.log(newProduct);
        const result = await productCollection.insertOne(newProduct);
        res.send(result);
    })









    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);




//for testing
app.get("/", (req, res) => {
  res.send("Brand shop server is running");
});

app.listen(port, () => {
  console.log(`Brand Shop server is running on port ${port}`);
});
