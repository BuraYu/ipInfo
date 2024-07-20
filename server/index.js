const express = require("express");
const axios = require("axios");
const app = express();
const port = 3001;

app.get("/api/ipinfo", (req, res) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const ipAddress = "2003:d0:973b:4a32:180:57c0:a603:2e27";

  axios
    .get(
      `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}&ip_address=${ipAddress}`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
