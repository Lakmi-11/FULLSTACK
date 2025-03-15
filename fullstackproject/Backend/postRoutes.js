const express = require("express")
const database = require("./connect")
const objectId = require("mongodb").ObjectId

let postRoutes = express.Router()
//#1 - Retrieve All
//http://localhost:300/posts
postRoutes.route("/posts").get(async (request, response) => {
   let db = database.getDb()
   let data =await collection("posts").find({}).toArray()
   if (data.length >0) {
          response.json(data)
   }else {
      throw new Error("Data was not found: (")
   }
})

//#2 - Retrieve One
//http://localhost:3000/posts/12345
postRoutes.route("/posts/:id").get(async (request, response) => {
   let db = database.getDb()
   let data =await collection("posts").findOne({_id: request.params.id})
   if (object.keys(data).length >0) {
          response.json(data)
   }else {
      throw new Error("Data was not found: (")
   }
})

 //#3-Create one
 postRoutes.route("/posts").post(async (request, response) => {
   let db = database.getDb()
   let mongoObject = {
                date: request.body.date,
                Weight: request.body. Weight,
                inventroyManagerName: request.body.inventroyManagerName,
                CustomerName: request.body.CustomerName,
                Materials: request.body.Materials

   }
   let data =await collection("posts").insertOne(mongoObject)
   response.json(data)
})

//#4 - Update one 
postRoutes.route("/posts/:id").put(async (request, response) => {
   let db = database.getDb()
   let mongoObject = {
               $set: {
                  date: request.body.date,
                  Weight: request.body. Weight,
                  inventroyManagerName: request.body.inventroyManagerName,
                  CustomerName: request.body.CustomerName,
                  Materials: request.body.Materials
  }
   }
   let data =await collection("posts").updateOne({_id: new objectId(request.params.id)}, mongoObject)
   response.json(data)
})
//#5 - Delete one 
postRoutes.route("/posts/:id").delete(async (request, response) => {
   let db = database.getDb()
   let data =await collection("posts").deleteOne({_id: request.params.id})
  response.json(data)
})

module.exports = postRoutes