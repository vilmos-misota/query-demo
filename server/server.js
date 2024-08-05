const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { faker } = require("@faker-js/faker");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

let teams = [];
let players = [];
let teamIdCounter = 1;
let playerIdCounter = 1;

// Generate initial fake data
function generateFakeData() {
  // Generate 5 teams
  for (let i = 0; i < 2; i++) {
    teams.push({
      id: teamIdCounter++,
      name: faker.company.name(),
      city: faker.location.city(),
    });
  }

  // Generate 20 players
  for (let i = 0; i < 10; i++) {
    players.push({
      id: playerIdCounter++,
      name: faker.person.fullName(),
      position: faker.helpers.arrayElement([
        "Forward",
        "Midfielder",
        "Defender",
        "Goalkeeper",
      ]),
      age: faker.number.int({ min: 18, max: 40 }),
      teamId: faker.helpers.arrayElement(teams).id,
    });
  }
}

generateFakeData();

// CRUD operations for teams
app.post("/teams", (req, res) => {
  const newTeam = {
    id: teamIdCounter++,
    name: req.body.name || faker.company.name(),
    city: req.body.city || faker.location.city(),
  };
  teams.push(newTeam);
  res.status(201).json(newTeam);
});

app.get("/teams", (req, res) => {
  res.json(teams);
});

app.get("/teams/:id", (req, res) => {
  const team = teams.find((t) => t.id === parseInt(req.params.id));
  if (!team) return res.status(404).send("Team not found");
  res.json(team);
});

app.put("/teams/:id", (req, res) => {
  const team = teams.find((t) => t.id === parseInt(req.params.id));
  if (!team) return res.status(404).send("Team not found");
  team.name = req.body.name || team.name;
  team.city = req.body.city || team.city;
  res.json(team);
});

app.delete("/teams/:id", (req, res) => {
  const teamIndex = teams.findIndex((t) => t.id === parseInt(req.params.id));
  if (teamIndex === -1) return res.status(404).send("Team not found");
  teams.splice(teamIndex, 1);
  res.status(204).send();
});

// Get team roster
app.get("/teams/:id/roster", (req, res) => {
  const teamId = parseInt(req.params.id);
  const team = teams.find((t) => t.id === teamId);
  if (!team) return res.status(404).send("Team not found");

  const roster = players.filter((p) => p.teamId === teamId);
  res.json(roster);
});

// CRUD operations for players
app.post("/players", (req, res) => {
  const newPlayer = {
    id: playerIdCounter++,
    name: req.body.name || faker.person.fullName(),
    position:
      req.body.position ||
      faker.helpers.arrayElement([
        "Forward",
        "Midfielder",
        "Defender",
        "Goalkeeper",
      ]),
    age: req.body.age || faker.number.int({ min: 18, max: 40 }),
    teamId: req.body.teamId || faker.helpers.arrayElement(teams).id,
  };
  players.push(newPlayer);
  res.status(201).json(newPlayer);
});

app.get("/players", (req, res) => {
  res.json(players);
});

app.get("/players/:id", (req, res) => {
  const player = players.find((p) => p.id === parseInt(req.params.id));
  if (!player) return res.status(404).send("Player not found");
  res.json(player);
});

app.put("/players/:id", (req, res) => {
  const player = players.find((p) => p.id === parseInt(req.params.id));
  if (!player) return res.status(404).send("Player not found");
  player.name = req.body.name || player.name;
  player.position = req.body.position || player.position;
  player.age = req.body.age || player.age;
  player.teamId = req.body.teamId || player.teamId;
  res.json(player);
});

app.delete("/players/:id", (req, res) => {
  const playerIndex = players.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (playerIndex === -1) return res.status(404).send("Player not found");
  players.splice(playerIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
