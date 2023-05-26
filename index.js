const express = require("express");
const db = require("./configs/mongoose");
const app = express();
const port = 8000;

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes handler
app.use("/", require("./routes"));

// Database connection
db()
  .then(() => {
    app.listen(port, (err) => {
      if (err) {
        console.log("Error in starting server:", err);
        return;
      }
      console.log("Server started at port:", port);
    });
  })
  .catch((err) => console.log(err.message));
