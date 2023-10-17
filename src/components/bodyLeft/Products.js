import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, ButtonGroup, CardActionArea, FormControl, Grid } from "@mui/material";
import useProducts from "../../hooks/useProducts";
import Loading from "../loading/Loading";
import { useState } from "react";
import ProductModal from "./ProductModal";

export default function Products({ search }) {
  const { product, isLoading } = useProducts(search);
  const [selectedCate, setSelectedCate] = React.useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cateTitle = [...new Set(product.map(item => item.category.title))]

  const filteredProduct = selectedCate
    ? product.filter(item => item.category.title === selectedCate).sort((a, b) => a.title.localeCompare(b.title))
    : product.sort((a, b) => a.title.localeCompare(b.title));

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>

      <Box sx={{ marginBottom: "10px" }}>
        <FormControl component="fieldset">
          <ButtonGroup
            aria-label="floor"
            name="floor"
            value={selectedCate}
            variant="outlined"
            sx={{
              flexDirection: "row",
              "& .MuiButton-root": {
                borderRadius: "10px"
              }
            }}
          >
            {isLoading ? (
              ""
            ) : (
              <Button style={{ marginRight: "10px", borderRight: "solid 1px" }}
                onClick={() => setSelectedCate("")}
                variant={selectedCate === "" ? "contained" : "outlined"}
              >
                Tất cả
              </Button>
            )}

            {cateTitle.sort().map((title) => (
              <Button style={{ marginRight: "10px", borderRight: "solid 1px" }}
                key={title}
                onClick={() => setSelectedCate(title)}
                variant={selectedCate === title ? "contained" : "outlined"}
              >
                {title}
              </Button>
            ))}
          </ButtonGroup>
        </FormControl>
      </Box>

      {isLoading ? (
        <Loading />
      ) : (
        <Grid container spacing={4} sx={{ maxWidth: "100%", margin: "5px 10px 0 0" }}>
          {filteredProduct.length > 0 ? (
            filteredProduct.map((item) => (
              <Grid item xs={6} sm={6} md={3} key={item.id}>
                <Card style={{ height: "250px" }}
                  onClick={() => openModal(item)}>
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
                      <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2">
                          {item.price} đ
                        </Typography>
                        <Typography variant="body2">
                          {item.unit.title}
                        </Typography>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body2">Không có sản phẩm phù hợp.</Typography>
          )}
        </Grid>
      )}
      {selectedProduct && (
        <ProductModal
          open={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
        />
      )}
    </Box>


  );
}
