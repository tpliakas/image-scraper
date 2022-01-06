import React, { useState, useEffect, useRef } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function ImagesList({ imagesList }) {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setHeight(ref.current.clientHeight);
  }, [imagesList]);

  return imagesList ? (
    <ImageList
      ref={ref}
      sx={{ width: "100%", height: height + 100 || "100%" }}
      cols={8}
      rowHeight={164}
    >
      {imagesList.map((item, idx) => (
        <ImageListItem key={idx}>
          <img
            src={`${item}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={`image${idx}`}
            loading="lazy"
            className="image"
          />
        </ImageListItem>
      ))}
    </ImageList>
  ) : null;
}
