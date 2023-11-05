import { useEffect, useState } from "react";
import Match from "../Match/Match";
import Standing from "../Standing/Standing";

const FixtureOnFocus = () => {
	const [matchOnFocus, setMatchOnFocus] = useState(null);

	useEffect(() => {
		const id = 327117;

		const apiUrl = `http://localhost:3456/matches/${id}/`;

		fetch(apiUrl)
			.then(response => {
				return response.json();
			})
			.then(data => {
				setMatchOnFocus(data);
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	if (matchOnFocus) {
		return (
			<div className="fixture-on-focus-section">
				<div className="site-section bg-dark">
					<div className="container">
						<div className="row">
							<div className="col-lg-5">
								<Match match={matchOnFocus} title="Next Fixture on Focus" />
							</div>
							<div className="col-lg-7">
								<Standing alias={matchOnFocus.competition.code} type="short" />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	else {
		return null;
	}
}

export default FixtureOnFocus;