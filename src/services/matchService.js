const baseUrl = "http://localhost:3456/matches";

export const getMatches = async () => {

    try {
        const response = await fetch(`${baseUrl}`);

        const result = await response.json();

        console.log(result);

        return result;
    } 
    catch (error) {
        console.log(error);

        return [];
    }
};

export const getMatchById = async (id) => {

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

export const getMatchHeadToHeadById = async (id) => {

    try {
        const response = await fetch(`${baseUrl}/${id}/headtohead`);

        const result = await response.json();

        console.log(result);

        return result;
    } 
    catch (error) {
        console.log(error);

        return [];
    }
};