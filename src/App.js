import { useState } from "react";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import Form from "./components/Form";
import ImagesList from "./components/ImagesList";

import "./App.css";
import bg from "./assets/collage.jpg"

const options = {
  buttons: {
    showDownloadButton: false,
  },
};

function App() {
  const [requestError, setRequestError] = useState("");
  const [imagesList, setImagesList] = useState([]);
  const [folder, setFolder] = useState();
  const [counter, setCounter] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Grid container spacing={2} style={{
        padding: "8rem 2rem",
        background: `linear-gradient( rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.8) ), url(${bg})`,
        backgroundSize: 'cover'
      }}>
        <Grid item xs={0} lg={2} />
        <Grid item xs={12} lg={8}>
          <Typography variant="h3" component="div" color="common.white" gutterBottom>
            <strong>Image scraper</strong>
          </Typography>
          <Typography variant="body1" component="div" color="common.white" gutterBottom>
            When you scrape the images from the desired website, a folder will
            be created in your local machine's downloads folder. Also, you will
            be able to see the images that were downloaded here, in a gallery.
          </Typography>
        </Grid>
        <Grid item xs={0} lg={2} />

        <Grid item xs={0} lg={2} />
        <Grid item xs={12} lg={8}>
          <Form
            setCounter={setCounter}
            setFolder={setFolder}
            setImagesList={setImagesList}
            setLoading={setLoading}
            setRequestError={setRequestError}
          />
          {requestError && (
            <Box m={2} pt={3}>
              <Alert severity="error">{requestError}</Alert>
            </Box>
          )}
        </Grid>
        <Grid item xs={0} lg={2} />
      </Grid>

      {(counter || folder) && (
        <Grid container spacing={2} style={{ padding: "2rem" }}>
          <Grid item xs={0} lg={2} />
          <Grid item xs={12} lg={8}>
            {counter && (
              <Typography variant="body1" component="div" color="#222" gutterBottom>
                <strong>Number of images scraped:</strong> {counter}
              </Typography>
            )}
            {folder && (
              <Typography variant="body1" component="div" color="#222" gutterBottom>
                <strong>System path:</strong> {folder}
              </Typography>
            )}
          </Grid>
          <Grid item xs={0} lg={2} />
        </Grid>
      )}

      {loading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <SimpleReactLightbox>
          <SRLWrapper options={options}>
            <ImagesList imagesList={imagesList} requestError={requestError} />
          </SRLWrapper>
        </SimpleReactLightbox>
      )}
    </>
  );
}

export default App;
