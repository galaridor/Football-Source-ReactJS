import { useEffect, useState } from 'react';
import Timer from '../Timer/Timer';
import { Card } from "primereact/card";
import { useNavigate } from 'react-router-dom';
import styles from './UpcomingEventsAdminPage.module.css';
import * as eventService from '../../services/eventService';

const UpcomingEventsAdminPage = () => {
	const [upcomingEvents, setUpcomingEvents] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		eventService
			.getAllUpcominEvent()
			.then((result) => {
				if (result.error)
					throw new Error(result.error);

				setUpcomingEvents(result);
			})
			.catch((error) => {
				console.log(error);
				navigate(`/error`);
			});
	}, []);

	const cardHeader = (event) => (
		<img src={`${event?.imageUrl}`} alt="Missing Image" className={`${styles['card-image']}`} />
	);

	const cardFooter = (event) => (
		<div id="date-countdown">
			<Timer deadline={event?.startDate} />
		</div>
	);

	return (
		<div className={`${styles['upcoming-events-section']}`}>
			<h1 className={`${styles['upcoming-events-title']}`}>All Upcoming Events</h1>
				<div className={`${styles['upcoming-events-container']}`}>
					{upcomingEvents.map((event) => (
						<div className={`${styles['card-container']}`} key={event._id}>
							<Card className={`${styles['card']}`} footer={cardFooter(event)} header={cardHeader(event)} title={event.name}>
								<p className="text-black">
									{event?.description}
								</p>
							</Card>
						</div>
					))}
				</div>
		</div>
	)
}

export default UpcomingEventsAdminPage;