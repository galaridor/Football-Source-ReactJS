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
						<p><strong>Name:</strong> {coach.name}</p>
						<p><strong>Date of Birth:</strong> {coach.dateOfBirth}</p>
						<p><strong>Nationality:</strong> {coach.nationality}</p>
						<p><strong>Contract:</strong> from {coach.contract.start} until {coach.contract.until}</p>
					</Card>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default Coach;