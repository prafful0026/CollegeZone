const express = require("express");
const app = require("express")();

const server = require("http").Server(app);

const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

require("dotenv").config({ path: "./config.env" });
app.use(express.json());
const connectDb = require("./utilsServer/connectDb.js");
const PORT = process.env.PORT || 3000;
connectDb();

nextApp.prepare().then(() => {
  app.use("/api/signup", require("./api/signup.js"));
  app.use("/api/auth", require("./api/auth.js"));
  app.use("/api/search", require("./api/search.js"));
  app.use("/api/posts", require("./api/posts.js"));

  app.all("*", (req, res) => handle(req, res));

  server.listen(PORT, (err) => {
    if (err) throw err;
    else console.log(`on port ${PORT}`);
  });
});
