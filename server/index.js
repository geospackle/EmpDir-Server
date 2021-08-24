const express = require("express");
const app = express();
const router = require("./router");
const port = 3100;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
