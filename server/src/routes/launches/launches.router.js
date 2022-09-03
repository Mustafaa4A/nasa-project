const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpApportLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);
launchesRouter.delete("/:id", httpApportLaunch);

module.exports = launchesRouter;
