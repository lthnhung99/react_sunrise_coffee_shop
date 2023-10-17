import React, { useState } from "react";
import { Box, Tab, IconButton } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Order from "../Order";
import MyDropdown from "../headerRight/MyDropdown";
import { Add } from "@mui/icons-material";
import ProductModal from "../bodyLeft/ProductModal";

const ItemOrder = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [order, setOrder] = useState([]);

  const addToOrder = (product) => {
    const existingProduct = order.find((item) => item.id === product.id);

    if (existingProduct) {
      const updatedOrder = order.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setOrder(updatedOrder);
    } else {
      const newProduct = { ...product, quantity: 1 };
      setOrder([...order, newProduct]);
    }
  };

  const openModal = (product) => {
    setModalOpen(true);
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };
  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList aria-label="lab API tabs example">
              <Tab label="Phòng" value="1" />
              <Tab label="Item Three" value="3" />

              <Tab
                icon={
                  <IconButton
                    href="https://github.com/codedthemes/mantis-free-react-admin-template"
                    target="_blank"
                    disableRipple
                    color="secondary"
                    title="Download Free Version"
                    sx={{
                      color: "text.primary",
                      bgcolor: "grey.100",
                      marginRight: "-2px",
                    }}
                  >
                    <Add />
                  </IconButton>
                }
              />
              <MyDropdown />
            </TabList>
          </Box>
          <TabPanel value="1">Phòng</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
          <TabPanel value="2"></TabPanel>
        </TabContext>
      </Box>
      <Box sx={{ flexGrow: "1" }}>
        {/* <Order
          open={modalOpen}
          onClose={closeModal}
          product={selectedProduct}
          addToOrder={addToOrder}
          order={order}
        /> */}
        <ProductModal
          open={modalOpen}
          onClose={closeModal}
          product={selectedProduct}
          addToOrder={addToOrder}
        />
      </Box>
    </div>
  );
};

export default ItemOrder;
