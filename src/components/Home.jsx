
import ResultOnFocus from './ResultOnFocus'
import FixtureOnFocus from './FixtureOnFocus'
import UpcomingEvent from './UpcomingEvent';

const Home = (props) => {
	return (
		<div className="home-section">
			<UpcomingEvent />
			<ResultOnFocus />
			<FixtureOnFocus />
		</div>
	)
}

export default Home;