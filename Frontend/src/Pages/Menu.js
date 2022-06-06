import {Outlet} from "react-router";
import {Box, Button, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import logo from '../thunder.png'

export default function Menu(props) {
    return (<>
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center">
            <h1>Covid-19 Portal</h1>
            <h3>Idan Baumer</h3>
            <Button onClick={() => props.setLight()}>Toggle Theme</Button>
            <img src={logo} alt="Logo" width="100"/>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Button component={Link} to="/" style={{display: 'flex',  justifyContent:'center'}}>Register</Button>
            </Grid>
            <Grid item xs={6}>
                <Button component={Link} to="/Data" style={{display: 'flex',  justifyContent:'center'}}>Data</Button>
            </Grid>
        </Grid>
        <Outlet/>
    </>)
}