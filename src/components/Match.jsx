import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import HeadToHead from "./HeadToHead";

const Match = (props) => {
	const [match, setMatch] = useState(null);

	const { id } = useParams();

	useEffect(() => {
		if (props.match === undefined) { 
			const apiUrl = `http://localhost:3456/matches/${id}/`;

			fetch(apiUrl)
				.then(response => {
					return response.json();
				})
				.then(data => {
					setMatch(data);
					console.log(data);
				})
				.catch(error => {
					console.log(error);
				});
			}
			else {
				setMatch(props.match);
			}
	}, []);

	if (match) {

	let title = props.title ?? `${match.homeTeam.name} - ${match.awayTeam.name}`;

	return (
		<div className="match-section">
			<div className="widget-header">
				<div className="widget-title">
					<h3 style={{ "textAlign": "center" }}>{title}</h3>
				</div>
				<div className="widget-body mb-3">
					<div className="widget-vs">
						<div className="d-flex align-items-center justify-content-around justify-content-between w-100">
							<div className="team-1 text-center">
								<img src={`${match.homeTeam.crest}`} alt="Image" />
								<h3>{match.homeTeam.name}</h3>
							</div>
							<div>
								<span className="vs">
									<span>VS</span>
								</span>
							</div>
							<div className="team-2 text-center">
								<img src={`${match.awayTeam.crest}`} alt="Image" />
								<h3>{match.awayTeam.name}</h3>
							</div>
						</div>
					</div>
				</div>
				<div className="text-center widget-vs-contents mb-4">
					<h4>{match.competition.name}</h4>
					<p className="mb-5">
						<span className="d-block">{match.utcDate}</span>
						<strong className="text-primary">{match.venue}</strong>
						<span className="d-block">{match.referees[0].name}</span>
					</p>
					<div id="date-countdown2" className="pb-1" />
				</div>
			</div>
			<HeadToHead />
		</div>
	)
	}
	else{
		return null;
	}
}

export default Match;