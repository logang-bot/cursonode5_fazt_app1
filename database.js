const mongoose = require("mongoose");

mongoose
  .connect("mongodb://172.20.0.2:27017/nodes-db-app", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then((db) => console.log("db is connected"))
  .catch((err) => console.error(err));
