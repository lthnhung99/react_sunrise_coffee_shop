import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { DialogContentText, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import MenuOrderContext from "../MenuOrderContext";
import { useDispatch, useSelector } from "react-redux";
import mainSlice from '../reducers/mainSlice';
import formatPrice from "../bodyRight/FormatPrice";

export default function ProductModal({ open, onClose }) {
  const { selectedProduct, handleAddProduct } = React.useContext(MenuOrderContext);
  const mainFilters = useSelector((state) => state.main.filters);
  const dispatch = useDispatch();

  const quantity = mainFilters.products.quantity;
  const note = mainFilters.products.note;

  const handleQuantityChange = (event) => {
    dispatch(mainSlice.actions.setQuantity(event.target.value));
  };

  const handleNoteChange = (event) => {
    dispatch(mainSlice.actions.setNote(event.target.value));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddProduct(selectedProduct);
    dispatch(mainSlice.actions.setQuantity(1));
    dispatch(mainSlice.actions.setNote(""));
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
      component="form"
    >
      <DialogContent style={{ display: "flex", flexDirection: "row" }}>
        <DialogContentText style={{ display: "flex", alignItems: "center" }}>
          {" "}
          <img
            src={
              selectedProduct && selectedProduct.productAvatar
                ? selectedProduct.productAvatar.fileUrl
                : ""
            }
            alt={selectedProduct ? selectedProduct.title : ""}
            style={{ width: "300px", height: "300px" }}
          />
        </DialogContentText>
        <div
          style={{
            flex: "1",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            width: "500px",
          }}
        >
          <h1>
            {selectedProduct && selectedProduct.title
              ? selectedProduct.title
              : "Product Title Not Available"}
          </h1>

          <p style={{ fontSize: "20px" }}>
            Giá:{" "}
            {selectedProduct && selectedProduct.price ? formatPrice(selectedProduct.price) : "Price Not Available"}
          </p>

          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Số lượng"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={quantity}
            onChange={handleQuantityChange}
            inputProps={{
              min: 1,
              max: 99
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="note"
            label="Ghi chú *"
            type="multiline"
            fullWidth
            variant="standard"
            multiline
            rows={3}
            defaultValue={note}
            onChange={handleNoteChange}
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          type="submit"
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Thêm món
        </Button>
        <Button
          startIcon={<ClearIcon />}
          variant="contained"
          onClick={onClose}
          color="error"
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}
