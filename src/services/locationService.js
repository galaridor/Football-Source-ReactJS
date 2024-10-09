import * as request from "../utils/request";

const baseUrl = "https://api.opencagedata.com/geocode/v1/json";
const apiKey = 'e88cbacd684142209a5d8d88e82544f1';

export const getLocationByAddress = async (address) => {

    try {
        const result = await request.get(`${baseUrl}?q=${address}&key=${apiKey}`)

        return result;
    } 
    catch (error) {
        console.log(error);

        return null;
    }
};