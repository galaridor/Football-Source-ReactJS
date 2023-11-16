import * as request from "../utils/request";

const baseUrl = "http://localhost:3030/jsonstore/events";

export const getAllUpcominEvent = async () => {

    try {
        const result = await request.get(`${baseUrl}`)
        
        console.log(result);

        return Object.values(result);
    } 
    catch (error) {
        console.log(error);

        return null;
    }
};

export const create = async () => {

    try {
        const result = await request.get(`${baseUrl}`)
        
        console.log(result);

        return result;
    } 
    catch (error) {
        console.log(error);

        return null;
    }
};

export const remove = async () => {

    try {
        const result = await request.get(`${baseUrl}`)
        
        console.log(result);

        return result;
    } 
    catch (error) {
        console.log(error);

        return null;
    }
};

export const update = async () => {

    try {
        const result = await request.get(`${baseUrl}`)
        
        console.log(result);

        return result;
    } 
    catch (error) {
        console.log(error);

        return null;
    }
};

export const getLatestUpcominEvent = async () => {

    try {
        const result = await request.get(`${baseUrl}`)
        
        console.log(result);

        const sortedResult = Object.values(result).sort(function(a, b) {
            return a.startDate.localeCompare(b.startDate);
        })

        return sortedResult;
    } 
    catch (error) {
        console.log(error);

        return null;
    }
};