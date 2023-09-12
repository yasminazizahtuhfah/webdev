var express = require('express');
var server = express();
var routes = require('./routes/routes');
var mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect("mongodb://127.0.0.1:27017/ysm", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("DB connected");
})
.catch((error) => {
  console.error("DB connection error:", error);
});

server.use(express.json());
server.use(routes);
server.use(cors())

server.listen(8000, function (error) {
  if (error) {
    console.log("error");
  } else {
    console.log("start");
  }
});
