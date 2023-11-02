import { useParams  } from "react-router-dom"

const Team = () => {
	const { id } = useParams()
	console.log(id);

	return (
		<div className="team-section">
			<h1>Team</h1>
		</div>
	)
}

export default Team;