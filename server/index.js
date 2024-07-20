const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());

app.get("/api/get-ip", (req, res) => {
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log(`Client IP address: ${clientIp}`);
  res.json({ ip: clientIp });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
