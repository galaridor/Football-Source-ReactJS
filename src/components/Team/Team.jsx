import { useState, useEffect } from 'react';
import { useParams  } from "react-router-dom"
import { Card } from 'primereact/card';
import Squad from '../Squad/Squad';
import teamBackground from "/public/images/competition_background.avif";
import RunningCompetitions from '../RunningCompetitions/RunningCompetitions';
import Coach from '../Coach/Coach';
import * as teamService from '../../services/teamService';

const Team = (props) => {
	const [team, setTeam] = useState(null);

	const { id } = useParams()

	useEffect(() => {
		teamService.getTeamById(id)
			.then(result => setTeam(result))
			.catch();
	}, []);

	const cardHeader = (
		<img src={`${team?.crest}`} style={{ width: "150px", margin: '25px' }} alt="Missing Image" className="w-6rem shadow-2 border-round" />
	);

	const cardSubtitle = (
		<div style={{textAlign: 'center'}}>
			<p>{team?.area?.name}</p>
			<img src={`${team?.area?.flag}`} style={{ width: "50px" }} alt="Missing Image" className="w-6rem shadow-2 border-round" />
		</div>
	);

	if (team) {
		return (
			<div style={{ textAlign: 'center', backgroundImage: `url(${teamBackground})` }} className='team-section'>
				<h1 style={{color: 'red'}}>{team.name} Details</h1>
				<div style={{ width: '500px', display: 'inline-grid', margin: '15px', height: 'auto', backgroundColor: 'lightgrey'}} className="card flex justify-content-center">
					<Card style={{margin: '50px'}} title={team.name} subTitle={cardSubtitle} header={cardHeader} className="md:w-25rem">
							<p>Founded: {team.founded}</p>
							<p>Address: {team.address}</p>
							<p>Club Colors: {team.clubColors}</p>
							<p>Stadium: {team.venue}</p>
							<p>Website: {team.website}</p>
					</Card>
				</div>
				<Squad squad={team.squad}/>
				<RunningCompetitions runningCompetitions={team.runningCompetitions}/>
				<Coach coach={team.coach} />
			</div>
		)
	}
	else {
		return null;
	}
}

export default Team;