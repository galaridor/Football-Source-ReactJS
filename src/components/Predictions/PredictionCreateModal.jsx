import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { useContext, useEffect  } from "react";
import Modal from "react-modal";
import { PredictionContext } from "../../contexts/PredictionContext";
import styles from "./PredictionCreateModal.module.css";
import { useForm } from "../../hooks/useForm";

const PredictionCreateModal = ({ isOpen }) => {
    const { closeCreateModal, saveNewPredictionHandler } = useContext(PredictionContext);
    const { formValues, handleInputChange, handleSubmit, resetForm } = useForm({
        name: '',
        description: '',
        startDate: '',
        imageUrl: '',
    }, saveNewPredictionHandler);

    useEffect(() => {
        if (isOpen) {

            resetForm();

            document.body.classList.add(styles["modalOpen"]);
        } else {
            document.body.classList.remove(styles["modalOpen"]);
        }

        return () => {
            document.body.classList.remove(styles["modalOpen"]);
        };
    }, [isOpen]);
 
    return (
        <Modal
            className={styles["modal"]}
            isOpen={isOpen}
            onRequestClose={closeCreateModal}
            ariaHideApp={false}
        >
            <div className="create-prediction-section">
                <h3 className={styles["create-prediction-title"]}>Create New Prediction</h3>
                <form className={styles['create-prediction-form']} onSubmit={handleSubmit}>
                    <div>
                        <Button
                            icon="pi pi-check"
                            className="p-button-rounded p-button-text"
                            type="submit"
                        />
                        <Button
                            icon="pi pi-times"
                            className="p-button-rounded p-button-text p-button-danger"
                            onClick={closeCreateModal}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default PredictionCreateModal;