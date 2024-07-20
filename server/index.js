const http = require("http");

const server = http.createServer((req, res) => {
  const clientIp = req.socket.remoteAddress;

  console.log(`Client IP address: ${clientIp}`);

  res.writeHead(200, { "Content-Type": "text/plain" });

  res.end("Hello, your IP address has been logged.");
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
