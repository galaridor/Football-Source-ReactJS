import { React, useState, useEffect } from 'react';
import { Link, useParams, useNavigate  } from "react-router-dom"
import { Card } from 'primereact/card';
import { SplitButton } from 'primereact/splitbutton';

const Competition = (props) => {
	const [competition, setCompetition] = useState(null);

	const { alias } = useParams()

	const navigate = useNavigate()

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

	const header = (
		<img src={`${competition?.emblem}`} style={{ width: "150px" }} alt="Missing Image" className="w-6rem shadow-2 border-round" />
	);

	const subtitle = (
		<div style={{textAlign: 'center'}}>
			<p>{competition?.area?.name}</p>
			<img src={`${competition?.area?.flag}`} style={{ width: "50px" }} alt="Missing Image" className="w-6rem shadow-2 border-round" />
		</div>
	);

	const detailItems = [
        {
            label: 'Standings',
            icon: 'pi',
            command: () => {
                navigate('/competitions/PL/standing');
            }
        },
        {
            label: 'Matches',
            icon: 'pi',
            command: () => {
                navigate('/competitions/PL/matches');
            }
        },
        {
            label: 'Teams',
            icon: 'pi',
            command: () => {
                navigate('/competitions/PL/teams');
            }
        },
        {
            label: 'Goal Scorers',
            icon: 'pi',
            command: () => {
                navigate('/competitions/PL/goalscorers');
            }
        }
    ];

    const showDetails = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
    };

	const footer = (
		<div>
			 <SplitButton label="Details" icon="pi" onClick={showDetails} model={detailItems} outlined />		 
		</div>
	);

	if (competition) {
		return (
			<div style={{ textAlign: 'center' }} className='competition-section'>
				<div style={{ width: '500px' }} className="card flex justify-content-center">
					<Card title={competition.name} subTitle={subtitle} footer={footer} header={header} className="md:w-25rem">
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