import TeamsParams from "../models/teams-models";
import teams from "../repositories/teams-repository";

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