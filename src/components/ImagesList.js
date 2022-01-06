import React, { useState, useEffect, useRef } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      bigMobile: 480,
      tablet: 1024,
      desktop: 1280,
    },
  },
});

export default function ImagesList({ imagesList }) {
  const ref = useRef(null);

  return imagesList ? (
    <ThemeProvider theme={theme}>
      <Box
        ref={ref}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            mobile: "repeat(1, 200px)",
            bigMobile: "repeat(2, 200px)",
            tablet: "repeat(4, 200px)",
            desktop: "repeat(5, 200px)",
          },
          gridTemplateRows: {
            mobile: "200px",
            bigMobile: "200px 200px ",
            tablet: "200px 200px 200px 200px",
            desktop: "200px 200px 200px 200px 200px ",
          },
          maxWidth: 1600,
          gap: "0.2rem",
        }}
        cols={8}
        rowHeight={164}
        style={{
          margin: "0 auto",
          padding: "1rem",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        {imagesList.map((item, idx) => (
          <ImageListItem key={idx}>
            <img
              src={`${item}?w=150&h=150&fit=crop&auto=format`}
              srcSet={`${item}?w=150&h=150&fit=crop&auto=format&dpr=2 2x`}
              alt={`image${idx}`}
              loading="lazy"
              className="image"
            />
          </ImageListItem>
        ))}
      </Box>
    </ThemeProvider>
  ) : null;
}
