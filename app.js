const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");

// import router
const router = require("../binar-fsw-chap9-group2-backend/server/routers");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => res.json({ message: "OK" }));
app.use("/", router);

// run app in port 4000
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
