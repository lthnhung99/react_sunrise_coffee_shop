import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid } from "@mui/material";

import QuantityInput from "./QuantityInput";
const Order = ({ addToOrder, order }) => {
  const handleAddToOrder = (product) => {
    addToOrder(product); // Sử dụng prop addToOrder để thêm sản phẩm vào đơn hàng
  };

  return (
    <div>
      {order && order.length > 0 ? (
        order.map((product, index) => (
          <Grid
            container
            alignItems="center"
            spacing={3}
            justifyContent={"space-evenly"}
            key={index}
          >
            <Grid item>
              <Button
                startIcon={
                  <DeleteIcon
                    style={{
                      color: "red",
                    }}
                  />
                }
              ></Button>
            </Grid>
            <Grid item>{product.title}</Grid>
            <Grid item>
              <Button onClick={() => handleAddToOrder(product)}>Add to Order</Button>
            </Grid>
            {/* <Grid item>
            <Button onClick={() => handleAddToOrder(product)}>
              <QuantityInput />
            </Button>
          </Grid> */}
            <Grid item>
              <Button>{product.price}</Button>
            </Grid>
            <Grid item>
              <Button>{product.price}</Button>
            </Grid>
          </Grid>
        ))
      ) : (
        <p>Không có sản phẩm trong đơn hàng.</p>
      )}
    </div>
  );
};

export default Order;
