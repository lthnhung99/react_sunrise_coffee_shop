import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid } from "@mui/material";
import QuantityCounter from "./QuantityCounter";
import QuantityInput from "./QuantityInput";

const Order = () => {
  return (
    <Grid
      container
      alignItems="center"
      spacing={3}
      justifyContent={"space-evenly"}
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
      <Grid item>Trà sữa</Grid>
      <Grid item>
        <Button>
          <QuantityInput />
        </Button>
      </Grid>
      <Grid item>
        <Button>30.000</Button>
      </Grid>
      <Grid item>
        <Button>30.000</Button>
      </Grid>
    </Grid>
  );
};

export default Order;
