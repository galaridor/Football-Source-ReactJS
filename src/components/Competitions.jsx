import React, { useState, useEffect } from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const Competitions = (props) => {
    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
      const apiKey = '9c5d28d5c644455a94efe4e3c2e4befc';
      const apiUrl = 'https://api.football-data.org/v4/competitions/';

      fetch(apiUrl, {
        method: 'GET',
        headers: {'X-Auth-Token': apiKey}, 
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
            setCompetitions(data.competitions);
            console.log(data.competitions);
        })
        .catch(error => {
          console.log(error);
        });
    }, []); 
  
    const rowClassName = (rowIndex) => {
        return "data-set-row";
    };

    const handleNameClick = (rowData) => {
        // Add your custom click event logic here
        console.log("Name clicked:", rowData.code);
        // You can perform any action you want when the name is clicked
      };

    const imageBodyTemplate = (product) => {
        return <img src={`${product.emblem}`} style={{width: "150px"}} alt="Missing Image" className="w-6rem shadow-2 border-round" />;
    };

    return (
      <div className="competitions-section">
        <h2 style={{textAlign: "center"}}>All Competitions</h2>
        <div className="widget-header">
          <DataTable
            value={competitions}
            sortMode="multiple"
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 15, 20, 50]}
            totalRecords={competitions.length}
          >
            <Column field="id" header="ID" sortable style={{width: "150px"}}/>
            <Column
              field="name"
              header="Competition Name"
              style={{width: "150px"}}
              body={(rowData) => (
                <div onClick={() => handleNameClick(rowData)}>
                  {rowData.name}
                </div>
              )}
              sortable
            />
            <Column  header="Emblem" body={imageBodyTemplate} style={{width: "150px"}}/>
            <Column field="code" header="Code" sortable style={{width: "150px"}}/>
            <Column field="area.name" header="Area" sortable style={{width: "150px"}}/>
            <Column
              field="currentSeason.currentMatchday"
              header="Current Matchday"
              sortable
              style={{width: "150px"}}
            />
            <Column style={{width: "150px"}} field="currentSeason.startDate" header="Start Date" sortable/>
            <Column style={{width: "150px"}} field="currentSeason.endDate" header="End Date" sortable/>
          </DataTable>
        </div>
      </div>
    );
}

export default Competitions;