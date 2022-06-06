import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Data from "./Pages/Data";
import Registration from "./Pages/Registration";
import Menu from "./Pages/Menu";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useState} from "react";
import {CssBaseline} from "@mui/material";

const themeLight = createTheme({
    palette: {
        background: {
            default: "#00ff9d"
        }
    }
});

const themeDark = createTheme({
    palette: {
        background: {
            default: "#222222"
        },
        text: {
            primary: "#ffffff"
        }
    }
});


function App() {
    const [light, setLight] = useState(true);
    return (
        <ThemeProvider theme={light ? themeLight : themeDark}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Menu setLight={()=> !setLight(!light)}/>}>
                        <Route index element={<Registration light/>}/>
                        <Route path="/Data" element={<Data/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
