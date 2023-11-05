import { useState, useEffect } from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const apiUrl = 'http://localhost:3456/competitions/';

const Competitions = () => {
	const [competitions, setCompetitions] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		fetch(apiUrl)
			.then(response => {
				return response.json();
			})
			.then(data => {
				setCompetitions(data.competitions);
				console.log(data.competitions);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	const competitionEmblemBodyTemplate = (competition) => {
		return <img src={`${competition.emblem}`} style={{ width: "150px" }} alt="Missing Image" className="w-6rem shadow-2 border-round" />;
	};

	const handleCompetitionDetailsClick = (competition) => {
		navigate(`/competitions/${competition.code}`);
	}

	const optionsBodyTemplate = (competition) => {
		return (
			<div className='details-btn'>
				<Button
					label="Details"
					onClick={() => handleCompetitionDetailsClick(competition)}
					icon="pi pi-check"
				/>
			</div>
		)
	};

	return (
		<div className="competitions-section">
			<h2 style={{ textAlign: "center" }}>All Competitions</h2>
			<div className="widget-header">
				<DataTable
					value={competitions}
					sortMode="multiple"
					paginator
					rows={5}
					rowsPerPageOptions={[5, 10, 15, 20, 50]}
					totalRecords={competitions.length}
				>
					<Column field="id" header="ID" sortable style={{ width: "150px" }} />
					<Column
						field="name"
						header="Competition Name"
						style={{ width: "150px" }}
						sortable
					/>
					<Column header="Emblem" body={competitionEmblemBodyTemplate} style={{ width: "150px" }} />
					<Column field="code" header="Code" sortable style={{ width: "150px" }} />
					<Column field="area.name" header="Area" sortable style={{ width: "150px" }} />
					<Column
						field="currentSeason.currentMatchday"
						header="Current Matchday"
						sortable
						style={{ width: "150px" }}
					/>
					<Column style={{ width: "150px" }} field="currentSeason.startDate" header="Start Date" sortable />
					<Column style={{ width: "150px" }} field="currentSeason.endDate" header="End Date" sortable />
					<Column style={{ width: "150px" }} header="Options" sortable body={optionsBodyTemplate} />
				</DataTable>
			</div>
		</div>
	);
}

export default Competitions;