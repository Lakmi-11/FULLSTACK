const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let database;

module.exports = {
  connectToServer: async () => {
    try {
      await client.connect();
      database = client.db("Inventory");
      console.log("✅ Connected to MongoDB");
    } catch (error) {
      console.error("❌ MongoDB connection error:", error);
      throw error;
    }
  },
  getDb: () => {
    if (!database) {
      throw new Error("Database not initialized");
    }
    return database;
  }
};

