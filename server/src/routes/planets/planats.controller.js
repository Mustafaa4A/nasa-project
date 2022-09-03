const { getAllPlanats } = require("../../models/planets.model");

async function httpGetAllPlanats(req, res) {
  return res.status(200).json(await getAllPlanats());
}

module.exports = {
  httpGetAllPlanats,
};
