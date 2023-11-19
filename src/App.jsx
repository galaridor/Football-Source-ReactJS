import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import 'primeicons/primeicons.css';
import { Routes, Route } from "react-router-dom";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import Header from "../src/components/Header/Header";
import Footer from "./components/Footer/Footer";
import Competitions from "./components/Competitions/Competitions";
import Competition from "./components/Competition/Competition";
import Home from "./components/Home/Home";
import Contacts from "./components/Contacts/Contacts";
import Livescore from './components/LiveScore/LiveScore';
import MatchesPage from "./components/Matches/MatchesPage";
import NotFound from "./components/Error/NotFound";
import StandingPage from "./components/Standing/StandingPage";
import Teams from "./components/Teams/Teams";
import GoalScorers from "./components/GoalScorers/GoalScorers";
import Team from "./components/Team/Team";
import MatchPage from "./components/Match/MatchPage";
import Person from "./components/Person/Person";
import SomethingWentWrong from "./components/Error/SomethingWentWrong";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import SearchResult from "./components/Search/SearchResult";
import UpcomingEventsAdminPage from "./components/UpcomingEvent/UpcomingEventsAdminPage";
import FavouriteTeams from "./components/FavouriteTeams/FavouriteTeams";

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
				<Route path="/search/:phrase" element={<SearchResult />} />
				<Route path="/competitions" element={<Competitions />} />
				<Route path="/competitions/:alias" element={<Competition />} />
				<Route path="/competitions/:alias/standing/:type" element={<StandingPage />} />
				<Route path="/competitions/:alias/matches" element={<MatchesPage />} />
				<Route path="/competitions/:alias/teams" element={<Teams />} />
				<Route path="/competitions/:alias/goalscorers/:limit" element={<GoalScorers />} />
				<Route path="/teams/:id/" element={<Team />} />
				<Route path="/matches/:id/" element={<MatchPage />} />
				<Route path="/livescore" element={<Livescore />} />
				<Route path="/contacts" element={<Contacts />} />
				<Route path="/people/:id/" element={<Person />} />
				<Route path="/upcoming-events/" element={<UpcomingEventsAdminPage />} />
				<Route path="/my-teams/" element={<FavouriteTeams />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;