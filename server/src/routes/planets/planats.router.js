const express = require("express");
const { httpGetAllPlanats } = require("./planats.controller");

const planatsRouter = express.Router();

planatsRouter.get("/", httpGetAllPlanats);

module.exports = planatsRouter;
