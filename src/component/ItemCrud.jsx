// src/components/ItemCrud.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getAllItems, addItem, updateItem, deleteItem } from "../api";

const ItemCrud = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await getAllItems();
    setItems(data);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({ name: "" });
    setEditItemId(null);
  };

  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editItemId) {
      await updateItem(editItemId, formData);
    } else {
      await addItem(formData);
    }
    handleClose();
    loadItems();
  };

  const handleEdit = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    setFormData(itemToEdit);
    setEditItemId(id);
    handleShow();
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    loadItems();
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <Button variant="primary" onClick={handleShow}>
        Add Item
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editItemId ? "Edit Item" : "Add Item"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formItemName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editItemId ? "Update" : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}{" "}
            <Button variant="warning" onClick={() => handleEdit(item.id)}>
              Edit
            </Button>{" "}
            <Button variant="danger" onClick={() => handleDelete(item.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemCrud;
