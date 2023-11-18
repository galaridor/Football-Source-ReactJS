import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { formatUTCDateToLocal } from "../../utils/dateTimeUtils";
import { useContext } from "react";
import { CommentContext } from "../../contexts/CommentContext";
import styles from "./Comment.module.css";

const Comment = ({
	_id,
	username,
	text,
	dateCreated,
	lastModifiedOn,
}) => {
	const { editCommentHandlerClick, deleteCommentHandlerClick } = useContext(CommentContext);

	const cardFooter = (
		<div>
			<Button
				icon="pi pi-pencil"
				className="p-button-rounded p-button-text"
				onClick={()=> {editCommentHandlerClick(_id)}}
			/>
			<Button
				icon="pi pi-trash"
				className="p-button-rounded p-button-text p-button-danger"
				onClick={()=> {deleteCommentHandlerClick(_id)}}
			/>
		</div>
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
		</div>
	);
};

export default Comment;