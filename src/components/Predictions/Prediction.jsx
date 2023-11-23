import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import styles from './Prediction.module.css';
import * as predictionService from '../../services/predictionService';

const Prediction = () => {
	const [prediction, setPrediction] = useState(null);
	
	const navigate = useNavigate();

	const { id } = useParams();

	useEffect(() => {
		predictionService.getPredictionById(id)
			.then((result) => {
				if (result) {
                    setPrediction(result);
                }
			  })
			.catch((error) => {
				console.log(error);
				navigate(`/error`);
			  });
	}, [id]);

	const handleMatchDetailsClick = () => {
		navigate(`/matches/${prediction.matchId}`);
	};

	const cardHeader = (
		<div>
			<div>
				<img src={`${prediction?.match?.homeTeam?.crest}`} alt="Missing Image" className={styles['card-header']} />
				<span>VS</span>
				<img src={`${prediction?.match?.awayTeam?.crest}`} alt="Missing Image" className={styles['card-header']} />
			</div>
			<div className={styles["details-btn"]}>
				<Button
					label="Match Details"
					onClick={handleMatchDetailsClick}
					icon="pi pi-info"
				/>
			</div>
		</div>
	);

	const cardSubTitle = (
		<div>
			<p>{prediction?.match?.homeTeam?.name} - {prediction?.match?.awayTeam?.name}</p>
		</div>
	);

	if (prediction) {
		return (
			<div className={styles['prediction-section']}>
				<h1 className={styles['prediction-title']}>Prediction Details</h1>
				<div className={styles['card-container']}>
					<Card
						className={styles['card']}
						header={cardHeader}
						subTitle={cardSubTitle}
					>
						<div className={styles['card-content']}>
							<strong>Match Date: </strong> <p>{prediction.entityDate}</p>
							<strong>Prediction: </strong> <p>{prediction.prediction.homeTeamScore} : {prediction.prediction.awayTeamScore}</p>
							<strong>Notes: </strong> <p>{prediction.notes}</p>
							<strong>Made by: </strong> <p>{prediction.owner.username}</p>
						</div>
					</Card>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default Prediction;