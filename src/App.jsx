import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import MobileMenu from './components/MobileMenu'
import Header from '../src/components/Header'
import UpcomingEvent from './components/UpcomingEvent'
import ResultOnFocus from './components/ResultOnFocus'
import FixtureOnFocus from './components/FixtureOnFocus'
import Footer from './components/Footer'
import Competitions from './components/Competitions';

function App() {
	return (
		<div className="site-wrap">
			<MobileMenu />
			<Header />
			<UpcomingEvent />
			<ResultOnFocus />
			<FixtureOnFocus />
			<Footer />
			<Competitions />
		</div>
	)
}

export default App