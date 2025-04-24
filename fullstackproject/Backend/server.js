

const express = require("express");
const cors = require("cors");
const posts = require("./postRoutes");
const connect = require("./connect");
const users = require("./userRoutes");


const app = express(); // ✅ Define app BEFORE using it
const PORT = 3000;

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use(posts);
app.use(users);


// ✅ Start Server
const startServer = async () => {
  try {
    await connect.connectToServer();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();
