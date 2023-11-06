import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import { Card } from 'primereact/card';
import { SplitButton } from 'primereact/splitbutton';
import styles from './Competition.module.css';

const Competition = () => {
	const [competition, setCompetition] = useState(null);

	const navigate = useNavigate();

	const { alias } = useParams();

	useEffect(() => {
		const apiUrl = `http://localhost:3456/competitions/${alias}/`;

		fetch(apiUrl)
			.then(response => {
				return response.json();
			})
			.then(data => {
				setCompetition(data);
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	const cardHeader = (
		<img src={`${competition?.emblem}`} alt="Missing Image" className={styles['card-header']} />
	);

	const cardSubtitle = (
		<div className={styles['subtitle']}>
			<p>{competition?.area?.name}</p>
			<img src={`${competition?.area?.flag}`} alt="Missing Image" className={styles['subtitle-image']} />
		</div>
	);

	const cardDetailItems = [
		{
			label: 'Standings',
			icon: 'pi',
			command: (s) => {
				navigate(`/competitions/${competition.code}/standing/full`);
			}
		},
		{
			label: 'Matches',
			icon: 'pi',
			command: () => {
				navigate(`/competitions/${competition.code}/matches`);
			}
		},
		{
			label: 'Teams',
			icon: 'pi',
			command: () => {
				navigate(`/competitions/${competition.code}/teams`);
			}
		},
		{
			label: 'Goal Scorers',
			icon: 'pi',
			command: () => {
				const maxLimitSize = 1000;
				navigate(`/competitions/${competition.code}/goalscorers/${maxLimitSize}`);
			}
		}
	];

	const cardFooter = (
		<div>
			<SplitButton label="Information" icon="pi" model={cardDetailItems} outlined />
		</div>
	);

	if (competition) {
		return (
			<div className={styles['competition-section']}>
				<h1 className={styles['competition-title']}>{competition.name} Details</h1>
				<div className={styles['card-container']}>
					<Card
						title={competition.name}
						subTitle={cardSubtitle}
						footer={cardFooter}
						header={cardHeader}
						className={styles['card']}
					>
						<p>Current Season Start Date: {competition.currentSeason.startDate}</p>
						<p>Current Season End Date: {competition.currentSeason.endDate}</p>
						<p>Current Matchday: {competition.currentSeason.currentMatchday}</p>
					</Card>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default Competition;