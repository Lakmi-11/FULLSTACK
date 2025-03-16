const express = require("express");
const database = require("./connect");
const { ObjectId } = require("mongodb");

let postRoutes = express.Router();

//#1 - Retrieve All
postRoutes.route("/posts").get(async (request, response) => {
  try {
    let db = database.getDb();
    let data = await db.collection("inventorydata").find({}).toArray();

    if (data.length > 0) {
      response.json(data);
    } else {
      response.status(404).json({ error: "No data found" });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

//#2 - Retrieve One
postRoutes.route("/posts/:id").get(async (request, response) => {
  try {
    let db = database.getDb();
    let data = await db.collection("inventorydata").findOne({ _id: new ObjectId(request.params.id) });

    if (data) {
      response.json(data);
    } else {
      response.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    response.status(400).json({ error: "Invalid ID format" });
  }
});

//#3 - Create One
postRoutes.route("/posts").post(async (request, response) => {
  try {
    let db = database.getDb();
    let mongoObject = {
      date: request.body.date,
      Weight: request.body.Weight,
      inventoryManagerName: request.body.inventoryManagerName,
      CustomerName: request.body.CustomerName,
      Materials: request.body.Materials,
    };

    let data = await db.collection("inventorydata").insertOne(mongoObject);
    response.json(data);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

//#4 - Update One
postRoutes.route("/posts/:id").put(async (request, response) => {
  try {
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
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

//#5 - Delete One
postRoutes.route("/posts/:id").delete(async (request, response) => {
  try {
    let db = database.getDb();
    let data = await db.collection("inventorydata").deleteOne({ _id: new ObjectId(request.params.id) });

    if (data.deletedCount > 0) {
      response.json({ message: "Record deleted successfully" });
    } else {
      response.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = postRoutes;
