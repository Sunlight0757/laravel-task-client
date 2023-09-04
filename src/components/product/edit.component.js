import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Form, Button, Row, Col } from "react-bootstrap";

const EditUser = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    await axios
      .get(`http://localhost:8000/api/${id}`)
      .then((res) => {
        const { name, description, price, quantity } = res.data;
        setName(name);
        setDescription(description);
        setPrice(price);
        setQuantity(quantity);
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    const sendData = {
      name: name,
      description: description,
      price: price,
      quantity: quantity,
    };

    await axios
      .put(`http://localhost:8000/api/${id}`, sendData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Product</h4>
              <hr />
              <div className="form-wrapper">
                {Object.keys(validationError).length > 0 && (
                  <div className="row">
                    <div className="col-12">
                      <div className="alert alert-danger">
                        <ul className="mb-0">
                          {Object.entries(validationError).map(
                            ([key, value]) => (
                              <li key={key}>{value}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                <Form onSubmit={updateProduct}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={name}
                          onChange={(event) => {
                            setName(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="Description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={description}
                          onChange={(event) => {
                            setDescription(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="number"
                          value={price}
                          onChange={(event) => {
                            setPrice(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          value={quantity}
                          onChange={(event) => {
                            setQuantity(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    variant="primary"
                    className="mt-2"
                    size="lg"
                    block="block"
                    type="submit"
                  >
                    Update
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
