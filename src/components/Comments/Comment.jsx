import { Card } from "primereact/card";
import { Button } from "primereact/button";
import EditCommentModal from "./EditCommentModal";
import { formatUTCDateToLocal } from "../../utils/dateTimeUtils";
import styles from "./Comment.module.css";
import { useState } from "react";

const Comment = ({
	_id,
	username,
	text,
	dateCreated,
	lastModifiedOn,
	onDelete,
	onEdit,
}) => {
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [currentComment, setCurrentCOment] = useState(text);

	const editCommentHandler = () => {
		openEditModal();
	};

	const deleteCommentHandler = async () => {
		await onDelete(_id);
	};

	const openEditModal = () => {
		setEditModalOpen(true);
	};

	const closeEditModal = () => {
		setEditModalOpen(false);
	};

	const saveEditedCommentHandler = async (comment) => {
		closeEditModal();
		setCurrentCOment(comment);
		await onEdit(_id, comment, dateCreated);
	};

	const cardFooter = (
		<span>
			<Button
				icon="pi pi-pencil"
				className="p-button-rounded p-button-text"
				onClick={editCommentHandler}
			/>
			<Button
				icon="pi pi-trash"
				className="p-button-rounded p-button-text p-button-danger"
				onClick={deleteCommentHandler}
			/>
		</span>
	);

	return (
		<div className={styles["comment-section"]}>
			<Card
				className={[styles["comment-card"]]}
				title={`User: ${username} (${_id})`}
				subTitle={`Created On: ${formatUTCDateToLocal(dateCreated)}`}
				footer={cardFooter}
			>
				<p>{text}</p>
				<small>Last Modified On: {formatUTCDateToLocal(lastModifiedOn)}</small>
			</Card>
			<EditCommentModal
				isOpen={isEditModalOpen}
				onClose={closeEditModal}
				onSave={saveEditedCommentHandler}
				comment={currentComment}
			/>
		</div>
	);
};

export default Comment;