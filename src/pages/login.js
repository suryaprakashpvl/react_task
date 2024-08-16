import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Navbar from "../component/navbar"
import {UserLogin} from "../action/user.action"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function LoginForm() {
    const navigate=useNavigate()
    const [loading, setloading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
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

    // email validation
    if (!formData.email) {
      newErrors.email = 'email is required';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
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

     const {status,message,token,error}=await UserLogin(formData)     
if(!status){
  const newErrors = {};
  newErrors.password = error;  
  newErrors.email = error; 
    setErrors(newErrors|| {});
}else{
 localStorage.setItem("authToken",token)
  toast.success(message);
  setTimeout(() => {
    navigate("/home")
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
    <>    <Navbar/>
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={4}>
          <h2 className="mt-4 text-center">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
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

            <Row className="justify-content-center">
              <Col xs="auto">
                <Button variant="primary" type="submit" size="sm">
                  
                  {
                    loading? <i class="fa fa-spinner fa-spin" style={{fontSize:"24px"}}>
                    </i>
                    : "Login"
                }
                </Button>
                
              </Col>
               <br></br>
               <br></br>
              <a href='/register'>Create Account</a>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
    </>

  );
}

export default LoginForm;
