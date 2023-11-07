import { useState, useEffect } from 'react';
import { useNavigate, useParams  } from "react-router-dom"
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import * as competitionService from '../../services/competitionService';

const GoalScorers = () => {
	const [goalScorers, setGoalScorers] = useState([]);

	const { alias } = useParams()
    const { limit } = useParams()

	const navigate = useNavigate()

	useEffect(() => {
		competitionService.getCompetitionTopScorersByAlias(alias, limit)
			.then(result => setGoalScorers(result.scorers))
			.catch();
	}, []);

	const handlePlayerDetailsClick = (scorer) => {
		navigate(`/people/${scorer.player.id}`);
	}

	const teamEmblemBodyTemplate = (scorer) => {
		return <img src={`${scorer.team.crest}`} style={{ width: "100px" }} alt="Missing Image" className="w-6rem shadow-2 border-round" />;
	};

	const optionsBodyTemplate = (scorer) => {
		return (
			<div className='details-btn'>
				<Button
					label="Details"
					onClick={() => handlePlayerDetailsClick(scorer)}
					icon="pi pi-check"
				/>
			</div>
		)
	};

	return (
		<div className="matches-section">
			<h2 style={{ textAlign: "center"}}>All Goal Scorers</h2>
			<div className="widget-header">
				<DataTable
					value={goalScorers}
					sortMode="multiple"
					paginator
					rows={5}
					rowsPerPageOptions={[5, 10, 15, 20, 50]}
					totalRecords={goalScorers.length}
				>
					<Column field="player.id" header="ID" sortable style={{ width: "150px" }} />
					<Column
						field="player.name"
						header="Player"
						style={{ width: "150px" }}
						sortable
					/>
					<Column header="Date of Birth" field='player.dateOfBirth' style={{ width: "150px" }} sortable/>
					<Column field="player.nationality" header="Nationality" style={{ width: "150px" }} sortable/>
					<Column header="Position" field='player.section' style={{ width: "150px" }} sortable/>
					<Column
						field="team.name"
						header="Team"
						sortable
						style={{ width: "150px" }}
					/>
					<Column header="Emblem" body={teamEmblemBodyTemplate} style={{ width: "150px" }} />
					<Column style={{ width: "150px" }} field="playedMatches" header="Played Matches" sortable/>
					<Column style={{ width: "150px" }} field="goals" header="Goals" sortable />
					<Column style={{ width: "150px" }} field="assists" header="Asists" sortable />
					<Column style={{ width: "150px" }} field="penalties" header="Penalties" sortable />
					<Column style={{ width: "150px" }} header="Options" body={optionsBodyTemplate} />
				</DataTable>
			</div>
		</div>
	);
}

export default GoalScorers;