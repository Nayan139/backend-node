const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://task:task@cluster0.wanukex.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

const con = mongoose.connection;

con.on("open", () => {
  console.log("DB SuccessFully Connected...");
});
