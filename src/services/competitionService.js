import * as request from "../utils/request";

const baseUrl = "http://localhost:3456/competitions";

export const getAllCompetitions = async () => {

    try {
        const result = await request.get(baseUrl);

        console.log(result);

        return result;
    } 
    catch (error) {
        console.log(error);

        return [];
    }
};

export const getCompetitionByAlias = async (alias) => {

    try {
        const result = await request.get(`${baseUrl}/${alias}`);

        console.log(result);

        return result;
    } 
    catch (error) {
        console.log(error);

        return [];
    }
};

export const getCompetitionStandingsByAlias = async (alias) => {

    try {
        const result = await request.get(`${baseUrl}/${alias}/standings`);

        console.log(result);

        return result;
    } 
    catch (error) {
        console.log(error);

        return [];
    }
};

export const getCompetitionMatchesByAlias = async (alias) => {

    try {
        const result = await request.get(`${baseUrl}/${alias}/matches`);

        console.log(result);

        return result;
    } 
    catch (error) {
        console.log(error);

        return [];
    }
};

export const getCompetitionMatchesByAliasFiltered = async (alias, dateFrom, dateTo) => {
    try {
        const result = await request.get(`${baseUrl}/${alias}/matches/filter/${dateFrom}/${dateTo}`);

        console.log(result);

        return result;
    } 
    catch (error) {
        console.log(error);

        return [];
    }
};

export const getCompetitionTeamsByAlias = async (alias) => {

    try {
        const result = await request.get(`${baseUrl}/${alias}/teams`);

        console.log(result);

        return result;
    } 
    catch (error) {
        console.log(error);

        return [];
    }
};

export const getCompetitionTopScorersByAlias = async (alias, limit) => {

    try {
        const result = await request.get(`${baseUrl}/${alias}/scorers/${limit}`);

        console.log(result);

        return result;
    } 
    catch (error) {
        console.log(error);

        return [];
    }
};