import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import styles from './Coach.module.css';

const Coach = ({ coach }) => {
	const navigate = useNavigate();

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
	};

	if (coach) {
		return (
			<div className={styles['coach-section']}>
				<h1 className={styles['coach-title']}>Coach</h1>
				<div className={styles['coach-card-container']}>
					<Card
						className={`${styles['coach-card']} md:w-25rem`}
						title={coach.name}
						footer={cardFooter}
					>
						<p>Name: {coach.name}</p>
						<p>Date of Birth: {coach.dateOfBirth}</p>
						<p>Nationality: {coach.nationality}</p>
						<p>
							Contract: from {coach.contract.start} until {coach.contract.until}
						</p>
					</Card>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default Coach;