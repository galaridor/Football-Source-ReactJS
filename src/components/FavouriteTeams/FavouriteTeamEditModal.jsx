import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useContext, useEffect } from "react";
import Modal from "react-modal";
import { FavouriteTeamContext } from "../../contexts/FavouriteTeamContext";
import { useForm } from "../../hooks/useForm";
import styles from "./FavouriteTeamEditModal.module.css";
import { Card } from "primereact/card";

const FavouriteTeamEditModal = ({ isOpen, team }) => {
	debugger;
	const { formValues, handleInputChange, resetForm, setForm } = useForm(team);
	const { saveEditedFavouriteTeamHandlerClick, closeEditModal, cardHeader, cardSubtitle } = useContext(FavouriteTeamContext);

	useEffect(() => {
		if (isOpen) {

			resetForm();
			setForm(team);

			document.body.classList.add(styles["modalOpen"]);
		} else {
			document.body.classList.remove(styles["modalOpen"]);
		}

		return () => {
			document.body.classList.remove(styles["modalOpen"]);
		};
	}, [isOpen, team]);

	const saveEditFavouriteTeamHandler = async (e) => {
		e.preventDefault();

		await saveEditedFavouriteTeamHandlerClick(formValues);
	};

	return (
		<Modal
			className={styles["modal"]}
			isOpen={isOpen}
			onRequestClose={closeEditModal}
			ariaHideApp={false}
		>
			<div className="edit-favourite-team-section">
				<h3 className={styles["edit-favourite-team-title"]}>Edit Favourite Team</h3>
				<form className={styles["form"]} onSubmit={saveEditFavouriteTeamHandler}>
					<div className={`${styles['card-container']}`} key={team?.teamId}>
						<Card className={`${styles['card']}`} subTitle={cardSubtitle(team)} header={cardHeader(team)} title={team?.teamName}>
							<div className={styles['card-content']}>
								<div className="p-field">
									<label htmlFor="description">Description:</label>
									<InputTextarea
										rows={5}
										cols={100}
										autoResize
										id="description"
										name="description"
										value={formValues?.description}
										onChange={handleInputChange}
									/>
								</div>
							</div>
						</Card>
					</div>
					<div className={styles["buttons-container"]}>
						<Button
							className="p-button-rounded p-button-text p-button-success pi pi-check"
							type="submit"
						/>
						<Button
							className="p-button-rounded p-button-text p-button-secondary pi pi-delete-left"
							onClick={closeEditModal}
						/>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default FavouriteTeamEditModal;