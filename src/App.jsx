import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import MobileMenu from "./components/MobileMenu";
import Header from "../src/components/Header";
import Footer from "./components/Footer";
import Competitions from "./components/Competitions";
import Competition from "./components/Competition";
import Home from "./components/Home";
import Contacts from "./components/Contacts";
import Livescore from './components/LiveScore';
import Matches from "./components/Matches";
import Error from "./components/Error";
import Standing from "./components/Standing";
import Teams from "./components/Teams";
import GoalScorers from "./components/GoalScorers";
import Team from "./components/Team";
import Match from "./components/Match";
import Person from "./components/Person";

function App() {
	return (
		<div className="site-wrap">
			<MobileMenu />
			<Header />
			<Routes>
				<Route path="*" element={<Error />} />
				<Route path="/home" element={<Home />} />
				<Route path="/" element={<Home />} />
				<Route path="/competitions" element={<Competitions />} />
				<Route path="/competitions/:alias" element={<Competition />} />
				<Route path="/competitions/:alias/standing/:type" element={<Standing />} />
				<Route path="/competitions/:alias/matches" element={<Matches />} />
				<Route path="/competitions/:alias/teams" element={<Teams />} />
				<Route path="/competitions/:alias/goalscorers/:limit" element={<GoalScorers />} />
				<Route path="/teams/:id/" element={<Team />} />
				<Route path="/matches/:id/" element={<Match />} />
				<Route path="/livescore" element={<Livescore />} />
				<Route path="/contacts" element={<Contacts />} />
				<Route path="/people/:id/" element={<Person />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;