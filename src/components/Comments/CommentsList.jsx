import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { InputTextarea } from "primereact/inputtextarea";
import Comment from "./Comment";
import Picker from "@emoji-mart/react";
import { Button } from "primereact/button";
import { useForm } from "../../hooks/useForm";
import { CommentContext } from "../../contexts/CommentContext";
import EditCommentModal from "./EditCommentModal";
import { useModal } from "../../hooks/useModal";

import AuthenticationContext from '../../contexts/AuthenticationContext';
import * as commentService from "../../services/comentService";

import styles from "./CommentsList.module.css";
import DeleteModal from "../Modals/DeleteModal";

const CommentsList = ({ entityId, type }) => {
	const [comments, setComments] = useState([]);
	const {
		setSelectedItem,
		openEditModal,
		closeEditModal,
		openDeleteModal,
		closeDeleteModal,
		selectedItem,
		isEditModalOpen,
		isDeleteModalOpen
	} = useModal()
	const [showPicker, setShowPicker] = useState(false);

	const { authentication, showSuccess } = useContext(AuthenticationContext)

	const navigate = useNavigate();

	useEffect(() => {
		commentService
			.getAllForEntity(entityId)
			.then((result) => {
				if (result.error)
					throw new Error(result.error);

				setComments(result);
			})
			.catch((error) => {
				console.log(error);
				navigate(`/error`);
			});
	}, [entityId]);

	const handleEmojiSelect = (emoji) => {
		setForm({ text: formValues.text + emoji.native });
	};

	const addCommentHandler = async (values) => {

		if (values.text.trim() === "") {
			return;
		}

		const currentDate = new Date();

		const createdComment = await commentService.create(
			type,
			entityId,
			authentication.username,
			values.text,
			currentDate,
			currentDate
		);

		setComments((state) => [...state, createdComment]);
		resetForm();

		showSuccess('Successfully added comment');
	};

	const { formValues, handleInputChange, resetForm, setForm, handleSubmit } = useForm({ text: '' }, addCommentHandler);

	const deleteCommentHandler = async (_id) => {
		await commentService.remove(_id);

		setComments((state) =>
			state.filter((comment) => {
				return comment._id !== _id;
			})
		);

		closeDeleteModal();

		showSuccess('Successfully deleted comment');
	};

	const editCommentHandler = async (_id, text, dateCreated) => {
		const currentDate = new Date();

		const updatedComment = await commentService.update(
			_id,
			type,
			entityId,
			authentication._id,
			authentication.username,
			text,
			dateCreated,
			currentDate
		);

		setComments((prevComments) =>
			prevComments.map((comment) =>
				comment._id === _id
					? {
						...comment,
						text: updatedComment.text,
						lastModifiedOn: updatedComment.lastModifiedOn,
					}
					: comment
			)
		);

		showSuccess('Successfully edited comment');
	};

	const editCommentHandlerClick = (_id) => {
		setSelectedItem(comments.find(comment => comment._id === _id));

		openEditModal();
	};

	const deleteCommentHandlerClick = async (_id) => {
		setSelectedItem(comments.find(comment => comment._id === _id));

		openDeleteModal();
	};

	const saveEditedCommentHandlerClick = async (comment) => {
		await editCommentHandler(selectedItem?._id, comment, selectedItem?.dateCreated);

		closeEditModal();
	};

	const commentContextValue = {
		saveEditedCommentHandlerClick,
		editCommentHandlerClick,
		deleteCommentHandlerClick,
		closeEditModal
	};

	return (
		<CommentContext.Provider value={commentContextValue}>
			<div className={styles["comments-section"]}>
				<h1 className={styles["comments-title"]}>All Comments</h1>
				{comments.map((comment) => (
					<Comment
						key={comment._id}
						{...comment}
					/>
				))}
				<div className={styles["create-comment"]}>
					<label>Add new comment:</label>
					<div className={styles["emoji-section"]}>
						<label>Emojis: </label>
						<button onClick={() => setShowPicker(!showPicker)}>😊</button>
					</div>
					{showPicker && (
						<div className={styles["emoji-picker-container"]}>
							<Picker onEmojiSelect={handleEmojiSelect} />
						</div>
					)}
					<form className={styles["form"]} onSubmit={handleSubmit}>
						<InputTextarea
							rows={5}
							cols={100}
							autoResize
							name="text"
							value={formValues.text}
							onChange={handleInputChange}
							placeholder="Comment......"
						/>
						<div>
							<Button
								label=" Add Comment"
								type="submit"
								className="pi pi-plus p-button p-button-raised p-button-success"
							/>
						</div>
					</form>
				</div>
				<EditCommentModal
					isOpen={isEditModalOpen}
					comment={selectedItem?.text}
				/>
				<DeleteModal 
					isOpen={isDeleteModalOpen}
					closeDeleteModal={closeDeleteModal}
					onConfirm={deleteCommentHandler}
					_id={selectedItem?._id}
				/>
			</div>
		</CommentContext.Provider>
	);
};

export default CommentsList;