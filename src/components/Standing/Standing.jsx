import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { useParams, useNavigate} from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const Standing = (props) => {
	const [standing, setStanding] = useState(null);
	const [competitionName, setCompetitionName] = useState("");

	const { alias: propAlias, type: propType } = props;
	const { alias: routeAlias, type: routeType } = useParams();
  
	// Use the parameters from props if available, otherwise, use the route parameters
	const alias = propAlias || routeAlias;
	const type = propType || routeType;
  
	const navigate = useNavigate();

	useEffect(() => {
		const apiUrl = `http://localhost:3456/competitions/${alias}/standings/`;

		fetch(apiUrl)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setStanding(data.standings[0].table);
				setCompetitionName(data.competition.name);
				console.log(data.standings[0].table);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const emblemBodyTemplate = (rowData) => {
		return (
			<img
				src={`${rowData.team.crest}`}
				style={{ width: "150px" }}
				alt="Missing Image"
				className="w-6rem shadow-2 border-round"
			/>
		);
	};

	const optionsBodyTemplate = (rowData) => {
		return (
			<div>
				<Button
					label="Details"
					onClick={() => handleClick(rowData)}
					icon="pi pi-check"
				/>
			</div>
		);
	};

	const handleClick = (rowData) => {
		navigate(`/teams/${rowData.team.id}/`);
	};

	if (standing) {
		if (type == "short") {
			return (
				<div className="standing-section">
					<div className="widget-header">
						<DataTable
							value={standing}
							sortMode="multiple"
							paginator
							rows={5}
							rowsPerPageOptions={[5, 10, 15, 20, 50]}
							totalRecords={standing.length}
						>
							<Column field="position" header="P" sortable />
							<Column field="team.name" header="Team" sortable />
							<Column field="playedGames" header="PG" sortable />
							<Column field="won" header="W" sortable />
							<Column field="draw" header="D" sortable />
							<Column field="lost" header="L" sortable />
							<Column field="points" header="PTS" sortable />
						</DataTable>
					</div>
				</div>
			);
		} else {
			return (
				<div className="standing-section">
					<h1 style={{textAlign: 'center'}}>{competitionName} Standing</h1>
					<div className="widget-header">
						<DataTable
							value={standing}
							sortMode="multiple"
							paginator
							rows={5}
							rowsPerPageOptions={[5, 10, 15, 20, 50]}
							totalRecords={standing.length}
						>
							<Column field="position" header="Position" sortable />
							<Column field="team.name" header="Team" sortable />
							<Column field="team.tla" header="tla" sortable />
							<Column body={emblemBodyTemplate} header="Emblem" />
							<Column field="playedGames" header="Played Games" sortable />
							<Column field="won" header="Won" sortable />
							<Column field="draw" header="Draw" sortable />
							<Column field="lost" header="Lost" sortable />
							<Column field="points" header="Points" sortable />
							<Column field="goalsFor" header="Goals Scored" sortable />
							<Column field="goalsAgainst" header="Goals Conceeded" sortable />
							<Column
								field="goalDifference"
								header="Goal Difference"
								sortable
							/>
							<Column field="points" header="Points" sortable />
							<Column
								style={{ width: "150px" }}
								header="Options"
								sortable
								body={optionsBodyTemplate}
							/>
						</DataTable>
					</div>
				</div>
			);
		}
	} else {
		return null;
	}
};

export default Standing;
