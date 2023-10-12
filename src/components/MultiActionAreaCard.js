import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import useProducts from "../hooks/useProducts";

export default function MultiActionAreaCard({ search }) {
  const { product } = useProducts(search);

  return (
    <Grid container spacing={4} sx={{ maxWidth: "100%", margin: "5px 10px 0 0" }}>
      {product &&
        product.length > 0 &&
        product.map((item) => (
          <Grid item xs={6} sm={6} md={3} key={item.id} >
            <Card style={{ height: "250px" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
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
