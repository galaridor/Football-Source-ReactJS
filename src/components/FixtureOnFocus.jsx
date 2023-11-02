import Match from "./Match";
import Standing from "./Standing";

const FixtureOnFocus = () => {
	return (
		<div className="fixture-on-focus-section">
			<div className="site-section bg-dark">
				<div className="container">
					<div className="row">
						<div className="col-lg-5">
							<Match title="Next Fixture on Focus" />
						</div>
						<div className="col-lg-7">
							<Standing alias="PL" type="short" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FixtureOnFocus;