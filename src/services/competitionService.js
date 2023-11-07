const baseUrl = "http://localhost:3456/competitions";

export const getAllCompetitions = async () => {

    try {
        const response = await fetch(baseUrl);

        const result = await response.json();

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
        const response = await fetch(`${baseUrl}/${alias}`);

        const result = await response.json();

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
        const response = await fetch(`${baseUrl}/${alias}/standings`);

        const result = await response.json();

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
        const response = await fetch(`${baseUrl}/${alias}/matches`);

        const result = await response.json();

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
        const response = await fetch(`${baseUrl}/${alias}/teams`);

        const result = await response.json();

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
        const response = await fetch(`${baseUrl}/${alias}/scorers/${limit}`);

        const result = await response.json();

        console.log(result);

        return result;
    } 
    catch (error) {
        console.log(error);

        return [];
    }
};