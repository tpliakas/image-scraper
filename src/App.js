import { useState } from "react";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Form from "./components/Form";
import ImagesList from "./components/ImagesList";

import "./App.css";

const options = {
  buttons: {
    showDownloadButton: false,
  },
};

function App() {
  const [imagesList, setImagesList] = useState([]);

  return (
    <>
      <Grid container spacing={2} style={{ padding: "2rem" }}>
        <Grid item xs={0} lg={2} />
        <Grid item xs={12} lg={8}>
          <Typography variant="h3" component="div" gutterBottom>
            Image scraper
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            When you scrape the images from the desired website, a folder will be
            created in your local machine's downloads folder. Also, you will be
            able to see the images that were downloaded here, in a gallery.
          </Typography>
        </Grid>
        <Grid item xs={0} lg={2} />

        <Grid item xs={0} lg={2} />
        <Grid item xs={12} lg={8}>
          <Form setImagesList={setImagesList} />
        </Grid>
          <Grid item xs={0} lg={2} />

        <SimpleReactLightbox>
          <SRLWrapper options={options}>
            <ImagesList imagesList={imagesList} />
          </SRLWrapper>
        </SimpleReactLightbox>
      </Grid>
    </>
  );
}

export default App;
