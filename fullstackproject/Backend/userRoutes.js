const express = require("express");
const database = require("./connect");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

let userRoutes = express.Router();
const SALT_ROUNDS = 6

//#1 - Retrieve All
userRoutes.route("/users").get(async (request, response) => {
  let db = database.getDb();
  let data = await db.collection("users").find({}).toArray();
  response.json(data);
});

//#2 - Retrieve One
userRoutes.route("/users/:id").get(async (request, response) => {
  let db = database.getDb();
  let data = await db.collection("users").findOne({ _id: new ObjectId(request.params.id) });
  response.json(data);
});

//#3 - Create One
userRoutes.route("/users").post(async (request, response) => {
  let db = database.getDb();

  const takenEmail =await db.collection("users").findOne({email: request.body.email})
  
   if(takenEmail) {
    response.json({message: "The email is taken"})
   } else {
    const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS)

    let mongoObject = {
      name: request.body.name,
      email: request.body.email,
      password: hash, // Fixed missing variable 'hash'
      joinDate: new Date(),
    };
  
    let data = await db.collection("users").insertOne(mongoObject);
    response.json(data);
   };
 
});

//#4 - Update One
userRoutes.route("/users/:id").put(async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password, // Fixed missing variable 'hash'
      joinDate: new Date(),
    },
  };

  let data = await db.collection("users").updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.json(data);
});

//#5 - Delete One
userRoutes.route("/users/:id").delete(async (request, response) => {
  let db = database.getDb();
  let data = await db.collection("users").deleteOne({ _id: new ObjectId(request.params.id) });
  response.json(data);
});

module.exports = userRoutes;
