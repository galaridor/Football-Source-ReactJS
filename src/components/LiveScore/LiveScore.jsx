import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { formatUTCDateToLocal } from '../../utils/dateTimeUtils';
import * as matchService from '../../services/matchService';
import styles from './LiveScore.module.css';

const LiveScore = () => {
    const [liveScoreMatches, setLiveScoreMatches] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		matchService.getMatches()
			.then((result) => {
				if (result.error)
					throw new Error(result.error);
		
				setLiveScoreMatches(result.matches);
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

	const matchDateBodyTemplate = (match) => {
		return <p>{formatUTCDateToLocal(match.utcDate)}</p>
	}

	const optionsBodyTemplate = (match) => {
		return (
			<div className={styles['details-btn']}>
				<Button
					label="Match Details"
					onClick={() => handleMatchDetailsClick(match)}
					icon="pi pi-check"
				/>
			</div>
		)
	};

	const scoreData = (match) => {
		if (match.score && match.status !== 'TIMED' && match.status !== "SCHEDULED" && match.status !== "IN_PLAY") {
			return `${match.score?.fullTime?.home} : ${match.score?.fullTime?.away} / ${match.score?.halfTime?.away} : ${match.score?.halfTime?.away}`
		}
		else if (match.score && match.status === 'IN_PLAY') {
			return `${match.score?.fullTime?.home} : ${match.score?.fullTime?.away}`
		}

		return '';
	};

    return (
        <div className={`${styles['livescore-section']}`}>
            <h1 className={`${styles['livescore-title']}`}>Live Score</h1>
			<div className={styles['widget-header']}>
				<DataTable
					value={liveScoreMatches}
					sortMode="multiple"
					paginator
					rows={5}
					rowsPerPageOptions={[5, 10, 15, 20, 50]}
					totalRecords={liveScoreMatches?.length}
				>
					<Column field="id" header="ID" sortable />
					<Column field="homeTeam.name" header="Home Team Name" filterPlaceholder="Search by Home Team Name" filter sortable/>
					<Column header="Home Team Emblem" body={matchHomeEmblemBodyTemplate} />
					<Column field="score" header="Result" body={scoreData} />
					<Column header="Away Team Emblem" body={matchAwayEmblemBodyTemplate} />
					<Column field="awayTeam.name" header="Away Team Name" sortable filterPlaceholder="Search by Away Team Name" filter />
					<Column field="status" header="Status" sortable filterPlaceholder="Search by Status" filter />
					<Column header="Date" body={matchDateBodyTemplate} sortable filter filterPlaceholder="Search by Match Date" />
					<Column header="Options" body={optionsBodyTemplate} />
				</DataTable>
			</div>
        </div>
    );
};

export default LiveScore;