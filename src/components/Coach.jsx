import { Card } from 'primereact/card';
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import coachBackground from "/public/images/default_coach_background.jpg";

const Coach = ({coach}) => {
	const navigate = useNavigate()

	const cardHeader = (
		<img src={`${coach?.crest}`} style={{ width: "150px", margin: '25px' }} alt="Missing Image" className="w-6rem shadow-2 border-round" />
	);

	const cardFooter = (
		<div>
			<Button
				label="Details"
				onClick={() => handleCoachDetailsClick()}
				icon="pi pi-check"
			/>
		</div>
	);

	const handleCoachDetailsClick = () => {
		navigate(`/people/${coach.id}`);
	}

	if (coach) {
		return (
			<div style={{ textAlign: 'center', backgroundImage: `url(${coachBackground})` }} className='coach-section'>
				<h1 style={{color: 'red'}}>Coach</h1>
				<div style={{ width: '500px', display: 'inline-grid', margin: '15px', height: 'auto', backgroundColor: 'lightgrey'}} className="card flex justify-content-center">
					<Card style={{margin: '50px'}} title={coach.name} footer={cardFooter} header={cardHeader} className="md:w-25rem">
							<p>Name: {coach.name}</p>
							<p>Date of Birth: {coach.dateOfBirth}</p>
							<p>Nationality: {coach.nationality}</p>
							<p>Contract: from {coach.contract.start} until {coach.contract.until}</p>
					</Card>
				</div>
			</div>
		)
	}
	else {
		return null;
	}
}

export default Coach;