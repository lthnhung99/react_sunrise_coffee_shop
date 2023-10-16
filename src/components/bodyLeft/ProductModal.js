import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { DialogContentText, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

export default function ProductModal({ open, onClose, product, setProduct }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <DialogTitle style={{ fontSize: "30px" }}>Modal order</DialogTitle>
      <DialogContent style={{ display: "flex", flexDirection: "row" }}>
        <DialogContentText style={{ display: "flex", alignItems: "center" }}>
          {" "}
          <img
            src={product.productAvatar.fileUrl}
            alt={product.title}
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
          <h1>{product.title}</h1>
          <p style={{ fontSize: "20px" }}>Giá: {product.price} đ</p>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Số lượng"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={1}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Ghi chú *"
            type="Multiline"
            fullWidth
            variant="standard"
            multiline
            rows={3}
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          startIcon={<ClearIcon />}
          variant="contained"
          onClick={onClose}
          color="error"
        >
          Đóng
        </Button>
        <Button startIcon={<AddIcon />} variant="contained" color="primary">
          Thêm món
        </Button>
      </DialogActions>
    </Dialog>
  );
}
