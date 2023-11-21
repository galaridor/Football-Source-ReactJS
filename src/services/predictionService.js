import * as request from "../utils/request";

const baseUrl = "http://localhost:3030/data/predictions";

export const getAllPredictions = async () => {

    try {
        const result = await request.get(`${baseUrl}`);
        
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

export const create = async (name, imageUrl, description, startDate) => {

    try {
        const newEvent = await request.post(baseUrl, {name, imageUrl, description, startDate});
        
        console.log(newEvent);

        return newEvent;
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

export const update = async (_id, name, imageUrl, description, startDate) => {

    try {
		const updatedEvent = await request.put(`${baseUrl}/${_id}`, {name, imageUrl, description, startDate, _id});

		return updatedEvent;
    } 
    catch (error) {
        console.log(error);

        return null;
    }
};