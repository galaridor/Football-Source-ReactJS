import { Card } from "primereact/card";
import { Button } from 'primereact/button';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from './FavouriteTeams.module.css';
import FavouriteTeamCreateModal from "./FavouriteTeamCreateModal";
import { FavouriteTeamContext } from "../../contexts/FavouriteTeamContext";
import FavouriteTeamEditModal from "./FavouriteTeamEditModal";

const FavouriteTeams = () => {
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [teamToEdit, setTeamToEdit] = useState({});
    const [favouriteTeams, setFavouriteTeams] = useState([
        {
            "teamId": 81,
            "teamName": "FC Barcelona",
            "teamCrest": "https://crests.football-data.org/81.svg",
            "teamCompetitionAlias": "PD",
            "teamCompetitonName": "Primera Division",
            "teamCompetitionEmblem": "https://crests.football-data.org/PD.png",
            "description": "This is my favourite team from Spain!!!"
        },
        {
            "teamId": 109,
            "teamName": "Juventus FC",
            "teamCrest": "https://crests.football-data.org/109.svg",
            "teamCompetitionAlias": "SA",
            "teamCompetitonName": "Serie A",
            "teamCompetitionEmblem": "https://crests.football-data.org/SA.png",
            "description": "This is my favourite team from Italy!!!"
        }
    ]);

    const navigate = useNavigate();

    // useEffect(() => {
    // 	competitionService.getCompetitionTeamsByAlias(alias)
    // 		.then((result) => {
    // 			if (result.error)
    // 			  throw new Error(result.error);

    // 			  setTeams(result.teams);
    // 			  setCompetitionName(result.competition.name);
    // 			})
    // 		.catch((error) => {
    // 			console.log(error);
    // 			navigate(`/error`);
    // 			});
    // }, []);

    const cardHeader = (team) => (
        <img src={`${team?.teamCrest}`} alt="Missing Image" className={`${styles['card-image']}`} />
    );

    const cardSubtitle = (team) => (
		<div className={`${styles['card-subtitle']}`}>
			<p>{team?.teamCompetitonName}</p>
			<img src={`${team?.teamCompetitionEmblem}`} alt="Missing Image" className={`${styles['card-image']}`} />
		</div>
	);

    const cardFooter = (team) => (
        <div>
            <div>
                <Button
                    label="Team Details"
                    onClick={() => handleTeamDetailsClick(team)}
                    icon="pi pi-info"
                />
            </div>
            <div>
                <Button
				    icon="pi pi-pencil"
				    className="p-button-rounded p-button-text"
				    onClick={()=> { editFavouriteTeamHandlerClick(team.teamId) }}
			    />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-text p-button-danger"
                    onClick={() => { deleteFavouriteTeamHandlerClick(team.teamId) }}
                />
            </div>
        </div>
    );

    const deleteFavouriteTeamHandlerClick = async (_id) => {
        await deleteFavouriteTeamHandler(_id);
    };

    const editFavouriteTeamHandlerClick = async (_id) => {
        setTeamToEdit(favouriteTeams.find(team => team.teamId === _id));

        openEditModal();
    };

    const deleteFavouriteTeamHandler = async (_id) => {
        //ToDo add logic for deletion
    }

    const createNewFavouriteTeamHandlerClick = () => {
        openCreateModal();
    };

    const openCreateModal = () => {
        setCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setCreateModalOpen(false);
    };

    const openEditModal = () => {
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
    };

    const handleTeamDetailsClick = (team) => {
        navigate(`/teams/${team.teamId}`);
    }

    const saveEditedFavouriteTeamHandlerClick = (values) => {
        console.log(values);
    }

    const saveNewFavouriteTeamHandler = async (team) => {
        closeCreateModal();

        // ToDO
        // const createdFavouriteTeam = await eventService.create(event.name, event.imageUrl, event.description, event.startDate);

        // setFavouriteTeams((state) => [...state, createdFavouriteTeam]);
    };

    const favouriteTeamContextValue = {
        closeCreateModal,
        saveNewFavouriteTeamHandler,
        saveEditedFavouriteTeamHandlerClick,
        closeEditModal,
        cardHeader,
        cardSubtitle
    };

    if (favouriteTeams) {
        return (
            <FavouriteTeamContext.Provider value={favouriteTeamContextValue}>
                <div className={`${styles['favourite-teams-section']}`}>
                    <h1 className={`${styles['favourite-teams-title']}`}>All Favourite Teams</h1>
                    <div className={`${styles['favourite-teams-container']}`}>
                        {favouriteTeams.map((team) => (
                            <div className={`${styles['card-container']}`} key={team.teamId}>
                                <Card className={`${styles['card']}`} subTitle={cardSubtitle(team)} footer={cardFooter(team)} header={cardHeader(team)} title={team.teamName}>
                                    <div className={styles['card-content']}>
                                        <p><strong>Description: </strong> {team.description}</p>
                                    </div>
                                </Card>
                            </div>
                        ))}
                        <div>
                            <FavouriteTeamCreateModal
                                isOpen={isCreateModalOpen}
                            />
                        </div>
                        <div>
                            <FavouriteTeamEditModal
                                isOpen={isEditModalOpen}
                                team={teamToEdit}
                            />
                        </div>
                    </div>
                    <div>
                        <Button
                            label=' Add New Favourite Team'
                            icon="pi pi-plus"
                            className="p-button-rounded"
                            onClick={createNewFavouriteTeamHandlerClick}
                        />
                    </div>
                </div>
            </FavouriteTeamContext.Provider>
        );
    }
    else {
        return null;
    }
}

export default FavouriteTeams;