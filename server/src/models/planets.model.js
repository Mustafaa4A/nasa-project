const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const planets = require("./planets.mongo");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanets() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          savaPlanets(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject();
      })
      .on("end", async () => {
        const count = (await getAllPlanats()).length;
        console.log(`${count} habitable planets found!`);
        resolve();
      });
  });
}

async function getAllPlanats() {
  return await planets.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function savaPlanets(planet) {
  try {
    await planets.updateOne(
      {
        kepler_name: planet.kepler_name,
      },
      {
        kepler_name: planet.kepler_name,
      },
      { upsert: true }
    );
  } catch (error) {
    console.error(`Planets not saved ${error}`);
  }
}

module.exports = { loadPlanets, getAllPlanats };
