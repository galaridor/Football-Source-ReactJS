import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { useContext, useEffect, useState } from "react";
import { formatDateToIsoDate } from "../../utils/dateTimeUtils";
import Modal from "react-modal";
import styles from "./PredictionEditModal.module.css";
import { useForm } from "../../hooks/useForm";
import { PredictionContext } from "../../contexts/PredictionContext";

const PredictionEditModal = ({ isOpen, currentPrediction }) => {
	const { closeEditModal, saveEditedPredictionHandler } = useContext(PredictionContext);
	const { formValues, handleInputChange, handleSubmit, resetForm, setForm } = useForm(currentPrediction, saveEditedPredictionHandler);

	useEffect(() => {
		if (isOpen) {

			resetForm();
			setForm(currentPrediction);

			document.body.classList.add(styles["modalOpen"]);
		} else {
			document.body.classList.remove(styles["modalOpen"]);
		}

		return () => {
			document.body.classList.remove(styles["modalOpen"]);
		};
	}, [isOpen, currentPrediction]);

	return (
		<Modal
			className={styles["modal"]}
			isOpen={isOpen}
			onRequestClose={closeEditModal}
			ariaHideApp={false}
		>
			<div className="edit-prediction-section">
				<h3 className={styles["edit-prediction-title"]}>Edit Prediction</h3>
				<form className={styles['edit-prediction-form']} onSubmit={handleSubmit}>
					<div>
						<Button
							icon="pi pi-check"
							className="p-button-rounded p-button-text"
							type="submit"
						/>
						<Button
							icon="pi pi-times"
							className="p-button-rounded p-button-text p-button-danger"
							onClick={closeEditModal}
						/>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default PredictionEditModal;