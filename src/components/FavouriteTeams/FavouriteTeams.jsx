import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "primereact/card";
import { Button } from 'primereact/button';
import FavouriteTeamEditModal from "./FavouriteTeamEditModal";
import FavouriteTeamCreateModal from "./FavouriteTeamCreateModal";
import DeleteModal from "../Modals/DeleteModal";

import { FavouriteTeamContext } from "../../contexts/FavouriteTeamContext";
import AuthenticationContext from '../../contexts/AuthenticationContext';
import * as favouriteTeamService from '../../services/favouriteTeamService';

import styles from './FavouriteTeams.module.css';

const FavouriteTeams = () => {
	const [isCreateModalOpen, setCreateModalOpen] = useState(false);
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [selectedTeam, setSelectedTeam] = useState({});
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [favouriteTeams, setFavouriteTeams] = useState([]);

	const navigate = useNavigate();

	const { authentication, showSuccess } = useContext(AuthenticationContext);

	const validateFavouriteTeam = (team) => {
		return true;
	}

	useEffect(() => {
		favouriteTeamService.getFavouriteTeamsForUser(authentication._id)
			.then((result) => {
				if (result) {
					setFavouriteTeams(result);
				}
			})
			.catch((error) => {
				console.log(error);
				navigate(`/error`);
			});
	}, []);

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
					onClick={() => { editFavouriteTeamHandlerClick(team.teamId) }}
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
		setSelectedTeam(favouriteTeams.find(team => team.teamId === _id));
		openDeleteModal();
	};

	const editFavouriteTeamHandlerClick = async (_id) => {
		setSelectedTeam(favouriteTeams.find(team => team.teamId === _id));

		openEditModal();
	};

	const deleteFavouriteTeamHandler = async (_id) => {
		await favouriteTeamService.remove(_id);

		setFavouriteTeams((state) =>
			state.filter((team) => {
				return team._id !== _id;
			})
		);

		closeDeleteModal();

		showSuccess('Successfully deleted favourite team');
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

	const openDeleteModal = () => {
		setIsDeleteModalOpen(true);
	};

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false);
	};

	const handleTeamDetailsClick = (team) => {
		navigate(`/teams/${team.teamId}`);
	}

	const saveEditedFavouriteTeamHandlerClick = async (values) => {
		closeEditModal();

		await favouriteTeamService.update(values._id, values.teamId, values.teamName, values.teamCrest, values.teamCompetitionAlias, values.teamCompetitonName, values.teamCompetitionEmblem, values.description);

		setFavouriteTeams((prevTeams) =>
			prevTeams.map((team) =>
				team._id === values._id
					? {
						...values
					}
					: team
			)
		);

		showSuccess('Successfully edited favourite team');
	}

	const saveNewFavouriteTeamHandler = async (team) => {
		if (validateFavouriteTeam(team) == true) {

			closeCreateModal();

			const createdFavouriteTeam = await favouriteTeamService.create(team.team.id, team.team.name, team.team.crest, team.competition.code, team.competition.name, team.competition.emblem, team.description);

			setFavouriteTeams((state) => [...state, createdFavouriteTeam]);

			showSuccess('Successfully added new favourite team');
		}
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
							<div className={`${styles['card-container']}`} key={team._id}>
								<Card className={`${styles['card']}`} subTitle={cardSubtitle(team)} footer={cardFooter(team)} header={cardHeader(team)} title={team.teamName}>
									<div className={styles['card-content']}>
										<p><strong>Description: </strong><br></br> {team.description}</p>
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
								team={selectedTeam}
							/>
						</div>
						<div>
							<DeleteModal
								isOpen={isDeleteModalOpen}
								closeDeleteModal={closeDeleteModal}
								onConfirm={deleteFavouriteTeamHandler}
								_id={selectedTeam?._id}
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