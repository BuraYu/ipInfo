const express = require("express");
const cors = require("cors");
const userAgentParser = require("user-agent-parser");

const app = express();
app.use(cors());

app.get("/api/get-info", (req, res) => {
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const parsedUserAgent = userAgentParser(userAgent);

  const info = {
    ip: clientIp,
    browser: parsedUserAgent.browser,
    os: parsedUserAgent.os,
    device: parsedUserAgent.device,
    language: req.headers["accept-language"],
    referrer: req.headers["referer"] || "Direct",
  };

  console.log(`Client Info:`, info);

  res.json(info);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
