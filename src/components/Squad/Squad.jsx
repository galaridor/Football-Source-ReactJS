import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { useNavigate} from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import styles from './Squad.module.css';

const Squad = ({squad}) => {
	const navigate = useNavigate();

	const optionsBodyTemplate = (rowData) => {
		return (
			<div>
				<Button
					label="Details"
					onClick={() => handleClick(rowData)}
					icon="pi pi-check"
				/>
			</div>
		);
	};

	const handleClick = (rowData) => {
		navigate(`/people/${rowData.id}/`);
	};

	if (squad.length > 0) {
			return (
				<div className={styles['squad-section']}>
					<h1 className={styles['squad-title']}>Squad</h1>
					<div className={styles['widget-header']}>
						<DataTable
							value={squad}
							sortMode="multiple"
							paginator
							rows={5}
							rowsPerPageOptions={[5, 10, 15, 20, 50]}
							totalRecords={squad.length}
						>
							<Column field="id" header="ID" sortable />
							<Column field="name" header="Name" sortable />
							<Column field="position" header="Position" sortable />
							<Column field="dateOfBirth" header="Date of Birth" sortable />
							<Column field="nationality" header="Nationality" sortable />
                            <Column header="Options" sortable body={optionsBodyTemplate} />
						</DataTable>
					</div>
				</div>
			);
		} else {
			return 
		}
};

export default Squad;