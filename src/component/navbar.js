import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import ProductModal from "../component/AddproductModel"
import { useNavigate } from 'react-router-dom';

function AppNavbar() {
  const navigate=useNavigate()

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleLogout=()=>{
    localStorage.clear()
    navigate("/login")
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <strong>NowDigitalEasy</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          { localStorage.getItem('authToken')!=null?
          <>
<Nav.Link href="" onClick={handleLogout}>Logout</Nav.Link>
<Nav.Link href="" onClick={handleShow}>Add Product</Nav.Link>

          </>
          
          
          :
          <>
           <Nav.Link href="/login">Sign In </Nav.Link>
           <Nav.Link href="/register">Sign Up</Nav.Link>
          </>
        
            }
            {/* variant="primary" onClick={handleShow} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ProductModal show={showModal} handleClose={handleClose}/>
    </Navbar>
  );
}

export default AppNavbar;
