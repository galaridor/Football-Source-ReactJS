import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';

import { formatUTCDateToLocal } from '../../utils/dateTimeUtils';
import * as matchService from '../../services/matchService';
import * as favouriteTeamService from '../../services/favouriteTeamService';
import AuthenticationContext from '../../contexts/AuthenticationContext';

import styles from './LiveScore.module.css';

const LiveScore = () => {
	const [liveScoreMatches, setLiveScoreMatches] = useState([]);
	const [favouriteTeamIds, setFavouriteTeamIds] = useState([]);
	const [date, setDate] = useState(new Date());

	const navigate = useNavigate();

	const { authentication } = useContext(AuthenticationContext);

	const sortByArrayOrder = (arrayOfIds, arrayOfObjects) => {
		function customSort(obj1, obj2) {
			const id1Index =
				arrayOfIds.indexOf(obj1.homeTeam.id) !== -1
					? arrayOfIds.indexOf(obj1.homeTeam.id)
					: arrayOfIds.indexOf(obj1.awayTeam.id);

			const id2Index =
				arrayOfIds.indexOf(obj2.homeTeam.id) !== -1
					? arrayOfIds.indexOf(obj2.homeTeam.id)
					: arrayOfIds.indexOf(obj2.awayTeam.id);

			if (id1Index !== -1 && id2Index !== -1) {
				return id1Index - id2Index;
			} else if (id1Index !== -1) {
				return -1;
			} else if (id2Index !== -1) {
				return 1;
			} else {
				return 0;
			}
		}

		const sortedArray = arrayOfObjects.sort(customSort);

		return sortedArray;
	}

	useEffect(() => {
		let year = date.getFullYear();
		let month = (date.getMonth() + 1).toString().padStart(2, '0');
		let day = date.getDate().toString().padStart(2, '0');

		const dateFrom = `${year}-${month}-${day}`;

		year = date.getFullYear();
		month = (date.getMonth() + 1).toString().padStart(2, '0');
		day = (date.getDate() + 1).toString().padStart(2, '0');

		const dateTo = `${year}-${month}-${day}`;

		favouriteTeamService.getFavouriteTeamsForUser(authentication._id)
			.then((favouriteTeamsResult) => {
				if (favouriteTeamsResult.error)
					throw new Error(favouriteTeamsResult.error);

				const favouriteTeamsIds = favouriteTeamsResult.map(team => team.teamId);

				setFavouriteTeamIds(favouriteTeamsIds);

				matchService.getMatchesByDate(dateFrom, dateTo)
					.then((result) => {
						if (result.error)
							throw new Error(result.error);

						const matchesOrderedByFavouriteTeams = sortByArrayOrder(favouriteTeamsIds, result.matches);

						setLiveScoreMatches(matchesOrderedByFavouriteTeams);
					})
					.catch((error) => {
						console.log(error);
						navigate(`/error`);
					});
			})
			.catch((error) => {
				console.log(error);
				navigate(`/error`);
			});
	}, [date]);

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
					icon="pi pi-info"
				/>
			</div>
		)
	};

	const scoreData = (match) => {
		if (match.score && match.status !== 'TIMED' && match.status !== "SCHEDULED" && match.status !== "IN_PLAY") {
			return `${match.score?.fullTime?.home} : ${match.score?.fullTime?.away} / ${match.score?.halfTime?.home} : ${match.score?.halfTime?.away}`
		}
		else if (match.score && match.status === 'IN_PLAY') {
			return `${match.score?.fullTime?.home} : ${match.score?.fullTime?.away}`
		}

		return '';
	};

	const favouriteTeamTemplate = (match) => {
		if (favouriteTeamIds.includes(match.homeTeam.id) || favouriteTeamIds.includes(match.awayTeam.id)) {
			return (
				<p>⭐</p>
			)
		}
		else {
			return null;
		}
	};

	return (
		<div className={`${styles['livescore-section']}`}>
			<h1 className={`${styles['livescore-title']}`}>Live Score</h1>
			<div className={`${styles['livescore-calendar']} flex justify-content-center`}>
				<Calendar value={date} onChange={(e) => setDate(e.value)} showIcon />
			</div>
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
					<Column body={favouriteTeamTemplate} header="Favourite" />
					<Column field="homeTeam.name" header="Home Team Name" filterPlaceholder="Search by Home Team Name" filter sortable />
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