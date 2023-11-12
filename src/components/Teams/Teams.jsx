import { Card } from "primereact/card";
import { Button } from 'primereact/button';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as competitionService from '../../services/competitionService';
import styles from './Teams.module.css';

const Teams = () => {
	const [teams, setTeams] = useState([]);
	const [competitionName, setCompetitionName] = useState("");

	const { alias } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		competitionService.getCompetitionTeamsByAlias(alias)
			.then((result) => {
				if (result.error)
				  throw new Error(result.error);
			
				  setTeams(result.teams);
				  setCompetitionName(result.competition.name);
				})
			.catch((error) => {
				console.log(error);
				navigate(`/error`);
				});
	}, []);

	const cardHeader = (team) => (
		<img src={`${team?.crest}`} alt="Missing Image" className={`${styles['card-image']}`} />
	);

	const cardSubtitle = (team) => (
		<div className={`${styles['card-subtitle']}`}>
			<p>{team?.area?.name}</p>
			<img src={`${team?.area?.flag}`} alt="Missing Image" className={`${styles['card-image']}`} />
		</div>
	);

	const cardFooter = (team) => (
		<div>
			<Button
				label="Team Details"
				onClick={() => handleTeamDetailsClick(team)}
				icon="pi pi-check"
			/>
		</div>
	);

	const handleTeamDetailsClick = (team) => {
		navigate(`/teams/${team.id}`);
	}

	if (teams) {
		return (
			<div className={`${styles['teams-section']}`}>
				<h1 className={`${styles['teams-title']}`}>All {competitionName} Teams</h1>
				<div className={`${styles['teams-container']}`}>
					{teams.map((team) => (
						<div className={`${styles['card-container']}`} key={team.id}>
							<Card className={`${styles['card']}`} subTitle={cardSubtitle(team)} footer={cardFooter(team)} header={cardHeader(team)} title={team.name}>
								<p>Founded: {team.founded}</p>
								<p>Address: {team.address}</p>
								<p>Club Colors: {team.clubColors}</p>
								<p>Stadium: {team.venue}</p>
								<p>Website: {team.website}</p>
							</Card>
						</div>
					))}
				</div>
			</div>
		);
	}
	else {
		return null;
	}
}

export default Teams;