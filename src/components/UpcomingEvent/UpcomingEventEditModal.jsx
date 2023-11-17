import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./UpcomingEventEditModal.module.css";

const UpcomingEventEditModal = ({ isOpen, onClose, onSave, currentEvent }) => {
	const [formData, setFormData] = useState({});

	useEffect(() => {
		if (isOpen) {
			setFormData({
				_id: currentEvent._id,
				name: currentEvent.name,
				description: currentEvent.description,
				startDate: currentEvent.startDate,
				imageUrl: currentEvent.imageUrl,
			})
			document.body.classList.add(styles["modalOpen"]);
		} else {
			document.body.classList.remove(styles["modalOpen"]);
		}

		return () => {
			document.body.classList.remove(styles["modalOpen"]);
		};
	}, [isOpen]);

	const saveEditEventHandler = async (e) => {
		e.preventDefault();

		await onSave(formData);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleImageInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	}

	const handleDateChange = (e) => {
		setFormData({
			...formData,
			startDate: e.value,
		});
	};

	return (
		<Modal
			className={styles["modal"]}
			isOpen={isOpen}
			onRequestClose={onClose}
			ariaHideApp={false}
		>
			<div className="edit-event-section">
				<h3 className={styles["edit-event-title"]}>Edit {currentEvent?.name}</h3>
				<form className={styles['edit-event-form']} onSubmit={saveEditEventHandler}>
					<div className="p-fluid">
						<div className="p-field">
							<label htmlFor="name">Event Name:</label>
							<InputText
								id="name"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
							/>
						</div>

						<div className="p-field">
							<label htmlFor="description">Description:</label>
							<InputTextarea
								id="description"
								name="description"
								rows={5}
								cols={100}
								autoResize
								value={formData.description}
								onChange={handleInputChange}
							/>
						</div>

						<div className="p-field">
							<label htmlFor="startDate">Start Date:</label>
							<Calendar
								id="startDate"
								name="startDate"
								value={formData.startDate}
								onChange={handleDateChange}
							/>
						</div>

						<div className="p-field">
							<label htmlFor="imageUrl">Image Url:</label>
							<InputText
								id="imageUrl"
								name="imageUrl"
								value={formData.imageUrl}
								onChange={handleImageInputChange}
							/>
						</div>
					</div>
					<span>
						<Button
							icon="pi pi-check"
							className="p-button-rounded p-button-text"
							type="submit"
						/>
						<Button
							icon="pi pi-times"
							className="p-button-rounded p-button-text p-button-danger"
							onClick={onClose}
						/>
					</span>
				</form>
			</div>
		</Modal>
	);
};

export default UpcomingEventEditModal;