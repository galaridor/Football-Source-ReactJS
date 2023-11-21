import { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import * as predictionService from "../../services/predictionService";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { formatUTCDateToLocal } from '../../utils/dateTimeUtils';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import styles from "./Predictions.module.css";

const Predictions = () => {
	const [predictions, setPredictions] = useState([]);

	const navigate = useNavigate();

    const { authentication } = useContext(AuthenticationContext);

	useEffect(() => {
		predictionService
			.getAllPredictions()
			.then((result) => {
                debugger;
				if (result)
                {
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

    const handlePredictionDeleteClick = (prediction) => {
		
	};

    const handlePredictionEditClick = (prediction) => {
		
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

    const createNewPredictionHandlerClick = () => {

    }

	return (
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
                    <Column field="_ownerId" header="User" sortable />
					<Column header="Options" body={optionsBodyTemplate} />
				</DataTable>
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
	);
};

export default Predictions;
