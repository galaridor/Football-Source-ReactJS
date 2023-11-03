import { Card } from "primereact/card";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import teamsBackground from "/public/images/competition_background.avif";

const RunningCompetitions = ({runningCompetitions}) => {

	const navigate = useNavigate()

	const cardHeader = (competition) => (
		<img src={`${competition?.emblem}`} style={{ width: "150px", margin: '25px' }} alt="Missing Image" className="w-6rem shadow-2 border-round" />
	);

	const cardFooter = (competition) => (
		<div>
			<Button
				label="Details"
				onClick={() => handleCompetitionDetailsClick(competition)}
				icon="pi pi-check"
			/>
		</div>
	);

	const handleCompetitionDetailsClick = (competition) => {
		navigate(`/competitions/${competition.code}`);
	}

	if (runningCompetitions.length > 0) {
		return (
			<div style={{ textAlign: 'center', backgroundImage: `url(${teamsBackground})`}} className="teams-section">
				<h1 style={{color: 'red'}}>All Running Competitions</h1>
				<div style={{whiteSpace: 'normal'}} className="running-competition-container">
					{runningCompetitions.map((competition) => (
						<div style={{ width: '400px', display: 'inline-grid', margin: '15px', height: 'auto', backgroundColor: 'lightgrey'}} className="card flex justify-content-center" key={competition.id}>
							<Card style={{margin: '50px', width:'300px'}} footer={cardFooter(competition)} header={cardHeader(competition)} title={competition.name} className="md:w-25rem">
							</Card>
						</div>
					))}
				</div>
			</div>
		);
	}
	else {
		return null;
	}
}

export default RunningCompetitions;