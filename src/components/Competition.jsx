import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Competition = (props) => {
	const [competition, setCompetition] = useState(null);

	useEffect(() => {
		const apiUrl = `http://localhost:3456/competitions/${props.alias}/`;

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

	const footer = (
		<div>
			<Button label="Standing" icon="pi pi-check" />
			<Button label="Matches" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
			<Button label="Teams" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
			<Button label="Top Goal Scorers" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
		</div>
	);

	if (competition) {
		return (
			<div style={{ textAlign: 'center' }} className='competition-section'>
				<div style={{ width: '600px' }} className="card flex justify-content-center">
					<Card title={competition.name} subTitle={competition.area.name} footer={footer} header={header} className="md:w-25rem">
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