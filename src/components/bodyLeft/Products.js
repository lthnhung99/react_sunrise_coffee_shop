import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, ButtonGroup, CardActionArea, FormControl, Grid } from "@mui/material";
import Loading from "../loading/Loading";
import { useState } from "react";
import ProductModal from "./ProductModal";
import Pageable from "../pageable/Pageable";
import MenuOrderContext from "../MenuOrderContext";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from '../reducers/mainSlice';
import { useNavigate } from 'react-router-dom';


export default function Products({ search }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setPage = (page) => {
    dispatch(loadProduct({
      page: page, size: mainFilters.size,
      search: mainFilters.search, totalPages: mainFilters.totalPages
    }))
  }
  const [selectedCate, setSelectedCate] = React.useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedProduct, setSelectedProduct } = React.useContext(MenuOrderContext);

  const product = useSelector((state) => state.main.data.products);
  const mainFilters = useSelector((state) => state.main.filters);
  const isLoading = useSelector((state) => state.main.loading);


  const cateTitle = [...new Set(product?.map(item => item.category.title))]

  const arrProduct = [...product];
  const filteredProduct = selectedCate
    ? arrProduct?.filter(item => item.category.title === selectedCate).sort((a, b) => a.title.localeCompare(b.title))
    : arrProduct?.sort((a, b) => a.title.localeCompare(b.title));

  const openModal = (product) => {
    if (mainFilters.tableSelected === "") {
      navigate('/');
      alert("vui lòng chọn bàn")
    } else {
      setSelectedProduct(product)
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>

      <Box sx={{ marginBottom: "10px" }}>
        <FormControl component="fieldset">
          {isLoading ? (
            ""
          ) : (
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
              <Button style={{ marginRight: "10px", borderRight: "solid 1px" }}
                onClick={() => setSelectedCate("")}
                variant={selectedCate === "" ? "contained" : "outlined"}
              >
                Tất cả
              </Button>
              {cateTitle.sort()?.map((title) => (
                <Button style={{ marginRight: "10px", borderRight: "solid 1px" }}
                  key={title}
                  onClick={() => setSelectedCate(title)}
                  variant={selectedCate === title ? "contained" : "outlined"}
                >
                  {title}
                </Button>
              ))}
            </ButtonGroup>
          )}
        </FormControl>
      </Box>

      {isLoading ? (
        <Loading />
      ) : (
        <Grid container spacing={4} sx={{ maxWidth: "100%", margin: "5px 10px 0 0" }}>
          {filteredProduct.length > 0 ? (
            filteredProduct?.map((item) => (
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
          <Pageable page={mainFilters.page + 1} setPage={setPage} totalPage={mainFilters.totalPages} />
        </Grid>
      )}
      {selectedProduct && (
        <ProductModal
          open={isModalOpen}
          onClose={closeModal}
        />
      )}
    </Box>
  );
}
