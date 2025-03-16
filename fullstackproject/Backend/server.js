const express = require("express");
const cors = require("cors");
const posts = require("./postRoutes");
const connect = require("./connect");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(posts);

const startServer = async () => {
  try {
    await connect.connectToServer();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();


 
