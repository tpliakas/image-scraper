import {useState} from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import LinkIcon from '@mui/icons-material/Link';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import './App.css';

const defaultValues = {
    url: '',
    folder: 'scraped-images',
    imageNames: 'alt-title'
}

const defaultErrors = {
    url: false,
    folder: false,
    imageNames: false
}

const folderRegex = /[A-Za-z0-9\-_]+$/;

function App() {
    const [formValues, setFormValues] = useState(defaultValues);
    const [errors, setErrors] = useState(defaultErrors);

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        console.log(name, value , e)

        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues)
        };
        fetch('/scrape', requestOptions)
            .then(response => response.json())
            .catch(error => console.log(error))
    };


    return (
        <form onSubmit={handleSubmit} method="post">
            <Grid container
                  spacing={0}
                  style={{padding: '2rem'}}>
                <Grid item xs={0} lg={2}/>
                <Grid item xs={12} lg={8}>
                    <TextField
                        fullWidth
                        required
                        label="Enter a URL to scrape"
                        id="url"
                        name="url"
                        variant="filled"
                        autoComplete='off'
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <LinkIcon fontSize="large"/>
                            </InputAdornment>,
                        }}
                        value={formValues.url || ''}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={0} lg={2}/>
                <Grid item xs={0} lg={2}/>
                <Grid item xs={12} lg={6} style={{marginTop: '2rem'}}>
                    <TextField
                        required
                        id="folder"
                        name="folder"
                        label="Folder name"
                        variant="standard"
                        autoComplete='off'
                        error={!formValues.folder.match(folderRegex)}
                        helperText={!formValues.folder.match(folderRegex) ? 'Character not allowed' : 'The folder that will be created to store the images'}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <CreateNewFolderIcon/>
                            </InputAdornment>,
                        }}
                        value={formValues.folder}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} lg={4} style={{marginTop: '2rem'}}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">For image name use:</FormLabel>
                        <RadioGroup required row aria-label="gender" name="imageNames" value={formValues.imageNames}
                                    onChange={handleInputChange}>
                            <FormControlLabel value="alt-title" control={<Radio/>} label="alt / title"/>
                            <FormControlLabel value="number" control={<Radio/>} label="index number"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={0} lg={2}/>
                <Grid item lg={12} style={{textAlign: "center"}}>
                    <Button variant="contained"
                            disableElevation
                            style={{marginTop: '2rem'}}
                            type='submit'>
                        Scrape
                    </Button>
                    <Button
                        style={{marginTop: '2rem', marginLeft: '1rem'}}
                        onClick={() => setFormValues(defaultValues)}>
                        Clear
                    </Button>
                </Grid>

            </Grid>
        </form>);
}

export default App;
