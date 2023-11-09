import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { useParams, useNavigate } from "react-router-dom";
import styles from './Standing.module.css';
import * as competitionService from '../../services/competitionService';

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
		competitionService.getCompetitionStandingsByAlias(alias)
			.then((result) => {
				if (result.error)
				  throw new Error(result.error);
			
				  setStanding(result.standings[0].table);
				  setCompetitionName(result.competition.name);
				})
			.catch((error) => {
				console.log(error);
				navigate(`/error`);
				});
	}, []);

	const emblemBodyTemplate = (rowData) => {
		return (
			<img
				src={`${rowData.team.crest}`}
				className={styles['emblem']}
				alt="Missing Image"
			/>
		);
	};

	const optionsBodyTemplate = (rowData) => {
		return (
			<div className={styles['details-btn']}>
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
		if (type === "short") {
			return (
				<div className={styles['standing-section']}>
					<div className={styles['widget-header']}>
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
				<div className={styles['standing-section']}>
					<h1 className={styles['standing-title']}>{competitionName} Standing</h1>
					<div className={styles['widget-header']}>
						<DataTable
							value={standing}
							sortMode="multiple"
							paginator
							rows={5}
							rowsPerPageOptions={[5, 10, 15, 20, 50]}
							totalRecords={standing.length}
						>
							<Column field="position" header="Position" sortable />
							<Column field="team.name" header="Team Name" sortable />
							<Column field="team.tla" header="tla" sortable />
							<Column body={emblemBodyTemplate} header="Team Emblem" />
							<Column field="playedGames" header="Played Games" sortable />
							<Column field="won" header="Won" sortable />
							<Column field="draw" header="Draw" sortable />
							<Column field="lost" header="Lost" sortable />
							<Column field="points" header="Points" sortable />
							<Column field="goalsFor" header="Goals Scored" sortable />
							<Column field="goalsAgainst" header="Goals Conceded" sortable />
							<Column field="goalDifference" header="Goal Difference" sortable />
							<Column field="points" header="Points" sortable />
							<Column header="Options" body={optionsBodyTemplate} />
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