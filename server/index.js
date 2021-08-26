const express = require("express");
const app = express();
const router = require("./router");
const PORT = 3100;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/", router);

app.listen(process.env.port || PORT, () => {
  console.log(`App listening on port ${process.env.port || PORT}!`);
});
