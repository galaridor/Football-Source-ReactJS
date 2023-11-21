import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { InputTextarea } from "primereact/inputtextarea";
import Comment from "./Comment";
import Picker from "@emoji-mart/react";
import { Button } from "primereact/button";
import { useForm } from "../../hooks/useForm";
import { CommentContext } from "../../contexts/CommentContext";
import EditCommentModal from "./EditCommentModal";
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import * as commentService from "../../services/comentService";
import styles from "./CommentsList.module.css";

const CommentsList = ({ entityId, type }) => {
	const [comments, setComments] = useState([]);
	const [selectedComment, setSelectedComment] = useState(null);
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [showPicker, setShowPicker] = useState(false);
	const { formValues, handleInputChange, resetForm, setForm } = useForm({ text: '' });

	const { authentication } = useContext(AuthenticationContext)

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

	const addCommentHandler = async (e) => {
		e.preventDefault();

		if (formValues.text.trim() === "") {
			return;
		}

		const currentDate = new Date();

		const createdComment = await commentService.create(
			type,
			entityId,
			authentication.username,
			formValues.text,
			currentDate,
			currentDate
		);

		setComments((state) => [...state, createdComment]);
		resetForm();
	};

	const deleteCommentHandler = async (_id) => {
		await commentService.remove(_id);

		setComments((state) =>
			state.filter((comment) => {
				return comment._id !== _id;
			})
		);
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
	};

	const editCommentHandlerClick = (_id) => {
		setSelectedComment(comments.find(comment => comment._id === _id));
		openEditModal();
	};

	const deleteCommentHandlerClick = async (_id) => {
		await deleteCommentHandler(_id);
		closeEditModal();
	};

	const openEditModal = () => {
		setEditModalOpen(true);
	};

	const closeEditModal = () => {
		setEditModalOpen(false);
	};

	const saveEditedCommentHandlerClick = async (comment) => {
		await editCommentHandler(selectedComment?._id, comment, selectedComment?.dateCreated);
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
					<form className={styles["form"]} onSubmit={addCommentHandler}>
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
					comment={selectedComment?.text}
				/>
			</div>
		</CommentContext.Provider>
	);
};

export default CommentsList;