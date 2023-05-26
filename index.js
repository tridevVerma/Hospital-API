const express = require("express");
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log("Error in starting server:", err);
    return;
  }
  console.log("Server started at port:", port);
});
