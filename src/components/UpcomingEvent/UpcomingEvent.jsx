import { useEffect, useState } from 'react';
import Timer from '../Timer/Timer';
import { useNavigate } from 'react-router-dom';
import styles from './UpcomingEvent.module.css';
import * as eventService from '../../services/eventService';

const UpcomingEvent = () => {
	const [upcomingEvent, setUpcomingEvent] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		eventService
			.getLatestUpcominEvent()
			.then((result) => {
				if (result.error)
					throw new Error(result.error);

				setUpcomingEvent(result[0]);
			})
			.catch((error) => {
				console.log(error);
				navigate(`/error`);
			});
	}, []);


	if (upcomingEvent) {
		return (
			<div className={`${styles['upcoming-event-section']}`}>
				<div className={`hero ${styles['main-background']}`}>
					<div className="container">
						<div className="row align-items-center">
							<div className="col-lg-5 ml-auto">
								<h1 className="text-black">{upcomingEvent?.name}</h1>
								<p className="text-black">
									{upcomingEvent?.description}
								</p>
								<div id="date-countdown">
									<Timer deadline={upcomingEvent?.startDate} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	else {
		return null;
	}
}

export default UpcomingEvent;