const express = require("express");
const app = express();
const PORT = 3000;
const apiRouter = require("./routes/apiRouter.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Welcome to your test api!");
});

app.listen(PORT, (req, res) => {
  console.log(`Server listening at port ${PORT}`);
});
