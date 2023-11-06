import styles from './UpcomingEvent.module.css';

const UpcomingEvent = () => {
	return (
        <div className={`${styles['upcoming-event-section']}`}>
            <div className={`hero ${styles['main-background']}`}>
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-5 ml-auto">
							<h1 className="text-black">World Cup Event</h1>
							<p className="text-black">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta,
								molestias repudiandae pariatur.
							</p>
							<div id="date-countdown" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UpcomingEvent;