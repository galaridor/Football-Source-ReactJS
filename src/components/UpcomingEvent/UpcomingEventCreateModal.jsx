import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./UpcomingEventCreateModal.module.css";
import { useForm } from "../../hooks/useForm";

const UpcomingEventCreateModal = ({ isOpen, onClose, onSave }) => {
    const { formValues, handleInputChange, resetForm } = useForm({
        name: '',
        description: '',
        startDate: '',
        imageUrl: '',
    });

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

    const saveNewEventHandler = async (e) => {
        e.preventDefault();

        await onSave(formValues);
    };

    return (
        <Modal
            className={styles["modal"]}
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
        >
            <div className="create-event-section">
                <h3 className={styles["create-event-title"]}>Create New Upcoming Event</h3>
                <form className={styles['create-event-form']} onSubmit={saveNewEventHandler}>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="name">Event Name:</label>
                            <InputText
                                id="name"
                                name="name"
                                value={formValues.name}
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
                                value={formValues.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="p-field">
                            <label htmlFor="startDate">Start Date:</label>
                            <Calendar
                                id="startDate"
                                name="startDate"
                                value={formValues.startDate}
                                onChange={handleInputChange}
                                dateFormat="dd/mm/yy"
                            />
                        </div>

                        <div className="p-field">
                            <label htmlFor="imageUrl">Image Url:</label>
                            <InputText
                                id="imageUrl"
                                name="imageUrl"
                                value={formValues.imageUrl}
                                onChange={handleInputChange}
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

export default UpcomingEventCreateModal;