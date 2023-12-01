/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, ButtonGroup, CardActionArea, FormControl, Grid, Tooltip, Zoom } from "@mui/material";
import Loading from "../loading/Loading";
import { useState } from "react";
import ProductModal from "./ProductModal";
import Pageable from "../pageable/Pageable";
import MenuOrderContext from "../MenuOrderContext";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, loadCategory, loadProduct } from '../reducers/mainSlice';
import { useNavigate } from 'react-router-dom';
import formatPrice from "../bodyRight/FormatPrice";
import CustomTypography from "../../constant/CustomTypography";
import NoDrinksIcon from '@mui/icons-material/NoDrinks';
import swal from 'sweetalert';
import { useEffect } from "react";

export default function Products() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadCategory());
  }, []);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const [selectedCate, setSelectedCate] = React.useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedProduct, setSelectedProduct } = React.useContext(MenuOrderContext);

  const product = useSelector((state) => state.main.data.products) || [];
  const category = useSelector((state) => state.main.data.categories);
  const mainFilters = useSelector((state) => state.main.filters);
  const isLoading = useSelector((state) => state.main.loading);

  const arrProduct = [...product];
  const filteredProduct = selectedCate
    ? arrProduct?.filter(item => item.category.id === selectedCate).sort((a, b) => a.title.localeCompare(b.title))
    : arrProduct?.sort((a, b) => a.title.localeCompare(b.title));

  const openModal = (product) => {
    if (mainFilters.tableSelected === "") {
      swal({
        title: "Vui lòng chọn bàn trước!",
        icon: "error",
      }).then(() => {
        navigate('/');
      });
    } else {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    dispatch(loadProduct({
      search: mainFilters.search,
      category: selectedCate,
      page: 0,
      size: mainFilters.products.size,
      totalPages: mainFilters.products.totalPages
    }));
  }, [mainFilters.search, selectedCate]);

  const setPage = (page) => {
    dispatch(loadProduct({
      page: page,
      category: selectedCate,
      size: mainFilters.products.size,
      search: mainFilters.search,
      totalPages: mainFilters.products.totalPages
    }))
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Box sx={{ marginBottom: "10px", overflowX: "auto" }}>
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
            <Button style={{ marginRight: "10px", borderRight: "solid 1px" }}
              onClick={() => setSelectedCate("")}
              variant={selectedCate === "" ? "contained" : "outlined"}
            >
              Tất cả
            </Button>
            {category?.map((item) => (
              <Button style={{ marginRight: "10px", borderRight: "solid 1px" }}
                key={item.title}
                onClick={() => setSelectedCate(item.id)}
                variant={selectedCate === item.id ? "contained" : "outlined"}
              >
                {item.title}
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
            filteredProduct?.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={"product" + item.id}>
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
                      <Tooltip title={item.title} placement="top" TransitionComponent={Zoom}>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.title.length > 12 ? `${item.title.slice(0, 12)}...` : item.title}
                        </Typography>
                      </Tooltip>
                      <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2">
                          {formatPrice(item.price)}
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
            <CustomTypography variant="body2" sx={{ marginTop: "20%", textAlign: "center", width: "100%" }}>
              <NoDrinksIcon />
              <Typography variant="h3">Không tìm thấy đồ uống phù hợp</Typography>
            </CustomTypography>
          )}
          <Pageable page={mainFilters.products.page + 1} setPage={setPage} totalPage={mainFilters.products.totalPages} />
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
