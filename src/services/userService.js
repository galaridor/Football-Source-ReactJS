import * as request from "../utils/request";

const baseUrl = "http://localhost:3030/jsonstore/users";

export const getAllUsers = async () => {

    try {
        const result = await request.get(`${baseUrl}`);
        
        console.log(result);

        return Object.values(result);
    } 
    catch (error) {
        console.log(error);

        return null;
    }
};

export const create = async (username, email, password, dateOfBirth, age, isAdmin, imageUrl) => {

    try {
        const newEvent = await request.post(baseUrl, {username, email, password, dateOfBirth, age, isAdmin, imageUrl});
        
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

export const update = async (_id, username, email, password, dateOfBirth, age, isAdmin, imageUrl) => {

    try {
		const updatedEvent = await request.put(`${baseUrl}/${_id}`, {username, email, password, dateOfBirth, age, isAdmin, imageUrl, _id});

		return updatedEvent;
    } 
    catch (error) {
        console.log(error);

        return null;
    }
};