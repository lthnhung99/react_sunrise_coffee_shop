import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { DialogContentText, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import MenuOrderContext from "../main/MenuOrderContext";
import { useDispatch } from "react-redux";
import mainSlice from '../reducers/mainSlice';
import formatPrice from "../bodyRight/FormatPrice";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";

const orderFormSchema = yup
  .object()
  .shape({
    quantity: yup.number()
      .typeError('Số lượng phải là một số')
      .integer('Số lượng phải là số nguyên')
      .min(1, 'Số lượng phải lớn hơn hoặc bằng 1')
      .max(99, 'Số lượng phải nhỏ hơn hoặc bằng 99')
  }).required();

export default function ProductModal({ open, onClose }) {
  const { selectedProduct, handleAddProduct } = React.useContext(MenuOrderContext);
  const dispatch = useDispatch();
  const ref = useRef();
  const ref2 = useRef();

  const { handleSubmit, formState: { errors }, reset, control } = useForm({
    resolver: yupResolver(orderFormSchema)
  });

  const handleNoteChange = (event) => {
    dispatch(mainSlice.actions.setNote(event.target.value));
  }

  const onSubmit = () => {
    handleAddProduct({
      ...selectedProduct,
      quantity: +ref.current.value || 1,
      note: ref2.current.value
    });
    dispatch(mainSlice.actions.setQuantity(1));
    dispatch(mainSlice.actions.setNote(""));
    onClose();
    reset();
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
      onSubmit={handleSubmit(onSubmit)}
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
          <Controller
            as={TextField}
            render={({ field }) => {
              const value = field.value?.toString().slice(0, 3);
              const displayValue = value?.length <= 3 ? parseInt(value) : "";
              return (
                <TextField
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  helperText={errors.quantity?.message}
                  error={errors['quantity'] ? true : false}
                  margin={"dense"}
                  id={"quantity"}
                  type={'number'}
                  autoFocus
                  label={'Số lượng'}
                  inputRef={ref}
                  value={displayValue || 1}
                />
              )
            }}
            name={'quantity'}
            control={control}
          />
          <TextField
            autoFocus
            margin="dense"
            id="note"
            label="Ghi chú *"
            type="multiline"
            multiline
            rows={3}
            defaultValue={""}
            inputRef={ref2}
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
        >
          Thêm món
        </Button>
        <Button
          startIcon={<ClearIcon />}
          variant="contained"
          onClick={() => {
            onClose();
            reset();
          }}
          color="error"
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}
