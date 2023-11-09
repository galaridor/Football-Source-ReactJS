import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Card } from 'primereact/card';
import Squad from '../Squad/Squad';
import RunningCompetitions from '../RunningCompetitions/RunningCompetitions';
import Coach from '../Coach/Coach';
import * as teamService from '../../services/teamService';
import styles from './Team.module.css';

const Team = () => {
	const [team, setTeam] = useState(null);

	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		teamService.getTeamById(id)
			.then((result) => {
				if (result.error)
				  throw new Error(result.error);
			
				  setTeam(result);
				})
			.catch((error) => {
				console.log(error);
				navigate(`/error`);
				});
	}, []);

	const cardHeader = (
		<img src={`${team?.crest}`} className={styles['card-image']} alt="Missing Image" />
	);

	const cardSubtitle = (
		<div className={styles['card-subtitle']}>
			<p>{team?.area?.name}</p>
			<img src={`${team?.area?.flag}`} className={styles['card-image']} alt="Missing Image" />
		</div>
	);

	if (team) {
		return (
			<div className={styles['team-section']}>
				<h1 className={styles['team-title']}>{team.name} Details</h1>
				<div className={styles['card-container']}>
					<Card className={`md-w-25rem ${styles['card']}`} title={team.name} subTitle={cardSubtitle} header={cardHeader}>
						<p><strong>Founded:</strong> {team.founded}</p>
						<p><strong>Address:</strong> {team.address}</p>
						<p><strong>Club Colors:</strong> {team.clubColors}</p>
						<p><strong>Stadium:</strong> {team.venue}</p>
						<p><strong>Website:</strong> {team.website}</p>
					</Card>
				</div>
				<Squad squad={team.squad} />
				<RunningCompetitions runningCompetitions={team.runningCompetitions} />
				<Coach coach={team.coach} />
			</div>
		);
	} else {
		return null;
	}
}

export default Team;