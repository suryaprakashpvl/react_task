import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Navbar from "../component/navbar"
import {UserRegister} from "../action/user.action"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function RegisterForm() {
  const navigate=useNavigate()
  const [loading, setloading] = useState(false);

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    countrycode: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    countrycode: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    // userName validation
    if (!formData.userName) {
      newErrors.userName = 'userName is required';
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Country Code validation
    if (!formData.countrycode) {
      newErrors.countrycode = 'Country code is required';
      isValid = false;
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character.';
      isValid = false;
    }

if(!formData.confirmPassword){
    newErrors.confirmPassword = 'confirm Password is required';
    isValid = false;
}else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  try{
    if (validate()) {
      setloading(true)

      console.log('Form submitted:', formData);

     const {status,message,error}=await UserRegister(formData)
console.log(status,message,error,"status,message");
if(!status){
  setErrors(error|| {});
}else{
  toast.success(message);
  
  setTimeout(() => {
    navigate("/login")
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
    <>
    <Navbar/>
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="mt-4 text-center">Register</h2>
          {/* <Form > */}
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>userName</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Enter userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    isInvalid={!!errors.userName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.userName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    size="sm"
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Country Code</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Enter country code"
                    name="countrycode"
                    value={formData.countrycode}
                    onChange={handleChange}
                    isInvalid={!!errors.countrycode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.countrycode}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Enter phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    size="sm"
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    size="sm"
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col xs="auto">
                <Button variant="primary" onClick={handleSubmit} size="sm">
                  
                  {
                    loading? <i class="fa fa-spinner fa-spin" style={{fontSize:"24px"}}>
                    </i>
                    : "Register"
                }
                </Button>
              </Col>
             
            </Row>
            <br></br>
            <a href='/login'>Already have Account</a>
          {/* </Form> */}
        </Col>
      </Row>
      <br></br>
      <br></br>
    </Container>
    </>
  );
}

export default RegisterForm;
