const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

require("dotenv").config();

const app = require("./app");

const connectToDb = require("./src/config/database");

connectToDb();
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
