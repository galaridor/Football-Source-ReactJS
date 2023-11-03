import { React, useState, useEffect } from 'react';
import { useNavigate, useParams  } from "react-router-dom"
import { Card } from 'primereact/card';
import { SplitButton } from 'primereact/splitbutton'; 
import competitionBackground from "/public/images/competition_background.avif";

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
		<img src={`${competition?.emblem}`} style={{ width: "150px", margin: '25px' }} alt="Missing Image" className="w-6rem shadow-2 border-round" />
	);

	const cardSubtitle = (
		<div style={{textAlign: 'center'}}>
			<p>{competition?.area?.name}</p>
			<img src={`${competition?.area?.flag}`} style={{ width: "50px" }} alt="Missing Image" className="w-6rem shadow-2 border-round" />
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
			<div style={{ textAlign: 'center', backgroundImage: `url(${competitionBackground})` }} className='competition-section'>
				<h1 style={{color: 'red'}}>{competition.name} Details</h1>
				<div style={{ width: '500px', display: 'inline-grid', margin: '15px', height: 'auto', backgroundColor: 'lightgrey'}} className="card flex justify-content-center">
					<Card style={{margin: '50px'}} title={competition.name} subTitle={cardSubtitle} footer={cardFooter} header={cardHeader} className="md:w-25rem">
						<p>Current Season Start Date: {competition.currentSeason.startDate}</p>
						<p>Current Season End Date: {competition.currentSeason.endDate}</p>
						<p>Current Matchday: {competition.currentSeason.currentMatchday}</p>
					</Card>
				</div>
			</div>
		)
	}
	else {
		return null;
	}
}

export default Competition;