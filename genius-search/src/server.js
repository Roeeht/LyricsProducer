const express = require("express");
const cors = require("cors"); // Import cors
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors()); // Use cors middleware

app.use(
  "/api/genius",
  createProxyMiddleware({
    target: "https://api.genius.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api/genius": "",
    },
  })
);

app.listen(5000, () => {
  console.log("Proxy server running on http://localhost:5000");
});
