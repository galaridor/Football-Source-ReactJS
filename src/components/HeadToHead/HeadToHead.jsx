import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import * as matchService from "../../services/matchService";
import styles from "./HeadToHead.module.css";

const HeadToHead = ({ matchId }) => {
  const [headToHeadMatches, setHeadToHeadMatches] = useState([]);
  const [aggregates, setAggregates] = useState([]);

  useEffect(() => {
    matchService
      .getMatchHeadToHeadById(matchId)
      .then((result) => {
        setHeadToHeadMatches(result.matches);
        setAggregates(result.aggregates);
      })
      .catch();
  }, []);

  if (headToHeadMatches.length > 0 && aggregates) {
    return (
      <div className={`${styles["head-to-head-section"]}`}>
        <h1 className={`${styles["head-to-head-title"]}`}>{aggregates.homeTeam.name} vs {aggregates.awayTeam.name} Head To Head Matches</h1>
		<div className={styles['widget-header']}>
				<DataTable
					value={headToHeadMatches}
					sortMode="multiple"
					paginator
					rows={5}
					rowsPerPageOptions={[5, 10, 15, 20, 50]}
					totalRecords={headToHeadMatches.length}
				>
					<Column field="id" header="ID" sortable />
					<Column field="homeTeam.name" header="Home Team Name" sortable />
					<Column field="awayTeam.name" header="Away Team Name" sortable />	
				</DataTable>
			</div>
      </div>
    );
  } else {
    return null;
  }
};

export default HeadToHead;
