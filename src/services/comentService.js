import * as request from "../utils/request";

const baseUrl = "http://localhost:3030/jsonstore/comments";

export const getAllForEntity = async (entityId) => {
	try {
		const result = await request.get(`${baseUrl}/`);

		console.log(result);
	
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

export const update = async (commentId, text, dateModified) => {
	try {
		const updateDcomment = await request.put(baseUrl);

		return updateDcomment;
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