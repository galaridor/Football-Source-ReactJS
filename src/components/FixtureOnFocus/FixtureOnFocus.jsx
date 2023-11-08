import { useEffect, useState } from "react";
import Match from "../Match/Match";
import Standing from "../Standing/Standing";
import * as matchService from '../../services/matchService';
import styles from "./FixtureOnFocus.module.css";

const FixtureOnFocus = () => {
	const [matchOnFocus, setMatchOnFocus] = useState(null);

	useEffect(() => {
		const id = 442012;

		matchService.getMatchById(id)
			.then(result => setMatchOnFocus(result))
			.catch();
	}, []);

	if (matchOnFocus) {
		return (
			<div className={styles['fixture-on-focus-section']}>
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