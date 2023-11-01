import Match from "./Match";
import Standing from "./Standing";

const FixtureOnFocus = (props) => {
	return (
		<div className="fixture-on-focus-section">
			<div className="site-section bg-dark">
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<Match title="Next Fixture on Focus" />
						</div>
						<div className="col-lg-6">
							<Standing />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FixtureOnFocus;