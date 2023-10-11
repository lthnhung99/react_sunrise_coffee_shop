import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

export default function MultiActionAreaCard() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    try {
      async function getPost() {
        let response = await fetch("http://localhost:9000/api/products");
        if (response.ok) {
          let data = await response.json();
          setProduct(data);
        } else {
          console.error("API request failed with status:", response.status);
        }
      }
      getPost();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, []);

  return (
    <Grid container spacing={3}>
      {product &&
        product.length > 0 &&
        product.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  src={item.productAvatar.fileUrl}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}
