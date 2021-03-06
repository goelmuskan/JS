import "./App.css";
import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";

import Card from "./Card";
let divs = [];
function showNameCount(data) {
  divs = [];
  let unique = data
    .map((item) => item.name)
    .filter((value, index, self) => self.indexOf(value) === index);

  const result = unique.map((u) => data.filter((d) => d.name === u).length);

  for (let i = 0; i < result.length; i++) {
    divs.push({ Name: unique[i], Value: result[i] });
  }
  console.log(unique);
  console.log(divs);
}

function TablePage() {
  const url = "http://localhost:3000/students";
  const [data, setData] = useState([]);
  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => setData(resp));
  };

  const columns = [
    {
      title: "Name",
      field: "name",
      validate: (rowData) =>
        rowData.name === undefined || rowData.name === "" ? "Required" : true,
    },
    {
      title: "Email",
      field: "email",
      validate: (rowData) =>
        rowData.email === undefined || rowData.email === "" ? "Required" : true,
    },
    {
      title: "Year",
      field: "year",
      validate: (rowData) =>
        rowData.year === undefined || rowData.year === "" ? "Required" : true,
    },
    {
      title: "Fee",
      field: "fee",
      validate: (rowData) =>
        rowData.fee === undefined || rowData.fee === "" ? "Required" : true,
    },
  ];
  return (
    <>
      <div className="App">
        <h1 align="center">Json-Server</h1>
        <MaterialTable
          title="Student Details"
          columns={columns}
          data={data}
          component={Paper}
          options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        />
        <TableCell>{showNameCount(data)}</TableCell>

      </div>

      
{/*<Grid items={divs}/>*/ }    
      {divs.length > 0
        ? Array.from(divs).map((data, index) => (
            <>
              <Card key={index} name={data} />
            </>
          ))
        : null}
    </>
  );
}

export default TablePage;