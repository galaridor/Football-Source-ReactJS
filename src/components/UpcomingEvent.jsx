const UpcomingEvent = (props) => {
    return (
        <div className="upcoming-event-section">
            <div className="hero overlay" style={{ backgroundImage: 'url("images/bg_3.jpg")' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 ml-auto">
                            <h1 className="text-white">World Cup Event</h1>
                            <p>
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