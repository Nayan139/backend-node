const express = require("express");
const cors = require("cors");
const user = require("./routes/userRoute");
require("./config/db.config");

const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

app.use(user);

app.listen(port, () => {
  console.log("port is on:-", port);
});
