import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import Header from "../src/components/Header/Header";
import Footer from "./components/Footer/Footer";
import Competitions from "./components/Competitions/Competitions";
import Competition from "./components/Competition/Competition";
import Home from "./components/Home/Home";
import Contacts from "./components/Contacts/Contacts";
import Livescore from './components/LiveScore/LiveScore';
import Matches from "./components/Matches/Matches";
import NotFound from "./components/Error/NotFound";
import Standing from "./components/Standing/Standing";
import Teams from "./components/Teams/Teams";
import GoalScorers from "./components/GoalScorers/GoalScorers";
import Team from "./components/Team/Team";
import Match from "./components/Match/Match";
import Person from "./components/Person/Person";
import SomethingWentWrong from "./components/Error/SomethingWentWrong";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";

function App() {
	return (
		<div className="site-wrap">
			<MobileMenu />
			<Header />
			<Routes>
				<Route path="*" element={<NotFound />} />
				<Route path="/home" element={<Home />} />
				<Route path="/" element={<Home />} />
				<Route path="/error" element={<SomethingWentWrong />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
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