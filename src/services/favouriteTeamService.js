import * as request from "../utils/request";

const baseUrl = "http://localhost:3030/data/favouriteTeams";

export const getFavouriteTeamsForUser = async (userId) => {

    try {
        const query = new URLSearchParams({
            where: `_ownerId="${userId}"`
        })

        const result = await request.get(`${baseUrl}?${query}`);
        
        if (result.code){
            throw new Error(result.message)
        }

        console.log(result);

        return result;
    } 
    catch (error) {
        console.log(error);

        return null;
    }
};

export const create = async (teamId, teamName, teamCrest, teamCompetitionAlias, teamCompetitonName, teamCompetitionEmblem, description) => {

    try {
        const newFavouriteTeam = await request.post(baseUrl, {teamId, teamName, teamCrest, teamCompetitionAlias, teamCompetitonName, teamCompetitionEmblem, description});
        
        console.log(newFavouriteTeam);

        return newFavouriteTeam;
    } 
    catch (error) {
        console.log(error);

        return null;
    }
};

export const remove = async (_id) => {
    try {
        await request.remove(`${baseUrl}/${_id}`);
    } 
    catch (error) {
        console.log(error);

        return null;
    }
};

export const update = async (_id, teamId, teamName, teamCrest, teamCompetitionAlias, teamCompetitonName, teamCompetitionEmblem, description) => {

    try {
		const updatedFavouriteTeam = await request.put(`${baseUrl}/${_id}`, {teamId, teamName, teamCrest, teamCompetitionAlias, teamCompetitonName, teamCompetitionEmblem, description, _id});

		return updatedFavouriteTeam;
    } 
    catch (error) {
        console.log(error);

        return null;
    }
};