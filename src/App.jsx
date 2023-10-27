import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import MobileMenu from './components/MobileMenu'
import Header from '../src/components/Header'
import UpcomingEvent from './components/UpcomingEvent'
import ResultOnFocus from './components/ResultOnFocus'
import FixtureOnFocus from './components/FixtureOnFocus'
import Footer from './components/Footer'


function App() {
	return (
		<div className="site-wrap">
			<MobileMenu />
			<Header />
			<UpcomingEvent />
			<ResultOnFocus />
			<FixtureOnFocus />
			<Footer />
		</div>
	)
}

export default App