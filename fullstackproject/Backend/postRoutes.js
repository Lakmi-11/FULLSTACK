const express = require("express");
const database = require("./connect");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

let postRoutes = express.Router();

//#1 - Retrieve All
postRoutes.route("/posts").get(verifyToken, async (request, response) => {
  let db = database.getDb();
  let data = await db.collection("inventorydata").find({}).toArray();

  if (data.length > 0) {
    response.json(data);
  } else {
    response.status(404).json({ error: "No data found" });
  }
});

//#2 - Retrieve One
postRoutes.route("/posts/:id").get(verifyToken, async (request, response) => {
  let db = database.getDb();
  let data = await db.collection("inventorydata").findOne({ _id: new ObjectId(request.params.id) });

  if (data) {
    response.json(data);
  } else {
    response.status(404).json({ error: "Data not found" });
  }
});

//#3 - Create One
postRoutes.route("/posts").post(verifyToken, async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    date: request.body.date,
    Weight: request.body.Weight,
    inventoryManagerName: request.body.inventoryManagerName,
    CustomerName: request.body.CustomerName,
    Materials: request.body.Materials,
    user: request.user, // Store user from token
  };

  let data = await db.collection("inventorydata").insertOne(mongoObject);
  response.json(data);
});

//#4 - Update One
postRoutes.route("/posts/:id").put(verifyToken, async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      date: request.body.date,
      Weight: request.body.Weight,
      inventoryManagerName: request.body.inventoryManagerName,
      CustomerName: request.body.CustomerName,
      Materials: request.body.Materials,
    },
  };

  let data = await db.collection("inventorydata").updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.json(data);
});

//#5 - Delete One
postRoutes.route("/posts/:id").delete(verifyToken, async (request, response) => {
  let db = database.getDb();
  let data = await db.collection("inventorydata").deleteOne({ _id: new ObjectId(request.params.id) });

  if (data.deletedCount > 0) {
    response.json({ message: "Record deleted successfully" });
  } else {
    response.status(404).json({ error: "Data not found" });
  }
});

//✅ Fixed `verifyToken` function
function verifyToken(request, response, next) {
  const authHeader = request.headers["authorization"]; // Ensure lowercase
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response.status(401).json({ message: "Authentication token is missing" });
  }

  jwt.verify(token, process.env.SECRETKEY, (error, user) => {
    if (error) {
      return response.status(403).json({ message: "Invalid token" });
    }

    request.user = user; // Store user info in `request.user`
    next();
  });
}

module.exports = postRoutes;

