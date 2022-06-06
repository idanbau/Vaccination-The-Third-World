import {useEffect, useState} from "react";
import axios from 'axios';
import {DataGrid} from '@mui/x-data-grid';
import {Button} from "@mui/material";
import {CSVLink} from "react-csv";

const columns = [
    {field: 'ID', headerName: 'ID', width: 70},
    {field: 'FirstName', headerName: 'First Name', width: 130},
    {field: 'LastName', headerName: 'Last Name', width: 130},
    {field: 'DateOfBirth', headerName: 'Date Of Birth', width: 130},
    {field: 'Country', headerName: 'Country', width: 130},
    {field: 'City', headerName: 'City', width: 130},
    {field: 'Address', headerName: 'Address', width: 130},
    {field: 'ZipCode', headerName: 'Zip Code', width: 130},
    {field: 'LandLine', headerName: 'LandLine Phone', width: 130},
    {field: 'Cellular', headerName: 'Cellular Phone', width: 130},
    {
        field: 'CovidBefore',
        headerName: 'Had Covid Before',
        width: 130,
        valueGetter: (params) => `${boolAnswer(params)}`
    },
    {
        field: 'CardioVascular',
        headerName: 'Cardio Vascular',
        width: 130,
        valueGetter: (params) => boolAnswer(params).toString()
    },
    {field: 'Allergies', headerName: 'Allergies', width: 130},
    {field: 'OtherConditions', headerName: 'Other Conditions', width: 130}
]

const url = 'http://127.0.0.1:8000/patient'

const boolAnswer = (value) => {
    return value ? "Yes" : "No"
}

export default function Data(props) {

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            const result = await axios(url);
            setData(result.data);
        } catch (error) {
            setIsError(true)
        }
        setIsLoading(false)
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (<>

        <Button onClick={fetchData} variant="contained">Refresh</Button>
        {isError && <div>Something went wrong ...</div>}
        {isLoading ? (
            <div className="alert alert-warning">Loading ...</div>
        ) : (
            <>
                <div style={{height: 400, width: "auto"}}>
                    <DataGrid rows={Object.values(data)} getRowId={(row) => row.ID} columns={columns}
                              disableSelectionOnClick/>
                </div>
                <CSVLink data={Object.values(data)} filename={'patients_data.csv'}>
                    <Button>DOWNLOAD CSV FILE</Button>
                </CSVLink>
            </>
        )}

    </>)
}