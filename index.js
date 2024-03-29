const express = require("express");
const conn = require("./config/db");
const enrolleesRouter = require("./routes/enrollmentRoutes");
const bodyParser = require("body-parser");
const userRouter = require("./routes/usersRoutes");
// const uploadRouter = require ("./routes/uploadRoutes");
const requestIdRrouter = require("./routes/reqIdRoutes");
const eventRouter = require("./routes/eventRoutes");
const cors = require("cors");
const app = express();
const uploadRouter = require("./routes/uploaderRoutes");
const announcementRouter = require("./routes/announcementRoutes");
const galleryRouter = require("./routes/galleryRoutes");
app.use(bodyParser.urlencoded({ extended: false }));

// use the json middleware to parse JSON request bodies
app.use(bodyParser.json());

conn();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use("/api", uploadRouter);
app.use("/api/auth", userRouter);
app.use("/api/enrollees", enrolleesRouter);
app.use("/api/gallery", galleryRouter);
// app.use("/api/upload", uploadRouter);
app.use("/api/requestId", requestIdRrouter);
app.use("/api/event", eventRouter);
app.use("/api/announcement", announcementRouter);
const PORT = 3001 || 3002;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}....`);
});
