require("dotenv").config({ path: "./config.env" });
const { MongoClient, ServerApiVersion } = require('mongodb');

// Create a MongoClient with MongoDB Atlas URI from .env
const client = new MongoClient(process.env.ATLAS_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let database

module.exports = {
  connectToServer: () => {
    database = client.db("Inventory")
  },
  getDb: () => {
    return database
  }
}

console.log("Hi")