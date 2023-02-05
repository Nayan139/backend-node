const mongoose = require("mongoose");
mongoose.connect(
  "add you own mongodb config url",
  {
    useNewUrlParser: true,
  }
);

const con = mongoose.connection;

con.on("open", () => {
  console.log("DB SuccessFully Connected...");
});
