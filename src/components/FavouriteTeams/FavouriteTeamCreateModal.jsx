import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { FavouriteTeamContext } from "../../contexts/FavouriteTeamContext";
import styles from "./FavouriteTeamCreateModal.module.css";
import { useForm } from "../../hooks/useForm";
import { ListBox } from "primereact/listbox";
import * as competitionService from "../../services/competitionService";

const FavouriteTeamCreateModal = ({ isOpen }) => {
    const [competitions, setCompetitions] = useState([]);
    const [teams, setTeams] = useState([]);

    const { formValues, handleInputChange, resetForm } = useForm({
        competition: null,
        team: null,
        description: '',
    });

    useEffect(() => {
        competitionService
            .getAllCompetitions()
            .then((result) => {
                if (result.error)
                    throw new Error(result.error);

                setCompetitions(result.competitions);
            })
            .catch((error) => {
                console.log(error);
                navigate(`/error`);
            });
    }, [])

    useEffect(() => {
        if (formValues?.competition) {
            competitionService.getCompetitionTeamsByAlias(formValues.competition.code)
                .then((result) => {
                    if (result.error)
                        throw new Error(result.error);

                    setTeams(result.teams);
                })
                .catch((error) => {
                    console.log(error);
                    navigate(`/error`);
                });
        }
    }, [formValues.competition])


    const { closeCreateModal, saveNewFavouriteTeamHandler } = useContext(FavouriteTeamContext);

    useEffect(() => {
        if (isOpen) {

            resetForm();
            setTeams(null);

            document.body.classList.add(styles["modalOpen"]);
        } else {
            document.body.classList.remove(styles["modalOpen"]);
        }

        return () => {
            document.body.classList.remove(styles["modalOpen"]);
        };
    }, [isOpen]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        debugger;
        await saveNewFavouriteTeamHandler(formValues);
    };

    const competitionsTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt="Missing Image" src={option.emblem} className="flag" style={{ width: '1.25rem', marginRight: '.5rem' }}/>
                <div>{option.name}</div>
            </div>
        );
    };

    const teamsTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt="Missing Image" src={option.crest} className="flag" style={{ width: '1.25rem', marginRight: '.5rem' }}/>
                <div>{option.name}</div>
            </div>
        );
    };

    return (
        <Modal
            className={styles["modal"]}
            isOpen={isOpen}
            onRequestClose={closeCreateModal}
            ariaHideApp={false}
        >
            <div className="create-favourite-team-section">
                <h3 className={styles["create-favourite-team-title"]}>Create New Favourite Event</h3>
                <form className={styles['create-favourite-team-form']} onSubmit={handleFormSubmit}>
                    <div className="p-fluid">

                        <div className="p-field">
                            <label htmlFor="competition">Competitions:</label>
                            <ListBox 
                                value={formValues.competition} 
                                onChange={handleInputChange} 
                                options={competitions} 
                                filter   
                                optionLabel="name"
                                itemTemplate={competitionsTemplate} 
                                className="w-full md:w-14rem" 
                                id="competition" 
                                name="competition" 
                                listStyle={{ maxHeight: '250px' }}
                            />
                        </div>

                       {formValues.competition && <div className="p-field">
                            <label htmlFor="team">Teams:</label>
                            <ListBox 
                                value={formValues.team} 
                                onChange={handleInputChange} 
                                options={teams} 
                                filter   
                                optionLabel="name"
                                itemTemplate={teamsTemplate} 
                                className="w-full md:w-14rem" 
                                id="team" 
                                name="team" 
                                listStyle={{ maxHeight: '250px' }}
                            />
                        </div>}

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

                    </div>
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

export default FavouriteTeamCreateModal;