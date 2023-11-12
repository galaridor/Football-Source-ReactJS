import { useState } from 'react';
import Timer from '../Timer/Timer';
import styles from './UpcomingEvent.module.css';

const UpcomingEvent = () => {
	const [upcomingEvent, setUpcomingEvent] = useState({
		name: 'Euro 2024',
		description: `The 2024 UEFA European Football Championship, commonly referred to as UEFA Euro 2024 (stylised as UEFA EURO 2024) or simply Euro 2024, will be the 17th edition of the UEFA European Championship, the quadrennial international football championship organised by UEFA for the men's national teams of its member associations. Germany will host the tournament, which is scheduled to take place from 14 June to 14 July 2024.
					  It will be the third time that European Championship matches are played on German territory and the second time in reunified Germany as the former West Germany hosted the tournament of 1988, and four matches of the multi-national Euro 2020 were played in Munich. It will be the first time the competition is held in what was formerly East Germany with Leipzig as a host city, as well as the first time that a reunified Germany served as a solo host nation. The tournament will return to its usual four-year cycle, after Euro 2020 was delayed to 2021 due to the COVID-19 pandemic.	
		              Italy are the defending champions, having won the 2020 tournament after beating England on penalties in the final.`,
		startDate: 'June, 14, 2024'
	});

	return (
        <div className={`${styles['upcoming-event-section']}`}>
            <div className={`hero ${styles['main-background']}`}>
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-5 ml-auto">
							<h1 className="text-black">{upcomingEvent.name}</h1>
							<p className="text-black">
								{upcomingEvent.description}
							</p>
							<div id="date-countdown">
								<Timer deadline={upcomingEvent.startDate}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UpcomingEvent;