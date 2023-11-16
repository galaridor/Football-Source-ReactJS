import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import Picker from "@emoji-mart/react";
import Modal from "react-modal";
import styles from "./EditCommentModal.module.css";

const EditCommentModal = ({ isOpen, onClose, onSave, comment }) => {
	const [editedComment, setEditeComment] = useState(comment);
	const [showPicker, setShowPicker] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add(styles["modalOpen"]);
		} else {
			document.body.classList.remove(styles["modalOpen"]);
		}

		return () => {
			document.body.classList.remove(styles["modalOpen"]);
		};
	}, [isOpen]);

	const handleEmojiSelect = (emoji) => {
		setEditeComment((prevComment) => prevComment + emoji.native);
	};

	const editCommentHandler = (e) => {
		setEditeComment(e.target.value);
	};

	const saveEditCommentHandler = async (e) => {
		e.preventDefault();
		await onSave(editedComment);
	};

	return (
		<Modal
			className={styles["modal"]}
			isOpen={isOpen}
			onRequestClose={onClose}
			ariaHideApp={false}
		>
			<div className="edit-comment-section">
				<h3 className={styles["edit-comment-title"]}>Edit Comment</h3>
				<div className={styles["emoji-section"]}>
					<label>Emojis: </label>
					<button onClick={() => setShowPicker(!showPicker)}>😊</button>
				</div>
				{showPicker && (
					<div className={styles["emoji-picker-container"]}>
						<Picker onEmojiSelect={handleEmojiSelect} />
					</div>
				)}
				<InputTextarea
					rows={5}
					cols={100}
					autoResize
					value={editedComment}
					onChange={editCommentHandler}
				/>
				<div className={styles["buttons-container"]}>
					<Button
						className="p-button-rounded p-button-text p-button-success pi pi-check"
						onClick={saveEditCommentHandler}
					/>
					<Button
						className="p-button-rounded p-button-text p-button-secondary pi pi-delete-left"
						onClick={onClose}
					/>
				</div>
			</div>
		</Modal>
	);
};

export default EditCommentModal;