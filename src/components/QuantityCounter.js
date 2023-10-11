import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function QuantityCounter() {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RemoveIcon className="rounded-icon" onClick={handleDecrement} />
        <TextField
          type="number"
          variant="standard"
          value={quantity}
          style={{
            width: "50px",
            alignContent: "center",
            marginLeft: "5px",
          }}
        />
        <AddIcon className="rounded-icon" onClick={handleIncrement} />
      </div>
    </div>
  );
}

export default QuantityCounter;
