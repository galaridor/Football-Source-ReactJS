import * as request from "../utils/request";

const baseUrl = "http://localhost:3456/teams";

export const getAllTeams = async () => {

    try {
        const limit = 500;

        const result = await request.get(`${baseUrl}/all/${limit}`);

        console.log(result);

        return result;
    } 
    catch (error) {
        console.log(error);

        return [];
    }
};

export const getTeamById = async (id) => {

    try {
        const result = await request.get(`${baseUrl}/${id}`);

        console.log(result);

        return result;
    } 
    catch (error) {
        console.log(error);

        return [];
    }
};

export const getTeamMatchesById = async (id) => {

    try {
        const result = await request.get(`${baseUrl}/${id}/matches`);

        console.log(result);

        return result;
    } 
    catch (error) {
        console.log(error);

        return [];
    }
};