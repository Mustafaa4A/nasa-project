const http = require("http");
require("dotenv").config();
const app = require("./app");
const { mongoConnect } = require("./services/mongodb");
const { loadPlanets } = require("./models/planets.model");
const { loadLaunchData } = require("./models/launches.model");

const PORT = process.env.PORT || 3300;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanets();
  await loadLaunchData();
  server.listen(PORT, () => {
    console.log(`sercer is running on port ${PORT}`);
  });
}

startServer();
