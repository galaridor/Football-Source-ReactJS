import * as request from "../utils/request";

const baseUrl = "http://localhost:3030/jsonstore/comments";

export const getAllForEntity = async (entityId) => {
	try {
		const result = await request.get(`${baseUrl}/`);

		console.log(Object.values(result));
	
		return Object.values(result).filter(comment => comment.entityId === entityId);
    } 
    catch (error) {
        console.log(error);

        return [];
    }
};

export const create = async (type, entityId, userId, username, text, dateCreated, lastModifiedOn) => {
	try {
		const newComment = await request.post(baseUrl, {type, entityId, userId,username, text, dateCreated, lastModifiedOn});

		return newComment;
    } 
    catch (error) {
        console.log(error);

        return null;
    }
};

export const update = async (_id, type, entityId, userId, username, text, dateCreated, lastModifiedOn) => {
	try {
		const updateDocument = await request.put(`${baseUrl}/${_id}`, {type, entityId, userId, username, text, dateCreated, lastModifiedOn, _id});

		return updateDocument;
    } 
    catch (error) {
        console.log(error);

        return null;
    }
};

export const remove = async (commentId) => {
	try {
		await request.remove(`${baseUrl}/${commentId}`);
    } 
    catch (error) {
        console.log(error);
    }
};