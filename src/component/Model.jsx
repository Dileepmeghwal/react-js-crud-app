import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormHelperText, Input, InputLabel, TextField } from "@mui/material";
import { FormControl } from "react-bootstrap";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

export default function BasicModal({ open, onClose, handleSave, selectId }) {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");

  React.useEffect(() => {
    if (selectId) {
      setName(selectId.name);
      setPrice(selectId.price);
    } else {
      setName("");
      setPrice("");
    }
  }, [selectId]);

  const saveData = (e) => {
    e.preventDefault();
    handleSave({
      name: name,
      price: price,
    });
    onClose();
  };
  return (
    <div>
      {open && (
        <div className="custom-model">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input
                type="text"
                class="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                class="form-control"
                placeholder="Price"
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary mt-3"
              onClick={saveData}
            >
              {selectId ? "Update" :"Save"}
            </button>
            <button
              type="submit"
              class="btn btn-primary mt-3"
              onClick={onClose}
            >
              cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
