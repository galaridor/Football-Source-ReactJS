import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import styles from './Person.module.css';
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
		<img src={`${person?.crest}`} className={styles['card-image']} alt="Missing Image" />
	);

	const teamCardHeader = (
		<img src={`${person?.currentTeam?.crest}`} className={styles['card-image']} alt="Missing Image" />
	);

	const teamCardSubTitle = (
		<div className={styles['card-subtitle']}>
			<p>{person?.currentTeam?.area?.name}</p>
			<img src={`${person?.currentTeam?.area?.flag}`} className={styles['card-image']} alt="Missing Image" />
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
			<div className={styles['person-section']}>
				<h1 className={styles['red']}>{person.name} Details</h1>
				<div className={styles['card-container']}>
					<Card title={person.name} header={personCardHeader} className='md-w-25rem'>
						<p><strong>Name:</strong> {person.name}</p>
						<p><strong>Date of Birth:</strong> {person.dateOfBirth}</p>
						<p><strong>Nationality:</strong> {person.nationality}</p>
						<p><strong>Position:</strong> {person.section}</p>
						<br></br>
						<p><strong>Current Team:</strong></p>
						<Card style={{ backgroundColor: 'salmon'}} footer={teamCardFooter} subTitle={teamCardSubTitle} title={person.currentTeam.name} header={teamCardHeader} className='md-w-25rem'>
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