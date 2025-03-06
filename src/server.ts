import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import teams from "./services/teams-service";

const server = fastify({ logger: true });

server.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "DELETE"],
});


const drivers = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 2, name: "Lewis Hamilton", team: "Mercedes" },
  { id: 3, name: "Charles Leclerc", team: "Ferrari" },
  { id: 4, name: "George Russell", team: "Mercedes" },
  { id: 5, name: "Lando Norris", team: "McLaren" },
  { id: 6, name: "Sebastian Vettel", team: "Aston Martin" },
  { id: 7, name: "Valtteri Bottas", team: "Alfa Romeo" },
  { id: 8, name: "Pierre Gasly", team: "AlphaTauri" },
  { id: 9, name: "Daniil Kvyat", team: "Haas" },
  { id: 10, name: "Alexander Albon", team: "Williams" },
];

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);

  return [teams];
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);
  return [drivers];
});

interface DriverParams {
  id: string;
}


//services
server.get<{ Params: DriverParams }>(
  "/drivers/:id",
  async (request, response) => {
    const driverId = parseInt(request.params.id);
    const driver = drivers.find((driver) => driver.id === driverId);

    if (!driver) {
      response.type("application/json").code(404);
      return { message: "Driver not found" };
    } else {
      response.type("application/json").code(200);
      return { driver };
    }
  }
);

server.get<{ Params: TeamsParams }>(
    "/teams/:id",
    async (request, response) => {
      const teamId = parseInt(request.params.id);
      const team = teams.find((team) => team.id === teamId);
  
      if (!team) {
        response.type("application/json").code(404);
        return { message: "Team not found" };
      } else {
        response.type("application/json").code(200);
        return { team };
      }
    }
  );

server.listen({ port: 3333 }, () => {
  console.log("Server init on port 3333");
});

export default server;
