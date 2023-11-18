import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import Picker from "@emoji-mart/react";
import Modal from "react-modal";
import styles from "./EditCommentModal.module.css";
import { useForm } from "../../hooks/useForm";

const EditCommentModal = ({ isOpen, onClose, onSave, comment }) => {
	const { formValues, handleInputChange, resetForm, setForm } = useForm({
		text: '',
	});
	const [showPicker, setShowPicker] = useState(false);

	useEffect(() => {
		if (isOpen) {
			resetForm();
			setForm({text: comment});
			document.body.classList.add(styles["modalOpen"]);
		} else {
			document.body.classList.remove(styles["modalOpen"]);
		}

		return () => {
			document.body.classList.remove(styles["modalOpen"]);
		};
	}, [isOpen]);

	const handleEmojiSelect = (emoji) => {
		setForm({ text: formValues.text + emoji.native });
	};

	const saveEditCommentHandler = async (e) => {
		e.preventDefault();
		
		await onSave(formValues.text);

		resetForm();
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
				<form className={styles["form"]} onSubmit={saveEditCommentHandler}>
					<InputTextarea
						rows={5}
						cols={100}
						autoResize
						name="text"
						value={formValues.text}
						onChange={handleInputChange}
					/>
					<div className={styles["buttons-container"]}>
						<Button
							className="p-button-rounded p-button-text p-button-success pi pi-check"
							type="submit"
						/>
						<Button
							className="p-button-rounded p-button-text p-button-secondary pi pi-delete-left"
							onClick={onClose}
						/>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default EditCommentModal;