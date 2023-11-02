import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from 'primereact/button';

const Matches = () => {
	const [matches, setMatches] = useState([]);

	const { alias } = useParams()

	const navigate = useNavigate()

	const apiUrl = `http://localhost:3456/competitions/${alias}/matches`;

	useEffect(() => {
		fetch(apiUrl)
			.then(response => {
				return response.json();
			})
			.then(data => {
				setMatches(data.matches);
				console.log(data.matches);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	const matchHomeEmblemBodyTemplate = (match) => {
		return <img src={`${match.homeTeam.crest}`} style={{ width: "150px" }} alt="Missing Image" className="w-6rem shadow-2 border-round" />;
	};

	const matchAwayEmblemBodyTemplate = (match) => {
		return <img src={`${match.awayTeam.crest}`} style={{ width: "150px" }} alt="Missing Image" className="w-6rem shadow-2 border-round" />;
	};

	const handleMatchDetailsClick = (match) => {
		navigate(`/matches/${match.id}`);
	}

	const optionsBodyTemplate = (match) => {
		return (
			<div className='details-btn'>
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
		if (match.score && match.status != 'TIMED') {
			return `${match.score?.fullTime?.home} : ${match.score?.fullTime?.away} / ${match.score?.halfTime?.away} : ${match.score?.halfTime?.away}`
		}
		return '';
	};

	return (
		<div className="matches-section">
			<h2 style={{ textAlign: "center" }}>All Matches</h2>
			<div className="widget-header">
				<DataTable
					value={matches}
					sortMode="multiple"
					paginator
					rows={5}
					rowsPerPageOptions={[5, 10, 15, 20, 50]}
					totalRecords={matches.length}
				>
					<Column field="id" header="ID" sortable style={{ width: "150px" }} />
					<Column
						field="homeTeam.name"
						header="Home Team"
						style={{ width: "150px" }}
						sortable
					/>
					<Column header="Emblem" body={matchHomeEmblemBodyTemplate} style={{ width: "150px" }} />
					<Column field="score" header="Result" body={scoreData} style={{ width: "150px" }} />
					<Column header="Emblem" body={matchAwayEmblemBodyTemplate} style={{ width: "150px" }} />
					<Column
						field="awayTeam.name"
						header="Away Team"
						sortable
						style={{ width: "150px" }}
					/>
					<Column style={{ width: "150px" }} field="referees" header="Referee" body={refereData} />
					<Column style={{ width: "150px" }} field="status" header="Status" sortable />
					<Column style={{ width: "150px" }} field="utcDate" header="Date" sortable />
					<Column style={{ width: "150px" }} header="Options" sortable body={optionsBodyTemplate} />
				</DataTable>
			</div>
		</div>
	);
}

export default Matches;