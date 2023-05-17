const errorMiddleware = (err, req, res, next) => {
  switch (err.status) {
    case 400:
      res.status(400).json({ error: "Bad Request" });
      break;
    case 401:
      res.status(401).json({ error: "Unauthorized" });
      break;
    case 404:
      res.status(404).json({ error: "Not Found" });
      break;
    case 500:
      res.status(500).json({ error: "Internal Server Error" });
      break;
    default:
      res.status(500).json({ error: "Something went wrong" });
      break;
  }
};

module.exports = errorMiddleware;
