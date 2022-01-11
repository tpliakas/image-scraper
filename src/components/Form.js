import { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import HttpIcon from "@mui/icons-material/Http";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const defaultValues = {
  url: "",
  folder: "scraped-images",
  imageNames: "alt-title",
};

const defaultErrors = {
  url: false,
  folder: false,
  imageNames: false,
};

const defaultRequestError = "An error occurred. Please try again later.";

const folderRegex = /[A-Za-z0-9\-_]+$/;

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

// TODO: Error handling
const Form = ({ setRequestError, setImagesList, setLoading }) => {
  const [formValues, setFormValues] = useState(defaultValues);
  // const [error, setError] = useState(defaultErrors);
  const prevValue = usePrevious(formValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formValues === prevValue) return;

    setImagesList([]);
    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    };
    try {
      const response = await fetch("/scrape", requestOptions);
      const result = await response.json();
      setImagesList(result?.images);
      setLoading(false);
    } catch (error) {
      setRequestError(defaultRequestError);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <Grid container spacing={0} style={{ paddingTop: "2rem" }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Enter a URL to scrape"
            id="url"
            name="url"
            variant="filled"
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <HttpIcon fontSize="large" />
                </InputAdornment>
              ),
            }}
            value={formValues.url || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} lg={6} style={{ marginTop: "4rem" }}>
          <TextField
            required
            id="folder"
            name="folder"
            label="Folder name"
            variant="standard"
            autoComplete="off"
            error={!formValues.folder.match(folderRegex)}
            helperText={
              !formValues.folder.match(folderRegex)
                ? "Character not allowed"
                : "The folder that will be created to store the images"
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CreateNewFolderIcon />
                </InputAdornment>
              ),
            }}
            value={formValues.folder}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} lg={6} style={{ marginTop: "4rem" }}>
          <Box display="flex" justifyContent="flex-end">
            <FormControl component="fieldset">
              <FormLabel component="legend">For image name use:</FormLabel>
              <RadioGroup
                required
                row
                name="imageNames"
                value={formValues.imageNames}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="alt-title"
                  control={<Radio />}
                  label="alt / title"
                />
                <FormControlLabel
                  value="number"
                  control={<Radio />}
                  label="index number"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>
        <Grid item lg={12} style={{ textAlign: "center", paddingTop: "2rem" }}>
          <Button
            variant="contained"
            disableElevation
            style={{ marginTop: "2rem" }}
            type="submit"
          >
            Scrape
          </Button>
          <Button
            style={{ marginTop: "2rem", marginLeft: "1rem" }}
            onClick={() => {
              setFormValues(defaultValues);
              setImagesList([]);
              setRequestError(null)
            }}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
