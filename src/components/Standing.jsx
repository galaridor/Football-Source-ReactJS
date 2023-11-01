import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

// Mock data for now, will use real data soon :)
const data = [
	{
		postition: "1",
		team: "Team 1",
		wins: 23,
		draws: 3,
		losses: 1,
		points: 72,
	},
	{
		postition: "2",
		team: "Team 2",
		wins: 20,
		draws: 3,
		losses: 4,
		points: 63,
	},
	{
		postition: "3",
		team: "Team 3",
		wins: 15,
		draws: 6,
		losses: 6,
		points: 51,
	},
	{
		postition: "4",
		team: "Team 4",
		wins: 10,
		draws: 7,
		losses: 10,
		points: 37,
	},
	{
		postition: "5",
		team: "Team 5",
		wins: 7,
		draws: 5,
		losses: 15,
		points: 26,
	},
	{
		postition: "6",
		team: "Team 6",
		wins: 5,
		draws: 7,
		losses: 15,
		points: 22,
	},
	{
		postition: "7",
		team: "Team 7",
		wins: 3,
		draws: 10,
		losses: 14,
		points: 19,
	},
	{
		postition: "8",
		team: "Team 8",
		wins: 1,
		draws: 6,
		losses: 20,
		points: 9,
	},
];

const Standing = (props) => {
	const rowClassName = (rowIndex) => {
		return "data-set-row";
	};

	return (
		<div className="standing-section">
			<div className="widget-header">
				<DataTable
					value={data}
					sortMode="multiple"
					paginator
					rows={5}
					rowsPerPageOptions={[5, 10, 15, 20, 50]}
					totalRecords={data.length}
					rowClassName={rowClassName}
				>
					<Column field="postition" header="P" />
					<Column field="team" header="Team" sortable />
					<Column field="wins" header="W" sortable />
					<Column field="draws" header="D" sortable />
					<Column field="losses" header="L" sortable />
					<Column field="points" header="PTS" sortable />
				</DataTable>
			</div>
		</div>
	);
};

export default Standing;