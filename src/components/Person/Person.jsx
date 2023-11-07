import { useState, useEffect } from 'react';
import { useNavigate, useParams  } from "react-router-dom"
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import personBackground from "/public/images/competition_background.avif";
import * as personService from '../../services/personService';

const Person = () => {
	const [person, setPerson] = useState(null);

	const { id } = useParams();
  
	const navigate = useNavigate();

	useEffect(() => {
		personService.getPersonById(id)
			.then(result => setPerson(result))
			.catch();
	}, []);

	const personCardHeader = (
		<img src={`${person?.crest}`} style={{ width: "150px", margin: '25px' }} alt="Missing Image" className="w-6rem shadow-2 border-round" />
	);

	const teamCardHeader = (
		<img src={`${person?.currentTeam?.crest}`} style={{ width: "150px", margin: '25px' }} alt="Missing Image" className="w-6rem shadow-2 border-round" />
	);

	const teamCardSubTitle = (
		<div style={{textAlign: 'center'}}>
			<p>{person?.currentTeam?.area?.name}</p>
			<img src={`${person?.currentTeam?.area?.flag}`} style={{ width: "50px" }} alt="Missing Image" className="w-6rem shadow-2 border-round" />
		</div>
	);

	const teamCardFooter = (
		<div>
			<Button
				label="Details"
				onClick={() => handleCurrentDeamDetailsClick()}
				icon="pi pi-check"
			/>
		</div>
	);

	const handleCurrentDeamDetailsClick = () => {
		navigate(`/teams/${person?.currentTeam?.id}`);
	}

	if (person) {
		return (
			<div style={{ textAlign: 'center', backgroundImage: `url(${personBackground})` }} className='person-section'>
				<h1 style={{color: 'red'}}>{person.name} Details</h1>
				<div style={{ width: 'auto', display: 'inline-grid', margin: '15px', height: 'auto', backgroundColor: 'lightgrey'}} className="card flex justify-content-center">
					<Card style={{margin: '50px', width:'500px'}} title={person.name} header={personCardHeader} className="md:w-25rem">
							<p><strong>Name:</strong> {person.name}</p>
							<p><strong>Date of Birth:</strong> {person.dateOfBirth}</p>
							<p><strong>Nationality:</strong> {person.nationality}</p>
							<p><strong>Position:</strong> {person.section}</p>
							<br></br>
							<p><strong>Current Team:</strong></p>
					<Card style={{margin: '25px', width:'400px', backgroundColor: 'salmon'}} footer={teamCardFooter} subTitle={teamCardSubTitle} title={person.currentTeam.name} header={teamCardHeader} className="md:w-25rem">
							<p><strong>Founded:</strong> {person.currentTeam.founded}</p>
							<p><strong>Address:</strong> {person.currentTeam.address}</p>
							<p><strong>Club Colors:</strong> {person.currentTeam.clubColors}</p>
							<p><strong>Stadium:</strong> {person.currentTeam.venue}</p>
							<p><strong>Website:</strong> {person.currentTeam.website}</p>			
					</Card>
					</Card>
				</div>
			</div>
		)
	}
	else {
		return null;
	}
}

export default Person;