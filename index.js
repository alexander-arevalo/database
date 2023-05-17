const express = require("express");
const conn = require("./config/db");
const enrolleesRouter = require("./routes/enrollmentRoutes");
const bodyParser = require("body-parser");
const userRouter = require("./routes/usersRoutes");
const cors = require("cors")
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// use the json middleware to parse JSON request bodies
app.use(bodyParser.json());

conn();
app.use(cors());
app.use("/api/auth", userRouter);
app.use("/api/enrollees", enrolleesRouter);
const PORT = 3001 || 3002;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}....`);
});
