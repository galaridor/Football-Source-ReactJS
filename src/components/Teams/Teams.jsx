import { Card } from "primereact/card";
import { Button } from 'primereact/button';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import teamsBackground from "/public/images/competition_background.avif";

const Teams = () => {
	const [teams, setTeams] = useState([]);
	const [competitionName, setCompetitionName] = useState("");

	const { alias } = useParams();

	const navigate = useNavigate()

	useEffect(() => {
		const apiUrl = `http://localhost:3456/competitions/${alias}/teams/`;

		fetch(apiUrl)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setTeams(data.teams);
				setCompetitionName(data.competition.name);
				console.log(data.teams);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const cardHeader = (team) => (
		<img src={`${team?.crest}`} style={{ width: "150px", margin: '25px' }} alt="Missing Image" className="w-6rem shadow-2 border-round" />
	);

	const cardSubtitle = (team) => (
		<div style={{ textAlign: 'center' }}>
			<p>{team?.area?.name}</p>
			<img src={`${team?.area?.flag}`} style={{ width: "50px" }} alt="Missing Image" className="w-6rem shadow-2 border-round" />
		</div>
	);

	const cardFooter = (team) => (
		<div>
			<Button
				label="Details"
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
			<div style={{ textAlign: 'center', backgroundImage: `url(${teamsBackground})`}} className="teams-section">
				<h1 style={{color: 'red'}}>All {competitionName} Teams</h1>
				<div style={{whiteSpace: 'normal'}} className="teams-container">
					{teams.map((team) => (
						<div style={{ width: '500px', display: 'inline-grid', margin: '15px', height: 'auto', backgroundColor: 'lightgrey'}} className="card flex justify-content-center" key={team.id}>
							<Card style={{margin: '50px'}} subTitle={cardSubtitle(team)} footer={cardFooter(team)} header={cardHeader(team)} title={team.name} className="md:w-25rem">
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