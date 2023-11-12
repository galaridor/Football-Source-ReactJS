const baseUrl = "http://localhost:3456/teams";

export const getAllTeams = async () => {

    try {
        const limit = 500;

        const response = await fetch(`${baseUrl}/all/${limit}`);

        const result = await response.json();

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
        const response = await fetch(`${baseUrl}/${id}`);

        const result = await response.json();

        console.log(result);

        return result;
    } 
    catch (error) {
        console.log(error);

        return [];
    }
};