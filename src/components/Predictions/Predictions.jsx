import { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import * as predictionService from "../../services/predictionService";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { formatUTCDateToLocal } from '../../utils/dateTimeUtils';
import AuthenticationContext from '../../contexts/AuthenticationContext';
import styles from "./Predictions.module.css";
import PredictionEditModal from "./PredictionEditModal";
import PredictionCreateModal from "./PredictionCreateModal";
import { PredictionContext } from "../../contexts/PredictionContext";

const Predictions = () => {
	const [predictions, setPredictions] = useState([]);
	const [predictionToEdit, setPredictionToEdit] = useState({});
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [isCreateModalOpen, setCreateModalOpen] = useState(false);

	const navigate = useNavigate();

	const { authentication } = useContext(AuthenticationContext);

	useEffect(() => {
		predictionService
			.getAllPredictions()
			.then((result) => {
				if (result) {
					setPredictions(result);
				}
			})
			.catch((error) => {
				console.log(error);
				navigate(`/error`);
			});
	}, []);

	const handlePredictionDetailsClick = (prediction) => {
		navigate(`/predictions/${prediction._id}`);
	};

	const handlePredictionDeleteClick = async (prediction) => {
		await predictionService.remove(prediction._id);

		setPredictions((state) =>
			state.filter((currentPrediction) => {
				return currentPrediction._id !== prediction._id;
			}));
	};

	const handlePredictionEditClick = (prediction) => {
		setPredictionToEdit(prediction);

		openEditModal();
	};

	const optionsBodyTemplate = (prediction) => {
		return (
			<div className={styles["details-btn"]}>
				<Button
					onClick={() => handlePredictionDetailsClick(prediction)}
					icon="pi pi-info"
					className="p-button-rounded p-button-text"
					title="Details"
				/>
				{authentication._id === prediction._ownerId && <>
					<Button
						icon="pi pi-pencil"
						className="p-button-rounded p-button-text"
						title="Edit"
						onClick={() => handlePredictionEditClick(prediction)}
					/>
					<Button
						icon="pi pi-trash"
						className="p-button-rounded p-button-text p-button-danger"
						title="Delete"
						onClick={() => handlePredictionDeleteClick(prediction)}
					/>
				</>}
			</div>
		);
	};

	const matchHomeEmblemBodyTemplate = (rowData) => {
		return <img src={`${rowData?.match?.homeTeam?.crest}`} className={styles['match-emblem']} alt="Missing Image" />;
	};

	const matchAwayEmblemBodyTemplate = (rowData) => {
		return <img src={`${rowData?.match?.awayTeam?.crest}`} className={styles['match-emblem']} alt="Missing Image" />;
	};

	const matchDateBodyTemplate = (rowData) => {
		return <p>{formatUTCDateToLocal(rowData?.entityDate)}</p>
	}

	const predictionData = (rowData) => {
		if (rowData?.prediction) {
			return `${rowData?.prediction?.homeTeamScore} : ${rowData?.prediction?.awayTeamScore}`
		}

		return '';
	};

	const openEditModal = () => {
		setEditModalOpen(true);
	};

	const closeEditModal = () => {
		setEditModalOpen(false);
	};

	const openCreateModal = () => {
		setCreateModalOpen(true);
	};

	const closeCreateModal = () => {
		setCreateModalOpen(false);
	};

	const createNewPredictionHandlerClick = () => {
		openCreateModal();
	}

	const saveEditedPredictionHandler = async (prediction) => {
		closeEditModal();

		const currentDate = new Date();

		const updatedPrediction = await predictionService.update(prediction._id, prediction.matchId, prediction.match, prediction.prediction, prediction.notes, prediction.entitidyDate, prediction.dateCreated, currentDate);

		setPredictions((prevPredictions) =>
			prevPredictions.map((pr) =>
				pr._id === prediction._id
					? {
						...pr,
						prediction: updatedPrediction.prediction,
						notes: updatedPrediction.notes
					}
					: pr
			)
		);
	}

	const saveNewPredictionHandler = async (prediction) => {
		closeCreateModal();

		const currentDate = new Date();

		const createdPrediction = await predictionService.create(prediction.matchId, prediction.match, prediction.prediction, prediction.notes, prediction.entitidyDate, currentDate, currentDate);

		setPredictions((state) => [...state, createdPrediction]);
	}

	const predicitonContextValue = {
		closeCreateModal,
		closeEditModal,
		saveEditedPredictionHandler,
		saveNewPredictionHandler
	}

	return (
		<PredictionContext.Provider value={predicitonContextValue}>
			<div className={styles["predictions-section"]}>
				<h2 className={styles["predictions-title"]}>All Predictions</h2>
				<div className={styles["widget-header"]}>
					<DataTable
						value={predictions}
						sortMode="multiple"
						paginator
						rows={5}
						rowsPerPageOptions={[5, 10, 15, 20, 50]}
						totalRecords={predictions?.length}
					>
						<Column field="matchId" header="Match ID" sortable />
						<Column field="match.homeTeam.name" header="Home Team Name" sortable />
						<Column body={matchHomeEmblemBodyTemplate} header="Home Team Emblem" />
						<Column body={predictionData} header="Prediction" />
						<Column body={matchAwayEmblemBodyTemplate} header="Away Team Emblem" />
						<Column field="match.awayTeam.name" header="Away Team Name" sortable />
						<Column body={matchDateBodyTemplate} header="Date" sortable />
						<Column field="owner.username" header="User" sortable />
						<Column header="Options" body={optionsBodyTemplate} />
					</DataTable>
				</div>
				<div>
					<PredictionEditModal
						isOpen={isEditModalOpen}
						currentPrediction={predictionToEdit}
					/>
				</div>
				<div>
					<PredictionCreateModal
						isOpen={isCreateModalOpen}
					/>
				</div>
				<div>
					<Button
						label=' Add New Prediction Event'
						icon="pi pi-plus"
						className="p-button-rounded"
						onClick={createNewPredictionHandlerClick}
					/>
				</div>
			</div>
		</PredictionContext.Provider>
	);
};

export default Predictions;