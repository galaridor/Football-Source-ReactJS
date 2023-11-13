import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { useParams, useNavigate } from "react-router-dom";
import styles from './Standing.module.css';
import * as competitionService from '../../services/competitionService';

const Standing = (props) => {
	const [isMultipleGroups, setIsMultipleGroups] = useState(false);
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
			
				  if (result.standings.length == 1) {
					setStanding(result.standings[0].table);
				  }
				  else if (result.standings.length > 1) {
					setStanding(result.standings);
					setIsMultipleGroups(true);
				  }

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
					label="Team Details"
					onClick={() => handleTeamDetailsClick(rowData)}
					icon="pi pi-check"
				/>
			</div>
		);
	};

	const handleTeamDetailsClick = (rowData) => {
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
							totalRecords={standing?.length}
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
			if (isMultipleGroups == true) {
				return (
					<div className={styles['standing-section']}>
						<h1 className={styles['standing-title']}>{competitionName} Standing</h1>
						{standing.map((s) => (
							<div key={s.group} className={styles['widget-header']}>
								<h3 className={styles['group-title']}>{s.group} Standing</h3>
								<DataTable
									value={s.table}
									sortMode="multiple"
									paginator
									rows={5}
									rowsPerPageOptions={[5, 10, 15, 20, 50]}
									totalRecords={s?.table?.length}
								>
									<Column field="position" header="Position" sortable />
									<Column field="team.name" header="Team Name" sortable filter filterPlaceholder="Search by Team Name"/>
									<Column body={emblemBodyTemplate} header="Team Emblem" />
									<Column field="playedGames" header="Played Games" sortable filter filterPlaceholder="Search by Played Games"/>
									<Column field="won" header="Won" sortable filter filterPlaceholder="Search by Won Games"/>
									<Column field="draw" header="Draw" sortable filter filterPlaceholder="Search by Drawn Games"/>
									<Column field="lost" header="Lost" sortable filter filterPlaceholder="Search by Lost Games"/>
									<Column field="points" header="Points" sortable filter filterPlaceholder="Search by Points"/>
									<Column field="goalsFor" header="Goals Scored" sortable filter filterPlaceholder="Search by Goals Scored"/>
									<Column field="goalsAgainst" header="Goals Conceded" sortable filter filterPlaceholder="Search by Goals Conceded"/>
									<Column field="goalDifference" header="Goal Difference" sortable filter filterPlaceholder="Search by Goal Difference"/>
									<Column field="points" header="Points" sortable filter filterPlaceholder="Search by Won Points"/>
									<Column header="Options" body={optionsBodyTemplate} />
								</DataTable>
							</div>
						))}
					</div>
				);
			}
			else {
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
								totalRecords={standing?.length}
							>
								<Column field="position" header="Position" sortable />
								<Column field="team.name" header="Team Name" sortable filter filterPlaceholder="Search by Team Name"/>
								<Column body={emblemBodyTemplate} header="Team Emblem" />
								<Column field="playedGames" header="Played Games" sortable filter filterPlaceholder="Search by Played Games"/>
								<Column field="won" header="Won" sortable filter filterPlaceholder="Search by Won Games"/>
								<Column field="draw" header="Draw" sortable filter filterPlaceholder="Search by Drawn Games"/>
								<Column field="lost" header="Lost" sortable filter filterPlaceholder="Search by Lost Games"/>
								<Column field="points" header="Points" sortable filter filterPlaceholder="Search by Points"/>
								<Column field="goalsFor" header="Goals Scored" sortable filter filterPlaceholder="Search by Goals Scored"/>
								<Column field="goalsAgainst" header="Goals Conceded" sortable filter filterPlaceholder="Search by Goals Conceded"/>
								<Column field="goalDifference" header="Goal Difference" sortable filter filterPlaceholder="Search by Goal Difference"/>
								<Column field="points" header="Points" sortable filter filterPlaceholder="Search by Won Points"/>
								<Column header="Options" body={optionsBodyTemplate} />
							</DataTable>
						</div>
					</div>
				)
			}
		}
	} else {
		return null;
	}
};

export default Standing;