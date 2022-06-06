import {useEffect, useState} from "react";
import {
    Alert, AlertTitle,
    Autocomplete,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel, Grid,
    TextField,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";


const cities_countries_data = require("../data/cities_countries_data").default

const initialFormData = (_) => ({
    "Country": cities_countries_data[0].country,
    "City": cities_countries_data[0].cities[0],
    "OtherConditions": "",
    "Allergies": ""
})

export default function Registration(props) {
    const [inputs, setInputs] = useState(initialFormData)
    const [chosenCountry, setChosenCountry] = useState(cities_countries_data[0])
    const [allergiesCheckBox, setAllergiesCheckBox] = useState(false)
    const [otherHealthConditionsCheckBox, setOtherHealthConditionsCheckBox] = useState(false)
    const [addedSuccessfully, setAddedSuccessfully] = useState(false)
    const [addedFailed, setAddedFailed] = useState(false)
    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleCheckBox = (event) => {
        const name = event.target.name;
        const value = event.target.checked;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleCountryDropDownChange = (_, newValue) => {
        setChosenCountry(newValue || cities_countries_data[0])
        setInputs(values => ({...values, "City": newValue?.cities[0], "Country": newValue?.country || ""}))
    }

    const handleCityDropDownChange = (_, newValue) => {
        setInputs(values => ({...values, "City": newValue}))
    }


    const clearForm = () => {
        setInputs(initialFormData)
        setChosenCountry(cities_countries_data[0])
        setAllergiesCheckBox(false)
        setOtherHealthConditionsCheckBox(false)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [addedSuccessfully])

    return (<>
        {addedSuccessfully && (
            <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Successfully added!
            </Alert>
        )}
        <form onSubmit={(e) => {
            setAddedSuccessfully(false)
            setAddedFailed(false)
            fetch("http://127.0.0.1:8000/patient", {
                method: 'POST',
                body: JSON.stringify(inputs),
            })
                .then(data => data.json())
                .then(data => {
                    if (data === "Added Successfully") {
                        clearForm()
                        setAddedSuccessfully(true)
                    } else
                        setAddedFailed(true)
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setAddedFailed(true)
                });
            e.preventDefault()
        }
        }>
            <Grid container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}>
                <Grid item xs="12">
                    <h1>Please fill this registration page</h1>
                </Grid>
                <Grid item xs="12">
                    <TextField label="First Name" name="FirstName" value={inputs.FirstName || ""}
                               onChange={handleInputChange}
                               variant="outlined" required
                               inputProps={{maxLength: 50}}/>
                </Grid>
                <Grid item xs="12">
                    <TextField label="Last Name" name="LastName" value={inputs.LastName || ""}
                               onChange={handleInputChange} variant="outlined" required
                               inputProps={{maxLength: 50}}/>
                </Grid>
                <Grid item xs="12">
                    <TextField InputLabelProps={{shrink: true}} label="Date Of Birth"
                               name="DateOfBirth"
                               value={inputs.DateOfBirth || ""} onChange={handleInputChange}
                               type="date" variant="outlined" min="1990-01-01" max={Date()} required/>
                </Grid>
                <Grid item xs="12">
                    <Autocomplete
                        disablePortal
                        value={chosenCountry}
                        options={cities_countries_data}
                        onChange={handleCountryDropDownChange}
                        getOptionLabel={(option) => option.country}
                        sx={{width: 300}}
                        renderInput={(params) =>
                            (<TextField{...params} label="Choose a country"
                                       inputProps={{
                                           ...params.inputProps,
                                           autoComplete: 'new-password', // disable autocomplete and autofill
                                       }}
                                />
                            )}
                    />
                </Grid>
                <Grid item xs="12">
                    <Autocomplete
                        required
                        options={chosenCountry.cities}
                        sx={{width: 300}}
                        value={inputs.City || chosenCountry.cities[0]}
                        onChange={handleCityDropDownChange}
                        renderInput={
                            (params) =>
                                (<TextField{...params} label="Choose a city"
                                           inputProps={{
                                               ...params.inputProps,
                                               autoComplete: 'new-password',
                                           }}
                                    />
                                )
                        }/>
                </Grid>
                <Grid item xs="12">
                    <TextField label="Address" name="Address"
                               value={inputs.Address || ""} onChange={handleInputChange}
                               type="text" variant="outlined" required
                               inputProps={{maxLength: 50}}/>
                </Grid>
                <Grid item xs="12">
                    <TextField label="Zip Code" name="ZipCode"
                               value={inputs.ZipCode || ""} onChange={handleInputChange}
                               type="text" variant="outlined" inputProps={{maxLength: 50}}/>
                </Grid>
                <Grid item xs="12">
                    <TextField label="LandLine Phone" name="LandLine"
                               value={inputs.LandLine || ""} onChange={handleInputChange}
                               type="number" min="0" variant="outlined" required/>
                </Grid>
                <Grid item xs="12">
                    <TextField id="cellular" label="Cellular Phone" name="Cellular"
                               value={inputs.Cellular || ""} onChange={handleInputChange}
                               type="number" min="0" variant="outlined" required/>
                </Grid>
                <Grid item xs="12">
                    <FormControl>
                        <FormControlLabel
                            control={<Checkbox name="CovidBefore" checked={inputs.CovidBefore}
                                               onChange={handleCheckBox}/>}
                            label="Have you infected by COVID-19 before?"/>
                    </FormControl>
                </Grid>
                <Grid item xs="12">
                    <FormLabel>Previous conditions</FormLabel>
                </Grid>
                <Grid item xs="12">
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox name="Diabetes" checked={inputs.Diabetes}
                                          onChange={handleCheckBox}/>
                            }
                            label="Diabetes"
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs="12">
                    <FormControlLabel
                        control={
                            <Checkbox name="CardioVascular" checked={inputs.CardioVascular}
                                      onChange={handleCheckBox}/>
                        }
                        label="Cardio-Vascular problems"
                    />
                </Grid>
                <Grid item xs="12">
                    <FormControlLabel
                        control={
                            <Checkbox checked={allergiesCheckBox}
                                      onChange={(e) => {
                                          const value = e.target.checked
                                          setAllergiesCheckBox(value)
                                          if (!value) setInputs(values => ({
                                              ...values,
                                              "Allergies": ""
                                          }))
                                      }}/>
                        }
                        label="Allergies"
                    />
                    {allergiesCheckBox && (<TextField
                        id="allergiesText"
                        name="Allergies"
                        label="Allergies"
                        value={inputs.Allergies || ""}
                        onChange={handleInputChange}
                        required
                    />)}
                </Grid>
                <Grid item xs="12">
                    <FormControlLabel
                        control={
                            <Checkbox name="otherConditionsCheckBox"
                                      checked={otherHealthConditionsCheckBox}
                                      onChange={(e) => {
                                          const value = e.target.checked;
                                          if (!value) setInputs(values => ({
                                              ...values,
                                              "OtherConditions": ""
                                          }))
                                          setOtherHealthConditionsCheckBox(value)
                                      }}/>
                        }
                        label="Other Conditions"
                    />
                    {otherHealthConditionsCheckBox && (<TextField
                        name="OtherConditions"
                        label="Other conditions"
                        value={inputs.OtherConditions || ""}
                        onChange={handleInputChange}
                        required
                    />)}
                </Grid>
                <Grid item xs="12">
                    <Button type="submit" variant="contained">SUBMIT!</Button>
                    <Button onClick={clearForm} variant="contained" color="secondary">CLEAR</Button>
                </Grid>
            </Grid>
        </form>
        <Dialog
            open={addedFailed}
            onClose={() => setAddedFailed(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>
                {"Added Failed!"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Added Failed!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setAddedFailed(false)} color="error">Close</Button>
            </DialogActions>
        </Dialog>
    </>)
}