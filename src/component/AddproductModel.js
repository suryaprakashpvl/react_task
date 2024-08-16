import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {AddProduct} from "../action/user.action"
import { toast } from 'react-toastify';

function ProductModal({ show, handleClose }) {
    const [loading, setloading] = useState(false);

  const [formData, setFormData] = useState({
    productName: '',
    productQuantity: '',
    productPrice: ''
  });

  const [errors, setErrors] = useState({
    productName: '',
    productQuantity: '',
    productPrice: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (name in errors) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    const { productName, productQuantity, productPrice } = formData;
    const newErrors = {};

    if (!productName.trim()) {
      newErrors.productName = 'Product Name is required.';
    }

    if (productQuantity <= 0 || !productQuantity.trim()) {
      newErrors.productQuantity = 'Quantity must be greater than zero and not empty.';
    }

    if (productPrice <= 0 || !productPrice.trim()) {
      newErrors.productPrice = 'Price must be greater than zero and not empty.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        if (validate()) {
            setloading(true)
          // Handle form submission
          console.log('Form submitted:', formData);
    
          const reqdata={
            pname:formData.productName,
            pqty:formData.productQuantity,
            pprice:formData.productPrice
          }
          const {status,message}=await AddProduct(reqdata)
    console.log(status,message);
      if(status){
        toast.success(message);
        handleClose();
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }  
        }
    }catch(err){
console.log(err);

    }finally{
        setloading(false)

    }

  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={formData.productName}
              onChange={handleChange}
              isInvalid={!!errors.productName}
              
            />
            <Form.Control.Feedback type="invalid">
              {errors.productName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="productQuantity" className="mt-3">
            <Form.Label>Product Quantity</Form.Label>
            <Form.Control
              type="number"
              name="productQuantity"
              placeholder="Enter product quantity"
              value={formData.productQuantity}
              onChange={handleChange}
              isInvalid={!!errors.productQuantity}
              
            />
            <Form.Control.Feedback type="invalid">
              {errors.productQuantity}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="productPrice" className="mt-3">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="productPrice"
              placeholder="Enter product price"
              value={formData.productPrice}
              onChange={handleChange}
              isInvalid={!!errors.productPrice}
              
            />
            <Form.Control.Feedback type="invalid">
              {errors.productPrice}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="mt-4">
            <Button variant="primary" type="submit">
            {
                    loading? <i class="fa fa-spinner fa-spin" style={{fontSize:"24px"}}>
                    </i>
                    : "Add Product"
                }
              
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ProductModal;
