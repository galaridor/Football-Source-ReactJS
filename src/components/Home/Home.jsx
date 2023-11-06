import ResultOnFocus from '../ResultOnFocus/ResultOnFocus'
import FixtureOnFocus from '../FixtureOnFocus/FixtureOnFocus'
import UpcomingEvent from '../UpcomingEvent/UpcomingEvent';
import styles from "./Home.module.css"

const Home = () => {
	return (
		<div className={`${styles['home-section']}`}>
			<UpcomingEvent />
			<ResultOnFocus />
			<FixtureOnFocus />
		</div>
	)
}

export default Home;