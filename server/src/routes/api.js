const express = require("express");
const launchesRouter = require("./launches/launches.router");
const planatsRouter = require("./planets/planats.router");

const api = express.Router();

api.use("/launches", launchesRouter);
api.use("/planets", planatsRouter);

module.exports = api;
