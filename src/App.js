import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import EditProduct from "./components/product/edit.component";
import ProductList from "./components/product/list.component";
import CreateProduct from "./components/product/create.component";

function App() {
  return (
    <Router>
      <Navbar bg="primary">
        <Container>
          <Link to={"/"} className="navbar-brand text-white">
            Basic CRUD App
          </Link>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <Routes>
              <Route path="/product/create" element={<CreateProduct />} />
              <Route path="/product/edit/:id" element={<EditProduct />} />
              <Route exact path="/" element={<ProductList />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
