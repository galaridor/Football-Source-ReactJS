import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import * as competitionService from '../../services/competitionService';
import styles from './Matches.module.css';

const Matches = () => {
	const [matches, setMatches] = useState([]);

	const { alias } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		competitionService.getCompetitionMatchesByAlias(alias)
			.then((result) => {
				if (result.error)
				  throw new Error(result.error);
			
				  setMatches(result.matches);
				})
			.catch((error) => {
				console.log(error);
				navigate(`/error`);
				});
	}, []);

	const matchHomeEmblemBodyTemplate = (match) => {
		return <img src={`${match.homeTeam.crest}`} className={styles['match-emblem']} alt="Missing Image" />;
	};

	const matchAwayEmblemBodyTemplate = (match) => {
		return <img src={`${match.awayTeam.crest}`} className={styles['match-emblem']} alt="Missing Image" />;
	};

	const handleMatchDetailsClick = (match) => {
		navigate(`/matches/${match.id}`);
	}

	const optionsBodyTemplate = (match) => {
		return (
			<div className={styles['details-btn']}>
				<Button
					label="Details"
					onClick={() => handleMatchDetailsClick(match)}
					icon="pi pi-check"
				/>
			</div>
		)
	};

	const refereData = (match) => {
		if (match.referees && match.referees.length > 0) {
			return match.referees[0].name;
		}
		return '';
	};

	const scoreData = (match) => {
		if (match.score && match.status !== 'TIMED' && match.status !== "SCHEDULED") {
			return `${match.score?.fullTime?.home} : ${match.score?.fullTime?.away} / ${match.score?.halfTime?.away} : ${match.score?.halfTime?.away}`
		}
		return '';
	};

	return (
		<div className={styles['matches-section']}>
			<h2 className={styles['matches-title']}>All Matches</h2>
			<div className={styles['widget-header']}>
				<DataTable
					value={matches}
					sortMode="multiple"
					paginator
					rows={5}
					rowsPerPageOptions={[5, 10, 15, 20, 50]}
					totalRecords={matches.length}
				>
					<Column field="id" header="ID" sortable />
					<Column field="homeTeam.name" header="Home Team Name" sortable />
					<Column header="Home Team Emblem" body={matchHomeEmblemBodyTemplate} />
					<Column field="score" header="Result" body={scoreData} />
					<Column header="Away Team Emblem" body={matchAwayEmblemBodyTemplate} />
					<Column field="awayTeam.name" header="Away Team Name" sortable />
					<Column field="referees" header="Referee" body={refereData} />
					<Column field="status" header="Status" sortable />
					<Column field="utcDate" header="Date" sortable />
					<Column header="Options" body={optionsBodyTemplate} />
				</DataTable>
			</div>
		</div>
	);
}

export default Matches;