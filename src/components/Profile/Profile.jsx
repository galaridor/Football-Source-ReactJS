import { useNavigate } from "react-router-dom";
import { Card } from 'primereact/card';
import styles from './Profile.module.css';
import AuthenticationContext from '../../contexts/AuthenticationContext';
import { useContext } from "react";
import { formatUTCDateToLocal } from '../../utils/dateTimeUtils';

const Profile = () => {
	const navigate = useNavigate();

	const { authentication } = useContext(AuthenticationContext);

	if (!authentication._id) {
		navigate(`/access-denied`);
	}

	const cardHeader = (
		<img src={authentication?.imageUrl} className={styles['card-image']} alt="Missing Image" />
	);

	return (
		<div className={styles['profile-section']}>
			<h1 className={styles['profile-title']}>My Profile</h1>
			<div className={styles['profile-card-container']}>
				<Card
					className={`${styles['profile-card']} md:w-25rem`}
					title={authentication.username}
					header={cardHeader}
				>
					<p><strong>Email:</strong> {authentication.email}</p>
					<p><strong>Date of Birth:</strong> {formatUTCDateToLocal(authentication.dateOfBirth)}</p>
					<p><strong>Age:</strong> {authentication.age}</p>
				</Card>
			</div>
		</div>
	)
}

export default Profile